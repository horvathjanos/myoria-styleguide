# MYORIA-490 Add Food Selected Form Migration

## Status

- Issue: MYORIA-490 / GitHub issue #477
- Scope: production UI migration for the selected Add Food logging step
- Screen touched: `NutritionAddFoodWorkflowScreen`
- Domain/application/persistence behavior touched: no
- Styleguide route/source touched: no
- Source contracts: MYORIA-487, MYORIA-488, MYORIA-489

## Scope

MYORIA-490 migrates only the selected-food amount/unit confirmation step that
appears after choosing a catalog item in Add Food.

The migrated state covers:

- nutrition-only selected items, such as Chicken breast
- mixed nutrition + fluid selected items, such as NÖM PRO 35 Protein Drink
  Chocolate

## What Changed

The selected Add Food form now uses the shared Core Tracking V1 form primitives:

- `MyoriaFormField` for Amount and Unit labels
- `MyoriaTextInput` for the numeric amount line input
- `MyoriaOptionGroup` for the unit selector
- `MyoriaFormActionRow` for Cancel and Log actions

The selected item summary was reduced to quiet, token-backed text instead of a
boxed totals card. Mixed nutrition + fluid items keep the short `Also logs
Fluid` copy from the Add Food flow.

## What Did Not Change

- Add Food catalog search/list was not redesigned.
- Food & Drink Library list/detail/create/edit were not migrated.
- Item detail cards were not migrated.
- Header/date/back-row rhythm was not changed.
- Report screens were not migrated.
- Nutrition, fluid, application, domain, persistence, and seed behavior were not
  changed.

## Screenshots And Manual QA Expectations

Manual QA should verify the selected Add Food step after choosing:

- a nutrition-only item, for example Chicken breast
- a mixed nutrition + fluid item, for example NÖM PRO 35 Protein Drink Chocolate

Expected result:

- the screen keeps one continuous full-screen background
- selected item identity appears as quiet text, not a nested card canvas
- Amount uses line-input grammar
- Unit uses the shared quiet option selector
- Cancel and Log use the shared form action row
- mixed items clearly show `Also logs Fluid`
- submitting still logs the existing Nutrition projection, and mixed items still
  log the linked Fluid projection

## Remaining Debt

- Add Food catalog list/search remains as-is.
- Food & Drink Library list/detail/create/edit remain separate legacy debt.
- Header/date/back-row rhythm remains separate contract work.
