# 04: Compliance, security and trust

**Date:** 3 November 2026
**Sources:** public response headers and TLS certificate; page source; `dig` and `whois`; public web searches; the title of the Advocates (Marketing and Advertising) Rules on Kenya Law.
**Could not check:** whether domain auto-renew is on; the registrant's identity; DKIM (selector unknown); the firm's ODPC registration status; plugin versions against known vulnerabilities (out of scope); what the firm's systems do with form data.

> **This file flags items for the firm to confirm. It is not legal advice and reaches no legal conclusions.** Every item needs review by an advocate at the firm.

## Urgent: domain expiry

**`warenlaw.com` expires on 29 November 2026, which is 26 days after this audit.** The registry record shows it was created on 29 November 2025 and has not been updated since. Auto-renew status cannot be seen publicly. If it lapses, the website and all `@warenlaw.com` email are at risk. **Someone at the firm should confirm renewal now, independently of this project.**

## Domain and email

| Item | Finding |
|---|---|
| Registrar | **Hostinger** (`HOSTINGER operations, UAB`). `docs/DIRECTION.md` assumes Namecheap "likely"; that needs correcting |
| Created / expires | 29 Nov 2025 / **29 Nov 2026** |
| Status | `clientTransferProhibited`; DNSSEC unsigned |
| Nameservers | `ns1.dns-parking.com`, `ns2.dns-parking.com` (Hostinger), so DNS is managed at Hostinger |
| A / AAAA | `88.222.223.206`, `5.252.75.48`; two IPv6 addresses (Hostinger CDN) |
| www | CNAME to `www.warenlaw.com.cdn.hstgr.net` |
| `api.warenlaw.com` | Not yet in DNS |
| Mail provider (MX) | **Google** (`ASPMX.L.GOOGLE.com` and alternates) |
| Microsoft | `MS=ms32625013` TXT record, and Microsoft Bookings on an `@warenlaw.com` address |
| SPF | `v=spf1 include:_spf.mail.hostinger.com ~all` |
| DMARC | Present, `p=none`; report address is written `mailto: webinar@warenlaw.com` with a stray space |
| DKIM | No record at the common selectors tried; the true selector is unknown |

**Check with the firm's mail administrator.** SPF authorises only Hostinger mail, while MX points to Google and Microsoft is also in use. Mail sent through Google or Microsoft may not pass SPF, and that can harm delivery. The stray space may also stop DMARC reports arriving. Do not change these without the mail administrator, and do not remove any record at launch.

**The firm must hand over at launch:** access to the Hostinger account (or someone able to change A/AAAA and www records on request), a full export of current DNS records, confirmation of what uses each mail record, and access to Search Console, Bing Webmaster Tools, Google Tag Manager, Google Analytics, Meta and the booking accounts.

## Security (public responses only)

No scanning, login attempts or vulnerability testing were carried out.

| Item | Finding |
|---|---|
| HTTPS certificate | Let's Encrypt (YE1), valid 25 Sep to 24 Dec 2026; covers apex and www |
| HSTS | **Missing** |
| Content-Security-Policy | Only `upgrade-insecure-requests` |
| X-Frame-Options | **Missing** |
| X-Content-Type-Options | **Missing** |
| Referrer-Policy | **Missing** |
| Exposed versions | WordPress 6.9.11, Elementor 4.3.5, Site Kit 1.187.0 (generator tags); PHP 8.2.35 (`X-Powered-By`) |
| Login URL | `/wp-login.php` is public at the default address (200); `/wp-admin/` redirects to it |
| XML-RPC | Advertised in page source (`EditURI`); the endpoint itself was not requested |
| User enumeration | **Exposed.** `/wp-json/wp/v2/users` returned one account. Usernames were not saved or recorded here, and author slugs are redacted throughout this audit |
| REST namespaces | Publicly lists installed plugins, including staging (`wpstg`) and `mcp` |
| Media library | Holds a `.zip` (`toWEBP-1.zip`) and an unlinked PDF brochure in public uploads. Neither was opened |

**For the rebuild:** set these headers in Nginx from the start, hide framework versions, keep `/admin` out of indexes, and keep the current WordPress protected until it is decommissioned.

## Privacy and data protection

**Flag for the firm:** check each item against Kenya's Data Protection Act, 2019.

| Item | What is on the site |
|---|---|
| Privacy policy | Exists at `/privacy-policy/` (published 24 July 2026), about 145 words. **No page on the site links to it**: it is reachable only by its URL or the sitemap |
| Policy contents | Covers data collected from webinars and forms, uses, no selling, and a contact email. It does not visibly mention cookies, named trackers, third-party processors (Google, Meta, Microsoft, Zoom), retention, data subject rights, transfers abroad or a last-updated date |
| Cookie policy | **Missing** |
| Terms or legal disclaimer | **Missing** as pages. About 10 pages contain disclaimer-like wording, inconsistently |
| Cookie consent | **No banner.** Tag Manager, the Google tag, Meta Pixel and Jetpack Stats load immediately on all pages |
| Forms | Contact, newsletter and webinar forms show no privacy notice, consent wording or policy link |
| Sensitive enquiries | Free-text legal enquiries go through a form and WhatsApp ("confidential inquiry"). Destination and retention are not visible |
| International transfers | Visitor data reaches US-based services; webinar leads reach MailPoet and Zoom |
| Newsletter list | MailPoet holds subscribers. Moving or deleting that list involves personal data |

**To confirm:** whether the firm is registered with the Office of the Data Protection Commissioner; who its data protection contact is; the lawful basis for advertising trackers; consent for marketing email; retention periods. One of the firm's own articles covers data subjects' rights, so gaps here may be noticed.

## Professional rules: items for the firm to confirm

The firm should check these against the Law Society of Kenya's requirements and the **Advocates (Marketing and Advertising) Rules** (Legal Notice 42 of 2014) and any later amendments. This audit did not assess compliance.

| Item | Where | What to confirm |
|---|---|---|
| **Testimonials with placeholders:** three five-star quotes attributed to `[Client Name]`, `[Financial Institution]`, `[Investment Company]`, `[International Firm]` | `/corporate-debt-recovery/` | **Whether these are genuine at all.** They look like template text. Recommend removing them immediately rather than at launch |
| **Result and scale claims:** "98% Recovery Rate", "500+ Clients Served", "20+ Jurisdictions", "15+ Years", "Rated 5.0" | `/corporate-debt-recovery/` | Evidence for each figure, and whether results claims are allowed |
| Service promises: "Same-Day Response", "No Up-Front Cost", free assessment; "Book your free consultation" | Debt page; Wealth Built Abroad webinar | Whether accurate and allowed, including fee rules |
| "Attorney-client privilege from first contact" | Debt page | Whether this is correct for Kenya; the term is a US one |
| "Aggressive" tactics wording, "your money belongs to you" | Debt page | Tone and dignity requirements |
| Comparative wording: "leading corporate lawyers in Kenya", "premier legal solutions", "Recognized to be the best" | Corporate, Mining, Real Estate, Wealth, About | Whether allowed |
| Client logos: 14 logos titled "Some of the Brands We've Worked with" | Home | Client consent and confidentiality; whether listing clients is allowed |
| Use of the **national coat of arms** and county crests among those logos | Home | Whether use is permitted, and any implied endorsement |
| Named-person testimonials (first name and US city), star ratings | Webinar pages | Client consent; genuineness |
| Advocate testimonials ("Kind Words", "Some of … clients") and specific matters | Ephraim and Cecilia profiles | Same, and client identifiability |
| Naming a client matter: "acted for the Applicant" | `/statutory-power-of-sale-in-kenya/` and case summary | Client consent |
| Awards and rankings | About, Janice's profile | Permission and whether award marketing is allowed |
| Paid social advertising and retargeting | Meta Pixel site-wide | Whether this form of marketing is allowed |
| Legal guidance in articles, including tax rates and time estimates | Posts; debt FAQ | Accuracy and currency. Marked **NEEDS ADVOCATE REVIEW** for migration |
| "Partner" titles and joint offices | Team, Partners, Contact | That titles, and any cross-border practice wording, are accurate and allowed |

## Trust signals

| Signal | State |
|---|---|
| LSK membership | Stated only on two profiles (Ephraim, Cecilia). Not on firm-level pages |
| Advocate admissions | "Advocate of the High Court" on some bios and 2 of 3 profiles; missing for most of the team |
| Awards | Legal Insider 2025 "Litigation and Dispute Resolution Firm of the Year, Nairobi" (one award shown in two colourways on About); Nairobi Legal Awards "Top Litigation Practitioner" and The Lawyer Africa "Next Top Statespersons…" (Janice's profile) |
| Testimonials | Webinar pages and two profiles (see above) |
| Case highlights | "Representative experience" on two profiles; one case article |
| Firm registration details | **Missing** (no registration number; "LLP" only) |
| Founding date and history | **Missing.** History is undated. "15 Years" appears only on the debt page |
| Office photos | Only a Beijing joint-office plaque; event photos on Partners. No Nairobi or Nakuru office photos |
| Team portraits | Strong: 20 professional-looking portraits, though styles vary |
| International partners | Strong: Jingping, Matrix, Jointide, with links |

## Unverified, for the firm to confirm

- **Former name.** Links and file names use "Maina Murimi" (for example, `maina-murimi-advocates` and `Maina-Murimi-and-advocates-company-potrait-profile…`). That LinkedIn URL redirects to the WAREN page, which suggests a rename, but public searches found nothing confirming it. Knowing this matters for SEO and for any old domain that should redirect.
- **Google Business listing.** Searches found no listing. It may exist; this needs the firm's confirmation.
- **Ruiru branch.** Phylis Njane's card reads "Partner Ruiru Branch", but Contact and footer list only Nairobi and Nakuru, plus a Beijing joint office.
