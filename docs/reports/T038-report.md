## Report: T038 — Home page
Status: Done
Branch / PR: `task/T038-home-page`, fast-forwarded to `main`
Summary: Home follows spec section 4 items 1–9, section by section, and all content comes from the API. The route is static with revalidation, so the first response is complete, with no client fetching and no loading states. The hero uses the image now and shows a muted looping video when `heroVideoUrl` is set, except on phones and for reduced motion.
Done when:
- ✅ All sections, compared side by side with the design at 1440 and 390
- ✅ Content from the API; UI labels from the dictionary
- ✅ Pre-rendered; Playwright confirms no browser API calls
Files changed: `frontend/src/components/home/**`, `frontend/src/app/(site)/page.tsx`, `frontend/src/styles/theme.css`, `frontend/src/components/site/cookie-consent.tsx`, `frontend/tests/hero-video.test.tsx`
Dependencies added: none
Decisions made: none
Questions / blockers: none here; see the brief 06 report
Suggested next step: T039
