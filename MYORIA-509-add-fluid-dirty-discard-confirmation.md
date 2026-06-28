# MYORIA-509 — Add Fluid Dirty-Discard Confirmation

## Purpose

Align the report-local Add Fluid dirty-discard confirmation with the existing
Core Tracking V1 visual grammar identified by MYORIA-508, without changing the
workflow's behavior or expanding the work into neighboring Fluid surfaces.

## Scope

Only the dirty-discard confirmation rendered by `FluidAddWorkflowScreen` was
changed. Its full-screen replacement structure remains intact.

The legacy pale, bordered panel and Fluid-local buttons were replaced with an
unframed contract-backed title/body hierarchy and `MyoriaFormActionRow`. The
existing destructive and primary action roles now provide the confirmation's
action grammar.

## Behavior Preserved

- Cancel opens the confirmation only when Type or Amount differs meaningfully
  from the initial Add Fluid values.
- An unchanged form closes immediately.
- Cancellation remains ignored while submission is in flight.
- The title remains `Discard fluid entry?`.
- The body remains `This will discard the fluid entry you started.`.
- The actions remain `Keep editing` and `Discard`, with their existing
  accessibility labels.
- Keep editing closes the confirmation and preserves Type and Amount.
- Discard resets the Add Fluid workflow and returns to the report without
  logging.
- Successful logging, validation, refresh, Day-mode return, and dirty-draft
  semantics remain unchanged.

## Visual Grammar Changed

- Removed decorative confirmation panel chrome from Add Fluid only.
- Replaced local heavy title/body styling with existing contract-backed screen
  lead roles.
- Replaced local confirmation buttons with the shared form action row's
  destructive and primary roles.
- Added focused coverage that verifies the shared action row and intended
  action tones without asserting brittle literal style values.

## Explicit Non-Goals

- No Fluid Entry Edit confirmation changes.
- No Fluid delete confirmation or delete-error changes.
- No Fluid Entry Detail, Edit, report mode, or standalone Today Add Fluid
  changes.
- No shared confirmation primitive.
- No copy, behavior, handler, accessibility, draft, or navigation changes.
- No Add Food, Food Library, Nutrition, Bodyweight, Workout, or Today changes.

## Remaining Debt

Fluid Entry Edit still uses the legacy pale-panel and rounded local action
grammar. Portions of Fluid Entry Edit and Detail also retain the broader visual
debt recorded by MYORIA-507 and MYORIA-508. Those surfaces require separate,
focused decisions.

## Manual QA Checklist

1. Today -> Fluid report -> Add fluid.
2. Change Type to Coffee and enter 250 ml.
3. Tap Cancel.
4. Confirm the discard confirmation appears.
5. Tap Keep editing and confirm Coffee / 250 ml remains.
6. Tap Cancel again.
7. Tap Discard and confirm no entry is logged and report returns.
8. Open Add fluid again, log Coffee 250 ml, and confirm Fluid report and Today
   refresh.
9. Confirm Fluid Entry delete confirmation still behaves as before.

## Change Boundaries

No tokens, token mirrors, style allowlists, data, generated output, domain,
application, persistence, schema, migration, or seed files were changed.
