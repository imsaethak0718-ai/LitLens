# LitLens Backend — Foundation API

The backend for **LitLens**, an evidence-grounded AI research literature copilot for multi-paper analysis and synthesis.

Built with **FastAPI**, **Pydantic v2 Settings**, and prepared for **Supabase Auth & Storage** integrations.

---

## 1. Project Overview & Scope (Phase 1)

This initial phase establishes the production-ready backend foundation:
- Health and service inspection endpoints (`/`, `/health`, `/api/v1/health`).
- Centralized configuration via `pydantic-settings` reading from `.env` or system environment.
- Strict CORS protection configured via `FRONTEND_ORIGIN` (rejects wildcards in production).
- Offline-capable automated test suite.
- Architectural scaffolding for user-authenticated Supabase client access.

> [!NOTE]
> **Phase Scope Notice**: This foundation phase purposefully does **not** implement paper verification, PDF uploads, database CRUD operations, embeddings generation, or AI chat streaming. These features will be introduced systematically in subsequent phases.

---

## 2. Directory Structure

```text
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                  # FastAPI app factory, CORS, exception handling, root endpoint
│   ├── core/
│   │   ├── __init__.py
│   │   └── config.py            # Pydantic v2 Settings & environment validation
│   ├── api/
│   │   ├── __init__.py
│   │   └── routes/
│   │       ├── __init__.py
│   │       └── health.py        # Unprivileged /health and /api/v1/health endpoints
│   └── services/
│       └── __init__.py          # Service architecture groundwork & security contracts
├── tests/
│   ├── __init__.py
│   └── test_health.py           # Pytest integration & unit test suite
├── .env.example                 # Environment template with placeholder values only
├── .gitignore                   # Ignores .venv, .env, __pycache__, .pytest_cache
├── pytest.ini                   # Pytest configuration
├── requirements.txt             # Pinned dependency manifest
└── README.md                    # Backend documentation and runbook
```

---

## 3. Local Development Setup (macOS)

### Prerequisites
- Python 3.12+ (tested with Python 3.13)
- `pip`

### Step 1: Navigate to the Backend Directory
```bash
cd backend
```

### Step 2: Create and Activate a Virtual Environment
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### Step 4: Configure Environment Variables
Copy the example configuration:
```bash
cp .env.example .env
```
Update `.env` with your Supabase credentials when ready. For Phase 1 testing and development, the default fallback placeholders allow the service to run offline without live credentials.

---

## 4. Running the Backend Locally

Start the local Uvicorn development server:
```bash
uvicorn app.main:app --reload --port 8000
```

Once started:
- **API Root**: [http://localhost:8000/](http://localhost:8000/)
- **Health Check**: [http://localhost:8000/health](http://localhost:8000/health)
- **Versioned Health**: [http://localhost:8000/api/v1/health](http://localhost:8000/api/v1/health)
- **Interactive Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc Documentation**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 5. Running the Test Suite

Run the offline pytest suite:
```bash
pytest -c pytest.ini tests/ -v
```

All 8 tests run in-memory using FastAPI's `TestClient` and do not require live credentials or a network connection.

---

## 6. Render Deployment Overview

When ready for cloud deployment on **Render**:

1. **Service Type**: Web Service
2. **Environment**: Python 3
3. **Root Directory**: `backend`
4. **Build Command**: `pip install -r requirements.txt`
5. **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. **Required Environment Variables**:
   - `ENVIRONMENT`: `production`
   - `FRONTEND_ORIGIN`: `https://your-frontend-domain.com` (or Vercel URL)
   - `SUPABASE_URL`: `https://your-project.supabase.co`
   - `SUPABASE_ANON_KEY`: `<your-publishable-anon-key>`
   - `SUPABASE_SERVICE_ROLE_KEY`: *(Optional — keep blank unless strictly required by backend tasks)*

---

## 7. Security Architecture & Commitments

1. **Secret Isolation**:
   - `.env` is ignored by `.gitignore` and must never be committed.
   - `.env.example` contains only sanitized placeholder values.
2. **CORS Restrictions**:
   - Access is restricted to `FRONTEND_ORIGIN`.
   - Wildcards (`*`) are disallowed and rejected when `ENVIRONMENT=production`.
3. **Zero Leaks**:
   - Error handlers sanitize 500 exceptions, returning a clean message without stack traces or environment state.
   - Root and health endpoints return status and versions only, omitting database URLs, keys, and tokens.
4. **Supabase Row Level Security (RLS)**:
   - User-scoped queries in upcoming phases will forward the authenticated user's JWT access token so PostgreSQL RLS policies remain in full effect.
   - The service role key is **never** shared with frontend clients or decoded blindly.
