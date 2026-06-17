# MYORIA-437 Workout Dashboard Contract

Issue: #430 / MYORIA-437

Date: 2026-06-17

## Scope

This is a contract/audit report for the Today Workout readout. It does not
implement Workout behavior, redesign Today, or change Nutrition, Fluid, or
Bodyweight readouts.

Production references:

- `src/ui/today/TodayRamsBraunLayout.tsx`
- `src/ui/today/buildTodayRamsBraunViewModel.ts`
- `src/application/dashboard/GetDailyDashboardSummaryUseCase.ts`
- `src/ui/dashboard/hooks/useDailyDashboardSummary.ts`
- `src/application/workout/GetActiveLiveWorkoutUseCase.ts`
- `src/ui/workout/liveWorkoutFormatters.ts`

Styleguide references:

- `docs/styleguide/app/src/screens/TodayScreenPage.tsx`
- `docs/styleguide/readout-contract-v1.md`

No production code was changed for this audit.

## Current Production Behavior

Production Today maps `DailyDashboardSummary['workout']` into three visible
states:

- Missing summary or `status: 'none'`: primary `No workout`, detail
  `No session logged`, no active marker.
- `status: 'active'`: primary `In progress`, no detail, red circular dot.
- `status: 'logged'`: primary `Completed`, detail `1 session` or
  `n sessions`, no active marker.

The block is pressable and always navigates through `onOpenWorkout`.

The dashboard summary currently provides:

- `status: 'none' | 'active' | 'logged'`
- `sessionCount`
- `setCount`
- optional `latestSession.id`
- optional `latestSession.status`
- optional `latestSession.startedAt`
- optional `latestSession.finishedAt`

It does not provide:

- planned workout/rest data
- workout type/split names
- exercise display names for the dashboard readout
- elapsed active duration
- formatted time range
- loading/error status
- a distinct start/resume/view action model

Today also receives `summary: undefined` during initial loading. The current
view model treats that the same as no workout data and shows `No workout`.
Dashboard loading failures are not represented in the hook; the async load has
no local error state.

## Current Styleguide Expectation

The styleguide Today page currently shows an active Workout example:

```text
WORKOUT
▌ Active                                           >
Push session · 42 min
```

The broader readout contract is more specific than that example:

- The Today/root Workout readout is a status readout, not a CTA label.
- Primary text describes current workout state.
- Primary text should not say `Start workout`, `Open workout`, `View workout`,
  or `Workout overview`.
- Do not reference unimplemented planning structures such as `Push`, `Pull`, or
  `A/B` day names until those concepts exist in the product model.
- Active sessions use the operational marker plus concrete in-progress data.
- Inactive states use last-workout history when available.
- Time ranges use compact formatting, for example `16:00–17:30`.
- Durations belong in detail text with a middle dot separator.
- Workout gets no progress scale unless there is meaningful session progress.

Approved examples in the styleguide contract include:

```text
WORKOUT
▌ Bench press · 42 min                             >
```

```text
WORKOUT
Last workout · today                               >
16:00–17:30 · 90 min
```

```text
WORKOUT
No workouts yet                                    >
```

## Gap Analysis

True parity gaps:

- Production active state uses a red dot instead of the operational marker.
- Production active state says `In progress` without concrete in-progress data.
- Production logged state says `Completed` and session count instead of
  last-workout history.
- Production no-workout state says `No workout` / `No session logged`; the
  readout contract prefers `No workouts yet` for a true empty history.
- Production does not format latest session time ranges or durations.
- Production does not distinguish loading from no workout.
- Production does not distinguish loading failure from no workout.

Intentional or incomplete states:

- Planned workout and rest day are not currently product/domain concepts for
  the Today dashboard.
- Workout type names such as `Push`, `Pull`, `A day`, and `B day` should not
  appear until planning/split data exists.
- Active dashboard data can be enriched from active live workout models later,
  but Today currently only has the daily dashboard summary.
- The press target can continue to open Workout; the visible readout text
  should still remain status-oriented rather than CTA-oriented.

## Shared Grammar

Workout should use the same Today readout family as the other root blocks:

- `WORKOUT` section label.
- Primary readout row with fixed trailing chevron zone.
- No card, border, shadow, badge, pill, or decorative icon.
- No progress scale by default.
- Operational marker only for true active/in-progress state.
- Detail/meta line only when it adds concrete session information.
- Primary label is status/content, not action wording.
- The whole block remains pressable; the chevron communicates navigation.

## State Contract

### No Workout / Rest

Current production data can only express absence of logged/current workout data.
It cannot yet express an intentional rest day.

Contract for current data:

```text
WORKOUT
No workouts yet                                    >
```

If there is prior workout history outside the selected day, a future dashboard
read model should prefer recency over an empty message:

```text
WORKOUT
Last workout · yesterday                           >
18:10–19:05 · 55 min
```

Rest day is a separate future state and should not be faked from missing data.
When a planned rest concept exists, it can become:

```text
WORKOUT
Rest day                                           >
```

Open questions for a later product slice:

- Does `Rest day` mean user-planned rest, coach-recommended rest, or inferred
  absence of training?
- Should an intentional rest day open Workout planning, a rest-day detail, or
  the general Workout tab?

### Planned Workout

Planned workout is not currently implementable from the Today dashboard summary.
Do not show split names until planning/split data exists.

Future contract:

```text
WORKOUT
Planned workout                                    >
Push session
```

or, when a scheduled time exists:

```text
WORKOUT
Planned workout                                    >
18:00 · Push session
```

Rules:

- Primary row remains a status phrase such as `Planned workout`.
- Detail row carries the workout name and optional planned time.
- If the only available label is a generic title, use that title in detail.
- Action opens Workout. A future action can start the planned workout, but the
  visible primary readout should not become `Start workout`.

Required data before implementation:

- planned workout id/title
- optional planned local time
- optional planned workout type/split name
- action semantics for view/start

### Active Workout

Active workout should use the operational marker, not a dot.

Preferred contract when current exercise and elapsed duration are available:

```text
WORKOUT
▌ Bench press · 42 min                             >
```

Fallback contract when only an active session is known:

```text
WORKOUT
▌ Active workout                                   >
```

If a session title exists:

```text
WORKOUT
▌ Active workout                                   >
Upper body · 42 min
```

Rules:

- Use the marker only for active/in-progress sessions.
- Prefer concrete in-progress data over the generic word `Active`.
- Do not use a red circular dot.
- Do not use a progress scale unless real session progress exists.
- Navigation should resume/open the active workout.
- The action can be resume semantics internally, but visible text should remain
  status/readout text.

Useful existing source:

- `GetActiveLiveWorkoutUseCase` can already return active session title,
  current exercise id, exercise display names, set count, and started time.
- `liveWorkoutFormatters.ts` already formats active title and elapsed time for
  live workout UI.

Implementation caution:

- Today should not duplicate live-workout formatting rules blindly. A future
  slice should either add a focused dashboard read model or intentionally reuse
  shared formatting helpers where the semantics match.

### Completed / Latest Workout

For a completed workout today, the readout should be last-workout history, not a
generic completion badge.

Contract:

```text
WORKOUT
Last workout · today                               >
16:00–17:30 · 90 min
```

For the latest workout outside today:

```text
WORKOUT
Last workout · yesterday                           >
18:10–19:05 · 55 min
```

or:

```text
WORKOUT
Last workout · 2 days ago                          >
18:10–19:05 · 55 min
```

Rules:

- Primary row communicates recency.
- Detail row carries time range and duration.
- If time range is unavailable but a finished session exists, show the best
  truthful detail available, such as `90 min` or `12 sets`.
- Multiple sessions in one day should still identify the latest session first.
  A secondary detail such as `2 sessions today` can be considered later, but it
  should not displace the latest-session readout.
- Navigation opens the relevant workout session/log when that route exists; for
  now it may open the Workout tab.

Required data before full implementation:

- latest finished session across relevant history, not only selected day
- started/finished local time formatting
- duration calculation
- session detail route or clear fallback to Workout tab

### Loading

Current production shows `No workout` while the summary is loading. That is
misleading because loading is not absence of data.

Future contract:

```text
WORKOUT
Loading workout                                    >
```

Rules:

- Keep it quiet.
- No spinner is required in the root readout.
- Do not show `No workouts yet` until loading has resolved.
- Navigation can remain enabled to Workout, but the readout should not pretend
  the empty state is known.

Required data before implementation:

- Today needs a loading state from `useDailyDashboardSummary`, not only
  `summary | undefined`.

### Error

Current production has no represented dashboard error state.

Future contract:

```text
WORKOUT
Workout unavailable                                >
Try again from Workout
```

Rules:

- Keep root errors calm and action-oriented.
- Do not show stack traces or persistence details.
- Do not use red alert chrome unless the user must act immediately.
- Navigation should open Workout, where a fuller error/retry surface can live.

Required data before implementation:

- Today needs an error state from the dashboard hook/use case boundary.
- The app should decide whether a dashboard partial failure blocks the whole
  Today summary or only the affected readout.

## Recommended First Implementation Slice

Recommended next issue:

```text
MYORIA-438 align Today Workout block current states with dashboard contract
```

Scope:

- Production Today only.
- Use existing dashboard summary data.
- Replace active red dot with operational marker.
- Change no-workout text to the agreed empty-state copy.
- Change logged state from `Completed` / session count to the best
  latest-workout status possible from `latestSession`.
- Keep the current `onOpenWorkout` navigation behavior.
- Add focused Today tests for no-workout, active, logged, and tap behavior.

Avoid in the first slice:

- planned workout/rest implementation
- new Workout detail routes
- live workout screen redesign
- persistence/model changes unless the implementation explicitly discovers a
  missing field that must be handled separately
- changing Nutrition, Fluid, or Bodyweight

## Deferred Follow-Ups

Suggested future slices, not started automatically:

```text
MYORIA-439 add dashboard loading/error state model for Today readouts
```

```text
MYORIA-440 define planned workout/rest domain and Today readout semantics
```

```text
MYORIA-441 enrich Today active workout readout from live workout data
```

```text
MYORIA-442 define logged workout detail/snapshot navigation grammar
```

```text
MYORIA-443 align Live Workout screen with dashboard operational grammar
```

## Verification

Requested checks for this audit:

```bash
pnpm typecheck
pnpm test src/ui/today/TodayShell.test.tsx
pnpm test
pnpm format:check
git diff --check
```

Results are recorded in the completion report for the issue.
