import os
from typing import List


class Settings:
    # API Settings
    API_TITLE: str = "K-12 LMS API"
    API_VERSION: str = "1.0.0"

    # Security
    SECRET_KEY: str = os.getenv(
        "SECRET_KEY", "your-secret-key-change-in-production-min-32-chars"
    )
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30")
    )

    # Database
    # Default to Neon PostgreSQL (set DATABASE_URL environment variable)
    # For local SQLite development, set: DATABASE_URL=sqlite:///./lms.db
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://neondb_owner:npg_rUZpTBKl7v8W@ep-fragrant-brook-afdf1x7w-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
    )

    # CORS (comma-separated, will be split)
    # Default includes localhost for development and Vercel URLs for production
    # Update CORS_ORIGINS environment variable in Render to include your actual Vercel URL
    CORS_ORIGINS: List[str] = [
        origin.strip()
        for origin in os.getenv(
            "CORS_ORIGINS",
            "http://localhost:3000,http://localhost:5173,https://learning-5kpyjg1hl-su1kiis-projects.vercel.app,https://learning-1bbze2ktk-su1kiis-projects.vercel.app",
        ).split(",")
        if origin.strip()  # Filter out empty strings
    ]


settings = Settings()
