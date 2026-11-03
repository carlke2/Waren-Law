# T018: Insights

**Status:** Done
**Week:** 1 (Version 1, Day 2)
**Priority:** High

## Goal
`/insights/` listing with category filter chips and pagination (`/insights/page/[n]/`), category pages `/category/[slug]/`, article pages at their **existing root slugs**: title, date, reading time, author(s) (linked profile when known; firm name otherwise), categories, practice-area links, featured image, block-rendered body (headings, paragraphs, lists, quotes, links, images, tables), related insights, CTA. Block renderer in `components/site` covers every block type the importer produces.

## Done when
- [x] All listed items work with real content; lint, typecheck, tests and build pass.

## Files / inputs
- `docs/prompts/04-AGENT-V1-DAY2-DESIGN-PAGES.md`

## Result
`/insights/` with category filter chips and pagination at `/insights/page/[n]/`, category pages at `/category/[slug]/` with their own pagination, and articles at their existing root slugs: title, date, reading time, authors (linked to profiles when known, otherwise the firm's name), categories, practice links, featured image, body, related insights and CTA. The block renderer covers all six block types the importer produces. FAQ data is stored for tomorrow's schema work and isn't shown separately, because article bodies already contain their questions.
