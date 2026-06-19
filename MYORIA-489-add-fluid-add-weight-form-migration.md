# MYORIA-489 Add Fluid And Add Weight Form Migration

## Status

- Ticket: MYORIA-489 / GitHub issue #476
- Scope: production UI migration for standalone Add Fluid and Add Weight forms
- Screens migrated: `DrinkLoggingScreen`, `BodyweightLoggingScreen`
- Domain/application/persistence behavior touched: no
- Styleguide route/source touched: no
- Source contracts: MYORIA-487, MYORIA-488, MYORIA-486

## Scope

MYORIA-489 migrates only the standalone Add Fluid and Add Weight logging forms
to the shared Core Tracking V1 form primitives created in MYORIA-488.

The migration keeps the current simple form shape:

- Add Fluid has one amount field in milliliters and Save/Cancel actions.
- Add Weight has one bodyweight field in kilograms and Save/Cancel actions.
- The current standalone Add Fluid screen does not expose a type selector, so
  no selector behavior was added or changed.

## Primitives Used

Both migrated screens now use:

- `MyoriaFormField` for label and field-local validation placement.
- `MyoriaTextInput` for transparent line-input grammar, muted placeholder, and
  mono numeric input text.
- `MyoriaFormActionRow` for paired Cancel/Save actions and disabled Save state.

The screen-local styles now own only screen-level rhythm:

- full-screen background containment
- compact screen padding
- title typography
- form stack gap

## Behavior Preserved

Add Fluid preserves:

- amount input value and `onChangeAmountMl`
- numeric keyboard and `done` return key
- placeholder copy `250`
- blank input disables Save
- validation message copy and condition from the caller
- `onSave` and `onCancel` handlers
- navigation behavior owned by the app shell

Add Weight preserves:

- value input and `onChangeValueKg`
- decimal keyboard and `done` return key
- placeholder copy `82.4`
- blank input disables Save
- validation message copy and condition from the caller
- `onSave` and `onCancel` handlers
- navigation behavior owned by the app shell

## Token And Contract Mapping

| Screen role            | Implementation                                                                            | Contract/token source                       |
| ---------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------- |
| Full-screen background | `styles.screen.backgroundColor = uiColors.background`                                     | MYORIA-486, `.my-screen`                    |
| Screen title           | `uiTypography.screenTitle`, `uiColors.textPrimary`                                        | MYORIA-487 screen lead/title rhythm         |
| Screen padding         | `uiScreen.paddingXCompact`, `uiScreen.paddingTopCompact`, `uiScreen.paddingBottomCompact` | RN styleguide contract                      |
| Form stack gap         | `uiForm.formGapCompact`                                                                   | MYORIA-488 form primitive mapping           |
| Field label            | `MyoriaFormField`                                                                         | MYORIA-488 / `.my-field-label`              |
| Numeric input          | `MyoriaTextInput numeric`                                                                 | MYORIA-488 / `.my-line-input--numeric`      |
| Error text             | `MyoriaFormField errorText` via `MyoriaValidationText`                                    | MYORIA-487 field-local validation           |
| Actions                | `MyoriaFormActionRow`                                                                     | MYORIA-488 / `.my-button-row`, `.my-button` |
| Disabled Save          | `primaryAction.disabled`                                                                  | MYORIA-487 disabled form action semantics   |

No arbitrary colors, sampled colors, route-specific borders, large boxed input
styles, negative margins, or transform nudges were introduced.

## Tests

Focused tests cover:

- Add Fluid shared form field/control structure.
- Add Fluid amount input handler.
- Add Fluid validation display and disabled Save state.
- Add Fluid Save/Cancel handlers.
- Add Weight shared form field/control structure.
- Add Weight amount input handler.
- Add Weight validation display and disabled Save state.
- Add Weight Save/Cancel handlers.
- Token-backed background/title/input/action styles where testable.

## Manual QA Expectations

Manual QA should retest:

- Add Fluid opens from Today, accepts a custom amount, shows field-local
  validation for invalid input, saves, cancels, and returns through the existing
  app-shell flow.
- Add Weight opens from Today, accepts a decimal amount, shows field-local
  validation for invalid input, saves, cancels, and returns through the existing
  app-shell flow.
- Both screens preserve the continuous full-screen background from MYORIA-486.
- Both screens use quiet line-input grammar rather than rounded boxed fields.

The existing MYORIA-480 Core Tracking V1 runbook already requires Add Fluid and
Add Weight logging QA, so no separate runbook step was added.

## Known Remaining Form Debt

- Add Food selected-item amount/unit confirmation form remains unmigrated.
- Food & Drink Library Create/Edit Item forms remain unmigrated.
- Boolean/toggle grammar for Food Library contribution controls remains a
  MYORIA-487/MYORIA-488 known gap.
- A broader shell/header rhythm contract remains separate from this form
  migration.

## Non-Goals

- No Add Food selected-item migration.
- No Food Library Create/Edit migration.
- No report-screen migration.
- No Today migration.
- No Workout work.
- No domain/application/persistence changes.
- No generated styleguide bundle edits.
