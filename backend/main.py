from app.config import settings
from app.database import Base, engine
from app.routers import ai, assignments, auth, courses, submissions
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env file
load_dotenv()

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(title=settings.API_TITLE, version=settings.API_VERSION)

# CORS middleware
# Use regex to allow ALL Vercel preview deployments (*.vercel.app)
# This prevents CORS issues when Vercel generates new preview URLs
# The regex pattern automatically allows any *.vercel.app subdomain
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.vercel\.app|http://localhost:\d+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(courses.router)
app.include_router(assignments.router)
app.include_router(submissions.router)
app.include_router(ai.router)


@app.get("/")
def root():
    """Root endpoint"""
    return {
        "message": settings.API_TITLE,
        "version": settings.API_VERSION,
        "docs": "/docs",
    }


@app.get("/api/cors-check")
def cors_check():
    """Debug endpoint to check CORS configuration"""
    import os

    raw_cors = os.getenv("CORS_ORIGINS", "NOT SET")
    return {
        "cors_origins": settings.CORS_ORIGINS,
        "cors_origins_count": len(settings.CORS_ORIGINS),
        "raw_env_value": raw_cors,
        "environment": os.getenv("ENVIRONMENT", "unknown"),
    }
