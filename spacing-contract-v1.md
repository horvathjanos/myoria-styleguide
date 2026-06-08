# Myoria Spacing Contract V1

Status: Janos-approved spacing/layout decisions from the granular styleguide grooming pass.

This document is the current spacing source of truth for the static styleguide. It intentionally records only approved decisions. It is not a layout exploration board.

## Core principle

Myoria spacing should feel rational, repeatable, and instrument-like.

Use spacing to create calm structure and control-group rhythm. Do not use cards, fills, shadows, badges, or local custom gaps to compensate for unclear layout grammar.

## Base spacing scale

Myoria v1 uses a 4-based spacing scale:

```css
--my-space-0: 0;
--my-space-1: 4px;
--my-space-2: 8px;
--my-space-3: 12px;
--my-space-4: 16px;
--my-space-5: 24px;
--my-space-6: 32px;
--my-space-7: 48px;
--my-space-8: 64px;
```

Reason: the scale is strict enough to prevent random spacing, but still includes 12px for fine control-group rhythm.

Do not add fractional tokens such as 10px, 14px, 18px, 27px, or special-case named spacing tokens for local patches.

## Density system

Myoria v1 allows exactly two official spacing densities:

### compact

Use for:

- smaller mobile screens
- dense measurement/list layouts
- situations where usable content area matters most

### comfortable

Use for:

- larger phones
- static previews
- layouts where space allows calmer Braun/Rams instrument spacing

Static styleguide previews use comfortable density as the canonical visual source of truth.

Compact density is an approved system mode, not a separate visual design.

## Density mode contract

Density is controlled by a central root-level mode.

Approved selector form:

```css
[data-density="comfortable"]
[data-density="compact"]
```

Fallback:

```css
:root
```

maps to comfortable density.

Reason: density is a system configuration state, similar to theme. It controls spacing/layout rhythm. It is not a local utility class and not a component-by-component override.

Rules:

- Density applies at the full screen / root wrapper level.
- One screen renders in one density mode by default.
- Do not mix compact and comfortable inside one screen by default.
- Do not use screen-local density overrides by default.
- Partial density overrides require a separate approved pattern later.
- Theme and density are independent axes: theme controls color mode, density controls spacing/layout rhythm.
- Density changes use no transition or animation.

## Density tokens

Compact/comfortable source tokens remain documented, but explicitly as source tokens.

Status:

- source tokens, not component-facing tokens

Source token naming uses suffix form:

```css
--my-row-padding-y-compact
--my-row-padding-y-comfortable
--my-screen-padding-x-compact
--my-screen-padding-x-comfortable
```

Reason: suffix form keeps the relationship clear: resolved token + density suffix.

Component-facing tokens use the resolved base name:

```css
--my-row-padding-y
--my-row-min-height
--my-screen-padding-x
```

Rules:

- Components always consume resolved density tokens.
- Components must not directly use compact/comfortable source tokens.
- Density mapping lives in `docs/styleguide/tokens.css`.
- Do not create a separate `density.css` file in v1.
- Do not use density-prefixed token names such as `--my-density-compact-row-padding-y`.

## Density mapping

Approved density mapping structure:

```css
:root,
[data-density="comfortable"] {
  --my-screen-padding-x: var(--my-screen-padding-x-comfortable);
  --my-screen-padding-top: var(--my-screen-padding-top-comfortable);
  --my-screen-padding-bottom: var(--my-screen-padding-bottom-comfortable);
  --my-header-content-gap: var(--my-header-content-gap-comfortable);
  --my-section-gap: var(--my-section-gap-comfortable);
  --my-row-padding-y: var(--my-row-padding-y-comfortable);
  --my-row-min-height: var(--my-row-min-height-comfortable);
  --my-search-create-gap: var(--my-search-create-gap-comfortable);
  --my-list-state-padding-top: var(--my-list-state-padding-top-comfortable);
}

[data-density="compact"] {
  --my-screen-padding-x: var(--my-screen-padding-x-compact);
  --my-screen-padding-top: var(--my-screen-padding-top-compact);
  --my-screen-padding-bottom: var(--my-screen-padding-bottom-compact);
  --my-header-content-gap: var(--my-header-content-gap-compact);
  --my-section-gap: var(--my-section-gap-compact);
  --my-row-padding-y: var(--my-row-padding-y-compact);
  --my-row-min-height: var(--my-row-min-height-compact);
  --my-search-create-gap: var(--my-search-create-gap-compact);
  --my-list-state-padding-top: var(--my-list-state-padding-top-compact);
}
```

Density mode maps only explicitly approved density-pair tokens.

Approved density-mapped tokens:

- screen padding x / top / bottom
- header-content gap
- section gap
- row padding y
- row min-height
- search-create gap
- list-state padding top

Rules:

- `--my-space-0..8` remain fixed.
- Only approved compact/comfortable token pairs are mapped by density mode.
- Do not make every spacing token density-aware.
- New density-pair tokens require explicit approval.
- Missing `data-density` must not accidentally make the UI compact.

## Density preview documentation

Static styleguide previews use comfortable density as the default canonical view.

Compact density should be documented in a targeted density validation section, not duplicated everywhere.

Approved compact validation examples:

- object-list pattern
- measurement/root screen pattern

Rules:

- Normal styleguide screen previews: comfortable.
- Density validation section may show compact comparison.
- Do not duplicate every styleguide screen in both densities by default.

## Screen padding

Approved responsive screen padding tokens:

```css
--my-screen-padding-x-compact: 24px;
--my-screen-padding-x-comfortable: 32px;
--my-screen-padding-top-compact: 64px;
--my-screen-padding-top-comfortable: 80px;
--my-screen-padding-bottom-compact: 32px;
--my-screen-padding-bottom-comfortable: 48px;
```

Rules:

- Do not use random screen padding values.
- Do not patch individual screens with local left/right/top/bottom padding.
- If a screen feels wrong, adjust the screen spacing contract rather than local magic numbers.

## Header-to-content spacing

Approved responsive header-to-content gap:

```css
--my-header-content-gap-compact: 32px;
--my-header-content-gap-comfortable: 48px;
```

Reason: 32px keeps content reachable on dense mobile screens; 48px preserves calmer Braun/Rams spacing where space allows.

Do not use random header/content gaps. Do not patch individual screens with local header margins unless a specific screen-level design-system exception exists.

## Section-to-section spacing

Approved responsive section gap:

```css
--my-section-gap-compact: 24px;
--my-section-gap-comfortable: 32px;
```

Use between major content blocks such as Nutrition, macro groups, Fluid/Bodyweight, Workout, Search, Create action row, and list groups.

Do not use per-screen arbitrary section gaps.

## Object-list control/action spacing

Approved object-list control group rhythm:

```css
--my-search-block-inner-gap: 8px;
```

Use for:

```text
SEARCH
8px
input
8px
ACTIVE | ARCHIVED
```

Approved search-to-create-action gap:

```css
--my-search-create-gap-compact: 24px;
--my-search-create-gap-comfortable: 32px;
```

Approved create action row vertical padding:

```css
--my-create-action-padding-y: 16px;
```

Reason: search/filter and create action are related but separate control groups. The create action itself already has a 44px touch target, so 16px top/bottom gives enough room without making the control zone inflated.

## List row spacing

Approved row internal vertical padding:

```css
--my-row-padding-y-compact: 8px;
--my-row-padding-y-comfortable: 12px;
```

Approved row title-to-meta gap:

```css
--my-row-title-meta-gap: 4px;
```

Approved row minimum height:

```css
--my-row-min-height-compact: 56px;
--my-row-min-height-comfortable: 64px;
```

Reason: compact rows preserve list density; comfortable rows give title + metadata calmer breathing room.

The title-to-meta gap is fixed because title and metadata belong to one row object. Do not make it density-responsive.

Rules:

- Do not use one-off row padding values.
- Do not use one-off row min heights.
- Do not create per-list custom row heights unless a specific design-system exception exists.
- Title-only rows keep the standard row minimum height and vertically center the title.
- Do not reserve fake metadata space for title-only rows.

## Row chevron spacing

Approved row content-to-chevron gap:

```css
--my-row-content-chevron-gap: 12px;
```

Approved fixed trailing chevron zone:

```css
--my-row-chevron-zone-width: 24px;
```

Rules:

- The content block flexes/truncates before the chevron zone.
- The chevron zone stays inside the normal screen/content padding grid.
- Do not use negative margin for row chevrons.
- The chevron is right-aligned inside the 24px trailing zone.
- The chevron tip defines the shared right-edge axis for rows and readouts.
- Do not make the content-to-chevron gap density-responsive in v1.

Reason: 12px prevents text and chevron from colliding while preserving title width. A 24px fixed trailing zone makes reusable rows predictable without giving the quiet chevron too much space.

## Object-list state spacing

Approved list-state top padding after the list top boundary:

```css
--my-list-state-padding-top-compact: 24px;
--my-list-state-padding-top-comfortable: 32px;
```

Approved list-state action gap:

```css
--my-list-state-action-gap: 8px;
```

Rules:

- Empty/loading/error state belongs inside the list region.
- State text is left-aligned to the list grid.
- Do not add dedicated list-state bottom padding in v1.
- Screen bottom padding / scroll content padding handles the end of the screen.

Reason: list-level states are not rows, so they need more breathing room than normal row padding. They also should not become large centered friendly app-empty states.

## Touch target

Approved absolute minimum touch target:

```css
--my-touch-target: 44px;
```

Reason: 44px is compact, platform-compatible, and works well for quiet Rams/Braun controls.

Comfortable density should come from spacing and layout rhythm, not from inflating every touch target.

Do not reduce tappable controls below 44px. Do not create density-based touch target sizes in v1.

Specific approved uses:

- scope selector options use a 44px tappable area while visible text remains 14px / 18px
- create text action uses 44px min-height and 112px min-width
- row interaction uses the row minimum height and does not shrink title-only rows below the row contract

## Back control spacing

Back controls must not use negative margin by default.

Approved back control rule:

```css
.my-back-control {
  width: var(--my-touch-target);
  height: var(--my-touch-target);
  margin-left: 0;
}
```

The visual chevron stays inside the normal screen padding grid.

Approved header title axis:

```css
.my-screen-header {
  grid-template-columns:
    var(--my-row-chevron-zone-width)
    minmax(0, 1fr);
  column-gap: var(--my-space-2);
}

.my-back-control {
  justify-content: flex-start;
}
```

Reason: the back control keeps the 44px touch target, but the visible chevron starts on the content-left axis and the title starts after the reusable 24px chevron zone plus one 8px spacing step. This keeps the visible chevron and title in one precise header group without negative margins or screen-local offsets.

Do not use magic-number negative offsets for back controls. If header alignment feels wrong, adjust the header/grid contract instead.

## Must-not-do rules

- Do not add one-off spacing values for local visual fixes.
- Do not use negative margins as default design-system behavior.
- Do not patch individual screens with local padding/margin unless a specific design-system exception exists.
- Do not create per-screen arbitrary responsive behavior.
- Do not remove 12px from the scale; it is needed for fine control-group rhythm.
- Do not make touch targets smaller than 44px.
- Do not use cards or raised panels to solve spacing hierarchy problems.
- Do not let individual components directly use compact/comfortable source tokens.
- Do not animate density changes.
