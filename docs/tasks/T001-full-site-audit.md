# T001: Analyse the existing WordPress site (warenlaw.com)

**Status:** Ready
**Week:** 1
**Priority:** High
**Brief:** `docs/prompts/02-AGENT-WORDPRESS-ANALYSIS.md`

## Goal
Record everything that exists on the current site (every page, URL, piece of content, image, video, form, link and technical setting) and what is wrong with it. This is the input for the design discussion, the system flow, the database model, the redirect map and the content migration.

Read-only. Nothing on the live site is changed.

## Steps
See the brief, sections 3–4.

## Done when
- [ ] `docs/audit/01-site-inventory.md`: every URL in one table with the per-page fields
- [ ] `docs/audit/02-content-and-media.md`: About, full team list, partners, 8 practice areas, all insights and webinars, contact, client logos, media
- [ ] `docs/audit/03-technical-seo.md`: links, SEO, technical setup, URL behaviour, site features, forms, performance, accessibility, mobile
- [ ] `docs/audit/04-compliance-security-trust.md`: security headers/SSL, privacy and cookie pages, items for the firm to check against professional rules, trust signals, domain and email records
- [ ] `docs/audit/05-design-and-user-flow.md`: current design system, page layouts and visitor journeys, with strengths and weaknesses
- [ ] `docs/audit/06-findings-and-recommendations.md`: prioritised issues, keep/rewrite/drop, proposed sitemap, proposed data model, features to add/keep, launch dependencies, coverage check
- [ ] `docs/seo/url-inventory.csv`: `url,type,title,in_menu,http_status,word_count,keep_rewrite_drop,proposed_new_url,notes`
- [ ] `docs/reports/T001-report.md` in the standard report format
- [ ] No credentials, no copied full articles (summaries only), no personal data beyond what is publicly on the site
- [ ] No scanning, login attempts or form submissions on the live site
- [ ] No application code written, nothing installed in `frontend/` or `backend/`

## Files / inputs
- Live site: https://warenlaw.com (read-only)
- Earlier quick look: `docs/audit/00-first-look.md`
- Direction and structure: `docs/DIRECTION.md`, `docs/STRUCTURE.md`

## Result
_(Filled in by the agent: what was done, files changed, questions or blockers.)_
