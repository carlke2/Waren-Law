# 02: Content and media

**Date:** 3 November 2026
**Sources:** WordPress REST API (pages, posts, categories, tags, media); crawled page source; Chrome renders.
**Could not check:** webinar recording delivery (needs a form submission); whether unlisted media is used in CSS; article accuracy, which needs advocates. All content here is summarised, and short quotes are under 15 words. Testimonial wording and client identities are deliberately not reproduced.

## Home

| # | Section | What it says and does |
|---|---|---|
| 1 | Hero (video on desktop, blank grey on phones) | "Mastery, Nobility, Trust & Solutions" with "Book A Consultation" and "Our Services" |
| 2 | Client logos | "Some of the Brands We've Worked with": 14 logos |
| 3 | Why choose us | 4 numbered cards: new standard of practice, client-centred, trusted, global outlook |
| 4 | What we handle | 3 of 8 services: debt, corporate, wealth; "View More Services" |
| 5 | Recent insights | Latest 3 posts, "View More" and "Load More" |
| 6 | CTA | "Need legal assistance? We're here to guide you." with "Book a Session" |
| 7 | Footer | Summary, quick links, areas of expertise, contact details, socials |

There is no line saying who the firm serves, no people, no awards and no diaspora message on the home page.

## About Us

About 410 words: mission, vision and an undated history, four values (Trust, Mastery, Professionalism and the misspelt "Intergrity"), "Why choose us", then "Recognized to be the best" with an awards carousel (Legal Insider 2025 "Litigation and Dispute Resolution Firm of the Year", Nairobi; the same award in two colourways). **No video or other media beyond images.** The client's About video is new work. The page has no H1, and its canonical points elsewhere (see 03).

## Our Team

**20 people.** All have photos. Bio lengths are the short card bios, in words.

| Name | Title on card | Photo: source file (pixels) | Bio | Practice from card or bio | Links |
|---|---|---|---|---|---|
| Janice Wachuka | Managing Partner | `Janice.png-scaled.jpg` (1600×2400), **light background** | 32 | Wealth, property, conveyancing | Profile, email, LinkedIn, booking |
| Nick Amboko | Consultant ("Consultant Partner" in bio) | `nick-black-background-1.png` (853×1280) | 23 | Litigation, employment, regulatory, procurement | None |
| Ephraim Ndegwa | Partner, Head of Strategy & Development | `ephraim-black-background.png` (937×1312) | 34 | Investment, business, energy, mining | Profile, phone, email, WhatsApp, LinkedIn, Calendly |
| Phylis Njane | Partner Ruiru Branch | `Maina-Murimi-and-advocates-…-5.webp` (1150×1419) | 42 | Litigation, employment, insurance, IP, probate | None |
| Martin Wachira | Partner Cross border Practice | `Wachira-Two-scaled.webp` (1788×2560) | 42 | Cross-border | None (webinar panel links go to `/our-team/`) |
| Barbra Katasi | Debt Solutions & Recovery | `Barbra-Katasi.jpeg` (1024×1536) | 26 | Debt | None |
| Cecilia Njeri | Conveyancing & Commercial | `Cecilia-Njeri.webp` (982×1280) | 37 | Conveyancing, commercial, succession | Profile, phone, email, WhatsApp, LinkedIn, booking |
| Christine Muthoni | Conveyancing & Commercial | `WhatsApp-Image-2026-01-14-at-22.52.00.jpeg` (**323×521**) | 45 | Conveyancing, commercial | None |
| Stephen Warutere | Debt Solutions & Recovery | `WhatsApp-Image-2026-01-14-at-22.46.26.jpeg` (**324×478**) | 37 | Debt | None |
| Faith Wanjala | Litigation | `WhatsApp-Image-2026-10-02-at-8.37.40-AM.jpeg` (1059×1485) | 42 | Litigation | None |
| Margaret Wanjiru | Executive Assistant, Wealth Management and Estate Planning | `Janice-Team.jpg-1-scaled.jpeg` (1600×2001) | 38 | Support | None |
| Eutycus Kamathi | Strategy & Development | `Ephraim-Team.jpg-1-…` (1600×1717) | 32 | Marketing | None |
| Charity Wambui | Strategy & Development | `Maina-Murimi-and-advocates-…-13.webp` (1150×1419) | 45 | Business development | None |
| Fridah Gakii | Strategy & Development | `0B3A9667-scaled.jpg` (1600×2239) | 41 | Strategy | None |
| Davis Wachira | Strategy & Development | `0B3A9650-scaled.jpg` (1600×2239) | 36 | Research | None |
| Jimmy Wamalwa | Finance | `MOK_5448-scaled-1.webp` (2048×2560) | 17 | Finance | None |
| Florence Wambugu | Clerk-Nakuru | `Florence.webp` (1000×982) | 26 | Clerk, Nakuru | None |
| Mary Wanjiku | Clerk | `Girl.png` (504×627) | 22 | Clerk | None |
| Alex Maina | Clerk | `boy.png` (509×627) | 22 | Clerk | None |
| Charles Ndombi | Clerk | `0B3A9653-scaled.jpg` (1600×2239) | 22 | Clerk | None |

**Layout:** banner, then a 4-column grid of black cards with centred photo, name and role. Bio text is in the markup but not visible in the resting card. Bios are coded as H6 and names as H4 or H5.

**What is weak**
- Only 3 of 20 have a profile. Partner Martin Wachira, on two webinar panels, has none.
- No filter, no grouping (partners, advocates, staff), and no way to tell advocates from support staff.
- Titles conflict: Janice is named "Janice Maina" in her bio and "Janice Wachuka Maina" on an award image; Martin is also "Partner, Diaspora Liaison"; Ephraim's profile lists practice areas while his card lists a management role.
- Photos are mostly consistent, but backgrounds and crop sizes differ. Two are low-resolution WhatsApp files. Many file names don't match the person (Margaret's is `Janice-Team…`; Eutycus's is `Ephraim-Team…`). Three clerks' bios are identical.

**Profiles** (`/our-team/janice-wachuka/`, `/our-team/ephraim-ndegwa/`, `/our-team/cecilia-njeri/`). About 440–970 words. Janice's has narrative and recognition only. Ephraim's and Cecilia's add "helps clients with", representative experience, testimonials and credentials. All have a booking CTA and recent posts. **Errors:** Cecilia's displayed email differs from its link; WhatsApp links use local format; none has an H1.

## Our Partners

Intro about reputable firms worldwide (subheading "Meet Our abled partners"), then:

| Partner | What is shown | Link |
|---|---|---|
| Beijing Jingping Law Firm (labelled "jingping law") | Reciprocal joint offices in Beijing and Nairobi | `jinglawyer.com` |
| Beijing Matrix Law Firm ("matrix law") | Over a decade in overseas law and investments | `en.imatrixlaw.com` |
| Jointide Law Firm | Over 20 branches in mainland China and South Korea | `jointide.com/en/` |
| Signing events | Tripartite signing on 27 November 2025, Beijing; a second Jingping agreement section | WeChat article |

Galleries of 11 event photos, mostly with WhatsApp file names used as alt text.

## Areas of Expertise

Index page: `/area-of-expertise/` (title says 7, list has 8), with 4 further summary sections and a commitment statement.

| Practice area | URL | Words (REST body) | Summary | CTA | Related team |
|---|---|---|---|---|---|
| Debt (two pages, below) | see below | 109 / 1,645 | Recovery, tracing, enforcement | Varies | **None linked** |
| Corporate & Commercial | `/corporate-commercial-practice/` | 356 | Formation, structuring, contracts, M&A, PPP, PPAs | Book a Session | **None** |
| Wealth Management & Investments | `/wealth-management-investments/` | 356 | Trusts, holding structures, estate plans, investment | Book a Session | **None** |
| Employment & Labour | `/employment-labour-law/` | 334 | Contracts, HR compliance, disputes, unions | Book a Session | **None** |
| Litigation, Dispute Resolution & Arbitration | `/litigation-dispute-resolution-international-arbitration/` | 303 | Litigation, arbitration, mediation | Book a Session | **None** |
| Banking & Finance | `/banking-finance-law/` | 106 | Lending, project finance, securities, enforcement | Book a Session | **None** |
| Mining & Energy | `/mining-energy-law/` | 369 | Licensing, joint ventures, ESG | Book a Session | **None** |
| Real Estate, Conveyancing & Land | `/real-estate-conveyancing-land-law/` | 368 | Transfers, title, land disputes | Book a Session | **None** |

Service names also differ between places: "Corporate Debt Solutions" in menus, "Debt Solutions, Recovery & Asset Tracing" on Home.

### The duplicate debt-recovery pages

| | `/corporate-debt-recovery/` | `/debt-solutions-recovery-asset-tracing/` |
|---|---|---|
| Created | 4 March 2026 | 1 December 2025 |
| Length | 1,645 words | 109 words |
| Linked from | Main menu, footer, expertise index | Home services, footer (under the same "Corporate Debt Solutions" label) |
| Design | Custom landing page, unlike the rest of the site | Standard practice template |
| Content | Stats, risks, 6 services, process, jurisdictions, testimonials, FAQ | Short service description |
| Phone | `+254 797 899 003` | Footer numbers only |
| Title and description | **Same target and same meta description** | **Same target and same meta description** |
| Risk | Placeholder testimonials and unverified claims (see 04) | None notable |

**Recommendation:** merge, keeping the sound service descriptions and dropping the claims until the firm evidences them (see 06).

## Insights

**36 published posts, 2025-11-30 to 2026-10-14.** Every post shows the shared author "Waren Law", except that two name Ephraim Ndegwa in the text. Comments are closed. Word counts are for the post body. Two posts have no featured image. The six "Uncategorized" posts include four data protection articles with no matching practice area.

| Date | Title | URL | Author shown | Categories | Tags | Featured image (alt?) | Words | Topic |
|---|---|---|---|---|---|---|---|---|
| 2025-11-30 | Recovering Assets: Legal Strategies for Success | `/recovering-assets-legal-strategies-for-success-2/` | Waren Law | Debt Recovery | — | Maina-Murimi-Advocates-Company-Profile-V2-1. (alt) | 121 | General overview of legal routes to recovering assets |
| 2025-11-30 | How Medical Law Protects Healthcare Providers and Patients | `/how-medical-law-protects-healthcare-providers-and-…/` | Waren Law | Regulatory Services | Commercial, Debt, Health | photorealistic-lawyer-environment-1-scaled.w (no alt) | 116 | General overview of medical law for providers and patients |
| 2025-11-30 | The Importance of Legal Expertise in Financial Disputes | `/the-importance-of-legal-expertise-in-financial-dis…/` | Waren Law | Financial Services Regulatory | Commercial | 3.webp (alt) | 114 | General overview of advocates' role in financial disputes |
| 2025-12-10 | The Role of Corporate Lawyers in Navigating Complex Business Regulations | `/the-role-of-corporate-lawyers-in-navigating-comple…/` | Waren Law | Regulatory Services | — | law-book-gavel-scaled.webp (no alt) | 127 | General overview of corporate lawyers and regulation |
| 2025-12-18 | Waren Law Advocates LLP Strengthens China–Africa Legal Ties Through Strategic Pa | `/waren-law-advocates-llp-strengthens-china-africa-l…/` | Waren Law | Uncategorized | — | 640.webp (alt) | 266 | Firm news: Beijing cooperation signing, 27 November 2025 |
| 2026-01-28 | IS KENYA’S DATA PROTECTION REGIME REALLY WORKING? | `/is-kenyas-data-protection-regime-really-working/` | Waren Law | Uncategorized | — | Intro.jpeg (no alt) | 1092 | Assessment of how Kenya's data protection regime works in practice |
| 2026-01-28 | KNOWING YOUR RIGHTS AS A DATA SUBJECT IN KENYA | `/knowing-your-rights-as-a-data-subject-in-kenya/` | Waren Law | Uncategorized | — | 💡-6-Essential-AI-Skills-That-Will-Catapult-Y (no alt) | 1074 | Data subjects' rights in Kenya |
| 2026-01-28 | HOW KENYAN LENDERS CAN RECOVER SMART AND STAY COMPLIANT | `/how-kenyan-lenders-can-recover-smart-and-stay-comp…/` | Waren Law | Debt Recovery | — | What-Are-Challenges-in-Debt-Recovery-Litigat (no alt) | 808 | Data protection compliance in lenders' debt recovery |
| 2026-01-30 | WHEN CONSENT COMES WITH A PRICE TAG | `/when-consent-comes-with-a-price-tag/` | Waren Law | Uncategorized | — | Kenya-suspends-Worldcoin-project-over-data-s (no alt) | 1081 | Consent and biometric data collection in Kenya |
| 2026-02-02 | HOW KENYA’S COURTS ARE TAKING CONTROL OF BIG TECH’S DATA DECISIONS | `/how-kenyas-courts-are-taking-control-of-big-techs-…/` | Waren Law | Uncategorized | — | ¿Como-se-monitorearan-las-campanas_-Facebook (no alt) | 940 | Kenyan court litigation over big-tech data decisions |
| 2026-02-12 | WHY THE HIGH COURT HAS PULLED ROAD ACCIDENT CLAIMS OUT OF THE SMALL CLAIMS COURT | `/why-the-high-court-has-pulled-road-accident-claims…/` | Waren Law | Uncategorized | — | Cost-of-car-insurance-rises-by-42-despite-an (no alt) | 1382 | High Court ruling on road accident claims and the Small Claims Court |
| 2026-02-12 | KENYA: A SAFE HAVEN FOR FOREIGN INVESTMENT | `/kenya-a-safe-haven-for-foreign-investment/` | Waren Law | Investment and Business Law | — | arrows-pointing-to-kenya.png (no alt) | 1037 | Foreign investment protections and trends in Kenya |
| 2026-03-19 | Living in the U.S. but Own Property in Kenya? | `/living-in-the-u-s-but-own-property-in-kenya/` | Waren Law | Estate Planning | — | Waren_Webinar_Blog.png (alt) | 1711 | Succession mistakes for US-based Kenyan property owners |
| 2026-04-02 | Estate Planning in Kenya for the Diaspora | `/estate-planning-kenya-diaspora-wills-family-trusts/` | Waren Law | Estate Planning | — | Waren_Blog-2.png (alt) | 2563 | Wills and family trusts for the diaspora |
| 2026-04-13 | KENYA: WHERE RISK MEETS OPPORTUNITY | `/kenya-where-risk-meets-opportunity/` | Waren Law | Investment and Business Law | — | Ephraim_Newsletter.png (alt) | 1257 | Investor risk in Kenya, drawing on a US trade report |
| 2026-04-13 | Why Kenyans Abroad Are Afraid to Invest Back Home, And What to Do About It | `/why-kenyans-abroad-are-afraid-to-invest-back-home-…/` | Waren Law | Wealth Management | — | Janice-W_1_Newsletter.png (alt) | 2583 | Why the diaspora hesitates to invest at home |
| 2026-04-13 | What Foreign Investors Need to Know Before Entering the Kenyan Market | `/what-foreign-investors-need-to-know-before-enterin…/` | Waren Law | Investment and Business Law | — | Ephraim_2_Newsletter.png (alt) | 3071 | Legal guide to entering the Kenyan market |
| 2026-04-21 | Buying Property in Kenya from the U.S., U.K., or Europe | `/buying-property-in-kenya-from-the-us-uk-or-europe/` | Waren Law | Conveyancing and Commercial Services | — | Waren_Newsletter.jpg (alt) | 3089 | Checklist for buying Kenyan property from abroad |
| 2026-05-05 | Beyond the Boardroom: Reflections from WAREN Law’s Visit to China | `/beyond-the-boardroom-reflections-from-waren-laws-v…/` | Waren Law | Investment and Business Law, Mining and Energy Law | — | Waren_Blog.png (alt) | 1455 | First-person reflections on a visit to China |
| 2026-05-11 | Entering Kenya’s Mining Sector: What U.S. and European Investors Should Verify B | `/entering-kenyas-mining-sector-what-us-and-european…/` | Waren Law | Mining and Energy Law | — | Waren_Newsletter.png (alt) | 3723 | Checks for foreign investors entering Kenyan mining |
| 2026-05-17 | Kenyan Debt Recovery for Foreign Companies | `/kenyan-debt-recovery-for-foreign-companies/` | Waren Law | Debt Recovery | — | Waren_Newsletter.jpg (alt) | 3250 | Debt recovery guide for foreign creditors |
| 2026-05-25 | Investing in Kenya from the U.S., U.K., Canada, or Europe: What the Legal Proces | `/investing-in-kenya-from-the-us-uk-canada-or-europe/` | Waren Law | Wealth Management | — | Waren_Newsletter-1.png (alt) | 4183 | Diaspora investment legal process |
| 2026-06-01 | The Cost of Cheap Legal Structuring in a High-Value Kenya Investment | `/the-cost-of-cheap-legal-structuring-in-a-high-valu…/` | Waren Law | Investment and Business Law | — | Ephraim_2_Newsletter_7.png (alt) | 4050 | Risks of low-cost legal structuring in large investments |
| 2026-06-09 | How to Keep a Property Transaction Moving Without Taking on Legal Risk | `/how-to-keep-a-property-transaction-moving-without-…/` | Waren Law | Conveyancing and Commercial Services | — | Waren_Newsletter-2.jpg (alt) | 2481 | Keeping property transactions moving safely |
| 2026-06-12 | Case Summary: Third Party Complexities and the Preservation of Commercial Intere | `/case-summary-third-party-complexities-and-the-pres…/` | Waren Law | Conveyancing and Commercial Services | — | Waren_Newsletter-2-1.jpg (alt) | 684 | Case summary: statutory power of sale and third-party interests |
| 2026-06-15 | Wealth Protection for Kenyans Abroad: How Wills and Trusts Secure Your Kenyan Es | `/wealth-protection-for-kenyans-abroad-how-wills-and…/` | Waren Law | Wealth Management | — | Webinar_Newsletter.jpg (alt) | 3843 | Wills and trusts, based on the 9 June 2026 webinar |
| 2026-06-22 | Statutory Power of Sale in Kenya: What Kinyua v Absa Means for Commercial Borrow | `/statutory-power-of-sale-in-kenya/` | Waren Law | Commercial law, Conveyancing and Commercial Services, Dispute Resolution | — | Waren_Newsletter.png (alt) | 2576 | Kinyua v Absa ruling; states the firm acted for the Applicant |
| 2026-06-29 | Kenya Energy Projects. The First Legal Questions Foreign Sponsors Should Answer  | `/kenya-energy-projects/` | Waren Law | Mining and Energy Law | — | Copy-of-Copy-of-Waren_Newsletter.png (alt) | 3337 | Legal questions for foreign energy sponsors |
| 2026-07-06 | Why Foreign Lenders Need Kenyan Counsel Before a Default Becomes a Dispute | `/why-foreign-lenders-need-kenyan-counsel-before-a-d…/` | Waren Law | Debt Recovery | — | Waren_Newsletter.jpg (alt) | 2854 | Why foreign lenders need Kenyan counsel early |
| 2026-07-13 | How to Structure a Kenyan Property Purchase So You Do Not Create Problems for Ta | `/buying-property-in-kenya-without-future-legal-prob…/` | Waren Law | Wealth Management | — | Janice-W_1_Newsletter.png (alt) | 4308 | Structuring a purchase for tax, succession and control |
| 2026-09-07 | Regulatory Delays in Kenya: How Investors Can Protect Energy and Mining Projects | `/regulatory-delays-in-kenya/` | Waren Law | Mining and Energy Law | Energy Law, Investment, Kenya, Mining Law, Regulatory Delays | Mining-photography-Motheo-copper-mine-in-Bot (alt) | 1128 | Managing regulatory delays in energy and mining projects |
| 2026-09-17 | Debt Recovery is Not a One-Size-Fits-All: Why the Right Lawyer Can Help Preserve | `/debt-recovery-kenya/` | Waren Law | Debt Recovery | — | **none** | 1252 | Choosing counsel to preserve borrower relationships |
| 2026-09-23 | What International Investors Need to Understand About Contract Enforceability in | `/contract-enforceability-in-kenya/` | Waren Law | Investment and Business Law | Business Law, Contract Enforceability, Cross-Border Transactions, Investing in Kenya | **none** | 1211 | Contract enforceability for international investors |
| 2026-09-30 | When Speed Becomes a Commodity: The Hidden Fuel of Corruption in Kenya’s Land Re | `/warenlaw-com-land-registry-kenya-speed-corruption/` | Waren Law | Conveyancing and Commercial Services, Land Registry | — | ChatGPT-Image-Sep-30-2026-11_13_25-AM.png (alt) | 1209 | Land registry delays and corruption risk |
| 2026-10-01 | Conveyancing Lawyer in Kenya: 5 Essential Steps to Buying Property Safely | `/conveyancing-lawyer-in-kenya-buying-property-safel…/` | Waren Law | Conveyancing and Commercial Services | Conveyancing, Land Law, Property Purchase, Real Estate Kenya | Buying-Property-in-Kenya-–-Conveyancing-Lawy (alt) | 913 | Five steps to buying property safely |
| 2026-10-14 | Cross-Border Succession Planning: Navigating Succession Rules in Kenya, the UK,  | `/cross-border-succession-planning-kenya-uk-us/` | Waren Law | Estate Planning, Wealth Management | — | OCT-14-2026.jpg (alt) | 1591 | Succession rules across Kenya, the UK and the US |

**Observations**
- A clear shift: four generic posts of about 120 words at launch, then long-form diaspora and investor articles.
- Some recent posts appear search-optimised, and at least one has an image named after an AI tool.
- Category counts: Conveyancing and Commercial 6, Investment and Business 6, Uncategorized 6, Debt 5, Wealth 5, Mining and Energy 4, Estate Planning 3, Regulatory 2; Commercial, Dispute, Financial Services and Land Registry have 1 each. There are 19 tags, 3 of them empty.

### Webinars and events

| Webinar | URL | Date on page | Panel | Action | State |
|---|---|---|---|---|---|
| Trusts & Taxes: Protecting Wealth Across Borders | `/trusts-taxes-protecting-wealth-across-borders/` | "July 28 at 7 pm Pacific time" | Janice, Ephraim, Martin | "Register today" (Zoom, returned 404) | **Past, still asks for registration** |
| Wealth Protection Plan for Kenyans Abroad | `/wealth-protection-plan-for-kenyans-abroad-webinar/` | Held 9 June 2026, per a related article | Janice, Ephraim, Cecilia, Martin | Name and email for recording | Recording |
| Wealth Built Abroad, Protected in Kenya | `/wealth-built-abroad-protected-in-kenya-webinar/` | None shown | Ephraim, Cecilia, Martin | "WATCH IT NOW"; "Book your free consultation" | Recording |

All three use a full-width template with no site header or footer. Two carry testimonials. No events are listed elsewhere.

## Contact

| Item | Current |
|---|---|
| Form | First*, Last*, Phone (country picker), Email*, Message*; "Send Message". Posts by AJAX to WPForms #3812 on the same page; destination address not visible |
| Head office | Manga House, Suite No. 8, B2, Kiambere Road, Upper Hill, Nairobi. P.O. Box 54954-00200, City Square |
| Branch | Wilmur House, 3rd Floor, Room 308, Kenyatta Avenue, Nakuru |
| Joint office | 20th Floor, Building A, Zhongguancun Science and Technology Trade Center, Beijing |
| Map | Google embed of Nairobi at zoom 10, plus a Maps link in the footer. **No Nakuru map** |
| Phones | `+254 714 350 932`, `+254 719 278 594`; `+254 797 899 003` on the debt page. **The first number's link dials the second** |
| Email | `info@warenlaw.com` (not clickable on Contact) |
| WhatsApp | Joinchat widget to `254719278594` |
| Booking | "Book Now" to Microsoft Bookings |
| Socials | LinkedIn, Facebook, Instagram, YouTube |

## Client logos

14 logos, all on the home page in the "Brands" grid. Identification is from viewing the images, so the firm should confirm each one.

| # | File | Alt text | Identifiable? |
|---|---|---|---|
| 1 | `2025/12/download-2-150x150.png` | None | Yes: Kenya national coat of arms |
| 2 | `2025/12/download-4-150x150.jpeg` | None | **Partly:** county crest, motto "Our Heritage Our Wealth"; county not named |
| 3 | `2025/12/download-2-150x150.jpeg` | "Nairobi City County official logo" | Yes: Nairobi City County |
| 4 | `2025/12/download-1-150x150.png` | None | Yes: Murang'a County |
| 5 | `2025/12/download-150x135.jpeg` | None | Yes: KETEPA |
| 6 | `2025/12/download-3-150x150.png` | None | Yes: Britam |
| 7 | `2025/12/download-4.png` | None | Yes: Jubilee Insurance |
| 8 | `2025/12/download-3-150x150.jpeg` | None | **Partly:** crest with "Kimwe Kiyuaa" text; body not named |
| 9 | `2025/12/kebs-logo-png_seeklogo-280724-1.webp` | None | Yes: KEBS |
| 10 | `2025/12/download-6.jpeg` | None | Yes: ICEA Lion Group |
| 11 | `2025/12/download.png` | None | Yes: Honor |
| 12 | `2025/12/download-5.jpeg` | "Old Mutual official logo" | Yes: Old Mutual |
| 13 | `2025/12/download-1.webp` | "en.chint partner" | Yes: CHINT |
| 14 | `2025/12/Screenshot-2025-12-11-120209.webp` | None | **No:** blue globe mark, reads like "NFEC" |

Sizes vary (148–600 px source, about 150 px shown); several are low-resolution web downloads. Better files and permission are needed (see 04).

## Media

**279 library items:** 276 images (112 WebP, 77 PNG, 76 JPEG, 11 SVG), 1 video, 1 PDF, 1 ZIP. Total about 92 MB.

- **Alt text:** 190 of 276 images have none.
- **Poor file names:** 55 items use names like `WhatsApp-Image-…`, `download-…`, `Screenshot-…`, `ChatGPT-Image-…`, `Gemini_Generated_Image…`.
- **Largest:** `hero.mp4` (15.8 MB) and portrait PNGs up to 3.5 MB, several far larger than displayed.
- **Possibly unused:** 143 items weren't seen in crawled HTML. Some may be CSS backgrounds, so check against a WordPress export before dropping any.
- **Videos and embeds:** `hero.mp4` background only; no YouTube or other video embeds found in crawled pages. Google Maps embed on Contact.
- **Downloads:** `Employee-Resignation-Legal-Brochure-final-copy.pdf` is in the library but not linked from any crawled page. `toWEBP-1.zip` is a stray upload. Neither was opened.
- **Theme:** stock and AI images in articles, some with the firm's logo baked in.

### Full media list

Sorted by size. "Seen" means the file's name appeared in crawled HTML.

| File (under `/wp-content/uploads/`) | Type | Alt | Dimensions | KB | Seen in crawled HTML |
|---|---|---|---|---|---|
| `2026/01/hero.mp4` | mp4 | n | 1280×720 | 15814 | y |
| `2026/05/Janice-Wachuka_web.png` | png | y | 2047×2048 | 3417 | y |
| `2026/05/Ephraim-Ndegwa_2.png` | png | y | 2047×2048 | 2665 | y |
| `2026/05/Janice-Wachuka.png` | png | n | 2047×2048 | 2444 | y |
| `2026/05/Ephraim-Ndegwa_2-1.png` | png | y | 2047×2048 | 2363 | y |
| `2026/10/Buying-Property-in-Kenya-–-Conveyancing-Lawyer.png` | png | y | 1536×1024 | 2092 | y |
| `2026/09/ChatGPT-Image-Sep-30-2026-11_13_25-AM.png` | png | y | 1672×941 | 1791 | y |
| `2026/05/CECILIA-NJERI_upd_1.png` | png | y | 2047×2048 | 1775 | y |
| `2025/12/14088.webp` | webp | n | 2000×1000 | 1718 | n |
| `2025/12/2150794356.webp` | webp | n | 1334×2000 | 1661 | n |
| `2026/05/Ephraim-LinkedIn-profile-photo.png` | png | y | 2047×2048 | 1569 | y |
| `2026/03/Ephraim-Ndegwa_webinar.png` | png | y | 2047×2048 | 1554 | y |
| `2025/12/2147737962.webp` | webp | n | 2000×1333 | 1528 | n |
| `2026/03/Martin-Wachira_webinar.png` | png | y | 2047×2048 | 1521 | y |
| `2026/03/Banner-2-Banner-Landscape-scaled.png` | png | n | 2560×1280 | 1251 | y |
| `2026/03/Employee-Resignation-Legal-Brochure-final-copy.pdf` | pdf | n | — | 1182 | n |
| `2026/07/JW.png` | png | y | 1254×1254 | 1161 | y |
| `2026/07/32768.png` | png | y | 1200×1200 | 1147 | y |
| `2026/03/CECILIA-NJERI_webinar.png` | png | y | 2047×2048 | 1017 | y |
| `2026/03/boxking_hero_img_1.jpg` | jpeg | n | 1920×1080 | 1013 | n |
| `2026/06/Copy-of-Copy-of-Waren_Newsletter.png` | png | y | 1200×628 | 969 | y |
| `2026/08/ephraim-black-background.png` | png | n | 937×1312 | 891 | y |
| `2026/05/Waren_Newsletter-1.png` | png | y | 1200×628 | 891 | y |
| `2026/04/Ephraim_Newsletter.png` | png | y | 1200×628 | 887 | y |
| `2025/12/bird-s-eye-view-shanghai-scaled.webp` | webp | n | 2560×1705 | 856 | n |
| `2026/03/Unknown-2.png` | png | n | 1920×960 | 818 | n |
| `2026/05/Ephraim_2_Newsletter_7.png` | png | y | 1200×628 | 815 | y |
| `2025/12/48247.webp` | webp | n | 2000×1333 | 740 | n |
| `2025/12/beautiful-architecture-building-cityscape-macau-city-scaled.webp` | webp | n | 2560×1707 | 721 | n |
| `2026/03/Screenshot_20260317_190700-1.jpg` | jpeg | n | 1079×1316 | 701 | n |
| `2026/03/Screenshot_20260317_190700.jpg` | jpeg | y | 1079×1316 | 701 | n |
| `2025/12/aerial-drone-view-chisinau-downtown-panorama-view-multiple-buildings-roads-scaled.webp` | webp | n | 2560×1440 | 647 | n |
| `2025/11/MOK_5390-scaled-1.webp` | webp | n | 2048×2560 | 634 | n |
| `2026/03/Janice-video-screenshot.png` | png | n | 708×1218 | 630 | n |
| `2026/09/Gemini_Generated_Image_i5yspfi5yspfi5ys.jpg` | jpeg | y | 1376×768 | 618 | n |
| `2026/09/MOK_0138-scaled.jpg` | jpeg | y | 1707×2560 | 616 | y |
| `2026/05/Waren_Newsletter.jpg` | jpeg | y | 1200×628 | 611 | y |
| `2026/03/MARTIN-GITHINJI.jpg` | jpeg | y | 2047×2048 | 608 | n |
| `2026/02/0B3A9667-scaled.jpg` | jpeg | n | 1829×2560 | 583 | y |
| `2026/05/Waren_Blog.png` | png | y | 750×392 | 541 | y |
| `2026/08/Janice.png-scaled.jpg` | jpeg | n | 1707×2560 | 538 | y |
| `2025/12/Wachira-Two-scaled.webp` | webp | y | 1788×2560 | 508 | y |
| `2025/11/close-up-law-scale-scaled.jpg` | jpeg | n | 2560×1752 | 502 | n |
| `2026/09/pexels-mibernaa-28442180-scaled.jpg` | jpeg | y | 1706×2560 | 490 | n |
| `2026/08/nick-black-background-1.png` | png | n | 853×1280 | 489 | y |
| `2026/07/Janice-W_1_Newsletter.png` | png | y | 1200×628 | 483 | y |
| `2026/05/Cecilia-photo.png` | png | y | 800×800 | 420 | y |
| `2026/02/0B3A9650-scaled.jpg` | jpeg | n | 1829×2560 | 410 | y |
| `2025/12/Maina-Murimi-and-advocates-company-potrait-profile-3.pdf-2-2.jpg` | jpeg | n | 1150×1419 | 403 | n |
| `2025/12/Maina-Murimi-and-advocates-company-potrait-profile-3.pdf-2-1.jpg` | jpeg | n | 1150×1419 | 403 | n |
| `2026/02/109938-OOKLF4-34.jpg` | jpeg | n | 2000×2000 | 399 | n |
| `2025/11/MOK_5373-scaled-1.webp` | webp | y | 2048×2560 | 389 | n |
| `2026/03/boxking_cta_1.jpg` | jpeg | n | 820×550 | 365 | n |
| `2026/07/Janice-Team.jpg-1-scaled.jpeg` | jpeg | n | 2047×2560 | 364 | y |
| `2026/03/Kenya-flag.png` | png | y | 1024×1024 | 355 | y |
| `2025/11/MOK_5438-scaled-1.webp` | webp | n | 2048×2560 | 346 | n |
| `2025/11/MOK_5474-scaled-1.webp` | webp | n | 2048×2560 | 340 | n |
| `2025/11/MOK_5299-scaled-1.webp` | webp | n | 2560×2048 | 339 | n |
| `2025/11/MOK_5299-1-scaled-1.webp` | webp | n | 2560×2048 | 339 | n |
| `2025/12/ok-4.png` | png | n | 1280×720 | 336 | n |
| `2025/12/ok-2.png` | png | n | 1280×720 | 329 | n |
| `2026/03/webinar-cover.jpg` | jpeg | y | 1920×1080 | 328 | n |
| `2026/05/1X9A4937-1-scaled.jpg` | jpeg | n | 1707×2560 | 324 | n |
| `2026/05/1X9A4937-scaled.jpg` | jpeg | y | 1707×2560 | 324 | y |
| `2026/05/1X9A4953-scaled.jpg` | jpeg | y | 1707×2560 | 321 | y |
| `2025/11/MOK_5316-scaled-1.webp` | webp | n | 2048×2560 | 313 | n |
| `2026/05/Waren_Newsletter.png` | png | y | 1200×628 | 313 | y |
| `2026/02/0B3A9653-scaled.jpg` | jpeg | n | 1829×2560 | 310 | y |
| `2026/03/Waren_Webinar_Email_June.png` | png | n | 1200×400 | 305 | y |
| `2026/05/Waren_Webinar_Email_June.png` | png | y | 1200×400 | 305 | y |
| `2025/12/gavel-law-book-scaled.webp` | webp | n | 1792×2560 | 303 | n |
| `2025/12/Maina-Murimi-and-advocates-company-potrait-profile-3.pdf-2.jpg` | jpeg | n | 1150×1419 | 296 | n |
| `2026/03/boxking_cta_2.jpg` | jpeg | n | 525×601 | 296 | n |
| `2026/05/1X9A4957-scaled.jpg` | jpeg | y | 1707×2560 | 289 | n |
| `2026/05/DSC_8329.jpg` | jpeg | y | 1024×1536 | 281 | n |
| `2026/07/Ephraim-Team.jpg-1-scaled-e1784725237597.jpeg` | jpeg | n | 2048×2197 | 281 | y |
| `2026/03/Waren-Law_Youtube-Banner.png` | png | n | 2560×1440 | 273 | n |
| `2025/11/MOK_5534-scaled-1.webp` | webp | n | 2560×2048 | 270 | n |
| `2025/12/law-book-gavel-scaled.webp` | webp | n | 2560×1396 | 263 | y |
| `2026/03/USA-flag.png` | png | y | 1024×1024 | 259 | y |
| `2025/12/brown-wooden-textured-flooring-background-scaled.webp` | webp | n | 2560×1706 | 253 | n |
| `2025/12/ok.png` | png | n | 1280×720 | 252 | y |
| `2025/11/boy.png` | png | n | 509×627 | 252 | y |
| `2026/04/Janice-W_1_Newsletter.png` | png | y | 1200×628 | 240 | y |
| `2025/11/MOK_5511-scaled-1.webp` | webp | n | 2560×2048 | 232 | n |
| `2025/11/MOK_5448-scaled-1.webp` | webp | n | 2048×2560 | 226 | y |
| `2026/03/Barbra-Katasi.jpeg` | jpeg | n | 1024×1536 | 220 | y |
| `2025/11/MOK_5554-scaled-1.webp` | webp | n | 2560×1706 | 217 | n |
| `2025/11/MOK_5354-scaled-1.webp` | webp | n | 2560×1706 | 214 | n |
| `2026/05/Cecilia-photo-2.jpeg` | jpeg | y | 1228×1536 | 211 | y |
| `2025/11/Girl.png` | png | n | 504×627 | 197 | y |
| `2026/05/Cecilia-photo-1.jpeg` | jpeg | y | 1228×1536 | 191 | y |
| `2025/11/dark-businesswoman-shaking-hands-with-male-colleague-scaled.webp` | webp | n | 2560×1707 | 188 | n |
| `2025/11/MOK_5490-scaled-1.webp` | webp | n | 2560×2048 | 169 | n |
| `2025/11/Photo-scaled-1.webp` | webp | n | 2048×2560 | 167 | n |
| `2026/05/Ephraim-Newsletter.png` | png | y | 300×300 | 166 | n |
| `2025/12/14088-1.webp` | webp | n | 2000×1000 | 165 | n |
| `2026/07/32767.png` | png | n | 640×200 | 158 | n |
| `2025/11/Photo-2-scaled-1.webp` | webp | n | 2048×2560 | 157 | n |
| `2025/12/close-up-judge-gavel-with-its-striking-block-scaled.webp` | webp | n | 2560×2560 | 153 | n |
| `2025/11/MOK_5544-1229x1536-1.jpg` | jpeg | n | 1229×1536 | 152 | n |
| `2026/06/Waren_Newsletter.png` | png | y | 1200×628 | 151 | y |
| `2026/04/Ephraim_2_Newsletter.png` | png | y | 750×392 | 147 | y |
| `2025/11/MOK_5474-1229x1536-1.jpg` | jpeg | n | 1229×1536 | 143 | n |
| `2026/02/IMG_20260202_080806.jpg-e1770009119558.jpeg` | jpeg | n | 1600×1416 | 142 | n |
| `2025/12/photorealistic-lawyer-environment-scaled.webp` | webp | n | 2560×1707 | 130 | n |
| `2025/11/photorealistic-lawyer-environment-scaled.webp` | webp | y | 2560×1707 | 130 | n |
| `2025/11/nasneena.webp` | webp | n | 1786×2500 | 128 | n |
| `2025/11/front-view-blurry-lawyer-working-scaled.webp` | webp | n | 2560×1707 | 127 | n |
| `2025/12/25d232929a6255405efe5dc7fa4a8a86.webp` | webp | n | 736×736 | 124 | n |
| `2026/03/Screenshot-2026-07-06-at-12.52.47-PM.png` | png | y | 634×266 | 122 | n |
| `2025/12/fbfd5d23b6fb04af4f0f5fd0ebbf895b.webp` | webp | n | 1200×800 | 121 | n |
| `2025/12/Edgar.webp` | webp | y | 1200×1600 | 120 | n |
| `2026/03/Waren_Webinar_Email_.png` | png | y | 600×200 | 119 | y |
| `2025/11/Phyll-scaled-1.webp` | webp | n | 1700×2560 | 119 | n |
| `2025/11/photorealistic-lawyer-environment-1-scaled.webp` | webp | n | 2560×1707 | 119 | y |
| `2026/03/Waren_Webinar_Email.png` | png | n | 600×200 | 116 | y |
| `2026/03/Waren_Webinar_Email_RECORDING-1.png` | png | n | 600×200 | 115 | n |
| `2025/11/toWEBP-1.zip` | zip | n | — | 114 | n |
| `2025/12/close-up-law-hammer-scaled.webp` | webp | n | 2560×1463 | 114 | n |
| `2025/11/Golden-logo.png` | png | y | 1812×398 | 110 | y |
| `2026/04/Waren_Newsletter.jpg` | jpeg | y | 1200×628 | 108 | y |
| `2025/11/Yvonne-Ndombi.webp` | webp | n | 1116×1726 | 105 | n |
| `2025/12/WhatsApp-Image-2025-12-10-at-23.28.07_c6075abf.webp` | webp | n | 1600×1066 | 101 | y |
| `2026/05/WhatsApp-Image-2026-04-02-at-6.56.13-AM.jpeg` | jpeg | y | 853×1280 | 101 | y |
| `2025/12/WhatsApp-Image-2025-12-10-at-23.27.43_4441ab09.webp` | webp | n | 1280×853 | 98 | y |
| `2025/12/still-life-with-scales-justice-scaled.webp` | webp | n | 2560×1707 | 96 | n |
| `2026/05/WhatsApp-Image-2026-04-02-at-6.56.13-AM-1.jpeg` | jpeg | y | 853×1280 | 96 | y |
| `2026/01/Cybersecurity-Threats-Tips-Every-Organization-Should-Know.jpeg` | jpeg | n | 736×736 | 95 | n |
| `2025/12/2147737962-1.webp` | webp | n | 2000×1333 | 95 | n |
| `2025/12/Pic-Newsletter.png` | png | n | 395×478 | 92 | n |
| `2026/06/Webinar_Newsletter.jpg` | jpeg | y | 900×471 | 89 | y |
| `2025/12/WhatsApp-Image-2025-12-10-at-23.27.44_5f6ce604.webp` | webp | n | 1890×1280 | 89 | y |
| `2025/12/2150794356-1.webp` | webp | n | 1334×2000 | 88 | n |
| `2025/12/WhatsApp-Image-2025-12-10-at-23.27.42_06c4f98e.webp` | webp | n | 1858×1280 | 87 | y |
| `2026/06/Waren_Newsletter-2-1.jpg` | jpeg | y | 1200×628 | 87 | y |
| `2025/12/WhatsApp-Image-2025-12-10-at-23.28.07_33a6aca0.webp` | webp | n | 1600×1068 | 86 | y |
| `2025/11/Maina-Murimi-and-advocates-company-potrait-profile-3.pdf-5.webp` | webp | n | 1150×1419 | 85 | y |
| `2025/12/WhatsApp-Image-2025-12-10-at-23.28.07_a5a32adc.webp` | webp | n | 1599×1066 | 84 | y |
| `2025/12/640-2.webp` | webp | y | 1080×720 | 82 | y |
| `2026/02/Cost-of-car-insurance-rises-by-42-despite-an-overall-reduction-in-number-of-claims.jpeg` | jpeg | n | 736×480 | 80 | y |
| `2025/12/judges-gavel-book-wooden-table-law-justice-concept-background-scaled.webp` | webp | n | 2560×1707 | 79 | n |
| `2026/03/Waren-Law_Email-header.png` | png | n | 600×200 | 76 | n |
| `2025/12/WhatsApp-Image-2025-12-10-at-23.28.07_093093bc.webp` | webp | n | 1600×1066 | 75 | y |
| `2025/11/Maina-Murimi-and-advocates-company-potrait-profile-3.pdf-12.webp` | webp | n | 1150×1419 | 71 | n |
| `2026/04/Waren_Blog-2.png` | png | y | 750×392 | 70 | y |
| `2025/11/Cecilia-Njeri.webp` | webp | y | 982×1280 | 68 | y |
| `2026/10/OCT-14-2026.jpg` | jpeg | y | 624×351 | 67 | y |
| `2025/12/48247-1.webp` | webp | n | 2000×1333 | 66 | n |
| `2026/03/Waren_Webinar_Blog.png` | png | y | 750×392 | 65 | y |
| `2025/12/20240229093031832.webp` | webp | y | 798×305 | 64 | n |
| `2025/11/Maina-Murimi-and-advocates-company-potrait-profile-3.pdf-2.webp` | webp | n | 1150×1419 | 63 | n |
| `2025/12/WhatsApp-Image-2025-12-10-at-23.27.43_a75988ec.webp` | webp | n | 1280×853 | 62 | y |
| `2025/11/Maina-Murimi-and-advocates-company-potrait-profile-3.pdf-6.webp` | webp | n | 1150×1419 | 62 | n |
| `2025/11/4811930_54102-scaled.webp` | webp | n | 2533×2560 | 62 | n |
| `2025/12/WhatsApp-Image-2025-12-10-at-23.27.43_c0c2738e.webp` | webp | n | 1280×853 | 62 | y |
| `2026/07/law-showcase-2-cover.jpg` | jpeg | n | 1530×1020 | 62 | n |
| `2025/11/WhatsApp-Image-2025-08-26-at-10.51.26.webp` | webp | n | 1062×1600 | 58 | n |
| `2025/11/Maina-Murimi-and-advocates-company-potrait-profile-3.pdf-13.webp` | webp | n | 1150×1419 | 58 | y |
| `2026/03/WhatsApp-Image-2026-10-02-at-8.37.40-AM.jpeg` | jpeg | n | 1059×1485 | 57 | y |
| `2026/06/Waren_Newsletter-2.jpg` | jpeg | y | 900×471 | 54 | y |
| `2026/07/law-showcase-2-link-image-1.jpg` | jpeg | n | 1555×1037 | 54 | n |
| `2025/12/640-3.webp` | webp | y | 1080×720 | 53 | y |
| `2025/12/WhatsApp-Image-2025-12-10-at-15.06.53.webp` | webp | n | 1280×853 | 52 | y |
| `2025/11/Maina-Murimi-Advocates-Company-Profile-V2-1.pdf-1-1.pdf-35.webp` | webp | y | 653×436 | 51 | y |
| `2026/07/law-showcase-2-link-image-2.jpg` | jpeg | n | 1000×712 | 51 | n |
| `2025/11/WhatsApp-Image-2025-02-03-at-12.53.49-PM.webp` | webp | n | 1024×1280 | 51 | n |
| `2025/12/WhatsApp-Image-2025-12-10-at-23.27.44_6d5d2b00.webp` | webp | n | 1280×853 | 50 | y |
| `2025/11/Advocates-1.png` | png | n | 1975×410 | 49 | n |
| `2025/11/Advocates.png` | png | y | 1975×410 | 49 | y |
| `2026/02/titus.jpeg` | jpeg | n | 740×1024 | 49 | n |
| `2025/12/640-4.webp` | webp | y | 1080×720 | 48 | y |
| `2026/09/Mining-photography-Motheo-copper-mine-in-Botswana-big-CAT-mining-truck-hauling-copper.jpg` | jpeg | y | 736×490 | 47 | y |
| `2025/11/Advocates-2.png` | png | n | 1975×410 | 47 | n |
| `2025/12/AI-ICT-the-Law.webp` | webp | n | 1080×1080 | 46 | n |
| `2025/12/640.webp` | webp | y | 1080×744 | 45 | y |
| `2025/12/employement.webp` | webp | n | 736×981 | 45 | n |
| `2025/11/WhatsApp-Image-2025-06-19-at-09.32.18.webp` | webp | n | 925×1280 | 44 | n |
| `2025/11/Advocates-1.webp` | webp | n | 1975×410 | 44 | n |
| `2026/01/Kenya-suspends-Worldcoin-project-over-data-safety-concerns-best-today-news.jpeg` | jpeg | n | 735×386 | 43 | y |
| `2025/12/640-1.webp` | webp | y | 1080×720 | 42 | y |
| `2025/11/WhatsApp-Image-2025-08-26-at-11.09.32-1.webp` | webp | n | 1062×1600 | 42 | n |
| `2025/11/Maina-Murimi-and-advocates-company-potrait-profile-3.pdf-10.webp` | webp | n | 1150×1419 | 41 | n |
| `2025/12/fd36098f9c95d832c7b8fb55b6d6639b.webp` | webp | n | 768×512 | 41 | n |
| `2025/11/Maina-Murimi-and-advocates-company-potrait-profile-3.pdf-7.webp` | webp | n | 1150×1419 | 38 | n |
| `2025/12/Tax.webp` | webp | y | 735×928 | 38 | y |
| `2025/11/Advocates.webp` | webp | y | 1975×410 | 38 | y |
| `2025/11/Golden-logo-icon.png` | png | n | 328×322 | 38 | n |
| `2026/03/Waren_Webinar_Email_RECORDING.png` | png | n | 600×200 | 38 | n |
| `2025/11/Maina-Murimi-and-advocates-company-potrait-profile-3.pdf-8.webp` | webp | n | 1150×1419 | 37 | n |
| `2025/11/Maina-Murimi-and-advocates-company-potrait-profile-3.pdf-4.webp` | webp | n | 1150×1419 | 36 | n |
| `2026/09/Blog-23-September.jpg` | jpeg | y | 624×351 | 36 | y |
| `2026/01/WhatsApp-Image-2026-01-14-at-23.02.39-1.jpeg` | jpeg | n | 323×500 | 34 | n |
| `2026/01/WhatsApp-Image-2026-01-14-at-23.02.39.jpeg` | jpeg | n | 323×500 | 34 | n |
| `2026/01/WhatsApp-Image-2026-01-14-at-22.46.26.jpeg` | jpeg | n | 324×478 | 34 | y |
| `2025/11/WhatsApp-Image-2025-08-26-at-11.09.32.webp` | webp | n | 1062×1600 | 33 | n |
| `2025/11/Maina-Murimi-and-advocates-company-potrait-profile-3.pdf-9.webp` | webp | n | 1150×1419 | 33 | n |
| `2025/11/cropped-Advocates.webp` | webp | y | 1974×409 | 33 | y |
| `2025/11/Advocates-2.webp` | webp | n | 1975×410 | 32 | n |
| `2025/11/WhatsApp-Image-2025-08-26-at-11.09.32-2.webp` | webp | n | 712×1072 | 32 | n |
| `2026/01/Intro.jpeg` | jpeg | n | 612×350 | 32 | y |
| `2025/12/Cert-1.webp` | webp | n | 900×1187 | 32 | y |
| `2025/12/7834617250f5b742fe4f48fc7946ea1a.webp` | webp | n | 735×490 | 31 | n |
| `2025/11/Golden-logo-BRIGHT-ICON.png` | png | n | 328×322 | 30 | y |
| `2026/01/WhatsApp-Image-2026-01-14-at-22.52.00.jpeg` | jpeg | n | 323×521 | 30 | y |
| `2025/11/Maina-Murimi-Advocates-Company-Profile-V2-1.pdf-1-1.pdf-31.webp` | webp | y | 653×436 | 29 | n |
| `2025/12/Cert-2.webp` | webp | n | 900×1187 | 29 | y |
| `2025/12/57a75bd190342f2a999318f4e7620bf6.webp` | webp | n | 735×490 | 28 | n |
| `2026/01/What-Are-Challenges-in-Debt-Recovery-Litigation-Procedures-for-Enterprise_.jpeg` | jpeg | n | 735×427 | 28 | y |
| `2025/12/Bijing-joint-office.webp` | webp | n | 856×655 | 26 | y |
| `2025/11/litigation.png` | png | n | 512×512 | 25 | y |
| `2025/11/Maina-Murimi-Advocates-Company-Profile-V2-1.pdf-1-1.pdf-26.webp` | webp | y | 653×436 | 24 | n |
| `2025/11/property-law.png` | png | n | 512×512 | 24 | n |
| `2025/12/afa262866d4eb4faac5243d2c2695893.webp` | webp | n | 678×452 | 24 | n |
| `2025/11/cropped-Advocates.png` | png | y | 1973×409 | 23 | y |
| `2026/03/YouTube-Home_thumbnail.jpg` | jpeg | y | 800×450 | 22 | n |
| `2026/03/Waren_Webinar_Email_June-9.jpg` | jpeg | n | 450×150 | 22 | n |
| `2025/12/Florence.webp` | webp | n | 1000×982 | 22 | y |
| `2025/12/Middletown.webp` | webp | n | 700×350 | 21 | n |
| `2025/12/Commercial-law.webp` | webp | n | 735×490 | 21 | n |
| `2026/01/💡-6-Essential-AI-Skills-That-Will-Catapult-Your-Career.jpeg` | jpeg | n | 640×430 | 20 | y |
| `2025/11/Maina-Murimi-Advocates-Company-Profile-V2-1.pdf-1-1.pdf-32.webp` | webp | y | 653×436 | 19 | n |
| `2026/04/Janice-W_1_Newsletter.jpg` | jpeg | y | 750×392 | 19 | y |
| `2025/11/3.webp` | webp | y | 750×500 | 18 | y |
| `2025/11/Maina-Murimi-Advocates-Company-Profile-V2-1.pdf-1-1.pdf-30.webp` | webp | y | 653×436 | 18 | n |
| `2026/05/Waren_Webinar_Email_.jpg` | jpeg | n | 375×125 | 18 | y |
| `2025/12/download-2.png` | png | n | 231×218 | 18 | y |
| `2025/11/gavel.png` | png | n | 512×512 | 18 | y |
| `2025/11/MOK_5544-scaled-removebg-preview.webp` | webp | n | 447×559 | 17 | n |
| `2026/02/¿Como-se-monitorearan-las-campanas_-Facebook-Analytic-dejara-de-funcionar.jpeg` | jpeg | n | 736×414 | 16 | y |
| `2025/11/data-protection.png` | png | n | 512×512 | 16 | y |
| `2025/12/kebs-logo-png_seeklogo-280724-1.webp` | webp | n | 600×600 | 16 | y |
| `2025/11/auction.png` | png | n | 512×512 | 13 | y |
| `2025/11/Maina-Murimi-Advocates-Company-Profile-V2-1.pdf-1-1.pdf-24.webp` | webp | y | 653×436 | 13 | y |
| `2025/12/file-protection.png` | png | n | 512×512 | 13 | n |
| `2026/02/arrows-pointing-to-kenya.png` | png | n | 382×229 | 13 | y |
| `2026/02/road-accident.jpeg` | jpeg | n | 300×168 | 13 | y |
| `2025/12/download-2.jpeg` | jpeg | y | 224×225 | 12 | y |
| `2025/11/Advocates-icon.png` | png | n | 336×330 | 12 | n |
| `2025/12/hammer.png` | png | n | 256×256 | 12 | n |
| `2025/12/download-4.jpeg` | jpeg | n | 225×224 | 11 | y |
| `2025/12/litigation.png` | png | n | 256×256 | 11 | y |
| `2025/12/WhatsApp-1.webp` | webp | y | 1000×1000 | 11 | n |
| `2025/12/download-3.jpeg` | jpeg | n | 224×224 | 10 | y |
| `2025/12/WhatsApp.webp` | webp | y | 950×783 | 9 | y |
| `2026/01/7-Top-Tips-to-Find-the-Best-Debt-Settlement-Company.jpeg` | jpeg | n | 300×300 | 9 | n |
| `2025/11/justice-scale.png` | png | n | 512×512 | 9 | n |
| `2025/12/gavel.png` | png | n | 256×256 | 8 | y |
| `2025/12/download-1.png` | png | n | 190×177 | 8 | y |
| `2026/03/1920x844.jpg` | jpeg | n | 1920×844 | 6 | n |
| `2025/12/logo.webp` | webp | y | 319×56 | 6 | y |
| `2025/12/download.jpeg` | jpeg | n | 246×135 | 6 | y |
| `2025/12/download-6.jpeg` | jpeg | n | 225×135 | 6 | y |
| `2026/03/placeholder-326.png` | png | n | 1200×800 | 5 | n |
| `2026/03/placeholder-328.png` | png | n | 1200×800 | 4 | n |
| `2026/03/placeholder-327.png` | png | n | 1200×800 | 4 | n |
| `2025/12/download-3.png` | png | n | 225×225 | 4 | y |
| `2026/03/fruit.svg` | svg+xml | n | 74×67 | 3 | n |
| `2026/05/logo-1.svg` | svg+xml | n | 52×23 | 3 | n |
| `2026/05/logo-1-1.svg` | svg+xml | n | 52×23 | 3 | n |
| `2025/12/download-1.webp` | webp | y | 196×148 | 3 | y |
| `2025/12/download.webp` | webp | y | 300×168 | 3 | y |
| `2025/12/download-5.jpeg` | jpeg | y | 225×135 | 3 | y |
| `2026/03/Image_Placeholder-13122021.jpg` | jpeg | n | 683×600 | 3 | n |
| `2026/05/sinagle-post-cta-img.jpg` | jpeg | n | 737×473 | 2 | n |
| `2025/12/Screenshot-2025-12-11-120209.webp` | webp | n | 164×162 | 2 | y |
| `2025/12/download-4.png` | png | n | 148×148 | 2 | y |
| `2025/12/download.png` | png | n | 255×148 | 2 | y |
| `2026/05/Img-About-3.jpg` | jpeg | n | 572×491 | 2 | n |
| `2026/03/star.svg` | svg+xml | n | 71×70 | 2 | y |
| `2026/03/heart.svg` | svg+xml | n | 56×56 | 2 | y |
| `2026/03/gym.svg` | svg+xml | n | 77×53 | 1 | n |
| `2026/05/Place-holder-about-4.jpg` | jpeg | n | 345×418 | 1 | n |
| `2026/05/Instagram_Fill-1.svg` | svg+xml | n | 27×26 | 1 | n |
| `2026/03/testiminials-pic-light.jpg` | jpeg | n | 91×91 | 1 | n |
| `2026/03/Icon-Services-Details-Orange.svg` | svg+xml | n | 43×43 | 0 | n |
| `2026/03/Icon-Services-Details-Pink.svg` | svg+xml | n | 43×43 | 0 | n |
| `2026/03/Icon-08-Law-firm.svg` | svg+xml | n | 43×45 | 0 | n |
| `2026/03/Icon-09-Law-firm.svg` | svg+xml | n | 43×6 | 0 | n |
