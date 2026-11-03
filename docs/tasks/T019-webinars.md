# T019: Webinars

**Status:** Done
**Week:** 1 (Version 1, Day 2)
**Priority:** High

## Goal
`/insights/webinars/` index; webinar pages at existing root slugs, inside the normal layout: state badge (upcoming / recording / past), summary, takeaways, panel (linked profiles), FAQ, action by state (upcoming → registration link; recording → "Request the recording" form placeholder that shows the dictionary message "available soon" until V2; past → summary only).

## Done when
- [x] All listed items work with real content; lint, typecheck, tests and build pass.

## Files / inputs
- `docs/prompts/04-AGENT-V1-DAY2-DESIGN-PAGES.md`

## Result
`/insights/webinars/` lists all webinars. Webinar pages render at their existing root slugs inside the normal layout, with state badge, date, summary, takeaways, linked panel, FAQ and an action by state: a registration link when upcoming, an "available soon" message for recordings until V2, and nothing for past webinars.
