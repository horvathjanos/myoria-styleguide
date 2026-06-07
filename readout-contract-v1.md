# Myoria Readout Contract V1

Status: Janos-approved readout / root measurement decisions from the static styleguide grooming pass.

This document records the reusable readout primitive used by the Today/root screen and future measurement-style surfaces. It is not a Today-only design exception and it is not production app code.

## Core principle

Myoria readout surfaces should feel like a quiet measurement instrument, not like a card dashboard, generic settings list, or app-style CTA grid.

The Today/root screen is important, but it does not automatically get a custom visual system. It should be assembled from app-wide primitives and tokens wherever possible.

Rules:

- Build Today/root from reusable readout primitives.
- Question every `today-*` or screen-local visual class.
- Prefer standard tokens, typography roles, colors, spacing, chevrons, and interaction grammar.
- Keep custom screen-local styling only when a reusable primitive would clearly damage the Rams/Braun direction or fail a concrete design-system need.
- The strict rules are the design language; they are not separate from the Rams/Braun aesthetic.

## Readout primitive

Approved primitive family:

```text
.my-readout-stack
.my-readout-block
.my-readout-main
.my-readout-content
.my-readout-detail
.my-readout-pair
.my-readout-pair-item
.my-readout-pair-main
.my-operational-marker
.my-operational-status
```

Base structure:

```text
SECTION LABEL
primary measurement / status                      >
optional progress scale
optional detail / metadata line
```

Examples:

```text
NUTRITION
861 / 2300 kcal                                   >
progress scale

FLUID                    BODYWEIGHT
0.6 / 3 L             >  73.5 kg               >
progress scale           Logged 07:12

WORKOUT
▌ Active                                          >
Push session · 42 min
```

The Today/root screen is the first consumer of this primitive, not the owner of the primitive.

## Typography

Use existing typography roles by default.

Approved mapping:

- section label: `section-label`
- primary numeric value: `metric-value`
- primary unit: `metric-unit`
- paired secondary value: `row-title`
- active/operational status text: root-date typography role
- non-numeric primary status/title: `row-title`
- detail / metadata: `row-meta`

Rules:

- Do not introduce Today-only typography.
- Do not use tiny custom detail text such as `9px / 12px`.
- Do not use a compact measurement variant in v1.
- Do not shrink Fluid or Bodyweight measurements with arbitrary custom type sizes.
- Hierarchy comes from structure and progress-scale emphasis, not random type-size changes.
- Use `row-title` for paired secondary values such as Fluid and Bodyweight on Today/root.
- Use the active/operational status text mapping only for true active / operational / in-progress states.
- Active/operational status text is sentence case, not uppercase.
- Active/operational status text uses secondary text color.

## Spacing

Readout spacing is design-system spacing, not Today-local spacing.

Approved spacing:

```text
readout block to readout block:  --my-section-gap
label to primary readout:        --my-space-2 /* 8px */
primary readout to progress:     --my-space-2 /* 8px */
primary readout to detail:       --my-space-2 /* 8px */
```

Rules:

- Do not add `--my-today-*` spacing tokens.
- Do not add screen-local magic-number margins.
- Add a new token only when a repeated primitive-level need exists across more than one screen/pattern.

## Separators and boundaries

The readout stack does not use default separators between blocks.

Reason: progress / measurement lines are already structural lines. Adding full-width separators between every readout block would make the Today/root surface too striped and settings-list-like.

Rules:

- No default readout block separators.
- No default top boundary on Today/root.
- No default bottom boundary on Today/root.
- No cards.
- No surfaces.
- No shadows.
- A separator may be considered later only when a concrete readout region behaves like a true list.

## Chevron placement

Navigable readout blocks use a muted trailing chevron.

Rules:

- The chevron belongs to the primary readout row.
- The chevron is vertically aligned with the primary measurement/status row, not with the full block height.
- The chevron tip aligns to the shared readout/list-row right-edge axis.
- For readouts with progress scales, the chevron tip and progress-scale end share the same vertical axis.
- The chevron zone remains fixed-width; the chevron is right-aligned inside it.
- Optional progress/detail content must not pull the chevron downward.
- Use the same fixed chevron-zone principle as list rows.
- No primary chevron by default.
- Paired secondary readouts still use muted chevrons because they are navigable.

Approved structure:

```text
SECTION LABEL
[primary measurement/status                 >]
[optional progress/detail]
```

## Paired secondary readouts

Root screens may group two lower-priority readouts into a two-column pair.

Default Today/root example:

```text
FLUID                    BODYWEIGHT
0.6 / 3 L             >  73.5 kg               >
progress scale           Logged 07:12
```

Rules:

- Use only for secondary readouts that should have lower visual priority than the primary full-width readout.
- Today/root uses this pattern for Fluid + Bodyweight.
- Each paired item is independently navigable.
- Each paired item keeps a muted trailing chevron.
- Paired values use `row-title` typography, not primary `metric-value` typography.
- Detail text uses `row-meta`.
- Fluid may include a standard 1px progress scale.
- Fluid on Today/root paired readouts uses liters, not milliliters.
- Fluid consumed value uses one decimal place.
- Fluid target may be shown as a whole liter when it is a whole-liter target, for example `3 L`.
- Milliliter precision belongs to Fluid detail, history, and edit surfaces, not the root Today readout.
- Bodyweight does not show a progress scale unless target/range tracking exists.
- No card, surface, border, separator, or background is introduced around the pair.
- The pair remains whitespace-based and uses standard spacing tokens.

## Paired readout geometry

Paired secondary readouts behave as one component with shared row geometry, not as two independent widgets placed next to each other.

Shared rows:

```text
row 1: section labels
row 2: primary value + navigation affordance
row 3: detail / progress content
```

Rules:

- Both columns participate in the same row structure.
- Section labels share one row.
- Values and navigation chevrons share one row.
- Detail and progress content share one row.
- Row 3 may contain either progress or metadata/detail text.
- Progress and metadata align by visual center within the shared row.
- Top-edge alignment is not the intended row-3 visual rule.
- Columns align row-by-row through the paired-readout primitive.
- Use token-based column and row gaps.
- Do not use local offsets, custom padding, custom margins, negative margins, or position nudges to align a paired readout.
- Do not add Today-specific paired-readout layout logic.

## Interaction

Readout block interaction follows the object-list row interaction grammar.

Rules:

- Full block press area when navigable.
- Pressed feedback uses `--my-opacity-pressed` on readout content.
- Separator/progress scales do not change during press.
- No background highlight.
- No hover state in v1.
- No selected/current readout state in v1.
- A readout block is not a card and not a CTA.

## Progress scale

Progress scale is optional.

Use it only for real target/progress data.

Canonical visual grammar is defined in:

```text
docs/styleguide/progress-scale-contract-v1.md
```

Default examples:

- Nutrition: yes
- Fluid: yes
- Bodyweight: no, unless there is target/range tracking
- Workout: no, unless there is session progress

Rules:

- Use the shared progress-scale primitive, not a Today-only progress line.
- No thick progress bars.
- No rounded pill progress bars.
- No colorful generic app progress indicators.
- Default track color: `--my-color-divider`.
- Default fill color: `--my-color-text-primary`.
- Function Yellow is not the default progress fill.
- Over-target behavior follows the progress-scale contract.

## Primary progress scale

A root screen may have at most one primary / emphasized progress scale.

Rules:

- Standard progress scale: `1px`.
- Emphasized progress scale: `2px`.
- Today/root default emphasized progress scale: Nutrition.
- Fluid and other secondary progress scales remain `1px`.
- Do not use multiple emphasized progress scales on one screen by default.

## Operational marker

Operational/in-progress state may use a strict vertical operational marker primitive.

Example:

```text
▌ Active
```

Rules:

- Use only for true active / operational / in-progress state.
- Marker shape: vertical line, not a dot.
- Marker color: `--my-color-operational`.
- Marker size: `2px × 12px`.
- Marker is vertically centered with the operational text row.
- Operational text uses root-date typography role: sans, 14px / 18px, 400.
- Operational text uses secondary text color.
- Default active readout wording: `Active`, not `Active workout`, because the section label already provides the domain.
- Always pair the marker with a visible label.
- Not a badge.
- Not a pill.
- Not an icon set.
- Not a generic status dot system.
- Not allowed for `featured`, `new`, `warning`, `important`, or generic accent use.

## Must-not-do rules

- Do not create a Today-only visual grammar by default.
- Do not preserve custom Today CSS just because it already exists.
- Do not introduce card/surface/shadow dashboard styling.
- Do not add separators that make the readout stack visually striped.
- Do not use Function Yellow as generic progress/accent color.
- Do not use compact measurement typography in v1.
- Do not create screen-local spacing or typography magic numbers.
