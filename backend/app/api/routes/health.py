"""Health check endpoints for container and service monitoring."""

from typing import Dict, Any
from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.core.config import Settings, get_settings

router = APIRouter(tags=["health"])


class HealthResponse(BaseModel):
    """Clean, unprivileged health status payload."""
    status: str = Field(default="healthy", description="Application service status")
    environment: str = Field(..., description="Active runtime environment")
    version: str = Field(..., description="API version")


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Health check",
    description="Returns high-level service status without leaking configuration or credentials.",
)
def get_health(settings: Settings = Depends(get_settings)) -> HealthResponse:
    """Return application health information."""
    return HealthResponse(
        status="healthy",
        environment=settings.ENVIRONMENT,
        version=settings.VERSION,
    )
