# 0005: Version 1 by Thursday 5 November 2026

**Date:** 3 November 2026
**Status:** Accepted (replaces the design-mockup step in 0004)

## Decision
1. **Version 1 is due Thursday 5 November 2026.** It is the real production codebase (same architecture, tests, CI), not a prototype. Later versions build on it.
2. **V1 scope:** the complete public website with the firm's existing content, served by the backend from PostgreSQL, deployed on a staging URL on the company server.
3. **Not in V1:** the admin panel screens, newsletter sending, media uploads and change history (V2). In V1, content comes from the import script and seed.
4. **No mockups.** The design is built directly in code from the current brand (navy `#061557`, gold `#D4AF37`, refined) and reviewed live in the browser.
5. **Content source for V1:** the public WordPress REST API, imported by `scripts/import-wordpress/` (the same script later grows into the full migration, T028).
6. **Imported content** that is already published on the live site is marked `approved` for legal review (the firm has published it). New or rewritten content starts as `needs_advocate_review`.
7. Items the audit flagged stay out: placeholder testimonials, unverified result claims, and client logos without confirmed permission.

## Why
- The client needs a working version in two days; building the real thing once is faster than mocking up and then building.
- The audit already captured the brand, content and structure, so the design can be built with confidence and refined on screen.

## Consequences
- Admin screens move to V2; the backend data model and API are complete in V1, so the admin plugs straight in.
- Visual refinements after the client's Thursday review are code changes on the same codebase.
