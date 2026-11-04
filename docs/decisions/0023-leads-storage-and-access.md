# 0023: Leads storage and interim access

**Date:** 4 November 2026
**Status:** Accepted (brief 07)

## Decision
1. Contact, consultation and webinar recording requests share `ContactSubmission`, told apart by `form`. Subscribers stay in `Subscriber`.
2. The old `ContactSubmission.source` (a page path) is now `page`. The old `Subscriber.source` (an enum) is now `signupType`. `source` now means where the person came from, as in decision 0017.
3. The leads API requires an `x-api-key` header matching `LEADS_API_KEY`. With no key configured, it refuses every request.
4. A visit's tags are held in the browser's `sessionStorage`, so they survive moving between pages in one tab but no longer.

## Why
Leads hold personal data and admin sign-in doesn't exist yet, so the API must be closed by default. Without `sessionStorage`, a visitor who lands from a newsletter link and then opens the contact page would count as direct.

## Consequences
Replace the key with admin sign-in when the admin panel is built.
