# MYORIA-512 Core Tracking Action and Confirmation Grammar Contract

## Status

- Ticket: MYORIA-512 / GitHub issue #500
- Scope: docs-only Core Tracking action and confirmation grammar contract
- Production UI touched: no
- Tests touched: no
- Tokens, style allowlists, and generated styleguide output touched: no
- Domain, application, persistence, schema, migration, and seed behavior touched:
  no
- Decision: form action grammar and confirmation grammar are separate contracts

## Purpose

This document establishes a durable boundary for Core Tracking actions before
any further Fluid or Add Fluid visual work. It prevents a working component or
temporary visual treatment from being mistaken for approved app-wide grammar.

The governing principle is:

> Action semantics determine the action category. Reusing a component does not
> make that component's anatomy correct for a different category.

This contract refines the action and confirmation direction in
`MYORIA-487-core-tracking-v1-form-screen-grammar-contract.md`,
`MYORIA-488-core-tracking-v1-form-primitives.md`, and
`docs/ui/myoria-interaction-grammar.md`. It records the evidence and corrections
from MYORIA-508 through MYORIA-511 without treating current production styling
as visual approval.

## Contract Boundary

Form actions commit or leave an editing workflow. Confirmations interrupt a
pending local decision and ask the user to choose whether an effect should
continue. Those jobs may share typography, spacing, color roles, or minimum
touch targets, but they do not automatically share button anatomy.

`MyoriaFormActionRow` is an approved form primitive. Its existence does not make
it an approved confirmation primitive. A confirmation must not inherit filled
form-button treatment merely because it also presents two choices.

Current implementation is evidence, not authority. When current UI conflicts
with this contract, record the UI as debt and obtain an explicit contract before
changing its anatomy.

## Action Categories

### 1. Report/List Entry Actions

Report and list entry actions begin a logging, creation, or navigation workflow
from a stable report or list surface.

Examples include `ADD FLUID`, `ADD FOOD`, `ADD WEIGHT`, and a library `CREATE
ITEM` action.

Contract:

- Use quiet text-action grammar by default.
- Keep the action local to the report/list section or approved screen action
  area.
- Do not promote the action into a filled primary button, floating control, or
  card merely to increase emphasis.
- Do not duplicate the same action in the header, section, row, and empty state
  without explicit grooming.

### 2. Form Commit Actions

Form commit actions submit structured user input. They belong to an editing
workflow and include actions such as `Save`, `Log fluid`, or `Add` paired with a
screen-level `Cancel`.

Contract:

- Use the line-input form grammar defined by MYORIA-487 and the shared form
  primitives documented by MYORIA-488.
- Place screen-level `Cancel` on the left and the commit action on the right.
- Keep validation and submission errors local to the form.
- Keep pending state local to the commit action and prevent duplicate
  submission.
- `MyoriaFormActionRow` is valid for this category under its existing form
  contract.
- Form action styling does not transfer automatically to confirmations.

### 3. Local Object Actions

Local object actions operate on the object represented by a detail or local
context. Examples include `Edit` and safe reversible lifecycle actions such as
`Restore to logging`.

Contract:

- Use quiet text actions by default.
- Keep normal object actions separate from destructive or lifecycle actions.
- Execute safe, reversible restore/reactivate actions directly unless unusual
  side effects have been explicitly groomed.
- Do not turn a detail surface into a button panel or introduce a filled CTA by
  default.

### 4. Destructive Text Actions

Destructive text actions begin an operation that removes data, hides future
availability, or materially changes behavior. Examples include `Delete entry`
and `Hide from logging`.

Contract:

- Use a quiet destructive text action in the local object/lifecycle area.
- Use the destructive color role on the label when needed; destructive meaning
  does not require a filled red block.
- Separate destructive actions structurally from normal object actions.
- Use factual, effect-specific wording rather than generic danger language.
- Opening a required confirmation does not change this initiating action into a
  form commit action.

### 5. Dirty-Discard Confirmations

Dirty-discard confirmations protect meaningful unsaved input when the user
attempts to leave a form or workflow.

Contract:

- Clean Cancel or Back leaves immediately.
- Show a confirmation only for meaningful unsaved input; defaults and untouched
  state do not count as dirty by themselves.
- Preserve the draft when the user chooses the safe action.
- Use specific decision labels such as `Keep editing` and `Discard`.
- Quiet text actions are currently safe for the decision.
- Do not use native alerts, modal dialogs, cards, panels, or a separate
  confirmation route unless an explicit confirmation contract approves them.
- Do not infer confirmation anatomy from `MyoriaFormActionRow`.

The exact visual design of a full-screen dirty-discard confirmation is not
approved by this document.

### 6. Destructive Delete Confirmations

Destructive delete confirmations protect an actual removal after a local
destructive text action is chosen.

Contract:

- Keep the confirmation local/inline near the object action by default.
- State the concrete effect and identify what will be removed.
- Avoid generic `Are you sure?` language and vague danger messaging.
- Keep pending and error state local to the decision area.
- Use quiet text actions for the safe and destructive choices unless a later
  approved contract defines another primitive.
- Do not use a modal, card, panel, native alert, or separate confirmation screen
  by default.

Delete confirmation and dirty-discard confirmation share decision semantics,
but they are not the same flow. Delete acts on persisted data; dirty discard
abandons uncommitted form state. Future visual work must preserve that
distinction.

## Currently Safe Grammar

The following choices are safe for Core Tracking production work because they
are already supported by the accepted contracts:

- quiet text actions for local object and destructive decisions;
- line-input form grammar with transparent fields and structural dividers;
- screen-level `Cancel` on the left and form commit on the right;
- local, concrete confirmation copy;
- local pending and error feedback; and
- no modal, native alert, card, panel, or separate confirmation surface unless
  explicitly approved.

"Safe" means a future slice may preserve or apply the established grammar
without inventing new anatomy. It does not authorize redesigning an unresolved
confirmation surface.

## Add Fluid Decision Record

The filled black primary button and filled red destructive button introduced
for the Add Fluid dirty-discard confirmation were not approved Myoria design
grammar. They resulted from applying the shared form action row to a
confirmation decision. Functional reuse did not establish visual approval.

MYORIA-510 removed those filled blocks locally. MYORIA-511 verified the
unfilled text-action treatment alongside the corrected Add Fluid workflow
identity. Those corrections prevent the earlier button treatment from becoming
precedent; they do not establish a complete confirmation design system.

The current Add Fluid dirty-discard confirmation remains accepted visual debt
until a real confirmation grammar is designed and approved. Its current
full-screen branch, ordering, spacing, underline treatment, and route-local
styles are implementation evidence, not canonical anatomy. They may remain for
V1 when behavior and accessibility are correct, but must not be copied into
other workflows as an approved pattern.

In particular:

- a filled black `Keep editing` block is not approved;
- a filled red `Discard` block is not approved;
- the absence of those blocks does not, by itself, approve every aspect of the
  current replacement; and
- matching Add Fluid exactly is not a substitute for an approved confirmation
  contract.

## Unresolved Decisions

The following questions remain intentionally unresolved:

- the exact visual design of a dirty-discard full-screen confirmation;
- whether destructive discard should use a plain text link, an underline
  action, or another quiet primitive; and
- whether `MyoriaFormActionRow` can ever be valid for confirmations or remains
  valid only for forms.

Until those questions are answered, production work must preserve the safe
grammar above and avoid treating temporary styling as precedent.

## Change Policy

Future Core Tracking production changes must not invent new button anatomy,
confirmation containers, action ordering, or emphasis rules without an approved
contract.

Before changing a confirmation surface, a follow-up must:

1. classify the action and confirmation category;
2. identify the approved contract or record the missing decision;
3. separate behavior preservation from visual experimentation;
4. show concrete visual references or examples when proposing new anatomy; and
5. receive explicit approval before production implementation.

Component reuse is subordinate to the category contract. If no existing
primitive expresses the approved grammar, do not force a nearby primitive into
the role and do not create a new shared primitive speculatively.

## Evidence Reviewed

- GitHub issue #368, the chronological app-wide interaction grammar tracker
- `docs/ui/myoria-interaction-grammar.md`
- MYORIA-487 Core Tracking V1 form-screen grammar contract
- MYORIA-488 shared form primitives
- MYORIA-508 Fluid confirmation grammar audit
- MYORIA-509 Add Fluid dirty-discard implementation record
- MYORIA-510 Add Fluid discard action grammar correction
- MYORIA-511 Add Fluid workflow visual grammar correction
- current `FluidAddWorkflowScreen`, `FluidReportScreen` styles, and focused tests
  as implementation evidence only

## Non-Goals

- No production UI or behavior changes.
- No test changes.
- No token or token-mirror changes.
- No style allowlist changes.
- No generated styleguide output unless required by the normal build/check flow.
- No Fluid, Nutrition, Food Library, Bodyweight, Workout, domain, application,
  persistence, schema, seed, or migration changes.
- No new shared confirmation primitive.
- No approval of a modal, card, panel, or full-screen confirmation anatomy.

## Next Recommended Slice

Choose one of these paths before further Add Fluid confirmation redesign:

1. **MYORIA-513 docs-only visual reference/audit for confirmation examples.**
   Compare concrete quiet confirmation directions, classify their fit for dirty
   discard and destructive delete, and request approval without changing
   production UI.
2. **Defer the redesign.** Keep the current Add Fluid confirmation as accepted
   visual debt until Janos approves a concrete visual direction.

Do not open a production redesign slice solely to make the current temporary
confirmation look more polished.
