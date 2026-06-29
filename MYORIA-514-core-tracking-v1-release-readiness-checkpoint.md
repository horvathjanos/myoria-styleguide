# MYORIA-514 — Core Tracking V1 Release-Readiness Checkpoint

## 1. Status

- Ticket: MYORIA-514 / GitHub issue #502
- Scope: docs-only
- Production UI changed: no
- Tests changed: no
- Tokens, token mirrors, style allowlists, and generated output changed: no
- Data, domain, application, persistence, schema, migration, and seed changed:
  no

## 2. Purpose

This document is the Core Tracking V1 release-readiness checkpoint after the
MYORIA-498, MYORIA-507, MYORIA-512, MYORIA-513, and MYORIA-483 documentation,
QA, and design-debt sequence. It consolidates the functional evidence,
accepted debt, blocker status, and remaining manual QA needed for release
confidence.

This is not a new design contract and not an implementation slice. It does not
authorize production changes or reopen settled Add Fluid confirmation design.

## 3. Source Documents Reviewed

- `MYORIA-498-core-tracking-v1-current-state-checkpoint.md` records Today as
  the root domain-entry surface and the accepted Nutrition, Add Food, Food
  Library, Fluid, and Bodyweight behavior after the first Core Tracking form
  sequence.
- `MYORIA-507-core-tracking-v1-post-fluid-form-checkpoint.md` records Food
  Library detail, pure Fluid detail/delete, the report-local Add Fluid form,
  linked mixed-entry boundaries, and the remaining visual debt after the Fluid
  sequence.
- `MYORIA-512-core-tracking-action-confirmation-grammar-contract.md` separates
  form actions from confirmation decisions and establishes the safe action
  categories without approving new confirmation anatomy.
- `MYORIA-513-confirmation-visual-reference-audit.md` accepts the current Add
  Fluid dirty-discard presentation as V1 visual debt, confirms that it is not
  approved grammar, and defers redesign pending explicit Janos approval.
- `MYORIA-483-add-food-selected-item-form-legacy-grammar-audit.md` accepts the
  selected Add Food step as `PASS WITH DEBT` and records its logging,
  validation, refresh, mixed-item, and duplicate-submit behavior.
- `MYORIA-493-core-tracking-v1-manual-qa-closeout.md` records passing manual QA
  for Add Fluid, Add Weight, nutrition-only and mixed Add Food logging, Food
  Library navigation/create/edit, Add Food availability, and fallback wording.
- `MYORIA-499-food-library-detail-visual-grammar-audit.md` finds no Food Library
  detail interaction blocker and scopes its then-current visual debt.
- `MYORIA-500-food-library-detail-visual-grammar.md` records the quieter detail
  alignment while preserving edit, archive, restore, and detail behavior.
- `MYORIA-501-fluid-report-entry-detail-delete-parity-audit.md` accepts pure
  Fluid entry detail/delete as `PASS WITH DEBT` and preserves linked mixed
  projections as intentionally read-only.
- `MYORIA-502-fluid-entry-detail-delete-polish.md` records the accepted Fluid
  delete copy and local error presentation while preserving lifecycle behavior.
- `MYORIA-503-fluid-report-style-contract-audit.md` classifies the Fluid report
  as patterned legacy debt rather than a functional blocker.
- `MYORIA-504-fluid-report-style-contract-alignment.md` records the safe
  alignment of Fluid report styles to existing contract roles without behavior
  changes.
- `MYORIA-505-add-fluid-form-visual-grammar-audit.md` accepts report-local Add
  Fluid behavior as `PASS WITH DEBT` and identifies a narrow main-form
  alignment.
- `MYORIA-506-fluid-report-add-fluid-shared-primitives.md` records that the
  report-local Add Fluid main form uses shared primitives while preserving
  validation, logging, refresh, cancellation, and dirty-discard behavior.
- `MYORIA-511-add-fluid-workflow-visual-grammar-correction.md` records the quiet
  Add Fluid workflow identity and unfilled dirty-discard actions without
  changing confirmation behavior.

## 4. Functionally Ready V1 Areas

| Area | Readiness | Evidence and boundary |
| --- | --- | --- |
| Today root/domain entry surface | Ready | MYORIA-498 records Today as the root daily surface with domain-oriented Nutrition, Fluid, Bodyweight, and Workout entry points. |
| Nutrition report day flow | Nearly ready | Day logging and refresh behavior are supported by the Add Food and manual-QA evidence. A final release pass should recheck the complete report-day journey on the target build. |
| Add Food search/recent/no-result create path | Nearly ready | Search and recent results, trimmed-query Create Item, name prefill, and return to the selected step are documented as implemented. The complete no-result return journey still belongs in final manual QA. |
| Add Food selected-item logging | Ready | MYORIA-483 records amount/unit validation, supported-unit selection, duplicate-submit protection, refresh, and nutrition-only logging as accepted. |
| Mixed Nutrition + Fluid logging from Add Food | Ready within V1 boundary | Logging and both projections passed the MYORIA-493 manual QA. Independent projection edit/delete remains intentionally unsupported. |
| Food & Drink Library list/detail/create/edit/archive/restore | Nearly ready | Navigation, create, edit, Add Food availability, and detail behavior have recorded evidence. Archive/restore and long-content presentation should be rechecked in final manual QA. |
| Fluid report day flow | Nearly ready | Day summary, rows, entry detail, refresh, and report navigation are accepted. Final target-build QA should cover the complete add/delete/restart journey. |
| Report-local Add Fluid | Ready | MYORIA-506 and MYORIA-511 preserve selection, validation, logging, refresh, Day-mode return, clean Cancel, and dirty-discard behavior; MYORIA-507 records passing main-form QA. |
| Pure Fluid entry detail/delete | Ready | MYORIA-501 accepts the flow and MYORIA-502 aligns delete copy/error grammar. Successful deletion refetches and returns to the report. |
| Bodyweight add/log/report | Nearly ready | MYORIA-493 records Add Weight logging and Bodyweight report/Today updates as passing. Final release QA should repeat the happy path and persistence sanity. |
| Existing manual QA evidence | Ready as supporting evidence | MYORIA-493 and MYORIA-507 record passes for the recent form, logging, mixed-item, Food Library, and Add Fluid work. They support readiness but do not replace the final release checklist. |

## 5. Accepted V1 Debt

The following debt does not block Core Tracking V1 based on the reviewed
evidence:

- Add Fluid dirty-discard confirmation remains accepted visual debt. Its
  current presentation is not approved confirmation grammar and must not be
  copied as precedent.
- Action/confirmation visual redesign is deferred until Janos approves a
  concrete direction and contract.
- Add Food, Add Fluid, and Food Library long forms retain aesthetic and
  hierarchy debt despite being functionally usable.
- A reusable Food Library/object-detail contract is deferred. The aligned
  detail screen is sufficient for V1 without creating a new shared primitive.
- Fluid Entry Edit and remaining Fluid Detail visual debt remain deferred.
- Header, date, back-label, title, and broader shell rhythm remain cross-surface
  debt.
- Range reports and broader cross-domain reporting remain deferred.
- A canonical mixed Nutrition + Fluid lifecycle/edit/delete rewrite remains
  deferred. Linked Fluid projections remain read-only from Fluid report rows.
- Workout is outside this Core Tracking V1 readiness decision unless it is
  explicitly added to the release scope.

## 6. Potential Blockers

| Blocker candidate | Evidence | Decision | Owner / next action |
| --- | --- | --- | --- |
| Add Fluid confirmation is not approved visual grammar | MYORIA-512 and MYORIA-513 explicitly accept the current behavior/presentation as debt and find no behavior or accessibility blocker. | Not blocker | Defer until Janos-led visual approval; do not reopen for V1. |
| Remaining long-form and shell visual inconsistency | MYORIA-483, MYORIA-498, and MYORIA-507 classify it as aesthetic debt without evidence of unusable or misleading controls. | Not blocker | Defer to later focused product/design work. |
| Final end-to-end target-build coverage is incomplete | Existing QA is strong but split across closeouts and does not claim one final release pass across every listed journey. | Needs QA | Janos runs the checklist in section 7 on the release candidate. |
| Food Library archive/restore and long-content presentation | Behavior is documented and focused tests/evidence exist, but MYORIA-500 still asks for target-device lifecycle and long-content QA. | Needs QA | Verify archive/restore, long names, aliases, notes, and pending labels. |
| Mixed Nutrition + Fluid independent lifecycle | The linked Fluid projection is intentionally read-only; no unsafe independent edit/delete affordance is promised. | Not blocker | Preserve the V1 boundary; create a later product/architecture decision before any rewrite. |
| Range reports, broad reporting, and Workout | Prior checkpoints explicitly defer these areas from the focused Core Tracking readiness scope. | Not blocker | Keep out of this release decision unless release scope changes. |

No explicit functional, safety, accessibility, persistence, or architecture
blocker is recorded in the reviewed evidence.

## 7. Manual QA Still Needed

Run this checklist on the final iOS release candidate, using a stable local
timezone and a known selected day:

- [ ] Open Today and confirm the current-day state, summaries, and Nutrition,
      Fluid, and Bodyweight entry points are reachable and coherent.
- [ ] Open Nutrition -> Add Food, exercise recent and search results, select a
      nutrition-only item, change Amount/Unit where supported, log it, and
      confirm Nutrition report and Today refresh.
- [ ] Search for a missing food, choose Create Item, confirm the trimmed name
      prefill, create it, return with it selected, then log it successfully.
- [ ] In Food & Drink Library, create and edit an item; archive it, confirm it
      leaves normal Add Food search, restore it, and confirm it becomes
      available again without changing historical logs.
- [ ] Open a Food Library detail containing long name, aliases, and notes and
      confirm content, lifecycle actions, and pending labels remain readable on
      the target device.
- [ ] Open Fluid report -> Add fluid, switch Type, enter a valid decimal amount,
      log it, and confirm Day totals and Today refresh.
- [ ] Exercise Add Fluid invalid input, unchanged Cancel, dirty Cancel -> Keep
      editing, and dirty Cancel -> Discard; confirm no duplicate or unintended
      entry is written.
- [ ] Open a pure Fluid entry detail, cancel delete once, then delete it and
      confirm the report and Today totals refresh.
- [ ] Add bodyweight and confirm Bodyweight report and Today refresh.
- [ ] Log a mixed Nutrition + Fluid item from Add Food and confirm both reports
      and Today summaries update; confirm its Fluid projection remains
      read-only without a misleading independent delete affordance.
- [ ] Restart the app and confirm the newly logged Nutrition, Fluid, mixed, and
      Bodyweight data and Today/report totals persist consistently.
- [ ] Recheck local-day and displayed-time behavior around the selected day;
      verify Cancel/Back paths do not log, archive, restore, or delete
      accidentally.

## 8. Release-Readiness Decision

**READY FOR FINAL MANUAL QA**

The reviewed evidence contains no explicit blocker. Core Tracking V1 has
coherent functional coverage and targeted passing QA, while the remaining
release uncertainty is the final integrated pass on the intended build and
device. Accepted visual debt must not be promoted into a blocker without new
evidence that a flow is unusable, misleading, inaccessible, or unsafe.

## 9. Recommended Next Step

**Run final manual QA checklist.**

Do not schedule more Add Fluid, action, or confirmation production UI work for
this release unless that QA produces blocker evidence.

## 10. Explicit Non-Goals

- No production UI changes.
- No test changes.
- No token, token-mirror, style-allowlist, or generated-output changes.
- No domain, application, persistence, schema, migration, or seed changes.
- No action or confirmation redesign.
- No broad visual redesign.
- No new shared primitives.
- No Workout expansion unless it is explicitly release-scoped.

## 11. Verification

Commands run for this docs-only checkpoint:

- `pnpm format:check` — passed
- `git diff --check` — passed
- `git diff --cached --check` — passed
- `pnpm styleguide:build` — passed
- `pnpm styleguide:check` — passed
