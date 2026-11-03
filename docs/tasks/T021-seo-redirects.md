# T021: SEO layer + redirects

**Status:** Done
**Week:** 1 (Version 1, Day 3)
**Priority:** High

## Goal
- Per-route `generateMetadata`: title template (from Settings), description, canonical (self, absolute, from `SITE_URL` env), Open Graph + Twitter cards (image from record or a default from Settings), `robots` (noindex for admin, search, 404, and **all pages when `SITE_INDEXABLE=false`**, which is the default for V1/staging).
- JSON-LD: `LegalService` + `Organization` (name, logo, offices with addresses, phones, socials), `WebSite` with `SearchAction`, `Person` for profiled team members, `Article` for insights (author, dates, image), `FAQPage` where an FAQ exists, `Event` for upcoming webinars, `BreadcrumbList`.
- `sitemap.xml` from indexable, published records only (no redirects, no noindex); `robots.txt` that follows `SITE_INDEXABLE` (disallow all when false).
- Verification tags (Google, Bing) from Settings, rendered only when `SITE_INDEXABLE=true`.
- Redirects: middleware looks up the Redirect table (cached, revalidated by env interval) and issues a single 301; add pattern rules: `/author/*` and `/zh/author/*` → `/our-team/`, `/zh` and `/zh/*` → path without `/zh`, `/tag/*` → `/insights/`, MailPoet URLs → `/insights/` (decision 0010). Trailing-slash policy matches the current site (with slash), one hop.
- RSS feed at `/feed/` (latest insights).
- Check every URL in `docs/seo/url-inventory.csv` against the production build: each returns 200 at the same path or one 301 to its `proposed_new_url`. Write the result table to `docs/reports/v1-url-check.md`.

## Done when
- [x] URL check shows 0 failures (or each exception explained); metadata and JSON-LD validate (record how you checked).

## Files / inputs
- `docs/prompts/05-AGENT-V1-DAY3-FORMS-SEO-RELEASE.md`

## Result
Per-route metadata with absolute canonicals, Open Graph, Twitter cards and a title template from Settings; everything is noindex while `SITE_INDEXABLE=false`, and `robots.txt`, the sitemap and verification tags follow the same switch. JSON-LD covers LegalService and Organization, WebSite with SearchAction, Person, Article, FAQPage, Event and BreadcrumbList. `src/proxy.ts` issues one 301 from the cached Redirect table and pattern rules, including trailing slashes. RSS is at `/feed/`. URL check: 101 passed, 0 failed (`docs/reports/v1-url-check.md`). Metadata and JSON-LD were checked with `scripts/qa/check-seo.mjs` on rendered pages and with unit tests; Google's Rich Results Test needs a public URL, so it hasn't been run. Inventory changes: author and MailPoet targets per decision 0010, and `/insights/page/4/` now redirects to the last page because the 4 dropped posts removed that page.
