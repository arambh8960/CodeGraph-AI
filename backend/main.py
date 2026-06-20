"""
CodeGraph AI - Main FastAPI Application
AI-Powered Developer Onboarding Assistant for GitHub Repositories
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from database.mongo_db import connect_to_mongo, close_mongo_connection
from routes import auth, health, repository, chat


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application lifecycle events"""
    # Startup
    await connect_to_mongo()
    yield
    # Shutdown
    await close_mongo_connection()


# Create FastAPI application
app = FastAPI(
    title="Reporyx AI",
    description="AI-Powered Developer Onboarding Assistant for GitHub Repositories",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(repository.router)
app.include_router(chat.router)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
    "message": "Welcome to Reporyx AI",
        "version": "1.0.0",
        "status": "running"
    }
