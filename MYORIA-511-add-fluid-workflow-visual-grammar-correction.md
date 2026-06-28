# MYORIA-511 — Add Fluid Workflow Visual Grammar Correction

## Status

- Ticket: MYORIA-511 / GitHub issue #499
- Scope: report-local Add Fluid header and dirty-discard confirmation verification
- Production UI changed: yes, Add Fluid header only
- Domain, application, persistence, schema, migration, seed, tokens, token
  mirrors, style allowlists, and generated output changed: no

## What Was Wrong

The report-local Add Fluid form still opened with the legacy Fluid-local header:
an uppercase green `Water/Fluid` kicker, a heavy navy hero title, and the local
`Amount in ml` subtitle. That hierarchy did not match the quiet Core Tracking
workflow grammar already used by the approved Add Food flow.

The dirty-discard confirmation had already moved away from filled shared form
actions in MYORIA-510, but the intended unfilled action treatment was not
explicitly protected alongside the corrected workflow identity.

## What Changed

- Removed the visible `Water/Fluid` kicker from Add Fluid without replacing it
  with another category label.
- Replaced the legacy header hierarchy with the shared quiet screen lead:
  `Add fluid` as the title and `Fluid report` as its context.
- Kept the confirmation unframed and retained its transparent, underlined text
  actions. `Discard` remains destructive red text without a red block, and
  `Keep editing` remains primary text without a black block.
- Added focused assertions for the corrected identity and unfilled confirmation
  actions.

## Intentionally Unchanged

- Type choices, amount draft, validation, submission, pending state, and clean
  cancellation.
- Dirty-cancel, keep-editing, and discard behavior and accessibility labels.
- Confirmation copy.
- Fluid report summary/list, entry detail, edit, and delete confirmation.
- Nutrition, Food Library, Bodyweight, Workout, Today, domain, application,
  persistence, schema, migration, seed, tokens, token mirrors, style allowlists,
  and generated styleguide output.

## Manual QA Checklist

1. Open Today -> Fluid report -> Add fluid.
2. Confirm the lead reads `Add fluid` and `Fluid report`, with no visible
   `Water/Fluid` kicker or green uppercase title fragment.
3. Confirm Water, Coffee, and Other selection still works.
4. Enter invalid and valid amounts and confirm validation and logging behavior
   are unchanged.
5. Cancel an unchanged form and confirm it exits immediately.
6. Change Type or Amount, tap Cancel, and confirm the discard copy is unchanged.
7. Confirm Discard and Keep editing are unfilled text actions with no card or
   panel chrome; Discard may be red text but is not a red block.
8. Choose Keep editing and confirm the draft is preserved.
9. Reopen the confirmation, choose Discard, and confirm the flow exits without
   logging.
10. Confirm Fluid entry detail, edit, and delete confirmation are unchanged.

## Change Boundaries

No token, token-mirror, style-allowlist, data-layer, or generated-output files
were changed. No Add Fluid behavior or neighboring Fluid surface was redesigned.
