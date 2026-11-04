## Report: T049 — Search, 404 and legal pages
Status: Done
Branch / PR: task/T049-remaining
Summary: Built `/search/`, the 404 page and the legal template, and removed all temporary holding-page code. Terms and Cookie Policy appear only when approved or when `PREVIEW_UNREVIEWED_PAGES=true`, and then carry the NEEDS ADVOCATE REVIEW line.
Done when: search with grouped results ✅ · 404 with search and key links ✅ · legal pages with last updated ✅ · approval rule ✅ · checks and screenshots ✅
Files changed: `app/(site)/search/page.tsx`, `app/(site)/not-found.tsx`, `app/(site)/[slug]/page.tsx`, `legal-template.tsx`, `search-form.tsx`.
Dependencies added: none
Decisions made: Search is the one public page rendered on request, because results depend on the query. It works without JavaScript and shows a message if the API is down.
Questions / blockers: Nothing in the header or footer links to search; the locked design has no search item. It is reachable from the 404 page and by URL.
Suggested next step: T050, release check.
