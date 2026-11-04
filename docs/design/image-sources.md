# Image sources

Every image the Home page uses. `backend/uploads/` holds the WebP versions, and the import creates them.

| Where | File in `backend/uploads/` | Source | Licence / status |
|---|---|---|---|
| Hero | `home-hero-skyline-illustration.webp` (2400 × 1133) | `docs/design/assets/hero-skyline-illustration.svg`, taken from the locked design canvas | Our own illustration. **Gap:** the spec asks for a Nairobi skyline photo, at least 2400 × 1350 with a commercial licence |
| Partner portrait | `team-janice-wachuka.webp` | warenlaw.com `/wp-content/uploads/2026/08/Janice.png-scaled.jpg` | Firm's own site; firm to confirm |
| Partner portrait | `team-ephraim-ndegwa.webp` | warenlaw.com `/wp-content/uploads/2026/08/ephraim-black-background.png` | Firm's own site; firm to confirm |
| Partner portrait | `team-martin-wachira.webp` | warenlaw.com `/wp-content/uploads/2025/12/Wachira-Two-scaled.webp` | Firm's own site; firm to confirm |
| Partner portrait | `team-phylis-njane.webp` | warenlaw.com `/wp-content/uploads/2025/11/Maina-Murimi-and-advocates-company-potrait-profile-3.pdf-5.webp` | Firm's own site; firm to confirm |
| Insight | `insight-cross-border-succession-planning-kenya-uk-us.webp` | warenlaw.com `/wp-content/uploads/2026/10/OCT-14-2026.jpg` | Firm's own site; origin unknown. **Gap:** only 624 × 351 |
| Insight | `insight-conveyancing-lawyer-in-kenya-buying-property-safely.webp` | warenlaw.com `/wp-content/uploads/2026/10/Buying-Property-in-Kenya-–-Conveyancing-Lawyer.png` | Firm's own site; origin unknown |
| Insight | `insight-warenlaw-com-land-registry-kenya-speed-corruption.webp` | warenlaw.com `/wp-content/uploads/2026/09/ChatGPT-Image-Sep-30-2026-11_13_25-AM.png` | Firm's own site. The file name suggests an AI-generated image; firm to confirm |

The insights shown change as new articles are published.

## Replacing the hero

Add `docs/design/assets/hero-nairobi.jpg` and run `pnpm import:wp`. The import prefers that file over the illustration.
