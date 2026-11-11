# T061 — Homepage Wealth Protection feature

## Proof
- `docs/reports/t061-feature/1440-vs-reference.png` — reference (left) vs build (right)
- `docs/reports/t061-feature/1440.png`
- `docs/reports/t061-feature/1024.png`
- `docs/reports/t061-feature/390.png`

## Flags
Official-proportion SVG flags authored for this section:
- Kenya (2:3): `frontend/public/home/flags/kenya.svg`
- United States (10:19): `frontend/public/home/flags/usa.svg`
No waving bitmaps were available in the media library or local assets.

## Shared component
`HomeFeature` is used only on the homepage (`frontend/src/app/(site)/page.tsx`). Webinar listing/detail templates were not changed.

## YouTube
Featured webinar `recordingUrl` is null — “Watch on YouTube” is omitted.

## Self-check
- [x] Only the homepage section between “What we handle” and “Latest from our advocates” changed
- [x] No navy/blue in the section; no blue bands or edge shapes
- [x] Ivory background; no separate band; gold square gone
- [x] Left edge lines up with “What we handle”
- [x] Heading on two lines, “Kenyans Abroad” italic gold
- [x] Button square, 60px (56px mobile); link works (200)
- [x] YouTube link shown only if it exists (it does not)
- [x] Card is live HTML text, not the old flyer; title/date from DB
- [x] Flags accurate proportions, not covering text
- [x] 1440 / 1024 / 390: no overflow
- [x] No console/page errors during capture
