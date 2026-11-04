# T036: Home content model (backend)

**Status:** Done
**Week:** 1
**Priority:** High

## Goal
Give the Home page, practice areas and Settings the data the locked design needs, and add the newsletter endpoint.

## Steps
See `docs/prompts/06-AGENT-HOME-PAGE.md`, section 1.

## Done when
- [x] Home record, PracticeArea `icon` and `cardSummary`, and Settings fields exist, with a migration, shared Zod schemas and API responses
- [x] Design copy is seeded idempotently through the import curation
- [x] `POST /api/v1/newsletter` is validated, has a honeypot, is rate-limited and stores a Subscriber with consent time; double opt-in email only when SMTP is configured
- [x] Every image source is recorded in `docs/design/image-sources.md`

## Files / inputs
- `docs/GROUND-RULES.md`, `docs/design/DESIGN-SPEC.md` v3.4, `docs/design/reference/home-design-v3.dc.html`, `docs/design/reference/home-phone.dc.html`

## Result
Added the Home record, card fields, Settings fields, the newsletter endpoint and an idempotent seed; the migration is applied to Supabase. See `docs/reports/T036-report.md`.
