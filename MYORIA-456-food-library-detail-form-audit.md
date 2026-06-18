# MYORIA-456 Food Library Detail / Form Grammar Audit

## Status

- Ticket: MYORIA-456
- Scope: audit and design documentation only
- Production UI touched: no
- Styleguide route/source touched: no
- Decision: do not align Food Library detail or create/edit production grammar until focused styleguide contracts exist.

## Context

MYORIA-453 aligned the Food & Drink Library list/search surface toward the current Myoria object-list grammar. Manual visual QA after that slice found that deeper Food Library surfaces still visibly carry older grammar:

- detail summaries use rounded, bordered cards
- detail actions use large filled/bordered buttons
- hide confirmation uses a card-like panel
- create/edit fields use rounded bordered inputs and large toggle/pill controls
- long-form validation and bottom actions still need a current grammar contract
- screenshots showed awkward partial card boundaries during scroll

This audit maps those remaining surfaces and recommends the smallest safe design and production slices. It does not implement UI changes.

## Flow Map

Food & Drink Library remains an object/catalog management surface, not the Add Food logging task.

1. Today opens `FoodDrinkLibraryScreenContainer` from the app shell.
2. The list route shows `FoodDrinkLibraryScreen` with `SecondaryHeader`, screen identity, search, active/archived scope controls, Create Item, and catalog rows.
3. Tapping a row calls `handleOpenDetail`, loads the full record by id, and routes to `FoodDrinkLibraryDetailScreen`.
4. Detail shows the item identity, contribution status, nutrition/fluid/serving/alias/note/status sections, and local lifecycle actions.
5. Edit routes from detail into `FoodDrinkLibraryFormScreen` with initial values mapped from the selected record.
6. Create routes from the list into the same `FoodDrinkLibraryFormScreen` with empty defaults.
7. Save validates form values, checks duplicate candidates for create, then calls application use cases for create or update.
8. Archive/hide and restore stay on detail and call application use cases, then reload the list.

## Component And Source Map

### Detail

- `src/ui/nutrition/FoodDrinkLibrary/FoodDrinkLibraryDetailScreen.tsx`
  - `FoodDrinkLibraryDetailScreen`
  - `NutritionSummary`
  - `FluidSummary`
  - `ServingSummary`
  - `AliasSummary`
  - `SummarySection`
  - `Metric`
  - `DetailRow`
- `src/ui/nutrition/FoodDrinkLibrary/FoodDrinkLibraryFormatters.ts`
  - contribution, basis, and number display helpers
- `src/ui/nutrition/FoodDrinkLibrary/FoodDrinkLibraryScreen.styles.ts`
  - shared detail/form/list styles, including current legacy card and button styles

### Create/Edit Form

- `src/ui/nutrition/FoodDrinkLibrary/FoodDrinkLibraryFormScreen.tsx`
  - `FoodDrinkLibraryFormScreen`
  - `FormSection`
  - `InputField`
  - `ToggleRow`
  - `InlineErrors`
  - `BasisButton`
- `src/ui/nutrition/FoodDrinkLibrary/FoodDrinkLibraryScreenContainer.tsx`
  - route state, create/edit values, validation, dirty discard, duplicate warning, save, archive, restore
- `src/ui/nutrition/FoodDrinkLibrary/__tests__/FoodDrinkLibraryScreen.test.tsx`
  - current tests for validation placement, duplicate warning, list/search/scope/create/row behavior, and repository loading

Create and edit share one form component. The mode only changes title copy, the edit subtitle, initial values, and whether create runs duplicate detection before save.

## Existing Behaviors To Preserve

- Food Library stays catalog/object management.
- Add Food remains the logging task flow and must not absorb library management.
- Back from list returns to Today.
- Back from detail returns to the library list, not Today.
- Create starts from empty defaults.
- Edit starts from the selected record values.
- Dirty create/edit cancel opens discard confirmation.
- Clean create cancel returns to list.
- Clean edit cancel returns to detail.
- Validation remains field-local.
- Save stays disabled while validation errors exist or while saving.
- Create duplicate warning remains separate and allows Save anyway.
- Create duplicate warning clears when values change.
- Archive/hide does not delete historical logs.
- Restore makes archived items available for logging again.
- Lifecycle pending states disable relevant archive/restore actions.
- Detail error messages remain local to the Food Library surface.
- Archive/restore and create/update reload the list after successful use-case calls.

## Current Visual Grammar Observations

### Detail Identity

The detail route uses `SecondaryHeader` with `Food & Drink Library` as the back destination. The item name and contribution copy are rendered below as a snapshot-like identity block.

This direction is conceptually sound: the item itself is the current object, and the back label names the parent surface. The issue is not the identity model; it is the body/action grammar below it.

### Detail Sections

`SummarySection` wraps Nutrition, Fluid, Serving, Aliases, Note, and Status in a white rounded bordered box:

```text
summarySection:
  backgroundColor: #FFFFFF
  borderColor: #DDE4DF
  borderRadius: 8
  borderWidth: 1
  padding: 14
```

This reads as older card grammar. The current report/detail family uses unframed snapshot details, structural spacing, and quiet readouts rather than stacked cards. For Food Library, some grouping should remain because catalog definitions have multiple fields, but the grouping does not need to be a card for every section.

Recommended direction: define object-detail sections that use quiet section labels, divider/spacing rhythm, and value rows. Nutrition can remain a grouped fact cluster because it has several related values; Fluid, Serving, Aliases, Note, and Status can likely become quiet sections without card chrome.

### Nutrition And Fluid Facts

Nutrition currently nests `metricCell` cards inside the Nutrition summary card:

```text
metricCell:
  backgroundColor: #F7F8F4
  borderRadius: 8
  borderWidth: 1
  fontWeight: 900 value
```

This creates card-in-card density and makes catalog facts feel like dashboard KPIs. A Food Library object detail should read as structured reference data. It is closer to object detail grammar than report-day summary grammar, but it can reuse measurement/readout principles:

- value first
- subdued labels
- mono numeric values where precision matters
- no nested cards

Fluid currently uses the same `Metric` component for a single `Counts as fluid` value. That is visually too heavy for one fact.

### Detail Actions

Detail actions use large button grammar:

- `Edit` is a filled green primary button.
- `Hide from logging` and `Restore to logging` are large bordered secondary buttons.
- hide confirmation uses `confirmationBox` with bordered card chrome and paired large buttons.

The current detail/action styleguide for entry details favors local text actions and inline confirmations. Food Library actions are not exactly logged-entry corrections, but they are local object actions, not primary app CTAs. A better contract should distinguish:

- `Edit`: quiet primary object action, probably a text action or header-level text action if the contract chooses action-bearing headers.
- `Hide from logging`: lifecycle/destructive-adjacent text action, likely destructive tone because it removes the item from normal logging search.
- `Restore to logging`: constructive lifecycle text action, quiet but not destructive.
- confirmation actions: inline local confirmation, factual copy, paired text actions or compact buttons depending on final form/action contract.

### Create/Edit Form Shell

The form route does not use `SecondaryHeader`; it renders a local `header` with `Create item` / `Edit item`. Cancel lives at the bottom.

This is behaviorally different from detail/list because Cancel may trigger dirty discard confirmation. A future contract should decide whether the form gets:

- a secondary header back destination plus dirty-discard interception, or
- a form title with bottom Cancel/Save only, as today.

Do not change this casually. Navigation semantics, dirty confirmation, and keyboard behavior are behavior-sensitive.

### Form Inputs

`InputField` currently uses `formInput`, a large white rounded bordered input. The styleguide input primitive is an underline `my-line-input`. Production list/search and Add Food already moved toward underline inputs.

Long create/edit forms need more than swapping border styles. The contract must define:

- label role and casing
- required indicator placement
- numeric input alignment/font
- multiline field height
- field help vs inline error hierarchy
- spacing between dense fields
- keyboard and scroll behavior
- disabled/saving states

### Toggles And Basis Controls

`ToggleRow` and `BasisButton` use large bordered row/pill controls. They are behavior-sensitive because they represent boolean contribution settings and mutually exclusive nutrition basis selection.

The styleguide currently has generic button roles and line inputs, but no approved segmented/toggle grammar for long forms. This is a gap. Do not convert these controls to text links; they need explicit selected state, accessibility state, and touch targets.

### Validation And Error States

Validation is field-local and already tested. That should be preserved.

Current issues are visual, not behavioral:

- `fieldErrorText` is bold and compact, which can compete with labels in dense forms.
- `formActionMessage` sits in the bottom action row and can compress actions.
- duplicate and dirty-discard confirmations use bordered `confirmationBox`.
- top-level submit errors use `errorText` with padding that may not match form flow.

The current styleguide includes inline error and warning panel primitives, but not a full long-form validation contract. Food item create/edit should get one before production changes.

## Legacy Patterns Found

- rounded bordered `summarySection` cards for detail sections
- nested rounded bordered `metricCell` cards
- full-width filled/bordered action buttons for local detail actions
- rounded bordered `confirmationBox`
- rounded bordered `formInput`
- large bordered `basisButton` pills
- large bordered `toggleRow` controls
- strong/heavy font weights inside detail values and form controls
- unused or older styles remain in the shared style file, such as legacy create/search/card variants
- shared style file mixes list, detail, form, confirmation, validation, and action grammar, making accidental cross-route changes easy

## Grouping Assessment

Some grouping should remain, but not all groups need card chrome.

- Nutrition: should remain grouped because basis plus energy/macros/optional nutrients form one definition cluster.
- Fluid: should be a small fact section; a single metric card is too heavy.
- Serving: should be quiet value rows; it is object metadata, not a panel.
- Aliases: should be a quiet text/list section; can use divider rhythm or row-like aliases.
- Note: should be quiet body copy under a section label.
- Status: should be visible for archived objects, but likely as metadata in the identity block or a quiet section, not a card.

Food Library detail is closest to object-detail grammar. It may borrow measurement/readout roles from report detail, but it should not become a logged-entry snapshot because it edits catalog definitions rather than immutable logged facts.

## Scroll And Clipping Risk Assessment

The reported awkward partial card boundaries are plausible from current source:

- the detail route uses a full-screen root with `paddingTop: 80` and a `ScrollView` whose content is only the body below the identity block
- the body stacks multiple bordered cards with `gap: 16`
- each card has its own border and rounded corners, so partial scroll positions expose clipped-looking card edges at the top and bottom of the viewport
- nested metric cards inside a summary card multiply visible border edges
- detail actions and confirmation cards appear at the end of the same scroll stack, so action states can be partially cut by viewport boundaries

This is mostly a visual grammar risk, not a confirmed layout bug from code alone. It should be validated with simulator screenshots after a detail contract exists. If actual clipping is confirmed independent of card grammar, isolate it as a production fix.

## Safe Polish Versus Behavior-Sensitive Areas

Safer visual polish after a contract:

- replacing detail cards with quiet sections
- reducing nested metric card treatment
- aligning detail action grammar to local text actions
- making note/aliases/status section typography quieter
- reducing heavy font weights in read-only detail facts

Behavior-sensitive areas:

- form navigation and dirty-discard behavior
- disabled Save behavior when validation errors exist
- duplicate warning and Save anyway flow
- contribution toggles and nutrition basis selection
- archive/restore pending states
- restore/hide semantics and copy
- keyboard behavior in long forms
- validation location and accessibility labels

## Recommended Styleguide Contracts

### MYORIA-457 define Food Library detail styleguide grammar

Recommended first.

Define object-detail grammar for:

- nutrition-only item detail
- nutrition + fluid item detail
- fluid-only item detail if supported by existing data
- archived item detail
- aliases, note, serving, and status
- edit/hide/restore actions
- hide confirmation and lifecycle pending states
- detail scroll behavior and section boundaries

This contract should decide whether Food Library detail uses:

- object summary plus quiet detail sections, or
- a reusable object-detail rail distinct from logged-entry snapshot detail

### MYORIA-458 define Food item create/edit form styleguide grammar

Recommended as a separate contract.

Define long-form grammar for:

- create and edit shells
- Cancel/Save placement
- dirty-discard confirmation
- duplicate warning
- field labels, required markers, errors, and help text
- line inputs and numeric inputs
- multiline aliases/notes fields
- boolean contribution controls
- nutrition basis selection controls
- disabled/saving states
- keyboard/scroll expectations

The form has enough behavior and density to deserve its own contract. Combining it with detail would either underspecify validation or overcomplicate the detail slice.

## Recommended Production Slices

### MYORIA-459 align Food Library detail production grammar

Implement after MYORIA-457.

Smallest safe production scope:

- keep route behavior unchanged
- keep `SecondaryHeader`
- keep item identity and contribution metadata
- replace summary cards with approved detail sections
- remove nested metric cards
- align local actions/confirmation to the contract
- preserve edit/hide/restore behavior and tests

### MYORIA-460 align Food item create/edit form production grammar

Implement after MYORIA-458.

Smallest safe production scope:

- keep one shared create/edit form component
- preserve validation, duplicate warning, dirty discard, and save/cancel behavior
- align fields, toggles, basis controls, confirmation panels, and bottom actions to the contract
- add tests for required validation states and dirty/duplicate action grammar

### MYORIA-461 align Food Library action/confirmation grammar

Use this only if MYORIA-457 chooses to split actions out from detail. Otherwise include actions in MYORIA-459.

### MYORIA-462 fix Food Library detail scroll/card clipping if confirmed

Use this only if manual visual QA confirms a layout bug that remains after replacing or reducing card chrome. If the clipping perception is caused by old card grammar, MYORIA-459 should solve it without a separate bug slice.

## Explicit Non-Goals For The Next Slice

- Do not change Add Food behavior or UI.
- Do not move Add Food actions into Food Library.
- Do not change Food Library list/search behavior from MYORIA-453.
- Do not change domain/application/persistence behavior.
- Do not change validation semantics while changing form visuals.
- Do not change create/edit route semantics without a form contract.
- Do not introduce decorative cards, shadows, icons, badges, or route-specific pixel nudges.
- Do not add follow-up issue ceremony automatically.
- Do not edit the public `myoria-styleguide` repository directly.

## Verdict

Food Library detail and create/edit are two related but distinct design-system gaps.

Detail should be audited and contracted first because it is primarily read-only object presentation plus local lifecycle actions. It can likely converge toward quiet object-detail sections without changing behavior.

Create/edit should follow as a separate long-form contract because input, validation, duplicate warning, dirty discard, and selected toggle/basis controls are behavior-sensitive. The form should not be casually converted to underline inputs without defining selected controls, error hierarchy, and bottom action behavior.

Smallest safe next slice: `MYORIA-457 define Food Library detail styleguide grammar`.
