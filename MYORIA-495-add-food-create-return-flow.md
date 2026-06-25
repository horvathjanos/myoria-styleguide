# MYORIA-495 Add Food Create Return Flow

## Root Cause And Prior Debt

MYORIA-494 added the missing Add Food no-result entry point into Food & Drink
Library Create Item. That slice intentionally kept the existing Food Library
post-create behavior: successful create landed on the created item detail.

That was useful as a safe V1 fallback, but it left extra navigation work before
the user could log the food they had just created from Add Food search.

## Chosen Behavior

When Food & Drink Library Create Item is launched from the Add Food no-result
affordance, successful create returns to the originating Nutrition report Add
Food flow with the new item selected. The item is ready to log in the existing
selected-item step. The app does not auto-log it.

The created item uses the same default amount and unit behavior as normal Add
Food catalog selection:

- `per_100g` nutrition items select `100 g`.
- `per_100ml` nutrition or mixed nutrition + fluid items select `100 ml`.
- `per_serving` and `per_package` items select `1 piece` only when the serving
  unit is exactly `piece`; otherwise they select `1 portion`.

Food & Drink Library opened from the Today menu keeps the existing behavior:
Create Item still lands on the created item detail screen.

## Explicit Non-Goals

- No barcode, AI, image recognition, or external nutrition lookup.
- No Food Library redesign, Add Food redesign, or form wizard.
- No raw token value changes and no styleguide token allowlist changes.
- No domain, application, persistence, schema, migration, read-model, or seed
  data changes.
- No auto-logging after create.

## Manual QA Steps

1. Open Today, then Nutrition report, then `ADD FOOD`.
2. Search missing item `QA Missing Apple`.
3. Use the no-result `Create item` affordance.
4. Confirm Create Item opens and Name is prefilled with `QA Missing Apple`.
5. Save a valid nutrition item.
6. Confirm the app returns to the Add Food selected-item screen, not Food
   Library item detail.
7. Confirm the created item is selected with the expected default amount/unit.
8. Press the existing log button.
9. Confirm Nutrition report and Today summary refresh.
10. Open Today menu, then Food & Drink Library, then Create Item.
11. Save a valid item and confirm normal Food Library create still lands on the
    created item detail.
12. Repeat Add Food with existing Chicken breast and confirm normal catalog
    selection/logging still works.
13. Repeat Add Food with existing NÖM mixed nutrition + fluid item and confirm
    Fluid updates too.

## Change Boundary Confirmation

MYORIA-495 is a UI/navigation state wiring slice. It preserves existing Food
Library create/edit/detail/archive behavior outside the Add Food-origin route
and preserves existing Add Food selected-item logging behavior.

No domain, application, persistence, schema, migration, read-model, seed data,
token value, or token allowlist changes were made.
