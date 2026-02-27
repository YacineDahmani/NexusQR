import qrcode
from qrcode.image.styledpil import StyledPilImage
from PIL import Image
import io
import os
import uuid
import base64
from config import Config


def generate_qr(
    vcard_data: str,
    fg_color: str = "#000000",
    bg_color: str = "#FFFFFF",
    box_size: int = 10,
    logo_path: str = None,
) -> dict:
    """
    Generate a QR code image from vCard data.

    Args:
        vcard_data: The vCard 3.0 string to encode.
        fg_color: Foreground (QR module) color as hex string.
        bg_color: Background color as hex string.
        box_size: Size of each QR module in pixels (controls resolution).
        logo_path: Optional path to a logo image to overlay on the QR code.

    Returns:
        dict with keys:
            - image_base64: Base64-encoded PNG image string
            - image_path: Path where the image was saved
            - filename: The generated filename
    """
    # Create QR code instance
    qr = qrcode.QRCode(
        version=None,  # Auto-determine version
        error_correction=qrcode.constants.ERROR_CORRECT_H,  # High error correction for logo overlay
        box_size=box_size,
        border=4,
    )
    qr.add_data(vcard_data)
    qr.make(fit=True)

    # Generate the QR image with colors
    qr_image = qr.make_image(fill_color=fg_color, back_color=bg_color).convert("RGBA")

    # Overlay logo if provided
    if logo_path and os.path.exists(logo_path):
        qr_image = _overlay_logo(qr_image, logo_path)

    # Save to file
    os.makedirs(Config.QRCODES_FOLDER, exist_ok=True)
    filename = f"qr_{uuid.uuid4().hex[:12]}.png"
    image_path = os.path.join(Config.QRCODES_FOLDER, filename)

    # Convert to RGB for PNG saving (drop alpha if present)
    final_image = qr_image.convert("RGB")
    final_image.save(image_path, "PNG")

    # Generate base64 for API response
    buffer = io.BytesIO()
    final_image.save(buffer, format="PNG")
    image_base64 = base64.b64encode(buffer.getvalue()).decode("utf-8")

    return {
        "image_base64": image_base64,
        "image_path": image_path,
        "filename": filename,
    }


def _overlay_logo(qr_image: Image.Image, logo_path: str) -> Image.Image:
    """
    Overlay a logo image at the center of the QR code.
    The logo is scaled to occupy ~20% of the QR code area.
    """
    try:
        logo = Image.open(logo_path).convert("RGBA")
    except Exception:
        return qr_image  # If logo can't be opened, return QR as-is

    qr_width, qr_height = qr_image.size

    # Scale logo to ~20% of QR area
    max_logo_size = int(min(qr_width, qr_height) * 0.25)
    logo_ratio = min(max_logo_size / logo.width, max_logo_size / logo.height)
    new_logo_size = (int(logo.width * logo_ratio), int(logo.height * logo_ratio))
    logo = logo.resize(new_logo_size, Image.Resampling.LANCZOS)

    # Create a white background behind the logo for better contrast
    logo_bg_padding = 10
    logo_bg_size = (
        new_logo_size[0] + logo_bg_padding * 2,
        new_logo_size[1] + logo_bg_padding * 2,
    )
    logo_bg = Image.new("RGBA", logo_bg_size, (255, 255, 255, 255))

    # Center the logo on the white background
    logo_bg.paste(logo, (logo_bg_padding, logo_bg_padding), logo)

    # Center the logo+bg on the QR code
    logo_pos = (
        (qr_width - logo_bg_size[0]) // 2,
        (qr_height - logo_bg_size[1]) // 2,
    )
    qr_image.paste(logo_bg, logo_pos, logo_bg)

    return qr_image
