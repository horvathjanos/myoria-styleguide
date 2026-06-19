# MYORIA-470 Today Styleguide Parity Enforcement

Issue: #456 / MYORIA-470

Date: 2026-06-19

## Executive Verdict

Today production now enforces the remaining contract-backed parity gaps found
after MYORIA-469. Changes were limited to Today display formatting, Today RN
style-token mappings, and this documentation.

No styleguide source, report screens, domain logic, application use cases,
persistence, or allowlist entries were changed.

## Source-of-Truth Docs Read

- `docs/styleguide/app/src/screens/TodayScreenPage.tsx`
- `docs/styleguide/screens.css`
- `docs/styleguide/components.css`
- `docs/styleguide/tokens.css`
- `docs/styleguide/MYORIA-435-today-production-parity-audit.md`
- `docs/styleguide/MYORIA-439-today-production-visual-qa.md`
- `docs/styleguide/MYORIA-466-react-native-ui-token-enforcement.md`
- `docs/styleguide/MYORIA-469-today-token-visual-parity-qa.md`
- `docs/styleguide/readout-contract-v1.md`
- `docs/styleguide/screen-composition-contract-v1.md`
- `docs/styleguide/MYORIA-437-workout-dashboard-contract.md`
- `src/ui/theme/styleguideContract.ts`
- `scripts/ui-style-token-allowlist.json`
- `src/ui/today/**`

The requested `docs/styleguide/MYORIA-466-rn-token-enforcement.md` path does
not exist; the repository contains the same ticket as
`docs/styleguide/MYORIA-466-react-native-ui-token-enforcement.md`.

## Top Rhythm Rule And Production Mapping

Source rule:

- `screens.css`: `.my-screen` uses `--my-screen-padding-top`; `.my-root-header`
  uses `min-height: --my-top-context-slot-height` and
  `margin-bottom: --my-top-identity-body-gap`.
- `screen-composition-contract-v1.md`: root date is the top identity; identity
  to first body section must use shared tokens, not route-specific patches.
- `MYORIA-469`: production intentionally uses compact density for top identity
  gap, `uiScreen.topIdentityBodyGapCompact` / `uiSpacing.x5` = 24, while the
  styleguide preview defaults to comfortable density.

Production mapping:

- `TodayRamsBraunLayout.styles.ts` keeps the iOS compact safe-area padding and
  header `minHeight: uiAction.minHeight`.
- Header `marginBottom` remains `uiSpacing.x5`, matching the compact
  top-identity-body gap documented in MYORIA-469.

Change made: none.

## Date Color Rule And Production Mapping

Source rule:

- `screens.css`: `.my-root-date` uses `--my-color-text-secondary` and
  `--my-type-root-date-*`.
- `tokens.css`: `--my-color-text-secondary` maps to Anthracite.

Production mapping:

- `TodayRamsBraunLayout.styles.ts` uses `uiColors.textSecondary` and
  `uiTypography.rootDate`.

Change made: none.

## Bodyweight Metadata Rule And Production Mapping

Source rule:

- `TodayScreenPage.tsx`: Bodyweight visible detail is `Logged 07:12`.
- `readout-contract-v1.md`: Bodyweight approved root example uses
  `Logged 07:12`; detail text uses row-meta.
- `MYORIA-469`: Bodyweight `Logged` was the remaining view-model data gap and
  should be formatted as local `HH:mm` from `BodyWeightEntry.timestamp`.

Production mapping:

- `buildTodayRamsBraunViewModel.ts` now passes the `BodyWeightEntry` into the
  Bodyweight mapper and formats `timestamp` with the entry `timezone` using the
  same `en-GB` 24-hour `HH:mm` convention used by Bodyweight report rows.
- `TodayRamsBraunLayout.styles.ts` already maps detail text to
  `uiTypography.listMeta` and `uiColors.textMuted`.

Change made: Bodyweight detail now renders `Logged HH:mm` when a measurement
exists.

## Chevron Placement Rule And Production Mapping

Source rule:

- `components.css`: `.my-readout-main` uses a fixed
  `--my-row-chevron-zone-width` column and `--my-row-content-chevron-gap`.
- `components.css`: `.my-list-row-chevron-zone` is fixed-width and
  right-aligned.
- `readout-contract-v1.md`: the chevron belongs to the primary readout row,
  aligns to the shared readout/list-row right-edge axis, and progress/detail
  content must not pull it downward.
- `readout-contract-v1.md`: paired readouts share row geometry and must not use
  local offsets or nudges.

Production mapping:

- `TodayRamsBraunLayout.styles.ts` uses `chevronZone.width =
  uiList.rowChevronZoneWidth` (24) and `readoutMain.columnGap = uiSpacing.x3`
  (12), matching `--my-row-chevron-zone-width` and
  `--my-row-content-chevron-gap`.
- Paired rows use the same `ReadoutMain paired` structure, so Fluid and
  Bodyweight chevrons stay in the primary readout row.

Change made: `uiToday.splitColumnGap` now maps to `uiSpacing.x5` (24), matching
`screens.css` `.my-readout-pair { column-gap: --my-space-5 }`.

## Workout Empty-State Rule And Production Mapping

Source rule:

- `readout-contract-v1.md`: Workout root empty state approved example is
  `No workouts yet`.
- `readout-contract-v1.md`: inactive/non-numeric status uses row-title, while
  active/operational status uses root-date typography and secondary color.
- `components.css`: `.my-operational-marker` uses
  `--my-color-operational`, size 2px x 12px.
- `components.css`: `.my-operational-status` uses
  `--my-color-text-secondary` and root-date typography.

Production mapping:

- `buildTodayRamsBraunViewModel.ts` already returns `No workouts yet` for
  missing or `none` workout data.
- `TodayRamsBraunLayout.styles.ts` now maps the active marker to
  `uiColors.operational` and status text to `uiColors.textSecondary` with
  `uiTypography.rootDate`.

Change made: active Workout marker/status color now follows the operational
contract. Empty-state text was verified unchanged.

## Changes Made

- Added `uiColors.operational`, mapped to Function Yellow from
  `--my-color-operational`.
- Changed `uiToday.sectionGap` from the retained 38 value to
  `uiScreen.sectionGapComfortable` (32), matching `--my-section-gap`.
- Changed `uiToday.splitColumnGap` from 40 to `uiSpacing.x5` (24), matching
  `--my-space-5`.
- Changed Today Workout operational marker color to `uiColors.operational`.
- Changed Today Workout status color to `uiColors.textSecondary`.
- Changed Bodyweight detail from `Logged` to `Logged HH:mm`.
- Updated Today tests for Bodyweight metadata, chevron geometry, and Workout
  token mappings.

## Things Verified But Not Changed

- Root date remains the only visible root identity; no `Today` title returned.
- Root date color already uses `uiColors.textSecondary`.
- Root date typography already uses `uiTypography.rootDate`.
- Header top rhythm remains the compact-density mapping documented by
  MYORIA-469.
- Fluid and Bodyweight chevrons already use the fixed 24px chevron zone in the
  primary readout row.
- Workout empty state already renders `No workouts yet`.
- `TodayRamsBraunLayout.styles.ts` remains absent from the UI style allowlist.

## Remaining Contract Gaps

No blocking Today parity contract gaps remain from this enforcement pass.

Native iOS safe-area mechanics remain documented as a density/platform mapping:
production applies compact iOS top padding while the browser styleguide preview
defaults to comfortable density.

## Token/Allowlist Changes

- Token changes: yes, in `src/ui/theme/styleguideContract.ts`.
- Allowlist changes: no.
- New allowlist entries: none.
- Today allowlist entries added or removed: none.
- Raw values introduced: no production raw visual values were introduced.

## Manual QA Notes

Manual device screenshot QA was not rerun in this pass. The implementation
mapped each changed value directly to existing styleguide CSS variables,
contract docs, or RN tokens, then verified with automated Today tests and style
checks.
