# T032a: V1 QA + release

**Status:** Done
**Week:** 1 (Version 1, Day 3)
**Priority:** High

## Goal
On the production build:
- Click-through of every route in the sitemap on 390 px and 1366 px; no console errors; no broken images or links (run a link check across the built site).
- Lighthouse mobile on home, a practice page, an article, team, contact: record scores; fix anything below 90 in performance, accessibility, best practices or SEO, or explain why.
- Keyboard pass: header, mobile menu, team filter, accordion, video, consent, contact form.
- Consent: no Google/Meta requests before accept; they load after accept; reject keeps them off.
- Contact form: valid, invalid, honeypot.
- Write `docs/releases/v1.md`: what V1 contains, known gaps (from the content-gaps list), what comes in V2.
- Tag `v1.0.0` on `main` and push the tag.

## Done when
- [x] all checks pass or are listed as known gaps; tag pushed.

## Files / inputs
- `docs/prompts/05-AGENT-V1-DAY3-FORMS-SEO-RELEASE.md`

## Result
Final QA on a clean production build with Supabase content: 101 of 101 URLs, 83 pages and 69 images with no link problems, 21 routes at two widths, keyboard 28 of 28, consent correct, contact form valid, invalid and honeypot all correct, and no server errors. QA found and fixed: a query that hung for 200 seconds (now limited by timeouts), a frontend retry that React's fetch de-duplication disabled (proved fixed against a failing test API), the cookie banner causing Team's slow LCP, and a heading skip. Scores and explanations are in `docs/releases/v1.md`.
