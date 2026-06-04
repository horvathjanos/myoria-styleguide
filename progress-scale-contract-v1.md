# Myoria Progress Scale Contract V1

Status: Janos-approved canonical Today progress direction after visual validation.

This document records the progress-scale decisions from the static styleguide grooming pass. The pattern is intended as a reusable measurement grammar, not a Today-only custom component.

## Core principle

Progress should feel like a quiet measuring instrument, not like a generic app progress bar.

The progress scale may be used for target-based measurements such as nutrition, fluid, and future measurement/detail surfaces. It may also inform future chart/diagram grammar when appropriate.

Rules:

- Treat the scale as a system primitive, not a screen-local decoration.
- Keep the visual language precise, quiet, and functional.
- Avoid rounded pill progress bars.
- Avoid generic accent colors.
- Avoid badges, warning icons, and alert surfaces for normal progress.
- If the scale direction fails later visual validation, fall back to the quiet progress line.

## Shape

The default v1 direction is an open measurement scale, not a boxed/framed bar.

Concept:

```text
|──────────|──────────|
```

Rules:

- Open scale, no surrounding box.
- 1px base line by default.
- 1px tick marks by default.
- Ticks are vertically centered on the horizontal line axis.
- Tick geometry should feel grid-aligned and instrument-like.
- No asymmetric tick placement above/below the line axis.

## Tick density

The v1 default scale uses only 0 / 50 / 100 reference points.

Concept:

```text
|──────────|──────────|
0%        50%       100%
```

Rules:

- Start endpoint tick: 0%.
- Middle tick: 50%.
- End endpoint tick: 100%.
- No 10 / 20 / 30 / 40 / 60 / 70 / 80 / 90 tick density by default.
- More ticks require a separate validated variant.

## Fill behavior

The progress fill runs on the same measurement line.

Concept:

```text
|━━━━━━────|──────────|
```

Rules:

- Track line: `--my-color-divider`.
- Progress fill: `--my-color-text-primary`.
- Fill is not a separate thick bar.
- Fill does not round the ends.
- Default line remains quiet and precise.
- Primary progress may use the existing primary line weight, but must keep the same scale grammar.

## Layering

The scale uses a strict layer order.

Layer order:

```text
track line  → base layer
ticks       → above track
fill        → above ticks
overrun     → above ticks
```

Rules:

- Ticks are part of the unfilled scale geometry.
- When progress fill reaches or crosses a tick, the fill covers that tick.
- At 100%, the fill covers the full scale line and the ticks underneath it.
- The overrun segment remains visible after the target endpoint.
- Do not draw ticks above the filled progress layer.

Reason:

- Filled progress should read as one continuous measured value.
- Ticks should not visually cut into the completed black fill.

## Line-weight roles

The scale has two approved line-weight roles.

Rules:

- Standard scale: 1px line.
- Emphasized scale: 2px line.
- Calories may use emphasized scale on the root/readout surface.
- Macros such as Fat / Protein / Carbs should normally use standard 1px scale.
- Fluid should normally use standard 1px scale.
- Do not invent screen-local scale weights.
- Do not create additional scale weights without a separate validation decision.

Reason:

- 2px can work for the primary daily operational nutrition budget.
- 1px is quieter and likely better for macro/detail readouts.
- This creates hierarchy without custom per-screen styling.

## Tick color

Ticks remain quiet.

Rules:

- Ticks use `--my-color-divider`.
- Ticks do not switch to primary color when progress passes them.
- The horizontal fill segment communicates progress.
- This keeps the scale visually stable and avoids unnecessary DOM/CSS complexity.

## Size variants

V1 starts with one normal scale variant only.

Rules:

- Do not define compact / short / chart variants in v1.
- Add smaller variants only after a concrete use case exists.
- Fluid, inner detail screens, and future diagrams may eventually need smaller or different scale variants, but those must be standardized later.

## Over-target behavior

The scale remains fixed to the target length.

Concept:

```text
|━━━━━━━━━━━━━━━━━━━━| ━
                  150 kcal over
```

Rules:

- The scale width represents 0–100% of the target.
- Over-target values do not stretch the scale beyond its normal width.
- The fill clamps at 100%.
- The 100% endpoint tick remains the target boundary.
- A short horizontal Signal Red overrun segment appears after the 100% endpoint.
- The overrun segment is separated from the endpoint by a small standard gap.
- The over amount is shown as detail text under the scale.
- The over detail text stays inside the scale/readout width and aligns to the right edge of the scale.
- The over detail text must not sit outside the scale to the right.

## Overrun segment

The over-target indicator is a small horizontal overrun segment, not a vertical marker and not a dot.

Rules:

- Segment shape: short horizontal line.
- Segment appears after the 100% endpoint.
- Segment shares the same line axis as the scale line.
- Segment uses the same line-weight role as the scale: 1px for standard, 2px for emphasized.
- Segment color: `--my-color-error` / Signal Red.
- The gap between target endpoint and overrun segment is standard and small.
- The overrun segment is part of the scale grammar, not a status dot, badge, or icon.
- Do not use a vertical red marker for the canonical over-target state.

## Pixel geometry

The initial canonical CSS geometry is intentionally small and grid-like.

Rules:

- Overrun gap: 1px.
- Overrun width: 4px.
- Endpoint tick height: 6px.
- Middle tick height: 4px.
- Emphasized scale line: 2px.
- Standard scale line: 1px.
- Use dedicated progress-scale geometry values for these micro-details; do not force the general spacing scale where it creates wrong proportions.

Reason:

- General spacing tokens such as 4px / 8px are too coarse for this micro-geometry.
- The scale should feel pixel-precise and measurement-instrument-like.

## Severity mapping

Over-target severity is domain-specific.

Signal Red overrun segment and detail text are allowed for:

- Calories
- Fat

Reason:

- Calories over target is goal-critical in a calorie-deficit context.
- Fat over target is treated as a red-flag macro overrun for the current tracking goals.

Do not automatically use Signal Red over-target for:

- Protein
- Carbs
- Fluid

Reason:

- Protein over target is usually not a problem.
- Carbs over target is not automatically critical if the day still fits the plan.
- Fluid over target is not automatically an error.

Protein / carbs over-target handling needs visual validation before becoming a contract rule. It may use a quiet over state, or may rely on the measurement numbers alone.

## Red over-target detail

Calories / Fat over-target requires both overrun segment and detail text.

Examples:

```text
CALORIES
2450 / 2300 kcal
|━━━━━━━━━━━━━━━━━━━━| ━
                  150 kcal over

FAT
92 / 70 g
|━━━━━━━━━━━━━━━━━━━━| ━
                       22 g over
```

Rules:

- Overrun segment color: `--my-color-error` / Signal Red.
- Over detail color: `--my-color-error` / Signal Red.
- Detail text uses a quiet instrument-detail style based on the row-meta role.
- Detail text is small and visually subordinate to the primary measurement.
- Detail text is not uppercase.
- Detail text is not bold.
- Detail text is not an alert copy block.
- Detail text is right-aligned below the scale, inside the scale/readout width.
- Do not repeat the target in a second detail line if the primary measurement already shows it.

## Accessibility

Visual subtlety must not remove accessible meaning.

Rules:

- The visible over detail may be quiet and instrument-like.
- The accessibility label must explicitly include the over amount.
- Example accessibility label: `Calories, 2450 of 2300 kcal, 150 kcal over`.

## Validation

The progress scale has a canonical Today implementation and a validation page.

Validation page:

```text
docs/styleguide/validation/progress-scale.html
```

Required validation cases:

- Plain progress line reference.
- Open scale at partial progress.
- Open scale at 100%.
- Calories over with Signal Red horizontal overrun segment and right-aligned over detail.
- Fat over with Signal Red horizontal overrun segment and right-aligned over detail.
- Emphasized 2px scale for Calories-like primary readout.
- Standard 1px scale for macro/detail readouts.

## Must-not-do rules

- Do not use Function Yellow for over-target nutrition/fat states.
- Do not make the entire progress line red.
- Do not make the entire readout block red.
- Do not use a warning icon.
- Do not use a badge or pill.
- Do not add a background alert panel.
- Do not let the scale grow wider when values exceed target.
- Do not introduce dense chart ticks in the default primitive.
- Do not use a vertical red marker for canonical over-target state.
- Do not draw ticks above filled progress.
