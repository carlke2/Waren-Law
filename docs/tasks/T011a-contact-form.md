# T011a: Contact form, end to end

**Status:** Done
**Week:** 1 (Version 1, Day 3)
**Priority:** High

## Goal
- Backend `POST /api/v1/contact`: validates with the shared Zod schema; honeypot field (silently accept and discard bots); rate limit per IP (from env); stores a `ContactSubmission` with minimal data and `consentAt`; sends an email to the firm address from Settings via SMTP when `SMTP_*` env values are present.
- **If SMTP is not configured**, the submission is still stored and the API still returns success; log a single warning at startup that email delivery is disabled. Never fail the visitor because email is off.
- Email body: plain, no tracking; includes name, email, phone, message, source page, time.
- Frontend: enable the form from T020; loading, success and error states from the dictionary; accessible error messages; no full page reload.
- Retention: a scheduled job (interval from env) deletes submissions older than the retention period from env (default 12 months).
- Tests: validation, honeypot, rate limit, stored record, email sent when configured (mock transport), success when not configured.

## Done when
- [x] submitting the form on a production build stores the record; tests pass.

## Files / inputs
- `docs/prompts/05-AGENT-V1-DAY3-FORMS-SEO-RELEASE.md`

## Result
`POST /api/v1/contact` validates with the shared schema, stores a minimal `ContactSubmission` with `consentAt`, silently discards honeypot submissions, limits requests per IP from env, and emails the firm address from Settings when `SMTP_*` is set. Without SMTP, or if the mail server fails, the record is kept and the visitor still gets success; a single startup warning is logged. A scheduled job deletes submissions past the retention period. The form now submits without a page reload, with sending, success and error states. Verified on a production build with the local database: valid stored, invalid rejected, honeypot discarded. No email has been sent, because no SMTP values are set.
