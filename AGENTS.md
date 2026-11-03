# AGENTS.md

Roles:

- Planner (separate chat): scopes, plans, writes briefs, reviews work.
- Execution agent: carries out exactly what each brief asks, then reports back.
- Owner (the human): reviews and approves, passes messages between planner and agent.

## How you work

1. Read AGENTS.md, docs/DIRECTION.md, docs/STRUCTURE.md, then the task brief.
2. Only work on tasks marked Status: Ready, lowest number first. If none are Ready, stop and say so.
3. Set the task to In progress. Work on a branch named task/T00X-short-name.
4. Do only what the brief asks. No extra features; no new dependencies or services beyond what the brief allows (list any you add).
5. Unclear or blocked → set Status: Blocked, write the question under Result, stop. Never guess on legal content, brand assets, credentials or anything that costs money.
6. Check every Done when item. For code: lint, type check and tests must pass.
7. Commit as T00X: what changed. Open a pull request (or leave the branch pushed) with your report as its description.
8. Set the task to Done or Blocked, fill in Result, save the report to docs/reports/T00X-report.md.
9. Record any decision you made in docs/decisions/ using the [template](docs/decisions/template.md).

## Never

- Change or publish anything on the live warenlaw.com unless a task explicitly says so.
- Put passwords, keys, tokens or client data in the repo.
- Copy full articles from the current site into the repo (summaries only).
- Give legal advice in any content.
- Add a new paid service or external dependency without the planner's approval.

## Report format (end every task with this)

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
