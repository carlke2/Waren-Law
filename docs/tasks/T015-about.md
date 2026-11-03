# T015: About

**Status:** Done
**Week:** 1 (Version 1, Day 2)
**Priority:** High

## Goal
Story, mission/vision, values, **About video section** (poster image, play button, loads the embed/file only on click, captions track supported, video URL + poster from Settings; placeholder until the firm's video arrives), awards, partners teaser, CTA.

## Done when
- [x] All listed items work with real content; lint, typecheck, tests and build pass.

## Files / inputs
- `docs/prompts/04-AGENT-V1-DAY2-DESIGN-PAGES.md`

## Result
About renders at its existing URL through the new root `[slug]` route: story, film section, mission and vision, values, why choose us, award, partners teaser and CTA. The film section shows a poster and loads the video only on click, supports captions and hosted embeds, and reads its URL and poster from Settings. **No placeholder video file exists yet**, so the section shows the poster and a "coming soon" line until a URL is set.
