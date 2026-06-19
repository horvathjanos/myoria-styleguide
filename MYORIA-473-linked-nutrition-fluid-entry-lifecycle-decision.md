# MYORIA-473 Linked Nutrition + Fluid Entry Lifecycle Decision

## Status

- Ticket: MYORIA-473 / GitHub issue #460
- Scope: product/domain acceptance decision and verification only
- Production UI touched: no
- Domain/application/persistence behavior touched: no
- Styleguide route/source touched: no
- Styleguide documentation touched: yes
- Workout scope: Deferred

## Executive Decision

Status: Accepted for V1, with an explicit limitation.

Core Tracking V1 accepts the current linked Nutrition + Fluid projection
behavior for mixed Food + Drink logs. A mixed Food + Drink log is one canonical
`logged_events` consumed event with a Nutrition projection and a Fluid
projection linked by `logged_event_id`.

For V1, Nutrition and Fluid reports may show those projections as read-only,
non-interactive report rows. Projection-specific edit and delete are not
Required for V1. Independent deletion of either projection is not allowed.

Correction for a wrong mixed Food + Drink entry is Accepted for V1 as
delete-and-relog only when the user can avoid or remove the incorrect entry
through an available non-linked path. Current code does not expose a canonical
linked-entry edit/delete path for existing mixed entries, so V1 accepts this as
a known user-facing limitation rather than claiming full linked correction
support.

If this limitation is rejected later, the Follow-up if rejected is a focused
canonical linked-entry lifecycle slice that edits/deletes the logged event and
both projections together.

## Current Implementation Summary

Status: Accepted for V1.

Reviewed sources and tests show the current implementation is deliberate and
consistent:

- `src/application/consumedItem/LogMixedConsumedItemUseCase.ts` creates one
  canonical consumed logged event, then creates Nutrition and Fluid projection
  IDs from the same submission.
- `src/adapters/persistence/sqlite/consumedItem/SqliteMixedConsumedItemWriteRepository.ts`
  writes `logged_events`, `nutrition_food_logs`, and `fluid_entries` in one
  exclusive transaction.
- `src/adapters/persistence/sqlite/nutrition/nutritionAddFoodPersistence.ts`
  routes mixed Food + Drink Add Food submissions into the mixed consumed-item
  logger.
- `src/application/nutrition/getNutritionDailyScreenModel.ts` marks linked
  Nutrition rows as `unavailable_linked_projection` for edit and delete.
- `src/application/nutrition/UpdateNutritionFoodLogUseCase.ts` refuses linked
  Nutrition edits with `unsupported_entry` / `linked_projection`.
- `src/application/nutrition/softDeleteNutritionFoodLog.ts` refuses linked
  Nutrition deletes with `not_deletable` / `linked_projection`.
- `src/application/fluid/getFluidDailyScreenModel.ts` marks linked Fluid rows
  as `unavailable_linked_projection` for edit and delete.
- `src/application/fluid/UpdateFluidEntryAmountUseCase.ts` refuses linked Fluid
  amount edits with `not_editable` / `linked_projection`.
- `src/application/fluid/DeleteFluidEntryUseCase.ts` refuses linked Fluid
  deletes with `not_deletable` / `linked_projection`.
- UI tests verify linked unavailable rows are visible but non-interactive in
  report day rows when both edit and delete are unavailable.
- Application and persistence tests verify linked projection availability,
  transactionality, day totals, delete refusals, and update refusals.

No production inconsistency was found in the reviewed paths. The known gap is
capability: there is no current user-facing canonical linked-entry edit/delete
flow.

## Canonical Data / Lifecycle Model

Status: Accepted for V1.

The canonical source object/event for a mixed Food + Drink log is the
`logged_events` consumed event created by `LogMixedConsumedItemUseCase`.

The Nutrition row and Fluid row are projections of that event:

- Nutrition projection: `nutrition_food_logs.logged_event_id`
- Fluid projection: `fluid_entries.logged_event_id`

The projections should be treated as report/read-model surfaces, not separate
canonical user actions. Any future edit/delete implementation must preserve
this lifecycle by changing the canonical logged event and both projections
together, or by replacing them together.

## Nutrition Projection Behavior

Status: Accepted for V1.

Nutrition reports include the Nutrition projection from a mixed Food + Drink
entry. The row contributes calories and macros to the Nutrition day totals.

Current behavior:

- shows the mixed item's display name and nutrition snapshot in the day row
- sets `loggedEventId` on the row
- sets `linkageKind` to `linked_unknown_projection`
- sets `editAvailability` to `unavailable_linked_projection`
- sets `deleteAvailability` to `unavailable_linked_projection`
- keeps the row non-interactive when both edit and delete are unavailable

This is acceptable for Core Tracking V1.

## Fluid Projection Behavior

Status: Accepted for V1.

Fluid reports include the Fluid projection from a mixed Food + Drink entry. The
row contributes milliliters to Fluid day totals.

Current behavior:

- shows the mixed item's display name when available, falling back to drink type
  formatting only when no display name exists
- sets `loggedEventId` on the row
- sets `linkageKind` to `linked_unknown_projection`
- sets `editAvailability` to `unavailable_linked_projection`
- sets `deleteAvailability` to `unavailable_linked_projection`
- keeps the row non-interactive when both edit and delete are unavailable

This is acceptable for Core Tracking V1.

## Edit Behavior

Status: Accepted for V1.

Nutrition projections from mixed Food + Drink logs cannot be edited directly in
V1. `UpdateNutritionFoodLogUseCase` rejects linked rows with
`unsupported_entry` / `linked_projection`.

Fluid projections from mixed Food + Drink logs cannot be edited directly in V1.
`UpdateFluidEntryAmountUseCase` rejects linked rows with `not_editable` /
`linked_projection`.

Projection-specific edit is Deferred because editing only one projection would
risk breaking the canonical event lifecycle.

## Delete Behavior

Status: Accepted for V1.

Neither projection can be deleted independently in V1:

- Nutrition linked projection delete returns `not_deletable` /
  `linked_projection`.
- Fluid linked projection delete returns `not_deletable` /
  `linked_projection`.
- UI delete helpers do not refetch or fake success after linked delete refusal.

Independent projection delete remains Deferred. It should not be added later
unless the product intentionally supports splitting a mixed logged event, which
is outside Core Tracking V1.

## Correction Path Accepted For V1

Status: Accepted for V1, with limitation.

The accepted V1 correction path is:

1. If a user notices the item before saving, cancel or adjust the Add Food
   submission before logging it.
2. If the wrong mixed Food + Drink item has already been logged, log the correct
   replacement entry and treat removal of the incorrect linked event as
   Deferred until canonical linked-entry delete exists.
3. If the current app state or local data allows the user to remove the
   incorrect data through a broader non-linked recovery path, delete-and-relog
   is acceptable for V1.

Current code does not expose a projection screen action that deletes the
canonical mixed event and both projections. Therefore, do not describe existing
V1 behavior as full linked delete-and-relog from Nutrition or Fluid reports.

## User-Facing Limitations Accepted For V1

Status: Accepted for V1.

Exact accepted limitation:

> Mixed Food + Drink entries appear in both Nutrition and Fluid reports and
> count toward both totals, but their linked report rows cannot be edited or
> deleted from the Nutrition or Fluid report in Core Tracking V1. Correcting a
> saved mixed entry requires logging the corrected entry and waiting for a
> future linked-entry lifecycle action to remove or replace the original.

This limitation is acceptable because:

- mixed entries are still structured and linked consistently
- reports do not expose unsafe projection-only mutation
- tests confirm direct projection update/delete refusals
- Core Tracking V1 is private-use release readiness, not full correction parity

## Manual QA Checklist

Status: Required for V1.

Before Core Tracking V1 can be declared done, manually verify:

- Create a Food & Drink Library item that contributes to both Nutrition and
  Fluid.
- Log that mixed item through Nutrition Add Food.
- Confirm the Nutrition day report shows the mixed item row.
- Confirm Nutrition day calories/macros include the mixed item.
- Confirm the Fluid day report shows the same mixed item name or linked context.
- Confirm Fluid day milliliters include the mixed item.
- Confirm linked Nutrition and Fluid rows do not expose projection-specific edit
  or delete actions.
- Confirm attempting any reachable linked edit/delete path does not remove only
  one projection.
- Restart the app and confirm both projections and both day totals remain
  consistent.
- Archive/hide the source Food & Drink Library item and confirm historical
  linked Nutrition and Fluid report rows remain intact.
- Log a corrected replacement mixed item and confirm totals reflect both entries
  until a future canonical linked delete exists.
- Record the limitation in release QA notes so it is not mistaken for a missed
  manual test.

Workout remains Deferred and must not be included in this QA decision.

## Automated Checks Required

Status: Required for V1.

The release candidate must keep these checks green:

- `pnpm check:ui-styles`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm format:check`
- `git diff --check`
- `git diff --cached --check`
- `pnpm styleguide:build`
- `pnpm styleguide:check`

Existing relevant automated coverage includes:

- `src/application/consumedItem/__tests__/log-mixed-consumed-item-use-case.test.ts`
- `src/adapters/persistence/sqlite/consumedItem/__tests__/SqliteMixedConsumedItemWriteRepository.test.ts`
- `src/adapters/persistence/sqlite/nutrition/__tests__/nutritionAddFoodLibraryFlow.integration.test.ts`
- `src/application/nutrition/__tests__/getNutritionDailyScreenModel.test.ts`
- `src/application/nutrition/__tests__/updateNutritionFoodLog.test.ts`
- `src/application/nutrition/__tests__/softDeleteNutritionFoodLog.test.ts`
- `src/application/fluid/__tests__/get-fluid-daily-screen-model.test.ts`
- `src/application/fluid/__tests__/update-fluid-entry-amount-use-case.test.ts`
- `src/application/fluid/__tests__/delete-fluid-entry-use-case.test.ts`
- `src/ui/nutrition/NutritionReportScreen/NutritionReportScreen.test.tsx`
- `src/ui/fluid/FluidReportScreen/FluidReportScreen.test.tsx`

No new automated test is required for this docs-only decision.

## Risks / Unknowns

Status: Non-blocking design debt.

- Linked rows are currently classified as `linked_unknown_projection`, which is
  accurate but generic. A later UX pass may want more specific copy such as
  "Food + Drink entry".
- Detail screens contain unavailable-action copy, but report rows are
  non-interactive when both linked actions are unavailable. This is acceptable
  for V1, but the UX should stay consistent if detail access is added later.
- A low-level logged-event repository can soft-delete an event, but current
  reviewed application/UI flows do not expose a canonical linked delete that
  also updates both projections. Treat canonical linked delete as not available
  for V1.
- Import/export behavior for linked entries was not separately proven by this
  decision. It remains covered by the broader Core Tracking V1 import/export
  manual QA gate.

## Follow-Up Implementation Issue Only If Decision Is Rejected Later

Status: Follow-up if rejected.

If read-only linked projections are rejected after V1, create a focused issue:

`MYORIA-### implement canonical mixed Nutrition + Fluid entry lifecycle`

That issue should implement the smallest coherent lifecycle:

- canonical linked entry detail keyed by `logged_event_id`
- canonical delete that soft-deletes the logged event and excludes both
  projections from active Nutrition and Fluid reports/totals
- canonical edit or replace flow that updates both projections consistently
- user-facing copy that makes clear both Nutrition and Fluid will change
- application tests proving no projection can be orphaned or independently
  removed
- SQLite transaction coverage for linked delete/edit
- manual QA for add, edit/replace, delete, app restart, archive source item, and
  import/export if applicable

Independent projection-specific edit/delete should remain out of scope unless a
separate product decision intentionally allows splitting mixed events.

## Impact On Core Tracking V1 Blockers

Status: Accepted for V1.

MYORIA-473 resolves the MYORIA-464 linked Nutrition + Fluid Needs confirmation
item as accepted with limitation.

Core Tracking V1 is not blocked by missing projection-specific edit/delete for
linked mixed entries. It remains blocked by the other MYORIA-464 acceptance
items until those are decided or manually verified:

- recorded manual release QA
- Bodyweight correction acceptance
- range placeholder acceptance
- empty-goals/default target acceptance
- import/export round-trip QA
- required checks staying green

## Done Means...

Status: Required for V1.

This decision is done when:

- this document is committed
- MYORIA-464 points to this decision for the linked Nutrition + Fluid item
- required checks pass
- issue #460 is closed after the commit is pushed
- production UI, domain, application, persistence, migrations, tests, generated
  bundles, and Workout behavior remain unchanged

Core Tracking V1 acceptance outcome for linked Nutrition + Fluid entries:
accepted with limitation.
