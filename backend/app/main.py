"""LitLens FastAPI application entrypoint."""

import logging
from typing import Dict, Any
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import get_settings
from app.api.routes.health import router as health_router

# Configure sanitized logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("litlens.backend")


def create_application() -> FastAPI:
    """Create and configure the FastAPI application instance."""
    settings = get_settings()

    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        description="Evidence-grounded AI research literature copilot backend API.",
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
    )

    # Configure CORS policy based on FRONTEND_ORIGIN setting
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["Authorization", "Content-Type", "Accept", "Origin", "X-Requested-With"],
    )

    # Global unhandled exception handler to avoid leaking tracebacks or credentials
    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
        logger.error(f"Unhandled server error on {request.method} {request.url.path}: {str(exc)}")
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "An internal server error occurred. Please try again later."},
        )

    # Root endpoint identifying API and linking to health and docs
    @app.get(
        "/",
        tags=["root"],
        summary="Root API Info",
        description="Identifies the LitLens backend service and points to health endpoints.",
    )
    def root() -> Dict[str, Any]:
        return {
            "name": settings.PROJECT_NAME,
            "version": settings.VERSION,
            "status": "online",
            "health": "/health",
            "docs": "/docs",
            "api_v1_prefix": settings.API_V1_STR,
        }

    # Mount direct health endpoint: GET /health
    app.include_router(health_router)

    # Mount versioned API routes under /api/v1: GET /api/v1/health
    app.include_router(health_router, prefix=settings.API_V1_STR)

    return app


app = create_application()
