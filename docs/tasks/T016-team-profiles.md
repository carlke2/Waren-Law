# T016: Team + profiles

**Status:** Done
**Week:** 1 (Version 1, Day 2)
**Priority:** High

## Goal
`/our-team/`: grouped (Partners, Advocates, Consultants, Staff) with practice-area filter chips (URL query `?practiceArea=` so filtered views are shareable; works without JS as links); consistent portrait cards (name, role, practice areas; link to profile when `hasProfile`). `/our-team/[slug]/`: portrait, name, role, practice areas (linked), office, contact actions (email, phone, WhatsApp, LinkedIn, booking — only those present), bio, experience, education, admissions, memberships, languages, their insights, CTA. Old `/ephraim-ndegwa/` handled by redirect (T021).

## Done when
- [x] All listed items work with real content; lint, typecheck, tests and build pass.

## Files / inputs
- `docs/prompts/04-AGENT-V1-DAY2-DESIGN-PAGES.md`

## Result
`/our-team/` groups people into Partners, Advocates, Consultants and Staff, with practice-area filter chips that are real links (`?practiceArea=`), so filtered views are shareable and work without JavaScript. Cards use one portrait crop. `/our-team/[slug]/` shows portrait, role, linked practice areas, office, contact actions that exist, bio, experience, credentials, languages, insights and a booking CTA. Staff have no profile pages. The filtered route renders per request because it reads the query string; its data still comes from the cached API fetches.
