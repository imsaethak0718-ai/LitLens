"""Unit and integration tests for LitLens Backend Foundation."""

import pytest
from fastapi.testclient import TestClient

from app.main import app, create_application
from app.core.config import Settings, get_settings


@pytest.fixture
def client():
    """FastAPI TestClient fixture."""
    return TestClient(app)


class TestRootEndpoint:
    """Test suite for root API entrypoint."""

    def test_root_returns_service_metadata(self, client: TestClient):
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "LitLens Backend API"
        assert data["status"] == "online"
        assert data["health"] == "/health"
        assert data["api_v1_prefix"] == "/api/v1"
        assert "version" in data


class TestHealthEndpoints:
    """Test suite for health check routes."""

    def test_direct_health_check(self, client: TestClient):
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "environment" in data
        assert "version" in data
        # Ensure no secrets or sensitive keys leaked
        assert "SUPABASE_URL" not in data
        assert "SUPABASE_ANON_KEY" not in data
        assert "SUPABASE_SERVICE_ROLE_KEY" not in data

    def test_versioned_health_check_alias(self, client: TestClient):
        response = client.get("/api/v1/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "environment" in data
        assert "version" in data


class TestCorsBehavior:
    """Test suite for CORS security and origin restrictions."""

    def test_cors_preflight_allowed_origin(self, client: TestClient):
        headers = {
            "Origin": "http://localhost:3000",
            "Access-Control-Request-Method": "GET",
            "Access-Control-Request-Headers": "Authorization,Content-Type",
        }
        response = client.options("/api/v1/health", headers=headers)
        assert response.status_code == 200
        assert response.headers.get("access-control-allow-origin") == "http://localhost:3000"
        assert "GET" in response.headers.get("access-control-allow-methods", "")

    def test_cors_request_disallowed_origin(self, client: TestClient):
        headers = {
            "Origin": "https://malicious-website.example.com",
            "Access-Control-Request-Method": "GET",
        }
        response = client.options("/api/v1/health", headers=headers)
        # For disallowed origin, FastAPI's CORSMiddleware will not echo access-control-allow-origin
        assert response.headers.get("access-control-allow-origin") is None


class TestConfigurationAndSecurity:
    """Test suite for Settings validation and secret hygiene."""

    def test_default_settings_load_cleanly(self):
        settings = Settings()
        assert settings.PROJECT_NAME == "LitLens Backend API"
        assert settings.API_V1_STR == "/api/v1"
        assert settings.STORAGE_BUCKET_PAPERS == "research-papers"
        assert settings.SUPABASE_SERVICE_ROLE_KEY is None

    def test_cors_production_wildcard_rejection(self):
        # Even if FRONTEND_ORIGIN contains '*' in production, allowed_origins strips it
        prod_settings = Settings(
            ENVIRONMENT="production",
            FRONTEND_ORIGIN="*,https://litlens.example.com",
        )
        assert "*" not in prod_settings.allowed_origins
        assert prod_settings.allowed_origins == ["https://litlens.example.com"]

    def test_environment_normalization(self):
        s_dev = Settings(ENVIRONMENT="DEVELOPMENT")
        assert s_dev.ENVIRONMENT == "development"

        s_unknown = Settings(ENVIRONMENT="unknown_custom_mode")
        assert s_unknown.ENVIRONMENT == "development"
