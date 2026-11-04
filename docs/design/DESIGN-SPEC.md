# WAREN Law — Design Specification v3 (Home, header, footer)

**Version:** 3.4 · 4 November 2026 · **Status:** LOCKED by the owner (decision 0016)
**Direction:** the layout of the Frieden & Forbes reference with the navy-and-gold look of the Juristo reference, and a **hero in the style of the Apex reference** (header over the image, three compact cards near the bottom of the image, as in the Kemen reference), filled with WAREN content.
**Visual source of truth:** the "WAREN Law Home Design" canvas, board "LOCKED — Home", saved in the repo as `docs/design/reference/home-design-v3.dc.html`. Where this document and the design differ, the design wins; ask the planner.

**Scope now:** Home, header, footer only.

All values become design tokens. Components never use raw values.

---

## 0. Theme rule — one place for every colour and style

All colours, fonts, sizes, spacing, radius, shadows and motion live in **one theme file**, so the look can be changed later without touching any component.

**Files**
- `frontend/src/styles/theme.css` — the only place values are written, as CSS variables, in two layers:
  1. **Palette** (raw values): `--palette-navy-950`, `--palette-navy-900`, `--palette-navy-800`, `--palette-navy-700`, `--palette-gold-500`, `--palette-gold-700`, `--palette-ink-900` … `--palette-white` (values in §1).
  2. **Semantic tokens** (what components use), each pointing to a palette value:

| Semantic token | Points to | Used for |
|---|---|---|
| `--color-brand` | navy-900 | Primary buttons, headings on light, navy bands, footer |
| `--color-brand-strong` | navy-950 | Darkest bands, overlays |
| `--color-brand-soft` | navy-800 | Cards and inputs on navy |
| `--color-accent` | gold-500 | Accent rules, gold buttons, labels on dark |
| `--color-accent-text` | gold-700 | Gold text on light |
| `--color-on-accent` | navy-900 | Text on gold buttons |
| `--color-text` | ink-900 | Body text |
| `--color-text-muted` | ink-500 | Secondary text |
| `--color-text-subtle` | ink-400 | Dates, meta |
| `--color-on-brand` | white | Text on navy |
| `--color-on-brand-muted` | on-navy | Secondary text on navy |
| `--color-surface` | white | Page background, cards |
| `--color-surface-alt` | mist | Alternate bands |
| `--color-border` | line | Card borders |
| `--color-border-strong` | line-strong | Inputs, icon buttons |
| `--color-success` / `--color-error` | #1F6B45 / #B42318 | Form states on light (decision 0020) |
| `--color-success-on-brand` / `--color-error-on-brand` | #7FD3A6 / #FF9C8F | Form states on navy (decision 0020) |

  Also in the same file: `--font-heading`, `--font-body`, the type scale (`--text-h1` …), spacing scale, `--radius`, `--shadow-card`, `--shadow-header`, motion durations, `--container`.
- `frontend/tailwind.config` (or Tailwind v4 `@theme`) maps utilities **only** to the semantic tokens (e.g. `bg-brand`, `text-accent`), not to palette names and not to Tailwind's default colours.
- Fonts are loaded once in `frontend/src/styles/fonts.ts` (`next/font`) and exposed as `--font-heading` and `--font-body`.

**Rules**
1. Components use semantic tokens only. **No hex, rgb, px font sizes or font names in any component.**
2. Changing the brand colour = change one palette line (or point a semantic token elsewhere). Changing the heading font = change `fonts.ts`.
3. A CI check fails the build if a component contains a raw colour value or a font name (`scripts/check-theme.ts`, runs with lint).
4. Overlay colours (e.g. hero gradient) are tokens too: `--overlay-hero-from`, `--overlay-hero-to`.

## 1. Colour tokens (palette values for the theme file)

| Token | Hex | Use |
|---|---|---|
| `navy-950` | `#070F2A` | Utility bar, CTA band |
| `navy-900` | `#0B1A4A` | Brand navy: primary buttons, headings on light, team band, footer |
| `navy-800` | `#12245E` | Cards and inputs on navy |
| `navy-700` | `#1B2F6E` | Image placeholders / overlays on navy |
| `gold-500` | `#D4AF37` | Accent on dark: eyebrows, rules, gold button background, role text, logo |
| `gold-700` | `#8A6A12` | Gold text on light (eyebrows, card numbers) — passes AA on white |
| `ink-900` | `#141A2E` | Body text on light |
| `ink-600` | `#3D4560` | Paragraphs on light |
| `ink-500` | `#4A5270` | Secondary text on light |
| `ink-400` | `#5D6582` | Meta (dates) |
| `on-navy` | `#C7CCE0` | Secondary text on navy |
| `line` | `#E1E4EE` | Card borders on light |
| `line-strong` | `#C9CEDD` | Input / icon-button borders on light |
| `mist` | `#F3F4F8` | Alternate light band |
| `white` | `#FFFFFF` | Page background, text on navy |

Rules: gold button = `gold-500` background + `navy-900` text (never white on gold). Gold text on white uses `gold-700`. Hero overlay: left-to-right `navy-950` 92 % → 72 % (48 %) → 30 % (100 %).

## 2. Typography

| Role | Font | Weights |
|---|---|---|
| Headings (H1–H3, names, footer headings) | **Newsreader** (Google, `next/font`) | 500, 600 |
| Body, navigation, buttons, labels | **Manrope** (Google, `next/font`) | 400, 500, 600, 700 |

| Token | Desktop → mobile | Weight | Notes |
|---|---|---|---|
| `h1` | visually hidden on Home (see §4) | — | |
| `h2` | 52 → 34 px, line 1.1 | Newsreader 500 | section titles |
| `h3-card` | 23–24 px, line 1.2–1.25 | Newsreader 600 | practice and insight cards |
| `name` | 23 px | Newsreader 500 | team cards |
| `lead` | 19 px, line 1.6 | Manrope 400 | hero sub |
| `body` | 17 px, line 1.75 | Manrope 400 | welcome, section intros |
| `card-body` | 15 px | Manrope 400 | card text |
| `nav` | 15 px | Manrope 600 | header links |
| `button` | 15 px | Manrope 600 / 700 (gold) | |
| `eyebrow` | 13 px, 0.2em, uppercase | Manrope 700 | `gold-700` on light, `gold-500` on dark |
| `meta` | 13–14 px | Manrope 400–600 | utility bar, dates, footer bottom |

Scale headings with `clamp()` between 375 and 1440 px.

## 3. Layout

- Container max **1280 px**, side padding 32 px (20 px under 640 px) plus safe-area insets.
- Section vertical padding: **112 px** standard, 96 px CTA, 56 px recognition strip (reduce ~30 % on mobile).
- Spacing scale (px): 4, 8, 12, 14, 16, 18, 20, 24, 28, 32, 48, 56, 64, 80, 96, 112.
- Radius **0** everywhere. No shadows except the hero cards (`0 18px 40px rgba(7,15,42,.18)`). Card emphasis = 1 px border + 3 px bottom border in `navy-900`.
- Grids use `repeat(auto-fit, minmax(…))`: practice cards min 260 px, team cards min 240 px, insight cards min 300 px, footer columns min 220 px.

## 4. Sections (exact order)

1–3. **Hero section** (one block; the header sits on top of the image):
   - **Background:** full-width Nairobi skyline image (later a muted looping video from Settings; image kept on mobile and for reduced motion). Overlays: left-to-right `navy-950` 86 % → 55 % (50 %) → 10 % (100 %), plus a top fade (`navy-950` 70 % → 0, 140 px) behind the header.
   - **Header** (transparent, 96 px, sticky; on scroll becomes solid `navy-900` with the shadow token): left the WAREN logo (gold mark + white "WAREN" wordmark in Newsreader 26 px + gold "LAW ADVOCATES LLP" 9 px, 0.3em); right nav Home · About · Practice Areas · Our People · Insights (15 px, 500, white) and a gold **"Contact Us"** button (`navy-900` text, 700, padding 11 × 20 px). < 1024 px: 44 px menu button → full-screen navy menu.
   - **No headline, subheading or buttons in the hero.**
   - **Hero height rule: the whole hero, cards included, fits in the first screen** on a 1366 × 768 laptop and on a 1920 × 1080 monitor (no scrolling needed to see the full cards). Image space under the header: `clamp(150px, 15vw, 240px)`. Total hero height ≈ 560–640 px on desktop; never taller than `100svh`.
   - **Three hero cards** near the bottom of the image, **fully on the image** with **64 px of image visible below them**. Row max-width **1080 px**, centred, gap 28 px, cards min 240 px (stack on mobile). Each card: white at 96 %, padding 26 × 24 × 22 px, centred; 48 px circular icon (1 px `line` border, 24 px navy line icon); title Newsreader 22 px 600 `navy-900`; one line 14 px `ink-500`; full-width navy button **"LEARN MORE"** (12 px, 700, 0.1em). Whole card is one link. Shadow `0 18px 40px rgba(7,15,42,.18)`.
   - Cards (from the Home record, ordered list): **For Businesses** (briefcase) — corporate, banking, employment and dispute advice for companies, lenders and investors · **For Property & Families** (home) — conveyancing, succession and wealth planning · **For Kenyans Abroad** (globe) — buying property, succession and investing from abroad. Links: Practice Areas filtered / relevant practice pages (planner to confirm targets with the firm; default `/area-of-expertise/`).
   - The page's `<h1>` (visually hidden) is "WAREN Law Advocates LLP — Advocates in Nairobi, Nakuru and Beijing" so the page keeps one H1 for accessibility and SEO.
4. **Welcome** (white, normal 112 px padding): left eyebrow "About us", H2 "Welcome to WAREN Law", 64 px gold rule; right two paragraphs + navy button "Learn more about us". Two columns that wrap.
5. **Areas of Expertise** (mist): centred eyebrow, H2, intro; grid of **8 practice cards**: line icon (32 px, 1.5 stroke, navy) + number 01–08 (`gold-700`), title, one-line summary, "Learn more →". Whole card is the link. Hover: border `navy-900`, arrow moves 4 px.
6. **Meet Our Partners** (`navy-900`): header row (eyebrow, H2, intro | outline button "All our people"); 4 portrait cards (4:5 portrait, `navy-800` card, name in Newsreader, role in gold), partners only, from API.
7. **Latest insights** (white): header row (eyebrow, H2 | "All insights →" with gold underline); 3 insight cards: 16:10 image, category eyebrow, title, date.
8. **Recognition strip** (mist, top border): award icon + "Legal Insider 2025" eyebrow + award title; right "International partners:" + partner names. Hidden parts if no data.
9. **CTA band** (`navy-950`): H2 "Need legal assistance? Speak to an advocate.", sentence; gold "Book a consultation" + outline "Chat on WhatsApp".
10. **Footer** (`navy-900`): 4 columns — Firm (logo, one-line description, phones, email) · Quick links · Practice areas (5 + "All practice areas →") · Newsletter (native form: label, email input, gold submit). Bottom bar: office addresses · © year · Terms · Privacy · Cookie preferences.

Floating: WhatsApp link button (bottom-right, `wa.me`), cookie consent panel (bottom-left; Accept / Reject equal weight; Preferences).

## 5. Content sources
Every text, link, image and list comes from the API (Home page record, Settings, Offices, PracticeArea, TeamMember, Insight, Award, Partner). UI wording (button labels, "Learn more →", form labels) from the dictionary file. Copy in the design is the default seed content.

## 6. Images
Hero: Nairobi skyline, ≥ 2400 × 1350, commercial licence recorded in `docs/design/image-sources.md`; mobile crop. Team portraits 4:5, same crop for all. Insight images 16:10. `next/image`, `priority` on hero only. No gavels or scales photos.

## 7. Responsive — tested on phones first

Test widths: **360, 390, 430** (phones), **768** (tablet), **1024, 1280, 1440, 1920** (desktop). The design canvas has a phone board ("LOCKED — Home on a phone (390 px)") as the visual reference for phones.

| Section | Phone (< 640 px) | Tablet (640–1023 px) | Desktop |
|---|---|---|---|
| Header | 72 px; logo + 44 px menu button; full-screen navy menu | Logo + menu button | Full nav + Contact Us button |
| Hero | Image space 140 px; **cards become compact rows** (icon · title · arrow), stacked, 10 px gap; one-line text and button hidden; 28 px of image below; hero total ≈ 420–460 px | Image space ~150 px; 3 cards may wrap to 2 + 1 | As §4 |
| Section padding | 64 px top/bottom, 20 px sides | 88 px | 112 px |
| Welcome | One column (title then text) | One column | Two columns |
| Areas of Expertise | 1 column of cards | 2 columns | 4 columns |
| Meet Our Partners | **2 portraits per row**, smaller names (17 px) and roles (13 px) | 2 per row | 4 per row |
| Latest insights | 1 column | 2 columns | 3 columns |
| Recognition strip | Stacked | Stacked | One row |
| CTA band | Title, text, buttons stacked; buttons full width | Wraps | One row |
| Footer | 1 column: Firm, Newsletter, Quick links, Practice areas; bottom bar centred | 2 × 2 | 4 columns |
| Floating | WhatsApp 48 px bottom-right above safe area; consent panel as a bottom sheet | Same | Same |

Rules: no horizontal scroll at any width; touch targets ≥ 44 × 44 px; body text ≥ 16 px; headings scale with `clamp()`; images use phone crops; nothing important hidden on phones except the hero card one-liners (their pages carry that text).

## 8. Behaviour (ground rules)
Fully pre-rendered; no loading states; no client-side page fetching; dev indicator off; native newsletter form posts to our backend; maps and tracking only on click / after consent. Client JS only for sticky header, mobile menu, consent, newsletter submit.

## 9. Acceptance
1. Side by side with the design canvas at 1440 px: layout, spacing, colours and type match.
2b. Phone check: screenshots at 360, 390 and 430 px match the phone board; no horizontal scroll; Lighthouse mobile scores as below.
2c. Theme check: `scripts/check-theme.ts` passes; changing `--palette-navy-900` in theme.css alone recolours the whole site (demonstrate with a temporary screenshot, then revert).
2a. Hero fit check: screenshots at 1366 × 768 and 1920 × 1080 show the full hero cards without scrolling.
2. Screenshots at 375, 768, 1024, 1280, 1440.
3. Lighthouse mobile: performance ≥ 90, accessibility 100, best practices ≥ 95, SEO 100, CLS < 0.05.
4. Playwright: header + mobile menu (keyboard), practice/team/insight links, newsletter form states, consent (no Google/Meta requests before Accept); visual snapshots at 375 and 1440.
5. Code standards (0006) and ground rules (0014).
