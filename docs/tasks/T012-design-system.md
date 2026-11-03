# T012: Design tokens + UI components

**Status:** Done
**Week:** 1 (Version 1, Day 2)
**Priority:** High

## Goal
Tokens in Tailwind theme / CSS variables (above). `components/ui`: Button (primary navy, accent gold-with-navy-text, outline, link; sizes; as link), Container, Section, Heading, Text/Prose (article typography), Card, Badge/Tag, Input, Textarea, Select, Checkbox, Accordion, Tabs/Filter chips, Breadcrumbs, Pagination, VisuallyHidden, Icon set (inline SVG, minimal). A `/ _design` route **only in development** showing every component (excluded from production build/sitemap).

## Done when
- [x] components render, are accessible, tests pass.

## Files / inputs
- `docs/prompts/04-AGENT-V1-DAY2-DESIGN-PAGES.md`

## Result
Design tokens in `styles/globals.css` (navy, gold with AA-checked contrast, neutrals, fluid type, spacing, radius, motion), self-hosted Cormorant Garamond and Inter through `next/font`, and the `components/ui` set: Button, Container, Section, Heading, Lead, Prose, Card, Badge, Input, Textarea, Select, Checkbox, Accordion (native details), FilterChips, Breadcrumbs, Pagination, VisuallyHidden and icons. `/_design` shows them all, and returns 404 outside development.
