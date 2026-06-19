# MYORIA-474 Bodyweight Correction Behavior Decision

## Status

- Ticket: MYORIA-474 / GitHub issue #461
- Scope: product/domain acceptance decision and verification only
- Production UI touched: no
- Domain/application/persistence behavior touched: no
- Styleguide route/source touched: no
- Styleguide documentation touched: yes
- Workout scope: Deferred

## Executive Decision

Status: Accepted for V1, with an explicit limitation.

Core Tracking V1 accepts the current Bodyweight correction behavior as-is:
Bodyweight entries can be logged, inspected, and deleted, but direct
Bodyweight edit is not currently implemented or reachable from the reviewed UI.

Delete-and-relog is Accepted for V1 as the Bodyweight correction path. Direct
amount edit and timestamp edit/correction are Deferred. Bodyweight is a simple
point measurement in private Core Tracking V1, so removing the incorrect point
and logging the corrected point is sufficient for release readiness if manual
QA passes.

If delete-and-relog is rejected later, the Follow-up if rejected is a focused
Bodyweight edit slice that supports direct amount correction and, if product
requires it, timestamp correction from Bodyweight report detail.

## Current Implementation Summary

Status: Accepted for V1.

Reviewed sources and tests show the current Bodyweight lifecycle is deliberate
and consistent:

- `src/application/bodyweight/LogBodyWeightUseCase.ts` creates structured
  Bodyweight entries with value, unit, occurred-at timestamp, local day,
  timezone, source, confidence, optional protocol, optional note, and audit
  timestamps.
- `src/application/bodyweight/GetBodyWeightSelectedDayModelUseCase.ts` reads
  active entries for a selected local day, sorts latest first, and exposes a
  selected-day model with `logged` and `not_logged` states.
- `src/application/bodyweight/DeleteBodyWeightEntryUseCase.ts` deletes entries
  through the Bodyweight repository and returns `deleted`, `already_deleted`,
  or `not_found`.
- `src/adapters/persistence/sqlite/bodyweight/SqliteBodyWeightEntryRepository.ts`
  stores Bodyweight entries as canonical kilogram rows, filters active lists by
  `deleted_at IS NULL`, and soft-deletes by setting `deleted_at` and
  `updated_at`.
- `src/ui/bodyweight/BodyweightReportScreen/BodyweightReportScreen.tsx` exposes
  day report, add-weight workflow, entry detail, and delete confirmation states.
- `src/ui/bodyweight/BodyweightReportScreen/BodyweightEntryDetailScreen.tsx`
  exposes entry snapshot and delete action, with no visible edit action.
- `src/ui/bodyweight/BodyWeightSelectedDayScreen.tsx` exposes the older
  selected-day logging panel and latest-entry delete action.
- `src/ui/today/buildTodayRamsBraunViewModel.ts` renders missing Bodyweight as
  `Not logged` and logged Bodyweight as `Logged HH:mm`.

No production inconsistency was found in the reviewed paths. The known gap is
capability: direct Bodyweight edit and timestamp correction are not exposed.

## Bodyweight Lifecycle Model

Status: Accepted for V1.

The Bodyweight entry is a structured point measurement:

- the canonical value is persisted in kilograms
- `occurredAt` is the measurement timestamp
- `localDay` is derived from the measurement timestamp and timezone
- active report and Today surfaces read only non-deleted entries
- correction for V1 is modeled as deleting the incorrect point and logging a
  replacement point

This lifecycle keeps structured data as the source of truth and avoids adding a
partial edit model only for release acceptance.

## Logging Behavior

Status: Required for V1.

The user can log Bodyweight entries.

Current reachable logging paths:

- Bodyweight report day mode exposes `ADD WEIGHT`.
- The report add workflow accepts a kg value, validates positive finite input,
  submits with `source: 'manual'`, `confidence: 'precise'`, `unit: 'kg'`, and
  `occurredAt: clock.now()`, then refetches the selected-day model.
- The selected-day Bodyweight screen accepts manual kg input and logs with an
  occurred-at timestamp generated for the selected local day.
- Application code can accept explicit `occurredAt`, source, confidence,
  measurement protocol, note, and lb input, but those richer fields are not all
  reachable from the current production UI.

Manual QA must prove logging updates Bodyweight report and Today.

## Inspection / Detail Behavior

Status: Required for V1.

The user can inspect Bodyweight entries.

Current reachable inspection paths:

- Bodyweight report day mode shows selected-day entries with display name,
  `Logged HH:mm`, kg value, and navigation affordance when detail navigation is
  wired.
- Entry detail opens from report rows when `onOpenEntryDetail` is provided.
- Detail shows the formatted kg value and local logged time.
- Today opens the Bodyweight report from the Bodyweight summary.

Manual QA must verify the detail opens in the app environment because this
decision is based on static source and automated test review, not a fresh
simulator pass.

## Delete Behavior

Status: Required for V1.

The user can delete Bodyweight entries.

Current reachable delete paths:

- Bodyweight report detail shows `Delete entry`, local confirmation, `Keep
  entry`, and destructive `Delete` actions.
- Bodyweight report deletion uses `deleteBodyweightReportEntry`, calls the
  Bodyweight delete submitter, and refetches the selected-day model after a
  successful delete.
- The selected-day Bodyweight screen can delete the latest selected-day entry
  after a native confirmation alert.
- Persistence performs soft delete and excludes deleted entries from active
  range reads.

Manual QA must prove deletion updates Today and report after refresh and app
restart.

## Direct Edit Behavior

Status: Deferred.

Direct Bodyweight edit is not currently implemented or reachable in the
reviewed Bodyweight UI.

Evidence:

- Bodyweight entry detail tests explicitly assert the detail snapshot renders
  without visible `Edit entry` copy.
- `BodyweightEntryDetailScreen` exposes delete controls only.
- `BodyWeightEntryRepository` exposes `save`, `listByOccurredAtRange`, and
  `deleteById`; there is no Bodyweight update/edit repository contract.
- `src/application/bodyweight/**` contains log, read, and delete use cases, but
  no direct Bodyweight update use case.
- Searches of the Bodyweight application, UI, and SQLite adapter paths found no
  reachable Bodyweight edit/update workflow beyond input state for logging.

Direct edit is not Required for V1.

## Correction Path Accepted For V1

Status: Accepted for V1.

The accepted V1 correction path is delete-and-relog:

1. Open the Bodyweight report for the affected day.
2. Open the incorrect Bodyweight entry detail when supported.
3. Delete the incorrect entry and confirm deletion.
4. Log a replacement Bodyweight entry with the corrected kg value.
5. Refresh or revisit Today/report and confirm the latest value and entry list
   reflect the corrected active data.

If correcting from the older selected-day screen, delete the latest incorrect
selected-day entry and log the corrected kg value for that selected day.

This is accepted because Bodyweight is a simple point measurement in private
V1, deleted entries are excluded from active views, and current tests cover the
core log/read/delete behavior.

## Timestamp Correction Decision

Status: Deferred.

Timestamp correction is not Required for V1.

Current code supports timestamped Bodyweight entries at the application and
domain level, and tests cover explicit `occurredAt` handling and local-day
boundaries. However, the reviewed report add workflow uses `clock.now()` and
does not expose a timestamp field. The selected-day screen can log for a
selected local day, but it is not a direct timestamp edit/correction flow.

For V1, the accepted limitation is that Bodyweight correction fixes the active
measurement value by delete-and-relog. Precise timestamp correction remains
Deferred unless product later rejects that limitation.

## Missing-State Behavior

Status: Accepted for V1.

Missing Bodyweight states are accepted for V1 when they remain understandable:

- Today renders the missing point measurement as the missing marker visually
  with `Not logged` detail.
- Bodyweight report day mode renders `Not logged`, `0 logged`, `No entries for
  this day`, and the body copy `Add a bodyweight entry when there is something
  to log.`
- Selected-day Bodyweight renders `No bodyweight logged for this day yet.`

This matches MYORIA-471: Bodyweight is a point-in-time measurement, not a daily
accumulating total.

## User-Facing Limitations Accepted For V1

Status: Accepted for V1.

Exact accepted limitation:

> Bodyweight entries can be added, viewed, and deleted in Core Tracking V1, but
> an existing Bodyweight entry cannot be edited directly. To correct a
> Bodyweight value, delete the incorrect entry and log the corrected value
> again. Precise timestamp editing is not part of Core Tracking V1.

This limitation is acceptable for private V1 because:

- the user can preserve active data correctness through delete-and-relog
- deleted entries are excluded from active Today/report reads
- Bodyweight is a low-frequency point measurement
- direct edit can be added later as a focused slice without changing the
  release definition for Nutrition, Fluid, Today, or persistence

## Manual QA Checklist

Status: Required for V1.

Before Core Tracking V1 can be declared done, manually verify:

- Empty Bodyweight Today state renders the accepted missing marker and
  `Not logged`.
- Bodyweight report/day empty state is understandable.
- Logging a Bodyweight entry works from the report add workflow.
- Today updates with the logged Bodyweight value and `Logged HH:mm`.
- Bodyweight report shows the logged entry.
- Bodyweight entry detail opens if supported in the app navigation path.
- Bodyweight delete confirmation appears from detail.
- Bodyweight delete works if supported in the app navigation path.
- Deleting an entry updates Today and report after refresh.
- Delete-and-relog correction works as the accepted V1 path.
- App restart preserves logged, deleted, and relogged Bodyweight state.
- Local-day/timezone behavior is correct enough for V1, including entries near
  local-day boundaries.
- Missing Bodyweight states remain clear after deleting the only entry for a
  day.

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

- `src/application/bodyweight/__tests__/log-body-weight-use-case.test.ts`
- `src/application/bodyweight/__tests__/delete-body-weight-entry-use-case.test.ts`
- `src/application/bodyweight/__tests__/get-body-weight-selected-day-model-use-case.test.ts`
- `src/adapters/persistence/sqlite/bodyweight/__tests__/SqliteBodyWeightEntryRepository.test.ts`
- `src/adapters/persistence/sqlite/bodyweight/__tests__/bodyweightEntrySchema.integration.test.ts`
- `src/adapters/persistence/sqlite/bodyweight/__tests__/mapBodyWeightEntryRow.test.ts`
- `src/ui/bodyweight/BodyweightReportScreen/BodyweightReportScreen.test.tsx`
- `src/ui/bodyweight/hooks/__tests__/submitBodyWeightManualEntry.test.ts`
- `src/ui/bodyweight/hooks/__tests__/deleteBodyWeightLatestEntry.test.ts`
- `src/ui/bodyweight/hooks/__tests__/useBodyWeightSelectedDayModel.test.ts`
- `src/ui/today/TodayShell.test.tsx`
- `src/ui/today/buildTodayRamsBraunViewModel.test.ts`

No new automated test is required for this docs-only decision.

## Risks / Unknowns

Status: Non-blocking design debt.

- Manual QA still needs to confirm the app navigation wiring opens Bodyweight
  entry detail and returns cleanly after delete.
- Manual QA still needs to confirm Today/report refresh behavior in a real app
  environment after delete-and-relog and app restart.
- The report add workflow logs with `clock.now()`, so a user cannot directly
  correct a precise timestamp there.
- The selected-day Bodyweight screen is older visual grammar and remains known
  design debt, but it does not create a Core Tracking V1 correction blocker.
- This decision does not evaluate range reports; Week/Month/Year/All remain a
  separate acceptance decision.

## Follow-Up Implementation Issue Only If Decision Is Rejected Later

Status: Follow-up if rejected.

If delete-and-relog is rejected later, create one focused implementation issue:

`MYORIA-XXX implement Bodyweight direct edit for Core Tracking V1`

Minimum scope:

- add a Bodyweight update use case and repository contract
- update the SQLite adapter without changing unrelated persistence behavior
- expose amount edit from Bodyweight report detail
- decide whether timestamp edit is included or remains separate
- keep deleted-entry filtering and local-day behavior intact
- add focused application, adapter, and UI tests

Do not include Workout, range reports, Nutrition, Fluid, Food Library redesign,
or broad visual cleanup in that follow-up.

## Impact On Core Tracking V1 Blockers

Status: Accepted for V1.

MYORIA-474 resolves the MYORIA-464 Bodyweight correction blocker by accepting
delete-and-relog as the V1 correction behavior.

Bodyweight direct edit is no longer a Core Tracking V1 blocker. Timestamp
correction is no longer a Core Tracking V1 blocker.

Remaining Core Tracking V1 blockers still include recorded manual QA and the
other unresolved acceptance decisions tracked outside this document.

## Done Means

Status: Required for V1.

This decision is done when:

- the Bodyweight correction behavior is documented as delete-and-relog for V1
- direct Bodyweight edit is documented as Deferred
- timestamp correction is documented as Deferred
- MYORIA-464 points to this decision instead of leaving Bodyweight correction as
  unresolved
- the required automated checks pass for this docs-only change
- the MYORIA-474 issue is closed after the commit is pushed

Core Tracking V1 can declare the Bodyweight correction blocker resolved only
after the manual QA checklist in this document passes on the release candidate.
