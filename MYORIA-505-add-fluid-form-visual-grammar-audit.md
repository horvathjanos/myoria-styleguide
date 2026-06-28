# MYORIA-505 Add Fluid Form Visual Grammar Audit

## Status

- Ticket: MYORIA-505 / GitHub issue #493
- Scope: docs-only audit
- Core Tracking V1 acceptance decision: **PASS WITH DEBT**
- Production UI changed: no
- Tests changed: no
- Tokens, style allowlist, and generated styleguide output changed: no
- Domain, application, persistence, schema, migration, and seed changed: no

## Purpose

This audit evaluates the Add Fluid workflow opened from the Fluid report after
MYORIA-504. It decides whether the workflow is acceptable for Core Tracking V1,
identifies which visual rules already use the React Native styleguide contract,
and defines the smallest safe follow-up without changing production UI.

The audited workflow is `FluidAddWorkflowScreen`. It is distinct from the
standalone Today `DrinkLoggingScreen` migrated to shared form primitives in
MYORIA-489.

## Inspected Files

- `docs/styleguide/MYORIA-498-core-tracking-v1-current-state-checkpoint.md`
- `docs/styleguide/MYORIA-503-fluid-report-style-contract-audit.md`
- `docs/styleguide/MYORIA-504-fluid-report-style-contract-alignment.md`
- `docs/styleguide/MYORIA-489-add-fluid-add-weight-form-migration.md`
- `docs/styleguide/MYORIA-487-core-tracking-v1-form-screen-grammar-contract.md`
- `src/ui/theme/styleguideContract.ts`
- `src/ui/shared/form/MyoriaFormField.tsx`
- `src/ui/shared/form/MyoriaTextInput.tsx`
- `src/ui/shared/form/MyoriaOptionGroup.tsx`
- `src/ui/shared/form/MyoriaFormActionRow.tsx`
- `src/ui/shared/form/MyoriaValidationText.tsx`
- sibling shared-form style files under `src/ui/shared/form`
- `src/ui/fluid/FluidReportScreen/FluidReportScreen.styles.ts`
- `src/ui/fluid/FluidReportScreen/FluidAddWorkflowScreen.tsx`
- `src/ui/fluid/FluidReportScreen/FluidReportScreen.tsx`
- `src/ui/fluid/FluidReportScreen/FluidReportScreenContainer.tsx`

## Current Behavior Summary

The report-local Add Fluid workflow supports:

- Water, Coffee, or Other selection;
- a decimal-pad amount input in milliliters;
- field-local amount validation and a submit error;
- Cancel and Log fluid actions;
- in-flight action disabling and `Logging...` feedback;
- dirty-cancel discard confirmation;
- successful logging followed by report refresh and return to Day mode.

The behavior is coherent with the Core Tracking V1 logging scope. The container
keeps form state, validation, duplicate-submit protection, persistence
submission, refresh, and discard behavior unchanged. Existing checkpoint and
QA documentation treats Fluid logging behavior as accepted. No behavioral,
accessibility, persistence, or architecture blocker was found in this audit.

## Visual Grammar Findings

The form is usable and internally consistent, but it uses the older Fluid-local
visual grammar:

- a teal selected option and primary action;
- white, rounded, fully bordered option and input controls;
- heavy local button and field-label typography;
- a local kicker/title/subtitle hierarchy;
- paired, equal-width rounded Cancel and Log fluid buttons;
- the report-local screen shell with `gap: 18` and `padding: 20`;
- a rounded pale-teal discard confirmation panel.

This is patterned legacy debt rather than random styling. It nevertheless
actively diverges from the current form direction established by MYORIA-487
through MYORIA-489: contract-colored labels, quiet line inputs, underline-based
option selection, role-based validation text, and shared action-row grammar.

The divergence is visible inside one product journey. The Fluid report itself
now largely follows contract roles after MYORIA-504, while opening Add Fluid
switches to local teal, rounded boxed controls. The standalone Today Add Fluid
screen already uses the shared primitives. This inconsistency is non-blocking
for V1, but it should not be treated as an approved alternate form system.

## Styleguide Contract Findings

### Already Contract-Backed Or Close To Existing Roles

| Current style or behavior | Contract posture |
| --- | --- |
| `screen.backgroundColor` | Uses `uiColors.background`. |
| Interactive minimum heights | Use `uiAction.minHeight` or `uiInput.minHeight`. |
| Pressed states | Use `uiAction.pressedOpacity`. |
| Border widths | Use `uiSeparator.hairline`. |
| Type-option gap | Uses `uiForm.optionGap`. |
| Action-row gap | Uses `uiForm.actionRowGap`. |
| Input vertical padding | Uses `uiInput.paddingY`. |
| Common 4, 8, and 12 px spacing | Uses `uiSpacing` roles where mapping was direct. |
| Error color | Uses `uiColors.error`. |
| Inline error rhythm | Uses `uiTypography.listState`; semantically close to `MyoriaValidationText`. |
| Selected/action inverted text | Uses `uiColors.textInverted`. |
| Type selector semantics | Closely match `MyoriaOptionGroup` selection and accessibility state. |
| Amount field semantics | Closely match `MyoriaFormField` plus numeric `MyoriaTextInput`. |
| Cancel/log semantics | Closely match secondary/primary `MyoriaFormActionRow` actions. |

These mappings mean no new tokens or primitive APIs are needed to align the
main form.

### Remaining Local Hardcoded Debt

| Debt | Current examples | Contract direction |
| --- | --- | --- |
| Fluid-local palette | `#255B5B`, `#356666`, `#102A25`, `#CCD8D8`, `#FFFFFF` | Existing `uiColors` roles through shared primitives. |
| Boxed control chrome | white fills, full borders, `borderRadius: 8` | Quiet line input and underline option grammar. |
| Local field typography | `detailFactLabel` with local color and heavy `13/18` type | `MyoriaFormField` / `uiTypography.sectionLabel`. |
| Local input typography | heavy `17/23` text | numeric `MyoriaTextInput` / `uiTypography.inputNumeric`. |
| Local action typography | heavy `14/18` teal or inverted labels | `MyoriaFormActionRow` / `uiTypography.action`. |
| Local disabled state | `opacity: 0.5` | Shared action disabled-label semantics. |
| Local title hierarchy | `kicker`, `title`, and `subtitle` literals | Existing screen title/context roles where they fit. |
| Local shell rhythm | `gap: 18`, `padding: 20` | Existing `uiScreen`, `uiForm`, and `uiSpacing` roles. |
| Discard panel chrome | pale fill, border, radius, heavy title | Separate confirmation grammar; do not broaden the form slice to solve it. |

Replacing only the literals with nearby role values would leave the boxed
control structure intact and create a half-migrated form. A role-only cleanup
is therefore less coherent than using the already-established primitives.

## V1 Acceptance Decision

**PASS WITH DEBT**

The current Add Fluid behavior is acceptable for Core Tracking V1. Logging,
validation, cancel/discard, submit protection, and refresh behavior are present,
and the visual debt does not prevent task completion.

The visual grammar is not merely harmless historical decoration: it conflicts
with the current shared form direction and creates a noticeable transition from
the aligned Fluid report and standalone Add Fluid form. That conflict warrants
a narrow follow-up, but it does not justify blocking V1 or introducing new
tokens, allowlist entries, or a broader redesign.

## Recommended Next Slice

Create one implementation issue:

`MYORIA-506 — Align Fluid report Add Fluid form to shared primitives`

Smallest safe scope:

- Change only the main, non-confirmation state of `FluidAddWorkflowScreen`.
- Use `MyoriaFormField` and `MyoriaOptionGroup` for Type.
- Use `MyoriaFormField` and numeric `MyoriaTextInput` for Amount ml and its
  field-local validation.
- Use `MyoriaValidationText` for submit errors.
- Use `MyoriaFormActionRow` for Cancel and Log fluid, preserving disabled and
  in-flight behavior and existing accessibility labels.
- Replace only now-unused Add Fluid styles in
  `FluidReportScreen.styles.ts`; do not clean unrelated detail/edit/report
  styles.
- Add or update focused component tests for structure, handlers, validation,
  disabled/submitting state, and accessibility semantics.
- Preserve all values, copy, validation rules, discard behavior, submit flow,
  refresh behavior, and navigation.

The discard confirmation should remain visually unchanged in this slice. It
shares legacy styles with edit/delete surfaces and would turn a form migration
into a broader confirmation-system decision.

## Explicit Non-Goals

- No production UI implementation in MYORIA-505.
- No behavior, copy, validation, navigation, or accessibility changes.
- No Fluid entry Edit or Detail migration.
- No discard/delete confirmation redesign or shared confirmation primitive.
- No Fluid report Day, Week, Month, Year, or All changes.
- No standalone Today Add Fluid changes.
- No Add Food, Food Library, Nutrition, Bodyweight, Workout, or Today changes.
- No new tokens, typography roles, radius roles, or disabled-opacity roles.
- No style allowlist or generated styleguide output changes.
- No domain, application, persistence, schema, migration, or seed changes.
- No broad cleanup of `FluidReportScreen.styles.ts`.

## Manual QA Checklist For Janos

For this docs-only audit:

1. Open Today -> Fluid report -> Add fluid.
2. Confirm Water is initially selected and Water, Coffee, and Other can each be
   selected.
3. Enter a valid decimal amount and confirm Log fluid records the selected type
   and amount, refreshes the report, and returns to Day mode.
4. Submit blank or invalid input and confirm the amount error appears next to
   the field without logging.
5. Trigger a submission failure, if a test setup is available, and confirm the
   submit error remains readable.
6. Confirm Cancel closes immediately when the form is unchanged.
7. Change Type or Amount, tap Cancel, keep editing, and confirm values remain.
8. Repeat dirty Cancel, choose Discard, and confirm the form closes without a
   new entry.
9. During submission, confirm actions cannot be triggered twice and the label
   reads `Logging...`.
10. Visually compare this report-local form with the standalone Today Add Fluid
    form and confirm the documented rounded teal versus shared line-form
    difference is present.

After the recommended follow-up, repeat steps 1-9 and confirm behavior is
unchanged while the main form uses the shared field, option, validation, and
action grammar. The confirmation view is expected to retain its existing
appearance.
