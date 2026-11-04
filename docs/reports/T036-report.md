## Report: T036 — Home content model (backend)
Status: Done
Branch / PR: `task/T036-home-content-model`, fast-forwarded to `main`
Summary: Added `HomeContent`, the PracticeArea card fields, the new Settings fields and `GET /api/v1/home`. `POST /api/v1/newsletter` validates, has a honeypot, is rate-limited and stores a Subscriber with consent time; it sends a double opt-in email only when SMTP is set. The migration is applied to Supabase. The seed runs through the import curation, and a second run changed 0 records with 0 network requests.
Done when:
- ✅ Model, migration (RLS on), shared schemas and API responses
- ✅ Idempotent seed with the design's copy
- ✅ Newsletter endpoint. Tests cover validation, honeypot, duplicates, rate limit, opt-in and mail failure. No real email was sent because SMTP isn't set.
- ✅ `docs/design/image-sources.md`
- ✅ Lint and typecheck pass; tests: backend 94, frontend 49, import 18
Files changed: `backend/prisma/**`, `backend/src/modules/{home,newsletter}/**`, `backend/src/modules/{contact,practice-areas}/*`, `backend/src/app.module.ts`, `backend/src/config/env.schema.ts`, `backend/tests/**`, `shared/src/**`, `scripts/import-wordpress/src/**`, `docs/design/assets/hero-skyline-illustration.svg`, `docs/design/image-sources.md`, `docs/runbook.md`, env examples
Dependencies added: none
Decisions made: 0018
Env changes: new optional `NEWSLETTER_RATE_LIMIT_PER_HOUR` (default 5) in the `.env.example` files. No `.env` file was changed.
Questions / blockers: see decision 0018 (the firm reviews the new wording and role titles; hero photo gap)
Suggested next step: T037
