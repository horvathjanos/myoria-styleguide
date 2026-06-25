# MYORIA-503 FluidReportScreen Style Contract Audit

## Status

- Ticket: MYORIA-503 / GitHub issue #491
- Scope: docs-only audit
- Acceptance decision: PASS WITH DEBT
- Production UI changed: no
- Tests changed: no
- Token, allowlist, generated styleguide, schema, persistence, domain,
  application, and seed changes: no

## Purpose

MYORIA-502 polished Fluid entry detail/delete copy and local error grammar.
This audit checks whether `FluidReportScreen.styles.ts` is drifting into random
local visual values or still follows the Myoria styleguide direction described
by `src/ui/theme/styleguideContract.ts`.

The React Native contract says production UI should use small role-based
contract values instead of introducing local visual numbers. This audit does
not refactor the production UI; it records the current contract posture and the
smallest useful follow-up.

## Files Inspected

- `src/ui/theme/styleguideContract.ts`
- `src/ui/fluid/FluidReportScreen/FluidReportScreen.styles.ts`
- `src/ui/fluid/FluidReportScreen/FluidEntryDetailScreen.tsx`
- `docs/styleguide/report-day-contract-v1.md`
- `docs/styleguide/MYORIA-465-ui-styleguide-token-discipline-audit.md`
- `docs/styleguide/MYORIA-502-fluid-entry-detail-delete-polish.md`
- MYORIA-502 commit: `e534f3b fix(fluid): MYORIA-502 polish entry delete detail`

## Short Answer

The current Fluid report styles are not random. They are patterned, but they are
not strict enough to call contract-backed.

The day-report portion follows the documented report-day grammar: quiet
secondary screen shell, unframed summary facts, quiet text mode selector, list
rows with separators, fixed chevron affordance, and text add actions. Several
values map directly or closely to role-based values in `styleguideContract.ts`.

The file still carries substantial legacy/local hardcoded visual debt. The
hardcoded values are clustered around the older Fluid add/edit/detail grammar:
teal/green domain colors, white panels, rounded bordered controls, local button
weights, local input typography, and repeated opacity values.

## What Is Already Contract-Backed

These values either reference `styleguideContract.ts` directly or clearly match
existing role-based contract values:

| Style area | Contract-backed posture |
| --- | --- |
| Screen background | `screen.backgroundColor` uses `uiColors.background`. |
| Summary metric labels | `metricLabel` uses `uiColors.textPrimary` and `uiTypography.sectionLabel`. |
| Summary metric values | `metricValue` uses `uiColors.textSecondary` and `uiTypography.reportSummaryValue`. |
| Summary metric units | `metricUnit` uses `uiColors.textMuted` and `uiTypography.metricUnit`. |
| Row chevron zone | `entryChevronZone.width: 24` matches `uiList.rowChevronZoneWidth` / `uiChevron.zoneWidth`. |
| Row height and padding | `entryRow.minHeight: 64` and `paddingVertical: 12` match comfortable report/list row rhythm. |
| Touch targets | `minHeight: 44` appears on controls where it matches `uiAction.minHeight` / input minimums. |
| Separators | `borderTopWidth`, `borderBottomWidth`, and button borders use the 1 px hairline grammar. |
| Common spacing | Repeated `4`, `8`, `12`, `16`, and `24` values map to the `uiSpacing` scale. |
| Pressed states | `opacity: 0.72` is a local near-match for the contract's `uiAction.pressedOpacity: 0.7`. |

The report-day screen anatomy is also contract-backed by
`docs/styleguide/report-day-contract-v1.md`, even where the RN style file still
uses literals instead of named imports.

## Legacy / Local Hardcoded Visual Debt

The main debt is not isolated one-off randomness. It is an older local visual
grammar that has not been converted to the strict RN styleguide contract yet.

| Debt area | Examples | Why it is debt |
| --- | --- | --- |
| Local palette | `#255B5B`, `#356666`, `#102A25`, `#68766E`, `#7A867F`, `#EFF5F5`, `#F4F8F8`, `#DDE4DF`, `#CCD8D8`, `#B42318`, `#FFFFFF` | These bypass `uiColors` and keep Fluid on a local teal/green palette rather than the Braun-style role palette. |
| Local typography | Many repeated `fontSize` / `lineHeight` / `fontWeight` pairs such as `17/23`, `19/24`, `22/28`, `24/30`, `28/34`, and heavy `800` weights | Some values match older screen/detail grammar, but they are not named `uiTypography` roles. |
| Local radius | Repeated `borderRadius: 8` | The strict contract does not currently expose a radius role, so this remains local form/button/detail chrome. |
| Local spacing nudges | `gap: 2`, `6`, `10`, `14`, `18`, `padding: 14`, `padding: 20`, `minWidth: 64`, `minWidth: 118` | Some are visually coherent, but not all are named contract spacing or report roles. |
| Local opacity | `0.72`, `0.5`, `0.48` | Pressed/disabled states should use named action or state roles when the contract has them. |
| Legacy form/action grammar | Filled teal buttons, bordered white controls, rounded confirmation panel, rounded inputs | This belongs to the older add/edit/detail workflow grammar, not the stricter report-day contract. |

## Random Or Patterned?

Patterned.

The values repeat in recognizable groups:

- teal action palette for Fluid-specific primary actions
- red destructive palette for delete/error paths
- white bordered inputs and secondary buttons
- 8 px rounded controls/panels
- 44 px interactive controls
- 64 px report rows
- 24 px chevron zone
- 13/17, 14/18, 16/20, and 18/22 text rhythms

That consistency matters: the file is carrying an older local grammar, not
uncontrolled visual sampling. However, the grammar is still local to this
feature area and should not be treated as the approved styleguide source.

## MYORIA-502 Debt Assessment

MYORIA-502 did not introduce a new visual direction. It followed the existing
local Fluid detail grammar.

The MYORIA-502 production style additions were:

- `localErrorPanel` with `gap: 4`
- `localErrorTitle` with `#B42318`, `14/20`, and `fontWeight: '700'`

Those values are local hardcoded debt, but they are aligned with the existing
Fluid detail/delete language and the nearby `errorTextInline` destructive
style. The slice improved delete communication without broadening the visual
surface or creating a competing style system.

Verdict: MYORIA-502 added a small amount of local hardcoded debt by necessity,
but it followed the existing local grammar and did not materially worsen
Core Tracking V1 style risk.

## Core Tracking V1 Impact

This does not block Core Tracking V1.

Reasons:

- The Fluid report behavior is already accepted by recent Core Tracking V1
  slices.
- The day-report structure follows the report-day contract closely enough for
  MVP release use.
- The remaining debt is visual contract enforcement, not broken behavior,
  unsafe persistence, or domain/application leakage.
- A cleanup should be small and explicit so it does not become a broad visual
  redesign.

Acceptance decision: PASS WITH DEBT.

## Recommended Follow-Up

Recommended next slice:

`MYORIA-504 - Align FluidReportScreen styles to styleguide contract roles`

Scope for MYORIA-504 should stay narrow:

- Replace obvious Fluid report literals with existing `styleguideContract.ts`
  roles where behavior and layout remain unchanged.
- Prioritize report-day styles first: screen, mode selector, summary metrics,
  entries header, rows, empty state, separators, chevron zone, add text action,
  and pressed opacity.
- Keep add/edit/detail form grammar changes only where a direct existing role
  exists.
- Do not redesign the Fluid add workflow, detail layout, delete flow, or report
  content.
- Do not add new tokens unless a separate styleguide contract slice explicitly
  approves them.

Expected MYORIA-504 non-goals:

- No production visual redesign.
- No generated styleguide output edits.
- No persistence, domain, application, schema, migration, or seed changes.
- No shared primitive extraction unless a repeated boundary is already proven.

## Audit Closeout

Fluid report styles are patterned and mostly aligned with the intended report
screen family, but strict role-based RN styleguide enforcement is incomplete.
The safe conclusion is to ship Core Tracking V1 with this documented debt and
pay it down in a focused MYORIA-504 cleanup slice.
