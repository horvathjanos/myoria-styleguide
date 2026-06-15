# Myoria Typography Contract V1

Status: Janos-approved typography decisions from the granular styleguide grooming pass.

This document is the current typography source of truth for the static styleguide. It intentionally records only approved decisions. It is not a typography exploration board.

## Core principle

Myoria typography should feel like a quiet measurement instrument, not a generic app dashboard.

Use a small number of roles. Avoid marketing titles, hero headings, card titles, modal-title variants, and local font-size patches.

## Font families

```css
--my-font-sans: "IBM Plex Sans", "Helvetica Neue", Arial, sans-serif;
--my-font-condensed: "IBM Plex Sans Condensed", "Arial Narrow", sans-serif;
--my-font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
```

The styleguide loads these approved families from local static assets:

```text
assets/fonts/IBMPlexSans-Regular.ttf
assets/fonts/IBMPlexSansCondensed-SemiBold.ttf
assets/fonts/IBMPlexMono-Regular.ttf
```

The production assets are copied into the generated styleguide output by
`scripts/build-styleguide-app.mjs`. `docs/styleguide/fonts.css` owns the
corresponding `@font-face` declarations, and every canonical styleguide route
loads that stylesheet before the typography tokens and component CSS.

Font-loading rules:

- Use the exact CSS family names `IBM Plex Sans`,
  `IBM Plex Sans Condensed`, and `IBM Plex Mono`.
- Load only local files published under `docs/styleguide/assets/fonts/`.
- Do not use a remote font CDN.
- Keep the existing fallback stacks after the approved family name.
- Use `font-display: swap` so fallback text remains available while local
  fonts load.
- The existing production condensed SemiBold binary supplies the approved
  condensed control-label role at CSS weight 500. Do not replace it or add
  another weight without a separate typography decision.
- The font software is distributed under SIL Open Font License 1.1. The
  published notice lives at `docs/styleguide/assets/fonts/OFL.txt`.

Approved family roles:

- Sans: explanatory copy, input text, help text, inline feedback, units, list-state text.
- Condensed: uppercase operational labels and action/control labels.
- Mono: measurement numeric values, row metadata, numeric input values.

Do not use mono for action text by default. Do not use condensed for explanatory copy.

## Today/root header

The Today/root screen does not display an explicit `Today` title.

The root screen is already the daily measurement surface. Writing `Today` adds app/dashboard noise and is less instrument-like.

Approved root header:

```text
Tuesday, 2 June
```

Approved root date role:

```css
--my-type-root-date-size: 14px;
--my-type-root-date-line: 18px;
color: var(--my-color-text-secondary);
font-family: var(--my-font-sans);
font-weight: 400;
```

Rules:

- Use one date/context line only.
- Do not add `Today`, `TODAY ·`, `Daily readout`, `Local day`, `Vienna`, or a second helper line.
- Do not use `rootTitle` for Today.

## Secondary screen context

Use inside the shared secondary screen header for navigation context:

- Food & Drink Library
- Create item
- Edit item
- detail/workflow screens

Approved role:

```css
--my-type-secondary-screen-title-size: 14px;
--my-type-secondary-screen-title-line: 18px;
font-family: var(--my-font-sans);
font-weight: 400;
color: var(--my-color-text-secondary);
```

The back chevron and context label form a quiet navigation group. They orient
the user but do not compete with the main object name or workflow content.

The selected object name may use the existing 18 / 22 primary title role when
the detail hierarchy needs it. Do not make the secondary header label behave
like a page hero.

Do not add separate `formTitle`, `modalTitle`, `cardTitle`, or `heroTitle`
roles in v1.

## Section labels

Use for operational labels such as:

- NUTRITION
- FLUID
- SEARCH
- ACTIVE
- ARCHIVED
- form field labels where this grammar is appropriate

Approved role:

```css
--my-type-section-label-size: 14px;
--my-type-section-label-line: 18px;
font-family: var(--my-font-condensed);
font-weight: 500;
text-transform: uppercase;
```

Reason: compact, readable, technical, less heavy than the previous 16px/600 grammar.

## Row titles

Use for primary item/navigation row titles, such as:

- NÖM PRO 35 Protein Drink Chocolate
- Chicken breast
- Sourdough bread

Approved role:

```css
--my-type-row-title-size: 16px;
--my-type-row-title-line: 20px;
font-family: var(--my-font-sans);
font-weight: 400;
```

Rules:

- Row titles stay first-line and primary.
- Row titles stay single-line in v1 and truncate only at the end.
- Title-only rows use the same row-title role.
- Do not make row titles medium/semibold by default.

## Row metadata

Use for secondary row metadata, such as:

- `350 ml · NUTRITION + FLUID`
- `100 g · NUTRITION`
- `ARCHIVED · 350 ml · NUTRITION`

Approved role:

```css
--my-type-row-meta-size: 13px;
--my-type-row-meta-line: 17px;
font-family: var(--my-font-mono);
font-weight: 400;
```

Reason: row metadata often contains serving amounts, units, and contribution labels. Mono keeps it technical and instrument-like while remaining subordinate to the 16px row title.

Keep the whole row meta line mono in v1. Do not split number/unit and contribution into mixed font families yet.

Rules:

- Row metadata stays single-line in v1 and truncates only at the end.
- Metadata should stay short by contract.
- Do not use badges, pills, or mixed inline typography for metadata prefixes such as `ARCHIVED`.

## Object-list state text

Use for list-level empty/loading/error state messages inside object-list regions, such as:

- `No active items`
- `No items yet`
- `Create reusable foods and drinks for logging.`
- `No matching items`
- `Loading items`
- `Could not load items`

Approved role:

```css
--my-type-list-state-size: 14px;
--my-type-list-state-line: 20px;
font-family: var(--my-font-sans);
font-weight: 400;
```

Reason: list-state text is more important than inline help text, but should not become a large friendly app-style empty state. 14 / 20 keeps it readable, calm, and structurally tied to the list region.

Rules:

- List-state text is left-aligned to the list grid.
- List-state title/body pairs use the same role for both lines.
- Empty/loading states use secondary text color.
- Error states use the error token.
- Do not use centered hero empty-state typography for normal object-list states.

## Measurements

Use for daily measured values and ratios, such as:

- `861 / 2300 kcal`
- `550 / 3000 ml`
- `72.6 kg`

Approved numeric value role:

```css
--my-type-metric-value-size: 24px;
--my-type-metric-value-line: 28px;
font-family: var(--my-font-mono);
font-weight: 400;
```

Approved unit role:

```css
--my-type-metric-unit-size: 11px;
--my-type-metric-unit-line: 14px;
font-family: var(--my-font-sans);
font-weight: 400;
```

Reason: numeric values should feel like precise instrument readouts. Units are attached labels, so they stay smaller and calmer in sans.

Measurement unit strength is semantic:

- Primary units use the default `my-measurement-unit` styling.
- `kcal` remains a primary unit in v1.
- Supporting units use `my-measurement--supporting-unit`.
- Supporting units include `g`, `kg`, `L`, and `ml` when they appear in
  readout measurements.
- Supporting units are visually quieter while numeric values remain primary.
- Value/unit spacing belongs to the measurement primitive, not local screen CSS.
- List row metadata remains unchanged in this slice and keeps the row-meta
  typography contract.

## Actions

Use for action/control labels, such as:

- CREATE ITEM
- RETRY
- SAVE
- CANCEL
- RESTORE
- header text actions
- quiet object-management actions

Approved role:

```css
--my-type-action-size: 14px;
--my-type-action-line: 18px;
font-family: var(--my-font-condensed);
font-weight: 500;
text-transform: uppercase;
```

Reason: condensed uppercase action labels feel closer to Braun/Rams control labels. They align with section-label grammar and avoid generic CTA styling.

Do not use a generic action color token. Normal actions use primary text color.

## Help and inline feedback

Use for help text, inline errors, and neutral inline warnings, such as:

- `Name is required.`
- `Possible duplicate.`
- `Fluid contribution must be greater than 0 ml.`

Approved role:

```css
--my-type-help-size: 13px;
--my-type-help-line: 18px;
font-family: var(--my-font-sans);
font-weight: 400;
```

Reason: help and validation messages are explanatory copy, so readability matters more than control-label styling.

## Input text

Use for simple text input content and placeholders, such as:

- Search items
- Item name
- Serving amount

Approved role:

```css
--my-type-input-size: 15px;
--my-type-input-line: 20px;
font-family: var(--my-font-sans);
font-weight: 400;
```

Numeric input values use mono:

```css
.my-line-input--numeric {
  font-family: var(--my-font-mono);
}
```

Reason: numeric inputs are measurement-adjacent and should align with the readout grammar. Text inputs stay normal sans for natural editing.

## Must-not-do rules

- Do not remove or bypass the local `@font-face` definitions.
- Do not load IBM Plex from Google Fonts or another remote CDN.
- Do not rename the CSS families away from the approved token names.
- Do not use the primary 18 / 22 title role for secondary navigation context.
- Do not show an explicit `Today` title on the root screen.
- Do not add extra title roles such as `heroTitle`, `cardTitle`, `formTitle`, or `modalTitle` in v1.
- Do not use viewport-scaled font sizes.
- Do not use negative letter spacing.
- Do not use local one-off font sizes to patch layout problems.
- Do not make row metadata compete with row titles.
- Do not make actions look like generic app CTAs.
- Do not use mono for all copy; reserve it for numeric/readout/meta roles.
- Do not use condensed for explanatory/help/list-state copy.
