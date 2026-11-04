## Report: T048 — Insights and webinars
Status: Done
Branch / PR: task/T048-insights
Summary: Built `/insights/` with pagination, `/category/<slug>/`, article pages at their current URLs, `/insights/webinars/` and webinar pages. All block types render. Webinars in the recording state take requests through the native form with source tracking.
Done when: listing, featured, chips, grid, pagination, newsletter band ✅ · article sections ✅ · webinar states ✅ · checks and screenshots ✅
Files changed: `app/(site)/insights/**`, `app/(site)/category/**`, `insight-listing.tsx`, `insight-template.tsx`, `webinar-template.tsx`, `webinar-card.tsx`, `newsletter-band.tsx`, `pagination.tsx`.
Dependencies added: none
Decisions made: none
Questions / blockers: Most articles have no linked author, so the author box is often hidden. Two articles have no featured image and show an empty panel.
Suggested next step: T049, remaining pages.

New from existing parts: featured insight (Home insight card, two columns), newsletter band (footer form on a navy band), webinar card (insight card), pagination (chip style).
