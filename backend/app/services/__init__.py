"""LitLens Service Architecture & Integrations Groundwork.

This package prepares the structure for Phase 2 services:
1. supabase_client: Safe client creation for user-authenticated requests.
2. auth_service: Supabase Auth JWT signature verification and claims validation.
3. storage_service: Access routines for the private `research-papers` Storage bucket.
4. paper_service: Metadata and processing pipelines.

SECURITY ARCHITECTURE RULES:
- Never decode unverified JWTs. JWT signatures must be validated against the Supabase project keys.
- User-scoped operations use the requesting user's Bearer access token so that Row Level Security (RLS) is strictly enforced.
- The service-role key is never used for general API routes or exposed to client apps.
- The `research-papers` storage bucket remains strictly private.
"""
