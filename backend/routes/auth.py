from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models import get_db, dict_from_row
import secrets

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

# In-memory token store for simplicity (use JWT or session in production)
_active_tokens = {}


def _generate_token():
    return secrets.token_hex(32)


def get_current_user(token: str) -> dict | None:
    """Validate a token and return the associated user, or None."""
    user_id = _active_tokens.get(token)
    if not user_id:
        return None
    db = get_db()
    row = db.execute("SELECT id, username, email, avatar_url, created_at FROM users WHERE id = ?", (user_id,)).fetchone()
    db.close()
    return dict_from_row(row)


@auth_bp.route("/register", methods=["POST"])
def register():
    """Register a new user."""
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    username = data.get("username", "").strip()
    email = data.get("email", "").strip()
    password = data.get("password", "")

    if not username or not email or not password:
        return jsonify({"error": "username, email, and password are required"}), 400

    if len(password) < 6:
        return jsonify({"error": "Password must be at least 6 characters"}), 400

    db = get_db()

    # Check if user already exists
    existing = db.execute(
        "SELECT id FROM users WHERE username = ? OR email = ?",
        (username, email),
    ).fetchone()

    if existing:
        db.close()
        return jsonify({"error": "Username or email already exists"}), 409

    # Create user
    password_hash = generate_password_hash(password)
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
        (username, email, password_hash),
    )
    db.commit()
    user_id = cursor.lastrowid
    db.close()

    # Generate token
    token = _generate_token()
    _active_tokens[token] = user_id

    return jsonify({
        "message": "User registered successfully",
        "user": {"id": user_id, "username": username, "email": email},
        "token": token,
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    """Login with email and password."""
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    email = data.get("email", "").strip()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"error": "email and password are required"}), 400

    db = get_db()
    row = db.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    db.close()

    if not row:
        return jsonify({"error": "Invalid email or password"}), 401

    user = dict_from_row(row)

    if not check_password_hash(user["password_hash"], password):
        return jsonify({"error": "Invalid email or password"}), 401

    # Generate token
    token = _generate_token()
    _active_tokens[token] = user["id"]

    return jsonify({
        "message": "Login successful",
        "user": {
            "id": user["id"],
            "username": user["username"],
            "email": user["email"],
            "avatar_url": user["avatar_url"],
        },
        "token": token,
    })


@auth_bp.route("/me", methods=["GET"])
def me():
    """Get the current authenticated user's profile."""
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return jsonify({"error": "No authentication token provided"}), 401

    token = auth_header.split(" ", 1)[1]
    user = get_current_user(token)

    if not user:
        return jsonify({"error": "Invalid or expired token"}), 401

    return jsonify({"user": user})


@auth_bp.route("/logout", methods=["POST"])
def logout():
    """Logout and invalidate the current token."""
    auth_header = request.headers.get("Authorization", "")
    if auth_header.startswith("Bearer "):
        token = auth_header.split(" ", 1)[1]
        _active_tokens.pop(token, None)

    return jsonify({"message": "Logged out successfully"})
