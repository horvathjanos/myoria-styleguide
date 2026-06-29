# MYORIA-513 Confirmation Visual Reference Audit

## 1. Status

- Ticket: MYORIA-513 / GitHub issue #501
- Scope: docs-only visual reference and audit checkpoint
- Production UI changed: no
- Tests changed: no
- Tokens, token mirrors, style allowlists, and generated output changed: no
- Data, domain, application, persistence, schema, migration, and seed changed:
  no

## 2. Purpose

This document records a visual reference and audit checkpoint before any
further Add Fluid or confirmation UI work. It classifies existing evidence and
compares possible directions; it does not approve or implement new production
anatomy.

MYORIA-512 remains the governing Core Tracking action and confirmation grammar
contract. Current implementation, screenshots, and manual QA observations
cannot override it or turn temporary styling into a reusable pattern.

## 3. Source-of-Truth Hierarchy

When sources differ, use this order:

1. MYORIA-512 Core Tracking action and confirmation grammar contract.
2. `docs/ui/myoria-interaction-grammar.md`, with GitHub issue #368 as its
   chronological decision evidence.
3. MYORIA-487 form-screen grammar and MYORIA-488 form primitives.
4. MYORIA-508 Fluid confirmation audit.
5. Current production implementation as factual behavior and visual evidence.
6. Screenshots and manual QA comments as evidence, not contract.

MYORIA-509 through MYORIA-511 explain how the current Add Fluid state arose.
They do not outrank MYORIA-512. In particular, component reuse or a passing
manual QA result does not establish approved confirmation anatomy.

## 4. Confirmation Categories

### Dirty-Discard Confirmation

Protects meaningful unsaved input when Cancel, Back, or a platform leave action
would abandon a draft. Clean and untouched forms leave immediately. The safe
choice preserves the draft; the destructive choice abandons it. Specific
labels such as `Keep editing` and `Discard` are preferred.

This is a workflow decision about uncommitted state, not a delete decision
about persisted data. MYORIA-512 permits quiet text actions but does not approve
the exact visual anatomy of a full-screen dirty-discard state.

### Destructive Delete Confirmation

Protects removal of an existing persisted entry after a local `Delete entry`
action. It should remain inline/local near the object action by default, name
the concrete effect, identify the affected entry where useful, and keep pending
and failure feedback in the same decision area.

### Lifecycle Confirmation

Protects a state change such as `Hide from logging` that affects future
availability without deleting historical logs. It should explain both what
changes and what remains unchanged. A safe, reversible restore does not require
confirmation by default.

### Local Error After Confirmation Failure

Reports that a confirmed delete, hide, or similar local mutation failed. It is
not another confirmation. It preserves the current context, clears pending
state, re-enables retry where appropriate, and stays near the failed action.
Toast, snackbar, native alert, and modal error feedback are not defaults.

### Form-Level Submit Error

Reports that a valid form submission could not complete. It belongs to the form
and its commit action, not to confirmation grammar. Field validation remains
field-local where possible; a top-level submit failure may appear locally in
the form. It must not be styled or modeled as a confirmation simply because it
requires the user to decide whether to retry or cancel later.

## 5. Current Myoria Examples

### Add Fluid Dirty-Discard Confirmation

- **Surface:** report-local Add Fluid workflow, rendered as a full-screen branch
  in `FluidAddWorkflowScreen`.
- **Trigger:** Cancel after Type or Amount differs meaningfully from the initial
  values. Clean Cancel exits immediately; cancellation is ignored while logging
  is in flight.
- **Copy:** `Discard fluid entry?` and
  `This will discard the fluid entry you started.`
- **Actions:** `Discard` and `Keep editing`.
- **Behavior:** Keep editing restores the form with its draft intact. Discard
  resets the workflow and returns without logging.
- **Visual grammar:** unframed full-screen replacement with screen-lead
  title/body and transparent, underlined text actions. Destructive meaning is
  carried by red text rather than a red block. Its destructive-first ordering,
  centered action row, spacing, underline treatment, and route-local styles are
  not canonical anatomy.
- **Classification:** accepted visual debt. The behavior and quiet-action
  boundary are supported; the complete visual direction is not approved and
  must not be copied.

### Fluid Delete Confirmation

- **Surface:** Fluid entry detail destructive section.
- **Trigger:** local `Delete entry` action for a pure Fluid entry with delete
  availability.
- **Copy:** `Delete this entry?` and
  `This removes it from fluid totals for the selected day.`
- **Actions:** `Keep entry` and `Delete`, changing to `Deleting...` while
  pending.
- **Behavior:** both actions are disabled while pending. Keep entry closes the
  local decision. Delete removes the entry, refreshes the day, and returns to
  the report on success. Failure closes the decision and leaves a contextual
  error; delete-success/refetch failure does not offer a second delete.
- **Visual grammar:** inline, unframed title/body/action stack with quiet text
  actions and no card, fill, shadow, or modal.
- **Classification:** approved grammar and the strongest current destructive
  delete reference.

### Food Library Hide-From-Logging Confirmation

- **Surface:** Food & Drink Library item detail lifecycle area.
- **Trigger:** local `Hide from logging` action for an active reusable item.
- **Copy:** `Hide from logging?`,
  `This item will no longer appear in normal logging search. Existing logs will
  not change.`
- **Actions:** `Keep item` and `Hide from logging`, changing to
  `Hide from logging...` while pending.
- **Behavior:** Keep item closes only the local decision. Hide changes future
  logging visibility while preserving historical logs. A local error remains
  in detail context. Restore runs directly without confirmation.
- **Visual grammar:** local contextual stack with quiet underlined text actions
  and structural top/bottom dividers. The implementation calls the wrapper a
  confirmation box, but it has no decorative fill, radius, or shadow.
- **Classification:** approved interaction/copy grammar and useful visual
  evidence. Its exact divider container is implementation evidence, not an
  app-wide confirmation primitive.

### Nutrition Delete Confirmation

- **Surface:** current Nutrition entry detail destructive section.
- **Trigger:** local `Delete entry` action when the entry can be deleted.
- **Copy:** `Delete this entry?` and
  `This removes it from selected day nutrition totals.`
- **Actions:** `Keep entry` and `Delete`, changing to `Deleting...` while
  pending.
- **Behavior:** mirrors the Fluid local decision: pending disables both
  choices, Keep entry closes the decision, and failure remains in entry detail
  context.
- **Visual grammar:** inline, unframed title/body/action stack with quiet text
  actions and destructive text color.
- **Classification:** approved grammar and a close parity reference for Fluid.
  The unused `NutritionDeleteConfirmationScreen` file contains older
  full-screen filled-button anatomy; because it has no production references,
  it is implementation evidence only and is not precedent.

### Food Library Dirty-Discard Confirmation

- **Surface:** Food & Drink Library Create/Edit form, inline above the normal
  form action block.
- **Trigger:** Cancel after meaningful form edits.
- **Copy:** `Discard changes?`
- **Actions:** `Discard` and `Keep editing`.
- **Behavior:** Keep editing closes the local decision and preserves the form;
  Discard leaves the form without saving.
- **Visual grammar:** structurally divided local container that reuses
  `MyoriaFormActionRow`, including its filled form-button treatment.
- **Classification:** behavior/copy evidence and accepted V1 visual debt only.
  MYORIA-512 explicitly rejects treating `MyoriaFormActionRow` reuse as proof
  of valid confirmation anatomy.

## 6. Candidate Visual Directions

### A. Inline Local Confirmation Stack

- **Fits:** destructive delete and lifecycle decisions attached to a detail
  action area; compact decisions where current context should remain visible.
- **Does not fit:** automatically replacing a whole dirty form when the
  decision cannot remain clear, reachable, and keyboard-safe in place.
- **Pros:** preserves context, keeps pending/error state local, matches current
  Fluid/Nutrition delete grammar, and needs no overlay or route.
- **Risks:** can become visually crowded or ambiguous beside normal form actions;
  a long form may scroll the decision out of view.
- **MYORIA-512:** allowed and preferred by default for destructive delete;
  potentially allowed for dirty discard when quiet and contextually clear.
- **Janos approval:** not required to preserve an already aligned delete stack;
  required before applying a newly designed inline anatomy to dirty discard or
  other categories.

### B. Full-Screen Quiet Decision Screen

- **Fits:** possibly a workflow-level dirty-discard interruption where a
  stronger non-modal decision is justified.
- **Does not fit:** local entry delete or lifecycle actions that should preserve
  the detail context.
- **Pros:** focused, accessible, avoids modal layering, and can separate the
  decision from a dense or keyboard-active form.
- **Risks:** removes visible draft context, can feel like navigation, raises
  Back/gesture and action-order questions, and may accidentally promote current
  Add Fluid debt into a system.
- **MYORIA-512:** exact design is unresolved; current Add Fluid may remain as
  debt, but this direction is not approved for new implementation.
- **Janos approval:** required before implementation, with concrete visual
  examples.

### C. Temporary Route-Level Confirmation Screen

- **Fits:** only an exceptional, explicitly groomed decision whose navigation
  semantics genuinely require a route.
- **Does not fit:** normal dirty discard, delete, or lifecycle confirmation.
- **Pros:** explicit navigation state and potentially simpler restoration after
  process interruption.
- **Risks:** violates local-by-default grammar, complicates Back and route
  ownership, makes a transient choice feel permanent, and encourages broad
  infrastructure for a narrow decision.
- **MYORIA-512:** not allowed by default; requires a future explicit contract.
- **Janos approval:** required before implementation.

### D. Native, Modal, Card, or Panel Confirmation

- **Fits:** no current V1 confirmation by default. A platform-critical or
  exceptional case would need separate grooming.
- **Does not fit:** routine dirty discard, entry delete, lifecycle hide, local
  mutation failure, or form submission error.
- **Pros:** can create strong interruption and platform familiarity.
- **Risks:** loses Myoria context, encourages generic copy, adds decorative
  containment and layering, introduces accessibility/focus complexity, and can
  overstate ordinary reversible choices.
- **MYORIA-512:** forbidden by default; only a later explicit contract may
  approve an exception.
- **Janos approval:** required before any implementation.

### E. Text-Action-Only Local Confirmation

- **Fits:** local delete/lifecycle stacks and potentially a restrained inline
  dirty-discard decision with clear title/body hierarchy.
- **Does not fit:** a bare pair of links without enough context, separation,
  touch target, pending state, or accessibility semantics.
- **Pros:** quiet, avoids unapproved filled-button anatomy, and aligns with
  current safe grammar.
- **Risks:** weak hierarchy or ambiguous ordering if applied without a concrete
  composition; underlines and destructive-first ordering can become accidental
  precedent.
- **MYORIA-512:** quiet text actions are allowed, but that permission does not
  approve a complete container, ordering, or layout system.
- **Janos approval:** not required to preserve aligned local delete behavior;
  required before establishing new confirmation anatomy or reworking Add Fluid.

## 7. Explicit Anti-Patterns

The following are forbidden unless a future explicit contract reverses them:

- filled black or red confirmation buttons;
- decorative confirmation cards or panels without approval;
- native alerts by default;
- modal overlays by default;
- copying Add Fluid temporary styling as a reusable pattern;
- treating `MyoriaFormActionRow` as a confirmation primitive; and
- inventing new action anatomy in production code without contract approval.

Removing a forbidden filled surface is not enough to approve the replacement's
ordering, spacing, container, typography, underline, or route behavior.

## 8. Recommended V1 Decision

**Accept and defer. Do not create a new confirmation visual system for V1.**

- Keep destructive delete confirmations inline/local where Fluid and Nutrition
  already align with MYORIA-512.
- Keep the Food Library hide confirmation's approved interaction and copy
  semantics; do not elevate its exact implementation container into a shared
  visual primitive.
- Treat current Add Fluid dirty discard as accepted visual debt, not approved
  design and not a reference to copy.
- Treat Food Library dirty-discard filled form actions as accepted visual debt,
  not evidence that a form action row is valid for confirmation.
- Do not redesign Add Fluid or build a shared confirmation primitive now.
- Require explicit Janos visual approval, concrete examples, category
  classification, and an approved contract before new confirmation anatomy is
  implemented.

This is the conservative decision supported by both MYORIA-512 and the
production evidence. No current V1 behavior or accessibility blocker justifies
spending another production slice on confirmation styling.

## 9. Next Possible Slices

Recommended next step: **no-op/defer confirmation design and move to an
unrelated product or QA slice.** This stops temporary confirmation debt from
driving repeated production churn.

If Janos wants to resolve the debt later, create a docs-only visual
mockup/reference issue first. That issue should show concrete compositions for
dirty discard and local destructive/lifecycle decisions, specify ordering,
spacing, emphasis, touch targets, Back behavior, pending/error states, and
narrow-screen behavior, and record explicit approval. Only then should a narrow
implementation issue apply the approved direction to one surface.

Do not open a production redesign merely to make the current Add Fluid
confirmation look nicer.

## 10. Explicit Non-Goals

- No production UI changes.
- No test changes.
- No token, token-mirror, style-allowlist, or generated-output changes.
- No domain, application, persistence, schema, migration, or seed changes.
- No shared confirmation primitive.
- No Add Fluid redesign.
- No Nutrition, Food Library, or Fluid implementation changes.
- No broad visual redesign.

## 11. Verification

Required checks for this docs-only audit:

- `pnpm format:check`
- `git diff --check`
- `git diff --cached --check`
- `pnpm styleguide:build`
- `pnpm styleguide:check`

Final pass/fail results are recorded in the MYORIA-513 completion response.
