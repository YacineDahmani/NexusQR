from utils.vcard import build_vcard


def encode_qr_data(qr_type: str, data: dict) -> str:
    """Encode data into the appropriate QR string format based on type."""
    encoders = {
        "vcard": _encode_vcard,
        "url": _encode_url,
        "text": _encode_text,
        "email": _encode_email,
        "sms": _encode_sms,
        "wifi": _encode_wifi,
        "facebook": _encode_facebook,
        "instagram": _encode_instagram,
        "twitter": _encode_twitter,
        "linkedin": _encode_linkedin,
        "youtube": _encode_youtube,
    }

    encoder = encoders.get(qr_type)
    if not encoder:
        raise ValueError(f"Unsupported QR type: {qr_type}")

    return encoder(data)


def _encode_vcard(data: dict) -> str:
    return build_vcard(data)


def _encode_url(data: dict) -> str:
    url = data.get("url", "").strip()
    if not url:
        raise ValueError("url is required for URL QR codes.")
    if not url.startswith(("http://", "https://")):
        url = "https://" + url
    return url


def _encode_text(data: dict) -> str:
    text = data.get("text", "").strip()
    if not text:
        raise ValueError("text is required for Text QR codes.")
    return text


import urllib.parse

def _encode_email(data: dict) -> str:
    email = data.get("email_to", "").strip()
    if not email:
        raise ValueError("email_to is required for Email QR codes.")
    
    subject = data.get("subject", "")
    body = data.get("body", "")
    
    # Build query parameters
    query = {}
    if subject:
        query["subject"] = subject
    if body:
        query["body"] = body
        
    query_string = urllib.parse.urlencode(query)
    
    if query_string:
        return f"mailto:{email}?{query_string}"
    return f"mailto:{email}"


def _encode_sms(data: dict) -> str:
    phone = data.get("phone", "").strip()
    if not phone:
        raise ValueError("phone is required for SMS QR codes.")
    message = data.get("message", "")
    return f"SMSTO:{phone}:{message}"


def _encode_wifi(data: dict) -> str:
    ssid = data.get("ssid", "").strip()
    if not ssid:
        raise ValueError("ssid is required for WiFi QR codes.")
    password = data.get("password", "")
    encryption = data.get("encryption", "WPA")
    hidden = "true" if data.get("hidden") in ("true", "1", True) else "false"
    return f"WIFI:T:{encryption};S:{ssid};P:{password};H:{hidden};;"


def _encode_facebook(data: dict) -> str:
    username = data.get("username", "").strip()
    if not username:
        raise ValueError("username is required for Facebook QR codes.")
    return f"https://facebook.com/{username}"


def _encode_instagram(data: dict) -> str:
    username = data.get("username", "").strip()
    if not username:
        raise ValueError("username is required for Instagram QR codes.")
    return f"https://instagram.com/{username}"


def _encode_twitter(data: dict) -> str:
    username = data.get("username", "").strip()
    if not username:
        raise ValueError("username is required for X (Twitter) QR codes.")
    return f"https://x.com/{username}"


def _encode_linkedin(data: dict) -> str:
    username = data.get("username", "").strip()
    if not username:
        raise ValueError("username is required for LinkedIn QR codes.")
    return f"https://linkedin.com/in/{username}"


def _encode_youtube(data: dict) -> str:
    username = data.get("username", "").strip()
    if not username:
        raise ValueError("username is required for YouTube QR codes.")
    return f"https://youtube.com/@{username}"
