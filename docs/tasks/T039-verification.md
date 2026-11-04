# T039: Verification

**Status:** Ready
**Week:** 1
**Priority:** High

## Goal
Prove the build matches the design in production mode, then stop all servers.

## Steps
See `docs/prompts/06-AGENT-HOME-PAGE.md`, section 1.

## Done when
- [ ] Production build and start with `pnpm build && pnpm start`
- [ ] WebP screenshots at all listed widths, first-screen captures and a side-by-side in `docs/reports/home-v3/`
- [ ] Playwright and visual snapshots at 375 and 1440
- [ ] Lighthouse mobile recorded, and the theme check demonstrated then reverted
- [ ] All servers stopped

## Files / inputs
- `docs/GROUND-RULES.md`, `docs/design/DESIGN-SPEC.md` v3.4, `docs/design/reference/home-design-v3.dc.html`, `docs/design/reference/home-phone.dc.html`

## Result
_(Filled in by the agent: what was done, files changed, questions or blockers.)_
