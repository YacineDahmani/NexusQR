from flask import Blueprint, request, jsonify, send_file
from werkzeug.utils import secure_filename
from models import get_db, dict_from_row
from utils.data_encoder import encode_qr_data
from utils.vcard import build_vcard
from utils.qr_generator import generate_qr
from utils.csv_parser import parse_csv
from config import Config
import os
import uuid
import zipfile
import io
import tempfile

qr_bp = Blueprint("qr", __name__, url_prefix="/api/qr")

REQUIRED_FIELDS = {
    "vcard": "full_name",
    "url": "url",
    "text": "text",
    "email": "email_to",
    "sms": "phone",
    "wifi": "ssid",
    "facebook": "username",
    "instagram": "username",
    "twitter": "username",
    "linkedin": "username",
    "youtube": "username",
}


@qr_bp.route("/generate", methods=["POST"])
def generate():
    """Generate a QR code from data based on the selected type."""
    data = request.form.to_dict() if request.form else request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    qr_type = data.get("qr_type", "vcard")

    required = REQUIRED_FIELDS.get(qr_type)
    if required and not data.get(required):
        return jsonify({"error": f"{required} is required for {qr_type} QR codes"}), 400

    try:
        qr_content = encode_qr_data(qr_type, data)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    # Handle logo upload
    logo_path = None
    if "logo" in request.files:
        logo_file = request.files["logo"]
        if logo_file.filename:
            os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)
            ext = logo_file.filename.rsplit(".", 1)[-1].lower()
            logo_filename = f"logo_{uuid.uuid4().hex[:8]}.{ext}"
            logo_path = os.path.join(Config.UPLOAD_FOLDER, logo_filename)
            logo_file.save(logo_path)

    fg_color = data.get("fg_color", "#000000")
    bg_color = data.get("bg_color", "#FFFFFF")
    box_size = int(data.get("resolution", 10))

    result = generate_qr(
        data=qr_content,
        fg_color=fg_color,
        bg_color=bg_color,
        box_size=box_size,
        logo_path=logo_path,
    )

    # Derive a display label based on type
    label = data.get("full_name") or data.get("url") or data.get("ssid") or data.get("username") or data.get("text", "")[:40] or "QR Code"

    user_id = data.get("user_id")
    db = get_db()
    cursor = db.cursor()
    cursor.execute(
        """INSERT INTO qr_codes (user_id, contact_name, qr_type, qr_content, qr_image_path, logo_path, fg_color, bg_color, resolution)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (
            user_id,
            label,
            qr_type,
            qr_content,
            result["image_path"],
            logo_path,
            fg_color,
            bg_color,
            box_size,
        ),
    )
    db.commit()
    qr_id = cursor.lastrowid
    db.close()

    return jsonify({
        "id": qr_id,
        "contact_name": label,
        "qr_type": qr_type,
        "image_base64": result["image_base64"],
        "filename": result["filename"],
        "qr_content": qr_content,
    }), 201


@qr_bp.route("/bulk", methods=["POST"])
def bulk_generate():
    """Accept a CSV file and generate QR codes for each contact row."""
    if "csv_file" not in request.files:
        return jsonify({"error": "No CSV file provided"}), 400

    csv_file = request.files["csv_file"]
    if not csv_file.filename:
        return jsonify({"error": "Empty filename"}), 400

    os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)
    csv_filename = secure_filename(csv_file.filename)
    csv_path = os.path.join(Config.UPLOAD_FOLDER, f"bulk_{uuid.uuid4().hex[:8]}_{csv_filename}")
    csv_file.save(csv_path)

    parsed = parse_csv(csv_path)

    if parsed["errors"] and not parsed["contacts"]:
        return jsonify({"errors": parsed["errors"]}), 400

    fg_color = request.form.get("fg_color", "#000000")
    bg_color = request.form.get("bg_color", "#FFFFFF")
    box_size = int(request.form.get("resolution", 10))
    user_id = request.form.get("user_id")

    db = get_db()
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO bulk_jobs (user_id, csv_filename, total_count, status) VALUES (?, ?, ?, ?)",
        (user_id, csv_filename, parsed["total"], "processing"),
    )
    db.commit()
    bulk_job_id = cursor.lastrowid

    zip_buffer = io.BytesIO()
    generated = []

    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        for contact in parsed["contacts"]:
            try:
                vcard_data = build_vcard(contact)
                result = generate_qr(
                    data=vcard_data,
                    fg_color=fg_color,
                    bg_color=bg_color,
                    box_size=box_size,
                )

                cursor.execute(
                    """INSERT INTO qr_codes (user_id, contact_name, qr_type, qr_content, qr_image_path, fg_color, bg_color, resolution)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
                    (user_id, contact["full_name"], "vcard", vcard_data, result["image_path"], fg_color, bg_color, box_size),
                )

                safe_name = contact["full_name"].replace(" ", "_").replace("/", "_")
                zf.write(result["image_path"], f"{safe_name}.png")
                generated.append(contact["full_name"])

            except Exception as e:
                parsed["errors"].append(f"Error generating QR for {contact.get('full_name', 'unknown')}: {str(e)}")

    cursor.execute(
        "UPDATE bulk_jobs SET status = ? WHERE id = ?",
        ("completed", bulk_job_id),
    )
    db.commit()
    db.close()

    zip_buffer.seek(0)
    return send_file(
        zip_buffer,
        mimetype="application/zip",
        as_attachment=True,
        download_name=f"nexusqr_bulk_{bulk_job_id}.zip",
    )


@qr_bp.route("/history", methods=["GET"])
def history():
    """List all previously generated QR codes."""
    user_id = request.args.get("user_id")
    db = get_db()

    if user_id:
        rows = db.execute(
            "SELECT * FROM qr_codes WHERE user_id = ? ORDER BY created_at DESC",
            (user_id,),
        ).fetchall()
    else:
        rows = db.execute(
            "SELECT * FROM qr_codes ORDER BY created_at DESC"
        ).fetchall()

    db.close()

    qr_codes = [dict_from_row(row) for row in rows]
    return jsonify({"qr_codes": qr_codes, "total": len(qr_codes)})


@qr_bp.route("/<int:qr_id>", methods=["GET"])
def get_qr(qr_id):
    """Get a specific QR code record by ID."""
    db = get_db()
    row = db.execute("SELECT * FROM qr_codes WHERE id = ?", (qr_id,)).fetchone()
    db.close()

    if not row:
        return jsonify({"error": "QR code not found"}), 404

    return jsonify(dict_from_row(row))


@qr_bp.route("/<int:qr_id>", methods=["DELETE"])
def delete_qr(qr_id):
    """Delete a QR code record and its associated files."""
    db = get_db()
    row = db.execute("SELECT * FROM qr_codes WHERE id = ?", (qr_id,)).fetchone()

    if not row:
        db.close()
        return jsonify({"error": "QR code not found"}), 404

    qr_data = dict_from_row(row)

    if qr_data.get("qr_image_path") and os.path.exists(qr_data["qr_image_path"]):
        os.remove(qr_data["qr_image_path"])

    if qr_data.get("logo_path") and os.path.exists(qr_data["logo_path"]):
        os.remove(qr_data["logo_path"])

    db.execute("DELETE FROM qr_codes WHERE id = ?", (qr_id,))
    db.commit()
    db.close()

    return jsonify({"message": "QR code deleted successfully"})
