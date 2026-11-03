# T013: Layout

**Status:** Done
**Week:** 1 (Version 1, Day 2)
**Priority:** High

## Goal
Header (logo, primary nav per audit 06 sitemap with Areas of Expertise dropdown, "Book a consultation" CTA; sticky; mobile menu with focus trap), Footer (offices from API, quick links, practice areas, socials, legal links, copyright with current year), floating WhatsApp button (number + prefilled message from Settings), **cookie consent banner** (accept / reject / preferences; stored in a first-party cookie; GTM, Google tag and Meta Pixel load **only after** consent, IDs from Settings), skip link, `not-found`, `error`, and the shared page template (breadcrumb + hero/heading + content + CTA band).

## Done when
- [x] layout on every route, consent verified (no tracking requests before accept), mobile menu keyboard-usable.

## Files / inputs
- `docs/prompts/04-AGENT-V1-DAY2-DESIGN-PAGES.md`

## Result
Header with Areas of Expertise dropdown and sticky navy bar, mobile menu with focus trap, footer driven by the API, floating WhatsApp button, first-party cookie consent (accept, reject, preferences) with GTM, Google tag and Meta Pixel loaded only after consent, skip link, styled not-found and error pages, a catch-all so deep unknown URLs get the site's 404, and the shared PageHero and CtaBand. `SKIP_PRERENDER` lets CI build without an API. Consent and the mobile menu have component tests; a real-browser check is in the Day 2 report.
