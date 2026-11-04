# Page map — every header item, its pages, and their sections

Order of work follows the header. Each item: **design → lock → spec + brief → build → polish → sign-off**, then the next item.
Shared on every page: header (over the page hero image), footer, cookie consent, WhatsApp button. Inner pages use a **page hero**: the Nairobi image band (shorter than Home), breadcrumb, page title, one-line intro.

Status key: ⬜ not started · 🎨 designing · 🔒 locked · 🛠 building · ✅ signed off

---

## 0. Home 🔒🛠
| Page | URL | Sections |
|---|---|---|
| Home | `/` | Hero (image + 3 cards) · Welcome · Areas of Expertise (8 cards) · Meet Our Partners · Latest insights · Recognition · CTA · Footer |

## 1. About 🎨
| Page | URL | Sections |
|---|---|---|
| About Us | `/about-us/` | Page hero · Our story · Film (video, coming soon) · Mission & vision · Why clients choose us (4 points) + values · Recognition · Leadership (partners) · International partners teaser · CTA |
| Our Partners | `/our-partners/` | Page hero · Intro · Partner firms (3 rows) · Beijing joint office · Signing events + photo gallery · CTA |

## 2. Practice Areas ⬜
| Page | URL | Sections |
|---|---|---|
| Practice areas index | `/area-of-expertise/` | Page hero · 8 practice rows/cards · "Not sure where your matter fits?" help band · CTA |
| Practice area (template ×8) | `/<practice-slug>/` (current URLs kept) | Page hero · Overview · How we help (services list) · Advocates for this area · FAQs · Related insights · Consultation CTA |

## 3. Our People ⬜
| Page | URL | Sections |
|---|---|---|
| Our People | `/our-team/` | Page hero · Filter by practice area · Partners · Advocates · Consultants · Staff · CTA |
| Filtered view | `/our-team/?practiceArea=…` | Same page, filtered (shareable link) |
| Advocate profile (template) | `/our-team/<slug>/` | Profile hero (portrait, name, role, contacts, book) · Biography · Experience · Education & admissions · Practice areas · Insights by this advocate · Related people · CTA |

## 4. Insights ⬜
| Page | URL | Sections |
|---|---|---|
| Insights listing | `/insights/` (+ `/insights/page/n/`) | Page hero · Featured article · Category filter · Article grid · Pagination · Newsletter band |
| Category page | `/category/<slug>/` | As listing, filtered |
| Article (template) | `/<article-slug>/` (current URLs kept) | Article header (category, title, author, date) · Featured image · Body · Author box · Related practice areas · Related articles · Newsletter band |
| Webinars index | `/insights/webinars/` | Page hero · Upcoming · Recordings · Past |
| Webinar (template) | `/<webinar-slug>/` | Webinar hero (status, date) · Overview · What you'll learn · Speakers · FAQs · Register / request recording form |

## 5. Contact ⬜
| Page | URL | Sections |
|---|---|---|
| Contact Us | `/contact-us/` | Page hero · Contact form + direct contacts · Offices (Nairobi, Nakuru, Beijing) with click-to-load maps |
| Consultation request | `/book-a-consultation/` | Page hero · Consultation form (replaces Microsoft Bookings) · What happens next · FAQs |

## 6. Remaining ⬜
| Page | URL | Sections |
|---|---|---|
| Search results | `/search/?q=` | Search box · Results grouped (practice areas, people, insights) |
| 404 | — | Message · search · key links |
| Privacy Policy · Terms · Cookie Policy | `/privacy-policy/` · `/terms/` · `/cookie-policy/` | Page hero (compact) · Text · Last updated |

## 7. Release ⬜
URL check (101 old URLs) · SEO · production build · QA · tag v1.0.0.

---

## Forms (all native, all with source tracking — decision 0017)
| Form | Where | Fields |
|---|---|---|
| Newsletter | Footer (every page), Insights | Email · How did you hear about us? (optional) |
| Contact | Contact Us | Name · Email · Phone (optional) · Country · Message · How did you hear about us? (optional) |
| Consultation request | Book a consultation | Name · Email · Phone · Country · Practice area · I am a (business / individual / Kenyan abroad) · Preferred meeting (Nairobi / Nakuru / video call) · Preferred dates · Matter summary · How did you hear about us? (optional) |
| Webinar recording | Webinar pages | Name · Email · How did you hear about us? (optional) |
