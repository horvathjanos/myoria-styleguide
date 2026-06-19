# MYORIA-480 Core Tracking V1 Manual QA Runbook

## Status

- Ticket: MYORIA-480 / GitHub issue #467
- Scope: release QA preparation documentation only
- Production UI touched: no
- Domain/application/persistence behavior touched: no
- Tests touched: no
- Styleguide documentation touched: yes
- Workout scope: Deferred
- Current QA status after this document: manual QA runbook ready; manual execution pending

## 1. Executive Purpose

This document turns the Core Tracking V1 acceptance decisions into one manual
QA runbook for a human tester to execute on a named release candidate.

Core Tracking V1 covers Today, Nutrition, Fluid, Bodyweight, Food & Drink
Library basics, goals/targets, app restart persistence, import/export recovery,
styleguide/token enforcement, and the accepted linked mixed Food + Drink
behavior. Workout remains Deferred and must not be treated as a Core Tracking
V1 blocker.

This document is not a QA result. It does not say Core Tracking V1 is done,
release-ready, or passed.

## 2. QA Status Rule

Core Tracking V1 is not release-ready until a human records a manual QA result
against this runbook on a named build, commit, device or simulator.

The correct status after MYORIA-480 is:

```text
manual QA runbook ready; manual execution pending
```

Manual QA results must use these statuses where relevant:

- Required for V1
- Accepted for V1
- Accepted with limitation
- Deferred
- Needs manual QA
- Pass
- Fail
- Blocker
- Non-blocking design debt
- Retest required

## 3. Required Environment Metadata

Record this metadata before running the checklist:

- Tester:
- Date/time:
- Device or simulator:
- OS version:
- App build identifier if available:
- Git commit SHA:
- Timezone:
- Clean install or existing database:
- Export/import files used:
- Notes about seeded data, local database state, or previous QA runs:

## 4. Pre-Run Repository / Build Checks

Before manual device/simulator QA, confirm the release candidate is tied to a
known repository state:

- Confirm the QA candidate commit SHA.
- Confirm the app build was produced from that commit.
- Confirm the tester is using the private Myoria repository as source of truth.
- Confirm no generated bundle output was manually edited.
- Confirm Workout remains Deferred and no Workout implementation QA is required.
- Confirm known accepted limitations are visible in this runbook and will be
  recorded in the result.

## 5. Required Automated Checks

Run these checks before final manual verdict:

```bash
pnpm check:ui-styles
pnpm lint
pnpm typecheck
pnpm test
pnpm format:check
git diff --check
git diff --cached --check
pnpm styleguide:build
pnpm styleguide:check
```

Record each command as Pass, Fail, or Retest required in the result template.

Styleguide/token enforcement review:

- Confirm `pnpm check:ui-styles` passes.
- Confirm `pnpm styleguide:build` passes.
- Confirm `pnpm styleguide:check` passes.
- Inspect any styleguide build diff before committing it.
- Keep generated output only if it is legitimately caused by the styleguide
  build and directly related to MYORIA-480.
- Treat unrelated generated churn as out of scope.

## 6. Test Data Setup

Use a clean install or a known clean test database unless the QA objective is
existing-database migration/restart behavior.

Create enough representative data to exercise all Required for V1 domains:

- Start from an empty Today state.
- Create a manual Nutrition entry.
- Create and log a catalog-backed Food Library nutrition item.
- Create and log a Food Library mixed Food + Drink item.
- Create a normal Fluid entry.
- Create a Bodyweight entry.
- Create Food Library nutrition-only, fluid-only, and mixed Food + Drink items.
- Edit at least one Food Library item.
- Archive or hide at least one Food Library item.
- Restore at least one Food Library item.
- Create calorie and protein goals.
- Create bodyweight target and training-priority goals if supported.
- Delete at least one normal Nutrition entry where supported.
- Delete at least one normal Fluid entry where supported.
- Delete and relog at least one Bodyweight entry.
- Export the data range that includes all test data.
- Prepare invalid import inputs: invalid file, malformed JSON, and unsupported
  version JSON where feasible.

## 7. Today QA

Status: Required for V1.

- Empty Today shows Nutrition `0 / target`.
- Empty Today shows Fluid `0 / 3 L`.
- Empty Today shows Bodyweight `—` with `Not logged`.
- Empty Today shows Workout `No workouts yet`.
- Populated Today updates after logging Nutrition, Fluid, and Bodyweight data.
- Today Nutrition uses configured calorie/protein targets after goals exist.
- Today fallback targets remain understandable when no goals exist.
- Today Bodyweight shows the logged value and `Logged HH:mm`.
- Today navigation opens Nutrition, Fluid, Bodyweight, and Workout surfaces.
- Workout navigation does not block Nutrition, Fluid, Bodyweight, Food Library,
  Settings/Data, import/export, or other Core Tracking V1 QA.
- Workout remains Deferred; no Workout implementation QA is required.

## 8. Nutrition QA

Status: Required for V1.

- Log a manual Nutrition entry.
- Log a catalog-backed Food Library item.
- Confirm Today Nutrition totals update.
- Open Nutrition report Day mode.
- Inspect a normal Nutrition entry detail.
- Edit/correct a manual Nutrition entry where supported by current UI.
- Delete a normal Nutrition entry where supported.
- Confirm deleted Nutrition entries leave active day totals after refresh.
- Confirm delete-and-relog correction is usable where applicable.
- Confirm linked mixed rows are visible but unavailable for direct independent
  edit/delete, following MYORIA-473.
- Confirm Nutrition Week, Month, Year, and All modes are handled by the range
  placeholder QA section, not treated as functional aggregation.

## 9. Fluid QA

Status: Required for V1.

- Log a normal Fluid entry with a preset amount.
- Log a normal Fluid entry with a custom amount.
- Confirm Today Fluid updates.
- Open Fluid report Day mode.
- Inspect a normal Fluid entry detail.
- Edit amount for a normal Fluid entry where supported.
- Delete a normal Fluid entry where supported.
- Confirm deleted Fluid entries leave active day totals after refresh.
- Confirm linked mixed fluid projection appears after mixed item logging.
- Confirm linked mixed Fluid row unavailable behavior follows MYORIA-473.
- Confirm Fluid Week, Month, Year, and All modes are handled by the range
  placeholder QA section, not treated as functional aggregation.

## 10. Bodyweight QA

Status: Required for V1.

- Confirm empty Bodyweight Today state uses the missing marker and `Not logged`.
- Confirm Bodyweight report empty state is understandable.
- Log a Bodyweight entry.
- Confirm Today shows the value and `Logged HH:mm`.
- Open Bodyweight report Day mode.
- Inspect the Bodyweight entry detail where supported.
- Delete the Bodyweight entry.
- Confirm Today and Bodyweight report return to clear missing/empty states.
- Relog the corrected Bodyweight value.
- Confirm delete-and-relog is the accepted Bodyweight correction path.
- Confirm direct Bodyweight amount/timestamp edit is Deferred and not required.

## 11. Food Library QA

Status: Required for V1.

- Active Food Library list loads.
- Archived Food Library list loads.
- Search filters active items.
- Create a nutrition-only item.
- Create a fluid-only item.
- Create a mixed Food + Drink item.
- Edit item name, aliases, serving metadata, nutrition contribution, and fluid
  contribution where supported.
- Duplicate warning appears on create if supported by the entered data.
- Duplicate warning can be bypassed intentionally with `Save anyway` if that
  flow is shown.
- Archive or hide an active item.
- Confirm hidden item leaves active list/search.
- Confirm hidden nutrition-capable item leaves normal Add Food logging flow.
- Restore an archived item.
- Confirm restored item returns to active list/search.
- Confirm restored nutrition-capable or mixed item is available again in Add
  Food when eligible.
- Confirm historical logs remain intact after archive/hide and edit.
- Treat Food Library detail/form visual debt as Non-blocking design debt unless
  controls are unusable, validation is blocked, text overlaps essential
  controls, or lifecycle actions cannot be completed.

## 12. Goals / Targets QA

Status: Required for V1.

- Confirm first-run empty-goals state is understandable.
- Confirm Settings/Data Goals shows no active goals if none exist.
- Confirm Today still shows fallback Nutrition targets and Fluid `3 L`.
- Create a calorie target.
- Confirm Today uses the calorie target.
- Create a protein target.
- Confirm Today uses the protein target.
- Create a bodyweight target if supported.
- Confirm Settings/Data lists the bodyweight target and Bodyweight surfaces
  remain coherent.
- Create a training-priority goal if supported.
- Confirm training-priority goal does not make Workout a V1 blocker.
- Supersede or update an active goal of the same type if supported.
- Restart the app and confirm goals persist.
- Confirm seeded/default goal records are not Required for V1.
- Confirm Fluid/carb/fat configurable goals are not Required for V1.
- Confirm Bodyweight target comparison is not Required for V1.

## 13. Range Placeholder QA

Status: Accepted with limitation.

Nutrition:

- Day mode remains functional.
- Week mode shows a quiet placeholder.
- Month mode shows a quiet placeholder.
- Year mode shows a quiet placeholder.
- All mode shows a quiet placeholder.
- Placeholders do not claim real aggregation, totals, charts, trends, averages,
  or insights.
- Switching back to Day mode works.

Fluid:

- Day mode remains functional.
- Week mode shows a quiet placeholder.
- Month mode shows a quiet placeholder.
- Year mode shows a quiet placeholder.
- All mode shows a quiet placeholder.
- Placeholders do not claim real aggregation, totals, charts, trends, averages,
  or insights.
- Switching back to Day mode works.

Bodyweight:

- Day mode remains functional.
- Week mode shows a quiet placeholder.
- Month mode shows a quiet placeholder.
- Year mode shows a quiet placeholder.
- All mode shows a quiet placeholder.
- Placeholders do not claim real aggregation, totals, charts, trends, averages,
  or insights.
- Switching back to Day mode works.

## 14. Linked Mixed Food + Drink QA

Status: Accepted with limitation.

- Create a mixed Food + Drink Library item.
- Log the mixed item through the supported Add Food flow.
- Confirm Nutrition projection appears.
- Confirm Nutrition projection contributes to Nutrition totals.
- Confirm Fluid projection appears.
- Confirm Fluid projection contributes to Fluid totals.
- Confirm projections remain linked to one canonical mixed logged event.
- Confirm Nutrition projection is unavailable for direct independent edit/delete.
- Confirm Fluid projection is unavailable for direct independent edit/delete.
- Confirm app restart preserves projection linkage.
- Confirm export/import round-trip preserves `logged_events`,
  `nutrition_food_logs.logged_event_id`, and `fluid_entries.logged_event_id`
  linkage after MYORIA-479.
- Record the accepted limitation: saved mixed rows cannot be edited or deleted
  independently from Nutrition or Fluid report projection rows in V1.

## 15. App Restart Persistence QA

Status: Required for V1.

Restart the app from the release candidate environment and confirm:

- Nutrition entries persist.
- Nutrition totals persist.
- Deleted Nutrition entries remain excluded from active lists/totals.
- Fluid entries persist.
- Fluid totals persist.
- Deleted Fluid entries remain excluded from active lists/totals.
- Bodyweight latest value and entries persist.
- Deleted Bodyweight entries remain excluded from active lists/totals.
- Food Library active items persist.
- Food Library archived items remain archived and hidden from active logging.
- Food Library restored items remain active.
- Goals persist.
- Linked mixed entry linkage persists.
- Today renders correctly after restart.
- Local-day/timezone behavior is correct enough for V1, especially near
  local-day boundaries where practical.

## 16. Import/Export Round-Trip QA

Status: Required for V1.

- Create representative data from the setup section.
- Export a range that includes the representative data.
- Confirm export completes without crash.
- Confirm the native share/save flow opens successfully.
- Confirm the export includes the v1 JSON artifact.
- Import the exported JSON into a clean state or supported restore target.
- Confirm import preview shows understandable counts.
- Confirm restore completes without crash.
- Confirm Today renders correctly after import.
- Confirm Nutrition round-trips.
- Confirm Fluid round-trips.
- Confirm Bodyweight round-trips.
- Confirm Food Library `foods` round-trip.
- Confirm Food Library `food_aliases` round-trip.
- Confirm archived/restored Food Library state round-trips.
- Confirm goals round-trip.
- Confirm linked mixed Food + Drink `logged_events` round-trip.
- Confirm Nutrition and Fluid projection linkage round-trips.
- Confirm deleted Nutrition state round-trips.
- Record the accepted limitation that deleted Fluid and Bodyweight history may
  remain active-state recovery only if MYORIA-478/MYORIA-479 docs still define
  that behavior for the candidate.
- Confirm Workout artifacts in export, if present, do not make Workout part of
  Core Tracking V1 QA.

## 17. Invalid Import QA

Status: Required for V1.

- Try an invalid non-JSON file.
- Confirm the invalid file is rejected safely.
- Try malformed JSON.
- Confirm malformed JSON is rejected safely.
- Try unsupported version JSON.
- Confirm unsupported version JSON is rejected safely.
- Confirm failed import preview does not expose a restore action.
- Confirm failed import/restore does not overwrite existing data.
- Confirm existing Today, Nutrition, Fluid, Bodyweight, Food Library, and Goals
  data remain intact after failed import attempts.

## 18. Known Accepted Limitations

Record these as Accepted for V1, Accepted with limitation, Deferred, or
Non-blocking design debt as appropriate in the QA result:

- Workout implementation is Deferred.
- Week / Month / Year / All report modes are placeholders.
- Bodyweight correction is delete-and-relog; direct edit is not Required for V1.
- Linked Nutrition + Fluid projections are read-only/unavailable for
  projection-specific edit/delete.
- Seeded/default goal records are not Required for V1.
- Fluid, carb, and fat configurable goals are not Required for V1.
- Bodyweight target comparison is not Required for V1.
- Food Library detail/form visual debt is Non-blocking design debt unless it
  prevents functional operation.
- Deleted Fluid and Bodyweight history import/export may remain active-state
  recovery only if the current MYORIA-478/MYORIA-479 docs still say so for the
  candidate.
- Restore is additive/upsert-style, not a full database wipe/replace.
- Import/export is a data safety path, not remote sync.

## 19. Failure Classification

Use these classifications in the result:

- Pass: the item behaves as Required for V1 or matches the accepted limitation.
- Fail: the item does not meet Required for V1 behavior.
- Blocker: the failure prevents a release-ready verdict.
- Non-blocking design debt: visible debt that is accepted for V1 and does not
  prevent completing the user flow.
- Retest required: a fix or candidate change landed after QA started, or a
  failed item needs a fresh run.

Treat these as Blocker if found:

- Data loss.
- Crash on release-critical surfaces.
- Corrupt import.
- Broken Today rendering or navigation.
- Broken app restart persistence.
- Broken Food Library create/edit/archive/restore lifecycle.
- Broken linked mixed-entry lifecycle or projection linkage.
- Failure to log, inspect, or correct Required for V1 Nutrition, Fluid, or
  Bodyweight data as accepted.
- Invalid import overwrites existing data.
- Automated required check fails on the release candidate.

## 20. Retest Rules

Status: Retest required.

Retest is required when:

- Any production code fix lands after QA starts.
- Any domain/application/persistence behavior changes after QA starts.
- Any migration changes after QA starts.
- Any import/export behavior changes after QA starts.
- Any styleguide/token enforcement change affects release-critical surfaces.
- A failed item is fixed.
- The app build identifier or commit SHA changes.

Retest may be scoped to the affected area only if the fix is isolated and the
tester records the scope decision. Full retest is required for persistence,
migration, import/export, app shell, Today, or shared style/token changes.

## 21. Final Release Verdict Criteria

Pass:

- All Required for V1 checks pass.
- Accepted limitations are observed and recorded.
- No Blockers are open.
- Required automated checks pass.
- Manual QA result is recorded against a named build, commit, device or
  simulator.

Fail:

- Any Required for V1 domain cannot be logged, inspected, corrected, deleted, or
  persisted according to accepted behavior.
- Any accepted limitation is contradicted by the actual app behavior.
- Any required automated check fails without an accepted release-blocker
  resolution.

Blocker:

- Data loss, crash, corrupt import, broken Today, broken persistence, broken
  Food Library lifecycle, broken linked mixed-entry lifecycle, or invalid import
  overwriting existing data.

Retest required:

- Any fix lands after QA start.
- The release candidate commit or build changes after QA start.

## 22. Result Template

Copy this template into the release QA record and fill it during the human QA
run.

```text
# Core Tracking V1 Manual QA Result

Runbook:
docs/styleguide/MYORIA-480-core-tracking-v1-manual-qa-runbook.md

QA status:
[Needs manual QA / Pass / Fail / Retest required]

Environment metadata:
- Tester:
- Date/time:
- Device or simulator:
- OS version:
- App build identifier if available:
- Git commit SHA:
- Timezone:
- Clean install or existing database:
- Export/import files used:
- Notes:

Automated checks:
- pnpm check:ui-styles: [Pass / Fail / Retest required]
- pnpm lint: [Pass / Fail / Retest required]
- pnpm typecheck: [Pass / Fail / Retest required]
- pnpm test: [Pass / Fail / Retest required]
- pnpm format:check: [Pass / Fail / Retest required]
- git diff --check: [Pass / Fail / Retest required]
- git diff --cached --check: [Pass / Fail / Retest required]
- pnpm styleguide:build: [Pass / Fail / Retest required]
- pnpm styleguide:check: [Pass / Fail / Retest required]

Manual QA sections:
- Today: [Pass / Fail / Retest required]
- Nutrition: [Pass / Fail / Retest required]
- Fluid: [Pass / Fail / Retest required]
- Bodyweight: [Pass / Fail / Retest required]
- Food Library: [Pass / Fail / Retest required]
- Goals / targets: [Pass / Fail / Retest required]
- Range placeholders: [Pass / Fail / Retest required]
- Linked mixed Food + Drink: [Pass / Fail / Retest required]
- App restart persistence: [Pass / Fail / Retest required]
- Import/export round-trip: [Pass / Fail / Retest required]
- Invalid import rejection: [Pass / Fail / Retest required]
- Styleguide/token enforcement: [Pass / Fail / Retest required]

Known accepted limitations observed:
- Workout implementation Deferred: [Observed / Not observed / N/A]
- Range modes are placeholders: [Observed / Not observed / N/A]
- Bodyweight correction is delete-and-relog: [Observed / Not observed / N/A]
- Linked mixed projections are read-only/unavailable: [Observed / Not observed / N/A]
- Seeded/default goals not required: [Observed / Not observed / N/A]
- Fluid/carb/fat configurable goals not required: [Observed / Not observed / N/A]
- Bodyweight target comparison not required: [Observed / Not observed / N/A]
- Food Library visual debt non-blocking: [Observed / Not observed / N/A]
- Deleted Fluid/Bodyweight history active-state recovery limitation: [Observed / Not observed / N/A]

Failures:
- [Item, classification, reproduction steps, expected behavior, actual behavior]

Blockers:
- [Open blocker or none]

Retest required:
- [Yes / No]
- Retest scope:
- Reason:

Final release verdict:
[Pass / Fail / Blocker / Retest required]

Verdict rationale:
- Required for V1 checks:
- Accepted limitations:
- Remaining Non-blocking design debt:
- Open Blockers:

Declaration:
Core Tracking V1 is not considered release-ready unless this result records a
Pass verdict on a named build/commit/device or simulator with no open Blockers.
```

## 23. Done Means

MYORIA-480 is done when:

- This manual QA runbook exists.
- The result template exists in this document.
- Pass/fail/blocker/retest criteria are explicit.
- Known accepted limitations are named plainly.
- The document says manual QA execution is still pending.
- Core Tracking V1 is not declared done by this task.
- No production UI, domain, application, persistence, migration, test, Workout,
  route, visual redesign, token, or generated bundle manual edits are made.

After MYORIA-480, the release-readiness status remains:

```text
manual QA runbook ready; manual execution pending
```
