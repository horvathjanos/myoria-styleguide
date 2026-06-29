# MYORIA-483 Add Food Selected-Item Form Legacy Grammar Audit

## 1. Status

- Ticket: MYORIA-483 / GitHub issue #470
- Scope: docs-only audit
- Production UI changed: no
- Tests changed: no
- Tokens, style allowlists, and generated output changed: no
- Data, domain, application, persistence, schema, migration, and seed changed:
  no
- Acceptance decision: **PASS WITH DEBT**

## 2. Purpose

This document audits the current Add Food selected-item amount/unit step before
any production UI change. It compares the original issue #470 observations with
the form migrations and contracts completed afterward, then decides whether a
focused implementation slice is still justified.

This audit does not treat the issue's earlier screenshot-era observations as
current by default. Current production implementation and focused tests are the
evidence for the decision.

## 3. Surfaces Audited

- Add Food search/list step, as parent-flow context only.
- Add Food selected-item amount/unit step.
- Selected food identity display.
- Amount input.
- Unit selector.
- Mixed Nutrition + Fluid explanatory copy when the selected item contributes
  to both.
- Local validation and submit error behavior.
- `Cancel` and `Log` behavior.

## 4. Current Behavior Summary

The user reaches Add Food from `Today -> Nutrition -> Add Food`. The workflow
first shows recent catalog foods or filtered search results. Selecting a result
opens the selected-item step. A Food Library item created from the Add Food
no-result path can also return directly to this step with that item selected.

The selected step displays:

- `Add food` workflow identity and `Nutrition report` context;
- a `Selected food` field with the catalog display name and reference calories
  and macros;
- `Also logs Fluid` for a mixed Nutrition + Fluid item;
- an `Amount` numeric line input initialized from the catalog default;
- a `Unit` selector containing only the item's supported units; and
- `Cancel` plus either `Log selected food` or `Log food and fluid`.

Changing Amount updates the draft and clears an earlier local error. Selecting
a supported unit updates the draft and also clears an earlier local error.
Submission parses Amount as a finite number greater than zero. Invalid input
shows `Amount must be greater than 0.` locally. Typed submit failures and
unexpected failures also remain in the Add Food workflow; they do not fake a
successful log or refresh.

On submit, the selected catalog food ID, amount, unit, timestamp, and timezone
go through the existing selected-item submit path. A nutrition-only item logs a
Nutrition projection. A mixed item logs Nutrition and its linked Fluid
projection. Duplicate submission is prevented while logging is in flight, and
both actions are disabled while submitting.

`Cancel` resets and closes the Add Food workflow without logging, except that it
is ignored while a submission is in flight. After a successful log, the
Nutrition day model is refreshed, the Today refresh callback is invoked by the
existing success path, the Add Food workflow is reset, and the user returns to
Nutrition Day. A refresh failure remains visible locally instead of closing the
workflow as if the refresh had succeeded.

## 5. Visual Grammar Findings

### Already aligned

- The selected step uses `MyoriaFormField` for Selected food, Amount, and Unit.
- The selected identity is quiet token-backed text, not a nested summary card.
- Amount uses the transparent, divider-owned numeric `MyoriaTextInput`.
- Unit uses the wrapping `MyoriaOptionGroup`, including selected accessibility
  state and minimum touch-target grammar.
- Cancel and Log use `MyoriaFormActionRow` with Cancel on the left and commit on
  the right.
- The selected form wrapper has no background, border, or radius.
- Mixed items retain the short factual `Also logs Fluid` copy and use the
  explicit `Log food and fluid` commit label.
- Search/list parent context uses the same shared field/input grammar while
  keeping unframed, divider-owned result rows.

### Remaining visual debt

- The broader Add Food route keeps its existing screen/header rhythm; this is
  already classified as separate shell debt.
- The selected step is aligned to the current shared grammar but is not a claim
  of final aesthetic design.
- `MyoriaFormActionRow` still gives the commit action a filled primary treatment.
  That is the current approved V1 form-commit grammar. It may feel heavier than
  the parent list's quiet text actions, but MYORIA-512 explicitly permits this
  primitive for form commits and separates it from confirmation grammar.
- The top-level error is local to the workflow rather than attached directly to
  Amount. This preserves current behavior and is not evidence of hidden or
  misleading validation.

### Issue #470 currency

The original observations are no longer fully current after MYORIA-490 and
MYORIA-496. Large bordered input panels and a boxed selected-food summary are no
longer present. The action remains visually stronger than search/list actions,
but it is a structured-data commit action and uses the contracted shared form
primitive. MYORIA-497 separately aligned the parent search step without making
its list actions precedent for form commits.

No current evidence shows an unusable, misleading, inaccessible, or
functionally broken control. The remaining concerns are visual V1 debt, not a
blocker and not a clear contract gap requiring implementation.

## 6. Contract Comparison

| Evidence | Current production comparison | Result |
| --- | --- | --- |
| MYORIA-487 form grammar | Quiet identity, line input, selected unit state, field grouping, local errors, and paired form actions are present. Its selected-step follow-up is recorded as completed by MYORIA-490 and refined by MYORIA-496. | Aligned for V1. |
| MYORIA-488 shared primitives | The step directly uses `MyoriaFormField`, `MyoriaTextInput`, `MyoriaOptionGroup`, and `MyoriaFormActionRow`. | Aligned. |
| MYORIA-512 action/confirmation contract | Add Food Log is a form commit, not a confirmation. Cancel is left, commit is right, pending state is local, duplicate submission is prevented, and `MyoriaFormActionRow` is valid for this category. | Aligned; no confirmation redesign is in scope. |
| MYORIA-497 Add Food search/list grammar | The parent step is quiet and divider-owned. Its Cancel/list treatment is context, while the selected step appropriately switches to contracted form grammar for structured input and commit. | Compatible, not identical by category. |
| Current implementation and tests | Tests assert shared labels/input/selector/actions, absence of selected-form card chrome, mixed-item copy, supported units, local failure, success refresh, linked Fluid projection, and duplicate-submit protection. | Functional and contract evidence supports acceptance. |

## 7. Acceptance Decision

**PASS WITH DEBT**

The selected-item form is functionally passing and substantially migrated. The
legacy bordered-panel observation is stale. The filled Log action remains
visually heavier than the search/list surface, but it conforms to the current
shared form-commit contract and is not evidence of confirmation/action grammar
misuse. Broader route rhythm and final aesthetic refinement remain accepted V1
debt.

This decision does not invent a quieter commit-action requirement and does not
approve a broad Add Food redesign.

## 8. Recommended Next Slice

Close issue #470 as superseded/resolved by MYORIA-490 and MYORIA-496. Take no
new implementation slice for this surface. Treat the remaining route-level and
form-action aesthetic concerns as accepted debt until a future app-wide form
commit contract explicitly changes the shared primitive.

## 9. Explicit Non-Goals

- No production UI changes.
- No Add Food behavior changes.
- No Food Library changes.
- No Nutrition domain, application, persistence, schema, migration, or seed
  changes.
- No token, style allowlist, or generated output changes.
- No confirmation or action redesign.
- No broad visual redesign.

## 10. Manual QA Checklist

- [ ] Open `Today -> Nutrition -> Add Food`.
- [ ] Search for Chicken breast or another seeded item.
- [ ] Open the selected-item step.
- [ ] Change Amount.
- [ ] Switch Unit if another supported unit is available.
- [ ] Log the item.
- [ ] Confirm Nutrition report and Today update.
- [ ] Confirm the Cancel path still works without logging.
- [ ] Confirm invalid Amount validation still appears and prevents logging.

## 11. Verification

Commands required for this docs-only audit:

- `pnpm format:check`
- `git diff --check`
- `git diff --cached --check`
- `pnpm styleguide:build`
- `pnpm styleguide:check`

Final pass/fail results are recorded in the MYORIA-483 completion response.
