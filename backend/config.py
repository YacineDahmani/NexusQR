import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "nexusqr-dev-secret-key-change-me")
    DATABASE_PATH = os.path.join(BASE_DIR, "nexusqr.db")
    UPLOAD_FOLDER = os.path.join(BASE_DIR, "static", "uploads")
    QRCODES_FOLDER = os.path.join(BASE_DIR, "static", "qrcodes")
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB max upload
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "svg", "csv"}


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False
    SECRET_KEY = os.environ.get("SECRET_KEY")
