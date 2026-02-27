def build_vcard(contact: dict) -> str:
    """
    Build a vCard 3.0 string from a contact dictionary.

    Expected keys:
        - full_name (required)
        - phone (optional)
        - email (optional)
        - organization (optional)
        - address (optional)
        - website (optional)
        - title (optional)
    """
    full_name = contact.get("full_name", "").strip()
    if not full_name:
        raise ValueError("full_name is required to generate a vCard.")

    # Split name into parts (last;first for N field)
    name_parts = full_name.split(" ", 1)
    first_name = name_parts[0]
    last_name = name_parts[1] if len(name_parts) > 1 else ""

    lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        f"FN:{full_name}",
        f"N:{last_name};{first_name};;;",
    ]

    if contact.get("organization"):
        lines.append(f"ORG:{contact['organization']}")

    if contact.get("title"):
        lines.append(f"TITLE:{contact['title']}")

    if contact.get("phone"):
        lines.append(f"TEL;TYPE=CELL:{contact['phone']}")

    if contact.get("email"):
        lines.append(f"EMAIL:{contact['email']}")

    if contact.get("address"):
        # vCard ADR format: PO Box;Extended;Street;City;Region;Postal;Country
        # We store the full address as the street component for simplicity
        lines.append(f"ADR;TYPE=HOME:;;{contact['address']};;;;")

    if contact.get("website"):
        lines.append(f"URL:{contact['website']}")

    lines.append("END:VCARD")

    return "\r\n".join(lines)
