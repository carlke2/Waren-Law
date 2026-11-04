# 0019: Links do not prefetch pages

**Date:** 4 November 2026
**Status:** Accepted by the agent, for the planner to confirm

## Decision
All internal links use `SiteLink` (`frontend/src/components/ui/site-link.tsx`), which turns off Next.js prefetching. A page's data is fetched only when the visitor chooses a link. The newsletter form also loads its validation schema on submit, not with the page.

## Why
- With prefetching on, Home made about 30 page-data requests on every visit, and from the second page in a browser session they stayed open. Ground rule 2 allows client fetching only for user actions.
- It saves data on phones.
- Separately, loading the schema on submit and marking the hero image high priority raised Lighthouse performance from 82–84 to 93. Those runs already had prefetching off.

## Consequences
- Moving between pages takes a server request when the link is chosen, rather than being ready in advance. Pages are pre-rendered, so that request is short.
- Playwright fails if a prefetch request returns. New frontend code must use `SiteLink`, not `next/link`.
