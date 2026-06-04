# Myoria Design System V1 Draft

Status: draft contract for static styleguide previews and future React Native migration.

This document hardens the static styleguide into a strict v1 design-system draft. It is dry design-system work only. It does not change production React Native code.

## Product And IA Contract

Today is the root daily measurement surface. It answers where the user stands today.

Domain screens own detail, report, log, correction, and object-management flows. Food & Drink Library is secondary object management, not a daily log hub.

Do not revive bottom tabs, a central plus, or the old Log hub. Do not implement fake mixed Nutrition/Fluid behavior with unrelated records. Do not coordinate cross-domain persistence writes in UI. Do not calculate nutrition snapshots in React UI.

## 1. Color Tokens

The color source of truth is `docs/styleguide/color-contract-v1.md`.

Tokens/classes involved:

- `--my-palette-braun-white`
- `--my-palette-braun-grey`
- `--my-palette-anthracite`
- `--my-palette-pebble`
- `--my-palette-warm-black`
- `--my-palette-function-yellow`
- `--my-palette-signal-red`
- `--my-dark-extension-housing`
- `--my-dark-extension-line`
- `--my-color-background`
- `--my-color-text-primary`
- `--my-color-text-secondary`
- `--my-color-text-muted`
- `--my-color-text-inverted`
- `--my-color-divider`
- `--my-color-error`
- `--my-color-destructive`
- `--my-color-critical`
- `--my-color-active`
- `--my-color-operational`

Intended usage:

- Braun White is the light app/screen ground.
- Warm Black is primary text.
- Anthracite is readable supporting text.
- Braun Grey is muted metadata, inactive labels, placeholders, quiet chevrons, and low-priority detail.
- Pebble is the only light structural line/control-boundary color.
- Signal Red is only for error, destructive, or critical/attention signals.
- Function Yellow is only for active, operational, or in-progress signals.
- Dark mode may use the approved palette plus exactly two dark-extension colors: dark housing and dark structural line.

Forbidden patterns:

- No domain colors for Nutrition, Fluid, Bodyweight, Workout, or Food.
- No decorative gradients, badges, colored cards, or random palette additions.
- No screenshot-sampled, AI-estimated, ET66/Audio-reference, or unofficial product hexes as tokens.
- No invented intermediate greys, opacity-mixed pseudo-colors, or component-local dark colors.
- No generic surface tokens.
- No generic action color token.
- No generic accent token.
- No generic warning token.
- No `on-action` token; use `--my-color-text-inverted` for text on approved dark filled surfaces.
- No automatic dark-mode inversion.

Intentionally absent in v1:

```css
--my-color-surface-subtle
--my-color-surface-raised
--my-color-line-subtle
--my-color-action
--my-color-accent
--my-color-warning
--my-color-on-action
```

React Native migration notes:

- Map these roles into a future generated `myoriaTokens.ts`.
- Keep color roles semantic. Do not pass raw hex values from screen files except during migration.
- Future production work must read `docs/styleguide/color-contract-v1.md` before changing color behavior.
- Dark mode remains a separate visual-validation topic before production implementation.

## 2. Typography Roles

The typography source of truth is `docs/styleguide/typography-contract-v1.md`.

Tokens/classes involved:

- `--my-type-screen-title-*`, `.my-screen-title`
- `--my-type-root-date-*`, `.my-root-date`
- `--my-type-section-label-*`, `.my-section-label`, `.my-field-label`
- `--my-type-row-title-*`, `.my-list-row-title`
- `--my-type-row-meta-*`, `.my-list-row-meta`
- `--my-type-action-*`, `.my-text-action`, `.my-button`
- `--my-type-metric-value-*`, `.my-measurement-value`
- `--my-type-metric-unit-*`, `.my-measurement-unit`
- `--my-type-input-*`, `.my-line-input`, `.my-line-input--numeric`
- `--my-type-help-*`, `.my-inline-error`, `.my-inline-warning`, `.my-help-text`

Approved role summary:

- Today/root screen does not display an explicit `Today` title.
- Today/root uses one quiet date line only: `Tuesday, 2 June`.
- Root date: 14px / 18px, sans, 400, secondary text.
- Secondary/domain/workflow screen title: 22px / 26px, sans, 400.
- Section labels: 14px / 18px, condensed, 500, uppercase.
- Row titles: 16px / 20px, sans, 400.
- Row metadata: 13px / 17px, mono, 400.
- Measurement numeric values: 24px / 28px, mono, 400.
- Measurement units: 11px / 14px, sans, 400.
- Action text: 14px / 18px, condensed, 500, uppercase.
- Help and inline feedback: 13px / 18px, sans, 400.
- Input text: 15px / 20px, sans, 400.
- Numeric input values use mono.

Forbidden patterns:

- No explicit `Today` title on the root screen.
- No extra title roles such as `heroTitle`, `cardTitle`, `formTitle`, or `modalTitle` in v1.
- No viewport-scaled font sizes.
- No negative letter spacing.
- No local one-off font sizes to patch layout problems.
- No row metadata that competes with row titles.
- No generic app CTA typography.
- No mono for all copy; reserve it for numeric/readout/meta roles.
- No condensed explanatory/help copy.

React Native migration notes:

- Introduce explicit text role primitives or token helpers before broad screen migration.
- Future production work must read `docs/styleguide/typography-contract-v1.md` before changing type behavior.
- Keep Today root context as date-only unless a new design-system decision changes it.

## 3. Spacing Scale

Tokens/classes involved:

- `--my-space-0` through `--my-space-8`
- `--my-screen-padding-x`
- `--my-section-spacing`
- `--my-row-spacing`
- `--my-touch-target`
- `.my-screen`, `.my-list-row`, `.my-back-control`

Intended usage:

- Use the 4/8/12/16/24/32/48/64 px scale.
- Use 32 px horizontal screen padding for secondary screens in this draft.
- Use at least 44 px touch targets for tappable controls.
- Use 56-64 px minimum rows for navigation rows.

Forbidden patterns:

- No one-off spacing to patch local visual problems.
- No tappable icon smaller than the touch target.
- No UI cards nested inside other UI cards.

React Native migration notes:

- Replace ad hoc numeric padding with generated spacing tokens as each screen migrates.
- Keep accessible hit targets even when the visual element is quiet.

## 4. Screen Headers

Tokens/classes involved:

- `.my-root-header`
- `.my-screen-header`
- `.my-screen-header--with-action`
- `.my-back-control`
- `.my-screen-title`
- `.my-root-date`
- `.my-header-action`

Intended usage:

- Today root header: one quiet date/context line only, no explicit `Today` title, no back control.
- Secondary screen header: quiet left chevron plus title.
- Action-bearing header: title/back cluster on the left and a text action on the right when the action is truly screen-level.
- No overflow menu unless real functionality exists.

Forbidden patterns:

- No explicit `Today` title on root.
- No second root-context helper line.
- No placeholder `...` menus.
- No filled/bordered back buttons for normal parent navigation.
- No duplicating top-left back and visible cancel when they mean the same thing.

React Native migration notes:

- Route-level back should call the existing navigation callback.
- Workflow/form screens can use Cancel when that is the more honest action.

## 5. Chevrons

Tokens/classes involved:

- `--my-chevron-*`
- `.my-chevron`
- `.my-chevron--left`
- `.my-chevron--primary`
- `.my-back-control`
- `.my-list-row-main`

Intended usage:

- The static `.my-chevron` mirrors production `MyoriaChevron`.
- Right chevrons mark navigation rows and domain blocks.
- Left chevrons mark parent-back navigation.
- Row chevrons live on the trailing axis; they must not flow inline after title text.

Forbidden patterns:

- No random text glyph chevrons as official UI.
- No local ad hoc chevron implementations now that `MyoriaChevron` exists.
- No contribution labels or metadata stealing title space in list row first lines.

React Native migration notes:

- Use production `MyoriaChevron` for all future chevron UI.
- When migrating rows, enforce `flex: 1`, `minWidth: 0`, and trailing chevron wrappers.

## 6. List Rows

Tokens/classes involved:

- `.my-list`
- `.my-list-row`
- `.my-list-row--disabled`
- `.my-list-row--archived`
- `.my-list-row-main`
- `.my-list-row-title`
- `.my-list-row-meta`
- `.my-chevron`

Intended usage:

- First line: title left, chevron trailing right.
- Second line: metadata, such as `serving · CONTRIBUTION`.
- Titles get priority and truncate at the end only if needed.
- Row separators are thin hairlines.

Forbidden patterns:

- No cards, badges, pills, or right-side contribution labels stealing title width.
- No multiline title rows until a deliberate row-height decision exists.
- No inline chevron after title text.

React Native migration notes:

- Keep row components presentational.
- Read-model values should supply row data; styleguide dummy data must not leak into app behavior.

## 7. Actions And Buttons

Tokens/classes involved:

- `.my-text-action`
- `.my-button`
- `.my-button--primary`
- `.my-button--secondary`
- `.my-button--destructive`
- `.my-button--disabled`
- `.my-header-action`

Intended usage:

- Underlined text actions are preferred for quiet object-management actions like `CREATE ITEM`.
- Normal actions use primary text color, not a generic action token.
- Primary buttons are reserved for clear commit actions in forms/workflows.
- Secondary buttons are for cancel/back-out choices when a visible button is needed.
- Destructive buttons are rare and only for irreversible or hiding/removal flows.
- Disabled state uses named opacity token.

Forbidden patterns:

- No generic action color token.
- No filled action button on Food & Drink Library list for create.
- No plus icon unless the action grammar explicitly calls for it.
- No shadows or pill buttons by default.
- No fake disabled state that remains focusable without semantic disabled handling.

React Native migration notes:

- Build button primitives after the styleguide roles stabilize.
- Keep Pressable hit targets at least 44 px.

## 8. Inputs And Forms

Tokens/classes involved:

- `.my-form`
- `.my-field`
- `.my-field-label`
- `.my-line-input`
- `.my-line-input--numeric`
- `.my-field-help`
- `.my-inline-error`
- `.my-inline-warning`

Intended usage:

- Search and simple text inputs are line-based.
- Numeric inputs use mono because they are measurement-adjacent.
- Field labels are uppercase section labels.
- Errors appear directly under the relevant field/control.
- Non-critical caution/duplicate messages use neutral text + structure, not a generic warning color.

Forbidden patterns:

- No rounded search boxes in the Rams/Braun list grammar.
- No bottom aggregate required-field error block.
- No hidden parsing/validation behavior in UI styling.
- No yellow warning panels by default.

React Native migration notes:

- Keep form state in UI/hooks but business validation in domain/application where appropriate.
- Do not calculate nutrition snapshots in React UI.

## 9. Errors And Warnings

Tokens/classes involved:

- `.my-inline-error`
- `.my-inline-warning`
- `.my-warning-panel`
- `.my-error-panel`

Intended usage:

- Inline errors belong under fields/controls.
- Error panels can represent screen-level load failures.
- Non-critical warnings/cautions are neutral structure + copy by default.
- Signal Red is used only for error, destructive, or critical states.
- Function Yellow is used only for active, operational, or in-progress states.

Forbidden patterns:

- No generic bottom error aggregation for required fields.
- No generic warning color token.
- No warning color used decoratively.
- No yellow duplicate-warning panel by default.
- No toast/snackbar as default success feedback.

React Native migration notes:

- Preserve existing validation behavior while moving visual presentation toward field-level feedback.

## 10. Measurement Values And Units

Tokens/classes involved:

- `.my-measurement`
- `.my-measurement--compact`
- `.my-measurement-value`
- `.my-measurement-unit`
- `.my-progress`
- `.my-progress-fill`

Intended usage:

- Ratios should display exact values and units together.
- Today fluid should display exact ml values, such as `550 / 3000 ml`.
- Numeric values use mono type; units are smaller sans labels.
- Compact measurements are allowed in dense split panels when exact values would otherwise wrap.
- Progress lines stay neutral unless an over-target/attention state is meaningful.

Forbidden patterns:

- No lossy rounding of fluid values in Today.
- No decorative charts when a line/progress readout is clearer.
- No detached unit that makes the value ambiguous.

React Native migration notes:

- Use explicit formatters for daily read models.
- Keep display formatting close to UI/presentation helpers, not domain persistence.

## 11. State Grammar

Tokens/classes involved:

- `.my-state`
- `.my-state--loading`
- `.my-state--empty`
- `.my-state--error`
- `.my-list-row--archived`
- `.my-list-row--disabled`
- `.my-linked-unavailable`
- `--my-opacity-disabled`
- `--my-opacity-pressed`
- `--my-opacity-chevron`

Intended usage:

- Loading, empty, and error states should be plain and calm.
- Archived/disabled rows remain readable but visually secondary.
- Linked-unavailable state indicates a record exists but cannot be opened from the current context.

Forbidden patterns:

- No spinners, cards, or decorative empty illustrations by default.
- No random opacity values.
- No hiding important unavailable states behind muted text alone.

React Native migration notes:

- Prefer status text in the screen context.
- Keep error copy behavior stable unless a ticket explicitly changes it.

## 12. Screen Previews

Tokens/classes involved:

- `screens/today.html`
- `screens/food-drink-library.html`
- `.my-phone`
- `.my-screen`
- screen-specific classes in `screens.css`

Intended usage:

- Today preview anchors root daily measurement grammar.
- Food & Drink Library preview anchors secondary object-list grammar.
- Screen previews use dummy data and links only.

Forbidden patterns:

- No production data integration.
- No build step.
- No complex JavaScript navigation.

React Native migration notes:

- Future migration prompts should cite a specific preview page and class grammar before editing production.

## 13. Migration Path

1. Keep this styleguide static and strict.
2. Define missing title/action/form decisions in docs before broad production migration.
3. Introduce a neutral token source.
4. Generate CSS variables and React Native TypeScript tokens.
5. Migrate one production primitive at a time.
6. Migrate one screen pattern at a time.
7. Add focused tests for behavior and layout contracts during production migration.

## 14. Must-Not-Do Rules

- Do not change production React Native from styleguide hardening slices.
- Do not start production UI refactors before the relevant styleguide rule exists.
- Do not revive bottom tabs, central plus, or old Log hub.
- Do not add placeholder overflow menus.
- Do not use local ad hoc chevrons.
- Do not use random colors or opacity values.
- Do not use screenshot-sampled, AI-estimated, ET66/Audio-reference, or unofficial product colors as tokens.
- Do not use generic surface, action, accent, or warning color tokens.
- Do not show an explicit `Today` title on the root screen.
- Do not add extra title roles such as `heroTitle`, `cardTitle`, `formTitle`, or `modalTitle` in v1.
- Do not let contribution labels steal title space in list rows.
- Do not coordinate cross-domain persistence writes in UI.
- Do not calculate nutrition snapshots in React UI.
- Do not create fake mixed Nutrition/Fluid behavior with unrelated records.
- Do not aggregate required field errors at the bottom of forms.

## 15. Token Synchronization Plan

Preferred future path:

```text
design-tokens.json -> generated CSS variables -> generated React Native TypeScript tokens
```

Why:

- JSON is neutral between web/CSS and React Native.
- CSS variables keep the static styleguide browser-openable.
- TypeScript tokens keep production screens typed and importable.
- Generation prevents silent drift between preview and production.

Do not implement token generation in this slice. Keep `tokens.css` as the temporary v1 draft reference until a dedicated token-source ticket exists.
