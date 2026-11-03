# WAREN LAW WEBSITE REBUILD — AGENT BRIEF 02: ANALYSE THE EXISTING WORDPRESS SITE (T001)

You are the execution agent for the WAREN Law website rebuild. Follow `AGENTS.md`, `docs/DIRECTION.md` and `docs/STRUCTURE.md`.

**Prerequisite:** the project structure from brief 01 is merged into `main`. If it is not, stop and say so.

If `docs/tasks/T001-full-site-audit.md` is missing or does not match this brief, create or update it from this brief (Goal, Status, and a **Done when** checklist built from section 5), and save this brief as `docs/prompts/02-AGENT-WORDPRESS-ANALYSIS.md`.

## 1. Goal

Analyse the current https://warenlaw.com (WordPress + Elementor) completely and report back. Your findings are the input for:
- the **design and system-flow discussion** with the owner and planner,
- the **database model** (PostgreSQL via Prisma) and admin screens,
- the **redirect map** that protects search rankings,
- the **content migration** into the new system.

## 2. Scope and rules

- ✅ **Read-only.** Look at public pages, page source, sitemaps and the public WordPress REST API.
- ❌ Do not log in, submit forms, post comments, or change anything on the live site.
- ❌ Do not install packages or write application code in `frontend/`, `backend/` or `shared/`. Small read-only helper scripts are allowed in `scripts/audit/` (Node.js + TypeScript or plain Node); list them in your report.
- ❌ Do not copy full articles or page text into the repo. Summarise; short quotes (under 15 words) only where wording matters.
- ❌ Record only personal data already public on the site (names, roles, public contacts). Nothing else.
- Be polite to the server: no more than ~1 request per second, no load testing.
- If a source is unavailable (e.g. the REST API is disabled), note it and use another route.
- Work on branch `task/T001-wordpress-analysis`. Set `docs/tasks/T001-full-site-audit.md` to `In progress` when you start.

## 3. Where to look

1. **Sitemaps:** `https://warenlaw.com/sitemap_index.xml` and every child sitemap; also `/robots.txt`.
2. **WordPress REST API** (public, if enabled):
   - `/wp-json/wp/v2/pages?per_page=100`
   - `/wp-json/wp/v2/posts?per_page=100` (follow pagination)
   - `/wp-json/wp/v2/categories`, `/wp-json/wp/v2/tags`
   - `/wp-json/wp/v2/media?per_page=100`
   - `/wp-json/` (lists installed plugin namespaces)
3. **Crawl:** header menu, footer, and internal links from every page.
4. **Page source:** meta tags, canonical, Open Graph, schema (JSON-LD), scripts, stylesheets, plugin and theme hints.
5. **HTTP responses and headers:** status codes, redirects, security headers, caching, server/CDN hints (e.g. `curl -sI`).
6. **Public DNS and domain records:** registrar and expiry (WHOIS), nameservers, A/CNAME, MX, SPF, DMARC (e.g. `dig`/`nslookup`). Read-only lookups only.
7. **Public off-site presence:** the firm's linked social profiles (LinkedIn, Facebook, Instagram, YouTube) and Google Business listing, from public pages only — names, URLs, whether they match the site. Do not log in anywhere.

## 4. What to record

### A. Site inventory (every URL)
URL · type (page / post / category / tag / author / webinar / other) · HTTP status · title tag · meta description · H1 · main headings (H2) · approx. word count · purpose · primary call to action · in menu (y/n) · last modified (if available).

### B. Content and media
- **Home:** sections in order, what each says and does.
- **About Us:** content summary, any video or media.
- **Our Team:** every person: name, title, photo (yes/no, quality, consistent?), bio length, practice areas, links. How the page is laid out and what is weak about it.
- **Our Partners:** who they are and what is shown.
- **Areas of Expertise:** all 8 practice areas: content summary, length, CTA, related team members. Flag the duplicate debt-recovery pages (`/corporate-debt-recovery/` and `/debt-solutions-recovery-asset-tracing/`) and how they differ.
- **Insights:** every article: title, URL, date, author, categories/tags, featured image, approx. word count, topic (one line). Also webinars and events.
- **Contact:** form fields, where it submits (if visible), offices, map, phones, emails, WhatsApp widget.
- **Client logos:** each logo, file name, alt text, whether the brand is identifiable.
- **Media:** images (file name, alt text yes/no, dimensions/size where available), videos and embeds, PDFs or downloads.

### C. Technical, SEO, quality
- **Links:** broken internal/external links; wrong links (e.g. LinkedIn pointing to `maina-murimi-advocates`); social links.
- **SEO:** robots.txt, sitemaps, canonicals, duplicate titles/descriptions, missing H1s, structured data, Open Graph/Twitter cards, the `zh_CN` alternate, Search Console/Bing verification tags.
- **Technical:** WordPress/theme/plugin hints, tracking and analytics scripts, third-party scripts (chat, WhatsApp, fonts), forms plugin.
- **Performance:** page weight, number of requests, largest images, render-blocking assets (from source/headers; use PageSpeed/Lighthouse figures only if you can run them without installing anything into the app folders).
- **Accessibility:** missing alt text, heading order, colour contrast concerns, keyboard/focus issues visible from markup.
- **Mobile:** layout or usability problems you can identify.
- **URL behaviour:** http → https, www vs non-www, trailing slashes, existing redirects, the 404 page, pagination URLs, feeds (`/feed/`), author/tag/category archives, attachment pages, search results URLs (`/?s=`).
- **Site features:** internal search, newsletter or subscription forms, comments, cookie banner, pop-ups, live chat/WhatsApp widget behaviour, click-to-call links, maps embed, language switcher, favicon/app icons, web manifest.
- **Forms:** every form on the site: fields, required fields, validation, spam protection (CAPTCHA/honeypot), confirmation message, privacy notice next to it.

### D. Compliance, security and trust
- **Security (from public responses only):** HTTPS certificate (issuer, expiry), security headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy), exposed WordPress version, publicly visible login/admin URLs, user enumeration via `/wp-json/wp/v2/users` (note only whether it is exposed; do not record usernames). No scanning, no login attempts, no vulnerability testing.
- **Privacy and data protection:** privacy policy, cookie policy, terms/disclaimer — present or missing, last updated, and whether forms and tracking appear to have consent. Note anything to check against Kenya's Data Protection Act, 2019 (flag only; do not give legal conclusions).
- **Professional rules (flag for the firm only):** client logos, testimonials, claims of results or rankings, and other marketing content the firm should check against the Law Society of Kenya / advocates' marketing and advertising rules. Do not give legal advice; list items for the firm to confirm.
- **Trust signals:** LSK membership, advocate admissions, awards, testimonials, case highlights, firm registration details, office photos — present or missing.
- **Domain and email:** registrar, expiry date, nameservers, where DNS is managed, mail provider (from MX), SPF/DMARC present or missing. Note what the firm must hand over at launch (DNS access).

### E. Design and user flow
- **Current design system:** colours (hex where visible in CSS), fonts, logo variants, button styles, spacing, imagery style. Note inconsistencies.
- **Page layouts:** the section pattern of each page type (home, practice area, team, insight, contact).
- **Visitor journeys:** how a visitor gets from landing → understanding the firm → contacting it, for: (1) a corporate client, (2) an individual buying property, (3) a Kenyan in the diaspora. Where does each journey break or lose people?
- **Strengths to keep** and **weaknesses to fix**.

### F. Findings and recommendations
- Prioritised issue list (High / Medium / Low) with a one-line fix for each.
- For each page: keep / rewrite / merge / drop.
- Proposed sitemap for the new site.
- Proposed URL for each existing URL (input for the redirect map).
- **Proposed data model** for the backend: entities (e.g. Setting, Page, PracticeArea, TeamMember, Insight, Category, Webinar, ClientLogo, Media, Office, ContactSubmission), their fields with types, and relations (e.g. TeamMember ↔ PracticeArea many-to-many). Mark anything uncertain.
- Features the new site needs that the current one lacks (and features of the current site that must not be lost in the rebuild).
- Launch dependencies: DNS access, mail records to keep, verification tags to carry over, analytics to keep.
- Open questions for the firm (missing content, assets, approvals).
- **Coverage check:** a short list of anything in sections A–E you could not check and why.

## 5. Deliverables

| File | Contents |
|---|---|
| `docs/audit/01-site-inventory.md` | Section A as one table |
| `docs/audit/02-content-and-media.md` | Section B |
| `docs/audit/03-technical-seo.md` | Section C |
| `docs/audit/04-compliance-security-trust.md` | Section D |
| `docs/audit/05-design-and-user-flow.md` | Section E |
| `docs/audit/06-findings-and-recommendations.md` | Section F |
| `docs/seo/url-inventory.csv` | `url,type,title,in_menu,http_status,word_count,keep_rewrite_drop,proposed_new_url,notes` |
| `docs/reports/T001-report.md` | Standard report (format below) |

Each audit file starts with: date, sources used, and anything you could not check.

## 6. Finish

1. Check every **Done when** item in `docs/tasks/T001-full-site-audit.md`.
2. Commit as `T001: analyse existing WordPress site`, push the branch and open a pull request with the report as its description.
3. Set T001 to `Done` (or `Blocked`) and fill in **Result**.
4. Post the report below, then **stop**. Do not start any other task.

```
## Report: T001 — Analyse the existing WordPress site
Status: Done | Blocked
Branch / PR: <name or link>
Summary: <2–4 sentences>
Key numbers: <pages, posts, team members, practice areas, images, forms, broken links>
Not checked: <list or "none">
Top 5 issues: <list>
Done when: <each item ✅ or ❌ with a note>
Files changed: <list>
Dependencies added: <list or "none">
Decisions made: <list or "none">
Questions for the firm / blockers: <list or "none">
Suggested next step: <one line>
```
