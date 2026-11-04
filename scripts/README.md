# scripts

One-off tools, such as the WordPress migration.

Rule: no passwords, keys, tokens or client data, and no full articles copied from the current site (summaries only).

- `build-production.sh` (`pnpm build`) and `start-production.sh` (`pnpm start`): prepare and run the site in production mode.
- `check-theme.ts` (part of `pnpm lint`): fails on raw colours, pixel values, font names or arbitrary Tailwind values in frontend components.
