# T058 — Header mega-menu (Phase 2)

**Status:** Done — awaiting review  
**Branch:** `task/T058-header`  
**Screenshots / recording:** `docs/reports/t058-header/`

## Confirmations
- No homepage section, content, image or style was edited in this phase. Homepage files remain as approved in T057 (unchanged for Phase 2 work beyond the branch already carrying that homepage).
- **Book a Consultation** and the info email are removed from the header (verified in HTML and screenshots).
- Header bar is 96px on desktop; open state uses panel colour `#F4F4F2`; overlay is ink-based (no blue).
- Desktop panels are absolutely positioned under the bar: opening/switching/closing does not move the hero (0px shift at 1440 and 1024). Mobile menu is fixed overlay (0px shift at 390).
- Header is `position: relative` (not sticky/fixed). It scrolls away and only returns at the top. An open panel closes on scroll.
- Demo recording: `docs/reports/t058-header/header-float-scroll.webm`

## Screenshots
### Desktop (1440)
- `desktop-resting.png` / `desktop-resting-full.png` — resting header
- `desktop-panel-about.png`
- `desktop-panel-team.png`
- `desktop-panel-partners.png`
- `desktop-panel-expertise.png`
- `desktop-panel-insights.png`
- `desktop-panel-contact.png`
- `desktop-hovered-row.png` — gold row hover with dark text

### Mobile (390)
- `mobile-closed.png`
- `mobile-menu-open.png`
- `mobile-section-expanded.png` — Our Team accordion open

## Placeholders / missing content
- **Our Team:** 10 people have no profile page yet (names link to `/our-team/`): Margaret Wanjiru, Eutycus Kamathi, Charity Wambui, Fridah Gakii, Davis Wachira, Jimmy Wamalwa, Mary Wanjiku, Alex Maina, Charles Ndombi, Florence Wambugu.
- **Our Partners featured:** Beijing Jingping Law Firm and Beijing Matrix Law Firm have no logo/photo in the database (featured rows show name/description only).

## Tests
- `navigation.spec.ts`: 6 passed (panel buttons, keyboard Esc, panel swap, mobile accordion).

## Notes
- Concept video `waren_header_concept.mp4` was not found on disk; built from the written brief and pwc.com pattern.
- Decision: `docs/decisions/0027-header-mega-menu.md`.
