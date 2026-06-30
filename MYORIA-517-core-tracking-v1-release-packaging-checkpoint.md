# MYORIA-517 — Core Tracking V1 Release Packaging Checkpoint

## 1. Status

- Ticket: MYORIA-517 / GitHub issue #505
- Scope: docs-only
- Production UI changed: no
- Tests changed: no
- Tokens, token mirrors, style allowlists, and generated output changed: no
- Data, domain, application, persistence, schema, migration, and seed changed:
  no
- Release tag created: no
- Release automation changed: no

## 2. Purpose

This document freezes Core Tracking V1 behavior after MYORIA-516 recorded
`CORE TRACKING V1 QA PASS WITH ACCEPTED DEBT`. It defines the checks that must
be completed before any tag, package, or release action.

Packaging is a verification and delivery activity. It does not authorize more
Core Tracking UI or design iteration. The accepted behavior and debt below
remain fixed unless packaging exposes a concrete blocker under section 6.

## 3. Frozen Core Tracking V1 Behavior

The following behavior must not change during packaging:

- Today remains the root daily surface and domain-oriented entry point for
  Nutrition, Fluid, Bodyweight, and the existing Workout entry point.
- Nutrition report retains its selected-day flow, logged-entry projection,
  refresh behavior, and report-local `ADD FOOD` entry action.
- Add Food retains recent and catalog search, item selection, amount/unit
  validation, nutrition-only logging, mixed Nutrition + Fluid logging, and
  duplicate-submit protection.
- Add Food no-result retains the trimmed-query `Create item` path into Food
  Library Create Item and returns successfully created items to Add Food with
  the new item selected. Creation does not auto-log the item.
- Food & Drink Library retains list, detail, create, edit, archive/hide, and
  restore behavior. Archival changes future logging availability without
  changing historical logs.
- Fluid report retains selected-day totals, rows, refresh behavior, and its
  report-local Add Fluid path. Add Fluid retains type selection, amount
  validation, logging, clean Cancel, dirty-discard decisions, and Day-mode
  return behavior.
- Pure Fluid entries retain readable detail and local confirmed deletion.
  Successful deletion refreshes Fluid report and Today totals.
- Mixed Nutrition + Fluid items continue to write through the accepted logging
  path and contribute to both projections. Their linked Fluid projection
  remains read-only, with no independent edit or delete promise.
- Bodyweight retains add/log behavior and Bodyweight report and Today refresh.
- Current SQLite-backed restart and persistence behavior remains the accepted
  expectation. MYORIA-516 did not record an explicit final restart proof, so
  packaging must verify it rather than change the behavior speculatively.

## 4. Accepted Debt Carried Into Release

The following known debt does not block packaging by itself:

- mixed visual action and form grammar;
- Add Fluid confirmation visual debt;
- Add Food, Add Fluid, and Add Weight form-action debt;
- Food Library long-form and object-detail visual debt;
- Fluid report, detail, and edit residual visual debt;
- shell, header, date, and back-label rhythm debt;
- range reports and broader cross-domain reporting, which remain deferred; and
- Workout, which is outside this Core Tracking V1 release scope unless it is
  explicitly added.

## 5. Release Packaging Checklist

Complete this checklist against the intended release commit before creating a
tag, package, or release:

- [ ] Verify the working tree is clean with `git status --short --branch`.
- [ ] Fetch the remote and verify `main` matches `origin/main`, with no local or
      remote-only commits.
- [ ] Run the full project checks exposed by `package.json`:
  - [ ] `pnpm typecheck`
  - [ ] `pnpm lint`
  - [ ] `pnpm test`
  - [ ] `pnpm format:check`
  - [ ] `pnpm check:ui-styles`
- [ ] Build and check the styleguide:
  - [ ] `pnpm styleguide:build`
  - [ ] `pnpm styleguide:check`
- [ ] Run `git diff --check` and `git diff --cached --check`.
- [ ] Confirm the checks did not create an accidental generated-output diff.
- [ ] Confirm there are no uncommitted schema, seed, or migration changes.
- [ ] Start the app in the iOS simulator with the existing `pnpm ios` workflow
      and confirm startup succeeds.
- [ ] Smoke test Today -> Nutrition -> Add Food and confirm a successful log
      returns coherent Nutrition and Today data.
- [ ] Smoke test Today -> Fluid -> Add Fluid and confirm a successful log
      returns coherent Fluid and Today data.
- [ ] Smoke test Today -> Bodyweight -> Add Weight and confirm a successful log
      returns coherent Bodyweight and Today data.
- [ ] Restart the app and confirm the smoke-test entries and totals persist.
- [ ] Record the package, version, and tag decision in a separate release
      action. This repository currently contains no dedicated release-process
      document, so that decision must not be inferred or implemented here.

`test:ui`, `test:ui:smoke`, and `test:ui:workout` are available package scripts
but require their Maestro/device environment. Run the applicable UI suite when
that environment is part of the intended packaging process; Workout remains
outside this checkpoint's Core Tracking scope.

## 6. Blocker Policy During Packaging

- Only a concrete functional, safety, accessibility, persistence, data-loss,
  build, test, lint, typecheck, or packaging failure can block packaging.
- Known visual debt in section 4 does not block packaging.
- Do not open Add Fluid, action, confirmation, or other design fixes from
  packaging unless a concrete blocker appears.
- If a blocker appears, create exactly one narrow blocker issue. Record its
  reproduction, affected check or flow, evidence, and smallest safe scope; do
  not bundle adjacent cleanup.

## 7. Recommended Next Step

**Run the release packaging/check commands locally.**

## 8. Explicit Non-Goals

- No production UI changes.
- No test changes.
- No release tag.
- No release automation.
- No version bump unless an existing release document already requires it.
- No domain, application, persistence, schema, migration, or seed changes.
- No design cleanup.
- No Workout expansion.

## 9. Verification

Commands run for this docs-only checkpoint:

- `pnpm format:check` — passed
- `git diff --check` — passed
- `git diff --cached --check` — passed
- `pnpm styleguide:build` — passed
- `pnpm styleguide:check` — passed
