# MYORIA-477 Food Library Functional QA Acceptance

## Status

- Ticket: MYORIA-477 / GitHub issue #464
- Scope: functional QA and release acceptance documentation only
- Production UI touched: no
- Domain/application/persistence behavior touched: no
- Styleguide route/source touched: no
- Workout scope: Deferred

## Executive Decision

Status: Accepted for V1, pending manual QA.

Food & Drink Library basics are functionally acceptable for Core Tracking V1 if
the manual QA checklist in this document passes on the release candidate.

Current source and tests support create, edit, archive/hide, restore, active and
archived list scopes, list/search filtering, duplicate warnings on create, mixed
Food + Drink catalog definitions, and Add Food logging for nutrition-capable
library items. Archive/hide removes items from normal active library and
Nutrition Add Food flows without mutating historical nutrition log snapshots.

Status: Accepted with limitation.

Mixed Food + Drink item logging is accepted only within the MYORIA-473 linked
Nutrition + Fluid lifecycle limitation: mixed entries can create linked
Nutrition and Fluid projections, but those linked report rows are read-only for
Core Tracking V1 and cannot be edited or deleted independently from projection
screens.

Status: Non-blocking design debt.

Food Library detail and create/edit forms retain older visual grammar. MYORIA-456
classifies that as design debt, not a Core Tracking V1 blocker, unless functional
QA finds overlap, unusable controls, failed validation, or broken lifecycle
behavior.

## Current Implementation Summary

Status: Accepted for V1.

Reviewed source and tests show these current behaviors:

- `FoodDrinkLibraryScreenContainer` owns the local list/detail/form route state,
  active/archived scope, search query, create/edit values, duplicate warning,
  dirty-discard confirmation, and archive/restore pending state.
- `FoodDrinkLibraryFormScreen` exposes editable fields for name, aliases, note,
  contribution profile, nutrition basis, required calories/macros, optional
  nutrition label values, serving/package metadata, and fluid contribution.
- `createFoodDrinkLibraryUseCases` creates and updates records through a
  repository boundary, preserving existing lifecycle state on update.
- `SqliteFoodDrinkLibraryRepository` persists food rows and aliases in SQLite,
  lists active and archived scopes separately, archives/restores by updating only
  lifecycle columns, and finds duplicate candidates across active and archived
  items.
- `nutritionAddFoodPersistence` searches and logs only active, non-deprecated,
  importable, nutrition-capable catalog foods from normal Nutrition Add Food.
- Catalog-backed nutrition logs persist immutable snapshot fields such as
  `display_name_snapshot`, amount, and calculated nutrition values.
- Mixed Food + Drink Add Food submissions route through the canonical linked
  consumed-item boundary described by MYORIA-473.

## Food Library Lifecycle Model

Status: Accepted for V1.

The Food & Drink Library lifecycle has two user-visible states:

- Active: available in the active library scope and normal eligible logging
  flows.
- Archived: hidden from normal active library/search/logging flows, visible in
  the Archived library scope, and restorable.

The lifecycle action names are:

- Active item action: `Hide from logging`
- Archived item action: `Restore to logging`

Archive/hide is not hard delete. Existing logs are expected to remain unchanged.
Restore clears `is_archived` and `archived_at`, making the item active again.

## Create Behavior

Status: Accepted for V1, pending manual QA.

The form can create these contribution profiles:

- Required for V1: nutrition-only item by keeping `Calories & macros` selected
  and `Fluids` unselected.
- Required for V1: fluid-only item by unselecting `Calories & macros`,
  selecting `Fluids`, and entering a positive fluid contribution.
- Required for V1: mixed Food + Drink item by selecting both contribution
  toggles and entering both nutrition values and a positive fluid contribution.

Validation requires:

- name
- at least one contribution profile
- nutrition basis when nutrition is enabled
- kcal, protein, carbs, and fat when nutrition is enabled
- non-negative optional nutrition and serving numbers
- serving metadata for `per_serving` nutrition when no unit, gram amount, or
  milliliter amount is present
- positive fluid contribution when fluid is enabled

Source and tests support field-local validation display. Manual QA must confirm
that all three create profiles can be saved in the app build and appear in the
expected active list/search flows.

## Edit Behavior

Status: Accepted for V1, pending manual QA.

Existing items can be opened from detail and edited through the same form. The
editable fields are:

- display name
- aliases
- note
- counts toward Nutrition
- counts toward Fluid
- nutrition basis
- kcal, protein, carbs, fat
- saturated fat, sugar, fiber, polyols, salt
- serving size in grams
- serving size in milliliters
- serving unit
- fluid contribution in milliliters

Status: Accepted with limitation.

Edit does not run the create duplicate warning flow. Current duplicate warning
behavior is create-only. This is acceptable for V1 unless manual QA finds that
editing can create confusing or unsafe duplicate catalog definitions.

Cancel from a dirty create/edit form opens discard confirmation. Clean cancel
returns create to the list and edit to detail. Manual QA must confirm cancel
preserves prior data and save updates active list/search and future logging
behavior.

## Duplicate Warning Behavior

Status: Accepted for V1.

Duplicate warning exists for create. It checks normalized display name and
aliases against existing normalized display names and aliases across both active
and archived library items. The warning displays candidate names and marks
archived candidates with `Archived`.

Status: Accepted with limitation.

Duplicate detection is normalized exact-term matching, not broad fuzzy matching.
It does not block intentional save: the user can cancel or choose `Save anyway`.
This is understandable enough for Core Tracking V1, with manual QA required for
the visible warning flow.

## Archive / Hide Behavior

Status: Accepted for V1, pending manual QA.

Active item detail exposes `Hide from logging`. Tapping it opens a local inline
confirmation with the accepted copy:

```text
Hide from logging?

This item will no longer appear in normal logging search.
Existing logs will not change.
```

Confirming hide calls the archive use case, updates the same detail screen to
Archived state, hides the confirmation, reloads the list, and keeps the user in
context. The repository updates only `is_archived`, `archived_at`, and
`updated_at`.

## Restore Behavior

Status: Accepted for V1, pending manual QA.

Archived item detail exposes `Restore to logging`. Restore runs without a
confirmation, clears archived state through the restore use case, reloads the
list, and keeps the user on the same detail screen.

Restore should make the item available again in the active Food Library scope
and any normal logging flow for which the item is eligible.

## Active vs Archived List/Search Behavior

Status: Accepted for V1.

The list has `ACTIVE` and `ARCHIVED` scopes. Repository list queries filter by
`is_archived`, exclude deprecated rows, exclude non-importable rows, and exclude
temporary-log origin rows.

Search is scoped to the selected active or archived state. It matches display
name and non-deprecated aliases. UI tests cover active/archived controls, empty
states, search wiring, long-name row layout, and nutrition/fluid/mixed row
secondary lines.

Manual QA must confirm switching scopes, searching, and opening detail from each
scope do not crash on the release candidate.

## Historical Log Integrity Behavior

Status: Accepted for V1, pending manual QA.

Historical nutrition logs are snapshot-based. Catalog-backed selected food logs
write the food id plus immutable snapshot fields for display name, amount, unit,
match metadata, and calculated nutrition values. Nutrition report models and
totals use the persisted snapshot values.

Archive/hide updates only the source food row lifecycle state. It does not
delete or rewrite existing `nutrition_food_logs`. Existing tests also cover
snapshot independence from later food changes and totals calculated from log
snapshot values rather than current food values.

Manual QA must still verify that a logged catalog item remains visible in the
Nutrition day report after the source item is hidden, and remains visible after
app restart.

## Mixed Food + Drink Item Behavior

Status: Accepted with limitation.

The library supports mixed definitions where an item counts toward both
Nutrition and Fluid. List/detail/form surfaces render mixed contribution state,
SQLite persistence saves both contribution flags and fluid contribution, and
Nutrition Add Food can log mixed items through the canonical mixed consumed-item
boundary.

When logged through the current mixed path:

- Nutrition projection contributes calories/macros.
- Fluid projection contributes milliliters.
- Both projections share one logged event.
- Projection edit/delete remains unavailable for Core Tracking V1 under
  MYORIA-473.

Status: Needs manual QA.

Manual QA must confirm that a mixed item created in Food Library appears in
Nutrition Add Food, can be logged with a supported amount, appears in both
Nutrition and Fluid reports, and follows the accepted linked-entry unavailable
behavior.

## Add Food / Logging Interaction

Status: Accepted for V1.

Nutrition Add Food search and recent results include active, non-deprecated,
importable items that count toward nutrition. It excludes archived items,
fluid-only items, temporary-log rows, and zero-fluid rows.

Nutrition-only and mixed items can be available in Nutrition Add Food if their
basis and serving metadata support the selected amount/unit. Fluid-only items
are valid Food Library items but are not expected to appear in normal Nutrition
Add Food because they do not count toward nutrition.

Status: Accepted with limitation.

There is no requirement in Core Tracking V1 for a separate Fluid Add Food
catalog picker for fluid-only library items. Fluid-only library creation is
accepted as catalog/lifecycle support, while normal fluid logging remains the
existing Fluid flow unless a future issue expands catalog-backed fluid selection.

## Accepted V1 Limitations

Status: Accepted with limitation.

- Duplicate warning is create-only.
- Duplicate detection is normalized exact display-name/alias matching, not broad
  fuzzy matching.
- Fluid-only Food Library items are not expected in Nutrition Add Food.
- Mixed Food + Drink linked projections are read-only from Nutrition and Fluid
  reports under MYORIA-473.
- Piece and portion amounts are not supported for mixed Food + Drink logging
  when fluid scaling would be ambiguous.
- Mixed fluid scaling needs serving volume or serving weight for volume/weight
  amount conversion.
- Food Library detail and form visual grammar can remain legacy if functional QA
  passes.
- Automated coverage supports behavior, but final release acceptance still
  requires a recorded manual QA pass.

## Non-Blocking Design Debt

Status: Non-blocking design debt.

MYORIA-456 remains accepted for Core Tracking V1:

- detail summary sections use older card/action grammar
- detail action buttons are heavier than current report/detail grammar
- create/edit inputs, toggles, basis controls, confirmation boxes, and bottom
  actions are older form grammar
- full Food Library detail/form redesign is deferred until focused styleguide
  contracts exist

This debt becomes a blocker only if manual QA finds functional failures such as
unusable scrolling, hidden fields, inaccessible actions, broken validation, text
overlap that prevents operation, or lifecycle controls that cannot be completed.

## Manual QA Checklist

Status: Required for V1.

Record device/simulator, build/commit, date, timezone, and tester before this
checklist.

Food Library list/search:

- Active Food Library list loads.
- Search filters active items.
- Long item names and aliases remain usable enough for V1.
- Archived scope/list loads.
- Switching active/archived scopes does not crash.
- Opening detail from active and archived scopes works.

Create:

- Create a nutrition-only item.
- Create a fluid-only item.
- Create a mixed Food + Drink item.
- Required validation appears for missing name.
- Required validation appears when neither contribution profile is selected.
- Required validation appears for missing/invalid nutrition values.
- Required validation appears for missing/invalid fluid contribution.
- Saved item appears in active list/search.
- Nutrition-only item is available in Nutrition Add Food where expected.
- Mixed item is available in Nutrition Add Food where expected.
- Fluid-only item does not need to appear in Nutrition Add Food.

Edit:

- Edit display name.
- Edit aliases.
- Edit default serving / amount metadata.
- Edit nutrition contribution.
- Edit fluid contribution.
- Edit mixed item contribution.
- Cancel clean edit returns to detail.
- Cancel dirty edit preserves previous data after discard.
- Save edit updates active list/search.
- Save edit updates future logging behavior.
- Existing historical logs remain snapshot-stable after editing the source item.

Duplicate warning:

- Duplicate name warning appears on create for an existing active item.
- Duplicate alias warning appears on create if supported by the entered data.
- Duplicate warning can include an archived candidate.
- Duplicate warning does not block intentional save when `Save anyway` is used.
- Duplicate warning behavior is understandable enough for V1.
- Edit duplicate warning absence is acceptable unless QA rejects it.

Archive / hide:

- Archive or hide an active item.
- Hide confirmation appears with existing-log preservation copy.
- Archived item leaves normal active list/search.
- Archived nutrition-capable item is not available in normal Nutrition Add Food.
- Attempting to log an archived nutrition-capable item from a stale selection
  fails safely if reachable.
- Existing historical Nutrition logs remain visible after archive/hide.
- Existing historical mixed Nutrition and Fluid projections remain visible after
  archive/hide.
- App restart preserves archived state and historical logs.

Restore:

- Restore an archived item.
- Restored item appears in active list/search.
- Restored nutrition-capable item is available again in Nutrition Add Food.
- Restored mixed item is available again in Nutrition Add Food.
- Restored item can be hidden again.
- App restart preserves restored state.

Mixed Food + Drink:

- Log a mixed item from Nutrition Add Food using a supported amount/unit.
- Nutrition report shows the mixed item row.
- Nutrition totals include the mixed item.
- Fluid report shows the linked mixed item row/context.
- Fluid totals include the mixed item.
- Linked rows follow the MYORIA-473 unavailable edit/delete limitation.

## Automated Checks Required

Status: Required for V1.

The release candidate must keep these checks green:

```text
pnpm check:ui-styles
pnpm lint
```

Recommended before final release declaration:

```text
pnpm typecheck
pnpm test
pnpm format:check
git diff --check
git diff --cached --check
```

Relevant automated coverage reviewed for this decision includes:

- `src/ui/nutrition/FoodDrinkLibrary/__tests__/FoodDrinkLibraryScreen.test.tsx`
- `src/adapters/persistence/sqlite/food/__tests__/SqliteFoodDrinkLibraryRepository.test.ts`
- `src/adapters/persistence/sqlite/nutrition/__tests__/nutritionAddFoodPersistence.test.ts`
- `src/adapters/persistence/sqlite/nutrition/__tests__/nutritionAddFoodLibraryFlow.integration.test.ts`
- `src/adapters/persistence/sqlite/nutrition/__tests__/insertNutritionFoodLogDraftIntoSqlite.test.ts`
- `src/adapters/persistence/sqlite/nutrition/__tests__/calculateNutritionFoodLogTotalsByLoggedAtRange.test.ts`
- `src/application/nutrition/__tests__/getNutritionDailyScreenModel.test.ts`
- `src/application/consumedItem/__tests__/log-mixed-consumed-item-use-case.test.ts`
- `src/adapters/persistence/sqlite/consumedItem/__tests__/SqliteMixedConsumedItemWriteRepository.test.ts`

No new automated test is required for this docs-only decision.

## Risks / Unknowns

Status: Needs manual QA.

- Full create/edit/archive/restore behavior has not been manually verified on a
  release candidate in this document.
- UI tests are component-level and do not replace simulator/device QA for long
  forms, keyboard behavior, scrolling, and dirty-discard interactions.
- Restore availability in Add Food is strongly implied by the active-state SQL
  filters and restore repository behavior, but still needs manual QA.
- Historical Fluid projection stability after archiving a mixed source item is
  covered by the linked snapshot model and MYORIA-473 decision, but still needs
  manual app QA.
- Import/export preservation of Food Library archive state and historical logs
  remains part of the broader Core Tracking V1 import/export QA gate.

## Follow-Up Implementation Issue Only If QA Rejects Current Behavior

Status: Follow-up if rejected.

Do not create an implementation issue unless manual QA finds a functional
blocker or product rejects an accepted limitation.

Smallest likely follow-up issues:

- If create/edit validation fails or saves unsafe data: fix Food Library form
  validation and save mapping.
- If restore does not make eligible items available again: fix active-state
  filters or restore persistence for Food Library items.
- If archive/hide mutates historical logs: fix archive behavior to preserve log
  snapshots and add regression coverage.
- If fluid-only catalog-backed logging is required: add a focused Fluid catalog
  selection/logging slice.
- If edit duplicate warning is required: add duplicate warning to edit without
  blocking intentional save.
- If MYORIA-473 linked limitation is rejected: add canonical linked-entry
  lifecycle edit/delete for mixed Food + Drink logs.
- If detail/form visuals prevent operation: add the smallest usability fix, not
  a broad visual redesign.

## Impact On Core Tracking V1 Blockers / Readiness

Status: Accepted for V1.

MYORIA-477 resolves the Food Library functional QA acceptance decision for
Core Tracking V1. Food Library basics are not a code blocker if manual QA passes
with the accepted limitations above.

Status: Required for V1.

Core Tracking V1 still cannot be declared done until the Food Library manual QA
items in this document are run and recorded as part of the broader MYORIA-464
release checklist.

Status: Blocker if found.

Food Library becomes a Core Tracking V1 blocker only if manual QA finds data
loss, historical log mutation, unreliable active/archived state, inability to
create/edit required contribution profiles, inability to hide/restore items, or
logging availability that contradicts the accepted V1 behavior.

## Done Means

Status: Required for V1.

MYORIA-477 is done when:

- this decision document exists and is referenced by Core Tracking V1 release
  readiness work
- source/test review supports the accepted create/edit/archive/restore behavior
- Food Library visual debt remains classified as non-blocking
- accepted V1 limitations are named plainly
- no production behavior changes were made for this documentation task
- final release manual QA includes and passes this document's Food Library
  checklist
- follow-up implementation work is created only if QA rejects current behavior
  or finds a real blocker
