# MYORIA-475 Range Report Placeholder Acceptance Decision

## Status

- Ticket: MYORIA-475 / GitHub issue #462
- Scope: product/release acceptance decision and verification only
- Production UI touched: no
- Domain/application/persistence behavior touched: no
- Styleguide route/source touched: no
- Styleguide documentation touched: yes
- Workout scope: Deferred

## Executive Decision

Status: Accepted for V1, with an explicit limitation.

Core Tracking V1 accepts the current Week / Month / Year / All report modes as
quiet placeholders for Nutrition, Fluid, and Bodyweight.

Day reports plus Today are the Required for V1 reporting loop. Range
aggregation, range charts, advanced analytics, trend insights, and cross-range
coaching are Deferred. Minimal range report implementation is not Required for
V1.

If placeholders are rejected later, the Follow-up if rejected is a focused range
report slice that implements the smallest useful aggregation for Nutrition,
Fluid, and Bodyweight without pulling in Workout or advanced analytics.

## Current Implementation Summary

Status: Accepted for V1.

Reviewed sources and tests show the current range behavior is deliberate and
consistent:

- Nutrition, Fluid, and Bodyweight report screens each expose five modes:
  `day`, `week`, `month`, `year`, and `all`.
- `day` mode renders the functional current selected-day report.
- `week`, `month`, `year`, and `all` render placeholder components.
- The placeholder copy is consistent across the three reports:
  `Range reports are not available yet.`
- The placeholder title is domain-neutral by mode: `Week report`,
  `Month report`, `Year report`, or `All report`.
- The placeholder components do not call application range read models.
- Existing UI tests cover placeholder rendering for all four non-day modes
  across Nutrition, Fluid, and Bodyweight.
- Existing report tests assert placeholder styling remains quiet and does not
  use filled card styling.

No production inconsistency was found in the reviewed paths. The known gap is
capability: range modes are not functional reports.

## Range-Mode Lifecycle / Model

Status: Accepted for V1.

The report mode lifecycle is UI-local state:

- each report container initializes `activeMode` to `day`
- selecting a mode calls `setActiveMode`
- opening Add Food, Add Fluid, or Add Weight resets the report to `day`
- successful add/log workflows reset back to `day`
- detail/edit/delete workflows operate from selected day entries, not from
  range placeholders

The application layer has daily read models and other range-capable
infrastructure for separate surfaces such as export/progress, but the current
Nutrition, Fluid, and Bodyweight report tabs do not expose application range
report use cases.

For Core Tracking V1, the range modes are navigation-visible placeholders, not
functional reports.

## Nutrition Range Behavior

Status: Accepted for V1.

Nutrition report modes currently include:

- `Day`
- `Week`
- `Month`
- `Year`
- `All`

Nutrition `Day` mode is functional. It renders selected-day totals, entries,
Add Food, entry detail, supported manual edit/delete, and unavailable behavior
for unsupported rows.

Nutrition `Week`, `Month`, `Year`, and `All` render
`NutritionReportPlaceholderMode`:

- accessibility label: `Nutrition {mode} report placeholder`
- title: `{Mode} report`
- body: `Range reports are not available yet.`

Existing tests verify:

- all five report mode tabs are exposed
- selecting Week calls `onSelectMode('week')`
- every non-day mode renders the placeholder
- placeholder modes do not show Day entry content such as `Skyr` or `2 logged`
- placeholder styling does not use background color, border width, or border
  radius card treatment

Nutrition range aggregation is Deferred.

## Fluid Range Behavior

Status: Accepted for V1.

Fluid report modes currently include:

- `Day`
- `Week`
- `Month`
- `Year`
- `All`

Fluid `Day` mode is functional. It renders selected-day total fluid, entry
count, entries, Add Fluid, entry detail, amount edit/delete where supported,
and unavailable behavior for linked or unsupported rows.

Fluid `Week`, `Month`, `Year`, and `All` render
`FluidReportPlaceholderMode`:

- accessibility label: `Fluid {mode} report placeholder`
- title: `{Mode} report`
- body: `Range reports are not available yet.`

Existing tests verify:

- all five report mode tabs are exposed
- selecting Week calls `onSelectMode('week')`
- every non-day mode renders the placeholder
- placeholder styling does not use background color, border width, or border
  radius card treatment

Fluid range aggregation is Deferred.

## Bodyweight Range Behavior

Status: Accepted for V1.

Bodyweight report modes currently include:

- `Day`
- `Week`
- `Month`
- `Year`
- `All`

Bodyweight `Day` mode is functional. It renders selected-day latest
measurement, entry count, entries, Add Weight, entry detail, and delete where
supported.

Bodyweight `Week`, `Month`, `Year`, and `All` render
`BodyweightReportPlaceholderMode`:

- accessibility label: `Bodyweight {mode} report placeholder`
- title: `{Mode} report`
- body: `Range reports are not available yet.`

Existing tests verify:

- every non-day mode renders the placeholder
- placeholder modes do not show Day entry content such as `Morning weigh-in`
- placeholder styling does not use background color, border width, or border
  radius card treatment

Bodyweight range aggregation and trends are Deferred.

## Placeholder Acceptance Decision

Status: Accepted for V1.

Week / Month / Year / All placeholders are accepted for Core Tracking V1.

The accepted V1 reporting model is:

- Today is the root current-day tracking surface.
- Nutrition Day report is the required Nutrition inspection/correction surface.
- Fluid Day report is the required Fluid inspection/correction surface.
- Bodyweight Day report is the required Bodyweight inspection/correction
  surface.
- Week / Month / Year / All modes may be visible but non-functional as long as
  they render quiet placeholder copy and do not claim real aggregation.

This is acceptable for private V1 because Core Tracking V1 is focused on the
daily structured tracking loop. Range reports are useful but not necessary to
log, inspect, correct, delete, persist, restart, export/import, or manually QA
the daily loop.

## User-Facing Limitation Accepted For V1

Status: Accepted for V1.

Exact accepted limitation:

> Nutrition, Fluid, and Bodyweight reports support functional Day mode in Core
> Tracking V1. Week, Month, Year, and All modes are visible placeholders that
> say range reports are not available yet. They do not calculate totals,
> averages, trends, charts, or insights in V1.

The placeholders must not be described as functional reports in release notes,
manual QA notes, or user-facing acceptance language.

## Manual QA Checklist

Status: Required for V1.

Before Core Tracking V1 can be declared done, manually verify:

- Nutrition Day mode still works.
- Nutrition Week mode renders a quiet placeholder without crashing.
- Nutrition Month mode renders a quiet placeholder without crashing.
- Nutrition Year mode renders a quiet placeholder without crashing.
- Nutrition All mode renders a quiet placeholder without crashing.
- Fluid Day mode still works.
- Fluid Week mode renders a quiet placeholder without crashing.
- Fluid Month mode renders a quiet placeholder without crashing.
- Fluid Year mode renders a quiet placeholder without crashing.
- Fluid All mode renders a quiet placeholder without crashing.
- Bodyweight Day mode still works.
- Bodyweight Week mode renders a quiet placeholder without crashing.
- Bodyweight Month mode renders a quiet placeholder without crashing.
- Bodyweight Year mode renders a quiet placeholder without crashing.
- Bodyweight All mode renders a quiet placeholder without crashing.
- Switching between modes preserves report navigation.
- Switching between modes does not corrupt selected day state.
- Returning to Day mode shows the expected selected-day report again.
- Placeholders do not show Day entries as if they were aggregated range data.
- Placeholders do not claim real aggregation, averages, charts, trends, or
  insights.
- App restart does not change accepted placeholder behavior.

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

- `src/ui/nutrition/NutritionReportScreen/NutritionReportScreen.test.tsx`
- `src/ui/fluid/FluidReportScreen/FluidReportScreen.test.tsx`
- `src/ui/bodyweight/BodyweightReportScreen/BodyweightReportScreen.test.tsx`

No new automated test is required for this docs-only decision.

## Risks / Unknowns

Status: Non-blocking design debt.

- Manual QA still needs to confirm mode switching in the app environment,
  including returning to Day mode after visiting every placeholder mode.
- The placeholders are visible navigation targets, so release notes should name
  the limitation clearly.
- Current tests verify placeholder rendering, but do not prove simulator/device
  navigation ergonomics.
- Existing range-capable progress/export application code does not mean the
  report range tabs are functional; those are separate surfaces.
- Range placeholder acceptance does not resolve goals/default target behavior,
  import/export round-trip QA, or the final full manual QA pass.

## Follow-Up Implementation Issue Only If Decision Is Rejected Later

Status: Follow-up if rejected.

If placeholders are rejected later, create one focused implementation issue:

`MYORIA-XXX implement minimal range reports for Core Tracking V1`

Minimum useful scope:

- Nutrition: total calories and macros for the selected range.
- Fluid: total liters or milliliters for the selected range.
- Bodyweight: latest value and simple average or trend summary for the selected
  range.
- Empty range states for all three domains.
- Clear selected range labels for Week, Month, Year, and All.
- Focused application/read-model tests for empty and populated ranges.
- Focused UI tests for each domain's range report.

Explicitly out of scope for that follow-up:

- Workout implementation
- advanced charts
- plateau detection
- advanced analytics
- AI insights
- broad report visual redesign
- Food Library or Today redesign

## Impact On Core Tracking V1 Blockers

Status: Accepted for V1.

MYORIA-475 resolves the MYORIA-464 range placeholder blocker by accepting
Week / Month / Year / All placeholders for Nutrition, Fluid, and Bodyweight.

Range aggregation, charts, advanced analytics, and trend insights are no longer
Core Tracking V1 blockers.

Remaining Core Tracking V1 blockers still include recorded manual QA and the
other unresolved acceptance decisions tracked outside this document.

## Done Means

Status: Required for V1.

This decision is done when:

- the range placeholder behavior is documented as Accepted for V1
- Week / Month / Year / All implementation beyond placeholders is documented as
  Deferred
- MYORIA-464 points to this decision instead of leaving range placeholders as
  unresolved
- the required automated checks pass for this docs-only change
- the MYORIA-475 issue is closed after the commit is pushed

Core Tracking V1 can declare the range placeholder blocker resolved only after
the manual QA checklist in this document passes on the release candidate.
