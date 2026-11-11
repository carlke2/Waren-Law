# 0027: Header mega-menu (PwC-style panels)

**Date:** 2026-11-11
**Status:** Accepted

## Decision
Replace the previous header (top bar with booking/email + direct nav links) with a single ~96px white bar whose six items each open a full-width dropdown panel. Panel content is assembled server-side from the API (`buildHeaderMenu`). Mobile (&lt;1024px) uses a full-screen accordion. Booking CTA and info email are removed from the header only.

## Why
Phase 2 brief: match the approved header concept and pwc.com pattern where every item opens a panel, while keeping homepage sections untouched and sourcing people/offices/insights from the database.

## Consequences
- `--spacing-header` is 6rem (96px); hero `-mt-header` still aligns under the header bar at the top of the page.
- The header is not sticky: it scrolls away with the page and only returns at the top.
- Desktop panels are absolutely positioned under the bar (no layout shift); scroll closes an open panel.
- Panel surface uses `--palette-panel` (#f4f4f2); overlay is ink-based, not brand blue.
- Navigation e2e targets panel buttons and keyboard open/close instead of direct primary links.
- Missing webinars, photos or partner pages are reported as placeholders rather than invented.
