# MYORIA-476 Goals / Default Targets Acceptance Decision

## Executive Decision

Status: Accepted for V1.

Core Tracking V1 accepts the current goals/default targets behavior without a
seeded/default-goal implementation.

Configurable goals are sufficient for V1 because the current app can create,
persist, list, import/export, and supersede active goals for the MVP goal types.
The first-run empty-goals state is accepted as long as final manual QA proves
that Today, Nutrition, Fluid, Bodyweight, and Settings/Data remain
understandable and stable.

Fallback target display is accepted for V1 where it already exists:

- Today Nutrition uses configured calorie and protein goals when present.
- Today Nutrition uses fallback calorie, protein, carbohydrate, and fat targets
  when no matching goal exists.
- Today Fluid uses a fixed fallback target of 3 L.
- Bodyweight target goals are configurable and listed in Settings/Data, but they
  are not currently consumed by Today or Bodyweight report target readouts.
- Nutrition, Fluid, and Bodyweight report screens show totals/latest entry
  summaries, not goal-target comparisons.

Seeded/default goals are not Required for V1. They become Follow-up if rejected
only if later product review decides that first-run should create real goal
records or expose configurable target comparisons outside Today.

## Current Implementation Summary

Status: Accepted for V1.

Goal domain types currently exist for:

- `bodyweight_target`
- `calorie_target`
- `protein_target`
- `training_priority`

Source evidence:

- `src/domain/goal/Goal.ts` defines the goal types, status values, target
  shapes, metadata, and validation.
- `src/domain/goal/GoalList.ts` filters active goals by local day and sorts
  them in MVP order.
- `src/application/goal/SetGoalUseCase.ts` creates manual goals and supersedes
  active goals of the same type.
- `src/application/goal/ListActiveGoalsUseCase.ts` reads active goals for the
  current local day.
- `src/adapters/persistence/sqlite/goal/SqliteGoalRepository.ts` saves and
  lists goals through SQLite.
- `src/adapters/persistence/sqlite/migrations/migrations.ts` creates the
  `goals` table in migration version 6.
- `src/ui/goal/GoalPanel.tsx` exposes the four goal types in Settings/Data.
- `src/ui/goal/hooks/useGoals.ts` wires Settings/Data goal creation to the
  application use cases.

Automated evidence exists for domain behavior, active-goal filtering,
superseding, SQLite mapping/persistence, Today display, and import/export
coverage. This decision is based on static source/test review; it does not
claim a fresh simulator/device manual QA pass.

## Goals / Targets Lifecycle Model

Status: Accepted for V1.

Goals are user-configured records, not startup seed data.

The lifecycle is:

1. User opens Settings/Data.
2. User creates a goal through `GoalPanel`.
3. `useGoals` parses the input into a domain `GoalTarget`.
4. `SetGoalUseCase` creates a manual active goal.
5. If an active goal of the same type exists on the start day,
   `SetGoalUseCase` saves it as `superseded` and saves the new active goal.
6. `ListActiveGoalsUseCase` reloads active goals for the current local day.
7. Today receives `goals.activeGoals` from `MyoriaAppShell`.
8. SQLite persists goal records for app restart and import/export.

Superseding preserves goal history. It does not delete the previous record.

## Today Target Behavior

Status: Accepted for V1.

Today uses active goals only for calories and protein.

Current Today target model:

- Calories: configured active `calorie_target`, otherwise fallback `2300`.
- Protein: configured active `protein_target`, otherwise fallback `180`.
- Carbs: fallback `250`; there is no configurable carbohydrate goal type.
- Fat: fallback `80`; there is no configurable fat goal type.
- Fluid: fallback `3000 ml`, displayed as `3 L`; there is no configurable fluid
  goal type.
- Bodyweight: latest measurement or missing state only; configured
  `bodyweight_target` is not consumed by Today.
- Training priority: configurable/listed goal only; it is not consumed by Today.

Empty-day Today semantics remain the MYORIA-471 rule:

- Nutrition renders zero-valued accumulating totals against targets.
- Fluid renders `0 / 3 L`.
- Bodyweight renders the missing measurement state and `Not logged`.
- Workout remains deferred and is not part of this decision.

## Nutrition Target Behavior

Status: Accepted for V1.

Today is the only confirmed Nutrition target surface in current source.

Today Nutrition uses:

- configured active calorie target when present
- fallback `2300 kcal` when no calorie target exists
- configured active protein target when present
- fallback `180 g` protein when no protein target exists
- fallback `250 g` carbs and `80 g` fat because configurable carb/fat goals do
  not exist

Nutrition daily/report screens show actual daily totals and entries. Current
source review did not find goal-target comparisons in Nutrition report screens.
This is Accepted for V1 as an explicit user-facing limitation.

## Fluid Target Behavior

Status: Accepted for V1.

Today Fluid uses a fixed fallback target:

- `3000 ml`
- displayed as `3 L`

No configurable fluid target goal type currently exists. Fluid report screens
show total fluid and entry count, not a goal-target comparison.

This fixed fluid target display is Accepted for V1 because it is already
implemented and tested in Today, and because Fluid report behavior remains an
actual-total summary rather than a misleading configurable-goal promise.

## Bodyweight Target Behavior

Status: Accepted for V1 with limitation.

`bodyweight_target` goals can be configured, persisted, listed, exported, and
imported. Current Today and Bodyweight report source does not consume
`bodyweight_target` for target comparison display.

Bodyweight surfaces currently show:

- Today: latest logged measurement, or missing state with `Not logged`.
- Bodyweight report day mode: latest logged measurement and entry count, or
  `Not logged` when no entry exists.
- Settings/Data Goals: active bodyweight target listed with value/unit.

Accepted V1 limitation: bodyweight target configuration exists as structured
goal data, but target comparison is not a release-critical Bodyweight report
feature for Core Tracking V1.

## First-Run / Empty-Goals Behavior

Status: Accepted for V1.

If no user-configured goals exist:

- Settings/Data Goals shows `No active goals yet.`
- Today Nutrition still renders against fallback calorie/protein/carb/fat
  targets.
- Today Fluid still renders against the fixed 3 L target.
- Today Bodyweight shows logged/missing measurement state independent of goals.
- Nutrition report shows actual daily totals and entries.
- Fluid report shows actual daily fluid total and entries.
- Bodyweight report shows latest/missing bodyweight state and entries.

This is Accepted for V1 because the structured tracking loop remains usable:
the user can log Nutrition, Fluid, and Bodyweight without goals, and Today does
not crash or hide core tracking state when the goals table is empty.

Manual QA is still Required for V1 to confirm this in a clean install and after
app restart.

## Default / Seeded Goals Decision

Status: Deferred.

Seeded/default goal records are not implemented and are not Required for V1.

No goal seed importer or startup default-goal creation path was found in the
reviewed goal/domain/application/persistence/UI source. Existing seed machinery
is for other domains such as nutrition food data and is not a goal-default
mechanism.

V1 decision: do not add seeded/default goals before Core Tracking V1 release.

## Fallback Targets Decision

Status: Accepted for V1.

Fallback targets are accepted exactly where current source already uses them:

- Today calorie fallback: `2300 kcal`
- Today protein fallback: `180 g`
- Today carbohydrate fallback: `250 g`
- Today fat fallback: `80 g`
- Today fluid fallback: `3 L`

These are display/calculation fallbacks, not persisted goal records. They must
not be described in release notes or QA as user-specific recommendations.

Accepted limitation: fallback targets are generic defaults for a private V1
tracking surface. They are useful enough for continuity and progress grammar,
but they are not personalized coaching targets.

## User-Facing Limitations Accepted For V1

Status: Accepted for V1.

Accepted limitations:

- First run may have no active goal records.
- Settings/Data Goals may show `No active goals yet.`
- Today uses generic fallback calorie, macro, and fluid targets until calorie
  and protein goals are configured.
- Fluid target is fixed at 3 L and is not configurable through goals.
- Carb and fat targets are fixed Today fallbacks and are not configurable
  through goals.
- Bodyweight target can be configured and listed, but Today/Bodyweight reports
  do not compare logged bodyweight against that target.
- Training priority can be configured and listed, but Workout remains Deferred
  and training priority does not make Workout part of Core Tracking V1.
- Nutrition, Fluid, and Bodyweight report screens show totals/latest values,
  not goal progress cards.

## Manual QA Checklist

Status: Required for V1.

Record device/simulator, build/commit, date, timezone, and tester.

- Clean install / first-run state with no user-configured goals.
- Today renders without crashing in empty-goals state.
- Today empty state shows Nutrition `0 / 2300 kcal` and macro fallback targets
  where visible.
- Today empty state shows Fluid `0 / 3 L`.
- Today empty state shows Bodyweight missing state with `Not logged`.
- Nutrition target display is understandable in empty-goals state: Today uses
  fallback targets; Nutrition report shows actual totals.
- Fluid target display is understandable in empty-goals state: Today uses 3 L;
  Fluid report shows actual totals.
- Bodyweight target/missing state is understandable in empty-goals state.
- Settings/Data Goals shows `No active goals yet.`
- Configuring calorie target updates Today Nutrition calorie target display.
- Configuring protein target updates Today Nutrition protein target display.
- Configuring bodyweight target lists the goal in Settings/Data and keeps
  relevant Bodyweight surfaces coherent.
- Configuring training-priority goal lists the goal without making Workout a V1
  requirement.
- Relying on Fluid target displays the expected 3 L value.
- Superseding or updating an active goal of the same type works without
  deleting history.
- App restart preserves configured goals and Today target display.
- Export/import round-trip for goals remains covered by the broader V1 data
  safety QA gate.
- No Workout goal behavior is required for this decision.

## Automated Checks Required

Status: Required for V1.

For this documentation decision, run:

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

Existing automated coverage relevant to this decision includes:

- domain goal validation and active-day filtering
- `SetGoalUseCase` creation and same-type superseding
- `ListActiveGoalsUseCase`
- SQLite goal save/list mapping
- Today fallback and configured calorie/protein target rendering
- import/export handling of goals

## Risks / Unknowns

Status: Non-blocking design debt.

- Risk: generic fallback nutrition/fluid targets can be mistaken for
  personalized recommendations unless release notes and QA describe them as
  fallbacks.
- Risk: configuring a bodyweight target without target comparison may feel
  incomplete, even though the structured goal data exists.
- Risk: no manual clean-install QA pass is recorded in this decision.
- Needs confirmation only during final release QA: simulator/device first-run
  behavior, app restart behavior, and import/export round trip must still be
  observed on the release candidate.

## Follow-Up Implementation Issue Only If Decision Is Rejected Later

Status: Follow-up if rejected.

If empty-goals/fallback behavior is rejected later, create the smallest focused
implementation issue after this decision and before full release QA.

Minimum likely scope:

- Decide default goal records and values in a product decision document.
- Add a goal seed/default use case that creates real goal records only when no
  active user-configured goal of that type exists.
- Add persistence tests proving idempotent seed behavior and no overwrite of
  user goals.
- Add UI/application tests proving Today uses seeded goals after first run.
- Decide whether Fluid, carbs, fat, Bodyweight target comparison, and Training
  priority need new goal types or target surfaces.
- Keep Workout out of scope unless a separate Workout milestone accepts it.

## Impact On Core Tracking V1 Blockers

Status: Accepted for V1.

This resolves the MYORIA-464 blocker:

`empty-goals/default target behavior must be accepted or a seed/default goal slice
must be implemented.`

Resolution:

- Empty-goals first-run behavior is Accepted for V1.
- Current fallback targets are Accepted for V1.
- Seeded/default goals are Deferred.
- No seed/default goal implementation is Required for V1.

Remaining Core Tracking V1 blockers are outside this decision: recorded manual
release QA, import/export round-trip QA, and required automated checks.

## Done Means...

Status: Required for V1.

MYORIA-476 is done when:

- this decision document exists
- MYORIA-464 references this decision as resolving the goals/default target
  blocker
- no production behavior, persistence, migration, or test changes were made
- required automated checks pass, or any failures are reported clearly
- the MYORIA-476 GitHub issue is closed after the commit is pushed

Core Tracking V1 can treat goals/default targets as release-accepted when final
manual QA proves the clean-install, configured-goal, restart, and import/export
cases listed above.
