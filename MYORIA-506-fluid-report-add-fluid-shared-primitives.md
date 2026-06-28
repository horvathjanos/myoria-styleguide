# MYORIA-506 Fluid Report Add Fluid Shared Primitives

## Status

- Ticket: MYORIA-506 / GitHub issue #494
- Scope: production UI alignment for the Fluid report Add Fluid main form
- Production UI changed: yes, Add Fluid main form only
- Discard confirmation changed: no
- Domain, application, persistence, schema, migration, and seed changed: no
- Tokens, token mirrors, style allowlist, and generated styleguide output
  changed: no

## Purpose

MYORIA-506 implements the narrow follow-up recommended by MYORIA-505. It aligns
the report-local `FluidAddWorkflowScreen` main form with the shared Core
Tracking V1 form grammar while preserving the existing logging workflow.

This screen is separate from the standalone Today Add Fluid form migrated in
MYORIA-489.

## Scope

The main Add Fluid state now uses:

- `MyoriaFormField` and `MyoriaOptionGroup` for Type;
- `MyoriaFormField` and numeric `MyoriaTextInput` for Amount ml;
- shared validation grammar for field-local and submit errors; and
- `MyoriaFormActionRow` for Cancel and Log fluid.

Only Add Fluid type-selector styles made unused by the migration were removed
from `FluidReportScreen.styles.ts`. Styles shared with Edit, Detail, report, or
confirmation surfaces remain unchanged.

## Behavior Preserved

- Water, Coffee, and Other options and initial Water selection.
- Existing option accessibility labels and selected semantics.
- Decimal-pad amount entry and amount change handling.
- Existing validation rules, field error copy, and submit error copy.
- Cancel behavior for unchanged forms.
- Dirty-cancel keep-editing and discard behavior.
- Disabled Cancel and Log fluid actions while submitting.
- `Logging...` feedback while submitting.
- Duplicate-submit protection.
- Successful logging, report refresh, and return to Day mode.
- Existing navigation behavior.

## Visual Grammar Changed

- The Type field now uses shared section-label and underline option grammar
  instead of rounded white/teal buttons.
- Amount ml now uses the shared quiet numeric line input instead of a rounded
  boxed input with local typography.
- Field and submit errors now use shared validation typography.
- Cancel and Log fluid now use shared secondary/primary action grammar instead
  of Fluid-local rounded teal controls and heavy local labels.

No new token or style role was required.

## Explicit Non-Goals

- No discard confirmation visual changes.
- No Fluid entry Detail or Edit migration.
- No Fluid report Day, Week, Month, Year, or All changes.
- No standalone Today Add Fluid changes.
- No Add Food, Food Library, Nutrition, Bodyweight, Workout, or Today changes.
- No copy, validation rule, navigation, persistence, or domain behavior changes.
- No new tokens, token-mirror changes, style allowlist changes, or generated
  styleguide output edits.
- No broad cleanup of `FluidReportScreen.styles.ts`.

## Manual QA Checklist

1. Open Today -> Fluid report -> Add fluid.
2. Confirm Water is selected initially.
3. Select Water, Coffee, and Other in turn and confirm the underline selection
   state follows the chosen type.
4. Confirm Amount ml uses the quiet numeric line-input grammar and decimal-pad
   keyboard.
5. Submit blank, zero, negative, and invalid amounts and confirm existing
   field-local validation copy appears.
6. Enter a valid decimal amount and confirm Log fluid records the selected type
   and amount, refreshes the report, and returns to Day mode.
7. Confirm Cancel closes an unchanged form immediately.
8. Change Type or Amount, tap Cancel, choose Keep editing, and confirm the draft
   remains.
9. Repeat dirty Cancel, choose Discard, and confirm no entry is logged.
10. During submission, confirm both actions are disabled, the primary label
    reads `Logging...`, and duplicate submission is prevented.
11. If a submit failure can be induced, confirm the existing submit error is
    readable in shared validation grammar.

## Remaining Debt

The discard confirmation intentionally retains its existing pale panel,
rounded bordered controls, Fluid-local typography, and local action styling.
Those styles are shared with nearby Edit/Delete flows and require a separate
confirmation-grammar decision.

Fluid Entry Edit and portions of Detail also retain legacy local teal, boxed
control, typography, radius, disabled-opacity, and shell-rhythm debt recorded
by MYORIA-503 through MYORIA-505. This slice does not authorize cleaning those
surfaces.
