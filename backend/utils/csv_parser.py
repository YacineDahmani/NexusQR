import pandas as pd


# Column name mapping: maps various CSV header names to our standard keys
COLUMN_MAP = {
    "full_name": "full_name",
    "fullname": "full_name",
    "name": "full_name",
    "full name": "full_name",
    "phone": "phone",
    "phone_number": "phone",
    "phone number": "phone",
    "tel": "phone",
    "telephone": "phone",
    "mobile": "phone",
    "email": "email",
    "e-mail": "email",
    "email_address": "email",
    "email address": "email",
    "organization": "organization",
    "org": "organization",
    "company": "organization",
    "organisation": "organization",
    "address": "address",
    "addr": "address",
    "street": "address",
    "website": "website",
    "url": "website",
    "web": "website",
    "site": "website",
    "title": "title",
    "job_title": "title",
    "job title": "title",
    "position": "title",
}

REQUIRED_COLUMNS = ["full_name"]


def parse_csv(file_path: str) -> dict:
    """
    Parse a CSV file into a list of contact dictionaries.

    Args:
        file_path: Path to the CSV file.

    Returns:
        dict with keys:
            - contacts: List of contact dicts ready for vCard generation.
            - total: Total number of contacts parsed.
            - errors: List of error messages for invalid rows.
    """
    try:
        df = pd.read_csv(file_path)
    except Exception as e:
        return {"contacts": [], "total": 0, "errors": [f"Failed to read CSV: {str(e)}"]}

    # Normalize column names
    df.columns = [col.strip().lower() for col in df.columns]

    # Map columns to standard names
    rename_map = {}
    for col in df.columns:
        if col in COLUMN_MAP:
            rename_map[col] = COLUMN_MAP[col]

    df = df.rename(columns=rename_map)

    # Check for required columns
    missing = [col for col in REQUIRED_COLUMNS if col not in df.columns]
    if missing:
        return {
            "contacts": [],
            "total": 0,
            "errors": [f"Missing required columns: {', '.join(missing)}"],
        }

    contacts = []
    errors = []

    for idx, row in df.iterrows():
        contact = {}
        row_num = idx + 2  # +2 for 1-indexed + header row

        # Extract standard fields
        for field in ["full_name", "phone", "email", "organization", "address", "website", "title"]:
            if field in row and pd.notna(row[field]):
                contact[field] = str(row[field]).strip()

        # Validate required fields
        if not contact.get("full_name"):
            errors.append(f"Row {row_num}: Missing required field 'full_name'")
            continue

        contacts.append(contact)

    return {
        "contacts": contacts,
        "total": len(contacts),
        "errors": errors,
    }
