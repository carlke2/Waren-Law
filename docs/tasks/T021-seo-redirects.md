# T021: SEO layer + redirects

**Status:** Ready
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
- [ ] URL check shows 0 failures (or each exception explained); metadata and JSON-LD validate (record how you checked).

## Files / inputs
- `docs/prompts/05-AGENT-V1-DAY3-FORMS-SEO-RELEASE.md`

## Result
_(Filled in by the agent: what was done, files changed, questions or blockers.)_
