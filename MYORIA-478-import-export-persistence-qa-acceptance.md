# MYORIA-478 Import / Export And Persistence QA Acceptance

## Executive Decision

Status: Required for V1.

Core Tracking V1 accepts the current SQLite persistence foundation for app
restart survival, pending a recorded manual QA pass on the release candidate.

Status: Blocker if found.

The current import/export implementation is not enough to declare the full Core
Tracking V1 data safety gate done. Static source and test review found real
round-trip gaps for the newer Food & Drink Library lifecycle and linked mixed
Food + Drink projections:

- Food & Drink Library records in `foods` and `food_aliases` are not exported
  or restored by the current v1 JSON path.
- Food & Drink Library archived/restored state in `foods.is_archived` and
  `foods.archived_at` is therefore not covered by import/export round-trip.
- `logged_events` are not exported or restored.
- `nutrition_food_logs.logged_event_id` is not part of the current nutrition
  archive record.
- Fluid export can serialize `loggedEventId` on domain objects, but the import
  parser and SQLite restore path do not preserve it.
- Current restore saves imported Nutrition and Fluid rows as independent
  projections, not as linked mixed entries.

Status: Accepted with limitation.

The existing v1 import/export path is still useful as a partial data safety
path for profile, goals, legacy `saved_foods`, active Nutrition log snapshots,
active Fluid entries, active Bodyweight entries, and deleted Nutrition log
state. It must not be documented as a complete Core Tracking V1 round-trip
until manual QA passes and the linked/Food Library gaps are either fixed or
explicitly accepted by product.

Status: Follow-up if rejected.

If Core Tracking V1 requires complete import/export recovery for Food & Drink
Library active/archived/restored state and linked mixed Food + Drink entries,
create the smallest focused implementation issue to extend v1 JSON export,
parse, preview, and restore for `foods`, `food_aliases`, `logged_events`, and
projection linkage metadata. Do not implement that in MYORIA-478.

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

Status: Blocker if found.

The current export does not include the newer Food & Drink Library tables
(`foods`, `food_aliases`) as Food Library records. Exporting only active legacy
`saved_foods` is not enough for the MYORIA-477 Food Library lifecycle.

Status: Blocker if found.

The current export does not include `logged_events`, and Nutrition archive
records do not include `logged_event_id`. Therefore, linked mixed Food + Drink
identity cannot be reconstructed from the current JSON export.

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

Status: Blocker if found.

Current restore cannot restore the newer Food & Drink Library active/archived
lifecycle because the import data shape has only legacy `savedFoods`, not
`foods` and `food_aliases`.

Status: Blocker if found.

Current restore cannot restore linked mixed Food + Drink semantics because it
does not save `logged_events` and does not preserve projection
`logged_event_id` values.

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

Current export/import does not cover:

- `nutrition_food_logs.logged_event_id`
- the canonical `logged_events` row behind a mixed Food + Drink entry
- current Food Library source records in `foods` and aliases in `food_aliases`

Status: Required for V1.

Manual QA must confirm Nutrition entries and totals persist after app restart.

Status: Blocker if found.

Import/export round-trip does not currently preserve linked Nutrition
projection semantics for mixed Food + Drink entries.

## Fluid Data Safety

Status: Accepted with limitation.

Fluid app restart persistence is covered by SQLite `fluid_entries` and active
read paths that exclude deleted rows.

Current export/import covers active Fluid entries in the selected local-day
period. It preserves amount, drink type, timestamp, local day, timezone, source,
confidence, note, and audit timestamps.

Current export/import does not cover:

- deleted Fluid entries, because export reads active Fluid entries only
- `loggedEventId`, because parser and SQLite save do not preserve it
- the canonical `logged_events` row behind mixed Food + Drink entries

Status: Required for V1.

Manual QA must confirm normal Fluid entries and totals persist after app
restart.

Status: Blocker if found.

Import/export round-trip does not currently preserve linked Fluid projection
semantics for mixed Food + Drink entries.

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

Status: Blocker if found.

Current import/export does not cover the newer Food & Drink Library lifecycle.
The v1 export shape includes `savedFoods` from the legacy `saved_foods` table,
not Food & Drink Library records from `foods` and `food_aliases`. It also uses
`SavedFoodRepository.listActive()`, so archived legacy saved foods are omitted.

Status: Follow-up if rejected.

If final Core Tracking V1 data safety requires Food Library round-trip, add a
focused implementation issue to export, preview, parse, restore, and test
`foods` plus `food_aliases`, including active, archived, restored, aliases,
nutrition-only, fluid-only, mixed Food + Drink, and duplicate-detection-relevant
fields.

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

Status: Blocker if found.

Current import/export does not round-trip this linkage. It can round-trip the
Nutrition snapshot and active Fluid projection values as separate records, but
it cannot prove or restore canonical linked lifecycle semantics.

Consequences after import may include:

- Nutrition and Fluid totals still contain restored projection values.
- Projection rows may no longer be recognized as linked projections.
- Linked unavailable edit/delete behavior from MYORIA-473 may not apply after
  restore.
- The canonical mixed event cannot be reconstructed.

Status: Follow-up if rejected.

If linked mixed entries are required in import/export recovery, add a focused
linked-event import/export issue before declaring Core Tracking V1 data safety
done.

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
- New Food & Drink Library records and archived/restored lifecycle do not
  round-trip.
- Linked mixed Food + Drink canonical event linkage does not round-trip.
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

Expected current failures unless fixed or explicitly accepted:

- Food Library active/archived/restored state does not round-trip through the
  current v1 import/export path.
- Linked mixed Nutrition/Fluid projections do not round-trip as linked
  canonical events.
- Deleted Fluid and Bodyweight rows do not round-trip as deleted history.

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

Status: Accepted with limitation.

Existing automated coverage proves many repository and parser behaviors. It
does not currently prove complete Core Tracking V1 import/export round-trip for
Food Library lifecycle or linked mixed entries because the implementation does
not include those fields.

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
  entries round-trip without implementation support.

## Follow-Up Implementation Issue Only If QA Rejects Current Behavior

Status: Follow-up if rejected.

Create a focused implementation issue if release QA or product acceptance
requires complete Core Tracking V1 import/export recovery. Suggested title:

```text
MYORIA-479 preserve Food Library and linked events in v1 import export
```

Minimum scope:

- Export and parse Food & Drink Library `foods` rows.
- Export and parse `food_aliases`.
- Preserve `is_archived` and `archived_at`.
- Export and parse `logged_events`.
- Preserve `nutrition_food_logs.logged_event_id`.
- Preserve `fluid_entries.logged_event_id` through parse and SQLite save.
- Add import preview counts for Food Library and linked events.
- Add round-trip tests for nutrition-only, fluid-only, mixed Food + Drink,
  archived/restored Food Library items, and linked mixed projections.

Out of scope for that follow-up unless explicitly requested:

- Workout acceptance.
- Full database wipe/replace semantics.
- Remote sync/backend.
- Visual redesign.

## Impact On Core Tracking V1 Blockers / Readiness

Status: Blocker if found.

MYORIA-464 should treat MYORIA-478 as a data safety gate that is not fully
ready as-is if complete import/export round-trip is required for Food Library
lifecycle and linked mixed entries.

Status: Accepted for V1.

SQLite app restart persistence remains acceptable pending manual QA. The
current code has strong repository coverage for core active tracking records,
soft-delete filtering, archived Food Library app-state behavior, goals, and
migrations.

Status: Needs manual QA.

Core Tracking V1 cannot be declared done until:

- recorded app restart persistence QA passes
- recorded import/export manual QA passes for supported current behavior
- product either accepts the import/export limitations or a focused follow-up
  implementation issue fixes them

Workout remains Deferred.

## Done Means

Status: Required for V1.

MYORIA-478 is done when:

- this decision document exists and is linked from MYORIA-464
- current SQLite persistence, import, export, validation, and restore behavior
  are documented without guessing
- current automated coverage is named
- manual QA requirements are explicit
- Food Library import/export lifecycle gaps are documented
- linked mixed Food + Drink import/export linkage gaps are documented
- accepted V1 limitations are explicit
- follow-up implementation scope is narrow and conditional
- no production behavior, domain/application behavior, persistence schema,
  migrations, tests, styleguide routes, generated bundles, or Workout work are
  changed by this documentation task

Core Tracking V1 release readiness is not complete until the manual app restart
and import/export QA gates pass, and until the documented blocker-level
round-trip gaps are either accepted by product as V1 limitations or fixed in a
focused follow-up issue.
