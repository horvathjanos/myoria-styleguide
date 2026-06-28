# MYORIA-510 — Add Fluid Discard Action Grammar Correction

## Status

- Ticket: MYORIA-510 / GitHub issue #498
- Scope: report-local Add Fluid dirty-discard confirmation only
- Production UI changed: yes
- Domain, application, persistence, schema, seed, tokens, and allowlists changed: no

## Correction

MYORIA-509 reused `MyoriaFormActionRow` for the Add Fluid dirty-discard
confirmation. Its filled black primary action and filled red destructive action
are not approved MYORIA confirmation grammar.

The confirmation now follows the existing quiet Food Library action direction:

- transparent text actions with underlined labels;
- destructive color on the Discard label without a filled red surface;
- primary text color on Keep editing without a filled black surface; and
- existing action typography, pressed opacity, spacing, and minimum touch
  targets.

The confirmation also uses the normal comfortable screen top padding so its
identity content clears the iOS status bar and Dynamic Island area.

## Behavior Preserved

- Dirty Cancel opens the confirmation.
- Keep editing returns to the form with Type and Amount preserved.
- Discard exits without logging.
- Log fluid, validation, and all existing Fluid report/detail behavior remain
  unchanged.

## Change Boundaries

The shared `MyoriaFormActionRow` remains unchanged because its filled form
commit grammar is still used by neighboring forms. This correction is local to
the Add Fluid discard surface and does not establish a new shared primitive.
