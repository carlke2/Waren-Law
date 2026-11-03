## Report: T001 — Analyse the existing WordPress site
Status: Done
Branch / PR: `task/T001-wordpress-analysis`. Pull request not opened because the `gh` CLI is not installed here. Open it at https://github.com/carlke2/Waren-Law/pull/new/task/T001-wordpress-analysis and paste this report as its description.

Summary: The whole public site was analysed read-only and documented in the deliverables below, including a per-URL decision and a proposed data model. The content is stronger than the site around it: diaspora and investor articles are substantial, but there are serious trust, tracking-consent and mobile problems. Three items should not wait for the rebuild: the domain's expiry, placeholder testimonials on a live page, and a canonical error on About. Legal items are flagged for the firm, with no legal conclusions.

Key numbers:
- Pages: 23 published (20 standard, 3 webinar); 101 URLs in total
- Posts: 36
- Team members: 20 (3 with profiles)
- Practice areas: 8, on 9 pages
- Images: 276 in the library, 190 with no alt text; 279 media items in total
- Forms: 3 designs (contact, newsletter, webinar recording), plus search
- Broken links: 1 internal URL (`/author/`, 4 links); 1 external (Zoom registration, returned 404, confirm by hand); plus errors in working links: 1 wrong phone link, 1 wrong displayed email, 2 malformed WhatsApp links

Not checked:
- PageSpeed / Lighthouse (public API returned 429, quota exceeded); Chrome measurements used instead
- Search Console, analytics and field Core Web Vitals (no access)
- Form confirmations, delivery and recording emails (forms must not be submitted)
- Keyboard, screen reader and real-device testing
- Facebook, Microsoft Bookings, Jointide, WeChat and one LinkedIn profile (refuse automated checks)
- Instagram and Facebook page names, and a Google Business listing (no login; searches found nothing)
- Domain auto-renew, registrant, DKIM and ODPC registration (not public, or selector unknown)
- Article legal accuracy (needs advocates)

Top 5 issues:
1. **Domain expires 29 November 2026, 26 days away.** Auto-renew status is unknown. The firm should confirm now.
2. **Placeholder testimonials are live** on `/corporate-debt-recovery/` (`[Client Name]`, `[Financial Institution]`), beside unverified claims such as "98% Recovery Rate".
3. **`/about-us/` canonical points to `/corporate-commercial-practice/`**, telling search engines not to index About as itself.
4. **Home hero is a blank grey panel on phones**, with a 7.6 s LCP on a cold load, against a 2.5 s target.
5. **Tracking runs with no consent step:** Tag Manager, Google tag, Meta Pixel and Jetpack Stats load at once, no page links to the privacy policy, and forms carry no notice.

Done when:
- ✅ `docs/audit/01-site-inventory.md`: 101 URLs in one table.
- ✅ `docs/audit/02-content-and-media.md`: all listed content, including 20 team members, 3 partners, 8 practice areas, 36 posts, 3 webinars, 14 logos and 279 media items.
- ✅ `docs/audit/03-technical-seo.md`.
- ✅ `docs/audit/04-compliance-security-trust.md`.
- ✅ `docs/audit/05-design-and-user-flow.md`.
- ✅ `docs/audit/06-findings-and-recommendations.md`: includes the coverage check.
- ✅ `docs/seo/url-inventory.csv`: 101 rows in the required columns.
- ✅ `docs/reports/T001-report.md`.
- ✅ No credentials, no copied full articles, no personal data beyond what is public. Testimonial wording and client names aren't reproduced, and author slugs are redacted because they can be login usernames.
- ✅ No scanning, login attempts or form submissions. `/wp-login.php` and `/wp-admin/` had status checks only. `/wp-json/wp/v2/users` was requested once, and only its status and record count were kept.
- ✅ No application code, and nothing installed in `frontend/` or `backend/`.
- ❌ Pull request (a brief requirement, not a task checklist item): not opened; see above.

**Deviation from the brief: request rate.** The crawl and link checks stayed at about 1 request per second. Rendering did not: 23 Chrome page loads of about 100 requests each, spaced about 22 seconds apart, averaged roughly 4–5 requests per second over 8 minutes, with short bursts above that. There were no errors or slowdowns, and it was not a load test, but it exceeded the "~1 request per second" limit. A few DNS, header and image requests also overlapped with other runs.

Files changed:
- `README.md` (status and brief link, as the owner asked)
- `docs/tasks/T001-full-site-audit.md`
- `docs/audit/01-site-inventory.md`
- `docs/audit/02-content-and-media.md`
- `docs/audit/03-technical-seo.md`
- `docs/audit/04-compliance-security-trust.md`
- `docs/audit/05-design-and-user-flow.md`
- `docs/audit/06-findings-and-recommendations.md`
- `docs/seo/url-inventory.csv`
- `docs/reports/T001-report.md`

Helper scripts: none added to `scripts/audit/`. Temporary read-only Python and Node scripts ran outside the repository, using only standard libraries and the installed Chrome. They and the raw crawl data are not committed, so tell me if you want them kept.

Dependencies added: none

Decisions made: none. All sitemap, URL, debt-merge and data-model items are recommendations for the planner.

Questions for the firm / blockers: no blockers. `docs/audit/06-findings-and-recommendations.md` has all 16 questions. The most urgent:
1. Is the domain set to renew, and who holds the Hostinger account? `DIRECTION.md` assumes Namecheap, but the registrar is Hostinger.
2. Are the debt page's testimonials and figures genuine? Recommend removing the placeholders from the live site now.
3. Do the 14 client logos, including the national coat of arms and county crests, have permission?
4. Is there a Ruiru branch, and which phone numbers are official?
5. Should the newsletter and gated webinar recordings continue? They aren't in `DIRECTION.md`, and may need a paid mail service, which needs planner approval.

Suggested next step: Owner alerts the firm about the domain and placeholder testimonials today, then the planner reviews `06-findings-and-recommendations.md` for the design and system-flow discussion.
