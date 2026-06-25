# MYORIA-492 Food Library Validation Visibility

## Status

- Ticket: MYORIA-492 / GitHub issue #480
- Scope: Food & Drink Library create/edit form validation visibility
- Production UI touched: yes
- Domain/application/persistence behavior touched: no
- SQLite schema or seed data touched: no
- Workout touched: no

## Root Cause

MYORIA-491 migrated the Food & Drink Library create/edit form to shared form
primitives, but the screen rendered every validation error as soon as the
container computed invalid form state. That coupled form validity to validation
visibility, so an empty Create Item screen opened with required field errors,
red input styling, and the global `Please fix the highlighted fields.` message.

## Final Behavior Contract

- Form validity may be computed immediately.
- Save may remain disabled while required fields are empty or invalid.
- Field-local validation messages and red input styling are visible only after
  the relevant field/control has meaningful interaction, currently blur for
  text inputs or selection interaction for option controls.
- The global validation message appears only when at least one field-local
  validation message is visible.
- Edit mode follows the same visibility contract without changing existing
  value loading or save behavior.

## What Changed

- The container now keeps the complete validation result for Save enablement.
- The container separately tracks which form fields may show validation.
- The form screen renders only visible validation errors and uses a separate
  `canSave` prop for Save state.
- Food Library rows now use `Default 100 g` / `Default 100 ml` for default
  basis-backed items without an explicit serving size, matching the Add Food
  search result wording more closely.

## What Was Intentionally Not Changed

- No domain, application, repository, SQLite, migration, or seed behavior.
- No duplicate detection, dirty-discard, create, edit, archive, or restore
  behavior.
- No token values, token allowlists, or form primitive styling.
- No redesign of the form, detail screen, Add Food flow, or Workout surfaces.

## Manual QA Steps

1. Open Today -> top-right menu -> Food & Drink Library -> CREATE ITEM.
2. Confirm the empty Create Item form shows no required field errors and no
   global validation message.
3. Confirm Save is disabled while required nutrition fields are empty.
4. Focus and blur Name or a required nutrition field while it is empty; confirm
   only that field's validation becomes visible.
5. Enter valid name, kcal, protein, carbs, and fat values; confirm Save enables.
6. Save the item and confirm it appears in Food & Drink Library.
7. Confirm the created item appears in Add Food search and can be selected.
8. Open an existing item, edit a value, and confirm Save still works.
