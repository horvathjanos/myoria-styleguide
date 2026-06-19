# MYORIA-488 Core Tracking V1 Form Primitives

## Status

- Ticket: MYORIA-488 / GitHub issue #475
- Scope: shared React Native form primitives and primitive tests
- Production form screens migrated: no
- Domain/application/persistence behavior touched: no
- Styleguide route/source touched: no
- Source contract: `MYORIA-487 Core Tracking V1 Form Screen Grammar Contract`

## What Was Added

MYORIA-488 adds a small shared form primitive family under
`src/ui/shared/form/`:

- `MyoriaFormField`
  - field label
  - optional helper text
  - optional field-local error text
  - child slot for inputs or controls
- `MyoriaTextInput`
  - transparent line-input grammar
  - placeholder, editable, numeric, and error states
  - RN placeholder color wired to styleguide text-muted/control-disabled roles
- `MyoriaOptionGroup`
  - single-select option control
  - selected and disabled accessibility state
  - wrapping, quiet underline selection grammar suitable for unit and basis
    selectors
- `MyoriaFormActionRow`
  - primary, secondary, and optional destructive actions
  - shared paired-action spacing and touch target rhythm
- `MyoriaValidationText`
  - field-local helper/error copy
  - error text uses alert accessibility role

The primitive set is intentionally narrow. It creates reusable building blocks
for later form migrations without redesigning Add Fluid, Add Weight, Add Food
selected-item confirmation, or Food & Drink Library Create/Edit.

## MYORIA-487 Clause Mapping

| MYORIA-487 clause                                                                                    | MYORIA-488 implementation                                                                                                                       |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Field labels use quiet section-label grammar.                                                        | `MyoriaFormField` label maps to `uiTypography.sectionLabel` and `uiColors.textPrimary`.                                                         |
| Default text and numeric fields use line-input grammar.                                              | `MyoriaTextInput` uses transparent background, bottom divider, touch-target min height, input typography, and optional mono numeric typography. |
| Placeholder color uses muted text roles.                                                             | `MyoriaTextInput` defaults placeholder color to `uiColors.textMuted`; disabled placeholders use `uiColors.controlDisabled`.                     |
| Field errors appear directly under the relevant field/control.                                       | `MyoriaFormField` renders `errorText` through `MyoriaValidationText` immediately after the child slot.                                          |
| Error text uses `uiColors.error` / `.my-inline-error`.                                               | `MyoriaValidationText` error tone maps to `uiTypography.help` and `uiColors.error`.                                                             |
| Unit selectors need clear selected state, touch targets, wrapping, and selected accessibility state. | `MyoriaOptionGroup` renders wrapped `Pressable` options with min touch target and `accessibilityState.selected`.                                |
| Form action row should be reusable, with predictable paired actions.                                 | `MyoriaFormActionRow` owns primary/secondary/destructive button styles and spacing.                                                             |
| Disabled Save uses semantic disabled state and disabled color/opacity roles.                         | Action and option primitives pass `disabled` plus `accessibilityState.disabled`; disabled labels use `uiColors.controlDisabled`.                |

## Token Mapping

| Primitive role             | RN token                                                             | Styleguide source                                                     |
| -------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Form field gap             | `uiForm.fieldGap`                                                    | `.my-field { gap: var(--my-space-2) }`                                |
| Form stack gap             | `uiForm.formGapCompact`, `uiForm.formGapComfortable`                 | `.my-form`, `--my-section-gap-*`                                      |
| Field label                | `uiTypography.sectionLabel`, `uiColors.textPrimary`                  | `.my-field-label`, `.my-section-label`                                |
| Helper text                | `uiTypography.help`, `uiColors.textMuted`                            | `.my-field-help`, `--my-type-help-*`                                  |
| Error text                 | `uiTypography.help`, `uiColors.error`                                | `.my-inline-error`, `--my-color-error`                                |
| Input text                 | `uiTypography.input`                                                 | `.my-line-input`                                                      |
| Numeric input text         | `uiTypography.inputNumeric`                                          | `.my-line-input--numeric`                                             |
| Input divider              | `uiInput.lineWidth`, `uiColors.divider`                              | `--my-line-input`, `--my-color-divider`                               |
| Input touch target         | `uiInput.minHeight`                                                  | `--my-touch-target`                                                   |
| Placeholder                | `uiColors.textMuted`, `uiColors.controlDisabled`                     | `.my-line-input::placeholder`, `.my-line-input:disabled::placeholder` |
| Option/action touch target | `uiInput.minHeight`, `uiAction.minHeight`                            | `--my-touch-target`                                                   |
| Option/action spacing      | `uiForm.optionGap`, `uiForm.actionRowGap`, `uiAction.buttonPaddingX` | `.my-scope-selector`, `.my-button-row`, `.my-button`                  |
| Pressed state              | `uiAction.pressedOpacity`                                            | `--my-opacity-pressed`                                                |
| Primary action             | `uiColors.textPrimary`, `uiColors.textInverted`                      | `.my-button--primary`                                                 |
| Secondary action           | `uiColors.divider`, `uiColors.textPrimary`                           | `.my-button--secondary`                                               |
| Destructive action         | `uiColors.destructive`, `uiColors.textInverted`                      | `.my-button--destructive`                                             |

No new raw local colors, sampled colors, route-specific spacing, negative
margins, or transform nudges were introduced.

## Non-Goals

- No full production form migration.
- No Add Fluid/Add Weight visual redesign.
- No Add Food selected-item form redesign.
- No Food & Drink Library Create/Edit redesign.
- No duplicate-warning or dirty-discard behavior changes.
- No form validation semantic changes.
- No shell/header rhythm changes.
- No Workout work.

## Screens To Migrate Next

Recommended small follow-up slices:

- MYORIA-489 align Add Fluid and Add Weight forms using form primitives.
- MYORIA-490 align Add Food selected-item form using form primitives.
- MYORIA-491 align Food Library Create/Edit Item forms using form primitives.
- Separate shell/header rhythm contract issue if Today root and child back-row
  rhythm still needs a shared decision.

## Known Gaps

- Boolean checkbox/toggle grammar is still not implemented as a primitive.
  Food Library `Counts toward` controls need a dedicated quiet checkbox/toggle
  contract before migration.
- `MyoriaOptionGroup` establishes the RN primitive shape for single-select
  controls, but production segmented/unit selectors still need screen-level QA
  when each form migrates.
- Duplicate warnings and dirty-discard confirmations remain documented gaps in
  MYORIA-487. MYORIA-488 does not add warning/confirmation panels.
- Large boxed amount fields remain intentionally unsupported as a default
  primitive. A later issue must explicitly justify and contract that anatomy if
  it is retained.

## Manual QA Implications

MYORIA-488 is primitive-only and does not change production form screens, so it
does not expand the MYORIA-480 manual QA runbook.

Later migration issues should retest the affected form on iOS for:

- amount entry and keyboard behavior
- field-local error placement
- selected and disabled option accessibility state
- Save/Cancel/destructive action availability and disabled/saving states
- continuous full-screen background containment from MYORIA-486
