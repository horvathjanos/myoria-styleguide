# Myoria Color Contract V1

Status: Janos-approved color decisions from the granular styleguide grooming pass.

This document is the current color source of truth for the static styleguide. It intentionally records only approved decisions. It is not a general color inspiration board.

## Core principle

Myoria color is functional, not decorative.

Light mode uses a closed Hue Atlas Dieter Rams / Braun palette. Dark mode may use the same approved palette plus exactly two explicitly approved dark-extension colors.

Do not introduce component-level hex values, opacity-mixed pseudo-colors, automatic inversion, decorative colors, domain colors, or ad hoc dark variants.

## Approved light palette

```css
--my-palette-braun-white: #f0ede5;
--my-palette-braun-grey: #8a8a87;
--my-palette-anthracite: #2e2e2c;
--my-palette-pebble: #c5c3be;
--my-palette-warm-black: #1a1a18;
--my-palette-function-yellow: #d4b018;
--my-palette-signal-red: #c02820;
```

The alternate uploaded Rams/DR06-like color scale is not part of the Myoria styleguide. It is not a token source and should not be documented as a reference.

## Light semantic mapping

```css
--my-color-background: var(--my-palette-braun-white);
--my-color-text-primary: var(--my-palette-warm-black);
--my-color-text-secondary: var(--my-palette-anthracite);
--my-color-text-muted: var(--my-palette-braun-grey);
--my-color-text-inverted: var(--my-palette-braun-white);
--my-color-divider: var(--my-palette-pebble);
--my-color-error: var(--my-palette-signal-red);
--my-color-destructive: var(--my-palette-signal-red);
--my-color-critical: var(--my-palette-signal-red);
--my-color-active: var(--my-palette-function-yellow);
--my-color-operational: var(--my-palette-function-yellow);
--my-color-control-disabled: var(--my-palette-braun-grey);
```

## Background

Myoria v1 app background is Braun White `#f0ede5`.

Use it as the default app/screen ground color.

Do not use approximate off-whites such as `#f4f3ef` in the v1 contract.

## Text hierarchy

Keep exactly three text levels:

- Primary text: Warm Black `#1a1a18`
- Secondary text: Anthracite `#2e2e2c`
- Muted text: Braun Grey `#8a8a87`

Primary text is for main typography, screen titles, section labels, measurement values, row titles, and primary control labels.

Secondary text is for readable supporting information and calm list-level states such as empty/loading messages.

Muted text is for metadata, inactive labels, placeholders, quiet chevrons, and low-priority detail.

Do not introduce additional grey text tokens or opacity-generated text colors.

## Disabled controls

Myoria v1 does not use opacity as the default disabled-state grammar.

Approved disabled control token:

```css
--my-color-control-disabled: var(--my-palette-braun-grey);
```

Use for currently approved disabled control text states:

- disabled text actions
- disabled scope options
- disabled line input text / placeholder
- truly disabled/non-interactive row title and metadata, only when such a row is a rare unavailable-control exception

Disabled line input bottom lines use the existing divider token:

```css
--my-color-divider
```

Rules:

- Disabled state is represented by explicit disabled colors, not opacity.
- Do not remove underlines from disabled text actions by default.
- Do not use explanatory copy by default just to explain disabled controls.
- Do not define filled-button disabled colors in v1 because filled button grammar is not approved yet.
- Archived rows are not disabled rows.

## Divider / structural line

Pebble `#c5c3be` is the only allowed light-mode structural line/control-boundary color.

Use it for:

- row separators
- input underlines
- progress tracks
- necessary hairlines
- list top boundaries

Do not introduce `line-subtle`, `border-subtle`, opacity borders, or invented intermediate greys.

If Pebble feels too visually heavy, reduce line usage or simplify the layout instead of creating another color.

## Signal Red

Signal Red `#c02820` is only a functional signal color.

Allowed semantic roles:

- error
- destructive
- critical / attention marker

Do not use Signal Red as a generic accent, brand color, primary action color, domain color, badge color, or decoration.

Avoid large red surfaces by default. Prefer small text, line, or dot signals unless a destructive confirmation explicitly needs stronger emphasis.

## Function Yellow

Function Yellow `#d4b018` is only an active / operational / in-progress signal.

Allowed:

- active state indicator
- in-progress marker
- single operational highlight

Not allowed:

- decoration
- domain color
- generic warning color
- duplicate-warning panel background
- badge/pill color
- large background surface

Function Yellow and Signal Red should not both be active accent colors in the same screen context unless explicitly approved.

## No generic warning token

Myoria v1 does not include a generic warning color token.

Do not map warning to Function Yellow. Do not use yellow warning panels by default.

Use:

- Signal Red only for error / destructive / critical states.
- Function Yellow only for active / operational / in-progress states.
- Neutral text + structure for non-critical caution or duplicate messages.

If a future warning state needs color, it requires a specific design-system decision.

## No generic action color

Myoria v1 does not define a generic `action` color token.

Normal actions use primary text color.

Secondary/cancel actions use secondary or muted text, depending on hierarchy.

Destructive actions use Signal Red through the destructive semantic role.

Active/operational states use Function Yellow through the active/operational semantic role.

Do not use Signal Red or Function Yellow as generic CTA/action colors.

Do not introduce a brand/action/accent color token.

## No generic surface tokens

Myoria v1 does not include generic surface tokens.

Do not define:

- `--my-color-surface-subtle`
- `--my-color-surface-raised`

Use typography, spacing, and Pebble hairlines for structure instead of cards, raised panels, or separate surface backgrounds.

If a future component truly needs a surface color, it requires a separate explicit design-system decision.

## Inverted text

Myoria v1 includes an inverted text token:

```css
--my-color-text-inverted: var(--my-palette-braun-white);
```

Use only for text placed on dark filled surfaces, for example a rare filled primary/destructive button if such a component is explicitly approved.

Do not call this token `on-action`.

Do not use it to justify generic action colors.

Do not introduce separate white/near-white variants.

## Dark mode extension

Dark mode may use the same approved palette plus exactly two explicitly approved dark-extension colors:

```css
--my-dark-extension-housing: #10100f;
--my-dark-extension-line: #4a4a45;
```

Reason: the light palette does not provide a sufficiently deep matte housing tone or a usable dark-mode structural line.

All other dark-mode roles must map back to the approved Rams/Braun palette.

No additional dark-mode-only colors may be introduced without a new design-system decision.

No automatic inversion.

No ad hoc component-level dark colors.

Draft dark semantic mapping:

```css
[data-theme="dark"] {
  --my-color-background: var(--my-dark-extension-housing);
  --my-color-text-primary: var(--my-palette-braun-white);
  --my-color-text-secondary: var(--my-palette-pebble);
  --my-color-text-muted: var(--my-palette-braun-grey);
  --my-color-text-inverted: var(--my-dark-extension-housing);
  --my-color-divider: var(--my-dark-extension-line);
  --my-color-error: var(--my-palette-signal-red);
  --my-color-destructive: var(--my-palette-signal-red);
  --my-color-critical: var(--my-palette-signal-red);
  --my-color-active: var(--my-palette-function-yellow);
  --my-color-operational: var(--my-palette-function-yellow);
  --my-color-control-disabled: var(--my-palette-braun-grey);
}
```

Dark mode remains a separate visual-validation topic before production implementation.

## Must-not-do rules

- Do not add colors from screenshots, AI answers, image sampling, or unofficial ET66/Audio references as tokens.
- Do not use random `#222`, `#333`, `rgba(...)`, opacity-generated line colors, or component-local dark colors.
- Do not use opacity as default disabled-state styling.
