# MYORIA-507 — Core Tracking V1 Post-Fluid-Form Checkpoint

## Purpose

This is a docs-only checkpoint after MYORIA-499 through MYORIA-506. It prevents
drift by recording the accepted Core Tracking V1 food/fluid visual grammar,
remaining debt, QA state, and the next narrow issue sequence after the Fluid
report Add Fluid main-form migration.

This checkpoint does not implement or authorize UI, test, token, allowlist,
generated-output, domain, application, persistence, schema, migration, seed, or
read-model changes.

## Completed Work Inventory

### MYORIA-499 — Food Library Detail Visual Grammar Audit

- Audited Food Library detail identity, facts, lifecycle actions, confirmation,
  and its relationship to the list and Create/Edit grammar.
- Accepted the behavior for V1 while identifying card-heavy readouts, local
  actions, and confirmation chrome as non-blocking visual debt.
- Defined a small, behavior-preserving detail alignment slice.

### MYORIA-500 — Food Library Detail Visual Grammar

- Replaced rounded summary and nested metric cards with quieter,
  divider-backed detail sections and readouts.
- Aligned item identity and local Edit, Hide, Restore, and confirmation actions
  with the existing styleguide contract while preserving lifecycle behavior.
- Left broader object-detail reuse, archived-status duplication, and long-form
  Create/Edit hierarchy as accepted debt.

### MYORIA-501 — Fluid Report Entry Detail/Delete Parity Audit

- Audited Today-to-Fluid-report navigation, pure Fluid detail/delete, refresh,
  and linked mixed Nutrition + Fluid projection behavior.
- Accepted the flow as `PASS WITH DEBT`: pure Fluid entries support detail and
  delete, while linked mixed projections remain intentionally read-only.
- Identified confirmation copy and local delete-error presentation as the only
  focused polish required next.

### MYORIA-502 — Fluid Entry Detail/Delete Polish

- Aligned delete confirmation copy with selected-day Fluid totals language.
- Aligned delete failures with the local titled error-panel grammar.
- Preserved delete, refetch, navigation, and read-only mixed-projection
  behavior without changing data or lifecycle semantics.

### MYORIA-503 — Fluid Report Style Contract Audit

- Classified Fluid report styling as patterned legacy/local debt rather than
  random styling and accepted the current V1 surface as `PASS WITH DEBT`.
- Identified safe mappings from report styles to existing React Native
  styleguide contract roles.
- Kept Add/Edit/Detail and confirmation redesign outside the proposed cleanup.

### MYORIA-504 — Fluid Report Style Contract Alignment

- Replaced clear report-style literals with existing color, typography,
  spacing, list, action, input, report, and separator roles.
- Preserved report modes, summaries, rows, detail/delete behavior, refresh,
  navigation, and Add Fluid behavior.
- Intentionally retained Fluid-local teal, boxed-control, radius,
  disabled-opacity, typography, and shell-rhythm debt where no safe direct
  contract mapping existed.

### MYORIA-505 — Add Fluid Form Visual Grammar Audit

- Audited the report-local Add Fluid workflow separately from the standalone
  Today Add Fluid screen.
- Accepted its behavior as `PASS WITH DEBT` and found that the main form could
  use existing shared primitives without new tokens or APIs.
- Scoped the migration to the main form and explicitly excluded the discard
  confirmation and neighboring Fluid surfaces.

### MYORIA-506 — Fluid Report Add Fluid Shared Primitives

- Migrated the report-local Add Fluid main form to shared field, option, input,
  validation, and action-row primitives.
- Preserved type selection, amount validation, submit protection, logging,
  refresh, Day-mode return, unchanged-form cancel, and dirty-discard behavior.
- Left the discard confirmation and unrelated Fluid Edit/Detail styles
  unchanged.

## Current Accepted Core Tracking V1 Behavior

- Food Library detail presents item identity and applicable nutrition, fluid,
  serving, aliases, note, and archived-state facts in aligned quiet sections.
- Food Library detail still supports back-to-list, Edit, Hide from logging with
  confirmation, Keep item, and Restore to logging through the existing
  lifecycle behavior.
- Pure Fluid report rows can open a readable detail snapshot and delete through
  local confirmation; successful deletion refreshes Fluid report and Today.
- Fluid delete confirmation explains removal from Fluid totals for the selected
  day, and delete failures remain visible in a titled local error panel.
- Linked mixed Nutrition + Fluid projections contribute to Fluid totals and
  remain read-only from Fluid report rows; no unsafe projection-specific edit
  or delete affordance is exposed.
- Fluid report styles use existing contract roles where a safe mapping exists.
- The report-local Add Fluid main form uses the shared Core Tracking V1 form
  grammar for Type, Amount ml, validation, Cancel, and Log fluid.
- Add Fluid retains its established validation, submission, refresh,
  navigation, unchanged-cancel, and dirty-discard behavior.

## Current Accepted Visual/UX Debt

- Food Library detail is aligned enough for V1, but a reusable object-detail
  contract remains deferred; archived state is still intentionally repeated in
  identity metadata and the Status section.
- Food Library Create/Edit long-form hierarchy remains separate accepted debt.
- Add Fluid discard confirmation still uses legacy/local pale-panel, rounded
  bordered control, Fluid-local typography, and action styling.
- Fluid Entry Edit and portions of Fluid Entry Detail still retain local teal,
  boxed-control, typography, radius, disabled-opacity, and shell-rhythm debt.
- Fluid detail remains intentionally sparse and does not invent unsupported
  source, confidence, linkage, or raw implementation facts.
- Header, date, back-label, and broader screen-shell rhythm remain cross-surface
  debt and are not owned by these focused slices.
- Linked mixed Nutrition + Fluid lifecycle remains an accepted limitation. No
  mixed nutrition + fluid lifecycle rewrite was implemented.

## Manual QA Evidence Summary

- MYORIA-506 Add Fluid main-form QA passed.
- The passing result covers the shared-primitives main-form behavior. It does
  not reclassify the legacy/local discard confirmation, Fluid Entry Edit, or
  remaining Detail styling as solved.
- No additional manual QA claim is made by this docs-only checkpoint.

## Explicit Non-Goals And Boundaries

- No production UI or source-code refactor.
- No tests changed.
- No tokens, token mirrors, style allowlists, or generated styleguide output
  changes.
- No domain, application, persistence, schema, migration, seed, or read-model
  changes.
- No broad visual redesign or shared confirmation-system implementation.
- No Add Fluid discard-confirmation migration.
- No Fluid Entry Edit or remaining Detail migration.
- No mixed Nutrition + Fluid lifecycle or projection-delete rewrite.
- No Nutrition, Food Library, Add Food, Bodyweight, Workout, Today, or report
  behavior changes.

## Proposed Next Focused Issue Sequence

### MYORIA-508 — Fluid Confirmation Grammar Audit

- Keep this docs-first.
- Audit the Add Fluid discard confirmation alongside nearby Fluid delete/edit
  confirmation states and existing shared/local confirmation patterns.
- Decide whether one narrow confirmation alignment is justified without
  pulling Fluid Entry Edit, Detail, report layout, or lifecycle behavior into
  scope.
- Do not introduce a shared primitive until the audit demonstrates a stable
  repeated boundary.

### Later Focused Slices, Only If The Audit Supports Them

- Align Add Fluid discard confirmation in isolation while preserving dirty-form
  behavior and copy.
- Audit Fluid Entry Edit visual grammar separately from confirmation work.
- Audit remaining Fluid Entry Detail visual debt separately from lifecycle or
  data-model work.
- Treat any mixed Nutrition + Fluid lifecycle proposal as a distinct product
  and architecture decision before implementation.

Recommended immediate next slice: `MYORIA-508 — Fluid confirmation grammar
audit`.

## Verification

Commands run for this docs-only checkpoint:

- `pnpm format:check` — passed
- `git diff --check` — passed
- `git diff --cached --check` — passed
- `pnpm styleguide:build` — passed
- `pnpm styleguide:check` — passed
