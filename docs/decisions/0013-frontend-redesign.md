# 0013: Frontend redesign — modern corporate, built from a written specification

**Date:** 4 November 2026
**Status:** Superseded by 0014 and 0015 (scrap + rebuild still applies; the modern-corporate direction and briefs 06–08 do not)

## Decision
1. The Day 2 frontend visuals are scrapped: look and feel did not meet the client's taste and several pages were buggy.
2. **Kept:** the whole backend, database, import, API, shared package, and the frontend plumbing (API client, slug resolver and routing, consent logic, dictionary, SEO helpers, test setup, env handling).
3. **Rebuilt:** every component, style, layout and page template, strictly from `docs/design/DESIGN-SPEC.md` (modern corporate: photography-led, navy bands, Newsreader + Instrument Sans, restrained gold).
4. **Review checkpoint:** the agent builds tokens, components, header/footer and Home first, then stops for owner and planner review with screenshots. Other pages follow only after approval.
5. **Quality gates added:** Playwright end-to-end tests and visual regression snapshots for every page template.
6. **V1 date moves:** target Friday 6 November, buffer to Monday 9 November.

## Why
- A written spec removes guesswork; the checkpoint catches taste problems on one page instead of twenty.
- E2E and visual tests stop the "buggy pages" problem from recurring.

## Consequences
- Briefs 06 (foundation + Home), 07 (all other pages), 08 (forms, SEO, QA, release) replace the remaining V1 day briefs.
- Any style not in the spec needs the planner's approval.
