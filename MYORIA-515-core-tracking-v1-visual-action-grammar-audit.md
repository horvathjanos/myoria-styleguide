# MYORIA-515 Core Tracking V1 Visual Action Grammar Audit

## 1. Status

- Ticket: MYORIA-515 / GitHub issue #503
- Status: **AUDIT COMPLETE WITH DEBT**
- Scope: docs-only visual action grammar audit
- Production UI changed: no
- Tokens, styles, components, screens, tests, seed data, generated files,
  persistence, schemas, domain logic, and application logic changed: no

## 2. Purpose

Core Tracking V1 is mostly passing functional QA, but it does not present one
coherent visual action grammar. Today, Nutrition, Fluid, Bodyweight, Add Food,
Add Fluid, Add Weight, Food & Drink Library, item lifecycle actions, entry
delete actions, and dirty-discard decisions mix quiet text actions, filled
rectangular form controls, rounded green controls, and domain-local treatments.

This audit maps that implemented state, classifies accepted grammar and visual
debt, and establishes decision gates for later work. It does not approve the
current Add Food/Add Fluid filled actions, promote Add Weight as the global
pattern, or invent a replacement design. Its purpose is to stop isolated
button restyling before Janos approves a small cross-surface direction.

## 3. Source Review

### Documentation inspected

- `docs/development/codex-implementation-guardrails.md`
- `AGENTS.md`, `CODING_GUIDELINES.md`, and `CLEAN_ARCHITECTURE.md`
- `docs/styleguide/MYORIA-483-add-food-selected-item-form-legacy-grammar-audit.md`
- `docs/styleguide/MYORIA-487-core-tracking-v1-form-screen-grammar-contract.md`
- `docs/styleguide/MYORIA-497-add-food-search-step-form-grammar.md`
- `docs/styleguide/MYORIA-499-food-library-detail-visual-grammar-audit.md`
- `docs/styleguide/MYORIA-500-food-library-detail-visual-grammar.md`
- `docs/styleguide/MYORIA-503-fluid-report-style-contract-audit.md`
- `docs/styleguide/MYORIA-505-add-fluid-form-visual-grammar-audit.md`
- `docs/styleguide/MYORIA-507-core-tracking-v1-post-fluid-form-checkpoint.md`
- `docs/styleguide/MYORIA-508-fluid-confirmation-grammar-audit.md`
- `docs/styleguide/MYORIA-509-add-fluid-dirty-discard-confirmation.md`
- `docs/styleguide/MYORIA-510-add-fluid-discard-action-grammar-correction.md`
- `docs/styleguide/MYORIA-511-add-fluid-workflow-visual-grammar-correction.md`
- `docs/styleguide/MYORIA-512-core-tracking-action-confirmation-grammar-contract.md`
- `docs/styleguide/MYORIA-513-confirmation-visual-reference-audit.md`
- `docs/styleguide/MYORIA-514-core-tracking-v1-release-readiness-checkpoint.md`
- `docs/styleguide/design-system-v1.md`
- `docs/styleguide/screen-composition-contract-v1.md`
- `docs/styleguide/report-day-contract-v1.md`
- `docs/styleguide/food-add-flow-contract-v1.md`

### Implementation areas inspected, read-only

- Today summary navigation in `src/ui/today/TodayRamsBraunLayout.tsx`.
- Nutrition report, Add Food, and entry detail in
  `src/ui/nutrition/NutritionReportScreen/`.
- Fluid report, Add Fluid, entry detail, and entry edit in
  `src/ui/fluid/FluidReportScreen/`.
- Bodyweight report, Add Weight, and entry detail in
  `src/ui/bodyweight/BodyweightReportScreen/`.
- Standalone bodyweight and drink forms in
  `src/ui/bodyweight/BodyweightLoggingScreen.tsx` and
  `src/ui/fluid/DrinkLoggingScreen.tsx` as adjacent evidence.
- Food & Drink Library list, detail, create/edit, archive, and restore in
  `src/ui/nutrition/FoodDrinkLibrary/`.
- Shared form actions in `src/ui/shared/form/MyoriaFormActionRow.tsx` and its
  sibling styles.
- Relevant sibling style files for the report, form, library, and Today
  surfaces above.

The implementation review was for current visible anatomy and labels only. No
implementation file was changed.

## 4. Current Visual Grammar Inventory

| Surface group | Current visible pattern | Classification | Notes / risk |
| --- | --- | --- | --- |
| Today summary actions | Entire Nutrition, Fluid, Bodyweight, and Workout summary regions are pressable navigation blocks with readouts and chevrons or section structure rather than explicit buttons. | Accepted | Strong domain navigation grammar. It should not become precedent for form commit actions. |
| Report navigation actions | Back/date/range and entry-row navigation use quiet text, chevrons, pressable rows, and report-local controls. Nutrition and Bodyweight feel more coherent and accent-driven than Fluid. | Accepted with debt | Navigation semantics are clear, but Fluid remains visually more black/gray and separate from the other report family members. |
| Report “add” actions | `ADD FOOD`, `ADD FLUID`, and `ADD WEIGHT` are quiet report-section text actions. | Accepted | This is established report-day grammar. These are navigation/task-entry actions, not form submits. |
| Add Food search/create actions | Underlined or quiet `Cancel` and `Create item` actions around an underline search and divider-owned result list. | Accepted | Coherent for search, escape, and catalog-task entry. Do not use it alone to settle submit hierarchy. |
| Add Food selected-item form actions | Shared paired action row: outlined/boxed `Cancel` and heavy black filled `Log selected food` or `Log food and fluid`. | Not approved | Functionally accepted for V1, but the filled submit is remaining visual debt. MYORIA-483's earlier primitive acceptance does not settle final aesthetic approval. |
| Add Fluid form actions | Shared paired action row: outlined/boxed `Cancel` and heavy black filled `Log fluid`. | Not approved | Functionally accepted and safe to release as debt. Do not copy this treatment or reintroduce a visible `Water/Fluid` domain kicker. |
| Add Weight form actions | Report-local rounded white/outlined `Cancel` and rounded green `Save`, under a visible `Bodyweight` kicker. | Unresolved | A separate legacy/local grammar. It is not automatically approved as the global form pattern and must not be copied without a cross-surface decision. |
| Food & Drink Library item actions | Quiet underlined text actions such as `CREATE ITEM` and `Edit`, integrated with list/detail composition. | Accepted | Appropriate for catalog navigation and utility actions; not direct precedent for commits or destructive confirmations. |
| Item archive/restore actions | Underlined `Hide from logging` / `Restore to logging`; hide opens a local contextual decision with `Keep item` and destructive lifecycle text. | Accepted with debt | Interaction and copy are accepted. Destructive treatment still differs from entry deletion and should be audited in a later approved slice, not normalized locally. |
| Entry detail delete actions | Quiet underlined `Delete entry`; local unframed `Delete this entry?` stack with `Keep entry` and destructive `Delete`. | Accepted | Closest current match to the intended confirmation direction. Preserve for V1. |
| Dirty/discard confirmations | Add Fluid uses a full-screen quiet decision branch with text actions; Add Weight and edit/catalog flows retain other local panel/button treatments. | Accepted debt | Behavior and draft safety are accepted. Add Fluid's complete visual anatomy is not approved precedent; cross-domain inconsistency remains. |

## 5. Explicit Action Grammar Categories

| Category | Intended semantic meaning | Current examples | Current visual state | Approval / debt status | May a later UI slice modify it? |
| --- | --- | --- | --- | --- | --- |
| Navigation action | Move to another report, detail, task, date, or catalog surface without committing data. | Today summary blocks; report rows; back controls; `ADD FOOD`, `ADD FLUID`, `ADD WEIGHT`. | Mostly quiet regions, rows, text actions, and chevrons. | Accepted; Fluid family mismatch remains debt. | Yes, only through an approved navigation/report alignment slice that preserves routes and semantics. |
| Inline utility action | Perform or enter a local non-destructive supporting task. | `CREATE ITEM`, `Edit`, Add Food `Create item`, search-step `Cancel`. | Primarily quiet underlined text actions. | Accepted in the current contexts. | Yes, if a targeted slice preserves action meaning, reachability, and accessibility. |
| Form cancel | Leave or attempt to leave structured input without submitting. | Add Food `Cancel`, Add Fluid `Cancel`, Add Weight `Cancel`. | Boxed outline for Add Food/Fluid; rounded white/outline for Add Weight. | Unresolved cross-surface grammar; current behavior accepted. | Yes. A later approved slice may align visuals but must preserve clean-cancel and dirty-draft behavior. |
| Form submit | Commit validated structured data. | `Log selected food`, `Log food and fluid`, `Log fluid`, Add Weight `Save`. | Heavy black filled rectangle for Add Food/Fluid; rounded green for Add Weight. | Current treatments are not approved final design. | Yes. This is the main candidate for MYORIA-516 after Janos approval. |
| Destructive entry action | Permanently delete one logged entry and update daily totals. | Entry-detail `Delete entry`; confirmation `Delete`. | Quiet underlined trigger and local unframed destructive text confirmation. | Accepted for V1 and preserved. | Only if a later explicit confirmation contract requires it; no local restyling now. |
| Destructive catalog/archive action | Change whether a reusable item is available for future logging while preserving history. | `Hide from logging`; confirmation `Hide from logging`; `Restore to logging`. | Quiet underlined actions in local detail context with structural dividers. | Interaction/copy accepted; visual consistency remains debt. | Yes, with an approved lifecycle-action slice that preserves archival semantics. |
| Confirmation safe action | Reject the destructive choice and keep current data or draft. | `Keep entry`, `Keep item`, `Keep editing`. | Quiet text in accepted delete/lifecycle stacks; mixed treatments in dirty-discard flows. | Entry-delete grammar accepted; dirty-discard presentation remains debt. | Yes for unresolved dirty-discard surfaces after approval; preserve existing entry-delete behavior for V1. |
| Confirmation destructive action | Confirm deletion, archive, or discard after explicit warning. | `Delete`, `Hide from logging`, `Discard`. | Quiet destructive text for accepted entry delete and Add Fluid discard; other domain-local treatments remain. | Entry delete accepted; Add Fluid discard accepted debt; broader grammar unresolved. | Yes only through a category-aware approved slice. Do not introduce filled black/red confirmation buttons by default. |

These categories are semantic boundaries. Similar labels do not authorize the
same visual treatment across navigation, utility, commit, lifecycle, delete,
and discard actions.

## 6. Key Decisions

- Preserve the existing inline entry delete confirmations for V1. Their
  unframed local stacks, explicit `Keep entry` / `Delete` choices, pending
  behavior, and local failures remain the accepted confirmation reference.
- Keep the Add Fluid dirty-discard confirmation as accepted visual debt. Its
  behavior and quiet-action boundary are accepted; its full-screen anatomy is
  not approved final grammar and must not be copied as a system pattern.
- The heavy black filled Add Food and Add Fluid form submit buttons are not
  approved final design. They are working V1 visual debt.
- The rounded green/white Add Weight action grammar is a separate current
  pattern, not automatic approval for the global form action pattern.
- Do not reintroduce a visible `Water` or `Fluid` domain kicker on Add Fluid.
  MYORIA-511 intentionally removed that competing identity.
- Make no further local button styling changes without a small approved visual
  grammar slice. A component's current availability is not design approval.
- Core Tracking V1 may proceed with this known visual debt if the product owner
  accepts it. The reviewed evidence does not make the inconsistency a
  functional, persistence, safety, or architecture blocker.

## 7. Known Debt

- Add Food and Add Fluid form actions use heavy boxed/fill treatments that are
  not approved as the final commit/cancel grammar.
- Add Weight form actions use a distinct rounded green/white grammar and a
  visible `Bodyweight` kicker; neither is approved as a global pattern.
- Fluid report remains visually more black/gray and less coherent with the
  greener/accent-driven Nutrition and Bodyweight reports.
- Green versus black emphasis creates inconsistent action hierarchy across
  neighboring Core Tracking journeys.
- Boxed form buttons and underlined text actions sit beside one another without
  a fully approved category-wide visual contract.
- Destructive treatment differs across entry deletion, catalog archive, form
  discard, and domain-specific edit flows.
- Dirty-discard anatomy is not consistent across Add Fluid, Add Weight, entry
  edit, and Food Library create/edit surfaces.

## 8. Recommended Next UI Slice — Do Not Implement Here

Candidate issue: **MYORIA-516 — Align Core Tracking form actions to approved
visual grammar**.

Open that small UI-only slice only after Janos approves the target visual
grammar. It should probably focus first on Add Fluid and Add Food form actions,
because they share the current heavy black filled primitive and present the
clearest bounded comparison. Add Weight should be comparison evidence, not a
ready-made replacement.

MYORIA-516 must make no behavior changes. It must preserve existing handlers,
accessibility labels and roles, disabled/pending states, draft preservation,
logging behavior, duplicate-submit protection, clean cancellation,
dirty-discard behavior, refresh behavior, persistence, and tests. Any change
that requires behavior, navigation, domain, application, or persistence work
should be split out rather than smuggled into visual alignment.

## 9. Non-Goals

- No new design proposal or inferred target button style.
- No mockups.
- No screenshots.
- No production UI implementation.
- No token or token-mirror changes.
- No styles, components, screens, or shared primitive changes.
- No tests, seed data, persistence, schema, domain, or application changes.
- No generated styleguide output changes. The existing docs process does not
  require generated output for this standalone Markdown audit, so generated
  artifacts remain untouched.
- No behavior changes.
- No broad report, header, navigation, or confirmation redesign.

## 10. Verification

Required docs-only checks:

- `pnpm format:check`
- `git diff --check`
- `git diff --cached --check`
- `pnpm styleguide:build`
- `pnpm styleguide:check`

Final pass/fail results are recorded in the MYORIA-515 completion response.
