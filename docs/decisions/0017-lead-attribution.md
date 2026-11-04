# 0017: Lead source tracking (where every client came from)

**Date:** 4 November 2026
**Status:** Accepted (simplified version approved by the owner)

## Problem
The firm cannot tell where clients come from (newsletter, Google, LinkedIn, word of mouth) or which country they are in.

## Decision
Every enquiry and subscriber records, for the current visit only (no tracking cookies):

| Field | Meaning | How |
|---|---|---|
| `form` | Which form was used | Set by the form: contact, consultation, newsletter, webinar |
| `page` | Page the form was filled on | Automatic |
| `source` | Where they came from | `utm_source` if present, else referrer host (e.g. google.com), else `direct` |
| `campaign` | Newsletter issue, post or ad | `utm_campaign` if present |
| `channel` | Grouped source | Derived: Newsletter, Search, Social, WhatsApp, Referral, Direct, Event/QR |
| `heardAbout` | What the person says | Optional dropdown: Google · Social media · Newsletter · Webinar · Recommended by someone · Existing client · Other |
| `country` | Country they live in | Dropdown on contact and consultation forms only (not newsletter) |

Rules:
1. Referrers stored as host names only, never full URLs.
2. Newsletter links are tagged automatically (`source=newsletter`, `campaign=<issue>`).
3. Admin link builder (V2): page + channel → tagged link + QR code.
4. Enquiry email line: `Source: Newsletter (October 2026) · Form: Contact · Country: United Kingdom`.
5. Admin → Leads (V2): filter by channel, source, form, country, date; CSV export; monthly count by channel and country.
6. Logs: one line per submission with form, channel, source, country only — no personal details.

## Consequences
Task T041 (backend) after the Home build; every form uses it as its page is built.
