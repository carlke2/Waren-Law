## Report: T039 — Verification
Status: Done
Branch / PR: `task/T039-verification`, fast-forwarded to `main`
Summary: Home was built and checked in production mode with `pnpm build` and `pnpm start`. Screenshots and the side-by-sides are in `docs/reports/home-v3/`. Playwright passes 39 of 39 and Lighthouse mobile meets the spec's score targets. Verification found one real ground-rule breach, automatic link prefetching, which is fixed and now tested (decision 0019).
Done when:
- ✅ `pnpm build && pnpm start`, added as root commands
- ✅ WebP screenshots at 360, 390, 430, 768, 1024, 1280, 1440, 1920; first screens at 1366 × 768 and 1920 × 1080; side-by-sides at 1440 and 390
- ✅ Playwright: header, mobile menu and keyboard; practice, team and insight links; newsletter states; consent with no Google or Meta requests before Accept; visual snapshots at 375 and 1440
- ✅ Lighthouse mobile recorded, after a cold run, on a temporary build with `SITE_INDEXABLE=true`: performance 93, accessibility 100, best practices 100, SEO 100, LCP 3.0 s, CLS 0. Without that setting the site is `noindex` on purpose, which lowers the SEO score.
- ✅ Theme check: changed `--palette-navy-900` once, captured `theme-check-navy-900-temporary.webp`, reverted, rebuilt
- ✅ All servers stopped; ports 3000 and 4000 are free
Also checked by hand: with the backend stopped, `/`, `/about-us/` and a profile still answer 200 from the last build; an old URL still redirects with 301; an invalid newsletter post through the frontend answers 400.
Not tested: a real newsletter post through the frontend, to avoid adding a row to Supabase (Playwright mocks it; backend tests cover the real endpoint on the test database); real email, because SMTP isn't set; a mid-revalidation backend outage.
Files changed: `frontend/e2e/**`, `frontend/playwright.config.ts`, `frontend/src/components/**` (`SiteLink`), `frontend/src/components/home/hero.tsx`, `frontend/src/components/site/newsletter-form.tsx`, `frontend/src/lib/navigation.ts`, `scripts/{build,start}-production.sh`, `scripts/run-production.sh` (deleted), `package.json`, `docs/reports/home-v3/**`, `docs/runbook.md`, `README.md`, `scripts/README.md`
Dependencies added: `@playwright/test` (dev, allowed by the brief; uses the installed Chrome, so no browser download)
Decisions made: 0019
Questions / blockers: see `docs/reports/brief-06-report.md`
Suggested next step: owner and planner review Home
