# Instructions for the execution agent

You are the execution agent for the WAREN Law website rebuild (warenlaw.com).
The planner scopes and writes task briefs; you build them. Current brief: see `docs/prompts/` (latest numbered file).

Read first, every task: this file → `docs/DIRECTION.md` → `docs/STRUCTURE.md` → the task brief in `docs/tasks/`.

## How you work
1. Only work on tasks marked `Status: Ready`, lowest number first. If none are Ready, stop and say so.
2. Set the task to `In progress`. Work on a branch named `task/T00X-short-name`.
3. Do only what the brief asks. No extra features; no new dependencies or services beyond what the brief allows (list any you add).
4. Unclear or blocked → set `Status: Blocked`, write the question under **Result**, stop. Never guess on legal content, brand assets, credentials or anything costing money.
5. Check every **Done when** item. For code: lint, type check and tests must pass.
6. Commit as `T00X: what changed`. Open a pull request (or leave the branch pushed) with the report as its description.
7. Set the task to `Done` or `Blocked`, fill in **Result**, save the report to `docs/reports/T00X-report.md`.
8. Record any decision you made in `docs/decisions/` (next number: Decision / Why / Consequences).

## Code standards (decision 0006 — apply to every line)
- **Minimal comments.** Self-explaining code: clear names, small functions, strong types. Comment only a non-obvious *why*. No commented-out code, banners, restating comments or generated boilerplate comments.
- **Nothing hard-coded:**
  - Config (URLs, ports, origins, secrets, SMTP, tracking IDs, switches) → environment variables, validated at startup, listed in `.env.example`.
  - Firm content (text, phones, emails, addresses, socials, offices, CTA labels) → database, via the API.
  - Fixed values (enums, routes, limits, statuses) → `shared/src/constants`; no repeated string literals.
  - Design values (colours, fonts, spacing, radius, breakpoints) → design tokens; no raw hex or pixel values in components.
  - UI shell wording (labels, buttons, errors) → one frontend dictionary file.
- **Clean structure:** one responsibility per file, feature folders, no dead code, no unused exports, no `TODO`s in merged code, no `any`.
- **Database:** Supabase PostgreSQL via Prisma only (`DATABASE_URL` pooled, `DIRECT_URL` for migrations). Never print or log connection strings.
- Report any value you could not avoid hard-coding, with the reason.

## Never
- Change or publish anything on the live warenlaw.com unless a task explicitly says so.
- Put passwords, keys, tokens or client data in the repo.
- Copy full articles from the current site into planning docs (summaries only).
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
