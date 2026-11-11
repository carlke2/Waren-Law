# T059 — Homepage intro section redesign

**Status:** Done — awaiting review  
**Branch:** `task/T059-intro`  
**Screenshots:** `docs/reports/t059-intro/`

## Confirmations
- Hero video section: not changed in this task.
- Header: not redesigned (only a theme-lint class rename `lg:grid-cols-[…]` → `lg:grid-menu-panel` from T058, no visual change).
- Other homepage sections (What we handle, feature, insights, logos, team, prefooter): not changed.
- No blue in the intro.
- Founding year is not in the database → eyebrow is `WAREN LAW ADVOCATES LLP` (no `EST.`).
- Info email is not shown.
- Newsreader kept (no Cormorant/Playfair). Italic emphasis uses `font-style: italic` on Newsreader (synthetic italic; still thin/elegant).

## Image used here
- **Source:** https://warenlaw.com/wp-content/uploads/2025/12/truth-concept-arrangement-with-balance-2048x1365.webp  
- **Alt on live site:** Legal scales, law books, and justice symbol representing legal services  
- **Local:** `frontend/public/home/intro-scales-balance.webp` (1600×1066, optimised WebP)

## Other warenlaw.com images collected
See `docs/media-library/README.md`. Candidates (not swapped into approved sections):
- `studio-arrangement-work.webp` → footer/CTA background  
- `team-group-office.webp` → about / office atmosphere  
- `advocates-seated.webp` → about film poster  
- `client-or-misc-*` → client logo strip refresh if approved  

## Content no longer displayed here (still in DB)
- `home.pageH1`: “WAREN Law Advocates LLP — Advocates in Nairobi, Nakuru and Beijing”
- `home.welcomeBody` paragraphs (established… / combine experience…)
- `pageCopy.about.whyPoints`: A new standard of legal practice; Client-centred approach; Trusted by corporates and individuals; Global outlook
- Previous intro image path `/home/lady-justice.webp` (file kept on disk)

## Spec colours vs homepage tokens
| Spec (approx.) | Token added / used | Existing homepage |
|---|---|---|
| Cream `#F9F7F2` | `--palette-intro` / `bg-intro` | Differs from `--palette-warm` `#fff8f0` and `--palette-panel` `#f4f4f2` |
| Muted gold `#C59D5F` | `--palette-intro-gold` | Differs from `--palette-gold-500` `#d4af37` |
| Charcoal `#333333` | `--palette-intro-ink` | Differs from `--palette-ink` `#1a1a1a` |

## Screenshots
- `1440-intro-context.png` — hero edge + intro + information strip + start of What we handle  
- `390-intro-context.png` / `390-intro-lower.png` — mobile intro and lower half (image/strip)  
