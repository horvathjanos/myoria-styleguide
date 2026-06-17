# MYORIA-440 Report Screen Family Grammar Audit

Issue: #433 / MYORIA-440

Date: 2026-06-17

## Scope

This is an audit-only comparison of the production report screens as one screen
family:

- Nutrition report
- Fluid report
- Bodyweight report

No production code, styleguide source, entry detail, Today, Food Library,
domain, or application behavior was changed.

Production references:

- `src/ui/nutrition/NutritionReportScreen/`
- `src/ui/fluid/FluidReportScreen/`
- `src/ui/bodyweight/BodyweightReportScreen/`
- `src/ui/primitives/SecondaryHeader.tsx`

Design-system references:

- `docs/styleguide/screen-composition-contract-v1.md`
- `docs/styleguide/design-system-v1.md`
- `docs/styleguide/MYORIA-430-production-screen-grammar-parity-audit.md`

## Verdict

Partial pass.

The three report screens feel like one family at the shell level: they share the
same quiet secondary header, current report identity block, Day / Week / Month /
Year / All selector, placeholder range modes, initial loading/error handling,
and entry-detail routing concept.

They do not yet feel like one fully migrated design-system family at the body
level. Day-mode summaries, list rows, add-action placement, chevrons, local
colors, and card-like row surfaces still show legacy drift.

Fluid report is the closest current production screen to the intended report
grammar. It has the clearest day-row scanning rhythm and the only visible
entry-detail affordance in the list. That affordance is still implemented as a
text glyph chevron, so Fluid is closest by shape, not finished.

## Shared Family Passes

- `SecondaryHeader` grammar passes across all three reports. The visible back
  label is `Today`, so the header names the destination, not the current screen.
- `ScreenLead` grammar mostly passes. Each report places current identity below
  the header as `Nutrition report`, `Fluid report`, or `Bodyweight report`.
- Mode selector grammar mostly passes. All three expose Day / Week / Month /
  Year / All with the same selected underline pattern.
- Range modes are family-consistent placeholders. They are intentionally not
  implemented yet.
- Initial loading and hard error states are consistent across containers.
- Entry-detail navigation exists for all three domains when an entry id is
  selected.
- No domain/application behavior changes are needed before visual migration.

## Intentional Domain Differences

- Nutrition has richer day summaries because calories and macros are distinct
  nutrition facts.
- Nutrition entry rows need more nutrition-specific content than Fluid or
  Bodyweight rows: food name, amount, kcal, macro detail, and logged time.
- Fluid day summary can stay compact because amount plus entry count is enough
  for the current v1 report.
- Bodyweight day summary can stay compact because latest measurement plus entry
  count is enough for the current v1 report.
- Fluid and Bodyweight add workflows are simpler than Nutrition's saved-food
  selection workflow. Different workflow internals are appropriate.
- Bodyweight has no edit flow in the current report surface, while Nutrition
  and Fluid do. That is a product/domain capability difference, not visual drift
  by itself.

## Legacy Drift

### Family-Wide

- The report body still relies on screen-local styles, raw hex colors, and
  domain-tinted greens/teals instead of shared design-system tokens.
- Summary metrics are card-like filled blocks with 8px radius. That is older
  dashboard/KPI grammar, not the quieter report/list grammar.
- List rows are card-like white bordered surfaces instead of a shared list
  primitive with list-owned boundaries and separators.
- Pressed rows use background-color shifts in Fluid and Bodyweight/Nutrition
  rather than the shared pressed opacity grammar.
- Loading and top-level error states render as bare text outside the report
  screen structure. This is consistent, but not ideal list/body state
  placement.
- Mode selector is tab-like with an underline. It is consistent across reports,
  but the broader styleguide scope-selector contract prefers quiet text options
  without underline/pill treatment. Because report range modes are not the same
  as Food Library active/archive scope, this needs an explicit report-mode
  contract before changing it.

### Nutrition Report

- Header action placement differs from the family: `Add food` lives in the
  `SecondaryHeader`, while Fluid and Bodyweight place add actions beside the
  Entries header.
- `Add food` is a filled button. The styleguide action grammar generally
  prefers quiet text action rows for object/report actions unless a form commit
  action is being shown.
- Entry rows are the most card-like and visually dense of the family.
- Navigable entry rows do not show a trailing chevron, so the entry-detail
  affordance is less visible than Fluid.
- Empty copy is factual but longer than the Fluid empty state.

### Fluid Report

- Fluid is closest to the desired row shape, but the row chevron is a text
  glyph `›` rather than `MyoriaChevron` in a fixed chevron zone.
- The row and summary colors are fluid-specific teal-tinted local colors.
- The `Add fluid` action is a filled local button inside the Entries header
  instead of a shared action row.
- Row surfaces remain card-like bordered blocks.

### Bodyweight Report

- Bodyweight is close to Fluid structurally, but navigable rows have no visible
  chevron or other entry-detail affordance.
- Bodyweight rows always render as `Pressable`, even if no entry-detail handler
  is provided. That makes non-interactive rows look semantically interactive.
- Pressed state is an inline background-color object instead of a named shared
  style.
- The `Add weight` action is a filled local button inside the Entries header
  instead of a shared action row.
- Row surfaces and summary metrics remain card-like bordered/fill blocks.

## Per-Screen Parity

### Nutrition

Parity status: partial.

Strong family alignment: secondary header, screen identity, mode selector,
placeholder modes, detail-route state, loading/error structure.

Main gaps: action placement, filled add button, card-like rows, missing
row-level chevron affordance, and dense custom nutrition row structure. Some
row complexity is domain-appropriate; the card surface and navigation
affordance are legacy drift.

### Fluid

Parity status: closest partial.

Strong family alignment: secondary header, screen identity, mode selector,
compact summary, day entries, add workflow, detail-route state, loading/error
structure.

Main gaps: text glyph chevron, local domain colors, filled add button, card-like
rows, and non-shared summary metric styling.

### Bodyweight

Parity status: partial.

Strong family alignment: secondary header, screen identity, mode selector,
compact summary, day entries, add workflow, detail-route state, loading/error
structure.

Main gaps: missing visible entry-detail affordance, always-pressable row
semantics, inline pressed background color, local domain colors, filled add
button, card-like rows, and non-shared summary metric styling.

## Deferred Gaps

- Do not redesign all reports in one slice.
- Do not change Today, entry detail, Food Library, or domain/application read
  models as part of this audit.
- Do not implement Week / Month / Year / All range reports yet.
- Do not change mode selector behavior until a report-mode selector contract is
  explicitly agreed.
- Do not replace all local report styles with tokens in a broad refactor.
- Do not alter Nutrition row information architecture until a specific
  nutrition report row contract exists.
- Do not add route-specific pixel nudges, decorative cards, shadows, or icons.

## Smallest Safe Implementation Slice

Recommended next slice:

```text
MYORIA-441 align report entry-row navigation affordance
```

Scope that slice narrowly:

- Use `MyoriaChevron` and a fixed trailing chevron zone for navigable Fluid and
  Bodyweight report rows.
- Add the same visible entry-detail affordance to Nutrition report rows without
  changing Nutrition row content.
- Keep row copy, summaries, actions, range modes, entry details, and data
  behavior unchanged.
- Make non-interactive rows non-pressable where the current screen already has
  optional entry-detail handlers.

Why this slice first:

- It addresses a user-facing family inconsistency.
- It improves affordance without redesigning the report screens.
- It can be tested with focused render tests.
- It does not require new domain/application data.

Second slice, if desired after that:

```text
MYORIA-442 audit and align report add-action placement
```

That should decide whether report add actions belong in the header, Entries
header, or a shared action row before moving any buttons.

## Verification

- `pnpm typecheck` passed.
- `pnpm test` passed: 138 files, 848 tests.
- `pnpm format:check` passed.
- `git diff --check` passed.
