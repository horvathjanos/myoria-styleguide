# MYORIA-482 Screen Background Token Parity

Issue: #469 / MYORIA-482

Date: 2026-06-19

## Executive Verdict

**FIXED / production drift.** Today and Core Tracking report-day screens are
contracted to use the same base screen background role.

The styleguide contract does not define a separate Today background role. Today
and report-day previews both use the shared `.my-screen` primitive, whose light
theme background is `--my-color-background`. The React Native mirror for that
role is `uiColors.background`.

Production Today already used `uiColors.background`. Nutrition, Fluid, and
Bodyweight report roots did not set a screen background, so they inherited the
legacy app shell background instead. The report roots now explicitly use
`uiColors.background`.

## Contract Trace

- `docs/styleguide/tokens.css`: `--my-color-background` maps to
  `--my-palette-braun-white`.
- `docs/styleguide/components.css`: `.my-screen` sets
  `background: var(--my-color-background)`.
- `docs/styleguide/app/src/screens/TodayScreenPage.tsx`: Today preview root
  uses `className="my-screen"`.
- `docs/styleguide/app/src/screens/ReportDayScreenPage.tsx`: report-day preview
  root uses `className="my-screen my-report-day"`.
- `src/ui/theme/styleguideContract.ts`: `uiColors.background` mirrors
  `--my-color-background`.
- `src/ui/today/TodayRamsBraunLayout.styles.ts`: Today root uses
  `backgroundColor: uiColors.background`.
- `src/ui/nutrition/NutritionReportScreen/NutritionReportScreen.styles.ts`,
  `src/ui/fluid/FluidReportScreen/FluidReportScreen.styles.ts`, and
  `src/ui/bodyweight/BodyweightReportScreen/BodyweightReportScreen.styles.ts`:
  report roots now use `backgroundColor: uiColors.background`.

## Scope Notes

- No arbitrary sampled color was introduced.
- No RN token value changed.
- No allowlist entry changed.
- No styleguide route, CSS, or generated output changed.
- No domain, application, persistence, import/export, or Workout behavior
  changed.
- The legacy app shell background remains outside this ticket; report-day
  surfaces now own their contracted screen background instead of inheriting it.
