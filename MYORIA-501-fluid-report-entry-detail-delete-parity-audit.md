# MYORIA-501 Fluid Report Entry Detail/Delete Parity Audit

## Status

- Ticket: MYORIA-501 / GitHub issue #489
- Scope: docs-only audit of Fluid report entry detail/delete parity
- Production UI touched: no
- Domain/application/persistence behavior touched: no
- SQLite schema, migrations, or seed data touched: no
- Token changes: no
- Style allowlist changes: no
- Generated output manual edits: no

## Purpose

This audit checks whether the current Fluid report entry detail/delete flow is
acceptable for Core Tracking V1 when compared with the already accepted
Nutrition entry detail/delete flow and the current Food Library visual grammar
work from MYORIA-500.

This is an acceptance checkpoint only. It records observed behavior from the
repo and does not redesign, implement, or retest production behavior.

## Surfaces Audited

- Today dashboard Fluid row:
  `src/ui/today/TodayShell.tsx` and `src/ui/today/TodayRamsBraunLayout.tsx`
- App-shell navigation to and from Fluid report:
  `src/ui/appShell/MyoriaAppShell.tsx`
- Fluid report screen and Day row behavior:
  `src/ui/fluid/FluidReportScreen/FluidReportScreen.tsx`
  and `src/ui/fluid/FluidReportScreen/FluidReportDayMode.tsx`
- Fluid entry detail/delete screen:
  `src/ui/fluid/FluidReportScreen/FluidEntryDetailScreen.tsx`
- Fluid report container delete/navigation behavior:
  `src/ui/fluid/FluidReportScreen/FluidReportScreenContainer.tsx`
- Fluid delete helper and use case:
  `src/ui/fluid/FluidReportScreen/deleteFluidReportEntry.ts`
  and `src/application/fluid/DeleteFluidEntryUseCase.ts`
- Fluid daily read model availability:
  `src/application/fluid/getFluidDailyScreenModel.ts`
  and `src/application/fluid/FluidDailyScreenModel.ts`
- Nutrition comparison surfaces:
  `src/ui/nutrition/NutritionReportScreen/NutritionEntryDetailScreen.tsx`,
  `src/ui/nutrition/NutritionReportScreen/NutritionReportScreenContainer.tsx`,
  `src/ui/nutrition/NutritionReportScreen/deleteNutritionReportEntry.ts`,
  and `src/application/nutrition/getNutritionDailyScreenModel.ts`
- Existing decision/styleguide context:
  `docs/styleguide/MYORIA-473-linked-nutrition-fluid-entry-lifecycle-decision.md`,
  `docs/styleguide/MYORIA-493-core-tracking-v1-manual-qa-closeout.md`,
  `docs/styleguide/MYORIA-498-core-tracking-v1-current-state-checkpoint.md`,
  `docs/styleguide/MYORIA-500-food-library-detail-visual-grammar.md`,
  `docs/styleguide/app/src/screens/FluidEntryDetailScreenPage.tsx`, and
  `docs/styleguide/app/src/screens/NutritionEntryDetailScreenPage.tsx`

## Current Behavior Summary

### Today Fluid Row

Today renders Fluid as a tappable split-panel domain block. It shows the
current fluid amount, unit, progress scale, and chevron. Pressing it calls the
Fluid report opener.

App-shell navigation opens `FluidReportScreenContainer` for the current local
day/timezone. Closing the Fluid report clears the report surface, returns to
Today, and refreshes the Today summary.

### Fluid Report Screen

Fluid report uses the same report family shape as Nutrition:

- secondary header back to Today
- screen lead with `Fluid report`
- selected day and timezone metadata
- Day/Week/Month/Year/All mode selector
- Day summary readouts for total amount and entry count
- entry list with quiet `ADD FLUID` action
- range-report placeholders for non-Day modes

Day rows show display name, logged time, amount, and a chevron only when detail
navigation is available. Linked mixed Fluid projections are visible but remain
non-interactive when both edit and delete are unavailable.

### Fluid Entry Detail

Fluid entry detail uses a logged-entry snapshot shape:

- secondary header back to Fluid report
- display name from the read model, falling back to drink type formatting
- amount and localized time metadata
- destructive text action for `Delete entry` when delete is available
- inline local delete confirmation
- linked-entry unavailable note when delete is not available

The detail intentionally does not show an edit action in the snapshot route.
Amount-only edit exists as a separate route path in the Fluid report container
for entries whose `editAvailability` is `available_amount_only`, but this audit
is about entry detail/delete parity.

### Delete Behavior

For pure Fluid entries, delete is available. Confirming delete calls
`deleteFluidReportEntry`, which calls the injected `FluidEntryDeleteSubmitter`.
When the result is `deleted` or `already_deleted`, the helper refetches the
Fluid Day model.

On successful delete and successful refetch, the container closes the selected
entry detail by clearing `selectedEntryId`, so the user returns to the Fluid
report Day surface.

If delete succeeds but refetch fails, the container keeps the detail context,
shows a message that the entry was deleted but Water/Fluid Day could not
refresh, and suppresses another visible delete action for that completed
delete/error state.

For linked projections, `DeleteFluidEntryUseCase` returns `not_deletable` with
reason `linked_projection`. The UI helper does not refetch or fake success for
that refusal.

## Parity Comparison With Nutrition Entry Detail/Delete

| Area | Nutrition behavior | Fluid behavior | Parity decision |
| --- | --- | --- | --- |
| Today entry point | Today Nutrition block opens Nutrition report and refreshes Today on report close. | Today Fluid split-panel opens Fluid report and refreshes Today on report close. | Pass. |
| Report shell | Secondary header, screen lead, day/timezone metadata, modes, Day summary, entries. | Same report family shell with Fluid labels and Fluid totals. | Pass. |
| Row detail affordance | Available rows are pressable with chevron; fully linked unavailable rows are non-interactive. | Same availability-based pressable/chevron behavior. | Pass. |
| Snapshot readability | Shows food name, amount/unit/time, energy, and macro readouts. | Shows drink/display name, amount, and localized time. | Pass with expected domain difference. Fluid has fewer structured readouts. |
| Amount/unit | Shows amount value and unit in metadata. | Shows ml/l amount in metadata. | Pass. |
| Time | Shows localized `Today HH:mm` or local day/time. | Shows localized `Today, HH:mm` or full local day/time. | Pass with minor copy-format difference. |
| Source-like information | Does not show source/confidence/id/raw text in accepted detail snapshot. | Does not show source/confidence/id/note in detail snapshot. | Pass. |
| Delete affordance | Destructive text action appears when delete is available. | Destructive text action appears when delete is available. | Pass. |
| Delete confirmation | Local inline confirmation with Keep entry and Delete. | Local inline confirmation with Keep entry and Delete. | Pass. |
| Delete copy | Explains removal from selected day nutrition totals. | Uses the selected entry meta as confirmation body in production; styleguide preview uses selected-day fluid totals copy. | Pass with debt. |
| Delete error | Nutrition uses a local error panel title plus message. | Fluid shows inline alert text only. | Pass with debt. |
| Successful delete | Refetches Day model and closes selected detail back to report. | Refetches Day model and closes selected detail back to report. | Pass. |
| Refresh failure after delete | Keeps user in context and reports refresh failure. | Keeps user in context, reports refresh failure, and suppresses another delete affordance for the already-deleted row state. | Pass. |
| Linked projection delete | Refused as `not_deletable` / `linked_projection`; no fake success. | Refused as `not_deletable` / `linked_projection`; no fake success. | Pass. |

## Core Tracking V1 Acceptance Decision

Decision: PASS WITH DEBT.

The current Fluid report entry detail/delete flow is acceptable for Core
Tracking V1. Pure Fluid entries can be reached from Today, opened from the
Fluid report, reviewed in a readable detail snapshot, deleted through a local
confirmation, refetched after delete, and returned to the Fluid report. Linked
mixed Nutrition + Fluid projections remain deliberately read-only and
non-interactive, consistent with MYORIA-473.

The remaining issues are visual/copy polish and should not block Core Tracking
V1:

- Fluid delete confirmation production copy uses the entry metadata as the
  body, while the styleguide preview and Nutrition detail use explicit
  selected-day removal copy.
- Fluid delete errors are inline text rather than the titled local error panel
  used by Nutrition and the styleguide preview.
- Fluid detail is intentionally sparse because the current Fluid read model
  only exposes drink/display name, amount, time, note, linkage, and
  availability. It does not need fake source/confidence fields for V1.

## Non-Blocking Visual Or UX Debt

- Align Fluid delete confirmation body copy with the styleguide preview:
  `This removes it from fluid totals for the selected day.`
- Align Fluid delete error presentation with the local error-panel grammar used
  by Nutrition and the styleguide preview.
- Decide later whether Fluid detail should surface note/linkage context when it
  exists; do not add it without a product decision because the accepted
  logged-entry detail grammar avoids raw implementation details.
- Header/date/back-label rhythm remains broader shell/header debt and should
  not be solved inside this audit.
- Linked mixed-entry lifecycle remains accepted V1 limitation per MYORIA-473.
  Do not expose projection-specific edit/delete for mixed entries.

## Explicit Out Of Scope

- No production UI changes.
- No visual redesign.
- No behavior changes.
- No tests changed.
- No tokens, token mirrors, or style allowlist changes.
- No generated styleguide output changes.
- No domain, application, persistence, schema, migration, or seed changes.
- No Fluid amount-edit form migration.
- No Nutrition entry detail/delete changes.
- No Food Library detail/create/edit changes.
- No canonical linked mixed-entry edit/delete implementation.
- No independent projection-specific delete for mixed Nutrition + Fluid rows.
- No broad report redesign or range-report implementation.

## Manual QA Checklist For Janos

1. Start on Today with at least one pure Fluid entry on the selected day.
2. Tap the Fluid row.
3. Confirm Fluid report opens for the current day and shows total fluid,
   entry count, and the logged entry row.
4. Tap a pure Fluid row.
5. Confirm entry detail shows the drink/display name, amount, and local time.
6. Tap Back and confirm it returns to Fluid report.
7. Reopen the same detail, tap `Delete entry`, and confirm the inline delete
   confirmation appears.
8. Tap `Keep entry` and confirm the detail remains open without deleting.
9. Tap `Delete entry` again, confirm `Delete`, and verify the app returns to
   Fluid report with the entry removed and totals refreshed.
10. Return to Today and verify the Fluid summary reflects the deletion.
11. If a mixed Nutrition + Fluid item exists, log it through Add Food and open
    Fluid report.
12. Confirm the mixed Fluid projection appears in Fluid totals and rows but
    does not expose an entry-detail/delete affordance.
13. Restart the app and confirm Fluid report and Today totals remain
    consistent.

## Recommended Next Slice

Recommended next slice: MYORIA-502 — Fluid entry detail/delete polish for
accepted visual debt.

Keep it narrow and production-UI-only if pursued:

- update Fluid delete confirmation body copy to match the accepted selected-day
  totals language
- update Fluid delete error presentation to the same local error-panel grammar
  as Nutrition
- preserve all delete, refetch, navigation, and linked-projection behavior
- avoid amount-edit form migration, linked mixed-entry lifecycle work, tokens,
  style allowlist, schema, and generated-output changes

If visual polish is not important before the next release pass, skip MYORIA-502
and move to MYORIA-503 to document mixed Nutrition + Fluid delete policy in
release-facing language.
