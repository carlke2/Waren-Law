# WAREN Law — Design Specification v2 (Home page)

**Version:** 2.0 · 4 November 2026 · **Status:** Approved direction (decision 0015)
**Reference:** `docs/design/reference/home-reference.png` (owner-supplied). Match its **layout, palette, type style and proportions**, filled with WAREN's own logo, content and images. Do not copy the reference's brand name, logo, text, icons or photos.

**Scope now:** the Home page, the header and the footer only. No other page is designed or built until Home is approved.

All values below become design tokens. Components never use raw values. Sizes are given for **desktop (1440 px wide)**, with tablet/mobile rules in §7.

---

## 1. Look in one paragraph
A dark, cinematic, deep-teal site. A full-width city hero fades down into a solid teal background; centred uppercase type with a light/bold headline; a honeycomb of five photo hexagons as the main navigation into the site; a short centred statement between thin rules; a calm four-column footer. Everything is centred, symmetrical and quiet. White text throughout, thin outlined white buttons, no bright colours except WAREN's gold logo.

---

## 2. Colour tokens (sampled from the reference)

| Token | Hex | Use |
|---|---|---|
| `teal-950` | `#0A2733` | Top of hero gradient, header background after scroll |
| `teal-900` | `#102128` | Deepest shadows, hero image overlay base |
| `teal-800` | `#153A49` | **Main page background** (below the hero, behind hexagons) |
| `teal-750` | `#1A333D` | Hexagon overlay base |
| `teal-700` | `#1F4554` | Footer top |
| `teal-600` | `#2C5060` | Footer bottom (gradient end) |
| `slate-500` | `#324C57` | Hero mid-tones overlay, dividers on dark |
| `slate-400` | `#4B6470` | Borders, inactive icon backgrounds |
| `slate-300` | `#798F9A` | Muted text, rule lines |
| `mist-100` | `#C9D6DC` | Secondary text and footer links |
| `white` | `#FFFFFF` | Primary text, button outlines, icons |
| `gold` | `#D4AF37` | **WAREN logo only** (and its focus ring on the logo) |

**Rules**
- Text is `white` or `mist-100` only. Minimum contrast 4.5:1 (all pairs above pass on `teal-800`).
- No other accent colours. No gradients other than those defined in §5.1 and §5.6.
- Focus ring: 2 px `white` outline, 3 px offset, on every interactive element.

---

## 3. Typography

| Role | Font | Weight |
|---|---|---|
| All headings, navigation, labels, buttons | **Montserrat** (Google, via `next/font`) | 300 (light), 500, 700 (bold) |
| Body text (intro paragraph, footer text) | **Montserrat** | 400 |

Style: **uppercase** for navigation, tagline, headline, hexagon titles, buttons and footer headings. Sentence case for paragraphs and footer links.

| Token | Desktop | Mobile (375) | Weight | Tracking | Case |
|---|---|---|---|---|---|
| `hero-headline` | 72 px / line 1.05 | 38 px | 300 + 700 (see §5.2) | 0.02em | Upper |
| `hero-tagline` | 15 px / 1.4 | 12 px | 600 | 0.14em | Upper |
| `hero-sub` | 13 px | 11 px | 600 | 0.18em | Upper |
| `nav` | 13 px | — | 600 | 0.12em | Upper |
| `hex-title` | 17 px | 13 px | 700 | 0.08em | Upper |
| `button` | 12 px | 11 px | 600 | 0.14em | Upper |
| `intro` | 16 px / 1.7 | 15 px | 400 | 0 | Sentence |
| `footer-heading` | 13 px | 13 px | 700 | 0.12em | Upper, underlined 1 px |
| `footer-link` | 13 px / 1.9 | 13 px | 400 | 0 | Sentence, underlined |
| `legal` | 12 px | 12 px | 400 | 0 | Sentence |

Use `clamp()` to scale between mobile and desktop values.

---

## 4. Layout and spacing

- **Content width:** 1120 px max, centred. Side padding 32 px desktop, 20 px mobile (+ safe-area insets).
- **Spacing scale (px):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- **Radius:** 0 everywhere (sharp). Buttons are rectangles with a 1 px border.
- **Shadows:** none, except a soft one on the scrolled header: `0 4px 20px rgba(10,39,51,.5)`.
- **Motion:** 200 ms ease-out on hover/focus; hero chevron gently bobs (4 px, 2 s loop) and stops with `prefers-reduced-motion`. No content animates in; everything is visible at rest.

---

## 5. Sections (top to bottom, exact order)

### 5.1 Header (overlays the hero)
- Height 88 px; transparent over the hero; content width 1120 px.
- **Left:** WAREN gold logo (from Settings/Media), height 36 px, links to `/`.
- **Centre:** nav, `nav` style, 40 px gap: **ABOUT US · EXPERTISE · OUR PEOPLE · INSIGHTS · CONTACT**. Hover/active: 1 px white underline 6 px below the text.
- **Right:** social icons in 28 × 28 px squares with 1 px white border (LinkedIn, Facebook, Instagram, YouTube — from Settings, only those present), 6 px gap; then a **phone box**: 1 px white border, padding 6 × 12 px, `nav` style, the primary phone number from Settings (e.g. `+254 714 350 932`), a `tel:` link.
- **On scroll** (after 24 px): background `teal-950` at 95 % with backdrop blur 8 px, header height 72 px, shadow token. Sticky.
- **Below 1024 px:** logo left, phone icon + hamburger right; menu opens as a full-screen `teal-950` panel with the five nav items (centred, `hex-title` size), social icons and phone box at the bottom. Focus trapped, Esc closes.

### 5.2 Hero
- Height: 640 px desktop (min 560), 560 px tablet, 520 px mobile. Full width.
- **Background:** a city image (Nairobi skyline at dusk/blue hour), `object-fit: cover`, `object-position: center 60%`. Later replaced by a muted, looping, captionless background video (no sound) with the image as its poster — build the component so a video URL in Settings switches it, with **the image shown on mobile and when `prefers-reduced-motion` is set**.
- **Overlay:** linear-gradient top → bottom: `teal-950` 85 % → `slate-500` 35 % (at 45 %) → `teal-800` 100 % (at the bottom edge), so the image fades seamlessly into the page background.
- **Content (centred, starting 180 px from top on desktop):**
  1. `hero-tagline`: **"MASTERY · NOBILITY · TRUST · SOLUTIONS"** (the firm's existing motto, from the Home page record).
  2. 16 px gap, then `hero-headline` on one line: **"TRUSTED"** in weight 300 + **"COUNSEL"** in weight 700, one space between. (Both words from the Home page record as `headlineLight` and `headlineBold`.)
  3. Directly under the bold word, right-aligned to it: `hero-sub` **"NAIROBI · NAKURU · BEIJING"** (from Offices).
  4. 24 px gap, then a button: **"BOOK A CONSULTATION"** — 1 px white border, transparent, padding 10 × 22 px, `button` style; hover: white background, `teal-900` text. Links to the contact page's consultation form.
  5. 20 px gap, a down chevron icon (white, 20 px) that scrolls to §5.3.
- No other elements in the hero.

### 5.3 Honeycomb (main entry points)
- Background `teal-800`. Section padding 24 px top (it continues straight out of the hero fade), 64 px bottom.
- **Five pointy-top hexagons** in a honeycomb: **3 in the first row, 2 in the second row**, the second row offset by half a hexagon and pulled up by a quarter of the hexagon height so the shapes interlock. 6 px gap between hexagons.
- Hexagon size desktop: 300 px wide × 346 px tall (ratio 1 : 1.1547). Use `clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)`.
- **Each hexagon:** a photo (`object-fit: cover`) + overlay `teal-750` at 55 %; centred content: `hex-title` + 12 px gap + a small outlined button **"LEARN MORE"** (1 px white border, padding 5 × 10 px, `button` style 10 px). The whole hexagon is one link (the button is visual, not a second link).
- Hover/focus: overlay drops to 35 %, photo scales to 1.05 inside the clip, button fills white with `teal-900` text.
- **The five tiles (order left → right, top → bottom):**

| # | Title | Link | Image |
|---|---|---|---|
| 1 | ABOUT US | `/about-us/` | Office / reception photo |
| 2 | EXPERTISE | `/area-of-expertise/` | Boardroom or documents (no gavels/scales) |
| 3 | OUR PEOPLE | `/our-team/` | Team group photo |
| 4 | INSIGHTS | `/insights/` | Featured image of the latest insight |
| 5 | WEBINARS | `/insights/webinars/` | Webinar cover image |

  Titles, links and image IDs come from the Home page record (an ordered list of tiles), not hard-coded.

### 5.4 Firm statement
- Content width 820 px, centred. Thin rule (1 px `slate-400`) above and below, 32 px from the text.
- `intro` style, centred, `mist-100`: the firm description from Settings, e.g. *"WAREN Law Advocates LLP provides corporate, property, wealth, dispute resolution and cross-border legal services to businesses, institutions and Kenyans at home and abroad, from offices in Nairobi and Nakuru and a joint office in Beijing."* (final wording from the database).
- Section padding 48 px top and bottom.

### 5.5 Footer
- Background: linear-gradient top → bottom `teal-700` → `teal-600`. Padding 56 px top, 24 px bottom.
- **Four columns** (equal width, 32 px gap), each with a `footer-heading` and `footer-link` list:

| ABOUT US | EXPERTISE | INSIGHTS | CONTACT US |
|---|---|---|---|
| Our story | 8 practice areas (from API) | All insights | Book a consultation |
| Our people | | Webinars | Send us a message |
| Our partners | | Diaspora & wealth (category) | Social icons (as header) |
| Recognition | | Property & conveyancing (category) | Phone box (as header) |
| | | | Nairobi office address |
| | | | Nakuru office address |

- **Bottom line** (32 px below, thin `slate-400` rule above): centred `legal` text: **"© {current year} WAREN Law Advocates LLP. All rights reserved. · Terms of Use · Privacy Policy · Cookie preferences"**. Links underlined. "Cookie preferences" reopens the consent panel.

### 5.6 Floating elements
- **WhatsApp:** 48 px circle, 1 px white border, `teal-950` background, white WhatsApp glyph; bottom-right 24 px (+ safe area). Plain `wa.me` link with the number from Settings. No widget scripts.
- **Cookie consent:** bottom-left panel 380 px wide (full-width sheet on mobile), `teal-950` background, white text, 1 px `slate-400` border. Buttons: **ACCEPT** and **REJECT** (equal, outlined white), **PREFERENCES** (text link). Tracking loads only after Accept.

---

## 6. Images
- Hero: a Nairobi skyline photo, **at least 2400 × 1350 px**, licensed for commercial use (owner supplies, or a free-licence source such as Unsplash/Pexels with the licence recorded in `docs/design/image-sources.md`). Desktop and mobile crops.
- Hexagons: real WAREN photos from Media where possible (team photo, office). Any stock image must be free-licence and recorded in `image-sources.md`.
- `next/image` everywhere, AVIF/WebP, explicit sizes, `priority` only for the hero image. All alt text from the Media record (hero image is decorative: `alt=""`).

---

## 7. Responsive

| Width | Header | Hero | Honeycomb | Footer |
|---|---|---|---|---|
| ≥ 1280 | As §5.1 | 640 px | 3 + 2, hexagons 300 px | 4 columns |
| 1024–1279 | As §5.1, nav gap 28 px | 600 px | 3 + 2, hexagons 260 px | 4 columns |
| 640–1023 | Logo + phone icon + menu | 560 px | 3 + 2, hexagons 200 px | 2 × 2 columns |
| < 640 | Logo + phone icon + menu | 520 px, headline wraps to two lines (light word on top) | **2 + 1 + 2** honeycomb, hexagons 46 vw | 1 column, Contact first |

- No horizontal scroll at any width. Touch targets ≥ 44 px.
- Test at 375, 768, 1024, 1280, 1440.

---

## 8. Behaviour rules (ground rules apply)
- The Home page is **fully pre-rendered**: no loading states, no client-side data fetching, no layout shift. Dev indicator off. Reviewed in production mode (`pnpm build && pnpm start`).
- Client-side JavaScript only for: header scroll state, mobile menu, consent panel, hero video switch.
- All text, links, images and order come from the database through the API. UI wording (e.g. "LEARN MORE", "BOOK A CONSULTATION" if not in the record) comes from the dictionary file.
- Nav links to pages not yet rebuilt open a simple holding page with the same header and footer and the page title. Nothing else is built.

## 9. Acceptance (Home is done when)
1. Side by side with the reference at 1440 px, the layout, proportions, palette and type style match.
2. Screenshots at 375, 768, 1024, 1280, 1440 committed.
3. Lighthouse mobile: performance ≥ 90, accessibility 100, best practices ≥ 95, SEO 100; CLS < 0.05.
4. Playwright: header (desktop + mobile menu, keyboard), hexagon links, consent accept/reject, no requests to Google/Meta before Accept, visual snapshots at 375 and 1440.
5. Code standards (0006) and ground rules (0014) met.
