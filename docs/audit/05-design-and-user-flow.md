# 05: Design and user flow

**Date:** 3 November 2026
**Sources:** computed styles and screenshots from headless Chrome at 390 px and 1366 px; Elementor CSS; page structure from the crawl.
**Could not check:** real user behaviour (no analytics access); user testing; original logo and brand files. Journeys below are my walk-through, not measured data.

## Current design system

**Colours (from CSS and computed styles)**

| Role | Value | Notes |
|---|---|---|
| Navy (header, headings, primary button) | `#061557` / `#061558` | Two near-identical values in use |
| Gold (accent, secondary button, links) | `#D4AF37` / `#D3AF37` | Two near-identical values |
| Dark footer and panel | `#000824`, `#181818`, `#000000` | |
| Text | `#17272B`, `#000000`, `#69727D` | |
| Teal, defined but not prominent | `#1F879A` | Kit global |
| Unused Elementor defaults | `#6EC1E4`, `#61CE70`, `#54595F`, `#7A7A7A` | Still set as the global palette |

The kit's named "primary" colour is therefore the Elementor default blue, not the brand navy. Each page sets its colours by hand, so there is no real token system.

**Fonts.** Inter is the main typeface. Buttons use Roboto. The kit's global fonts are Roboto and Roboto Slab. Article headlines use a condensed display font, and the corporate debt page has its own serif design. Font Awesome adds 77 KB. There are no serif headings outside the debt page, which DIRECTION asks for.

**Logo variants seen.** `Golden-logo` (gold on navy, 200 and 300 px), `Golden-logo-BRIGHT-ICON` (favicon), `cropped-Advocates.png` (schema), `logo-1.svg`. Original files are still needed.

**Buttons.** 3 px radius in Roboto at 15 px on hero; "Book Now" on Contact is a navy pill with gold text; forms mix fully rounded and square fields. White on gold fails contrast at 2.1:1.

**Spacing.** Boxed at 1140 px with 20 px gaps by default; sections vary. Text on practice pages is small and dense, with no sub-heading hierarchy.

**Imagery.** Mixed: a stock city night-time hero video, stock legal images (gavels, scales), AI-generated article images with the logo baked in, black-background portraits, and phone event photos.

**Inconsistencies**
- The corporate debt page looks like a different firm: serif type, emoji icons, scrolling ribbon, pale panels, its own phone number.
- About has a heavy grey band that appears nowhere else.
- Janice's portrait has a light background; the other 19 are dark.
- Webinar pages have no site header or footer.
- Heading case varies: "COntact us" and "SeRVICES" rely on CSS uppercase to hide typing errors.

## Page layouts

| Page type | Section pattern |
|---|---|
| **Home** | Hero with headline and 2 buttons → 14 client logos → 4 "Why choose us" cards → 3 of 8 services → 3 recent insights → CTA → footer |
| **Practice area** | Dark image banner with title and "Experience what We Do Best" → one text block → "Need legal assistance?" CTA → footer. No team, related articles, FAQ or sidebar |
| **Debt (exception)** | Long landing page: hero + assessment card, stats, risks, 6 services, process, why us, jurisdictions, testimonials, FAQ, CTA |
| **Team** | Banner → 4-column grid of 20 black cards. Bio text is in the markup but not visible in the resting card → CTA. No filter |
| **Profile (3 only)** | Portrait + name + contacts + booking → narrative → "helps clients with" → experience → testimonials → credentials → recent posts → booking CTA |
| **Insight** | Featured image → duplicate title → body → newsletter block → related banner. No author photo or practice link |
| **Insights listing** | Heading → intro → cards with categories → pagination. Grouped filters absent |
| **Contact** | Banner → gold "Schedule an initial consultation" band → contact details + form → Beijing joint office → map → footer |
| **Webinar** | Standalone: promise → problem → takeaways → panel → FAQ → form or booking |
| **About** | Banner → mission and vision → history + 4 values → why us → awards carousel → CTA |

## Visitor journeys

### 1. Corporate client (for example, a CFO with unpaid debts, or a foreign investor)
1. Lands on Home or finds the debt or corporate page from search.
2. Home shows only debt, corporate and wealth. Banking, mining, employment and litigation need another click.
3. Client logos and awards support trust, but there is no named lead for a matter on practice pages.
4. Contacts through "Book a Session", which goes to Contact and not directly to a calendar.

**Where it breaks:** the firm's name for debt work changes between pages, and two pages compete. Placeholder testimonials on the most sales-driven page could end the conversation for a careful CFO. Practice pages show no responsible advocates, and most advocates have no profile.

### 2. Individual buying property
1. Finds an article such as the conveyancing post from search. Content here is strong.
2. Article pages push a newsletter sign-up and a general booking banner, with no clear link to the Real Estate page or a conveyancing lawyer.
3. On a phone, the home hero is blank and real estate isn't one of the three services shown.
4. Must interpret "consultation": is it free, what does it cost, and what happens next? The site says "free" in places and is silent in others.

**Where it breaks:** the step from article to the right lawyer. Cecilia has a good profile, but the Real Estate page doesn't link to it. Her displayed email is someone else's, and her WhatsApp link format may not work.

### 3. Kenyan in the diaspora
1. Reaches a diaspora article or a webinar through search, email or social media. This is the firm's richest content, with 10 or more relevant articles.
2. Webinar page is persuasive but has no menu, so there is no easy route to the wider site.
3. Wants to act across time zones: booking suits this well, yet it depends on finding the right link. The "Register today" link on the most recent webinar appears dead.
4. Must trust a remote firm: there's no page explaining how remote work happens (identity checks, signing, payments, time zones).

**Where it breaks:** no diaspora hub in navigation, despite this being a clear business focus. Content is US-centred in places while UK, Canadian and European readers are also targeted. Past events still ask people to register.

## Strengths to keep

- Gold-on-navy identity and logo.
- Diaspora and cross-border positioning; substantial recent articles; webinar funnel.
- Consistent professional portraits for almost all staff.
- Advocate profile structure on Ephraim's and Cecilia's pages.
- International partnerships, the Beijing joint office, and recognition.
- WhatsApp and booking as easy next steps.
- A clear, repeated closing CTA.

## Weaknesses to fix

- Blank mobile hero, and a generic headline that doesn't say who the firm serves.
- A debt page that differs in style and has risky claims.
- Practice pages that are short, dense and unconnected to people or articles.
- Team page with no filter, roles that aren't practice-based, and only 3 of 20 profiles.
- Too many contact routes, numbers and booking links.
- Inconsistent components, poor gold contrast, no real design tokens.
- Stock and AI imagery rather than real offices and people.
- Webinar pages cut off from the site.
