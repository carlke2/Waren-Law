# T020: Contact, Partners, legal pages, search, 404

**Status:** Done
**Week:** 1 (Version 1, Day 2)
**Priority:** High

## Goal
Contact: offices (Nairobi, Nakuru, Beijing) each with address and map embed from the Office record, phones, email, WhatsApp, booking, and the **contact form UI** (fields, validation with the shared Zod schema, privacy notice, honeypot field; submission wiring is T011a tomorrow — today submit is disabled with the dictionary message). Partners page (partners, joint office). Privacy, Terms/Disclaimer and Cookie Policy pages from Page records: Privacy uses the firm's existing privacy text; Terms/Disclaimer and Cookie Policy get short, neutral, factual text (what the site is, that content is general information and not legal advice, which cookies are used and how consent works), added through the import curation. List all three in the report for the firm's advocate to review before launch. Search page `/search?q=` using the API. Styled 404.

## Done when
- [x] All listed items work with real content; lint, typecheck, tests and build pass.

## Files / inputs
- `docs/prompts/04-AGENT-V1-DAY2-DESIGN-PAGES.md`

## Result
Contact shows offices with click-to-load Google maps (so no request reaches Google before a visitor asks), phones, email, WhatsApp, booking and the contact form: validated with the shared Zod schema, with a privacy notice and honeypot, and submit disabled until T011a. Partners shows partners, signing galleries and the joint office. Privacy, Terms and Cookie Policy render from Page records; Terms and Cookie Policy are new, marked `needs_advocate_review`, show a visible notice, and are hidden in production until approved (decision 0011). `/search/?q=` uses the API and works without JavaScript, and the 404 is styled.
