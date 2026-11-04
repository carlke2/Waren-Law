# T037: Tokens, fonts, header, footer

**Status:** Done
**Week:** 1
**Priority:** High

## Goal
Build the one-file theme, then the header, footer, floating controls and holding page from it.

## Steps
See `docs/prompts/06-AGENT-HOME-PAGE.md`, section 1.

## Done when
- [x] `theme.css`, `fonts.ts`, Tailwind mapped to semantic tokens only, and `scripts/check-theme.ts` wired into `pnpm lint`
- [x] Transparent header over the hero that turns solid navy on scroll, with a full-screen mobile menu
- [x] Footer with native newsletter form, WhatsApp link button and consent panel
- [x] Holding page for nav targets not yet built

## Files / inputs
- `docs/GROUND-RULES.md`, `docs/design/DESIGN-SPEC.md` v3.4, `docs/design/reference/home-design-v3.dc.html`, `docs/design/reference/home-phone.dc.html`

## Result
Built the theme file, fonts, theme check, header, footer, WhatsApp button, consent panel and holding page. See `docs/reports/T037-report.md`. The spec gives no values for the success and error colours, so they point at existing palette colours; raised in the brief report.
