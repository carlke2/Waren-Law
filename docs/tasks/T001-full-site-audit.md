# T001: Analyse the existing WordPress site (warenlaw.com)

**Status:** Done
**Week:** 1
**Priority:** High
**Brief:** `docs/prompts/02-AGENT-WORDPRESS-ANALYSIS.md`

## Goal
Record everything that exists on the current site (every page, URL, piece of content, image, video, form, link and technical setting) and what is wrong with it. This is the input for the design discussion, the system flow, the database model, the redirect map and the content migration.

Read-only. Nothing on the live site is changed.

## Steps
See the brief, sections 3–4.

## Done when
- [x] `docs/audit/01-site-inventory.md`: every URL in one table with the per-page fields
- [x] `docs/audit/02-content-and-media.md`: About, full team list, partners, 8 practice areas, all insights and webinars, contact, client logos, media
- [x] `docs/audit/03-technical-seo.md`: links, SEO, technical setup, URL behaviour, site features, forms, performance, accessibility, mobile
- [x] `docs/audit/04-compliance-security-trust.md`: security headers/SSL, privacy and cookie pages, items for the firm to check against professional rules, trust signals, domain and email records
- [x] `docs/audit/05-design-and-user-flow.md`: current design system, page layouts and visitor journeys, with strengths and weaknesses
- [x] `docs/audit/06-findings-and-recommendations.md`: prioritised issues, keep/rewrite/drop, proposed sitemap, proposed data model, features to add/keep, launch dependencies, coverage check
- [x] `docs/seo/url-inventory.csv`: `url,type,title,in_menu,http_status,word_count,keep_rewrite_drop,proposed_new_url,notes`
- [x] `docs/reports/T001-report.md` in the standard report format
- [x] No credentials, no copied full articles (summaries only), no personal data beyond what is publicly on the site
- [x] No scanning, login attempts or form submissions on the live site
- [x] No application code written, nothing installed in `frontend/` or `backend/`

## Files / inputs
- Live site: https://warenlaw.com (read-only)
- Earlier quick look: `docs/audit/00-first-look.md`
- Direction and structure: `docs/DIRECTION.md`, `docs/STRUCTURE.md`

## Result
Done on 3 November 2026. The site was analysed read-only and all deliverables are in `docs/audit/` and `docs/seo/`. Full report: `docs/reports/T001-report.md`. It records one deviation (Chrome rendering exceeded the ~1 request per second limit), and that the pull request could not be opened from this machine. Most urgent for the firm: the domain expires on 29 November 2026, and placeholder testimonials are live on `/corporate-debt-recovery/`.
