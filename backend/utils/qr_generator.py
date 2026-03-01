import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers.pil import (
    SquareModuleDrawer,
    GappedSquareModuleDrawer,
    CircleModuleDrawer,
    RoundedModuleDrawer,
    VerticalBarsDrawer,
    HorizontalBarsDrawer,
)
from qrcode.image.styles.colormasks import (
    SolidFillColorMask,
    RadialGradiantColorMask,
    SquareGradiantColorMask,
    HorizontalGradiantColorMask,
    VerticalGradiantColorMask,
)
from PIL import Image
import io
import os
import uuid
import base64
from config import Config


def generate_qr(
    data: str,
    fg_color: str = "#000000",
    bg_color: str = "#FFFFFF",
    box_size: int = 10,
    logo_path: str = None,
    shape: str = "square",
    gradient_type: str = "none",
    gradient_color: str = "#000000",
) -> dict:
    """
    Generate a QR code image from encoded data string.

    Args:
        data: The encoded string to put in the QR code.
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
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H if logo_path else qrcode.constants.ERROR_CORRECT_Q,
        box_size=box_size,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    os.makedirs(Config.QRCODES_FOLDER, exist_ok=True)
    filename_base = f"qr_{uuid.uuid4().hex[:12]}"

    # Module Drawer Mapping
    drawers = {
        "square": SquareModuleDrawer(),
        "gapped": GappedSquareModuleDrawer(),
        "circle": CircleModuleDrawer(),
        "rounded": RoundedModuleDrawer(),
        "vertical": VerticalBarsDrawer(),
        "horizontal": HorizontalBarsDrawer(),
    }
    module_drawer = drawers.get(shape, SquareModuleDrawer())

    # Color Mask Mapping
    # Convert hex to RGB tuples
    def hex_to_rgb(h):
        h = h.lstrip('#')
        return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))
    
    fg_rgb = hex_to_rgb(fg_color)
    bg_rgb = hex_to_rgb(bg_color)
    grad_rgb = hex_to_rgb(gradient_color) if gradient_color else fg_rgb

    if gradient_type == "none":
        color_mask = SolidFillColorMask(front_color=fg_rgb, back_color=bg_rgb)
    elif gradient_type == "radial":
        color_mask = RadialGradiantColorMask(back_color=bg_rgb, center_color=fg_rgb, edge_color=grad_rgb)
    elif gradient_type == "square":
        color_mask = SquareGradiantColorMask(back_color=bg_rgb, center_color=fg_rgb, edge_color=grad_rgb)
    elif gradient_type == "horizontal":
        color_mask = HorizontalGradiantColorMask(back_color=bg_rgb, left_color=fg_rgb, right_color=grad_rgb)
    elif gradient_type == "vertical":
        color_mask = VerticalGradiantColorMask(back_color=bg_rgb, top_color=fg_rgb, bottom_color=grad_rgb)
    else:
        color_mask = SolidFillColorMask(front_color=fg_rgb, back_color=bg_rgb)

    # Generate the QR image with styles
    qr_image = qr.make_image(
        image_factory=StyledPilImage,
        module_drawer=module_drawer,
        color_mask=color_mask
    ).convert("RGBA")

    # Overlay logo if provided
    if logo_path and os.path.exists(logo_path):
        qr_image = _overlay_logo(qr_image, logo_path)

    # Save to file
    filename = f"{filename_base}.png"
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
