# MYORIA-497 Add Food Search Step Form Grammar

## Status

- Ticket: MYORIA-497 / GitHub issue #485
- Scope: Add Food search/recent/no-result step visual alignment
- Production UI touched: yes, limited to `NutritionAddFoodWorkflowScreen`
- Domain/application/persistence/schema/seed changes: no
- Token changes: no
- Style allowlist changes: no

## What Changed

The Add Food picker keeps the existing quiet screen identity and divider-owned
catalog rows, but its search field now uses the shared Core Tracking form
primitives:

- `MyoriaFormField` for the `Search catalog` label rhythm
- `MyoriaTextInput` for the underline catalog search control
- `MyoriaFormActionRow` for the no-result `Create item` and `Cancel` actions

Catalog and recent result rows remain unframed, token-backed, and readable with
the existing fixed trailing kcal area plus stacked metadata for default amount,
macros, and mixed Food + Drink copy.

## Behavior Preserved

- Empty search still shows `Recent` entries and `Cancel`.
- Search input still filters catalog foods.
- Matching search still shows `Search results`.
- Selecting a catalog item still opens the selected Add Food confirmation step.
- Missing non-empty trimmed search still shows `No catalog foods match this search.`
- The no-result state still offers `Create item` only for a non-empty trimmed
  query with no matching catalog foods.
- `Create item` still launches Food & Drink Library Create Item with the
  trimmed search query as the prefilled name.
- Add Food-launched Create Item success still returns to Add Food with the
  created item selected, preserving MYORIA-495.
- Mixed nutrition + fluid catalog items still show `Also logs Fluid` and still
  log both nutrition and fluid through the existing Add Food submit path.
- `Cancel` from the search step still returns to Nutrition report.

## Deferred

- No broader Add Food route redesign.
- No Today changes.
- No Food & Drink Library list, detail, or form redesign.
- No changes to Add Food selected-item behavior beyond preserving the MYORIA-496
  shared form grammar.
- No new catalog-management controls inside Add Food beyond the already accepted
  MYORIA-494 no-result create action.

## Explicit Non-Changes

- No domain, application, persistence, schema, or seed changes.
- No style token value changes.
- No style allowlist changes.
