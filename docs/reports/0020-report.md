## Report: Decision 0020 — answers to the brief 06 review
Status: Done, except that LCP is above the 3.0 s limit
Branch / PR: `task/0020-home-review-answers`, merged to `main`
Summary: All seven review answers are applied. Home is published in production without a review gate, and the firm's review is tracked in `docs/content/firm-review-list.md`. Newsreader is 36% smaller with the same look, but LCP measured 3.2–3.4 s because it depends on main-thread work, not the font.
Done when:
- ✅ 1. Home record `approved`, gate removed from `GET /api/v1/home`, firm review list created
- ✅ 2. Phylis Njane's alt text is "Phylis Njane, Partner"; "Ruiru" no longer appears on Home
- ✅ 3. Newsletter line and Privacy Policy link, from the dictionary
- ✅ 4. Four form-state tokens added; footer form uses the on-brand pair (tested by colour)
- ✅ 5. Hero card links in the database; each page answers 200
- ❌ 6. Font reduced from 132 KB to 85 KB and look kept, but LCP is 3.2–3.4 s, above the 3.0 s limit. Measurements are in decision 0020
- ✅ 7. Planner files committed
Tests: unit and API 184 (frontend 74, backend 92, import 18), imported-content checks 18, Playwright 42. The backend count fell because three Home gate tests became one. Lint, theme check and typecheck pass. The two visual snapshots were refreshed after checking the changes.
Changes outside the repo: import re-run on Supabase (Home approved, hero links, one portrait alt text). A second run changed nothing. No `.env` changed.
Files changed: `backend/src/modules/home/home.service.ts`, `backend/tests/**`, `frontend/src/styles/{theme.css,fonts.ts,fonts/**}`, `frontend/src/components/site/newsletter-form.tsx`, `frontend/src/lib/dictionary.ts`, `frontend/e2e/**`, `scripts/import-wordpress/src/{curation.ts,media.ts,importers/site.ts,importers/team.ts}`, `docs/**`
Dependencies added: none. `fonttools` was used once outside the repo
Decisions made: 0020
Questions / blockers: is 3.2–3.4 s acceptable until it is measured on staging, or should the page's JavaScript be reduced?
Suggested next step: measure LCP on staging, away from a busy development machine.
