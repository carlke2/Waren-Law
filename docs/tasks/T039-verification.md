# T039: Verification

**Status:** Done
**Week:** 1
**Priority:** High

## Goal
Prove the build matches the design in production mode, then stop all servers.

## Steps
See `docs/prompts/06-AGENT-HOME-PAGE.md`, section 1.

## Done when
- [x] Production build and start with `pnpm build && pnpm start`
- [x] WebP screenshots at all listed widths, first-screen captures and a side-by-side in `docs/reports/home-v3/`
- [x] Playwright and visual snapshots at 375 and 1440
- [x] Lighthouse mobile recorded, and the theme check demonstrated then reverted
- [x] All servers stopped

## Files / inputs
- `docs/GROUND-RULES.md`, `docs/design/DESIGN-SPEC.md` v3.4, `docs/design/reference/home-design-v3.dc.html`, `docs/design/reference/home-phone.dc.html`

## Result
Verified in production mode: 39 Playwright tests, visual baselines, screenshots and Lighthouse. See `docs/reports/T039-report.md` and `docs/reports/brief-06-report.md`. All servers are stopped.
