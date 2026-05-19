# NexusQR

NexusQR is a full-stack web application designed for generating highly customizable QR codes. It allows users to generate multiple types of QR codes (vCard, URL, Text, WiFi, Social Media, etc.), embed custom logos, preview designs in real-time, and process bulk generation via CSV files.

### Frontend

- **React (Vite)**: Modern component-based architecture.
- **Tailwind CSS v4**: Advanced utility-first styling with premium typography and glassmorphism effects.
- **Lucide React**: High-quality, consistent vector icons.
- **React Dropzone**: Seamless drag-and-drop file upload handling.
- **Axios**: Efficient API communication with the backend.

### Backend

- **Flask (Python)**: Lightweight and scalable RESTful API.
- **qrcode (PilImage)**: Specialized library for high-accuracy QR generation with error correction.
- **Pillow**: Image processing for logo overlays and color manipulation.
- **Pandas**: Robust CSV parsing and data normalization for bulk generation.
- **SQLite**: Local database for managing user profiles and generation history.

## Project Structure

```text
NexusQR/
├── frontend/             # React application source
│   ├── src/
│   │   ├── api/          # API client configuration
│   │   ├── components/   # Reusable UI components (Form, Preview, Nav)
│   │   ├── pages/        # Main views (Generator, Help, My QR Codes)
│   │   └── App.jsx       # Routing and core logic
│   └── vite.config.js    # Build and plugin configuration
└── backend/              # Flask API source
    ├── routes/           # API endpoints (QR logic, Auth)
    ├── utils/            # Logic for vCard building and QR generation
    ├── models.py         # Database schema and connections
    ├── app.py            # Main application factory
    └── requirements.txt  # Python dependencies
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.10+)

### Backend Setup

1. Navigate to the `backend` directory.
2. Create a virtual environment: `python -m venv venv`.
3. Activate the environment:
   - Windows: `.\venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`.
5. Run the server: `python app.py`.

### Frontend Setup

1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`.
3. Start the development server: `npm run dev`.

## Usage

1. **Self-Generation**: Fill in the "Contact Details" form. The preview on the right will update every 500ms.
2. **Customization**: Use the "Customization" panel to upload a logo or change QR colors.
3. **Saving**: Click "Save QR Code" to store the QR code in your "My QR Codes" dashboard.
4. **Bulk**: Drop a CSV file into the bulk upload zone. Ensure your CSV has a `full_name` column.

