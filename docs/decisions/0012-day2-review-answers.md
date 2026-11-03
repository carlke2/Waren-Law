# 0012: Answers to the V1 Day 2 review

**Date:** 3 November 2026
**Status:** Accepted

## Decisions
1. **Terms and Cookie Policy (decision 0011 accepted).** Visible on local and staging (`PREVIEW_UNREVIEWED_PAGES=true`), hidden in production until the firm's advocate approves them. Approval of both is a **launch checklist item** (T034), because the cookie banner links to the Cookie Policy. `PREVIEW_UNREVIEWED_PAGES` must be `false` in production env examples and the runbook.
2. **"Acted for the Applicant in Kinyua v Absa" stays.** It states the firm's role, not an outcome, and the firm already published it. Add both articles to the advocate review list in the V1 release notes.
3. **About video for Thursday:** poster with "coming soon" is acceptable. If the owner supplies a clip or a YouTube link from the firm's channel, it goes into Settings (no code change).
4. **Home LCP 2.6 s:** accepted for V1 (local measurement, cold cache). Recheck on staging behind Nginx caching in T032a.
5. **American spellings in the firm's own text:** left as written; listed for the content review in V3.1.
6. **Agent additions accepted:** `SKIP_PRERENDER`, `GET /api/v1/resolve` slug list, media and review status in API responses, per-request rendering for `/our-team/` and `/search/`, click-to-load maps.
