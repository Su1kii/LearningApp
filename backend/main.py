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
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
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
    return {
        "cors_origins": settings.CORS_ORIGINS,
        "cors_origins_count": len(settings.CORS_ORIGINS),
    }
