# MYORIA-471 Today Empty-State Value Semantics

Issue: #457 / MYORIA-471

Date: 2026-06-19

## Executive Verdict

Today now treats daily accumulating domains as zero-valued totals when there are
no entries, and keeps truly missing point-in-time or object states as empty
states.

Final rule:

- Nutrition empty daily energy: `0 / target kcal`
- Nutrition empty daily macros: `0 / target g`
- Fluid empty daily total: `0 / target L`
- Bodyweight missing measurement: `—` visually, with `Not logged` detail
- Workout missing session/history state: `No workouts yet`

No styling, spacing, typography, color, chevron, token, domain, application, or
persistence behavior was changed.

## Source-Of-Truth Docs Read

- `docs/styleguide/app/src/screens/TodayScreenPage.tsx`
- `docs/styleguide/MYORIA-435-today-production-parity-audit.md`
- `docs/styleguide/MYORIA-439-today-production-visual-qa.md`
- `docs/styleguide/MYORIA-469-today-token-visual-parity-qa.md`
- `docs/styleguide/MYORIA-470-today-styleguide-parity-enforcement.md`
- `docs/styleguide/readout-contract-v1.md`
- `src/ui/today/**`
- `src/ui/theme/styleguideContract.ts`
- Relevant Today tests:
  `src/ui/today/TodayShell.test.tsx` and
  `src/ui/today/buildTodayRamsBraunViewModel.test.ts`

## Final Empty-State Semantics By Domain

### Nutrition

The styleguide Today preview shows populated Nutrition values, and the earlier
Today parity docs do not explicitly define Nutrition empty-state value
semantics.

Product interpretation for MYORIA-471: Nutrition is a daily accumulating
tracking domain. If structured data says the daily total is zero and there are
no entries, the total is known: `0`. The target remains the configured or
fallback target.

Confirmed rule:

- Empty energy renders `0 / 2300 kcal` when no calorie target goal exists.
- Empty energy renders `0 / configured target kcal` when a calorie target goal
  exists.
- Empty macros render `0 / target g`.
- Empty Nutrition progress remains `0`.
- Over-target detail still requires entries and an over-target value.

### Fluid

The readout contract explicitly defines Today/root Fluid as a paired readout in
liters, with examples such as `0.6 / 3 L`. MYORIA-439 and MYORIA-470 verify
that root Fluid uses liter grammar and remains a daily total.

Confirmed rule:

- Empty Fluid renders `0 / 3 L`.
- Fluid remains a daily accumulating domain.
- Milliliter precision remains outside Today/root.

### Bodyweight

The styleguide and parity docs define Bodyweight as a point-in-time measurement.
MYORIA-435 calls the empty state calm, and MYORIA-470 keeps the missing state as
`Not logged` while formatting logged measurements as `Logged HH:mm`.

Confirmed rule:

- Missing Bodyweight measurement renders `—` visually with `Not logged`.
- Logged Bodyweight continues to render the measurement and local logged time.

### Workout

The Workout dashboard contract and MYORIA-470 define the empty Workout root
state as `No workouts yet`.

Confirmed rule:

- Missing or no-session Workout state renders `No workouts yet`.
- Active and logged Workout states remain unchanged.

## Changes Made

- Updated `buildTodayRamsBraunViewModel.ts` so Today Nutrition energy and macro
  readouts always display the structured current total instead of replacing a
  zero no-entry total with `—`.
- Kept Nutrition progress and over-target semantics tied to actual entry data.
- Updated Today view-model tests to assert zero-valued empty Nutrition totals,
  zero Fluid total, missing Bodyweight, and Workout empty state.
- Added a rendered Today shell test for the same screen-visible semantics.

## Tests Added/Updated

- Updated
  `src/ui/today/buildTodayRamsBraunViewModel.test.ts`
  empty-day expectations from `— / target` to `0 / target` for Nutrition.
- Added
  `src/ui/today/TodayShell.test.tsx`
  coverage for screen-visible empty daily accumulating totals and preserved
  missing point/object states.

## Things Verified But Not Changed

- Nutrition targets still render from active goals when available.
- Nutrition fallback targets remain `2300 kcal`, `180 g` protein, `250 g`
  carbs, and `80 g` fat.
- Nutrition empty progress remains zero.
- Nutrition over-target detail remains absent when there are no entries.
- Fluid remains `0 / 3 L` for an empty day.
- Bodyweight missing measurement remains `—` plus `Not logged`.
- Workout empty state remains `No workouts yet`.
- Today style files and style tokens were not changed.
- No report screens, Add Food, Food Library, Entry Detail, domain,
  application, or persistence files were changed.

## Remaining Contract Gaps

Before MYORIA-471, the styleguide contracts did not explicitly state whether an
empty Nutrition daily total should render `0` or `—`. This document records the
product-consistent rule for Today: daily accumulating totals render `0`; missing
point-in-time measurements render the missing-state marker.
