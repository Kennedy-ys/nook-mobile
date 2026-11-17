# Nook Mobile Agent Rules

This file defines how work is carried out in this repo. The source of truth is the project context: [AGENTS.md](../AGENTS.md), the product and technical docs in [docs/](./), and the current status in [STATUS.md](./STATUS.md). This file describes the workflow, not the product direction.

## 1. Start of session

1. Read [AGENTS.md](../AGENTS.md) first.
2. Read the project docs in the order declared by AGENTS:
   - [docs/01-PRD.md](./01-PRD.md)
   - [docs/02-App-Flow.md](./02-App-Flow.md)
   - [docs/03-Tech-Stack.md](./03-Tech-Stack.md)
   - [docs/04-Frontend-Guidelines.md](./04-Frontend-Guidelines.md)
   - [docs/05-Backend-Schema.md](./05-Backend-Schema.md)
   - [docs/06-Implementation-Plan.md](./06-Implementation-Plan.md)
   - [docs/STATUS.md](./STATUS.md)
3. Read [docs/08-Standards.md](./08-Standards.md) before making code changes.
4. Check the branch and `git status` before modifying anything.

## 2. Prime directive

- The repo context files are the law. If the code disagrees with them, the code is wrong.
- Fix the code to match the project context. Do not silently rewrite the context to match the implementation.
- If a context file appears wrong or outdated, stop and ask for clarification before proceeding.

## 3. The work loop

Every unit of work follows this loop:

1. Read the files to be changed and the nearby files that depend on them.
2. Audit the current state against the project docs and current repo behavior.
3. State the intended change and the files involved before writing.
4. Make the change in the existing repo style.
5. Verify with the repo’s actual checks: lint, typecheck, tests, and integrity checks when relevant.

## 4. Stages

- Work proceeds in clear stages with an end condition for each stage.
- Stop at the end of each stage and confirm before starting the next one.
- Do not start the next stage by assumption alone when the current stage has not been validated.

## 5. What not to do

- Never bypass Git hooks or the repo’s integrity checks.
- Never force push or rewrite shared branch history.
- Never add a dependency without checking whether an existing dependency already covers the need.
- Never introduce architecture or backend patterns that do not match this Expo/React Native, local-first repo.
- Never delete or rewrite files that are part of the task without explicit instruction.
- Never touch a branch or repository outside the declared task scope.

## 6. Decision size

| Size | Typical example | Required action |
| --- | --- | --- |
| Small | Matching a naming pattern, splitting a component, local refactor with no behavior change | Proceed directly |
| Medium | New hook, new component, choice between valid patterns in the repo, new store or helper | State the choice and why, then proceed |
| Large | New feature flow, business logic, dependency change, new repo pattern, update to project rules or architecture docs | Stop and ask before continuing |

When in doubt, treat the task as one size larger.

## 7. End-of-session report

Every session should end with a brief report covering:

1. What changed, with each file and the reason it changed.
2. The real validation output from the checks that were run.
3. Any open items or unresolved questions.
4. Whether [docs/STATUS.md](./STATUS.md) was updated to reflect the current stage, decisions, and remaining work.

## 8. Repo-specific expectations

This repo is an Expo/React Native app for a floating dynamic island widget. The agent should respect the mobile-first product intent:

- keep the interface lightweight and ambient
- preserve the glassmorphism + motion-first design language
- prefer Zustand stores and local-first state patterns over database or backend assumptions
- validate with existing project tooling before claiming completion

The code should satisfy the project’s product and engineering docs, not a generic app template or a different stack.
