## Report: T042 — Design cleanup
Status: Done
Branch / PR: task/T042-design-cleanup
Summary: Removed every design file other than the locked one and moved the match test to `home-design.html`, run with `pnpm test:match`.
Done when: deleted files ✅ · unused code removed ✅ · theme check and lint pass ✅ · match test updated ✅
Files changed: see the lists below.
Dependencies added: `pixelmatch`, `pngjs` (approved by brief 07), `@types/pngjs` (types for `pngjs`, development only)
Decisions made: none
Questions / blockers: none
Suggested next step: T043, finish Home.

Deleted docs: `docs/design/archive-DESIGN-SPEC-v1-corporate.md`, `docs/design/archive-DESIGN-SPEC-v2-teal.md`, `docs/design/reference/archive-teal-reference.png`, the four `*.dc.html` files, `docs/reports/v1-day2-screens/` (20 screenshots of the replaced design).
Deleted code: `parseHomeContent` and `HomeContent` in `lib/content/sections.ts`, and their test.
