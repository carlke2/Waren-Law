# 0009: Assumptions made during the WordPress import

**Date:** 3 November 2026
**Status:** Accepted, for the firm to confirm

## Decision
All of these live in `scripts/import-wordpress/src/curation.ts`, so each is a one-line change.

1. **Member types:** partners are Janice, Ephraim, Phylis and Martin; the consultant is Nick; advocates are Barbra, Cecilia, Christine, Stephen and Faith; the other 10 are staff. This gives 10 profiles.
2. **Practice links** come from each person's card and bio. Martin's (Corporate, Wealth) are inferred from his cross-border role and webinars. Nobody is linked to Banking & Finance, because no one on the site names it.
3. **Offices:** everyone defaults to Nairobi, except Florence (Nakuru) and Phylis (none, because Ruiru isn't confirmed).
4. **Uncategorised posts:** four go to Data Protection, the road accident article to Dispute Resolution, and the China–Africa news post to Investment and Business Law.
5. **Authors** are set only where an article states it, through an author biography or "My name is…". The other 28 insights have no author.
6. **Debt page:** body built from the short page plus the six service descriptions on the long page, with 3 of 6 FAQs. Left out: testimonials, statistics, the fee and timescale FAQs, the confidentiality FAQ and the "free" assessment offer. It is marked `approved` because every kept sentence is already published, though decision 0005 treats rewritten content as `needs_advocate_review`.
7. **Webinar dates:** Trusts & Taxes is dated 28 July 2026, 7 pm Pacific; the page gives no year.
8. **Tracking IDs** are in Settings, as this brief and decision 0004 say, although decision 0006 lists tracking IDs under environment variables.

## Why
The brief says nothing waits on the firm, and each of these needed a value for the import to finish.

## Consequences
The firm's answers (audit 06, questions 4–8 and 11) may change these values. Re-running the import applies any change.
