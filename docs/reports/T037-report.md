## Report: T037 — Tokens, fonts, header, footer
Status: Done
Branch / PR: `task/T037-tokens-header-footer`, fast-forwarded to `main`
Summary: `frontend/src/styles/theme.css` is the one place for values. Tailwind's default colours, fonts, type sizes and radii are removed, and `scripts/check-theme.ts` runs with `pnpm lint`. The header is transparent over the hero and turns solid navy on scroll, with a native `<dialog>` as the full-screen menu. The footer has the native newsletter form, and the WhatsApp link and consent panel are wired to the kept consent logic. Nav targets not yet built show a holding page with header, footer and title.
Done when:
- ✅ Theme file, `fonts.ts`, semantic Tailwind utilities, theme check in `pnpm lint`
- ✅ Header and mobile menu
- ✅ Footer, newsletter form, WhatsApp link, consent panel
- ✅ Holding page, pre-rendered for all known paths and marked noindex
Files changed: `frontend/src/styles/**`, `frontend/src/components/**`, `frontend/src/app/**`, `frontend/src/lib/{dictionary,navigation}.ts`, `frontend/src/lib/content/holding.ts`, `frontend/src/lib/api/content.ts`, `frontend/tests/*`, `scripts/check-theme.ts`, `package.json`
Dependencies added: none
Decisions made: none
Questions / blockers: the spec lists `--color-success` and `--color-error` but gives no values; see the brief 06 report
Suggested next step: T038
