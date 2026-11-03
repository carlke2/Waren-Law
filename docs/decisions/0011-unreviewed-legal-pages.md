# 0011: Terms and Cookie Policy stay unapproved, with a preview switch

**Date:** 3 November 2026
**Status:** Accepted, for the planner to confirm

## Decision
The new Terms and Cookie Policy pages are stored as `needs_advocate_review`, because the firm hasn't approved them (decision 0005). The API hides unapproved pages unless `PREVIEW_UNREVIEWED_PAGES=true`. Local and staging set it to `true`, and those pages then show a visible "needs advocate review" notice. Production leaves it unset.

This applies to pages only. Insights, practice areas and webinars keep the strict rule.

## Why
Brief 04 needs these pages on the site for review, but marking them `approved` would record an approval that hasn't happened and would remove the launch gate without anyone noticing.

## Consequences
- In production, the two pages stay hidden until the firm approves them. Footer links to them are left out until then.
- Each must be approved before launch (T034) or the site launches without Terms and Cookie pages.
