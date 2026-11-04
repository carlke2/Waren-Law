# T036: Home content model (backend)

**Status:** Ready
**Week:** 1
**Priority:** High

## Goal
Give the Home page, practice areas and Settings the data the locked design needs, and add the newsletter endpoint.

## Steps
See `docs/prompts/06-AGENT-HOME-PAGE.md`, section 1.

## Done when
- [ ] Home record, PracticeArea `icon` and `cardSummary`, and Settings fields exist, with a migration, shared Zod schemas and API responses
- [ ] Design copy is seeded idempotently through the import curation
- [ ] `POST /api/v1/newsletter` is validated, has a honeypot, is rate-limited and stores a Subscriber with consent time; double opt-in email only when SMTP is configured
- [ ] Every image source is recorded in `docs/design/image-sources.md`

## Files / inputs
- `docs/GROUND-RULES.md`, `docs/design/DESIGN-SPEC.md` v3.4, `docs/design/reference/home-design-v3.dc.html`, `docs/design/reference/home-phone.dc.html`

## Result
_(Filled in by the agent: what was done, files changed, questions or blockers.)_
