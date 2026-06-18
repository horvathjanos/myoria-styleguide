# MYORIA-465 UI Styleguide / Token Discipline Audit

## Executive Verdict

Recent production UI work moved the most visible Core Tracking V1 surfaces closer
to the styleguide grammar, but production is not yet strict enough to call
styleguide/token discipline enforced.

The strongest areas are the Report day rows, Add Food picker rows, and Food &
Drink Library list rows: they now use quiet unframed list grammar, fixed trailing
affordance/value zones, and contract-level structural tests. The weakest areas
are the React Native token layer and older detail/form surfaces. Production still
contains many raw local numbers and colors, and `src/ui/theme/myoriaTheme.ts`
does not match the approved styleguide v1 color, typography, spacing, radius, and
action vocabulary.

No production style values were changed in this issue. The safe-looking fixes are
not actually safe without a first-class React Native styleguide token source:
replacing old local values one-by-one would either fake compliance with different
arbitrary values or silently redesign shared surfaces.

## Scope Inspected

- `src/ui/today/**`
- `src/ui/nutrition/NutritionReportScreen/**`
- `src/ui/nutrition/FoodDrinkLibrary/**`
- `src/ui/fluid/**`
- `src/ui/bodyweight/**`
- `src/ui/primitives/**`
- `src/ui/theme/**`
- Report, Add Food, Today, Food Library, and detail styleguide previews under
  `docs/styleguide/app/src/screens/**`
- Styleguide token and contract files under `docs/styleguide/**`
- Contract-level tests for Today, Report screens, Add Food, and Food Library list

Static source/test review only. This audit does not claim a fresh simulator
visual QA pass.

## Styleguide Contracts Used As References

- `docs/styleguide/design-system-v1.md`
- `docs/styleguide/color-contract-v1.md`
- `docs/styleguide/typography-contract-v1.md`
- `docs/styleguide/spacing-contract-v1.md`
- `docs/styleguide/report-day-contract-v1.md`
- `docs/styleguide/food-add-flow-contract-v1.md`
- `docs/styleguide/MYORIA-449-food-add-library-flow-audit.md`
- `docs/styleguide/MYORIA-456-food-library-detail-form-audit.md`
- `docs/styleguide/MYORIA-463-core-tracking-v1-gap-audit.md`

## Token / Primitive Sources Used As References

- `docs/styleguide/tokens.css`
- `docs/styleguide/components.css`
- `docs/styleguide/screens.css`
- `src/ui/theme/myoriaTheme.ts`
- `src/ui/theme/fontFamilies.ts`
- `src/ui/primitives/SecondaryHeader.tsx`
- `src/ui/primitives/SecondaryHeader.styles.ts`
- `src/ui/primitives/MyoriaChevron.tsx`
- `src/ui/primitives/MyoriaChevron.styles.ts`
- `src/ui/primitives/MyoriaMetric.tsx`
- `src/ui/primitives/MyoriaText.tsx`

Important finding: the styleguide token source is CSS-only. Production React
Native has an older `myoriaTheme` token object, but it is not an approved mirror
of `docs/styleguide/tokens.css`.

## Suspicious Raw Values Table

| Area / files | Raw values inspected | Classification | Notes |
| --- | --- | --- | --- |
| `src/ui/theme/myoriaTheme.ts` | `#F4F3EF`, `#F1F1ED`, `#FFFFFF`, `#1E1E1C`, `#5F5F59`, `#8A8A82`, `#DADAD3`, `#E5E5DF`, `#B56A00`, `#2F6F4E`, `#D71920`; spacing `2`, `20`; radius `12`, `16`, `20`, `28`, `999`; typography `32/38`, `20/26`, `17/24`, `16/23`, `34/40`, `48/56` | Needs immediate follow-up, not immediate fix here | This is the main enforcement gap. It includes old palette aliases, generic surface/action/accent/feedback roles, card/hero radius names, and old title/card typography roles that are not in the styleguide v1 contract. A full remap would affect the app globally. |
| `src/ui/primitives/SecondaryHeader.styles.ts` | `gap: 8`, `minHeight: 44`, `fontSize: 14`, `lineHeight: 18`, `opacity: 0.72` | Mostly token/contract-backed; one exception | `8`, `44`, and `14/18` map to spacing/touch/header contracts. `opacity: 0.72` is near the approved pressed opacity `0.7` but should use a named production token once available. |
| `src/ui/primitives/MyoriaChevron.styles.ts` | `width: 6`, `height: 8`, stroke `1`, `5`, top offsets `2`, `5`, `opacity: 0.78` | Contract-backed / mechanical | These map to styleguide chevron dimensions and opacity. The top offsets are React Native mechanical construction values for the drawn chevron. |
| `src/ui/today/TodayRamsBraunLayout.styles.ts` | `fontSize: 9`, `10`, `11`, `14`, `22`; `lineHeight: 12`, `13`, `14`, `15`, `18`, `28`; `gap: 7`, `10`, `38`, `40`; `paddingHorizontal: 12`; `minHeight: 628`; marker/tick dimensions `1`, `2`, `4`, `6`, `12` | Mostly contract-inspired but not token-enforced | Today is a custom instrument layout. Many values are miniature versions of styleguide readout/progress grammar, but `38`, `40`, `628`, and tiny typography roles are not traceable to documented RN tokens. Needs a Today RN contract/token pass, not ad hoc edits. |
| `src/ui/today/TodayShell.styles.ts` | backdrop `4000`, offsets `-2000`, menu `44`, `46`, `148`, radius `8`, dot `8/4`, progress `4` | Mixed: mechanical and legacy retained | Backdrop dimensions are React Native mechanical hit area behavior. Menu card/radius and active dot are legacy root-shell grammar and inherit old `myoriaTheme` tokens. |
| Report day styles in `src/ui/nutrition/NutritionReportScreen`, `src/ui/fluid/FluidReportScreen`, `src/ui/bodyweight/BodyweightReportScreen` | Report rows `minHeight: 64/76`, `paddingVertical: 12`, chevron `width: 24`, row gaps `4/12/16`, section/action `minHeight: 44`, summary `paddingTop: 16`, typography `13/17`, `13/18`, `14/18`, `16/20`, `18/22` | Mostly contract-backed; token enforcement missing | Day-mode rows and headers follow the report contract structurally. `64`, `12`, `24`, `44`, and most type sizes map to spacing/row/header contracts. Nutrition's `76` row height is content-driven for macro rows but should be documented as a report-row variant or token. |
| Report placeholder styles | `borderTopWidth: 1`, `gap: 8`, `paddingTop: 16`, `fontSize: 17`, `lineHeight: 23` | Mostly acceptable with exception | Placeholder surfaces correctly avoid cards. `17/23` is not an approved styleguide typography role and should be replaced by a token once RN type roles exist. |
| Add Food picker styles in `NutritionReportScreen.styles.ts` | `paddingTop: 44/20`, `paddingHorizontal: 20`, `paddingBottom: 20`, `gap: 18`, `10`, `6`; title `18/22`; search `minHeight: 44`, `padding: 0`; option rows `minHeight: 76`, `paddingVertical: 12`, kcal `minWidth: 72` | Mostly contract-backed structurally, but many local nudges | Add Food follows the contract anatomy: underline search, unframed rows, fixed trailing kcal, vertical metadata. `44` iOS top padding is React Native mechanical. `18`, `20`, and `72` need named tokens or documented exceptions. |
| Add Food selected-food confirmation in `NutritionReportScreen.styles.ts` | bordered fields/buttons radius `8`, `minHeight: 38/46`, `paddingHorizontal: 14`, confirmation panel `padding: 16`, title `22/28`, totals/card remnants | Legacy retained intentionally | The Food Add contract primarily covers picker grammar. Selected-food form/confirmation still carries older form/button grammar and should not be redesigned without a form/action contract. |
| Food & Drink Library list styles | `screen padding 32/80`, `listScreen 20/64`, `screenLead marginTop/marginBottom: 18`, `searchInput minHeight: 44`, rows `minHeight: 72`, `paddingVertical: 12`, chevron `width: 24`, `marginRight: -4`, trailing group `minWidth: 132`, row title `16/22`, meta `14/18` | Mostly compliant with documented exceptions | The list grammar is unframed and tested. `32/80`, `44`, `24`, and row padding map to screen/touch/row contracts. `listScreen 20/64`, `18`, negative chevron margin, `72`, and `132` are local values that need token/contract mapping. |
| Food Library detail styles | `summarySection`, `metricCell`, `confirmationBox` radius `8`, border `1`, padding `12/14`, gaps `10/12/16`, metric `20/24`, snapshot title `28/34` | Legacy retained intentionally | MYORIA-456 already classifies detail as visual debt pending a Food Library detail contract. Do not clean this piecemeal. |
| Food item create/edit form styles | rounded `formInput`, `basisButton`, `toggleRow`, `validationBox`, primary/secondary/warning buttons; `minHeight: 40/44`, `paddingHorizontal: 12/14`, `paddingVertical: 10`, `fontSize: 12/13/14/16` | Legacy retained intentionally | Form controls are behavior-sensitive. They need a long-form contract before replacement with line inputs or text actions. |
| Fluid and Bodyweight report add/edit workflows | domain-colored buttons, rounded inputs, `gap: 14`, `minHeight: 44`, `paddingHorizontal: 12/14`, titles `24/30`, inputs `17/23` | Functional but visually legacy | Day report surfaces are closer to contract; add/edit workflows still use older domain-colored form grammar. |
| `DrinkLoggingScreen.styles.ts`, `BodyweightLoggingScreen.styles.ts`, `BodyWeightLogPanel.styles.ts`, `FluidLogPanel.styles.ts`, `BodyWeightSelectedDayScreen.styles.ts` | many rounded cards/inputs, domain greens/teals, `10`, `14`, `22`, `28/34`, `32/38`, `48/58`, padding `14/20/22` | Functional but visually legacy | These are older tracking/logging panels in the inspected `fluid` and `bodyweight` scope, not part of the recent report-day parity work. They should be audited under separate logging-panel contracts. |
| Placeholder colors in TSX | `placeholderTextColor="#8C9991"`, `"#8A8A82"` | Needs follow-up | These bypass style objects and should use an RN color token once an approved token source exists. |
| Tests asserting numeric style values | `fontSize: 18`, `paddingTop: 44`, `minHeight: 44`, `width: 24`, `borderTopWidth: 1`, `borderBottomWidth: 1` | Mixed | Some tests protect contract structure; some encode literal values because no token object exists to assert against. Future tests should assert token references or shared primitives where possible. |

## Values Fixed In This Issue

None.

Reason: there is no approved React Native token file that mirrors
`docs/styleguide/tokens.css`. The obvious replacements would either use the old
`myoriaTheme` object, which is itself off-contract, or introduce new RN tokens
inside this audit. Both would blur the source of truth instead of enforcing it.

## Values Intentionally Left Alone And Why

- `44` touch targets: left alone because they are contract-backed and commonly
  used in `SecondaryHeader`, report actions, search inputs, and form controls.
- `24` chevron zones: left alone because the row chevron contract defines a
  fixed trailing zone.
- `1` pixel separators and input lines: left alone because the styleguide uses
  hairlines for dividers and line inputs.
- `8`, `12`, `16`, `24`, `32`, `48`, `64`: left alone when they clearly map to
  the spacing scale or density source tokens.
- `18/22`, `14/18`, `13/17`, `16/20`: left alone when used as screen lead,
  action/label, row-meta, or row-title equivalents.
- Add Food `Platform.OS === 'ios' ? 44 : 20`: left alone as React Native
  mechanical safe-area/header compensation until a shared screen shell owns it.
- Today miniature typography and progress dimensions: left alone because Today
  is a dense instrument layout and needs a focused RN tokenization pass.
- Food Library detail/form rounded cards/buttons/inputs: left alone because
  MYORIA-456 already marks them as contract gaps, not safe one-off fixes.
- Domain-colored report workflow buttons: left alone because replacing them
  would change action grammar beyond the report-day contract.

## Legacy Grammar Still Present

- Production `myoriaTheme` still exposes old generic `surface`, `action`,
  `accent`, `feedback.warning`, `feedback.success`, and large title/card metric
  roles that the styleguide v1 forbids or does not approve.
- Food Library detail still uses rounded summary cards, nested metric cards,
  large filled/bordered actions, and card-like confirmations.
- Food item create/edit still uses rounded bordered inputs, large toggle rows,
  pill-like basis controls, warning panels, and filled warning/destructive
  buttons.
- Fluid and Bodyweight add/edit workflows still use domain-colored filled
  buttons and rounded form controls.
- Today shell menu and active workout marker still use older token grammar.
- Several production files use hardcoded placeholder colors directly in TSX.

## Contract / Test Enforcement Gaps

Current tests are helpful but incomplete.

Existing strengths:

- Today tests assert root header structure, fixed chevron zone, and over-target
  text behavior.
- Nutrition, Fluid, and Bodyweight report tests assert placeholder surfaces are
  not cards, day rows have chevron affordances only when interactive, and report
  actions stay quiet.
- Add Food tests assert underline search, unframed overflow-safe rows, fixed
  trailing kcal, and one separator source.
- Food Library list tests assert secondary header rhythm, underline search,
  quiet create action, unframed overflow-safe rows, fixed chevron behavior, and
  active/archived scope behavior.

Gaps:

- Tests do not enforce a shared RN token source because one does not exist.
- Many tests assert literal numbers instead of named token references.
- No lint/test guard detects new raw `fontSize`, `lineHeight`, `padding`,
  `margin`, `gap`, `borderRadius`, color hexes, or placeholder colors in scoped
  UI files.
- No contract test prevents a new rounded card from being added to report day or
  object-list rows outside the currently tested styles.
- Food Library detail and create/edit have behavioral tests, but no approved
  style contract to enforce.
- Fluid/Bodyweight add/edit workflows have behavior coverage, but no current
  styleguide grammar tests.

## Recommended Strict Rules For Future UI Prompts

No production UI style change may introduce raw local visual values unless the
PR/issue report maps each value to a styleguide contract, token, existing
primitive, or documented exception. UI prompts must require a token/contract
mapping summary.

Additional rules:

- Every UI issue that changes styles must name the exact styleguide contract or
  explicitly say the relevant contract is missing.
- Raw hex colors are forbidden in production screen/component files once an
  approved RN styleguide token source exists.
- New `fontSize` and `lineHeight` values must use approved typography roles.
- New spacing must use the 4-based scale or an approved density token.
- New `borderRadius` values are suspicious by default because v1 grammar avoids
  card chrome for report/list surfaces.
- New filled buttons, rounded inputs, pills, badges, cards, or warning panels
  require an explicit component/form/action contract.
- Placeholder colors must come from a token, not TSX literals.
- Tests should prefer structural/contract assertions and token references over
  pixel-perfect value snapshots.
- A styleguide parity slice should not update production unless the relevant
  contract exists and the issue states which production primitive or token maps
  to it.

## Recommended Follow-Up Issues

Do not create these automatically from this audit.

- `MYORIA-466 replace recent magic values with tokens`
- `MYORIA-467 add lint/test guard for raw UI style values`
- `MYORIA-468 define shared React Native style primitives for report/list/action grammar`
- `MYORIA-469 define Food Library detail styleguide grammar`
- `MYORIA-470 define Food item create/edit form styleguide grammar`
- `MYORIA-471 add UI contract checklist to Codex issue template/prompts`

Recommended ordering: define the RN token/primitive enforcement path before
mass-replacing values, otherwise the replacements will be local churn rather
than discipline.

## Final Pass / Fail Classification By Screen Family

| Screen family | Classification | Rationale |
| --- | --- | --- |
| Today | Mostly compliant with documented exceptions | The visible Today root follows the instrument/readout idea, but its RN styles contain many custom miniature values and local layout numbers without a dedicated RN contract/token mapping. |
| Report day screens | Mostly compliant with documented exceptions | Nutrition, Fluid, and Bodyweight day reports follow the report-day contract structurally: quiet summary, list-owned separators, unframed rows, fixed chevrons, and quiet add actions. Token enforcement is still weak. |
| Add Food | Mostly compliant with documented exceptions | Picker/search/row grammar matches the contract, especially overflow handling. Selected-food confirmation still uses older form/action grammar and needs a separate contract if changed. |
| Food & Drink Library list | Mostly compliant with documented exceptions | List/search/scope/create/row grammar is close to the styleguide and tested. Some values such as `18`, `20/64`, negative chevron margin, `72`, and trailing widths need token/contract mapping. |
| Food Library detail | Functional but visually legacy | MYORIA-456 already documents rounded cards, nested metric cards, and large actions as debt pending a detail contract. |
| Food item create/edit form | Functional but visually legacy | Behavior is covered, but visual grammar is old form/card/button grammar pending a long-form contract. |
| Entry detail screens | Mostly compliant with documented exceptions | Nutrition, Fluid, and Bodyweight logged-entry detail surfaces use quieter snapshot grammar than older forms, but style values are still local and duplicated across report files. |
| Fluid/Bodyweight report detail surfaces | Mostly compliant with documented exceptions | Detail and day-row surfaces are closer to snapshot/report contracts than the add/edit workflows. Workflow controls remain legacy. |
| Fluid/Bodyweight standalone logging panels | Functional but visually legacy | Older logging panels in the inspected scope still contain cards, rounded inputs, domain colors, and local spacing/type values. |

## Final Classification

Pass for design direction, fail for token enforcement.

MYORIA-465 should tighten the process: future UI work needs an explicit
token/contract mapping summary, and production needs a real RN token/primitive
layer before further visual parity work can honestly claim strict styleguide
compliance.
