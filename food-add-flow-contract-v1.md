# Food Add Flow Contract v1

## Status

- Ticket: MYORIA-451
- Surface: Add Food logging task flow opened from Nutrition Report `ADD FOOD`
- Scope: styleguide/design-system contract only
- Production UI touched: no

## Route

Canonical styleguide route:

```text
/screens/add-food/
```

The route demonstrates:

- default state with recent catalog foods
- search state with filtered rows
- no-results state
- loading/error state
- long-name truncation and fixed trailing kcal alignment

## Surface Roles

### Nutrition Report `ADD FOOD`

`ADD FOOD` is the quiet task entry point inside Nutrition Report day mode. It belongs to the report entries section and should keep the report-day action grammar.

### Add Food Flow

Add Food is a logging task flow. It is not a catalog editor. It exists to:

- find an active nutrition-capable catalog item
- show enough item context to choose confidently
- select the item for a supported amount/unit confirmation step
- cancel back to the Nutrition Report without duplicating the report back header

### Food & Drink Library

Food & Drink Library remains the object/catalog management surface. It owns creating, editing, archiving, restoring, aliases, duplicate warnings, and contribution settings. Add Food may refer the user to the library when no result exists, but it must not absorb library management controls.

## Screen Grammar

Add Food should feel related to report-day grammar, but not identical.

- Use a quiet screen identity: `Add food`.
- Include selected-day/report context as subdued mono metadata when useful.
- Use an underline search input, not a rounded card or form panel.
- Use unframed rows with dividers.
- Use text-only local loading, error, and empty states.
- Keep the action model explicit: Cancel closes the task flow. The report back control is not duplicated inside Add Food.
- Avoid decorative icons, shadows, filled cards, badges, or route-specific ornamental chrome.

## Row Grammar Decision

Rows show one essential trailing value: `kcal`.

Macros remain subordinate metadata below the default serving. This is the contract decision because Add Food is a selection task: the user needs a stable item name, a stable energy value, and enough secondary detail to distinguish similar foods. Showing multiple right-side macro values would compete with long names and recreate the production overflow risk.

Canonical row anatomy:

```text
Chicken breast                         165 kcal
Default 100 g
31 g protein · 0 g carbs · 3.6 g fat
```

The row may include a mixed nutrition/fluid note at the end of the macro line, for example `also logs Fluid`, but that note is subordinate and must truncate safely before it pushes the trailing kcal value.

## Overflow Rules

The row layout must reserve a fixed trailing value area for kcal and keep all flexible text in `minmax(0, 1fr)` regions.

Required behavior:

- food names are single-line and ellipsized
- kcal is right-aligned, non-wrapping, and not compressed by long names
- default serving is single-line and ellipsized
- macro text is single-line and ellipsized
- macro text never sits beside the header as a sibling in a horizontal row
- no horizontal scrolling or clipping off the phone viewport

The styleguide route includes `NÖM PRO 35 Protein Drink Chocolate` and a deliberately long catalog food name to prove this behavior.

## States

### Default

Shows recent catalog foods with a blank search input. The section label is `Recent`.

### Search

Shows typed query and filtered catalog rows. The section label is `Search results`.

### No Results

Shows quiet text inside the list area. Do not add illustrations, empty cards, or management actions. If copy references Food & Drink Library, it should do so as the later catalog-management place, not as an inline Add Food action.

### Loading/Error

Use compact text-only local status/error copy. Do not introduce alert cards unless a broader state contract later requires it.

## Density And Theme

The route inherits the global styleguide theme and density controls.

- Comfortable density should keep the task flow calm and scannable.
- Compact density should tighten row and state spacing without changing row anatomy.
- Light and dark modes must preserve contrast for title, metadata, kcal, dividers, search input, local error, and Cancel.

## Production Guidance

Do not change production behavior when implementing this grammar. Production alignment should preserve:

- opening from Nutrition Report day `ADD FOOD`
- forced day mode
- recent limit
- search trim/limit behavior
- explicit Cancel
- supported units/default amount from the boundary option
- local typed errors
- successful reset/refetch/return-to-day behavior

Recommended next slices:

1. `MYORIA-454 fix Add Food row overflow/truncation`
2. `MYORIA-452 align Add Food production screen grammar`
3. `MYORIA-453 align Food & Drink Library production grammar`

`MYORIA-454` is the smallest safe production slice because it can restructure only `NutritionAddFoodOptionRow` layout to match the fixed trailing kcal/vertical metadata contract while preserving behavior.
