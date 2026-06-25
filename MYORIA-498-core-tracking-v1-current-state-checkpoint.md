# MYORIA-498 — Core Tracking V1 Current-State Checkpoint

## Purpose

This is a docs-only checkpoint after MYORIA-487 through MYORIA-497. Its purpose
is to prevent drift, summarize the current accepted Core Tracking V1 behavior,
name intentional V1 debt, and define the next focused slices without reopening
already-settled flows.

This checkpoint does not introduce new UI behavior, navigation, persistence,
domain logic, style tokens, allowlist entries, generated outputs, or tests.

## Completed Work Inventory

### MYORIA-487 — Core Tracking V1 Form Screen Grammar Contract

- Docs-only contract and audit for Core Tracking V1 form, picker, list, detail,
  and adjacent report surfaces.
- Classified Add Food picker/list, Food Library list, and logged-entry
  detail/delete grammar as acceptable for V1 when functional QA passes.
- Recorded form-screen visual debt and recommended small follow-up slices
  instead of a broad redesign.

### MYORIA-488 — Core Tracking V1 Form Primitives

- Added shared React Native form primitives under `src/ui/shared/form`.
- Introduced `MyoriaFormField`, `MyoriaTextInput`, `MyoriaOptionGroup`,
  `MyoriaFormActionRow`, and `MyoriaValidationText`.
- Production form screens were not migrated in this issue.

### MYORIA-489 — Add Fluid And Add Weight Form Migration

- Changed production UI for `DrinkLoggingScreen` and
  `BodyweightLoggingScreen`.
- Migrated both single-field forms to shared form primitives for field labels,
  line-input numeric entry, field-local validation, and Save/Cancel actions.
- Preserved existing amount entry, validation messages, save/cancel handlers,
  and app-shell navigation behavior.

### MYORIA-490 — Add Food Selected Form Migration

- Changed production UI for the selected Add Food amount/unit confirmation
  step in `NutritionAddFoodWorkflowScreen`.
- Migrated Amount, Unit, Cancel, and Log actions to shared form primitives.
- Preserved Add Food search/list behavior, selected-item logging behavior, and
  mixed nutrition + fluid logging.

### MYORIA-491 — Food Library Create/Edit Form Migration

- Changed production UI for Food & Drink Library Create/Edit forms.
- Migrated text/numeric fields, validation copy, contribution controls, basis
  controls, Save/Cancel, duplicate-save, and dirty-discard action clusters to
  shared form grammar.
- Preserved create, edit, cancel, dirty-discard, duplicate-warning, save,
  archive/restore, repository, schema, seed, and import/export behavior.

### MYORIA-492 — Food Library Validation Visibility

- Changed production UI/container behavior for Food & Drink Library form
  validation visibility.
- Kept form validity computed immediately so Save can stay disabled while
  required data is missing.
- Delayed field-local validation and the global validation message until
  meaningful field/control interaction, and aligned fallback row wording to
  `Default 100 g` / `Default 100 ml` where applicable.

### MYORIA-493 — Core Tracking V1 Manual QA Closeout

- Docs-only closeout of recent manual QA evidence.
- Recorded Add Fluid, Add Weight, selected Add Food, Food Library navigation,
  Create Item validation, creation, edit, Add Food availability, and fallback
  row wording as passing based on the recorded QA evidence.
- Kept accepted visual/navigation debt separate from functional blockers.

### MYORIA-494 — Add Food No-Result Create Entry

- Changed production UI/navigation entry from Add Food no-result state to Food
  & Drink Library Create Item.
- Shows `Create item` only for a non-empty Add Food search with no matching
  catalog results.
- Prefills Create Item name with the trimmed Add Food search query and left the
  original post-create landing behavior to later work.

### MYORIA-495 — Add Food Create Return Flow

- Changed production app-shell/navigation state for Add Food-origin Create
  Item success.
- Successful Add Food-launched create now returns to the Nutrition report Add
  Food selected-item step with the created item selected.
- Preserved normal Food Library create behavior, which still lands on created
  item detail, and does not auto-log the newly created item.

### MYORIA-496 — Add Food Selected Step Form Grammar

- Changed production UI for the selected Add Food step by tightening the
  visible form structure around shared primitives.
- Ensured selected food, Amount, Unit, Cancel, and log actions use the current
  Core Tracking V1 shared form grammar.
- Preserved Add Food search/recent behavior, MYORIA-495 return behavior,
  selected logging, and `Also logs Fluid` mixed-item copy.

### MYORIA-497 — Add Food Search Step Form Grammar

- Changed production UI for the Add Food search/recent/no-result step only.
- Migrated Search catalog to `MyoriaFormField` and `MyoriaTextInput`, and used
  `MyoriaFormActionRow` for no-result `Create item` plus `Cancel`.
- Preserved recent entries, search results, no-result create conditions,
  trimmed name prefill, selected-step return, mixed nutrition + fluid logging,
  and Cancel back to Nutrition report.

## Current Accepted V1 Behavior

- Today remains the root daily/domain-entry surface.
- Nutrition, Fluid, Bodyweight, and Workout entry points remain
  domain-oriented.
- Food & Drink Library is reachable from the Today menu / settings-data
  surface.
- Add Food search supports recent entries when the query is empty and search
  results when the query is non-empty.
- Add Food no-result state supports `Create item` only when the trimmed query
  is non-empty and no catalog foods match.
- Create Item launched from Add Food receives the trimmed search query as the
  prefilled item name.
- Successful create from Add Food returns to the Add Food selected-item step
  with the created item selected.
- Add Food-launched create does not auto-log the created item.
- Normal Food Library create still lands on the created item detail screen.
- Selected Add Food logging supports nutrition-only and nutrition + fluid
  catalog items through the existing selected logging path.
- Mixed nutrition + fluid Add Food rows and selected confirmations show
  `Also logs Fluid`.
- Add Fluid and Add Weight use shared form primitives for field, input,
  validation, and action row grammar.
- Food Library Create/Edit opens without initial required validation errors.
- Food Library Save remains disabled until the current form values are valid.
- Food Library validation appears after field/control interaction rather than
  on first open.
- Food Library fallback row wording uses `Default 100 g` / `Default 100 ml`
  where default basis-backed rows have no explicit serving size.

## Current Accepted Visual/UX Debt

- Some surfaces still use older or raw visual grammar where that debt has been
  intentionally deferred.
- Food Library list/detail visual language is not final design; the detail
  screen still carries older summary, metric, lifecycle action, and
  confirmation treatment.
- Add Food search and selected steps are functionally aligned to the current
  shared grammar but are not final aesthetic design.
- Food Library Create/Edit is functionally aligned and uses shared primitives,
  but the long-form visual hierarchy remains accepted V1 debt.
- Header, back-label, title, and date rhythm across root and child surfaces
  remains a separate shell/header contract topic.
- Range reports remain placeholder/deferred where applicable.
- Direct broader cross-domain reporting remains deferred.
- Remaining older/raw form surfaces should be migrated only in small dedicated
  slices with explicit scope and behavior-preservation tests.

## Known Non-Goals For This Checkpoint

- No new UI behavior.
- No token changes.
- No token mirror changes.
- No style allowlist changes.
- No generated output changes.
- No navigation redesign.
- No production code changes.
- No test changes.
- No persistence, domain, application, schema, seed, or read-model changes.
- No fake mixed Nutrition/Fluid persistence rewrite.
- No implementation of Add Food, Food Library, Fluid, Bodyweight, Workout, or
  report features.
- No return of bottom nav, Log tab, central plus, or old dashboard/card-soup
  patterns.

## Proposed Next Focused Issue Sequence

### MYORIA-499 — Food Library Detail Visual Grammar Audit

- Scope: docs-first audit of current Food Library detail screen visual debt and
  lifecycle confirmation grammar.
- Output: decide whether the next step should remain docs-only or become a
  small UI alignment slice.
- Non-goals: no Create/Edit form changes, persistence changes, Add Food
  changes, or lifecycle behavior changes.

### MYORIA-500 — Food Library Create/Edit Remaining Visual Grammar Refinement

- Scope: small refinement slice only if MYORIA-491/MYORIA-492 leaves specific
  visual issues that are worth paying down before V1 release.
- Output: reduce remaining long-form visual roughness without changing
  validation, duplicate warning, dirty discard, or save behavior.
- Non-goals: no broad form rebuild, no token changes, and no domain or
  persistence changes.

### MYORIA-501 — Fluid Report Entry Detail/Delete Parity Audit

- Scope: audit current Fluid report entry detail/delete behavior and compare it
  with Nutrition and Bodyweight detail/delete grammar.
- Output: implementation plan or acceptance note for pure fluid entries and
  linked projections.
- Non-goals: no mixed-entry lifecycle rewrite and no broad report redesign.

### MYORIA-502 — Fluid Entry Detail/Delete For Pure Fluid-Only Entries

- Scope: implement or refine pure fluid-only entry detail/delete behavior only
  if MYORIA-501 identifies a focused gap.
- Output: parity with accepted logged-entry snapshot/delete grammar for normal
  fluid logs.
- Non-goals: no mixed nutrition + fluid delete policy change.

### MYORIA-503 — Mixed Nutrition + Fluid Delete Policy Documentation

- Scope: document the V1 boundary for linked nutrition + fluid lifecycle,
  especially what is intentionally unavailable or deferred.
- Output: explicit policy for mixed-entry delete/edit behavior before any
  implementation slice changes linked persistence behavior.
- Non-goals: no persistence rewrite, no fake linked deletes, and no UI promise
  of unsupported independent actions.

### MYORIA-504 — Workout Active/Report Surface Checkpoint

- Scope: checkpoint the current Workout active/report state and propose the
  next smallest workout slice.
- Output: clear next issue sequence for Workout without pulling Core Tracking
  nutrition/fluid/bodyweight surfaces back into scope.
- Non-goals: no Workout redesign, no exercise data-model rewrite, and no
  cross-domain reporting expansion.

## Recommended Immediate Next Slice

Recommended next slice: MYORIA-499 — Food Library Detail Visual Grammar Audit.

- It is the highest-value, lowest-risk next step because Food Library detail is
  repeatedly named as accepted visual debt but has not yet had the same focused
  current-state audit as Create/Edit or Add Food.
- It can be docs-only or mostly docs-first, preserving the no-code stability of
  the current passing Core Tracking flows.
- It narrows any later UI work to one surface and one lifecycle grammar instead
  of reopening Food Library, Add Food, and report screens together.
- It reduces the risk that a later visual cleanup accidentally changes archive,
  restore, edit, or created-item navigation behavior.

## Verification

Commands run for this docs-only checkpoint:

- `pnpm format:check` — passed
- `git diff --check` — passed
- `git diff --cached --check` — passed
- `pnpm styleguide:build` — passed
- `pnpm styleguide:check` — passed
