# MYORIA-478 Import / Export And Persistence QA Acceptance

## Executive Decision

Status: Required for V1.

Core Tracking V1 accepts the current SQLite persistence foundation for app
restart survival, pending a recorded manual QA pass on the release candidate.

Status: Implemented by MYORIA-479; manual QA still required.

The current import/export implementation now includes focused round-trip
support for the newer Food & Drink Library lifecycle and linked mixed Food +
Drink projections. MYORIA-479 extends the v1 JSON path to include:

- Food & Drink Library records from `foods`.
- Food & Drink Library aliases from `food_aliases`.
- Food & Drink Library archived/restored state through `is_archived` and
  `archived_at`.
- Canonical `logged_events`.
- `nutrition_food_logs.logged_event_id`.
- `fluid_entries.logged_event_id`.
- Import preview counts for Food Library records, aliases, and linked events.

Static automated tests now cover export, parse, preview counts, additive
restore, and SQLite save/list behavior for these fields. Manual import/export
QA is still required before declaring the full Core Tracking V1 data safety
gate done.

Status: Accepted with limitation.

The existing v1 import/export path is still useful as a partial data safety
path for profile, goals, legacy `saved_foods`, active Nutrition log snapshots,
active Fluid entries, active Bodyweight entries, and deleted Nutrition log
state. It must not be documented as a complete Core Tracking V1 round-trip
until manual QA passes and the linked/Food Library gaps are either fixed or
explicitly accepted by product.

Status: Completed follow-up.

MYORIA-479 implemented the focused extension to v1 JSON export, parse, preview,
and restore for `foods`, `food_aliases`, `logged_events`, and projection
linkage metadata. This did not change Workout scope or convert restore into a
full database replacement.

## Current Implementation Summary

Status: Accepted for V1, with limitations.

Reviewed source:

- `src/application/export/ExportV1DataUseCase.ts`
- `src/application/export/ShareV1ExportBundleUseCase.ts`
- `src/application/import/ParseV1JsonImportUseCase.ts`
- `src/application/import/PreviewV1JsonImportUseCase.ts`
- `src/application/import/RestoreV1JsonImportUseCase.ts`
- `src/ui/export/**`
- `src/ui/import/**`
- `src/adapters/export/native/**`
- `src/adapters/import/native/**`
- `src/infrastructure/app/createMyoriaAppDependencies.ts`
- `src/adapters/persistence/sqlite/**`

Current export creates a v1 JSON artifact, CSV files, and an AI handover text
summary for a selected local-day range. Native sharing writes an uncompressed
zip archive to Expo cache and opens the platform share sheet when sharing is
available.

Current import previews one JSON file through the Expo document picker, parses
and validates the v1 export shape, shows counts, and restores parsed records
after explicit confirmation.

The production app wiring exposes both export and import through the
Settings/Data surface. Static review can confirm the use-case wiring, but
device/simulator file picker, cache write, and share sheet behavior remain
Needs manual QA.

## Persistence Lifecycle Model

Status: Accepted for V1.

The app uses local SQLite as the structured source of truth. App restart
persistence is provided by SQLite repositories and migrations, not by
import/export.

Core Tracking V1 app restart persistence must cover:

- Required for V1: Nutrition food logs in `nutrition_food_logs`
- Required for V1: Fluid entries in `fluid_entries`
- Required for V1: Bodyweight entries in `bodyweight_entries`
- Required for V1: Food & Drink Library items and aliases in `foods` and
  `food_aliases`
- Required for V1: Goals in `goals`
- Required for V1: profile data in `user_profiles`
- Required for V1: linked mixed Food + Drink events in `logged_events` plus
  Nutrition and Fluid projection rows

Soft-deleted and archived state is domain-specific:

- Nutrition soft delete: `nutrition_food_logs.deleted_at`
- Fluid soft delete: `fluid_entries.deleted_at`
- Bodyweight soft delete: `bodyweight_entries.deleted_at`
- Food Library archive/hide: `foods.is_archived` and `foods.archived_at`
- Legacy saved food archive: `saved_foods.archived`

## App Restart Persistence Acceptance

Status: Required for V1.

Manual QA must prove that app restart preserves the current SQLite state for
all Core Tracking V1 domains. Static source review shows repositories and tests
for the core SQLite paths, but does not prove a real app lifecycle restart.

Required restart acceptance:

- Nutrition entries persist and active totals still exclude deleted rows.
- Fluid entries persist and active totals still exclude deleted rows.
- Bodyweight entries persist and deleted entries stay excluded.
- Food & Drink Library active items persist.
- Food & Drink Library archived items remain archived and hidden from active
  logging flows.
- Restored Food & Drink Library items remain active.
- Goals persist, including superseded history and active target selection.
- Linked mixed Food + Drink projections remain linked and still contribute to
  Nutrition and Fluid totals.
- Profile timezone/unit preference data persists where configured.

Status: Needs manual QA.

Record device/simulator, build/commit, date, timezone, and tester before
claiming this gate.

## Export Behavior

Status: Accepted with limitation.

Current v1 JSON export includes:

- `version: 1`
- `generatedAt`
- selected `period`
- optional `profile`
- all goals from `GoalRepository.list()`
- exercises from `ExerciseRepository.list()`
- active legacy saved foods from `SavedFoodRepository.listActive()`
- active Bodyweight entries in the selected local-day period
- Nutrition food log archive records in the selected timestamp range, including
  deleted Nutrition rows
- active Fluid entries in the selected local-day period
- Workout sessions in the selected period

Status: Deferred.

Workout appears in the current export artifact because the implementation
already supports it, but Workout remains outside Core Tracking V1 acceptance.
MYORIA-478 does not require Workout QA and does not reopen Workout scope.

Status: Implemented by MYORIA-479.

Current export includes the newer Food & Drink Library records from `foods`,
aliases from `food_aliases`, canonical `logged_events`, and linkage metadata on
Nutrition and Fluid projections. Legacy `savedFoods` remains present for
backward-compatible legacy saved food recovery.

## Import / Restore Behavior

Status: Accepted with limitation.

Current restore saves parsed records through existing repository boundaries:

- profile
- exercises
- legacy saved foods
- goals
- Bodyweight entries
- Nutrition food log archive records
- Fluid entries
- Workout sessions

Restore is additive/upsert-style through repository `save` methods. It is not a
full database replacement and does not clear existing data before import.

Status: Needs manual QA.

Manual QA must prove failed restore does not leave the app in a user-visible
corrupt state. Static review shows preview validation before restore, but
restore itself is a sequence of repository saves rather than one cross-domain
transaction.

Status: Implemented by MYORIA-479.

Current restore saves imported Food & Drink Library records and aliases through
the Food Library repository, saves imported `logged_events`, and then restores
Nutrition and Fluid projection rows with their original `logged_event_id`
values. Restore remains additive/upsert-style and does not clear unrelated
tables.

## Import Preview / Validation Behavior

Status: Accepted for V1.

Current preview validates before persistence:

- rejects non-JSON artifacts by filename and MIME type when MIME type is
  provided
- rejects malformed JSON
- rejects unsupported versions other than `1`
- rejects inverted import periods
- requires v1 arrays such as `goals`, `exercises`, `savedFoods`,
  `bodyWeightEntries`, `fluidEntries`, and `workoutSessions`
- parses optional `nutritionFoodLogs` as backward-compatible empty data when
  omitted
- counts legacy `foodEntries` as ignored compatibility data
- validates Bodyweight and Fluid `localDay` from timestamp plus timezone
- validates Workout `startedLocalDay` from timestamp plus timezone
- validates Nutrition manual/catalog food reference consistency

Status: Needs manual QA.

Preview UI must be tested with invalid files, unsupported version files, and a
real app-generated export. Failed preview must not show a restore action for
invalid data.

## Nutrition Data Safety

Status: Accepted with limitation.

Nutrition app restart persistence is covered by SQLite `nutrition_food_logs`
and existing active/deleted filtering paths.

Current export/import covers:

- manual snapshot Nutrition logs
- catalog-backed Nutrition logs as snapshot records
- calculated calorie and macro snapshot values
- optional nutrition label snapshot fields
- `deletedAt` for Nutrition logs

Current export/import now covers `nutrition_food_logs.logged_event_id`, the
canonical `logged_events` row behind a mixed Food + Drink entry, and current
Food Library source records in `foods` plus aliases in `food_aliases`.

Status: Required for V1.

Manual QA must confirm Nutrition entries and totals persist after app restart.

Status: Implemented by MYORIA-479; manual QA still required.

Import/export round-trip now preserves linked Nutrition projection metadata for
mixed Food + Drink entries.

## Fluid Data Safety

Status: Accepted with limitation.

Fluid app restart persistence is covered by SQLite `fluid_entries` and active
read paths that exclude deleted rows.

Current export/import covers active Fluid entries in the selected local-day
period. It preserves amount, drink type, timestamp, local day, timezone, source,
confidence, note, and audit timestamps.

Current export/import still does not cover:

- deleted Fluid entries, because export reads active Fluid entries only

Status: Required for V1.

Manual QA must confirm normal Fluid entries and totals persist after app
restart.

Status: Implemented by MYORIA-479; manual QA still required.

Import/export round-trip now preserves linked Fluid projection metadata for
mixed Food + Drink entries.

Status: Accepted with limitation.

Deleted Fluid entries are excluded from export because current export uses the
active Fluid repository. For V1 this can be accepted only if product defines
import/export as active-state recovery rather than audit-complete history.

## Bodyweight Data Safety

Status: Accepted with limitation.

Bodyweight app restart persistence is covered by SQLite `bodyweight_entries`
and active read paths that exclude deleted rows.

Current export/import covers active Bodyweight entries in the selected
local-day period. The export range is computed from local days and then
filtered back by each entry's `localDay`.

Current export/import does not include deleted Bodyweight entries because the
repository export path lists only active rows.

Status: Required for V1.

Manual QA must confirm Bodyweight entries/latest state persist after app
restart and delete-and-relog remains the accepted V1 correction path from
MYORIA-474.

Status: Accepted with limitation.

Deleted Bodyweight entries being absent from import/export is acceptable for V1
only if the data safety promise is active tracking recovery, not full audit
history.

## Food Library Data Safety

Status: Required for V1.

App restart persistence must cover the MYORIA-477 Food & Drink Library
lifecycle: active items, archived items, restored items, aliases, nutrition
contribution, fluid contribution, and mixed Food + Drink definitions.

Status: Implemented by MYORIA-479; manual QA still required.

Current import/export covers the newer Food & Drink Library lifecycle through
`foods` and `food_aliases`, including active, archived/restored state, aliases,
nutrition-only definitions, fluid-only definitions, and mixed Food + Drink
definitions. Legacy `savedFoods` still exports active legacy saved foods.

## Goals Data Safety

Status: Accepted for V1.

Current app restart persistence uses SQLite `goals`.

Current export/import covers all goals from `GoalRepository.list()`, including:

- calorie targets
- protein targets
- bodyweight targets
- training-priority goals
- active, superseded, completed, and cancelled statuses when present
- start/end local days
- source, confidence, note, and audit timestamps

Status: Required for V1.

Manual QA must confirm goals persist across app restart and round-trip through
import/export for the V1 goal types.

## Linked Mixed Food + Drink Data Safety

Status: Required for V1.

App restart persistence must keep mixed Food + Drink entries linked through
`logged_events`, `nutrition_food_logs.logged_event_id`, and
`fluid_entries.logged_event_id`.

Status: Implemented by MYORIA-479; manual QA still required.

Current import/export round-trips linked mixed Food + Drink event linkage by
exporting/restoring `logged_events`, `nutrition_food_logs.logged_event_id`, and
`fluid_entries.logged_event_id`. Imported mixed projections remain linked and
therefore continue to follow the MYORIA-473 unavailable projection-specific
edit/delete behavior.

## Deleted / Archived / Restored State Behavior

Status: Accepted with limitation.

Current deleted/archived behavior by domain:

- Nutrition deleted state is exported and restored through `deletedAt`.
- Fluid deleted state is not exported because only active Fluid rows are read.
- Bodyweight deleted state is not exported because only active Bodyweight rows
  are read.
- Legacy `saved_foods.archived` can be parsed/restored for imported
  `savedFoods`, but current export lists only active saved foods.
- New Food & Drink Library archived/restored state is not exported or restored.
- Goals have status values, and all goals are exported/restored.

Status: Required for V1.

Manual restart QA must prove deleted and archived state remains correct in the
original SQLite app state.

Status: Blocker if found.

Import/export should not be described as preserving Food Library archived or
restored state until `foods.is_archived` and `foods.archived_at` are included.

## Local-Day / Timezone Behavior

Status: Accepted with limitation.

Current behavior is good enough for V1 static acceptance, pending manual QA:

- Bodyweight export uses local-day input to compute a timestamp range and then
  filters exported entries by stored `localDay`.
- Nutrition export uses the same timestamp range used for Bodyweight.
- Fluid export uses stored `localDay` range directly.
- Import validates Bodyweight and Fluid local days against timestamp plus
  timezone.
- Import validates Workout started local day against timestamp plus timezone,
  although Workout remains deferred for Core Tracking V1.
- Nutrition food logs do not store local day; day grouping is derived from
  `loggedAt` and caller-supplied timezone in read models.

Status: Needs manual QA.

Release QA must test entries near local-day boundaries where practical. If full
boundary testing is not practical, record that as a targeted follow-up QA item
rather than assuming it passed.

## Accepted V1 Limitations

Status: Accepted with limitation.

Accepted only if product defines v1 import/export as partial active-data
recovery:

- Import/export is JSON-only for restore; CSV and AI handover artifacts are
  export/read artifacts, not restore inputs.
- Restore is additive/upsert-style and does not wipe existing data first.
- Restore is not one cross-domain transaction.
- Deleted Nutrition state is preserved; deleted Fluid and deleted Bodyweight
  rows are omitted.
- Legacy active saved foods round-trip; archived legacy saved foods are omitted
  by current export.
- New Food & Drink Library records and archived/restored lifecycle round-trip
  through MYORIA-479.
- Linked mixed Food + Drink canonical event linkage round-trips through
  MYORIA-479.
- Import/export includes Workout artifacts in current code, but Workout is
  Deferred and not part of the Core Tracking V1 gate.
- Nutrition local day is derived at read time from `loggedAt` and timezone, not
  stored in the Nutrition export record.

## Manual QA Checklist

Status: Required for V1.

Setup:

- Record device/simulator, build/commit, date, timezone, and tester.
- Start from a clean install or known clean test database.
- Confirm app opens without migration errors.
- Confirm Settings/Data import/export surfaces are reachable.

Create test data:

- Log Nutrition manual entry.
- Log Nutrition catalog-backed Food Library item.
- Log mixed Food + Drink item that creates linked Nutrition and Fluid
  projections.
- Log normal Fluid entry.
- Log Bodyweight entry.
- Create Food Library nutrition-only item.
- Create Food Library fluid-only item.
- Create Food Library mixed Food + Drink item.
- Edit at least one Food Library item.
- Archive at least one Food Library item.
- Restore at least one Food Library item.
- Create calorie goal.
- Create protein goal.
- Create bodyweight goal if supported.
- Create training-priority goal if supported.
- Delete at least one Nutrition entry if supported.
- Delete at least one Fluid entry if supported.
- Delete and relog one Bodyweight entry.

App restart persistence:

- Restart the app.
- Confirm Nutrition entries and totals persist.
- Confirm Fluid entries and totals persist.
- Confirm Bodyweight entries/latest state persist.
- Confirm Food Library active items persist.
- Confirm Food Library archived/restored state persists.
- Confirm Goals persist.
- Confirm linked mixed Nutrition/Fluid projections persist and remain linked.
- Confirm deleted entries remain excluded from active totals/lists.
- Confirm archived Food Library items remain hidden from active logging flows.
- Confirm restored Food Library items are active again.

Export:

- Export current data for a range that includes all test data.
- Confirm export completes without crash.
- Confirm generated bundle includes JSON, CSV files, and AI handover summary.
- Confirm native share/save flow opens successfully.
- Confirm export does not require Workout QA.

Import / restore:

- Import the exported JSON into a clean state or supported restore target.
- Confirm import preview shows understandable counts.
- Confirm restore/import completes without crash.
- Confirm Nutrition data round-trips.
- Confirm Fluid data round-trips.
- Confirm Bodyweight data round-trips.
- Confirm Goals round-trip.
- Confirm Today renders correctly after import.
- Confirm report screens render correctly after import.

Expected current limitations:

- Deleted Fluid and Bodyweight rows do not round-trip as deleted history.
- Manual QA must still verify Food Library active/archived/restored state and
  linked mixed Nutrition/Fluid projections in a release build.

Invalid import:

- Try an invalid file.
- Confirm invalid import is rejected safely.
- Try unsupported version if feasible.
- Confirm unsupported version is rejected safely.
- Confirm failed import does not overwrite existing data.

Local-day / timezone:

- Verify entries near local-day boundaries appear on expected report day if
  practical.
- Confirm stored local-day/timezone behavior is good enough for V1.
- If full boundary testing is not practical, document it as a targeted
  follow-up QA item.

## Automated Checks Required

Status: Required for V1.

Required release-candidate checks:

```text
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

Targeted persistence/import-export tests discovered for MYORIA-478 include:

- `src/application/export/__tests__/export-v1-data-use-case.test.ts`
- `src/application/export/__tests__/share-v1-export-bundle-use-case.test.ts`
- `src/application/import/__tests__/parse-v1-json-import-use-case.test.ts`
- `src/application/import/__tests__/preview-v1-json-import-use-case.test.ts`
- `src/application/import/__tests__/restore-v1-json-import-use-case.test.ts`
- `src/adapters/persistence/sqlite/nutrition/__tests__/SqliteNutritionFoodLogArchiveRepository.test.ts`
- `src/adapters/persistence/sqlite/nutrition/__tests__/softDeleteNutritionFoodLogByIdInSqlite.test.ts`
- `src/adapters/persistence/sqlite/fluid/__tests__/SqliteFluidEntryRepository.test.ts`
- `src/adapters/persistence/sqlite/bodyweight/__tests__/SqliteBodyWeightEntryRepository.test.ts`
- `src/adapters/persistence/sqlite/food/__tests__/SqliteFoodDrinkLibraryRepository.test.ts`
- `src/adapters/persistence/sqlite/food/__tests__/SqliteSavedFoodRepository.test.ts`
- `src/adapters/persistence/sqlite/goal/__tests__/SqliteGoalRepository.test.ts`
- `src/adapters/persistence/sqlite/consumedItem/__tests__/SqliteMixedConsumedItemWriteRepository.test.ts`
- `src/adapters/persistence/sqlite/loggedEvent/__tests__/SqliteLoggedEventRepository.test.ts`
- `src/adapters/persistence/sqlite/migrations/__tests__/runSqliteMigrations.test.ts`
- `src/adapters/persistence/sqlite/migrations/__tests__/loggedEventsMigration.integration.test.ts`

Status: Implemented by MYORIA-479; manual QA still required.

Existing automated coverage proves many repository and parser behaviors. It
now includes focused coverage for Food Library lifecycle and linked mixed
entry import/export fields. It still does not replace release-device manual QA.

## Risks / Unknowns

Status: Needs manual QA.

- Native document picker behavior on the release device/simulator.
- Native share/save sheet behavior on the release device/simulator.
- App restart persistence after a real process restart.
- Local-day boundary behavior in the app environment.
- Restore behavior into a non-empty database, because restore is additive.

Status: Blocker if found.

- Any data loss in existing SQLite app state after restart.
- Any migration error on clean or existing install.
- Any import failure that overwrites existing data after invalid preview.
- Any import/export claim that says Food Library lifecycle or linked mixed
  entries passed release QA before manual QA has been recorded.

## MYORIA-479 Implementation Record

Status: Implemented; manual QA still required.

MYORIA-479 implemented the focused Core Tracking V1 import/export recovery
extension:

```text
MYORIA-479 preserve Food Library and linked events in v1 import export
```

Completed scope:

- Export and parse Food & Drink Library `foods` rows.
- Export and parse `food_aliases`.
- Preserve `is_archived` and `archived_at`.
- Export and parse `logged_events`.
- Preserve `nutrition_food_logs.logged_event_id`.
- Preserve `fluid_entries.logged_event_id` through parse and SQLite save.
- Add import preview counts for Food Library and linked events.
- Add focused tests for Food Library export/restore state, aliases, linked
  event export/restore, and projection linkage preservation.

Out of scope for that follow-up unless explicitly requested:

- Workout acceptance.
- Full database wipe/replace semantics.
- Remote sync/backend.
- Visual redesign.

## Impact On Core Tracking V1 Blockers / Readiness

Status: Implemented by MYORIA-479; manual QA still required.

MYORIA-464 should treat the previously documented Food Library and linked mixed
entry import/export gaps as implemented in code, pending release-device manual
QA.

Status: Accepted for V1.

SQLite app restart persistence remains acceptable pending manual QA. The
current code has strong repository coverage for core active tracking records,
soft-delete filtering, archived Food Library app-state behavior, goals, and
migrations.

Status: Needs manual QA.

Core Tracking V1 cannot be declared done until:

- recorded app restart persistence QA passes
- recorded import/export manual QA passes for supported current behavior
- product accepts the remaining active-data limitations, especially deleted
  Fluid and Bodyweight history being omitted from import/export

Workout remains Deferred.

## Done Means

Status: Required for V1.

MYORIA-478 is done when:

- this decision document exists and is linked from MYORIA-464
- current SQLite persistence, import, export, validation, and restore behavior
  are documented without guessing
- current automated coverage is named
- manual QA requirements are explicit
- Food Library import/export lifecycle implementation status is documented
- linked mixed Food + Drink import/export linkage implementation status is
  documented
- accepted V1 limitations are explicit
- MYORIA-479 implementation scope is recorded as focused and complete pending
  manual QA
- no Workout work is added

Core Tracking V1 release readiness is not complete until the manual app restart
and import/export QA gates pass, and until product accepts the remaining
active-data limitations.
