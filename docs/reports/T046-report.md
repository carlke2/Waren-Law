## Report: T046 — Our People
Status: Done
Branch / PR: task/T046-our-people
Summary: Built `/our-team/` with practice-area filter links that work without JavaScript, and profile pages at `/our-team/<slug>/`. `/ephraim-ndegwa/` is one 301 to the profile.
Done when: team groups and filter ✅ · profile sections ✅ · old URL 301 ✅ · checks and screenshots ✅
Files changed: `frontend/src/app/(site)/our-team/**`, `team-listing.tsx`, `filter-chips.tsx`, `page-hero.tsx`, `proxy.ts`.
Dependencies added: none
Decisions made: Filter links stay `/our-team/?practiceArea=<slug>`, and the proxy rewrites them to a pre-rendered `/our-team/area/<slug>/`, because reading the query in the page would make it render on request (ground rule 2). The area pages are `noindex` with their canonical on `/our-team/`.
Questions / blockers: Experience, education and admissions are empty in the database for everyone checked, so those blocks are hidden until the firm supplies them. Staff have no profile pages, so their cards aren't links.
Suggested next step: T041, source tracking.

New from existing parts: profile hero (page hero with a portrait and contact buttons), filter chips. "Book a consultation" on profiles goes to the native form, not Calendly (ground rule 3).
