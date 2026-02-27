from flask import Flask
from flask_cors import CORS
from config import DevelopmentConfig
from models import init_db
from routes.qr import qr_bp
from routes.auth import auth_bp
import os


def create_app(config_class=DevelopmentConfig):
    """Application factory for the NexusQR backend."""
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Enable CORS for frontend communication
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Ensure static directories exist
    os.makedirs(app.config.get("UPLOAD_FOLDER", "static/uploads"), exist_ok=True)
    os.makedirs(app.config.get("QRCODES_FOLDER", "static/qrcodes"), exist_ok=True)

    # Initialize database
    with app.app_context():
        init_db()

    # Register blueprints
    app.register_blueprint(qr_bp)
    app.register_blueprint(auth_bp)

    # Health check route
    @app.route("/api/health")
    def health():
        return {"status": "ok", "message": "NexusQR API is running"}

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)
