# T028a: Import existing content from the WordPress REST API

**Status:** Ready
**Week:** 1 (Version 1, Day 1)
**Priority:** High

## Goal
Script in `scripts/import-wordpress/` (TypeScript, run with `pnpm import:wp`), **idempotent** (safe to re-run; upserts by slug / legacy WordPress ID):
- **Insights:** all 36 posts → title, slug, excerpt, body converted from HTML to the block JSON format used by `Page/Insight.body` (document the format in `shared/`), publishedAt, categories, featured image, legacy ID, reading minutes. Drop the 4 generic ~120-word posts per decision 0004, but record them for redirects.
- **Categories:** keep 8, merge the rest as in audit 06; add a "Data Protection" category for the uncategorised data-protection articles.
- **Practice areas:** 8 records from the practice pages; **merge the two debt pages into `corporate-debt-recovery`** without testimonials or unverified claims; link related insights by category.
- **Team:** all 20 people (name, role, memberType, short bio, practice areas, office, contacts where public, portrait); full profile content for Janice, Ephraim and Cecilia; `hasProfile = true` for partners, advocates and consultants. Use the cleanest available portrait file.
- **Webinars:** 3 records with state (`recording` / `past`) and panel links.
- **Pages:** Home, About, Partners, Contact, Privacy text as Page records.
- **Settings + Offices:** phones, email, WhatsApp, socials (current LinkedIn URL), booking URL, tracking IDs from audit 06; offices Nairobi (head), Nakuru (branch), Beijing (joint).
- **Partners + Awards:** 3 partners; the Legal Insider 2025 award.
- **Client logos:** all 14 imported with `permissionConfirmed = false` (hidden).
- **Media:** download only images actually used by imported records into `backend/uploads/` (git-ignored), rename to clean kebab-case names, convert to WebP, keep `legacyUrl`, set alt text (existing or generated from context, flagged for review).
- **Redirects:** load `docs/seo/url-inventory.csv` rows with a different `proposed_new_url` into the Redirect table.
- Imported published content → `legalReviewStatus = approved` (decision 0005). Fix the known data errors while importing (Cecilia's email link, WhatsApp number format, phone link mismatch, "Intergrity" typo) and list each fix.
- Prints a summary (counts per entity, skipped items, warnings).
Source URLs, rate limit and paths come from env/config, not literals.

## Done when
- [ ] `pnpm import:wp` fills the Supabase database with the counts above; re-running changes nothing.

## Files / inputs
- `docs/prompts/03-AGENT-V1-DAY1-FOUNDATION-DATA.md`

## Result
_(Filled in by the agent: what was done, files changed, questions or blockers.)_
