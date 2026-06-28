# MYORIA-508 — Fluid Confirmation Grammar Audit

## Status

- Ticket: MYORIA-508 / GitHub issue #496
- Scope: docs-only audit
- Production UI changed: no
- Tests changed: no
- Token, style, and data changes: no

## Purpose

This is the post-MYORIA-506 confirmation-grammar checkpoint for the Fluid
report workflow. It inspects the confirmation and delete-error states left
around the newly aligned Add Fluid main form and decides whether their current
grammar is acceptable for Core Tracking V1 or warrants one narrow follow-up.

This audit records the current implementation only. It does not authorize
production UI, behavior, copy, token, or data changes.

## Surfaces Audited

- Report-local Add Fluid dirty-discard confirmation in
  `FluidAddWorkflowScreen`.
- Report-local Fluid Entry Edit dirty-discard confirmation in
  `FluidEntryAmountEditScreen`.
- Fluid Entry Detail delete confirmation in `FluidEntryDetailScreen`.
- Fluid Entry Detail delete error panel in `FluidEntryDetailScreen`.
- Container state transitions and focused tests for those surfaces in
  `FluidReportScreenContainer` and `FluidReportScreen.test`.

No other product area or Fluid lifecycle behavior was audited.

## Current Confirmation Anatomy

### Add Fluid Dirty-Discard Confirmation

- **Trigger:** Cancel from the report-local Add Fluid form after Type or Amount
  differs meaningfully from its initial value. An unchanged form closes
  immediately; cancellation is ignored while submission is in flight.
- **Copy:** `Discard fluid entry?` followed by
  `This will discard the fluid entry you started.`
- **Actions:** `Keep editing` and destructive `Discard`, with explicit button
  accessibility labels.
- **Behavior:** Keep editing closes the confirmation and preserves the draft.
  Discard resets the Add Fluid workflow and returns to the report without
  logging. The focused screen test covers both handlers and the current copy.
- **Visual grammar:** The confirmation replaces the form and uses the shared
  report screen background, but its content sits in a pale-teal, fully
  bordered, rounded panel. Its 24 px heavy title and two equal-height rounded
  actions use Fluid-local colors and typography. This is coherent legacy/local
  grammar, but it visibly breaks from the quiet shared field and action grammar
  now used by the MYORIA-506 main form.

### Fluid Entry Edit Dirty-Discard Confirmation

- **Trigger:** Cancel from report-local amount edit after the amount differs
  meaningfully from the persisted entry. An unchanged form closes immediately;
  cancellation is ignored while saving is in flight.
- **Copy:** `Discard changes`, the drink display name, and
  `This will leave the edit form without saving.`
- **Actions:** `Keep editing` and destructive `Discard`, with entry-specific
  accessibility labels.
- **Behavior:** Keep editing closes the confirmation and preserves the edited
  amount. Discard closes the edit route without saving. A focused screen test
  covers both handlers and the current copy.
- **Visual grammar:** It reuses the same pale panel, rounded controls,
  Fluid-local typography, and destructive button treatment as Add Fluid. Its
  anatomy is related, but its surrounding edit form also retains separate
  legacy debt. That makes it poor justification for broadening a post-MYORIA-506
  Add Fluid follow-up.

### Fluid Delete Confirmation

- **Trigger:** `Delete entry` from a pure Fluid entry detail whose delete
  availability is `available`. Opening clears an earlier delete error. Linked
  mixed projections do not expose the action.
- **Copy:** `Delete this entry?` followed by
  `This removes it from fluid totals for the selected day.`
- **Actions:** quiet `Keep entry` and destructive `Delete`; both are disabled
  while deletion is in flight, when the destructive label becomes
  `Deleting...`.
- **Behavior:** Keep entry closes the confirmation without deleting. Delete
  uses the existing delete submitter, prevents duplicate submission, refetches
  the Day model, and returns to the Fluid report after success. Refusals and
  failures close the confirmation and leave an error in detail context. A
  successful delete followed by refresh failure keeps the context, reports the
  failure, and suppresses a second delete affordance for that stale entry.
- **Visual grammar:** The confirmation remains inline in the unframed detail
  destructive section. It uses contract-backed primary/muted/destructive text,
  title/body typography, spacing, and quiet text actions. It adds no card,
  shadow, decorative fill, border, or radius.

### Fluid Delete Error Panel

- **Copy:** Titled `Could not delete entry`, followed by the specific failure
  message from the existing container flow. Messages distinguish not found,
  linked-entry refusal, delete failure, and delete-success/refetch failure.
- **Behavior:** The panel stays in the entry detail context with alert
  semantics. Opening a new delete confirmation clears the previous error. A
  refresh error after a completed delete does not offer deletion again.
- **Visual grammar:** Despite its implementation name, this is an unframed
  titled error stack rather than a decorative panel. It uses contract error
  color and list-state typography with a small structural gap; there is no
  background, border, radius, card, or shadow.

## Parity And Styleguide Comparison

### Shared Form Grammar

MYORIA-506 moved the Add Fluid main form to `MyoriaFormField`,
`MyoriaOptionGroup`, `MyoriaTextInput`, `MyoriaValidationText`, and
`MyoriaFormActionRow`. Those primitives use role-based color and typography,
quiet line controls, transparent backgrounds, predictable action rhythm, and
semantic disabled states.

The Add Fluid dirty-discard confirmation does not share that action grammar.
It returns to local heavy type, pale boxed containment, local teal, fixed
radii, and locally styled rounded buttons. This does not break the task, but it
is now the sharpest confirmation transition inside the Add Fluid journey.

The shared form package includes action and validation primitives, not a
confirmation container. The audit therefore does not prove a stable boundary
for a new shared confirmation primitive.

### Current Fluid Report And Detail Grammar

Fluid delete confirmation and delete errors already follow the report/detail
direction: unframed structural groups, factual copy, quiet text actions, and
contract-backed roles. Add and Edit dirty-discard states instead share the
older Fluid-local panel and rounded-control grammar.

This is patterned debt rather than accidental inconsistency. Add Fluid is the
more focused mismatch after MYORIA-506; Fluid Edit remains part of the broader
Edit visual debt already recorded by MYORIA-507.

### Nutrition Delete Confirmation

Fluid delete confirmation has near-direct anatomy and behavior parity with
Nutrition: local snapshot placement, `Delete this entry?`, selected-day totals
copy, `Keep entry` / `Delete`, in-flight disabling, destructive text treatment,
and an unframed titled error state. The domain wording differs appropriately.
No further Fluid delete alignment is justified by this comparison.

### Food Library Lifecycle Confirmation

Food Library detail keeps lifecycle confirmation inline and factual, with
`Keep item` and `Hide from logging` actions. Its confirmation is quiet relative
to the surrounding detail and preserves context rather than becoming a modal
or decorative warning card. Food Library form dirty-discard also demonstrates
that shared form actions can be used inside a local confirmation without
requiring a shared confirmation-container primitive.

These are useful grammar references, not a reason to pull Food Library code or
behavior into a Fluid implementation slice.

### No-Card, No-Shadow, And No-Decorative-Surface Principles

- Fluid delete confirmation: aligned; it is an unframed local stack.
- Fluid delete error: aligned; its `localErrorPanel` name does not correspond
  to visible card chrome.
- Add Fluid dirty discard: debt; the pale filled, fully bordered, rounded panel
  is decorative containment around a short decision.
- Fluid Edit dirty discard: the same debt, but coupled to an otherwise legacy
  edit surface and therefore not part of the recommended Add Fluid follow-up.
- None of the audited surfaces uses a shadow.

## Acceptance Decision

**PASS WITH DEBT**

All audited decisions are understandable, reachable, and behaviorally guarded.
Dirty drafts can be preserved or discarded, pure Fluid entries can be kept or
deleted, duplicate delete submission is prevented, linked projections do not
offer unsafe lifecycle actions, and failures remain visible in context. No
Core Tracking V1 behavior blocker was found.

The remaining Add/Edit dirty-discard presentation is visible legacy debt, not
a second approved design system. The debt does not justify blocking V1 or
combining Add, Edit, Detail, delete, and shared-component work.

## Recommended Next Slice

**Narrow implementation: align Add Fluid dirty-discard confirmation only.**

Keep the slice attached to the MYORIA-506 journey: preserve the current
trigger, copy, handlers, accessibility labels, full-screen replacement
behavior, and draft/reset semantics while aligning the confirmation hierarchy
and actions with existing contract roles and shared form-action grammar. Remove
only styles made unused by that Add Fluid change.

Do not include Fluid Entry Edit, because its confirmation is embedded in a
separately legacy edit workflow. Do not touch Fluid delete confirmation or its
error state, which are already aligned. Do not create a shared confirmation
primitive; the current comparisons do not establish a sufficiently stable,
repeated container contract.

## Explicit Non-Goals

- No production UI implementation in MYORIA-508.
- No behavior or copy changes.
- No shared primitive creation.
- No token changes.
- No allowlist changes.
- No generated output edits.
- No domain, application, persistence, schema, migration, or seed changes.
- No mixed Nutrition + Fluid lifecycle rewrite.
- No broad visual redesign.
- No Add Food, Food Library, Nutrition, Bodyweight, Workout, or Today changes.

## Manual QA Checklist For Janos

1. Open Today -> Fluid report -> Add fluid.
2. Change Type or Amount, tap Cancel, then choose `Keep editing`.
3. Confirm the Add Fluid form returns with the draft values unchanged.
4. Tap Cancel again, choose `Discard`, and confirm the report returns without
   logging a new entry.
5. Open a pure Fluid entry detail and tap `Delete entry`.
6. Choose `Keep entry`; confirm detail remains open and the entry is unchanged.
7. Open delete confirmation again and choose `Delete`.
8. Confirm the report returns with the entry removed and Fluid totals
   refreshed; return to Today and confirm its Fluid summary also refreshes.
9. If a delete failure can safely be induced in the test setup, confirm the
   confirmation closes and the detail shows `Could not delete entry` plus the
   specific failure message. If a delete-success/refetch failure can be
   induced, confirm the error remains visible and no second delete affordance
   is shown for the stale entry.

## Verification

Commands run for this docs-only audit:

- `pnpm format:check`
- `git diff --check`
- `git diff --cached --check`
- `pnpm styleguide:build`
- `pnpm styleguide:check`

Final pass/fail results are recorded in the MYORIA-508 completion response.
