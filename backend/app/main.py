import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import analyze
from app.config import settings

app = FastAPI(
    title="AI-Powered Resume Analyzer",
    description="Backend API for analyzing resumes with AI",
    version="1.0.0"
)

# Configure CORS
origins = [origin.strip() for origin in settings.ALLOWED_ORIGINS.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routes
app.include_router(analyze.router)

@app.get("/health")
def health_check():
    return {"status": "ok"}
