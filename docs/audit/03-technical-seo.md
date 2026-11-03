# 03: Technical, SEO and quality audit

**Date:** 3 November 2026
**Sources:** 101 crawled URLs and their source; WordPress REST API; response headers; status checks on 116 internal images and all external links; headless Chrome renders of 13 page types (phone, 390 px) and 8 page types (desktop, 1366 px).
**Could not check:** PageSpeed Insights / Lighthouse (the public API returned HTTP 429, quota exceeded); field Core Web Vitals; Search Console and analytics data; real devices or screen readers; form submission results; keyboard behaviour beyond what markup shows.

## Links

| Finding | Where | Severity |
|---|---|---|
| Internal link to `/author/` returns 404 (4 links) | MailPoet system pages and the author archive | Low |
| No other broken internal page links; all 116 internal images referenced in pages returned 200 | Whole crawl | OK |
| "Register today" points to a Zoom page that returned 404 to the automated check (webinar date has passed) | `/trusts-taxes-protecting-wealth-across-borders/` | High, confirm by hand |
| Displayed `+254 714 350 932` links to `tel:254719278594`, which is the other number | `/contact-us/` | High |
| `info@warenlaw.com` has an empty link, so it is not clickable | `/contact-us/` | Medium |
| WhatsApp links use a local number format (`wa.me/0719278594`, `wa.me/0797899003`); WhatsApp expects the international format | Ephraim and Cecilia profiles | High, not opened |
| Footer `tel:` links omit the `+` (`tel:254714350932`) | All pages | Low |
| Cecilia's profile shows `endegwa@warenlaw.com` but links to `cwangeci@warenlaw.com` | `/our-team/cecilia-njeri/` | High |
| Team card links to `/ephraim-ndegwa/`, which 301s to `/our-team/ephraim-ndegwa/` | `/our-team/` | Low |
| LinkedIn footer uses the old slug `maina-murimi-advocates`. **It still works:** it 301s to `waren-law-advocates-llp`, and the Contact page already uses the new URL. This softens the first-look finding from a wrong link to a stale one. | 92 pages | Medium |
| Link carries an AI-tool tracking parameter (`?utm_source=chatgpt.com`) | `/conveyancing-lawyer-in-kenya-buying-property-safely/` | Low |
| Empty link targets: 136 with an empty `href`, 96 with `#` (many are accordions or menu toggles) | Site-wide | Low |

**External links that could not be verified** because they refuse automated requests: Facebook (400), Microsoft Bookings and Outlook booking (417), LinkedIn personal profile (999), Jointide (403), WeChat article (captcha). These need a manual click. Instagram, YouTube, Calendly, Jingping, Matrix and all Kenya Law links responded normally.

**Social links:** LinkedIn, Facebook, Instagram and YouTube appear in the footer. Page names confirmed: LinkedIn "WAREN Law Advocates LLP", YouTube "WAREN Law". Instagram and Facebook names could not be read without logging in.

## SEO

**Robots and sitemaps.** `robots.txt` blocks `/wp-admin/` and `/wp-content/uploads/wpforms/` and declares `/wp-sitemap.xml`. `/sitemap_index.xml` is a 404; `/sitemap.xml` 301s to the WordPress core sitemap, even though Rank Math is installed. The sitemap lists 91 URLs. It includes unhelpful entries: two MailPoet system pages, a redirecting Elementor template, 16 noindex tag pages and a noindex author archive.

| Issue | Evidence | Severity |
|---|---|---|
| **`/about-us/` canonical points to `/corporate-commercial-practice/`.** This tells search engines not to index About as itself. | Page source | **High** |
| `/zh/` canonical points to `/insights/zh/`, which is a 404 | Page source and status check | Medium |
| 13 pages have no H1: About, Area of Expertise, Banking, Contact, Debt Solutions, Mining, Partners, Team, all 3 profiles, Wealth Built Abroad webinar, `/zh/` | Crawl | High |
| All 36 posts have two or more H1s, because the newsletter heading "Join Our Email List" is also an H1. The conveyancing post has three, one of them empty. | Crawl | Medium |
| `/corporate-debt-recovery/` has two `<title>` tags in its source | Page source | Medium |
| Both debt pages share one meta description and the same title target | Crawl | High |
| `/area-of-expertise/` title says "7 Key Legal Services"; the page lists 8 | Crawl | Medium |
| `/our-partners/` meta description is "Meet Our abled partners" | Crawl | Medium |
| 12 category pages have no meta description; `/insights/page/N/` repeat the same title and description | Crawl | Low |
| `/page/2/` returns 200 with the home page's title and an indexable robots tag | Status check | Low |
| `/ABOUT-US/` returns 200 rather than redirecting (URLs are case-insensitive) | Status check | Low |
| Many default titles of the form "… - warenlaw.com", several far beyond normal display length | Crawl | Low |

**Structured data (Rank Math).** Organization is named "warenlaw.com" rather than the firm's legal name, with no address or phone. There is no `LegalService` or `LocalBusiness`. Pages are typed `Article`; posts are `BlogPosting`. FAQPage is present on 15 longer articles. The author `Person` is the shared "Waren Law" account.

**Social cards.** Open Graph and Twitter tags exist, with `og:site_name` "warenlaw.com". The home page has no `og:image`.

**`zh_CN`.** Declared only on the home page (`hreflang="zh"`, `og:locale:alternate`). `/zh/` is an empty shell showing only "About Us", "Activities" and a copyright line. A Polylang-style setup and translation plugin are still installed. `/zh/about-us/` 301s to the English page. DIRECTION already drops this version.

**Verification tags to carry over.**
- HTML meta: `google-site-verification=psyeUDg2m1msvc8mmzPm6ynF4QMH8CcnRx30ZVh3EnA`
- HTML meta: `msvalidate.01=2B505C576AFA10A6956AF7677134FC44` (Bing)
- DNS TXT: `google-site-verification=uPyvhLQ80AyW6QW38vJFqnNMHUF8aHUGLTkGAiJPrp4`, `MS=ms32625013`

## Technical setup

- **Stack:** WordPress 6.9.11, Astra theme, Elementor 4.3.5 and Elementor Pro, PHP 8.2.35, Hostinger CDN (`hcdn`).
- **Plugins seen in source or REST namespaces:** Rank Math, Google Site Kit 1.187.0, Jetpack and Jetpack Boost, WPForms, MailPoet, Popup Maker, Joinchat (`creame-whatsapp-me`), Essential Addons, Header Footer Elementor, Sticky Header Effects, Templately, Polylang-style `pll`, `atfp-translate`, WP Staging (`wpstg`), Hostinger Tools, a WooCommerce email editor namespace, and `elementor-mcp-composer` / `mcp`.
- **Tracking loaded on every page:** Google Tag Manager `GTM-T58XBX56`, Google tag `GT-5MRWVKJK` (through Site Kit), Meta Pixel `1808355966500012`, Jetpack Stats. All load without a consent step (see 04).
- **Third parties:** Google Fonts, Google Maps embed (Contact), WhatsApp, Microsoft Bookings, Calendly (Ephraim only), Zoom.
- **Forms plugin:** WPForms (Contact), MailPoet (newsletter and webinar recording).

## Performance

Measured in Chrome from this network with no throttling, first visit, cache off and **trackers blocked**. Real visitors on mobile data will see slower results and slightly more weight. Treat these as a floor, and re-measure with Lighthouse when the quota allows.

| Page | Viewport | Requests | KB | Images KB | Scripts KB | CSS KB | Fonts KB | LCP (ms) | Tap targets under 24px |
|---|---|---|---|---|---|---|---|---|---|
| home | mobile | 110 | 1431 | 864 | 191 | 147 | 169 | 7576 | 9 |
| about | mobile | 89 | 1079 | 600 | 212 | 122 | 92 | 1512 | 2 |
| team | mobile | 103 | 2388 | 1890 | 175 | 118 | 142 | 1728 | 2 |
| profile | mobile | 110 | 1167 | 472 | 211 | 151 | 274 | 1948 | 10 |
| expertise | mobile | 87 | 1220 | 790 | 174 | 114 | 92 | 1792 | 6 |
| practice | mobile | 79 | 809 | 380 | 174 | 113 | 92 | 1820 | 2 |
| debt | mobile | 82 | 871 | 301 | 174 | 113 | 216 | 4632 | 2 |
| insights | mobile | 85 | 970 | 509 | 174 | 126 | 104 | 2000 | 42 |
| article | mobile | 86 | 937 | 398 | 202 | 140 | 138 | 1536 | 15 |
| contact | mobile | 98 | 1039 | 444 | 287 | 127 | 126 | 1764 | 2 |
| webinar | mobile | 103 | 670 | 113 | 224 | 136 | 149 | 1576 | 0 |
| partners | mobile | 98 | 1622 | 1145 | 212 | 120 | 92 | 2260 | 5 |
| zh | mobile | 51 | 329 | 5 | 85 | 114 | 92 | 1784 | 2 |
| home | desktop | 109 | 1477 | 911 | 191 | 146 | 174 | 2864 | 10 |
| about | desktop | 89 | 1104 | 620 | 212 | 121 | 97 | 1832 | 3 |
| team | desktop | 103 | 3457 | 2954 | 175 | 118 | 148 | 3140 | 3 |
| practice | desktop | 79 | 834 | 400 | 174 | 113 | 97 | 2016 | 3 |
| debt | desktop | 82 | 890 | 302 | 174 | 113 | 233 | 3272 | 3 |
| article | desktop | 86 | 1066 | 514 | 202 | 140 | 152 | 1676 | 13 |
| contact | desktop | 98 | 1053 | 453 | 287 | 127 | 131 | 1872 | 3 |
| webinar | desktop | 105 | 845 | 278 | 224 | 135 | 161 | 1488 | 0 |

- **Home LCP on a phone: 7.6 s** on a cold load (target under 2.5 s). Debt page: 4.6 s on a phone. Other pages: about 1.5–2.3 s under these favourable conditions.
- **Hero video:** `hero.mp4` is 15.8 MB, autoplays on desktop with no poster, and is not counted in the table because it streams.
- **Requests:** 79–110 per page. The home page has 26 external scripts (20 with no `defer` or `async`), 43 stylesheets and 102 KB of inline CSS. These are render-blocking.
- **Largest images:** `studio-arrangement-work-scaled.webp` (288 KB) loads on nearly every page. The Team page loads 2.9 MB of images on desktop for cards about 133 px wide (for example, a 1788×2560 portrait at 509 KB). The media library holds 3.5 MB portrait PNGs.
- **Caching:** HTML is uncached at the CDN (`x-hcdn-cache-status: DYNAMIC`). Static assets have a 7-day `max-age`.
- **Layout shift:** near zero on most pages. One reading of 0.74 on the Ephraim profile on a phone needs confirming, because the test scrolled the page.

## Accessibility (from markup and renders)

- **Alt text:** 190 of 276 library images have none. Home page: 11 of 21 images. Team page: 18 of 24, including most portraits (tracking pixel excluded). Gallery images use file names as alt text, for example "WhatsApp Image 2025-12-10 at 23.27.42_06c4f98e".
- **Heading order:** skipped levels on many pages. Bios on the Team page are H6, and names mix H4 and H5. The home page uses H2 for "01." and "View More".
- **Colour contrast (calculated):** white on gold buttons is **2.1:1**, and gold text on white is the same. Both fail WCAG AA (4.5:1). Navy on white is 16.8:1, and gold on navy is 8.0:1, both of which pass.
- **Tap targets under 24 px:** up to 42 on the Insights listing on a phone (category links, "Read More").
- **Unnamed controls:** 3 links or buttons with no accessible name on the home page and on profiles.
- **Good:** a skip link exists, `lang` is set, and the WhatsApp button has an aria label.
- **Focus and keyboard:** not tested by hand. Carousels and accordions need checking in the rebuild.

## Mobile

- **Home hero is blank on phones.** The video is hidden at phone width and there is no fallback image, so visitors see a flat grey panel behind the headline. This is the first thing most Kenyan visitors see.
- No horizontal page overflow on any tested page.
- The Team page stacks 20 full-width cards, so the page is very long, with no filter or search.
- Article pages show the headline twice on a phone, once from the theme and once in the body (seen on the conveyancing post).
- The WhatsApp widget's label covers body text on article pages.

## URL behaviour

| Test | Result |
|---|---|
| `http://warenlaw.com/` | 301 to `https://warenlaw.com/` |
| `https://www.warenlaw.com/` | 301 to `https://warenlaw.com/` |
| `http://www.warenlaw.com/` | 301 to `https://www.warenlaw.com/`, then to apex (two hops) |
| `/about-us` (no trailing slash) | 301 to `/about-us/` |
| `/index.php` | 301 to `/` |
| Unknown URL | 404 with a branded, noindex page |
| `/insights/page/2/` to `/4/` | 200; `/insights/page/99/` is a 404 |
| `/feed/`, `/comments/feed/` | 200, RSS |
| `/?s=debt` | 200, noindex |
| `/?p=9929`, `/?page_id=3619` | 301 to the clean URL |
| Attachment pages (2 sampled) | 301 to the parent post or home |
| Tag and author archives | 200, noindex; categories are indexable |
| `/ephraim-ndegwa/` | 301 to `/our-team/ephraim-ndegwa/` |
| `/zh/about-us/` | 301 to `/about-us/` |
| `/llms.txt` | 200, generated by the Hostinger plugin, effectively empty |

**Paths to preserve:** pages, practice areas, webinars and posts all sit at the site root, so routing needs a root-level slug resolver if paths are kept (see 06).

## Site features

| Feature | Current state |
|---|---|
| Internal search | Header icon; GET `/?s=`; noindex results |
| Newsletter | MailPoet form "Join Our Email List" below every post, plus management pages |
| Comments | Closed on all posts; comment feed still live |
| Cookie banner | **None found** |
| Pop-ups | Popup Maker is loaded but no pop-up was found in home page markup |
| WhatsApp widget | Joinchat on all crawled pages; number `254719278594`; "Start a confidential inquiry with a lawyer" |
| Click-to-call | Footer and Contact (with errors above); debt page uses a third number, `+254 797 899 003` |
| Maps | Google embed for Nairobi on Contact (zoom 10, city level); none for Nakuru |
| Language switcher | None visible |
| Favicon and icons | Set by `<link>`; `/favicon.ico` itself is a 404; no web manifest |
| Booking | Microsoft Bookings (two URLs for one calendar named "…ConsultationsCopy"), Calendly for Ephraim, and "Book a Session" going to Contact |

## Forms

No form was submitted, so confirmation and delivery behaviour are taken from page source only.

| Form | Where | Fields (* required) | Spam protection | Confirmation | Privacy notice |
|---|---|---|---|---|---|
| Contact (WPForms #3812) | `/contact-us/` | First*, Last*, Phone (country picker), Email*, Message* | No CAPTCHA widget in markup; WPForms JavaScript validation | Not visible without submitting | **None** |
| Newsletter (MailPoet) | Below every post | Email* | Honeypot; a MailPoet captcha page exists | "Check your inbox…" text in source | **None** |
| Webinar recording (MailPoet) | 2 webinar pages | First name*, Email* | Honeypot | "We emailed you the webinar recording…" | **None** |
| Search | Header, archives | Search term | n/a | n/a | n/a |

The Contact form asks visitors for a free-text legal enquiry with no notice beside it. See 04.

## Quality and copy

Typos and inconsistencies visible to clients: "Intergrity", "Meet Our abled partners", "QUick Links", "SeRVICES", "COntact us", and US spelling alongside British ("Center", "organization", "labor"). Article titles are often all capitals. The firm's name varies: "WAREN Law Advocates LLP", "Waren Law Advocates", "WAREN law Advocates", "Waren". Mining, Real Estate and Wealth pages share near-identical template sentences (for example "premier legal solutions", "absolute statutory compliance").
