# MYORIA-449 Food Add / Food Library Flow Audit

## Status

- Ticket: MYORIA-449
- Scope: audit and design documentation only
- Production UI touched: no
- Styleguide source touched: no
- Decision: do not implement visual changes until Add Food has an explicit styleguide/design contract.

## Current Flow Map

### Nutrition Report Add Food

Add Food is a task flow inside the Nutrition Report day surface.

1. Today opens the Nutrition Report via the Nutrition dashboard action.
2. `NutritionReportDayMode` shows the quiet `ADD FOOD` action in the day entries section.
3. `NutritionReportScreenContainer` sets `isAddFoodOpen`, forces day mode, clears entry/detail/edit/delete state, and loads recent catalog options.
4. `NutritionReportScreen` replaces the report body with `NutritionAddFoodWorkflowScreen`.
5. The picker step shows search, recent options, search results, empty/loading/error states, and Cancel.
6. Selecting a catalog food opens the selected-food step with default amount/unit, supported unit choices, Cancel, and Log selected food.
7. Submit logs through the Nutrition Add Food application boundary and refetches the daily nutrition model before returning to the day report.

Important source paths:

- `src/ui/nutrition/NutritionReportScreen/NutritionReportDayMode.tsx`
- `src/ui/nutrition/NutritionReportScreen/NutritionReportScreen.tsx`
- `src/ui/nutrition/NutritionReportScreen/NutritionReportScreenContainer.tsx`
- `src/ui/nutrition/NutritionReportScreen/NutritionAddFoodWorkflowScreen.tsx`
- `src/application/nutrition/NutritionAddFoodOptionsReader.ts`
- `src/application/nutrition/GetNutritionAddFoodOptionsUseCase.ts`
- `src/application/nutrition/NutritionSelectedFoodLogSubmitter.ts`
- `src/application/nutrition/LogSelectedNutritionFoodUseCase.ts`

### Food & Drink Library

Food & Drink Library is an object/catalog management surface opened from Today's more menu.

1. Today more menu exposes Food & Drink Library before Settings & Data.
2. `MyoriaAppShell` opens `FoodDrinkLibraryScreenContainer` with the library repository, clock, and ID generator.
3. The list route shows a secondary header back to Today, the screen identity, search, active/archived scope controls, Create Item, and a list of catalog rows.
4. Opening a row routes to detail.
5. Create/Edit route to the form screen with validation, duplicate warning, dirty-discard confirmation, and save/cancel behavior.
6. Detail supports edit, hide/archive, restore, and confirmation states.

Important source paths:

- `src/ui/today/TodayShell.tsx`
- `src/ui/appShell/MyoriaAppShell.tsx`
- `src/ui/nutrition/FoodDrinkLibrary/FoodDrinkLibraryScreenContainer.tsx`
- `src/ui/nutrition/FoodDrinkLibrary/FoodDrinkLibraryScreen.tsx`
- `src/ui/nutrition/FoodDrinkLibrary/components/FoodDrinkLibraryRow.tsx`
- `src/ui/nutrition/FoodDrinkLibrary/FoodDrinkLibraryDetailScreen.tsx`
- `src/ui/nutrition/FoodDrinkLibrary/FoodDrinkLibraryFormScreen.tsx`
- `src/application/food/FoodDrinkLibraryRepository.ts`
- `src/application/food/FoodDrinkLibraryUseCases.ts`

## Shared Or Separate Implementation

The two flows share the same catalog data concept, but they do not share UI components.

- Add Food uses `NutritionAddFoodOption` read models and `NutritionAddFoodOptionsReader`/`NutritionSelectedFoodLogSubmitter` application boundaries.
- Food & Drink Library uses `FoodDrinkLibraryItem`, `FoodDrinkLibraryRepository`, and `FoodDrinkLibraryUseCases`.
- Add Food row rendering is local to `NutritionAddFoodWorkflowScreen`.
- Food Library row rendering is `FoodDrinkLibraryRow`.
- Add Food currently borrows `NutritionReportScreen.styles`, including styles that were also used by report entry/detail/edit routes.
- Food Library has its own `FoodDrinkLibraryScreen.styles` and already imports shared primitives such as `SecondaryHeader` and `MyoriaChevron`.

This separation is conceptually correct. A future shared row grammar can be defined at the design/style layer, but the logging task should not take on catalog-management behavior.

## Conceptual Difference

### Add Food

Add Food is a logging task flow. It should optimize for:

- finding an active nutrition-capable catalog item
- choosing a supported amount and unit
- confirming the exact thing that will be logged
- preserving the selected report day/time context
- returning to Nutrition Report day mode after a successful log
- keeping errors local to the task

It should not expose create/edit/archive library management inside the task flow unless a later decision explicitly adds that capability.

### Food & Drink Library

Food & Drink Library is catalog/object management. It should optimize for:

- searching active or archived items
- inspecting reusable food/drink definitions
- creating and editing item data
- managing aliases and contribution settings
- hiding/restoring items
- protecting duplicate and dirty-edit workflows

It should not become the primary food logging experience. Catalog changes may make items available for Add Food, but the object-management surface has a different job.

## Current UI Grammar Observations

### Add Food

Legacy or mismatched grammar:

- The Add Food route uses a large `Nutrition` kicker, `Add food` title, and `Catalog foods only` subtitle rather than the quieter secondary/report grammar used by the aligned report day surface.
- Search is rendered as an `editField` bordered panel with an uppercase label and an embedded input. This reads like older card/form grammar inside a task picker.
- Recent/search result rows use `styles.entryRow`, which is a white bordered rounded card. This differs from the current report day row grammar, which uses dividers and unframed rows.
- Row typography is heavier than the report day grammar: names and kcal use `fontWeight: '800'`, while the aligned report rows use regular-weight text and mono-like readout treatment where appropriate.
- Cancel is a bordered full-width form button. This is acceptable as a form action, but visually differs from the newer quiet text actions used in report and library surfaces.
- The selected-food step uses `detailTotalsBlock`, bordered edit fields, and segmented unit buttons. This may be acceptable for a confirmation form, but it needs an explicit contract before production changes.

Current strengths to preserve:

- Add Food does not duplicate the report back header.
- Add Food keeps an explicit Cancel action.
- The picker distinguishes recent options, search results, loading, empty, and typed error states.
- The selected-food step exposes boundary defaults and supported units only.
- Mixed nutrition/fluid items use explicit copy and a distinct submit label.
- Successful logging returns to Nutrition Report day mode and refetches the daily model.

### Food & Drink Library

Aligned or partially aligned grammar:

- The list route already uses `SecondaryHeader`.
- The title is quiet, regular-weight, and not a marketing/hero treatment.
- Search is underline-based, not a rounded card.
- Active/archived scope controls are text tabs with a separator.
- Create Item is a quiet text action.
- Rows are transparent, separated by dividers, and use a chevron affordance.
- Row title has `numberOfLines={1}` and the chevron is fixed-width and non-shrinking.

Remaining differences or risks:

- The style file still contains older rounded-card patterns for detail, form, summary, metric, toggle, and validation states. Those may be appropriate for forms but should be reviewed separately before any broad cleanup.
- The list screen's `totalInScope` prop is passed but not displayed.
- `searchField` appears unused in the list route and reflects older bordered search styling.
- Food Library is closer to the current grammar than Add Food, so it should not be churned first unless a specific library issue is visible.

## Overflow And Truncation Risk Assessment

### Add Food row risk

The visible right-side macro/kcal clipping risk is reproducible from the source layout.

`NutritionAddFoodOptionRow` renders a `Pressable` with `styles.entryRow`. That style sets `flexDirection: 'row'` and `alignItems: 'center'`. Inside it, the component renders:

- a top-level `View` using `styles.entryHeader`
- a following `Text` for macros
- an optional following `Text` for fluid contribution copy

Because those children are siblings in a row-direction container, the macro text is laid out horizontally beside the header instead of below it. The header also contains a left title group and right kcal text. This makes narrow screens especially vulnerable to clipping, compression, or off-screen macro text.

Additional risk details:

- `entryTitleGroup` has `flex: 1` but no `minWidth: 0`.
- `entryKcal` has no fixed/min width and no `flexShrink` strategy.
- The row does not wrap or constrain macro copy as a vertical stack.
- Long food names and longer kcal strings compete with macro text in the same horizontal row.

The likely intended structure already exists in the style file: `entryRowContent` is `flex: 1`, `gap: 6`, and `minWidth: 0`, but Add Food option rows do not wrap their row contents in it. This should be fixed in a small implementation slice, but not inside this audit.

### Food Library row risk

Food Library list rows are lower risk.

- `FoodDrinkLibraryRow` wraps row text in `itemContent` with `flex: 1` and `minWidth: 0`.
- `itemName` uses `numberOfLines={1}`.
- The chevron zone has `flexShrink: 0` and fixed width.
- The secondary line can still be long, but it is not competing with a right-side metric in the current component.

## Existing Behavior To Preserve

Add Food:

- `ADD FOOD` appears only when Nutrition Report day mode has an `onOpenAddFood` handler.
- Opening Add Food forces report mode to day and clears entry detail/edit/delete state.
- Recent options load with limit 8.
- Search trims query before calling the reader and uses limit 12.
- Blank search returns to recent options.
- Cancel is ignored while submit is in flight.
- Amount must parse to a positive number before submit.
- The selected default amount/unit comes from the boundary option.
- Supported unit buttons come only from `option.supportedUnits`.
- Mixed items keep Nutrition and Fluid copy and submit label.
- Typed boundary errors stay local to Add Food.
- Successful log refetches Nutrition day data, calls `onEntryLogged`, resets workflow state, and returns to day mode.
- Hardware back cancels Add Food while the route is open.

Food & Drink Library:

- Today more menu opens the library directly and passes repository, clock, and ID generator.
- Back returns to Today.
- Active and archived scopes are separate.
- Search filters within the active scope.
- Create opens a form with empty defaults.
- Detail opens by item ID and handles missing items with an error.
- Edit preserves initial values and dirty-discard protection.
- Validation remains field-local.
- Duplicate warning remains separate and allows Save anyway.
- Archive/restore use application use cases and reload the list.

## Recommended Next Slices

### 1. MYORIA-451 define Food Add flow styleguide grammar

Recommended first.

Create a focused Add Food design/styleguide contract before changing production UI. The contract should answer:

- route shell grammar inside Nutrition Report
- search field grammar for task pickers
- recent/search result row anatomy
- selected-food confirmation form grammar
- Cancel/submit action grammar
- truncation rules for food name, kcal, macro line, and mixed-fluid copy
- loading, empty, and error states

This should be a styleguide/design source slice, not production UI.

### 2. MYORIA-454 fix Add Food row overflow/truncation

Recommended as the smallest safe production fix after or alongside the contract if the visual bug needs immediate relief.

Keep behavior unchanged and only restructure `NutritionAddFoodOptionRow` layout so the row content stacks vertically and long text has clear shrink/truncation rules. The likely implementation is to wrap the existing header/macros/fluid copy in `entryRowContent` or Add-Food-specific row styles. Add focused tests against the style contract and row structure.

### 3. MYORIA-452 align Add Food production screen grammar

Recommended after MYORIA-451.

Align the Add Food picker and selected-food step to the contract. Keep the Nutrition Add Food application boundaries and route behavior unchanged.

### 4. MYORIA-453 align Food & Drink Library production grammar

Recommended later.

Food Library is already partially aligned and less visibly risky than Add Food. A later slice can review remaining detail/form/card grammar, unused list styles, and any contract differences from the library styleguide screen.

### 5. MYORIA-455 align food catalog/search/list row grammar

Use this only if the team decides Add Food and Food Library should share a row grammar contract. Do not force shared React components unless the resulting ownership is clearer than the current separation.

## Verdict

Align Add Food first, but define its styleguide/design contract before production changes. The Add Food row overflow is a real layout risk from the current source and can be fixed as a small behavior-preserving production slice. Food & Drink Library should not be the first target because its list route already follows much of the newer quiet secondary grammar and its remaining legacy patterns are mostly form/detail surfaces.
