# MYORIA-469 Today Token Visual Parity QA

Issue: #455 / MYORIA-469

Date: 2026-06-18

## Scope

QA and documentation checkpoint after MYORIA-468 (`21e11f0`) made Today
production token-compliant. This issue audits visual parity between production
Today and the styleguide Today route based on a manual screenshot comparison
provided after the token migration.

Production references:

- `src/ui/today/TodayRamsBraunLayout.tsx`
- `src/ui/today/TodayRamsBraunLayout.styles.ts`
- `src/ui/today/TodayShell.tsx`
- `src/ui/today/TodayShell.styles.ts`
- `src/ui/today/buildTodayRamsBraunViewModel.ts`
- `src/ui/theme/styleguideContract.ts`
- `scripts/ui-style-token-allowlist.json`

Styleguide references:

- `docs/styleguide/app/src/screens/TodayScreenPage.tsx`
- `docs/styleguide/screens.css`
- `docs/styleguide/components.css`
- `docs/styleguide/tokens.css`

No production code or styleguide source was changed for this checkpoint.

---

## Executive Verdict

**Conditionally pass.** Production Today is structurally aligned with the
styleguide grammar and token-compliant as of MYORIA-468. Observed compactness
compared to the styleguide preview is largely intentional: production runs at
compact density while the styleguide preview defaults to comfortable density.
One legitimate parity gap exists: Bodyweight metadata shows only `Logged` in
production where the styleguide shows a time-of-log detail such as
`Logged 07:12`. This is a view-model data gap, not a UI style issue. Two minor
token candidates (`uiToday.sectionGap` and workout status color) are documented
for optional follow-up. No token adjustment is urgently required from this QA
pass.

---

## Screenshot Comparison Observations

### Root date / top context

| Dimension | Styleguide | Production |
|---|---|---|
| Date text | `Tuesday, 2 June` · 14 px IBM Plex Sans | Human-readable formatted date · `uiTypography.rootDate` = 14/18 IBM Plex Sans |
| Date color | `--my-color-text-secondary` (anthracite) | `uiColors.textSecondary` (anthracite `#2e2e2c`) |
| Header bottom gap | `--my-top-identity-body-gap` 32 px (comfortable) | `uiSpacing.x5` = 24 px (compact) |
| Touch target | 44 px slot height | `uiAction.minHeight` = 44 px |

**Gap noted — compact vs comfortable density:** Production header uses
`uiSpacing.x5` (24 px) for `marginBottom`, which matches the compact identity-
body gap token (`uiScreen.topIdentityBodyGapCompact`). The styleguide preview
renders at comfortable density where this gap is 32 px. This explains why
production appears more vertically compressed at the top. This is density
behaviour, not a token gap. No adjustment is needed unless density selection
is revisited globally.

### Metric readouts (Nutrition primary, Fluid, Bodyweight)

| Dimension | Styleguide | Production | Status |
|---|---|---|---|
| Primary value | `--my-type-metric-value-size` = 24 px mono | `uiTypography.metricValue` = 24/28 mono | ✅ |
| Primary unit | `--my-type-metric-unit-size` = 11 px sans | `uiTypography.metricUnit` = 11/14 sans | ✅ |
| Supporting value | `--my-type-row-meta-size` = 13 px mono | `uiTypography.listMeta` = 13/17 mono | ✅ |
| Supporting unit | 11 px muted | `uiTypography.metricUnit` + `textMuted` | ✅ |
| Measurement gap | `gap: var(--my-space-1)` = 4 px | `uiToday.measurementUnitLeftMargin` = 4 | ✅ |

Token values are a faithful mirror of the CSS contract. Any impression of
quietness compared with the styleguide browser render is due to density and
sub-pixel rendering differences between iOS and browser, not token mismatches.

### Section labels (NUTRITION / FLUID / BODYWEIGHT / WORKOUT)

| Dimension | Styleguide | Production | Status |
|---|---|---|---|
| Font | condensed, 14 px, weight 500–600, uppercase | `uiTypography.sectionLabel` (condensed 14/18 weight 600 uppercase) | ✅ |
| Color | `--my-color-text-primary` (warm-black) | `uiColors.textPrimary` (`#1a1a18`) | ✅ |

Full parity.

### Progress scale / ticks

| Dimension | Styleguide CSS | Production token | Value | Status |
|---|---|---|---|---|
| Track height | `height: 6px` | `uiProgressScale.trackHeight` | 6 | ✅ |
| Segment base height | `--my-line-progress` = 1 px | `uiProgressScale.lineHeight` | 1 | ✅ |
| Segment emphasized height | `--my-line-progress-primary` = 2 px | `uiProgressScale.lineHeightEmphasized` | 2 | ✅ |
| Tick height (start/end) | `height: 6px` | `uiProgressScale.tickHeight` | 6 | ✅ |
| Tick height (midpoint) | `height: 4px` | `uiProgressScale.tickHeightShort` | 4 | ✅ |
| Tick width | `var(--my-line-hairline)` = 1 px | `uiSeparator.hairline` | 1 | ✅ |
| Overrun width | `var(--my-space-1)` = 4 px | `uiProgressScale.overrunWidth` | 4 | ✅ |
| Overrun color | `var(--my-color-error)` | `uiColors.error` | signal-red | ✅ |
| Over-detail size | 10 px mono | `uiTypography.progressScaleOverDetail` | 10/12 mono | ✅ |

The ticked progress scale is structurally identical to the styleguide CSS.
If production ticks appear thinner or lighter than the browser preview, this is
a rendering difference between iOS native rendering and browser sub-pixel
antialiasing — not a token gap. No value adjustment is recommended without a
device-side accessibility measurement showing a legibility failure.

### Macro secondary readout stack

| Dimension | Styleguide CSS | Production | Status |
|---|---|---|---|
| Stack gap | `gap: var(--my-space-4)` = 16 px | `uiSpacing.x4` = 16 | ✅ |
| Stack margin-top | `margin-top: var(--my-space-5)` = 24 px | `uiSpacing.x5` = 24 | ✅ |
| Row gap | `gap: var(--my-space-2)` = 8 px | `uiSpacing.x2` = 8 | ✅ |

Full parity.

### Fluid / Bodyweight split row

| Dimension | Styleguide CSS | Production | Status |
|---|---|---|---|
| Column gap | `column-gap: var(--my-space-5)` = 24 px | `uiToday.splitColumnGap` = 40 | ⚠️ wider |

**Gap noted — retained pre-468 value:** `uiToday.splitColumnGap` = 40 was
carried forward from the original local value. The styleguide pair grid uses
24 px. The wider gap was kept because React Native flex does not use CSS subgrid
alignment and the wider separator prevents the two panels from feeling cramped
on a narrow iPhone screen. The value is now named rather than raw. This is a
candidate for visual review and potential adjustment to `uiSpacing.x5` (24)
in a follow-up.

### Section inter-block gap (stack between Nutrition / pair / Workout)

| Dimension | Styleguide CSS | Production | Status |
|---|---|---|---|
| Between blocks | `--my-section-gap` = 32 px (comfortable) | `uiToday.sectionGap` = 38 | ⚠️ wider |

**Gap noted — retained pre-468 value:** `uiToday.sectionGap` = 38 was carried
forward from the original local gap of 38. The styleguide comfortable section
gap is 32 px. Production blocks breathe slightly more than the styleguide
preview. This is a candidate for adjustment to `uiSpacing.x6` (32) in a follow-
up to tighten the contract alignment.

### Workout block

| Element | Styleguide | Production | Status |
|---|---|---|---|
| Operational marker dimensions | 12 × 2 px, error color | `uiToday.operationalMarkerHeight/Width` + `uiColors.error` | ✅ |
| Status text size | `--my-type-root-date-size` = 14 px sans | `uiTypography.rootDate` = 14/18 sans | ✅ |
| Status color | `--my-color-text-secondary` (anthracite) | `uiColors.textMuted` (braun-grey) | ⚠️ |
| Detail text size | `--my-type-row-meta-size` = 13 px mono | `uiTypography.listMeta` = 13/17 mono | ✅ |

**Gap noted — workout status color:** Production workout status text uses
`uiColors.textMuted` (braun-grey `#8a8a87`). The styleguide `.my-operational-status`
maps to `--my-color-text-secondary` (anthracite `#2e2e2c`). The status reads
as slightly less prominent than the styleguide intent. MYORIA-439 previously
flagged this as a polish candidate. The value is now named. The fix is a single
color token swap.

---

## Structural Parity Result

**Pass.** Post-MYORIA-468 Today follows the styleguide grammar structurally:

- Root date → header lane with touch target height ✅
- Nutrition → full-width pressable block with section label, primary readout, chevron zone, ticked progress, secondary macro stack ✅
- Fluid / Bodyweight → paired split row with section labels, supporting-unit readouts, progress scales, and detail text ✅
- Workout → pressable block with section label, operational marker (when active), status text, and detail text ✅
- No decorative cards, shadows, borders, pills, or icon chrome ✅

---

## Token Parity Result

**Largely pass.** All raw hex colors and all raw numeric style values have been
replaced with named tokens from `styleguideContract.ts`. The remaining items in
`uiToday` that differ from the styleguide contract values are documented by name
and can be evaluated individually:

| Token | Current | Styleguide equivalent | Recommendation |
|---|---|---|---|
| `uiToday.sectionGap` | 38 | 32 (`--my-section-gap-comfortable`) | Adjust to `uiSpacing.x6` in follow-up |
| `uiToday.splitColumnGap` | 40 | 24 (`--my-space-5`) | Review on device; wider for RN flex |
| `uiToday.workoutDetailLeftMargin` | 9 | no direct CSS equivalent | Mechanical indent; acceptable |
| `uiToday.measurementUnitLeftMargin` | 4 | `var(--my-space-1)` = 4 | ✅ matches |
| `uiToday.supportingMeasurementUnitLeftMargin` | 3 | no direct CSS equivalent | Sub-pixel optical alignment; acceptable |

---

## Visual Rhythm / Compactness Assessment

Production Today appears slightly more compact at the top than the styleguide
preview. This is explained by two structural factors, not by missing or wrong
tokens:

1. **Density:** Production runs at compact density. The styleguide preview
   defaults to comfortable density. The header identity-body gap is 24 px
   compact vs 32 px comfortable. This is the primary driver of the vertical
   compression visible at the top of the screen.

2. **Canvas padding:** Production applies `paddingTop: uiSpacing.x2` (8 px)
   on the canvas view inside the scroll content. The styleguide screen padding
   is applied at root screen level and already includes this space.

Neither factor represents a token gap. The overall rhythm between Nutrition,
Fluid/Bodyweight, and Workout blocks uses `uiToday.sectionGap` = 38 px, which
is slightly more generous than the styleguide section gap and provides
appropriate breathing room between instrument blocks.

---

## Bodyweight Metadata Assessment

**This is a view-model data gap, not a UI style issue.**

Production shows `Logged` for Bodyweight metadata. The styleguide preview shows
`Logged 07:12` (time of measurement).

Root cause: `buildBodyweightViewModel` in `buildTodayRamsBraunViewModel.ts`
returns a hardcoded `'Logged'` string as the `detail` field when a body weight
entry exists. The `BodyWeight` domain object carries an `occurredAt` timestamp,
but this function does not currently format it as a local time string.

```typescript
// Current (line 164 in buildTodayRamsBraunViewModel.ts):
detail: 'Logged'

// Styleguide contract expects:
detail: 'Logged 07:12'  // local time extracted from BodyWeight.occurredAt
```

This matches the finding in MYORIA-439 (`Standalone 'Logged' meta` section).
The fix requires reading `occurredAt` from the `BodyWeight` domain object and
formatting it as `HH:mm` local time. This is a narrow, safe view-model change
with no style, token, or domain impact.

---

## Are Any Today Styles Still Allowlisted?

One file remains in the allowlist after MYORIA-468:

| File | Classification | Reason |
|---|---|---|
| `src/ui/today/TodayShell.styles.ts` | Functional but visually legacy | Backdrop `4000`/`-2000`, dropdown `top: 46`, and `minWidth: 148` are mechanical hit-area and dropdown-positioning values. Menu `borderRadius: 8` is legacy shell grammar. These must move with an app-shell contract. |

`src/ui/today/TodayRamsBraunLayout.styles.ts` is no longer allowlisted and is
fully compliant as of MYORIA-468.

---

## Recommended Follow-Up

Three follow-up candidates in priority order. None are blocking.

### 1. MYORIA-470 · Bodyweight detail time-of-log (narrow view-model fix)

Change `buildBodyweightViewModel` to format `occurredAt` as a local time string
(`HH:mm`) and surface it as `detail: 'Logged HH:mm'`. View-model only. No
style, token, or domain changes required.

### 2. MYORIA-471 · Adjust Today section gap to styleguide contract (optional)

Reduce `uiToday.sectionGap` from 38 to `uiSpacing.x6` (32) to match
`--my-section-gap-comfortable`. Verify on device that blocks do not feel
crowded. One token value change.

### 3. MYORIA-472 · Workout status text color (minor polish)

Change `workoutStatus` color from `uiColors.textMuted` to
`uiColors.textSecondary` to match `.my-operational-status`. One token change.
Previously flagged in MYORIA-439.

---

## Explicit Non-Goals

- No broad Today redesign
- No raw local style values introduced
- No route-specific pixel nudges
- No Nutrition / Fluid / Bodyweight report changes
- No Add Food / Food Library changes
- No domain or application behavior changes
- No persistence changes
- No styleguide source changes

---

## Verification

- `pnpm check:ui-styles` passed.
- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm test src/ui/today/TodayShell.test.tsx` passed: 21 tests.
- `pnpm test` passed: 138 files, 862 tests.
- `pnpm format:check` passed.
- `git diff --check` passed.
- `git diff --cached --check` passed.

No production code, styleguide source, or styleguide routes were changed.
