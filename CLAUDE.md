# CLAUDE.md

You are the execution agent for the WAREN Law website rebuild (warenlaw.com). The planner scopes and writes briefs; you build them. This is the only agent rules file.

Project overview, how to run it, milestones and decisions: @README.md

Read first, every task: this file, then `README.md` (and `frontend/README.md` or `backend/README.md` for the part you touch), then the brief the owner gave you. Planning documents up to 12 November 2026 (plan, direction, structure, decisions 0001–0031, audits, reports) are archived outside the repo in `~/warenlaw-archive/2026-11-12/docs/`.

## How you work

1. Do the brief the owner gave you. If none is in front of you, stop and say so.
2. Work on a branch named for the change, unless the brief says otherwise.
3. Do only what the brief asks. No extra features; no new dependencies or services beyond what the brief allows (list any you add).
4. Unclear or blocked → stop and ask. Never guess on legal content, brand assets, credentials or anything costing money.
5. Check every acceptance item. For code: lint, type check and tests must pass.
6. Commit with a message that says what changed. Open a pull request when the brief asks for one.
7. Report the result in chat, in the format at the bottom of this file.
8. Record any decision you made in the Decisions section of `README.md` (Decision / Why).

## Ground rules (override everything else)

- **The site runs on its own.** The owner starts it with `pnpm start` (production mode) after `pnpm build`. Never leave servers or databases running after a task. Never change a `.env` file without stating exactly which keys and why.
- **No visible loading.** Review and demo in production mode. Dev indicator off. Every public page is pre-rendered and arrives complete: no spinners, skeletons or `loading.tsx`. The browser never fetches page content; client-side requests only for user actions (forms, search).
- **Everything native.** All forms are our own and handled by our backend. No third-party embedded forms, booking pages, chat widgets or iframes. Maps load only on click, tracking only after consent, WhatsApp is a plain `wa.me` link.
- **The owner approves the look before it spreads.** No page is built in a style the owner has not seen and approved.

## Assets: code vs database

- `frontend/public/` holds files the **code** refers to by path. `frontend/README.md` lists each one and where it is used.
- `backend/uploads/` holds files the **database** refers to (`Media` rows linked from content), plus a few named in code. `backend/README.md` explains how they are served.
- **Nothing is removed from either folder without checking both the code and the database** (read-only query). A file is unused only if neither refers to it.

## Database safety

- Never run `pnpm import:wp`, a seed, a migration against Supabase, or any script that writes to the database without asking the owner first and listing exactly what it would overwrite.
- Read-only checks run inside a `READ ONLY` transaction. Never print or log connection strings.
- Every migration that creates a table runs `ALTER TABLE "<Table>" ENABLE ROW LEVEL SECURITY` with no policies (decision 0008). After migrating, check that every table in the `public` schema has RLS on.
- Development work uses the `waren-dev` Supabase project. Before any command that writes, print the target database host (never the password) and stop unless it is `waren-dev`.

## Reports, screenshots and working files

- Reports are given in chat. Nothing is added to the repo for checking: verification screenshots and copies go to a temporary folder outside the repo and are deleted afterwards.
- No videos or screen recordings are committed.
- Working and source files (design sources, portrait cut-outs, contact sheets) go to the archive outside the repo (`~/warenlaw-archive/<date>/design/`), never into the repo.

## Code standards (apply to every line)

- **Minimal comments.** Self-explaining code: clear names, small functions, strong types. Comment only a non-obvious _why_. No commented-out code, banners, restating comments or generated boilerplate comments.
- **Nothing hard-coded:**
  - Config (URLs, ports, origins, secrets, SMTP, tracking IDs, switches) → environment variables, validated at startup, listed in `.env.example`.
  - Firm content (text, phones, emails, addresses, socials, offices, CTA labels) → database, via the API.
  - Fixed values (enums, routes, limits, statuses) → `shared/src/constants`; no repeated string literals.
  - Design values (colours, fonts, spacing, radius, breakpoints) → design tokens in `frontend/src/styles/theme.css`; no raw hex or pixel values in components (`pnpm lint` checks this).
  - UI shell wording (labels, buttons, errors) → one frontend dictionary file (`frontend/src/lib/utils/dictionary.ts`).
- **Clean structure:** one responsibility per file, feature folders, no dead code, no unused exports, no `TODO`s in merged code, no `any`.
- **Database:** Supabase PostgreSQL via Prisma only (`DATABASE_URL` pooled, `DIRECT_URL` for migrations).
- Report any value you could not avoid hard-coding, with the reason.

## Never

- Change or publish anything on the live warenlaw.com unless a task explicitly says so.
- Put passwords, keys, tokens or client data in the repo.
- Copy full articles from the current site into the repo or reports (summaries only).
- Give legal advice in any content. Mark legal content `NEEDS ADVOCATE REVIEW` until the firm approves it.
- Add a new paid service or external dependency without the planner's approval.

## Report format

```
## Report: T00X — <title>
Status: Done | Blocked
Branch / PR: <name or link>
Summary: <2–4 sentences>
Done when: <each item ✅ or ❌ with a note>
Files changed: <list>
Dependencies added: <list or "none">
Decisions made: <list or "none">
Questions / blockers: <list or "none">
Suggested next step: <one line>
```
