# 0021: Adopt the locked design fully and build the complete site in one run

**Date:** 4 November 2026
**Status:** Accepted

## Decision
1. The locked Home design (`docs/design/reference/home-design.html`, spec v3.4) is the **only** design. All other design material is removed from the repo: archived specs (v1 corporate, v2 teal), the teal reference image, the `.dc.html` canvas copies and any design notes that describe other directions. Decisions 0013 and 0015 stay as history (superseded).
2. All remaining pages are built in **one agent run (brief 07)**, timeboxed to 2 h 45 min, in priority order, each page merged as soon as it is done.
3. About Us and Our Partners follow their reference files. Every other page is built **only from the locked design system**: existing tokens, components and section patterns from Home and About, the section lists in `docs/design/PAGE-MAP.md`, and the phone rules in spec §7. No new colours, fonts, styles or patterns.
4. The owner reviews all pages the next morning; fixes follow as a polish pass. This replaces the per-item design → lock cycle for this run only (ground rule 6 is satisfied by the morning review before anything is published).
5. Source tracking (T041) is built in the same run, before the forms.
