# @waren/shared

Validation schemas (Zod), types and fixed values used by both the backend and the frontend. Build output in `dist/` is what the apps import; it is built on install and watched by `pnpm dev`.

## Block JSON format

`Page.body`, `PracticeArea.body`, `Insight.body`, `Webinar.body` and `TeamMember.longBio` all store the same document, validated by `blockDocumentSchema`:

```json
{
  "version": 1,
  "blocks": [
    { "type": "heading", "level": 2, "content": [{ "text": "Section title" }] },
    {
      "type": "paragraph",
      "content": [
        { "text": "Plain, " },
        { "text": "bold", "marks": ["bold"] },
        { "text": " and " },
        { "text": "linked", "href": "/contact-us/" }
      ]
    },
    { "type": "list", "ordered": false, "items": [[{ "text": "An item" }]] },
    { "type": "quote", "content": [{ "text": "A quotation" }] },
    { "type": "image", "mediaId": "<Media id>", "caption": "Optional caption" },
    { "type": "table", "header": true, "rows": [[[{ "text": "A cell" }]]] }
  ]
}
```

- **Inline text:** each piece has `text`, optional `marks` (`bold`, `italic`, `underline`) and an optional `href`.
- **Headings:** levels 2 to 4 only. The page template owns the single H1.
- **Images:** a block refers to a `Media` record, which holds the alt text.
- **Tables:** `rows` is rows of cells, each cell a list of inline pieces; `header: true` makes the first row the header.

## Slugs

Pages, practice areas, insights and webinars all live at the site root, so their slugs must be unique across the four types. See `claimSlug` in `backend/src/database/slug-registry.ts`, which records each slug in the `Slug` table.
