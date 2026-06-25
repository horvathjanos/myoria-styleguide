# MYORIA-504 Fluid Report Style Contract Alignment

## Purpose

MYORIA-504 reduces the style-contract debt recorded by
`MYORIA-503-fluid-report-style-contract-audit.md` for
`FluidReportScreen.styles.ts`.

The slice keeps the existing Fluid report design direction and behavior intact
while replacing clear local visual literals with existing role-based React
Native styleguide contract values.

## Style Debt Reduced

- Replaced repeated pressed opacity values with `uiAction.pressedOpacity`.
- Replaced repeated 44 px action and input heights with `uiAction.minHeight`
  and `uiInput.minHeight`.
- Replaced repeated one-pixel separators and borders with
  `uiSeparator.hairline`.
- Replaced report row heights, row padding, row gaps, and chevron zone width
  with `uiList` roles.
- Replaced repeated 4, 8, 12, and 16 px report/form spacing with existing
  `uiSpacing`, `uiForm`, and `uiReport` roles where the mapping was clear.
- Replaced report-day text colors with `uiColors.textPrimary`,
  `uiColors.textMuted`, `uiColors.error`, `uiColors.destructive`, and
  `uiColors.textInverted` where those roles matched the intent.
- Replaced report-day row, header, empty-state, mode, confirmation, and error
  text styles with `uiTypography` roles where the role fit the surface.

## Contract Roles Used

- `uiColors.background`
- `uiColors.textPrimary`
- `uiColors.textMuted`
- `uiColors.error`
- `uiColors.destructive`
- `uiColors.textInverted`
- `uiTypography.screenTitle`
- `uiTypography.listTitle`
- `uiTypography.listTitleComfortable`
- `uiTypography.listMeta`
- `uiTypography.listMetaComfortable`
- `uiTypography.listState`
- `uiTypography.action`
- `uiSpacing.x1`
- `uiSpacing.x2`
- `uiSpacing.x3`
- `uiSpacing.x4`
- `uiList.rowPaddingYComfortable`
- `uiList.rowMinHeightComfortable`
- `uiList.rowTitleMetaGap`
- `uiList.rowContentChevronGap`
- `uiList.rowChevronZoneWidth`
- `uiList.listStatePaddingTopCompact`
- `uiAction.minHeight`
- `uiAction.pressedOpacity`
- `uiInput.minHeight`
- `uiInput.paddingY`
- `uiForm.optionGap`
- `uiForm.actionRowGap`
- `uiReport.summaryPaddingTop`
- `uiReport.summaryGap`
- `uiReport.sectionHeaderGap`
- `uiReport.modeOptionGap`
- `uiSeparator.hairline`

## Remaining Debt

The following values were intentionally left in place because no existing
contract role clearly preserves the current Fluid visual intent:

- Fluid-local teal action and accent colors such as `#255B5B` and `#356666`.
- Legacy white and pale teal panel/control fills and borders used by the older
  Add/Edit Fluid form grammar.
- Repeated `borderRadius: 8` values, because the current RN contract does not
  expose a radius role.
- Disabled opacity values such as `0.5` and `0.48`, because there is no matching
  state-opacity role beyond pressed state.
- Local detail/form headings and button label weights where using a typography
  role would be a broader visual cleanup.
- Legacy screen shell values such as `gap: 18`, `padding: 20`, and local title
  styles shared with nearby report files.

## Behavior Preserved

- Fluid report day, week, month, year, and all modes are unchanged.
- Day summary, rows, empty state, and Add Fluid entry action are unchanged
  behaviorally.
- Fluid entry detail open/back behavior is unchanged.
- Delete confirmation, cancel, confirm, and error panel behavior are unchanged.
- Report and Today refresh behavior after delete is unchanged.
- No Add Fluid logging workflow behavior was changed.

## Manual QA Checklist

1. Today -> Fluid report.
2. Confirm day summary still renders correctly.
3. Open a fluid entry detail.
4. Trigger delete confirmation.
5. Cancel delete and confirm entry remains.
6. Trigger delete and confirm report/Today refresh.
7. Confirm no visual/background containment regression.
8. Confirm Add Fluid logging still works.

## Change Boundaries

- Production UI changed: yes, style references in the Fluid report style file.
- Token changes: no.
- Style allowlist changes: no.
- Domain/application/persistence/schema/seed changes: no.
- Generated output changes: no.
