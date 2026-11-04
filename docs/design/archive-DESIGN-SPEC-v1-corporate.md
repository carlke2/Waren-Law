# WAREN Law — Frontend Design Specification

**Version:** 1.0 · 4 November 2026 · **Status: ON HOLD (decision 0014) — to be replaced after research**
**Reference feel:** leading international and African firms (Clifford Chance, Bowmans, ENSafrica): photography-led, confident navy, generous space, restrained gold.

This document is the single source of truth for the frontend. If something is not specified here, ask the planner; do not invent a style. Every value below becomes a design token; components never use raw values.

---

## 1. Design principles

1. **Confident, not decorative.** Big clear headlines, strong blocks of navy and white, very few ornaments.
2. **People and expertise first.** Real faces and named practice areas appear early on every key page.
3. **One idea per section.** Each band has one heading, one message, one action.
4. **Gold is a signature, not a paint.** Thin rules, numbers, small labels, hover lines. Never large gold areas, never gold text on white body copy.
5. **Readable everywhere.** Mobile first, AA contrast, 17 px body, short paragraphs.
6. **Calm motion.** Subtle and fast. Nothing moves for its own sake.

---

## 2. Design tokens

### 2.1 Colour

| Token | Hex | Use |
|---|---|---|
| `navy-950` | `#040C33` | Dark bands, footer, hero overlay base |
| `navy-900` | `#061557` | Brand navy: primary buttons, headings on light, header on scroll |
| `navy-800` | `#0B1F6E` | Hover state of navy buttons, active nav |
| `navy-100` | `#E7EAF4` | Tinted surfaces, tag backgrounds |
| `gold-500` | `#D4AF37` | Accent rules, numbers on dark, focus ring on dark, label text on dark |
| `gold-700` | `#8A6A12` | Gold text on light backgrounds (labels, eyebrows) — AA on white |
| `ink-900` | `#0E1426` | Body text on light |
| `ink-600` | `#4A5068` | Secondary text on light |
| `ink-400` | `#8A90A6` | Meta text (dates, captions), borders on dark |
| `line` | `#DDE0EA` | Dividers, card borders on light |
| `mist` | `#F4F5F9` | Alternate light band background |
| `white` | `#FFFFFF` | Page background, text on dark |
| `on-dark-muted` | `#B8BFD9` | Secondary text on navy |
| `success` | `#1F6B45` | Form success |
| `error` | `#B42318` | Form errors |

**Rules**
- Text on navy: `white` or `on-dark-muted`. Text on light: `ink-900` / `ink-600`.
- Gold text only as `gold-700` on light, `gold-500` on dark, and only for eyebrows, labels, numbers and links-on-dark.
- Image overlays: `navy-950` at 55–70 % opacity so white text is ≥ 4.5:1 at every crop.
- Light theme only for V1 (corporate sites are light). No dark-mode variant.

### 2.2 Typography

| Role | Font | Weights | Notes |
|---|---|---|---|
| Display / headings | **Newsreader** (Google, variable, optical size) | 500, 600 | Used for H1–H3 and pull quotes. `font-optical-sizing: auto` |
| Body / UI | **Instrument Sans** (Google, variable) | 400, 500, 600 | Body, navigation, buttons, labels, forms, H4–H6 |

Load with `next/font` (self-hosted, `display: swap`), Latin subset only.

**Type scale** (desktop → mobile, fluid with `clamp()` between 375 px and 1280 px):

| Token | Font | Size desktop / mobile | Line height | Weight | Tracking |
|---|---|---|---|---|---|
| `display` | Newsreader | 76 / 44 px | 1.04 | 500 | -0.02em |
| `h1` | Newsreader | 56 / 36 px | 1.08 | 500 | -0.015em |
| `h2` | Newsreader | 42 / 30 px | 1.12 | 500 | -0.01em |
| `h3` | Newsreader | 28 / 23 px | 1.2 | 600 | 0 |
| `h4` | Instrument Sans | 20 / 18 px | 1.3 | 600 | 0 |
| `lead` | Instrument Sans | 21 / 18 px | 1.55 | 400 | 0 |
| `body` | Instrument Sans | 17 / 16 px | 1.65 | 400 | 0 |
| `small` | Instrument Sans | 15 / 14 px | 1.5 | 400 | 0 |
| `label` | Instrument Sans | 13 / 12 px | 1.2 | 600 | 0.14em, uppercase |
| `button` | Instrument Sans | 15 px | 1 | 600 | 0.02em |

- Article body max width **68ch**; landing text blocks max **60ch**.
- Headings use `text-wrap: balance`; paragraphs `text-wrap: pretty`.
- Numbers in stats and dates use `font-variant-numeric: tabular-nums lining-nums`.

### 2.3 Spacing, grid, shape

- **Spacing scale (px):** 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128, 160.
- **Section padding (vertical):** `section-lg` 128 / 96 / 72 (desktop / tablet / mobile); `section-md` 96 / 72 / 56.
- **Container:** max **1280 px** content width, side padding 32 px desktop, 24 px tablet, 20 px mobile (plus safe-area insets).
- **Grid:** 12 columns, gutter 32 px desktop / 24 px tablet; mobile 4 columns, gutter 16 px.
- **Breakpoints:** `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536.
- **Radius:** 0 for sections, images and cards (sharp corporate edges); 2 px for inputs and tags; buttons 0.
- **Borders:** 1 px `line` on light; 1 px `rgba(255,255,255,.14)` on dark.
- **Shadow:** none on cards. One shadow token only, for the sticky header and menus: `0 8px 24px rgba(4,12,51,.08)`.

### 2.4 Motion

- Durations: 150 ms (hover), 220 ms (menus, accordions), 400 ms (section reveal).
- Easing: `cubic-bezier(.2,.7,.2,1)`.
- Section reveal: fade + translateY(12 px) **from a visible resting state** (content must be readable with JS off and in screenshots).
- Image hover on cards: scale 1.03 inside a clipped frame.
- Respect `prefers-reduced-motion`: all transitions off except opacity.

### 2.5 Iconography

- One outline icon set, 1.5 px stroke, 20/24 px (Lucide or equivalent inline SVG). No emoji, no filled icons, no clip-art legal icons (gavels, scales).
- Arrow `→` icon is the house "go" signal on links and cards.

---

## 3. Imagery

| Use | Ratio | Treatment |
|---|---|---|
| Home hero | 16:9 desktop, 4:5 mobile (art-directed crop) | Real photo (team or office). Overlay `navy-950` gradient: 70 % left → 30 % right on desktop; 65 % flat on mobile |
| Page heroes (About, Expertise, Practice) | 21:9 desktop, 4:3 mobile | Same overlay. If no photo: solid `navy-950` with the gold rule pattern (§4.1) |
| Team portraits (cards) | 4:5 | `object-position: center 20%`; **grayscale(100%)** at rest, full colour on hover/focus (normalises mismatched backgrounds); background `navy-100` behind transparent cutouts |
| Profile portrait | 4:5 | Full colour, large |
| Insight images | 16:9 | Full colour; if missing, navy block with category label |
| Logos (when permitted) | contain in 3:2 box | Grayscale, 60 % opacity, full on hover |

- No stock gavels, scales, handshakes or AI-generated imagery in new layouts.
- Every image comes from the API with its `alt`; decorative images get `alt=""`.
- `next/image`, explicit sizes, `priority` only on the hero image.

---

## 4. Components

All components live in `frontend/src/components/ui` (primitives) and `components/site` (composites). Each has a Storybook-style entry on the dev-only `/_design` page with every state.

### 4.1 Brand elements
- **Gold rule:** 48 × 2 px `gold-500` bar placed above eyebrows/headings in dark bands; `gold-700` on light.
- **Eyebrow:** `label` style, `gold-700` (light) / `gold-500` (dark), preceded by the gold rule on the same line.
- **Rule pattern (fallback hero):** thin 1 px gold lines at 8 % opacity forming a sparse diagonal grid on `navy-950`. Pure CSS.

### 4.2 Buttons
| Variant | Default | Hover | On |
|---|---|---|---|
| `primary` | `navy-900` bg, white text | `navy-800` bg | light |
| `primary-inverse` | white bg, `navy-900` text | `mist` bg | dark / image |
| `secondary` | 1 px `navy-900` border, `navy-900` text | `navy-900` bg, white text | light |
| `secondary-inverse` | 1 px white border, white text | white bg, `navy-900` text | dark |
| `text` | `navy-900` text + arrow, gold 2 px underline grows from 0 → 100 % on hover | — | light |
| `text-inverse` | white text + arrow, gold underline | — | dark |

Height 52 px (48 mobile), padding 0 28 px, `button` type. Focus: 2 px outline `gold-500` (dark) / `navy-900` (light), 3 px offset. Disabled: 40 % opacity, no hover. Loading: spinner replaces arrow, width fixed.

### 4.3 Header
- **Utility bar** (desktop ≥ lg only, 40 px, `navy-950`): left "Nairobi · Nakuru · Beijing"; right phone and email (from Settings), small `on-dark-muted`.
- **Main bar** 80 px desktop / 64 px mobile.
  - On pages with an image hero: transparent, white logo and links; after 40 px scroll → white background, navy logo/links, shadow token, 72 px.
  - On other pages: white from the start.
- Left: logo (SVG/PNG from Settings, navy and white variants). Centre/right nav: About · Our People · Expertise ▾ · Insights · Contact. Far right: `primary` button "Book a consultation" (inverse on transparent state).
- **Expertise mega menu** (≥ lg): full-width white panel, 2 columns of the 8 practice areas (name + one-line summary from API) and a right column with a featured insight card. Opens on hover with 120 ms intent delay and on click/Enter; Esc closes; focus trapped while open.
- **Mobile:** hamburger → full-screen `navy-950` panel, large Newsreader links (h3 size), Expertise expands as an accordion, CTA button and contact details at the bottom. Focus trap, Esc closes, body scroll locked.

### 4.4 Footer (`navy-950`)
- Top row: large Newsreader line "Talk to an advocate today." + `primary-inverse` button + WhatsApp `text-inverse` link.
- 4 columns (stack on mobile): Firm (logo, one-line description), Expertise (8 links), Firm links (About, People, Insights, Webinars, Partners, Contact), Offices (3 offices, address, phone).
- Bottom bar: © year firm name · Privacy · Terms · Cookie preferences (reopens consent) · social icons.
- Gold rule above the top row.

### 4.5 Cards
- **Practice card:** white, 1 px `line` border, padding 32 px; index number `01`–`08` in `label` `gold-700`; title h3; one-line summary `small`; `text` link "Explore". Whole card clickable; hover: border `navy-900`, arrow moves 4 px.
- **Person card:** portrait 4:5 (grayscale → colour), name h4, role `small ink-600`, practice areas as up to 2 tags. Clickable only when the person has a profile.
- **Insight card:** image 16:9, category eyebrow, title h4 (Newsreader 22 px for featured variant), date + reading time `small ink-400`. Variants: `default`, `featured` (image left 7 cols / text right 5 cols on desktop), `compact` (no image, for lists).
- **Webinar card:** state tag (Upcoming / Recording / Past), title, date, speakers' small avatars.
- **Office card:** city h3, address, phone, email, "Get directions" text link.

### 4.6 Content blocks
- **Hero (home):** see §5.1.
- **Page hero:** breadcrumb (`small`, white 70 %), eyebrow, h1, optional lead (60ch). Image or fallback pattern.
- **Split section:** 2 columns (6/6 or 5/7), heading + text one side, image/list other side; flips on alternate rows; stacks on mobile with image first.
- **Stat row:** 3–4 factual figures only (e.g. "8 practice areas", "3 offices", "2 continents"), number in Newsreader 56 px `gold-500` on dark. **No outcome claims** (decision 0010).
- **Quote / award block:** large Newsreader quote or award name, attribution `label`.
- **CTA band:** `navy-900` or image with overlay; h2, one sentence, two buttons (inverse).
- **Accordion (FAQ):** question `h4`, plus/minus icon, 1 px `line` dividers, one open at a time optional; accessible `button` + `region`.
- **Filter chips:** 36 px pill-less rectangles, 1 px `line`, active = `navy-900` bg white text; horizontally scrollable on mobile with fade edges.
- **Breadcrumbs, pagination** (numbered, prev/next with arrows), **tags** (`navy-100` bg, `navy-900` text, 2 px radius, `small`).
- **Prose (article body):** h2/h3 in Newsreader, paragraphs 17/1.75, lists with gold markers, blockquote with 2 px gold left rule and Newsreader italic 24 px, tables with `mist` header row and horizontal scroll on mobile, links `navy-900` with 1 px underline offset 3 px.

### 4.7 Forms
- Label above field (`small`, 600), input 52 px, 1 px `ink-400` border, 2 px radius, focus border `navy-900` + 3 px `navy-100` ring.
- Errors: `error` text below field with icon, field border `error`, `aria-describedby`.
- Required marker: "(required)" text, not just an asterisk.
- Privacy notice under the submit button (`small ink-600`) linking to Privacy Policy.
- States: idle, submitting (button loading), success (inline panel with check icon, focus moves to it), error (inline panel, retry).

### 4.8 Cookie consent
- Bottom bar (desktop: bottom-left card 420 px wide; mobile: full-width sheet). White, shadow token.
- Text 2 sentences + link to Cookie Policy. Buttons: "Accept all" (`primary`), "Reject" (`secondary`), "Preferences" (`text`). Equal visual weight for Accept and Reject.
- Preferences dialog: Necessary (locked on), Analytics, Marketing toggles.

### 4.9 WhatsApp button
Fixed bottom-right, 56 px circle `#25D366` with white glyph (the only off-palette colour), offset from safe areas, hides when the consent bar is open on mobile, label "Chat on WhatsApp" for screen readers.

### 4.10 Video
Poster image 16:9 with centred 88 px white play button on `navy-950` 50 % overlay and duration label. Click opens the video inline (file or YouTube-nocookie) with captions; never autoplays with sound. "Film coming soon" state: poster + `label` text, no play button.

---

## 5. Page specifications

Section order is fixed. Each section names its band colour (W = white, M = mist, N = navy-950).

### 5.1 Home `/`
1. **Hero (image)** — full-bleed, height 88vh max 820 px desktop / 640 px mobile; content bottom-left aligned in container: eyebrow "Advocates · Nairobi · Nakuru · Beijing", `display` headline (from Home record), lead (who we serve), buttons `primary-inverse` "Book a consultation" + `secondary-inverse` "Our expertise". Bottom edge: thin gold rule and a scroll cue.
2. **Introduction (W)** — 5/7 split: left h2 "A modern firm for Kenyan and international clients"; right lead paragraph + `text` link "About the firm".
3. **Expertise (M)** — eyebrow + h2 + 4×2 grid of the 8 practice cards (2 cols tablet, 1 col mobile).
4. **Stat row (N)** — 3–4 factual figures.
5. **Our people (W)** — h2 "Meet our partners" + 4 person cards (partners first) + `secondary` "All our people".
6. **Featured insight (W)** — featured insight card full width, then 3 default insight cards; `text` link "All insights".
7. **Recognition (M)** — award block (Legal Insider 2025) + partner firms row (names, links). Client logos only if permitted.
8. **Webinar (N)** — latest/upcoming webinar split: image left, state tag, title, date, speakers, action button.
9. **CTA band (image/N)** — "Speak to an advocate" + Book + WhatsApp.

### 5.2 About `/about-us/`
1. Page hero (image) — h1 "About WAREN Law".
2. **Story (W)** — 5/7 split, history text.
3. **Film (N)** — eyebrow "Our story on film", video component (§4.10), short caption.
4. **Mission & vision (W)** — two columns, each with gold rule + h3 + text.
5. **Values (M)** — 4 values as numbered blocks (`01`–`04`).
6. **Recognition (W)** — award block.
7. **Partners teaser (W)** — 3 partner firms + link to Partners.
8. **Leadership (M)** — partner person cards.
9. CTA band.

### 5.3 Our People `/our-team/`
1. Page hero (no image, fallback pattern) — h1 "Our people", lead.
2. **Filter bar (W, sticky below header on scroll)** — chips: All + practice areas with people; result count `small`.
3. **Groups (W)** — for each group in order Partners, Advocates, Consultants, Staff: h2 + grid of person cards (4 / 3 / 2 columns at xl / lg / sm; 2 on mobile at 375 px with compact text). Empty groups hidden after filtering; empty state message if no results.
4. CTA band.

### 5.4 Profile `/our-team/[slug]/`
1. **Profile hero (W)** — 5/7 split: left portrait (colour, 4:5); right eyebrow (role), h1 name, practice area tags, office, contact actions row (Email, Call, WhatsApp, LinkedIn as icon buttons with labels), `primary` "Book a meeting".
2. **Body (W)** — 8/4 layout: left prose bio, then Experience, Education, Admissions, Memberships, Languages as titled lists; right sticky aside "At a glance" (practice areas, office, languages).
3. **Insights by this person (M)** — insight cards; hidden if none.
4. **Related people (W)** — up to 4 people sharing a practice area.
5. CTA band.

### 5.5 Expertise index `/area-of-expertise/`
1. Page hero (image or pattern) — h1 "Our expertise", lead.
2. **Practice list (W)** — 8 large rows (not cards): index number, h3 name, one-line summary, arrow; 1 px dividers; hover row background `mist`.
3. CTA band.

### 5.6 Practice page `/<practice-slug>/`
1. Page hero — breadcrumb, eyebrow "Expertise", h1 name, lead summary, `primary-inverse` "Talk to this team".
2. **Overview (W)** — 8/4 layout: prose body; aside with "How we help" bullet list and contact card of the lead advocate.
3. **Services (M)** — services from content as a 3-column list of h4 + short text (if structured; otherwise skip).
4. **Our team in this area (W)** — person cards; hidden if none.
5. **FAQ (W)** — accordion; hidden if none.
6. **Related insights (M)** — 3 insight cards; hidden if none.
7. CTA band.

### 5.7 Insights `/insights/`, categories `/category/[slug]/`
1. Page hero (pattern) — h1 "Insights", lead.
2. **Featured (W)** — newest article as featured card (page 1 only).
3. **Filter chips (W)** — categories.
4. **Grid (W)** — 3 / 2 / 1 columns of insight cards, 12 per page; pagination.
5. Webinars teaser row + CTA band.

### 5.8 Article `/<article-slug>/`
1. **Article header (W)** — breadcrumb, category eyebrow, h1 (max 18 words wide ~ 20ch at display), meta row: author(s) with small avatars (linked), date, reading time; featured image full container width 16:9 below.
2. **Body (W)** — 3-column layout ≥ lg: left share/ToC rail (sticky, contents from h2s), centre prose 68ch, right empty. Single column below lg.
3. **Author box (M)** — portrait, name, role, short bio, profile link (for each named author).
4. **Related practice areas** — tags.
5. **Related insights (W)** — 3 cards.
6. CTA band.

### 5.9 Webinars `/insights/webinars/` and webinar page
- Index: page hero, grid of webinar cards grouped Upcoming / Recordings / Past.
- Page: hero with state tag, title, date in the webinar's time zone with the viewer's local time below; overview prose; "What you'll learn" list; "Who should attend" as cards; speakers (person cards); FAQ; action by state; CTA band.

### 5.10 Contact `/contact-us/`
1. Page hero (pattern) — h1 "Contact us", lead.
2. **Main (W)** — 7/5: left contact form (§4.7); right stacked: "Book a consultation" card (booking link), WhatsApp, phone, email.
3. **Offices (M)** — 3 office cards with click-to-load maps.
4. CTA-free (form is the action).

### 5.11 Partners, legal pages, search, 404
- **Partners:** page hero; each partner as a split row (logo/name, description, website link); joint office card; event photos grid (3 cols).
- **Legal pages:** page hero (pattern, compact), prose 68ch, "Last updated" meta.
- **Search:** page hero with large search input; results grouped by type (Expertise, People, Insights) with counts; empty state with suggestions (popular practice areas).
- **404:** full-height `navy-950` band, `display` "Page not found", lead, search input, links to Home, Expertise, Insights, Contact.

---

## 6. Responsive rules
- Design and test at **375, 768, 1024, 1280, 1440** px.
- No horizontal scroll at any width (except tables and chip rows inside their own scroll containers).
- Grids collapse as specified per component; splits stack image-first on mobile.
- Touch targets ≥ 44 × 44 px; spacing between targets ≥ 8 px.
- Header height and hero heights as specified; hero text never overlaps the subject's face (use art-directed `object-position` per image, stored with the Media record when available, default `center 30%`).

## 7. Accessibility (must pass)
- WCAG 2.2 AA: contrast, focus visible (§4.2), keyboard access for menu, mega menu, filters, accordion, video, consent, forms.
- One `h1` per page; no skipped heading levels.
- Landmarks: header, nav, main, footer; skip link to main.
- Motion respects reduced-motion.
- Forms: labels, error association, success announced (`aria-live="polite"`).

## 8. Content rules in the UI
- All firm text from the API; UI wording from the dictionary file.
- British English in all UI wording.
- Empty sections are hidden, never shown empty.
- No outcome claims, unapproved testimonials or unpermitted logos (decisions 0004, 0010).

## 9. Acceptance criteria (frontend is "done" when)
1. Every page in §5 matches its section order and component specs at 375 / 768 / 1280 / 1440.
2. `/_design` shows every component in every state.
3. **Playwright** end-to-end tests cover: navigation (desktop + mobile menu + mega menu), team filter, accordion, video, consent (accept/reject), contact form states, search, 404, and a visit to every page template with real data.
4. **Visual regression snapshots** (Playwright) for each page template at 375 and 1280, committed, so later changes show visual diffs.
5. Lighthouse mobile ≥ 90 performance, 100 accessibility, ≥ 95 best practices, 100 SEO on Home, a practice page, an article, Our People, Contact.
6. No console errors, no hydration warnings, no layout shift > 0.05 CLS.
7. Code standards (decision 0006): minimal comments, nothing hard-coded, tokens only.
