# MYORIA-487 Core Tracking V1 Form Screen Grammar Contract

## Status

- Ticket: MYORIA-487 / GitHub issue #474
- Scope: docs-only form grammar contract and production-screen audit
- Production UI touched: no
- Domain/application/persistence behavior touched: no
- Styleguide route/source touched: no
- Source of truth: private Myoria repository
- V1 decision: current form visuals are accepted as non-blocking design debt
  unless a screen is unusable, misleading, inaccessible, or functionally broken

## Scope

This document defines the intended Core Tracking V1 form-screen grammar before
production UI alignment work begins. It covers:

- Add Food selected-item amount/unit confirmation
- Add Fluid form
- Add Weight form
- Food & Drink Library Create Item form
- Food & Drink Library Edit Item form
- related validation, action, selector, and screen-shell expectations

It also classifies adjacent surfaces when they are part of the same flow:

- Add Food picker/search/list screen
- Food & Drink Library list
- Food & Drink Library detail and lifecycle confirmation
- Nutrition, Fluid, and Bodyweight delete confirmations where relevant

This document does not redesign production UI. It records the target grammar,
the current gaps, and the smallest follow-up issue sequence.

## Context

Core Tracking V1 manual QA is mostly functionally passing. Recent work aligned
report-day typography, mixed Food + Drink copy, app-restart persistence, and
screen background containment.

The remaining visual issue is that several form screens still use older form
grammar: rounded boxed inputs, large filled controls, heavy button blocks, and
screen-local hierarchy that feels louder than the quiet Rams/Braun report and
list surfaces.

The existing release decision already accepts this as V1 visual debt for Food
Library forms when functional QA passes. This document extends that contract
decision across the Core Tracking form family so later implementation slices can
be small and consistent.

## Existing Contract Inventory

| Area | Existing contract status | Source | Notes |
| --- | --- | --- | --- |
| Screen background | covered by existing contract | `MYORIA-482`, `MYORIA-486`, `.my-screen`, `uiColors.background` | Core Tracking screens should use one continuous full-screen background. No inner whole-screen card or contrasting shell surface. |
| Secondary screen shell | covered by existing contract | `screen-composition-contract-v1.md`, `SecondaryHeader` | Back label names the destination. Current screen identity belongs in the screen lead or object identity block. Header/date rhythm still needs a broader shell contract. |
| Report day actions and rows | covered by existing contract | `report-day-contract-v1.md` | `ADD FOOD`, `ADD FLUID`, and `ADD WEIGHT` are quiet text actions in report day entries headers. Rows are unframed and divider-owned. |
| Add Food picker | covered by existing contract | `food-add-flow-contract-v1.md` | Search/list/empty/loading/error picker grammar is contracted. Selected-item amount/unit confirmation is not fully contracted there. |
| Object-list grammar | covered by existing contract | `screen-composition-contract-v1.md`, Food & Drink Library list | Food Library list uses secondary header, quiet screen lead, underline search, text scope selector, quiet create action, divider rows, and fixed chevrons. |
| Logged-entry detail/delete | covered by existing contract | `screen-composition-contract-v1.md` | Nutrition/Fluid/Bodyweight entry details use snapshot grammar and local destructive text actions/confirmation. |
| Text actions and buttons | partially covered by existing contract | `components/actions/`, `.my-text-action`, `.my-button`, `uiAction` | Quiet text actions are preferred for local/report/object actions. Buttons exist but should be reserved for true commit/paired form actions. |
| Line inputs | partially covered by existing contract | `components/inputs/`, `.my-line-input`, `uiInput` | Search and simple text inputs are line-based. Numeric inputs can use mono. Large boxed input use is not the preferred Rams/Braun grammar. |
| Generic forms/fields | partially covered by existing contract | `design-system-v1.md`, `.my-form`, `.my-field`, `.my-field-label`, `.my-field-help` | Form primitives exist, but Core Tracking long-form screen composition is not formally specified. |
| Validation messages | partially covered by existing contract | `design-system-v1.md`, `.my-inline-error`, `.my-inline-warning`, `.my-warning-panel`, `.my-error-panel` | Field-local errors are preferred. Bottom aggregate required-field blocks and yellow warning panels are forbidden by default. |
| Compact density | covered by existing contract | `validation/compact-density/` | Density should tighten spacing without changing anatomy. Form-specific compact behavior still needs proof when implementation begins. |
| Typography roles | covered by existing contract | `typography-contract-v1.md`, `styleguideContract.ts` | Screen titles, section labels, list titles, list meta, actions, input text, and measurement values are token-backed. |
| Color/background/border tokens | covered by existing contract | `color-contract-v1.md`, `styleguideContract.ts` | Use background, text, divider, error, destructive, active/operational roles. Avoid local sampled palettes and domain-colored form chrome. |
| Segmented controls/unit selectors | needs formal contract | current production only | Day range and Food Library scope selectors exist as text selectors. Selected amount units and nutrition-basis controls need an explicit form selector contract. |
| Boolean toggles/check controls | needs formal contract | current production only | Food Library contribution toggles currently use large bordered rows. A quiet selected/control grammar is missing. |
| Form action row | needs formal contract | current production only | Cancel/Save, duplicate save, dirty discard, disabled/saving, and validation-message placement need one reusable grammar. |
| Long-form Create/Edit item | needs formal contract | `MYORIA-456`, current production | Existing docs intentionally defer Food item form alignment until field, toggle, validation, duplicate, dirty-discard, and keyboard behavior are specified. |
| Selected-item confirmation form | needs formal contract | `MYORIA-449`, current production | The Add Food amount/unit step needs a compact confirmation-form contract distinct from the picker list contract. |

## Contract Gaps

| Gap | Classification | Decision |
| --- | --- | --- |
| Formal text input contract | covered by existing contract | `.my-line-input`, `.my-line-input--numeric`, `.my-field`, and `uiInput` are enough for search and simple fields. Implementation still needs RN primitive alignment. |
| Formal large form field contract | needs formal contract | Large boxed fields are not the target default. Decide when, if ever, a boxed field is allowed for high-attention amount entry. |
| Segmented-control/unit selector contract | needs formal contract | Unit choices and nutrition basis choices need selected, disabled, focus, touch-target, and wrapping rules. |
| Boolean toggle/check contract | needs formal contract | Food Library `Counts toward` controls need a quiet checked state that is not a pill/card row by default. |
| Form action-row contract | needs formal contract | Define Save/Cancel placement, paired action hierarchy, disabled/saving state, and whether validation summary copy appears inline or field-local only. |
| Validation contract for long forms | partially covered / needs formal contract | Field-local errors are covered. Duplicate warning, dirty discard, top-level save errors, and bottom action messages need form-specific rules. |
| Long-form Create/Edit item screen contract | needs formal contract | Required before production changes to Food Library Create/Edit. |
| Selected-item confirmation form contract | needs formal contract | Required before production changes to the Add Food amount/unit step. |
| Header/date/back-row rhythm across root and child screens | needs formal contract | MYORIA-486 classifies this separately. Do not solve it through route-local form tweaks. |
| Current heavier form visuals | accepted V1 debt | Functional screens may ship if manual QA passes and no controls are unusable or misleading. |
| Functional validation, persistence, linked-entry behavior | covered by existing contract | MYORIA-473, MYORIA-477, and MYORIA-480 own functional QA. Do not expand this visual contract into data behavior. |

## Screen Audit

| Screen | Current classification | Evidence | V1 decision |
| --- | --- | --- | --- |
| Add Food search/list screen | PASS | `food-add-flow-contract-v1.md`; `NutritionAddFoodWorkflowScreen` picker uses quiet identity, underline search, divider rows, fixed trailing kcal, text Cancel, local states. | Accepted for V1. Keep behavior and picker grammar. |
| Add Food selected-item amount/unit screen | FUNCTIONAL / VISUAL DEBT | Uses `detailTotalsBlock`, boxed amount field, segmented unit buttons, filled submit button, and older local styles. Mixed Food + Drink copy is explicit and no longer misleading after MYORIA-484. | Accepted V1 debt if amount entry, unit selection, mixed copy, submit, cancel, and local errors pass QA. Needs selected-confirmation contract before alignment. |
| Add Fluid form | FUNCTIONAL / VISUAL DEBT | `DrinkLoggingScreen` uses full-screen background but large title, boxed numeric input, heavy Save/Cancel buttons, and local colors. | Accepted V1 debt if custom amount save/cancel/error states pass QA. Align after shared form field/action contract. |
| Add Weight form | FUNCTIONAL / VISUAL DEBT | `BodyweightLoggingScreen` mirrors Add Fluid with large title, boxed numeric input, heavy Save/Cancel buttons, and local colors. | Accepted V1 debt if save/cancel/error states pass QA. Align with Add Fluid in one small slice after contract. |
| Food & Drink Library list | PASS | Uses `SecondaryHeader`, quiet title, underline search, text scope selector, quiet `CREATE ITEM`, divider rows, and chevrons. Existing docs classify it as mostly aligned. | Accepted for V1. Do not churn while form work is pending. |
| Food & Drink Library detail | FUNCTIONAL / VISUAL DEBT | `FoodDrinkLibraryDetailScreen` uses `SecondaryHeader` and quiet identity, but summary cards, nested metric cards, large action buttons, and confirmation box remain. MYORIA-456 already documents this. | Accepted V1 debt unless detail actions or lifecycle confirmation are unusable. Needs object-detail contract or use a follow-up detail slice. |
| Food & Drink Library Create Item form | NEEDS CONTRACT | `FoodDrinkLibraryFormScreen` has many fields, contribution toggles, basis selector, duplicate warning, dirty discard, field errors, disabled Save, and bottom actions. Visual grammar is legacy and behavior-sensitive. | Accepted V1 debt if functional QA passes. Requires long-form contract before production alignment. |
| Food & Drink Library Edit Item form | NEEDS CONTRACT | Same component as Create, with edit identity/subtitle and dirty-cancel behavior. Edit duplicate warning absence is accepted by MYORIA-477 unless QA rejects it. | Accepted V1 debt if edit/save/cancel validation passes. Align in the same implementation family as Create. |
| Nutrition entry delete confirmation | PASS | Logged-entry snapshot/delete grammar is covered by `screen-composition-contract-v1.md`; local destructive behavior is separate from form screens. | Accepted for V1 if delete QA passes. |
| Fluid entry delete/edit detail | PASS / FUNCTIONAL DEBT split | Delete detail uses logged-entry snapshot grammar. Amount edit workflows still share older form/action grammar. | Delete accepted. Amount-edit form alignment can follow the Add Fluid form grammar if needed. |
| Bodyweight detail delete confirmation | PASS | Bodyweight delete-and-relog is accepted by MYORIA-474 and snapshot delete grammar is covered. | Accepted for V1 if delete/relog QA passes. Direct edit remains deferred. |

## Preferred V1 Form Grammar

Core Tracking form screens should be restrained, quiet, token-backed, and
consistent with Today/report/list surfaces. The target is not to make every
form invisible; it is to make user input feel like structured tracking rather
than a stack of app cards.

### Screen Header And Title Rhythm

- Use the shared full-screen background role.
- Use `SecondaryHeader` when the route has normal back navigation to a parent
  screen.
- Use a screen lead for current form identity, not a hero title.
- Keep form titles small and regular-weight, aligned with
  `uiTypography.screenTitle`.
- Put day/report/object context in subdued metadata, preferably mono when it is
  date/time/report context.
- Do not use oversized 32 px titles for Core Tracking forms.
- Do not solve root date versus child back-row rhythm inside individual form
  screens; that needs the separate shell/header contract noted by MYORIA-486.

### Field Labels

- Field labels use section-label grammar: uppercase, condensed, regular/medium
  weight, small, and quiet.
- Required status should be explicit but not visually loud. Prefer contract
  text such as `NAME` plus required help/error copy over ad hoc heavy `*`
  styling unless the form contract approves an indicator.
- Labels stay close to their field and do not become mini card headers.

### Field Values And Inputs

- Default text and numeric fields should use line-input grammar:
  transparent background, bottom divider, no rounded filled box.
- Numeric measurement-adjacent values may use mono input text.
- Input text should be regular weight. Avoid heavy `800/900` value typography
  inside editable fields.
- Placeholder color uses muted text roles.
- Disabled fields use semantic disabled state plus disabled color roles.
- Large boxed fields are not a default form primitive. If a later contract keeps
  a high-attention amount field boxed, it must name why, define its token roles,
  and keep it visually quieter than the current legacy fields.

### Vertical Rhythm

- Forms use `my-form`/section-gap rhythm with field-local gaps.
- Related fields may be grouped by structural spacing and section labels, not
  by decorative card chrome.
- Avoid card-in-card form sections.
- Long forms can retain logical sections, but section boundaries should be
  quiet spacing/divider decisions rather than rounded panels.

### Segmented Controls And Unit Selectors

- Unit selectors and nutrition-basis selectors need an explicit contract before
  production alignment.
- The preferred direction is a quiet segmented/text selector with clear selected
  state, 44 px touch targets, semantic `selected` accessibility state, and
  wrapping rules for narrow screens.
- Do not use large pill buttons, filled domain-color selection, or local
  one-off borders unless the contract deliberately approves them.
- Do not replace behavior-sensitive selectors with plain links without selected
  state and accessibility behavior.

### Boolean Toggles

- Contribution toggles need a formal quiet control contract.
- They must preserve semantic checkbox state and touch target size.
- The selected state should be clear without making the whole row a filled card.
- Boolean controls should not look like destructive/primary actions.

### Primary, Secondary, And Destructive Actions

- Report/list/object actions use quiet text action grammar by default.
- Form commit actions may use paired buttons when the action truly commits data,
  especially Save/Cancel pairs in long forms.
- Primary form actions should not introduce domain-specific green/teal local
  palettes.
- Secondary Cancel should be visually quieter than Save and must remain
  available unless a submit is actively in flight.
- Destructive actions should use the destructive role and factual copy.
- Local lifecycle actions such as `Hide from logging` should not look like a
  global primary CTA.

### Form Action Row

- A form action row should be a reusable primitive, not route-local button
  styling.
- Paired actions align predictably and preserve minimum touch targets.
- Disabled Save uses semantic disabled state and disabled color/opacity roles.
- Saving state may replace button text only when width/overflow remains stable.
- Avoid putting a bottom aggregate validation message in the action row unless
  the form contract explicitly approves it. Prefer field-local errors.

### Validation And Warning Messages

- Field errors appear directly under the relevant field/control.
- Error text uses `uiColors.error` / `.my-inline-error`, regular-weight help
  sizing, and no card chrome.
- Duplicate warnings and dirty-discard confirmations use neutral structured
  panels, not yellow/orange warning cards by default.
- Top-level save errors stay local to the form and should not hide fields or
  actions.
- Validation behavior remains owned by existing domain/application/UI form
  logic; visual alignment must not change validation semantics.

### Read-Only Projection Treatment

- Linked Nutrition + Fluid projections remain visible and useful.
- Unavailable edit/delete behavior uses the linked-unavailable grammar from
  existing contracts: quiet, factual, and not so muted that logged data looks
  lost.
- Projection screens must not imply an independent edit/delete action when the
  canonical linked lifecycle is unavailable for V1.

### Mixed Food + Drink Copy

- Mixed rows and selected confirmations must say that the item also logs Fluid
  without promising a fixed fluid amount that contradicts the selected amount.
- Preferred picker copy: `Also logs Fluid`.
- Preferred confirmation copy: factual, short, and tied to the selected amount
  when amount-specific projection is shown.
- Avoid explanatory paragraphs unless a user decision is required.

### Long-Form Create/Edit Item Behavior

- Create/Edit Item is a catalog-definition form, not a logging shortcut.
- Preserve one shared create/edit form component unless a later implementation
  issue proves a split is simpler.
- Preserve dirty-discard behavior, duplicate warning behavior, field-local
  validation, disabled Save behavior, and current create/edit route semantics.
- Use quiet sections for Basic, Counts toward, Values are for, Calories/macros,
  Optional label fields, Serving/package, and Fluid.
- Do not turn the form into a sequence of cards.
- Do not change duplicate detection or edit duplicate-warning policy as part of
  visual alignment.

### Scroll, Safe Area, And Keyboard Behavior

- Form screens inherit the full-screen `.my-screen` background.
- Scroll content should never reveal a contrasting shell background.
- Long forms use `ScrollView` with keyboard-safe behavior and enough bottom
  padding that final fields, confirmations, and actions are reachable.
- Keyboard behavior is part of the form contract. Implementation should verify
  amount entry, multiline fields, duplicate warning, dirty discard, and bottom
  actions on iOS.
- Do not fix perceived clipping with negative margins, absolute offsets, or
  route-specific nudges.

## V1 Acceptance Decision

Current Core Tracking V1 form grammar does not block release if functional QA
passes.

Accepted for V1:

- Add Food picker/search/list grammar.
- Add Food selected-item logging when amount, unit, mixed copy, cancel, submit,
  error, and return-to-report behavior pass QA.
- Add Fluid and Add Weight forms when save/cancel/error behavior passes QA.
- Food Library list grammar.
- Food Library Create/Edit forms when create, edit, validation, duplicate
  warning, dirty discard, archive/restore availability, and save behavior pass
  QA.
- Logged-entry detail/delete confirmation grammar for Nutrition, Fluid, and
  Bodyweight.

Not accepted as blockers unless manual QA proves an actual usability or
functional problem:

- Older rounded boxed inputs.
- Large filled Save/Cancel buttons.
- Heavy title/value typography.
- Bordered toggle/basis controls.
- Card-like duplicate/dirty confirmation boxes.
- Food Library detail summary cards.

Blockers for V1:

- A form control cannot be reached or operated on the release device.
- Text overlaps essential controls or cannot be read.
- Keyboard interaction prevents saving/canceling.
- Validation is hidden, misleading, or prevents valid saves.
- Mixed Food + Drink copy is misleading about what will be logged.
- Linked projections imply unavailable independent edit/delete actions.
- Lifecycle actions such as hide/restore cannot be completed.

## Accepted Debt

- Add Food selected-item confirmation visual grammar.
- Add Fluid/Add Weight form visual grammar.
- Food Library detail card/action grammar.
- Food Library Create/Edit long-form grammar.
- Food Library form segmented controls, toggles, duplicate warning, dirty
  discard, and bottom action row visuals.
- Header/date/back-row rhythm across root and child routes.
- RN primitive/token mapping for form-specific controls.

This debt should be paid down through focused implementation slices after the
contracts are explicit. It should not silently expand Core Tracking V1 scope.

## Recommended Follow-Up Issues

### 1. Define Core Tracking form primitives

Goal: create the missing styleguide/RN contract for form fields, numeric
fields, segmented/unit selectors, boolean toggles, form action rows, duplicate
warnings, dirty discard, disabled/saving states, and keyboard-safe scroll.

Non-goals:

- No production UI alignment.
- No token value changes unless separately approved.
- No domain/application/persistence changes.
- No route-specific styling fixes.

### 2. Align Add Fluid and Add Weight form grammar

Goal: migrate the small single-field forms to the approved form primitive
grammar.

Non-goals:

- No change to amount parsing, save/cancel behavior, timestamps, or persistence.
- No bodyweight direct-edit feature.
- No report-day changes.

### 3. Align Add Food selected-item form grammar

Goal: align selected food identity, amount input, unit selector, mixed Food +
Drink copy, Cancel, and submit action to the selected-confirmation contract.

Non-goals:

- No Add Food picker/list changes.
- No catalog-management controls inside Add Food.
- No linked-entry lifecycle change.
- No nutrition calculation changes.

### 4. Align Food Library Create/Edit form grammar

Goal: align long-form fields, sections, toggles, nutrition-basis selector,
validation, duplicate warning, dirty discard, and bottom actions.

Non-goals:

- No change to create/edit validation semantics.
- No duplicate-warning behavior change.
- No archive/restore behavior change.
- No Add Food behavior change.

### 5. Align Food Library detail grammar

Goal: replace summary cards, nested metric cards, heavy action buttons, and
confirmation card chrome with approved object-detail/lifecycle grammar.

Non-goals:

- No Create/Edit form work unless a prior issue explicitly shares primitives.
- No lifecycle persistence changes.
- No historical log mutation.

### 6. Define app shell/header rhythm contract

Goal: resolve the Today date-row versus child back-row/header rhythm noted in
MYORIA-486 across root, report, picker, form, and object-management surfaces.

Non-goals:

- No form field/control redesign.
- No background containment changes.
- No route-local pixel nudges.

## Documentation Decision

No update to `MYORIA-464` is required because the acceptance/debt status does
not change: current form visuals remain non-blocking debt when functional QA
passes.

No update to `MYORIA-480` is required because the runbook already treats Food
Library detail/form visual debt as non-blocking unless controls are unusable,
validation is blocked, text overlaps essential controls, or lifecycle actions
cannot be completed. A later QA-result document may cite this contract when
recording form-screen visual debt.
