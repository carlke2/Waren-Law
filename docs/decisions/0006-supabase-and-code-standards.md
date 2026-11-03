# 0006: Supabase PostgreSQL and code standards

**Date:** 3 November 2026
**Status:** Accepted

## Decision 1: database hosted on Supabase
- PostgreSQL is provided by **Supabase**. We use it as a plain PostgreSQL database through Prisma (no Supabase client SDK, auth or storage in V1).
- Two connection strings, both only in `backend/.env` (never in the repo, chat or logs):
  - `DATABASE_URL`: pooled connection (Supabase pooler, transaction mode) used by the running app, with Prisma's pgbouncer setting as Supabase documents.
  - `DIRECT_URL`: direct connection used by Prisma migrations.
- `schema.prisma` reads `url = env("DATABASE_URL")` and `directUrl = env("DIRECT_URL")`.
- Local Docker PostgreSQL stays available as an option for offline development and tests.
- Check the Supabase plan before production (limits, backups, pausing of inactive projects).

## Decision 2: code standards
1. **Minimal comments.** Code explains itself through clear names, small functions and types. Comments only where the *why* is not obvious (a workaround, a legal or security reason). No commented-out code, no section banners, no comments restating the code, no auto-generated boilerplate comments.
2. **Nothing hard-coded.**
   - Configuration (URLs, ports, origins, secrets, SMTP, tracking IDs, feature switches) → environment variables, validated at startup.
   - Business content (headlines, page text, phone numbers, emails, addresses, social links, office details, CTA labels that the firm may change) → database (Page, Setting, Office …), served by the API.
   - Shared fixed values (enums, route paths, limits, status names) → `shared/src/constants`, imported, never repeated as string literals.
   - Design values (colours, fonts, spacing, radius, breakpoints) → design tokens in the Tailwind theme / CSS variables; no raw hex or pixel values in components.
   - Interface wording that is part of the UI shell (e.g. "Read more", form labels, error messages) → one dictionary file in the frontend, not scattered in components.
3. **Clean structure.** One responsibility per file; feature folders as in STRUCTURE.md; no dead code, unused exports or `TODO`s left in merged code; consistent naming; no `any`.

## Consequences
- AGENTS.md and STRUCTURE.md carry these rules; every brief references them.
- The agent reports any value it could not avoid hard-coding, with the reason.
