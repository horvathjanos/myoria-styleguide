# MYORIA-502 Fluid Entry Detail/Delete Polish

## Status

- Ticket: MYORIA-502 / GitHub issue #490
- Scope: small production UI polish for Fluid entry detail/delete grammar
- Production UI touched: Fluid entry detail/delete only
- Shared primitives touched: no
- Domain/application/persistence/schema/migration/seed changes: no
- Token changes: no
- Style allowlist changes: no
- Generated output manual edits: no

## Purpose

This slice pays down the small Fluid entry detail/delete parity debt recorded
by MYORIA-501 while preserving the accepted Core Tracking V1 behavior.

The goal is not a redesign. Fluid entry detail remains a simple logged-entry
snapshot with local delete action, local confirmation, and existing navigation
back to the Fluid report.

## Debt Paid Down From MYORIA-501

MYORIA-501 accepted the current Fluid flow as `PASS WITH DEBT` and named two
small polish items:

- Fluid delete confirmation production copy used the entry metadata as the
  confirmation body instead of explicit selected-day totals language.
- Fluid delete errors were shown as inline alert text rather than the titled
  local error-panel grammar used by Nutrition and the styleguide preview.

This slice addresses only those two items.

## Surfaces Changed

- `src/ui/fluid/FluidReportScreen/FluidEntryDetailScreen.tsx`
  - Changes the delete confirmation body to:
    `This removes it from fluid totals for the selected day.`
  - Wraps delete errors in a local alert panel with title:
    `Could not delete entry`.
- `src/ui/fluid/FluidReportScreen/FluidReportScreen.styles.ts`
  - Adds Fluid-local `localErrorPanel` and `localErrorTitle` styles matching
    the existing local detail grammar.
- `src/ui/fluid/FluidReportScreen/FluidReportScreen.test.tsx`
  - Adds/updates focused assertions for the new confirmation copy and error
    panel grammar.

## Behavior Preserved

- Today Fluid row still opens Fluid report.
- Fluid report Day rows still open detail only when entry detail actions are
  available.
- Pure Fluid entries still expose `Delete entry`.
- Linked mixed Nutrition + Fluid projections still do not expose
  projection-specific edit/delete actions.
- Delete still calls the existing Fluid delete submitter.
- Successful delete still refetches the Fluid Day model and returns to the
  Fluid report.
- Delete/refetch failure handling remains in the same detail context.
- Add Fluid logging, Fluid totals, Nutrition report/delete, Food Library, Add
  Food, tokens, style allowlist, schema, migrations, seed data, and generated
  styleguide output are unchanged.

## Out Of Scope

- No Nutrition UI or behavior changes.
- No Food Library changes.
- No Add Food or Add Fluid logging workflow changes.
- No Fluid amount-edit form migration.
- No linked mixed-entry lifecycle implementation.
- No independent projection delete for mixed Nutrition + Fluid rows.
- No domain, application, persistence, schema, migration, or seed changes.
- No shared primitive redesign.
- No token or allowlist changes.
- No broad report, dashboard, or navigation redesign.

## Manual QA Checklist

1. Log a fluid entry from Today.
2. Open Fluid report.
3. Open the fluid entry detail.
4. Trigger delete confirmation.
5. Confirm the confirmation body says it removes the entry from fluid totals
   for the selected day.
6. Cancel delete and confirm the entry remains.
7. Trigger delete again and confirm delete.
8. Confirm Fluid report and Today dashboard refresh.
9. Confirm Nutrition entry delete behavior was not changed.
10. Confirm Add Food / Food Library still works unchanged.

## Remaining Debt

- Fluid entry detail remains intentionally sparse. It does not expose note,
  linkage, source, confidence, or raw IDs in the detail snapshot.
- Header/date/back-label rhythm remains broader shell/header debt.
- Linked mixed Nutrition + Fluid entries remain read-only from projection
  report rows until a future canonical linked-entry lifecycle slice exists.

## Recommended Next Slice

Recommended next slice: MYORIA-503 — Mixed Nutrition + Fluid delete policy
documentation.

That slice should document the release-facing policy for mixed linked entries
without changing persistence or exposing unsafe projection-specific deletes.
