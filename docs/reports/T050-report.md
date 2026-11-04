## Report: T050 — Release check
Status: Done
Branch / PR: task/T050-release-check
Summary: Every URL in `docs/seo/url-inventory.csv` returns 200 or one 301 to a page: 101 of 101 (`docs/reports/T050-url-check.md`). With `SITE_INDEXABLE=true` the sitemap lists 73 URLs, all 200, and robots allows the site except `/admin/` and `/search/`. With `SITE_INDEXABLE=false`, as now, every page is `noindex` and robots disallows everything.
Done when: redirects ✅ · sitemap ✅ · robots ✅
Files changed: `frontend/e2e/pages.spec.ts`, `frontend/e2e/design.match.ts`, URL check report.
Dependencies added: none
Decisions made: none
Questions / blockers: The sitemap includes Terms and Cookie Policy only where `PREVIEW_UNREVIEWED_PAGES=true`.
Suggested next step: final checks.
