"""Application configuration using Pydantic Settings."""

from functools import lru_cache
from typing import List, Optional
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """LitLens backend configuration loaded from environment variables and .env."""

    # Application metadata
    PROJECT_NAME: str = "LitLens Backend API"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"

    # Runtime environment
    ENVIRONMENT: str = Field(default="development", description="Runtime environment: development | staging | production")

    # CORS configuration
    FRONTEND_ORIGIN: str = Field(
        default="http://localhost:3000",
        description="Allowed frontend origin(s), comma-separated if multiple.",
    )

    # Supabase Configuration
    # Safe default placeholders allow offline testing without network or credentials
    SUPABASE_URL: str = Field(
        default="https://placeholder-project.supabase.co",
        description="Public URL for the Supabase project.",
    )
    SUPABASE_ANON_KEY: str = Field(
        default="placeholder-anon-key",
        description="Supabase anonymous / publishable key for client-scoped operations.",
    )
    SUPABASE_SERVICE_ROLE_KEY: Optional[str] = Field(
        default=None,
        description="Privileged service role key. Strictly restricted to trusted server-side tasks. Never exposed.",
    )

    # Known storage buckets & processing defaults
    STORAGE_BUCKET_PAPERS: str = "research-papers"

    model_config = SettingsConfigDict(
        env_file=(".env", "backend/.env"),
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=True,
    )

    @field_validator("ENVIRONMENT")
    @classmethod
    def validate_environment(cls, v: str) -> str:
        valid_envs = {"development", "staging", "production", "test"}
        normalized = v.strip().lower()
        if normalized not in valid_envs:
            # Fall back to development if unrecognized
            return "development"
        return normalized

    @property
    def allowed_origins(self) -> List[str]:
        """Parse FRONTEND_ORIGIN into a list of origins and enforce security policies."""
        raw_origins = [origin.strip() for origin in self.FRONTEND_ORIGIN.split(",") if origin.strip()]

        # Enforce that wildcard origins are rejected in production
        if self.ENVIRONMENT == "production":
            sanitized = [o for o in raw_origins if o != "*"]
            return sanitized if sanitized else ["http://localhost:3000"]

        return raw_origins if raw_origins else ["http://localhost:3000"]


@lru_cache
def get_settings() -> Settings:
    """Return cached Settings instance."""
    return Settings()
