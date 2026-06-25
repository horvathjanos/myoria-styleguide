# MYORIA-494 Add Food No-Result Create Entry

## Problem

Add Food search could find and select existing catalog foods, but a missing
food left the user at a dead end. The Food & Drink Library already supports
Create Item, and created items are available to Add Food search, but there was
no direct entry point from the Add Food no-result state.

## Chosen V1 Behavior

When Add Food has a non-empty search query and no matching results, the picker
shows the existing empty-state copy plus a quiet `Create item` text action.
Activating the action opens Food & Drink Library Create Item.

The Create Item form is prefilled with the trimmed Add Food search query as the
item name. All other fields keep the existing Food Library create defaults.

At the time MYORIA-494 shipped, successful create landed on the new Food &
Drink Library item detail screen. MYORIA-495 later replaced that temporary
fallback for Add Food-origin creates with a direct return to Add Food selected
item.

## Accepted Limitations And Debt

- Direct return to Add Food after create was deferred in MYORIA-494 and closed
  by MYORIA-495.
- The user can return to Add Food manually and search for the created item.
- The Create Item form remains the existing Food Library form. This issue does
  not redesign the form, change validation behavior, or add a wizard.
- No domain, application, persistence, schema, read-model calculation, or seed
  data changes are part of this slice.

## Manual QA Steps

1. Open Today, then open Nutrition report.
2. Tap `ADD FOOD`.
3. Search for a food name that has no catalog results.
4. Confirm `No catalog foods match this search.` and `Create item` are shown.
5. Tap `Create item`.
6. Confirm Food & Drink Library Create Item opens and the Name field contains
   the searched food name.
7. Complete the required nutrition or fluid fields and save.
8. For MYORIA-494 historical behavior, the app landed on the created Food &
   Drink Library item detail. For current behavior, use the MYORIA-495 QA note.
9. Return to Add Food and search for the same name when testing the historical
   fallback.
10. Confirm the created item appears and can still be selected/logged.
11. Repeat with an existing mixed nutrition + fluid catalog item and confirm
    Add Food search/select/log behavior remains unchanged.

## Return-To-Add-Food Note

Return-to-Add-Food was deferred for MYORIA-494 and implemented by MYORIA-495.
MYORIA-494 remains the source note for the no-result create affordance and name
prefill behavior.
