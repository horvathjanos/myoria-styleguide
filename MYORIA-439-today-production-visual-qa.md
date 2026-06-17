# MYORIA-439 Today Production Visual QA

Issue: #432 / MYORIA-439

Date: 2026-06-17

## Scope

This is a QA/documentation checkpoint after MYORIA-436 through MYORIA-438. It
uses the production screenshot observations captured in issue #432 and the
current Today source/tests as the reference.

Production references:

- `src/ui/today/TodayShell.tsx`
- `src/ui/today/TodayRamsBraunLayout.tsx`
- `src/ui/today/TodayRamsBraunLayout.styles.ts`
- `src/ui/today/buildTodayRamsBraunViewModel.ts`
- `src/ui/today/TodayShell.test.tsx`

No production code or styleguide source was changed for this checkpoint.

## QA Verdict

Pass with small polish candidates.

Today now reads as one coherent root screen rather than a mix of local dashboard
patterns. The root date, Nutrition, Fluid, Bodyweight, and Workout blocks are
close enough to move on unless the next slice is specifically visual polish.

## Screens and States Inspected

- Default/no-workout state.
- Active workout state.
- Completed/logged workout state.
- Nutrition readout with calories, macros, targets, and over-target detail.
- Fluid and Bodyweight paired readouts.
- Top/root date context.
- Ticked progress scale grammar.
- Current vertical density.

## Pass Summary

- Root context passes: Today leads with the formatted date and does not render a
  separate visible `Today` title.
- Nutrition passes: primary calorie readout, macro readouts, subdued units,
  over-target detail, chevron alignment, and ticked progress grammar now belong
  to the same visual family.
- Fluid passes: the root readout uses liter grammar, for example `0.1 / 3 L`,
  rather than milliliter precision.
- Bodyweight passes structurally: the value/unit treatment is aligned with the
  paired readout grammar, and the empty state remains quiet.
- Workout states pass functionally: current data maps to `No workouts yet`,
  `Active workout`, and `Last workout · today` without inventing unavailable
  planning, exercise, or duration data.
- Progress scales pass: the ticked grammar is quiet but still readable in the
  light production treatment.
- Vertical density passes: the page breathes enough after macro nesting and
  Workout alignment. No route-specific spacing nudge is recommended.

## Follow-Up Candidates

Create a narrow polish issue for Workout primary tone and weak standalone
metadata if Today polish is the next product slice.

- Workout primary tone: `Active workout` and `Last workout · today` currently
  use muted text. That is calm, but it may read slightly closer to meta text
  than to the Fluid/Bodyweight primary values.
- Standalone `Logged` meta: Bodyweight and zero-set logged Workout fallbacks can
  show only `Logged`. This is not wrong, but it is low-information when no time,
  count, or detail is available.

Potential issue title:

```text
MYORIA-440 Polish Today Workout tone and weak Logged metadata
```

## Defer or Ignore

- Completed workout `today` duplication should be deferred. `Last workout ·
  today` plus `2 sessions today` is understandable, and changing it before the
  dashboard read model carries richer time/duration data risks churn.
- Active workout exercise names and elapsed duration should be deferred until
  the Today dashboard receives that data explicitly.
- Planned workout, rest day, loading, and error states remain out of scope for
  this checkpoint.
- Progress scale opacity should be left as-is unless future device screenshots
  show an accessibility or legibility failure.
- Vertical density should be left as-is. The screen does not need immediate
  tightening or extra whitespace.

## Recommended Next Slice

Move to the next app area unless Janos wants one small Today polish pass now.
If Today polish is chosen, keep it narrow: Workout primary tone plus suppression
or replacement of weak standalone `Logged` metadata when no better detail exists.

## Verification

- `pnpm typecheck` passed.
- `pnpm test src/ui/today/TodayShell.test.tsx` passed.
- `pnpm test` passed: 138 files, 848 tests.
- `pnpm format:check` passed.
- `git diff --check` passed.
