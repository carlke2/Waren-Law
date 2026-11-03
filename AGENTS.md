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
