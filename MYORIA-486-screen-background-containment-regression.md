# MYORIA-486 Screen Background Containment Regression

Issue: #473 / MYORIA-486

Date: 2026-06-19

## Executive Verdict

**FIXED / production drift.** MYORIA-482 correctly identified the shared screen
background role, but it applied the report-day background at route roots while
the app shell still exposed a legacy background around inset route content.

The contract-backed full-screen background owner is the styleguide `.my-screen`
role:

- `docs/styleguide/tokens.css`: `--my-color-background` maps to
  `--my-palette-braun-white`.
- `docs/styleguide/components.css`: `.my-screen` sets
  `background: var(--my-color-background)`, `min-height: 100%`, and owns screen
  padding.
- `docs/styleguide/app/src/screens/TodayScreenPage.tsx`: Today preview root
  uses `className="my-screen"`.
- `docs/styleguide/app/src/screens/ReportDayScreenPage.tsx`: report-day preview
  root uses `className="my-screen my-report-day"`.
- `src/ui/theme/styleguideContract.ts`: `uiColors.background` mirrors
  `--my-color-background`.

The styleguide does not define a second outer safe-area/app-shell background
around `.my-screen`, and it does not define an inner whole-screen card or boxed
surface.

## Regression Source

The RN containment tree was:

- app shell root: `styles.safeArea`
- keyboard/safe-area fill: `styles.keyboardView`
- report route scroll wrapper: `ScrollView`
- route content inset: `contentContainerStyle={styles.content}`
- screen root: report `styles.screen`

MYORIA-482 added `backgroundColor: uiColors.background` to Nutrition, Fluid,
and Bodyweight report roots. Those roots sit inside a scroll content container
with padding. The parent `safeArea` still used legacy `#F4F3EF`, so the padded
area around report roots displayed a different background and made the route
look like an inner rectangle.

Add Food, Add Fluid, Add Weight, Food Library, and Create Item shared the same
containment risk because they either pass through the same app shell route
surface or use full-screen route roots adjacent to the legacy shell background.
Standalone Drink and Bodyweight logging roots also retained the legacy screen
background.

Today was less visually obvious because `TodayRamsBraunLayout` already owns a
full `ScrollView` root with `uiColors.background`, but the outer app shell still
needed the same token to avoid any contrasting safe-area exposure.

## Fix

The full-screen RN shell now uses the styleguide screen background token:

- `src/ui/appShell/MyoriaAppShell.styles.ts`
  - `safeArea.backgroundColor = uiColors.background`
  - `keyboardView.backgroundColor = uiColors.background`
  - `content.backgroundColor = uiColors.background`
- `src/ui/fluid/DrinkLoggingScreen.styles.ts`
  - standalone Drink logging root uses `uiColors.background`
- `src/ui/bodyweight/BodyweightLoggingScreen.styles.ts`
  - standalone Bodyweight logging root uses `uiColors.background`

MYORIA-482 report root background assertions remain in place. Food & Drink
Library already maps its screen background through `uiColors.background`, and
now has a focused test documenting that route-surface role.

## Final Background Ownership Model

The app shell and route content surface own the full-screen `.my-screen`
background role with `uiColors.background`. Route roots that already represent
screen surfaces may also use the same token, but they no longer reveal a
contrasting shell behind their padding or unfilled areas.

No sampled color, arbitrary local color, negative margin, transform nudge, or
route-specific visual hack was introduced.

## Header Rhythm Classification

Manual QA also noted Today root date-row and child screen back-row/header rhythm
differences.

Classification: **NEEDS CONTRACT**.

Existing docs define Today root date rhythm and secondary header primitives, but
there is not yet a single RN app-shell/screen-shell contract that compares Today
root identity, child back rows, safe-area padding, and report route wrappers
across every Core Tracking surface. MYORIA-486 does not change spacing,
typography, chevrons, or header layout. A separate shell/header rhythm contract
issue should decide that alignment.

## Manual Retest Scope

Retest Today, Nutrition report, Fluid report, Bodyweight report, Add Food, Add
Fluid, Add Weight, Food & Drink Library, and Create Item. Confirm each screen
uses one continuous full-screen background and no longer appears inside a
visible inner rectangle caused by mismatched shell and route backgrounds.

Workout remains deferred.
