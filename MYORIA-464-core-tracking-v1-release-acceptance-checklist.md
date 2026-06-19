# MYORIA-464 Core Tracking V1 Release Acceptance Checklist

## Status

- Ticket: MYORIA-464 / GitHub issue #459
- Scope: release-readiness and product acceptance documentation only
- Production UI touched: no
- Domain/application/persistence behavior touched: no
- Styleguide route/source touched: no
- Workout scope: explicitly deferred outside Core Tracking V1

## Executive Verdict

Core Tracking V1 can be treated as release-ready only after the acceptance
decisions and QA gates in this document pass.

Current `main` has the necessary foundations for Today, Nutrition, Fluid,
Bodyweight, Food Library basics, goals, SQLite persistence, and import/export.
MYORIA-463 did not find a broad missing feature area outside the intentionally
deferred Workout milestone. The remaining release risk is decision and proof
work:

- linked Nutrition + Fluid entries need an explicit V1 correction/delete
  acceptance decision
- Bodyweight direct edit versus delete-and-relog needs an explicit V1 correction
  acceptance decision
- goals/default target behavior needs first-run acceptance
- Week/Month/Year/All range placeholders need explicit acceptance or a focused
  implementation slice
- import/export and app restart persistence need a recorded manual QA pass
- styleguide token enforcement must stay green

Until those points are resolved and recorded, Core Tracking V1 is close but not
done.

## Definition Of Core Tracking V1

Core Tracking V1 is the private iOS-first structured tracking milestone for the
non-workout daily loop. It covers:

- Today as the root daily tracking surface
- Nutrition day logging, day report, entry detail, edit/delete where supported,
  Add Food, and catalog-backed food logging
- Fluid logging, day report, entry detail, amount edit/delete where supported,
  and linked fluid projections from mixed Food + Drink items
- Bodyweight logging, day/report display, entry detail, and delete
- Food & Drink Library basics: active/archived list scopes, search, create,
  edit, archive/hide, restore, and mixed nutrition/fluid item support where
  already implemented
- goals/targets used by Today and tracking summaries
- local SQLite persistence, migrations, app restart survival, and import/export
  recovery paths that already exist in the app
- manual release QA for empty, partial, full, deleted, linked, restarted, and
  imported/restored states

Core Tracking V1 does not mean the whole historical MVP is complete. It is the
release boundary for structured tracking excluding Workout and later AI/chat
power.

## Explicit Workout Deferral

Status: Deferred.

Workout implementation is intentionally deferred to a separate milestone and is
not a blocker for Core Tracking V1. Today may continue to show a quiet Workout
surface or navigation affordance, but Core Tracking V1 acceptance must not
require:

- live workout sessions
- workout history completion
- set/rep/weight entry UX
- exercise templates or plans
- progression tracking
- advanced workout analytics
- workout styleguide migration

Manual QA should verify that Today's Workout surface does not block Nutrition,
Fluid, Bodyweight, Food Library, Settings/Data, or release-critical navigation.

## Release Acceptance Checklist By Domain

### Today

Status: Accepted for V1, with manual QA required.

- Accepted for V1: Today screen token/styleguide baseline is accepted. MYORIA-470
  records no remaining blocking Today parity contract gaps after the Today token
  and styleguide enforcement work.
- Accepted for V1: Today empty-state semantics are accepted. Daily accumulating
  domains show zero-valued totals; missing point/object domains remain empty:
  Nutrition `0 / target`, Fluid `0 / 3 L`, Bodyweight `-` with `Not logged`,
  and Workout `No workouts yet`.
- Accepted for V1: Today navigation to Nutrition, Fluid, Bodyweight, and Workout
  surfaces is acceptable, with Workout treated as deferred when opened.
- Required for V1: manually QA Today empty day, partial day, and full day states.
- Required for V1: manually QA Today after app restart with logged Nutrition,
  Fluid, Bodyweight, Food Library, profile, and goal data.

### Nutrition

Status: Required for V1, with one linked-entry decision.

- Accepted for V1: the user can log food through manual nutrition logging and
  the Add Food/catalog-backed flow.
- Accepted for V1: the user can inspect Nutrition report entries through entry
  detail snapshots.
- Accepted for V1: the user can delete normal/manual Nutrition entries through
  the existing soft-delete flow.
- Accepted for V1: manual Nutrition entry edit/correction is functionally
  sufficient for V1.
- Needs confirmation: linked Nutrition + Fluid entries are currently visible as
  projections but projection-specific edit/delete is unavailable. V1 must either
  accept that limitation or require a canonical linked-entry lifecycle slice.
- Accepted for V1 if confirmed: linked entries may remain inspectable/read-only
  from projection screens, with explanatory unavailable behavior and no
  projection-specific edit/delete.
- Required for V1 if rejected: implement canonical linked mixed-entry
  detail/edit/delete behavior before release.
- Accepted for V1: Add Food and Food Library basics are sufficient if manual QA
  proves search, selection, long names, logging, and mixed Food + Drink rows.

Exact linked-entry limitations accepted only if product confirms the current
behavior:

- a mixed Food + Drink item may create Nutrition and Fluid projections
- projection rows can show linked data and source context
- Nutrition cannot independently edit or delete only the Nutrition side of the
  linked event
- Fluid cannot independently edit or delete only the Fluid side of the linked
  event
- correction requires deleting/relogging through an accepted canonical path or
  avoiding linked mixed-item correction in V1

### Fluid

Status: Required for V1, with linked-entry behavior tied to Nutrition.

- Accepted for V1: the user can log fluid with presets and custom amounts.
- Accepted for V1: the user can inspect Fluid report entries through entry
  detail snapshots.
- Accepted for V1: the user can delete normal Fluid entries.
- Accepted for V1: amount-only Fluid edit is sufficient for normal entries.
- Needs confirmation: linked fluid entries from mixed Food + Drink items are
  acceptable as currently implemented only if linked projection edit/delete
  unavailability is accepted for Nutrition too.
- Required for V1: manually QA Fluid totals after add, edit, delete, linked
  projection display, and app restart.

### Bodyweight

Status: Required for V1, with direct-edit decision.

- Accepted for V1: the user can log bodyweight.
- Accepted for V1: the user can inspect Bodyweight report entries through entry
  detail snapshots.
- Accepted for V1: the user can delete Bodyweight entries from report/detail
  and selected-day surfaces.
- Needs confirmation: direct Bodyweight edit is not currently visible. V1 must
  explicitly accept delete-and-relog correction or require a Bodyweight edit
  slice.
- Accepted for V1 if confirmed: delete-and-relog is enough for private V1
  Bodyweight correction.
- Required for V1 if rejected: add focused amount/timestamp edit for Bodyweight
  report detail.
- Accepted for V1: missing Bodyweight states are accepted when they render as
  the Today missing marker plus `Not logged`, and report/selected-day empty
  states remain understandable in manual QA.

### Food Library Basics

Status: Required for V1; visual debt is non-blocking.

- Accepted for V1: create item is functionally sufficient if manual QA can
  create nutrition-only, fluid-only, and mixed items supported by the current
  form.
- Accepted for V1: edit item is functionally sufficient if manual QA confirms
  aliases, serving metadata, nutrition contribution, fluid contribution, and
  duplicate warning behavior.
- Accepted for V1: archive/hide and restore are functionally sufficient if
  historical logs remain intact and archived items leave normal logging results.
- Non-blocking design debt: Food Library detail and create/edit forms retain
  older visual grammar. MYORIA-456 and MYORIA-466 classify this as debt pending
  dedicated detail/form contracts, not a Core Tracking V1 release blocker.
- Required for V1: manually QA active scope, archived scope, search, create,
  edit, duplicate warning, archive/hide, restore, and logging availability
  after restore.

### Goals / Targets / Defaults

Status: Required for V1; default policy needs confirmation.

- Accepted for V1: configurable goals exist for calories, protein, bodyweight,
  and training priority.
- Accepted for V1: Today can display active targets from configured goals and
  fallback target grammar where implemented.
- Needs confirmation: seeded/default goals are not documented as required.
- Accepted for V1 if confirmed: empty-goals first-run state is acceptable as
  long as Today and goal-setting surfaces remain understandable and fallback
  nutrition/fluid targets behave as expected.
- Required for V1 if rejected: add a focused seed/default goal slice before
  release.
- Required for V1: manually QA first-run/empty goals, configured calorie target,
  configured protein target, configured bodyweight target, training-priority
  entry, superseding an active goal of the same type, and Today target updates.

### Range Reports

Status: Needs confirmation; recommended acceptance is Deferred.

- Accepted for V1 if confirmed: Week/Month/Year/All report modes may remain
  quiet placeholders for Nutrition, Fluid, and Bodyweight.
- Deferred if accepted: range aggregation, charts, advanced analytics, and
  cross-range insight implementation move out of Core Tracking V1.
- Required for V1 if rejected: implement the smallest useful range slices:
  Nutrition total calories/macros by range, Fluid total liters by range,
  Bodyweight latest/average trend by range, and tests for empty and populated
  ranges.

Recommendation: accept placeholders for V1. Day reports plus Today are the core
tracking loop, and MYORIA-463 found the placeholders consistent and tested.

### Data Safety / Import-Export / Persistence

Status: Required for V1 manual QA.

- Required for V1: clean install opens without migration errors.
- Required for V1: existing install migration opens without data loss.
- Required for V1: app restart preserves Nutrition, Fluid, Bodyweight, Food
  Library, profile, and goals data.
- Required for V1: soft-deleted entries stay excluded from active totals and
  visible active lists.
- Required for V1: local-day and timezone-sensitive entries appear on the
  expected day.
- Accepted for V1: import/export exists and is in scope as a data safety path.
- Required for V1: export/import round-trip manual QA must pass with Nutrition,
  Fluid, Bodyweight, saved foods, profile, and goals data.
- Required for V1: import preview must reject invalid files and unsupported
  versions before restore.

### Styleguide / Token Enforcement

Status: Required for V1 checks; known debt accepted where classified.

- Required for V1: `pnpm check:ui-styles` must pass.
- Required for V1: `pnpm lint` must pass.
- Required for V1: new UI work must use `src/ui/theme/styleguideContract.ts`,
  existing primitives, documented contracts, or justified allowlist entries.
- Accepted for V1: the current allowlist can remain when every entry is
  classified with a reason and the checker passes.
- Non-blocking design debt: Food Library detail/form, Fluid/Bodyweight add/edit
  workflows, app shell/menu, settings/data utility panels, and older logging
  panels remain classified debt unless manual QA finds functional defects.

## Blockers

These block declaring Core Tracking V1 done:

- Required for V1: this acceptance checklist must exist and be referenced by
  release-readiness work.
- Required for V1: a recorded manual QA pass must cover Today, Nutrition, Fluid,
  Bodyweight, Food Library, goals, import/export, persistence, app restart, and
  navigation.
- Accepted for V1: linked Nutrition + Fluid projection edit/delete behavior is
  accepted with limitation by
  `docs/styleguide/MYORIA-473-linked-nutrition-fluid-entry-lifecycle-decision.md`.
- Needs confirmation: Bodyweight delete-and-relog correction must be accepted or
  direct edit must be implemented.
- Needs confirmation: range placeholders must be accepted or minimal range
  reports must be implemented.
- Needs confirmation: empty-goals/default target behavior must be accepted or a
  seed/default goal slice must be implemented.
- Required for V1: `pnpm check:ui-styles` and `pnpm lint` must pass on the
  release candidate.
- Required for V1: import/export round-trip manual QA must pass if the app keeps
  import/export as the V1 data safety path.

## Accepted Deferrals

- Deferred: Workout implementation and workout styleguide migration.
- Deferred: advanced workout history, active sessions, templates, progression,
  and workout analytics.
- Deferred if confirmed: Week/Month/Year/All range report implementation beyond
  placeholders.
- Deferred: advanced charts, plateau detection, advanced analytics, and AI
  insights.
- Deferred: photo recognition, wearable integrations, remote sync/backend, and
  provider/model-specific AI work.
- Deferred: deep Food Library visual redesign and full food item form redesign
  unless manual QA finds functional blockers.
- Deferred: broad style-token allowlist reduction unrelated to release-critical
  surfaces.

## Non-Blocking Design Debt

The following debt is accepted for Core Tracking V1 if manual QA finds no
functional defect:

- Food Library detail uses older card/action grammar.
- Food item create/edit form uses older form/input/toggle grammar.
- Fluid and Bodyweight add/edit workflows retain older rounded/domain-colored
  controls.
- App shell/menu and some Settings/Data utility panels remain visually legacy.
- Entry detail surfaces are quieter than older forms but still lack shared
  snapshot primitives.
- Range placeholders are intentionally empty.
- Current style-token allowlist entries remain as classified debt under
  `scripts/ui-style-token-allowlist.json`.

## Manual QA Checklist

Record device/simulator, build/commit, date, timezone, and tester before running
this checklist.

### App And Persistence

- Clean install opens without migration errors.
- Existing install opens after migration with previous data intact.
- App restart preserves logged Nutrition, Fluid, Bodyweight, Food Library,
  profile, and goals data.
- Entries near local-day boundaries appear on the correct report day.
- Empty first-run states are understandable.

### Today

- Empty Today shows Nutrition `0 / target`, Fluid `0 / 3 L`, Bodyweight missing,
  and Workout empty state.
- Partial day with only Nutrition updates Nutrition and leaves other domains
  coherent.
- Partial day with only Fluid updates Fluid and leaves other domains coherent.
- Partial day with only Bodyweight shows logged value and time.
- Full day with Nutrition, Fluid, and Bodyweight renders without overlap.
- Tapping Nutrition opens the Nutrition report.
- Tapping Fluid opens the Fluid report.
- Tapping Bodyweight opens the Bodyweight report.
- Tapping Workout does not block release-critical tracking, with Workout
  deferred.
- Food & Drink Library and Settings/Data remain reachable.

### Nutrition

- Manual food logging works with validation, pending, save, and error handling.
- Add Food default state loads.
- Add Food search works.
- Long food names and metadata remain overflow-safe.
- Catalog-backed selected-food logging works.
- Mixed Food + Drink logging creates visible Nutrition and Fluid projections.
- Manual Nutrition entry detail opens.
- Manual Nutrition edit, cancel, validation, save, and delete work.
- Catalog-backed read-only behavior matches current app copy.
- Linked entry unavailable behavior matches the accepted V1 decision.
- Deleted Nutrition entries disappear from active day totals after refresh and
  app restart.

### Fluid

- Add Fluid works with presets.
- Add Fluid works with custom amount.
- Fluid day totals update after add.
- Fluid entry detail opens for editable entries.
- Amount edit, cancel, validation, save, and delete work.
- Linked mixed Fluid rows show linked context.
- Linked mixed Fluid rows follow the accepted V1 unavailable/edit/delete
  decision.
- Deleted Fluid entries disappear from active day totals after refresh and app
  restart.

### Bodyweight

- Add Weight works with validation and cancel.
- Bodyweight day/report state updates after add.
- Bodyweight entry detail opens.
- Delete confirmation appears.
- Delete works and updates report/Today after refresh and app restart.
- Delete-and-relog or direct edit behavior matches the accepted V1 decision.
- Missing Bodyweight states remain clear on Today and report surfaces.

### Food Library

- Active and archived scopes switch correctly.
- Search works.
- Create nutrition-only item if supported by current form.
- Create fluid-only item if supported by current form.
- Create mixed Food + Drink item if supported by current form.
- Duplicate warning appears and still allows save.
- Edit preserves existing values and saves changed values.
- Archive/hide removes an item from normal logging.
- Restore makes the item available again.
- Historical logs remain intact after archive/hide.

### Goals / Targets

- First-run empty goal state is acceptable or defaults are present.
- Calorie target can be set and Today updates.
- Protein target can be set and Today updates.
- Bodyweight target can be set and relevant screens remain coherent.
- Training-priority goal can be set without making Workout a V1 blocker.
- Superseding an active goal of the same type works without deleting history.
- App restart preserves active goals and Today target display.

### Import / Export

- Export can generate the v1 JSON bundle for a selected range.
- Export can generate CSV files and AI handover summary for a selected range.
- Native share/save flow opens successfully.
- Import preview rejects invalid files.
- Import preview rejects unsupported versions.
- Import preview shows expected counts for a real export.
- Restore imports profile, goals, saved foods, Nutrition logs, Fluid entries,
  and Bodyweight entries.
- Restored data appears in Today and report screens.
- Restored data remains after app restart.

### Styleguide / Visual Sanity

- Today empty, partial, and full states fit without overlapping text.
- Nutrition, Fluid, and Bodyweight report rows remain quiet, unframed, and
  readable.
- Add Food rows keep fixed trailing kcal/value areas with long names.
- Food Library rows remain readable in active and archived scopes.
- Known legacy detail/form surfaces are usable enough for V1.

## Automated Check Requirements

Required on every Core Tracking V1 release candidate:

```text
pnpm check:ui-styles
pnpm lint
```

Recommended before final release declaration, even though not required for this
MYORIA-464 documentation-only change:

```text
pnpm typecheck
pnpm test
pnpm format:check
git diff --check
```

## Recommended Final Implementation Issue Sequence

Do not create these automatically. This sequence keeps the remaining path
decision-led and avoids turning Core Tracking V1 into a broad roadmap.

1. `MYORIA-473 Decide linked Nutrition + Fluid lifecycle acceptance for V1`
2. `MYORIA-474 Decide Bodyweight correction path for V1`
3. `MYORIA-475 Decide range placeholder acceptance for V1`
4. `MYORIA-476 Decide goals/default targets acceptance for V1`
5. `MYORIA-477 Verify Food Library create/edit/archive functional QA`
6. `MYORIA-478 Verify Nutrition release flows and linked-entry behavior`
7. `MYORIA-479 Verify Fluid release flows and linked-entry behavior`
8. `MYORIA-480 Verify Bodyweight release flows and correction behavior`
9. `MYORIA-481 Verify V1 import/export recovery round trip`
10. `MYORIA-482 Run Core Tracking V1 full manual QA pass`
11. `MYORIA-483 Publish Core Tracking V1 release notes and known limitations`

If linked-entry correction, Bodyweight direct edit, range reports, or default
goals are rejected as current behavior, insert the smallest focused
implementation issue immediately after its decision issue and before full
manual QA.

## Risks / Unknowns

- Needs confirmation: linked mixed-entry correction/delete acceptance is the
  highest-impact product unknown.
- Needs confirmation: Bodyweight delete-and-relog may be acceptable for private
  V1, but it is weaker than Nutrition and Fluid correction.
- Needs confirmation: empty-goals first-run behavior may feel unfinished if no
  default targets are present.
- Needs confirmation: range placeholders may be acceptable for private V1, but
  release notes must name the deferral.
- Risk: import/export has automated coverage, but real app-environment
  round-trip QA can still expose share, file, or restore issues.
- Risk: older docs still mention Workout and chat/AI as MVP expectations; later
  documentation alignment may be needed after acceptance decisions.
- Risk: styleguide allowlist debt is visible and managed, but future UI changes
  can still regress if they bypass `pnpm check:ui-styles`.

## Done Means

Core Tracking V1 is done when:

- Workout is explicitly documented as deferred and no Core Tracking V1 gate
  depends on Workout implementation.
- Today token/styleguide baseline and empty-state semantics are accepted.
- Nutrition, Fluid, Bodyweight, Food Library basics, goals/targets, persistence,
  and import/export meet the accepted V1 behavior in this checklist.
- Linked-entry, Bodyweight correction, range placeholder, and goal default
  decisions are resolved as either accepted current behavior or focused
  implementation work that has shipped.
- The full manual QA checklist has been run and recorded on a release candidate.
- `pnpm check:ui-styles` and `pnpm lint` pass.
- Known limitations and accepted deferrals are documented in release notes or a
  current release-readiness document.

Only then should Core Tracking V1 be called release-ready.
