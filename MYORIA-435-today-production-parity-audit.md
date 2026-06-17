# MYORIA-435 Today Production Parity Audit

Issue: #428 / MYORIA-435

Date: 2026-06-17

## Scope

This is an audit-only comparison between production Today and the current
styleguide Today grammar.

Production reference:

- `src/ui/today/TodayShell.tsx`
- `src/ui/today/TodayRamsBraunLayout.tsx`
- `src/ui/today/TodayRamsBraunLayout.styles.ts`
- `src/ui/today/buildTodayRamsBraunViewModel.ts`
- `src/ui/today/buildTodayShellDisplayModel.ts`
- `src/ui/today/*.test.tsx`
- `src/ui/today/*.test.ts`

Styleguide reference:

- `docs/styleguide/app/src/screens/TodayScreenPage.tsx`
- `docs/styleguide/readout-contract-v1.md`
- `docs/styleguide/progress-scale-contract-v1.md`
- `docs/styleguide/screen-composition-contract-v1.md`
- `docs/styleguide/components.css`
- `docs/styleguide/screens.css`

No production code was changed for this audit.

## Summary

Production Today has the correct high-level section order:

1. top context
2. Nutrition
3. Fluid / Bodyweight pair
4. Workout

It also avoids decorative cards, shadows, borders, and icon-heavy dashboard
chrome. That part is directionally aligned.

The main parity gap is that production Today is still a local Rams/Braun layout,
not an implementation of the current styleguide readout grammar. It duplicates
measurement, progress, chevron, unit, and over-target visuals locally instead of
using production equivalents of the styleguide primitives.

Recommended next slice:

```text
MYORIA-436 align production Today readout grammar with styleguide
```

Recommended separate slice:

```text
MYORIA-437 define Workout dashboard/readout contract
```

Do not start either slice automatically from this audit.

## Top Context

Parity status: partial.

Aligned:

- Production `TodayRamsBraunLayout` uses a dedicated header lane with
  `minHeight: 44`, matching the shared top context slot height.
- The header is quiet and no longer uses a large marketing-style page title.
- The top lane includes the Today overflow menu without adding an extra card,
  shadow, or decorative affordance.

Gaps:

- Styleguide Today shows only the root date in the root header. The styleguide
  `.my-root-title` role is hidden.
- Production still renders visible `Today` text above the date. It is small, but
  it is still an extra root identity line compared with the current grammar.
- Styleguide example date is human-readable, for example `Tuesday, 2 June`.
  Production passes through `summary.localDay`, which currently reads as a
  local-day value such as `2026-05-15` in tests.
- Production uses local header styles in `TodayRamsBraunLayout.styles.ts`
  instead of a reusable root-header/root-date primitive.

Finding:

MYORIA-430 mechanically aligned the lane height, but production does not yet
fully match the current root date rhythm because the visible `Today` title and
raw local-day formatting remain.

## Nutrition

Parity status: partial with true grammar gaps.

Aligned:

- Production has a full-width Nutrition block before the secondary readouts.
- It uses a section label, primary calorie value, target value, unit, trailing
  chevron, and progress indication.
- Macro order is Protein, Carbs, Fat.
- The block is not styled as a card and does not add a border or shadow.

Gaps:

- Styleguide uses the `Measurement` grammar for value and unit. Production
  splits value and unit into local `Text` nodes with Today-only styles.
- Styleguide keeps the primary calorie readout and the trailing chevron in a
  fixed readout row with a fixed chevron zone. Production uses a flex row and
  `domainChevron` margin, so it does not guarantee the same right-edge axis as
  list rows and progress scales.
- Styleguide uses the canonical ticked `ProgressScale`. Production uses a local
  filled `ProgressBar` without 0 / 50 / 100 ticks.
- Styleguide over-target behavior is a red overrun segment plus optional
  right-aligned over-detail text. Production uses small red dots for calories
  and macros.
- Styleguide nests macro secondary readouts inside the Nutrition readout block.
  Production renders macros as a separate `metricRows` group after the
  Nutrition pressable, so the visible Nutrition region and the navigation hit
  area do not match the styleguide structure.
- Styleguide macro readouts use subordinate supporting units. Production macro
  units use local primary text color and Today-only sizing.
- Styleguide Fat example includes `22 g over`; production tracks over-target
  state but does not expose the over amount.

Finding:

Nutrition is the largest true parity gap. The production content and order are
mostly right, but the shared readout, progress, chevron, unit, and over-target
grammar are not yet aligned.

## Fluid

Parity status: partial with one intentional data precision tension.

Aligned:

- Production places Fluid in a two-column pair with Bodyweight.
- Fluid has a section label, current / target value, unit, chevron, and progress
  indication.
- The block is whitespace-based, not card-based.

Gaps:

- Styleguide Today shows root Fluid in liters, for example `0.6 / 3 L`.
  Production shows milliliters, for example `1250 / 3000 ml`.
- `readout-contract-v1.md` explicitly says Fluid on Today/root paired readouts
  uses liters and that milliliter precision belongs to Fluid detail, history,
  and edit surfaces.
- Production uses local value/unit `Text` nodes rather than `Measurement` with a
  supporting unit.
- Production uses a local progress bar instead of the ticked progress scale.
- Production uses a flex chevron placement rather than the fixed chevron zone.

Finding:

The layout pairing is aligned, but Fluid is not yet using root readout unit
grammar or progress-scale grammar. The milliliter display is a true styleguide
parity gap unless the product deliberately reopens the Today Fluid precision
decision.

## Bodyweight

Parity status: partial.

Aligned:

- Production places Bodyweight beside Fluid.
- Bodyweight has a section label, value, unit, chevron, and logged/not-logged
  detail.
- Production correctly avoids a progress bar for Bodyweight.
- The empty state is calm: `Not logged`.

Gaps:

- Styleguide example shows a logged-time detail, for example `Logged 07:12`.
  Production shows only `Logged` when a bodyweight entry exists.
- Production uses local value/unit text styles rather than the shared
  `Measurement` supporting-unit grammar.
- Production uses local chevron spacing rather than the fixed readout/list-row
  chevron zone.
- Production bodyweight detail uses Today-local `9px / 12px` styling, while the
  readout contract maps detail/meta to the shared row-meta role and explicitly
  discourages tiny custom detail text.

Finding:

Bodyweight is close structurally, but it still needs shared measurement,
chevron, and metadata grammar. Logged-time display should be decided as a
product/data question before implementation because production may not currently
carry the formatted local time into this view model.

## Workout

Parity status: intentionally incomplete.

Current production states:

- Missing or `none`: `No workout` with detail `No session logged`.
- `active`: `In progress` with a red dot and no detail.
- `logged`: `Completed` with `1 session` or `n sessions`.

Styleguide state:

- The current styleguide example shows an active operational readout:
  `Workout`, marker, `Active`, chevron, and detail `Push session - 42 min`.

Gaps:

- Production does not match the styleguide active state text or detail shape.
- Production uses a red circular dot. Styleguide uses the operational marker
  grammar: a narrow vertical marker plus secondary active/status text.
- Production does not yet model planned workout, rest/no-workout, active
  workout, completed/latest workout, and start/resume action as an explicit
  styleguide contract.
- Production workout behavior depends on the existing dashboard summary shape,
  which is enough for current MVP status but not enough for the richer visual
  states implied by the styleguide example.

Finding:

Workout should not be implemented in MYORIA-435. Treat the current production
block as an older/partial dashboard state. It needs a separate contract slice
before UI alignment work.

Future Workout states that need a contract:

- no workout / rest state
- planned workout
- active workout
- completed/latest workout
- start/resume action

## Shared Readout, Progress, Chevron, And Unit Grammar

Parity status: not yet implemented as shared production primitives.

Aligned:

- Production uses `MyoriaChevron`, so it is not drawing ad hoc text chevrons.
- Today styles live in sibling `TodayRamsBraunLayout.styles.ts`, consistent with
  the repo's React Native component style rule.
- Section labels and the broad whitespace layout are directionally aligned.

Gaps:

- There is no production `Measurement` primitive equivalent used by Today.
- There is no production `ProgressScale` primitive equivalent used by Today.
- Today uses local progress bars rather than the canonical open, ticked progress
  scale.
- Today uses local over-target dots rather than canonical overrun segments and
  over-detail text.
- Chevron placement is local flex/margin placement, not the fixed 24px chevron
  zone required by readout/list-row grammar.
- Units are styled locally and often with primary text color. Styleguide
  supporting units are visually subordinate through the measurement primitive.
- Production has Today-only tiny detail type and local metric type sizes, while
  the readout contract asks for shared typography roles.

Finding:

The correct next implementation work is not a route-specific pixel nudge. It is
to introduce or adopt production equivalents for the shared readout primitives
and then compose Today from those primitives.

## Source And Test Architecture

Production Today is currently organized as:

- `TodayShell.tsx`: shell concerns, overflow menu, handler wiring.
- `TodayRamsBraunLayout.tsx`: presentational Today layout and local helper
  components.
- `TodayRamsBraunLayout.styles.ts`: local screen styles.
- `buildTodayRamsBraunViewModel.ts`: active production view model used by the
  shell.
- `buildTodayShellDisplayModel.ts`: older display model that is still tested
  but is not referenced by the active shell.

Good signs:

- UI code remains in `src/ui/today/**`.
- Domain/application data enters through typed props and dashboard summaries.
- Business logic is not being pushed into persistence or platform adapters.
- Tests cover section labels, macro order, empty Bodyweight, navigation
  handlers, menu behavior, target formatting, and current Fluid milliliter
  formatting.

Risks and gaps:

- `buildTodayShellDisplayModel.ts` appears to be legacy/unused production code.
  Its tests preserve an older Today display grammar, including `Fluids`,
  `Weight`, comma-formatted values, and non-Rams/Braun text strings.
- Tests assert some current non-parity behavior, especially Fluid milliliters.
  Those tests are useful for current behavior but will need intentional updates
  in MYORIA-436 if Today root Fluid moves to liters.
- Current tests do not protect the styleguide grammar:
  fixed chevron zones, progress-scale ticks, supporting units, overrun segment,
  root date-only header, or macro containment inside the Nutrition readout.
- The active Today layout owns helper components such as `ProgressBar` and
  `MetricRow`. These are not yet reusable readout primitives.

Finding:

The source architecture is workable for an incremental slice, but Today should
not accumulate more local visual helpers. A future implementation should either
create reusable production primitives first or move Today onto existing shared
ones if they exist by then.

## True Parity Gaps

- Root header still shows visible `Today` text.
- Root date appears to use raw local-day formatting instead of human-readable
  root date formatting.
- Nutrition macros are outside the Nutrition pressable/readout block.
- Today does not use a production Measurement primitive for value/unit roles.
- Today does not use the canonical ticked progress scale.
- Over-target states use red dots instead of overrun segment/detail grammar.
- Fluid root readout uses milliliters instead of liters.
- Chevron placement does not use fixed readout/list-row chevron zones.
- Units and metadata use Today-local typography rather than shared measurement
  and row-meta roles.
- Workout active state uses older/partial status grammar.
- Unused `buildTodayShellDisplayModel` remains in `src/ui/today/**` with tests
  for older display strings.

## Intentional Or Incomplete States

- Workout is incomplete and should be treated as deferred, not a MYORIA-435
  implementation target.
- No Bodyweight progress scale is correct unless target/range tracking is added
  later.
- The overflow menu is a production app affordance and is not inherently a
  styleguide parity problem, as long as it stays quiet and does not disturb the
  root top-context lane.
- Current milliliter Fluid formatting is protected by tests and may reflect an
  earlier production choice, but it conflicts with the current readout contract.

## Deferred Design Decisions

- Whether Today root date should always be a formatted human date and where that
  formatting belongs.
- Whether Bodyweight should show `Logged HH:mm` on root, and whether the active
  view model has enough timestamp/timezone data to do that safely.
- Exact Workout readout contract for no workout, rest, planned, active,
  completed/latest, and start/resume states.
- Whether over-target detail text should appear for calories only, Fat only, or
  both, following the severity mapping in `progress-scale-contract-v1.md`.

## Recommended Next Slices

1. `MYORIA-436 align production Today readout grammar with styleguide`

   Scope should be production Today only. Align root header/date, Measurement
   value/unit composition, fixed chevron zones, ticked progress scale,
   over-target grammar, Nutrition macro containment, Fluid liters, and adjacent
   tests. Do not implement Workout beyond preserving the current state.

2. `MYORIA-437 define Workout dashboard/readout contract`

   Create the styleguide/product contract for Workout Today states before
   implementation. Include no workout/rest, planned, active, completed/latest,
   and start/resume behavior.

3. Optional cleanup slice after MYORIA-436:

   Remove or migrate `buildTodayShellDisplayModel.ts` if it remains unused after
   the active Today display model is aligned. This should be a cleanup/refactor
   ticket, not mixed into the parity implementation unless it is directly
   necessary.

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
