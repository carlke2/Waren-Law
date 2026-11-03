## Report: V1 Day 2 — Design + pages (T012–T020)
Status: Done

Branches / PRs: `setup/day2-content`, `task/T012-design-system`, `task/T013-site-layout`, `task/T014-home`, `task/T015-about`, `task/T016-team-profiles`, `task/T017-practice-areas`, `task/T018-insights`, `task/T019-webinars`, `task/T020-contact-partners-legal-search`. All fast-forwarded to `main`, because `gh` isn't installed.

Summary: Every public page now works from a production build, designed in code, with real content from Supabase through the API. A clean build pre-rendered 79 routes. A crawl of 78 routes and 84 internal links found no failures, one h1 per page, alt text on every image and no hidden claims. Consent was checked in real Chrome: no Google or Meta request before a choice or after rejecting. Not yet checked: real devices, a screen reader, or GitHub CI.

Routes built:
- `/`
- `/about-us/`, `/our-partners/`, `/contact-us/`, `/privacy-policy/`, `/terms/`, `/cookie-policy/` (root slug route)
- `/our-team/` (`?practiceArea=`), `/our-team/[slug]/`
- `/area-of-expertise/`, plus 8 practice pages at their existing root URLs
- `/insights/`, `/insights/page/[n]/`, `/category/[slug]/`, `/category/[slug]/page/[n]/`, plus 32 articles at their existing root URLs
- `/insights/webinars/`, plus 3 webinars at their existing root URLs
- `/search/?q=`, styled 404 and error pages, `/admin` placeholder, `/_design` (development only)

Lighthouse (mobile, local production build):
| Page | Performance | Accessibility | Best practices | SEO | LCP |
|---|---|---|---|---|---|
| Home | 96 | 100 | 100 | 100 | 2.6 s |
| Practice (debt) | 99 | 100 | 100 | 100 | 0.9 s |
| Article | 98 | 100 | 100 | 100 | 1.1 s |

Home's LCP is just over the 2.5 s target. It varied from 2.4 s to 3.2 s across runs, slowest on a cold image cache (score 90).

Screenshots: docs/reports/v1-day2-screens/ (10 pages at 390 px and 1366 px)

Content gaps visible on the site:
- About film: the section shows a poster and "coming soon". There is no placeholder video file.
- Banking & Finance has no advocates or insights; Employment & Labour has no insights. Empty sections are hidden.
- Regulatory Services has no insights, so it's left out of the filter chips, although a redirect points to its page.
- 28 of 32 articles show the firm as author; 2 have no featured image.
- Many images have generated alt text awaiting review.
- Janice's portrait has a light background; the other cards are mostly dark.
- Phylis Njane shows no office, because Ruiru isn't confirmed.
- The WhatsApp button has no pre-filled message, because the current site's is empty.
- Webinar recordings show "available soon" until V2.
- The webinars' "Without a plan / With a plan" comparison wasn't imported, so it doesn't appear.
- Older American spellings remain in the firm's text (for example "specializes"), left unedited.

For the firm's advocate to review before launch:
1. Privacy Policy: the firm's existing text, unchanged.
2. Terms and Legal Disclaimer: new draft, marked `NEEDS ADVOCATE REVIEW`.
3. Cookie Policy: new draft, marked `NEEDS ADVOCATE REVIEW`.

Decision 0010 changes: the importer hides 5 outcome claims in Ephraim's and Cecilia's profiles, including "over 100 properties" and "hundreds of charges". Re-imported to Supabase. Articles still say the firm "acted for the Applicant in Kinyua v Absa", because that describes the firm's role rather than a result.

Done when:
- T012 ✅ Components render and tests pass. `/_design` is reachable only in development; it remains in the production build and returns 404 there.
- T013 ✅ Layout on every route. Consent verified in Chrome (no tracking before accept). Mobile menu worked by keyboard: focus moves in, Tab wraps, Esc returns focus.
- T014 ✅ Content from the API only; Lighthouse mobile 96.
- T015 ✅ Video loads only on click and supports captions. The file itself is outstanding, as above.
- T016 ✅ Groups, shareable filter links that work without JavaScript, 10 profiles. The `/ephraim-ndegwa/` redirect is T021.
- T017 ✅ Index and 8 pages, with empty sections hidden.
- T018 ✅ Listing, category pages, pagination and articles, with all 6 block types rendered.
- T019 ✅ Index and pages with action by state.
- T020 ✅ Contact, Partners, legal pages, search and 404. Submit is disabled until T011a, as briefed.
- Checks: lint, typecheck and tests pass (63 frontend, 63 backend, 18 import, plus 16 read-only checks on Supabase).

Dependencies added: none. Lighthouse ran through `npx` outside the repo.

Environment variables added: frontend `PUBLIC_MEDIA_BASE_URL`, `REVALIDATE_SECONDS`, `SKIP_PRERENDER`; backend `PREVIEW_UNREVIEWED_PAGES`.

Hard-coded values that could not be avoided:
- `scripts/import-wordpress/src/curation.ts`: firm facts and new page text, which is how they reach the database.
- `frontend/src/lib/consent/tags.ts`: Google and Meta script addresses, which are fixed by the vendors.
- `next/image` `sizes` strings in components, because the browser reads them as literal values.
- `lang="en-GB"`, and `MEDIA_CACHE_MAX_AGE` in `backend/src/app.setup.ts` (not yet moved to `shared/`).

Decisions made: 0011 (Terms and Cookie Policy stay unapproved, with a preview switch).

Choices for the planner to check:
- Added: `SKIP_PRERENDER` (so CI can build without an API), `GET /api/v1/resolve` (lists slugs for static generation), and media and review status in API responses.
- `/our-team/` and `/search/` render per request because they read the query string; their data still uses cached API fetches.
- Maps load only on click, so no request reaches Google before a visitor asks. Nakuru and Beijing now have map links, built from their addresses.
- New short wording: "Our Values", section headings and interface text. The who-we-serve line reuses a sentence already on About.
- The home hero uses the firm's own team photo; the About poster uses another of its team photos.
- I added `PREVIEW_UNREVIEWED_PAGES=true` to your local `backend/.env`.

Questions / blockers: no blockers.
For the planner:
1. Terms and Cookie Policy are hidden in production until approved (decision 0011). Is that the rule you want?
2. Should "acted for the Applicant in Kinyua v Absa" stay in two articles under decision 0010?
3. No placeholder film exists, although decision 0004 mentions one. Is the poster and "coming soon" acceptable for Thursday, or will you supply a clip?
For the owner:
4. Check the GitHub Actions tab for the latest run on `main`; I can't see it from here.
5. Please test on real phones and with a screen reader, since this check used headless Chrome and automated audits only.
For the firm:
6. Does the team photo show current staff only, and may it be used as the home hero?
7. Who is the right person for Banking & Finance?

Suggested next step: Planner reviews questions 1–3, then releases brief 05 (forms, SEO, deploy).
