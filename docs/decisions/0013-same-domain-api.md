# 0013: API served on the site's own domain

**Date:** 3 November 2026
**Status:** Accepted, for the planner to confirm

## Decision
Nginx serves the site, `/api/` and `/uploads/` on one domain, instead of a separate `api.warenlaw.com` as `DIRECTION.md` sketches. Brief 05 allows either and asks for the choice to be recorded. The same rule works without Nginx: Next.js forwards `/api/v1/*` to `API_URL`.

Brotli is not enabled, because the official Nginx image doesn't include it. Nginx uses gzip.

## Why
One domain needs no extra DNS record or certificate, avoids cross-origin requests from the contact form, and keeps the Content Security Policy simple.

## Consequences
- `FRONTEND_URL` and `SITE_URL` are the same address in production.
- The V2 admin can keep this layout, or move to a subdomain if its session cookie needs that.
