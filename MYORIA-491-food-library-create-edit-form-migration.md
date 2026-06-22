# MYORIA-491 Food Library Create/Edit Form Migration

## Status

- Ticket: MYORIA-491 / GitHub issue #479
- Scope: Food & Drink Library create/edit item form surfaces
- Production UI touched: yes
- Domain/application/persistence behavior touched: no
- SQLite schema or seed data touched: no
- Workout touched: no

## What Changed

- Migrated Food & Drink Library create/edit text and numeric fields to
  `MyoriaFormField` and `MyoriaTextInput`.
- Migrated field-local validation copy to shared validation text grammar.
- Migrated `Counts toward` and `Values are for` controls to the shared
  `MyoriaOptionGroup` visual grammar.
- Migrated Save/Cancel, duplicate-save, and dirty-discard action clusters to
  `MyoriaFormActionRow`.
- Adjusted long-form spacing and bottom scroll padding with existing
  styleguide contract tokens so the action row remains part of scroll content.

## What Stayed Unchanged

- Create, edit, cancel, dirty-discard, duplicate-warning, and save behavior.
- Current form state model and validation inputs.
- Food & Drink Library read models, use cases, repositories, and persistence.
- SQLite schema, migrations, seed data, and import/export behavior.
- Food & Drink Library list and detail redesign work.

## Accepted Visual Debt

- The surrounding Food & Drink Library detail screen still uses older summary
  card and lifecycle confirmation styling. That remains accepted V1 visual debt
  and was not addressed in this slice.
- Shared option group controls are used for the multi-select `Counts toward`
  choices without changing the underlying two-boolean form model.
- Duplicate and dirty-discard panels keep the existing neutral boxed container
  treatment while their action rows now use the shared primitive.

## Manual QA Checklist

- Food & Drink Library -> Create item opens.
- Empty submit shows required validation, especially `Name is required.`.
- Creating a nutrition-only item still works.
- Creating a fluid-only item still works where supported by the current UI.
- Creating a mixed nutrition + fluid item still works where supported by the
  current UI.
- Existing edit flow preserves current behavior and values.
- Cancel navigation and dirty-discard flow still work.
- Save disabled/enabled behavior remains correct.
- Long forms remain scrollable on iPhone simulator and action buttons do not
  cover fields.
- Duplicate warning still allows Cancel and Save anyway.

## Deferred

- Workout remains deferred.
- Food & Drink Library detail-screen visual migration remains a separate
  follow-up.
