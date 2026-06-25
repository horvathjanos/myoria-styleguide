# MYORIA-500 Food Library Detail Visual Grammar

## Status

- Ticket: MYORIA-500 / GitHub issue #488
- Scope: Food & Drink Library item detail visual grammar alignment
- Production UI touched: yes
- Shared primitives touched: no
- Domain/application/persistence/schema/seed changes: no
- Token changes: no
- Style allowlist changes: no
- Generated output manual edits: no

## Issue Scope

This slice implements the smallest MYORIA-499 follow-up for the Food & Drink
Library detail route. It only changes read-only detail presentation, local
lifecycle action styling, focused UI tests, and this implementation note.

It does not change Food Library Create/Edit forms, Add Food search or selected
flows, Today, reports, domain models, use cases, repositories, SQLite schema,
seed data, import/export, or Workout.

## Visual Grammar Changed

- Replaced rounded bordered detail summary cards with transparent,
  divider-backed object-detail sections.
- Replaced nested nutrition/fluid metric cards with quiet token-backed
  label/value readouts.
- Reduced the item title to the current Core Tracking V1 screen-title rhythm.
- Kept contribution and archived state in the identity metadata line.
- Kept section labels, detail labels, values, errors, and actions backed by the
  existing styleguide contract roles.
- Reworked Edit, Hide from logging, Restore to logging, and confirmation
  actions as quieter local text actions instead of filled/bordered card-like
  buttons.
- Kept stable detail section markers for focused tests:
  `food-library-detail-nutrition-section`,
  `food-library-detail-fluid-section`,
  `food-library-detail-serving-section`,
  `food-library-detail-aliases-section`,
  `food-library-detail-note-section`, and
  `food-library-detail-status-section`.

## Behavior Preserved

- Opening item detail remains owned by `FoodDrinkLibraryScreenContainer`.
- Missing item detail behavior remains unchanged.
- Back from detail still returns to the Food & Drink Library list.
- Edit still opens the existing edit form.
- Hide/archive still requires the existing inline confirmation and copy.
- Keep item still cancels archive confirmation.
- Confirm hide still calls the existing archive use case.
- Restore still calls the existing restore use case without confirmation.
- Archive/restore still reload list/detail state through the existing
  container flow.
- Nutrition, fluid contribution, serving, aliases, note, and archived status
  remain visible when applicable.

## Intentionally Not Changed

- No Create/Edit form layout, validation, duplicate warning, dirty discard, or
  save behavior.
- No Add Food availability, search, selected step, no-result create, or
  create-return behavior.
- No report, Today, app-shell, navigation, import/export, Workout, domain,
  application, persistence, schema, migration, or seed changes.
- No token values, token mirror changes, or style allowlist changes.

## Accepted Remaining Debt

- Food Library detail still needs a broader object-detail contract if future
  surfaces need the same read-only anatomy.
- Archived state remains duplicated in identity metadata and the Status
  section for clarity.
- Create/Edit long-form visual hierarchy remains separate accepted debt.
- Manual QA is still required on the target iOS device/simulator for long names,
  long aliases, notes, and lifecycle pending labels.

## Manual QA Checklist

1. Today -> menu -> Food & Drink Library.
2. Open a nutrition-only item detail.
3. Confirm detail uses aligned grammar and values remain correct.
4. Open a mixed Nutrition + Fluid item detail if available.
5. Confirm nutrition and fluid values are visible.
6. Tap Edit and confirm edit form still opens.
7. Cancel back.
8. Trigger archive confirmation and cancel.
9. Archive item, check archived scope, restore item.
10. Confirm item is still available/unavailable in Add Food according to
    existing archive behavior.

## Verification Notes

Focused tests now cover detail identity/status, section markers, nutrition
values, fluid contribution, aliases, note, edit action, hide confirmation, and
restore action. Full command results are recorded in the MYORIA-500 final
implementation response.
