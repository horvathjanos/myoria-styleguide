# Myoria Screen Composition Contract V1

Status: Janos-approved screen composition decisions from the granular styleguide grooming pass.

This document records how approved primitives and tokens should be assembled into repeatable screen structures. It is not production app code and it is not a per-screen polish wishlist.

## Core principle

Myoria screens should be assembled from shared styleguide primitives, not from screen-local custom layouts.

Current production screens are the implemented reality, but the styleguide is the target UI grammar. Future production migration should converge screens toward approved styleguide structures as directly as possible.

## Component hierarchy principle

Myoria design-system composition should be reusable and hierarchical:

```text
Screen pattern
└── Shared screen primitives
    ├── Header primitive
    ├── Control group primitive
    ├── Action row primitive
    └── List primitive
        └── List item primitive(s)
```

Lists should not be rebuilt feature-by-feature with custom row layouts. A list screen should use a reusable list primitive, and that list should be composed from reusable list item primitives.

Feature/domain code may provide different content, labels, values, metadata, actions, navigation targets, accessibility labels, and optional approved hints, but the layout grammar, spacing, separators, typography roles, chevrons, and touch behavior should come from approved styleguide primitives.

This is the main mechanism for homogeneous Myoria UI/UX.

## Full-screen object list pattern

Use this pattern for full-screen object-management lists unless there is a clear domain-specific reason not to:

```text
[back chevron] Screen Title

CONTROL GROUP
input / filter / scope controls

RIGHT-ALIGNED TEXT ACTION

LIST TOP BOUNDARY
list rows / list state
```

The pattern is currently anchored by Food & Drink Library, but it is intended to be reusable for similar list-management screens.

Default full-screen object lists do not include internal group headers, list labels, visible result counts, swipe actions, long-press actions, inline secondary row actions, skeleton rows, hover state, selected/current row state, or row focus styling in v1. These require separate approved patterns when a concrete use case needs them.

## Header

Approved header structure:

```text
[44px back control] Screen Title
```

Rules:

- Back control stays inside the normal screen padding grid.
- Back control uses a 44px touch target.
- Back control does not use negative margin.
- Back-control-to-title gap is 0; the touch target already provides enough physical spacing.
- Do not place placeholder overflow menus in the header.
- Do not move object creation into the header by default.

## Control group

A control group may contain a section label, line input, and scope/filter selector.

Food & Drink Library baseline:

```text
SEARCH
8px
input
8px
ACTIVE | ARCHIVED
```

Approved order:

1. `SEARCH` label
2. Search input
3. Scope selector

Rules:

- Keep controls visually grouped.
- Use section-label typography for control labels.
- Use `SEARCH` as the object-list search label by default.
- Use line inputs by default.
- Search placeholder wording is context-based; default is `Search items`.
- Food & Drink Library uses `Search items` because it may contain food, drink, and mixed nutrition/fluid items.
- Search input focus keeps a 1px line and changes only the line color to primary.
- Do not use rounded search boxes in the Rams/Braun list grammar.
- Do not add a dedicated clear action in v1.
- Do not rely on platform-native clear icons as the official styleguide pattern.
- Search input and scope selector remain enabled during normal object-list loading, error, empty, and no-results states by default.
- If a future concrete technical/domain condition makes search or scope switching genuinely impossible, that screen may explicitly disable them as a separate use-case decision.

## Scope selector

Approved scope selector baseline:

```text
ACTIVE | ARCHIVED
```

Rules:

- Scope selector is left-aligned to the search/control group grid.
- Use a text pipe `|` as the scope separator.
- Use section-label typography: 14px / 18px, condensed, 500, uppercase.
- Each tappable scope option has a 44px tap area while the visible text remains quiet.
- Use compact 8px spacing rhythm around scope labels and separator.
- Active scope uses primary text color.
- Inactive scope uses muted text color.
- Disabled scope uses the approved disabled control color and is not pressable or focusable.
- Do not introduce a separate inactive-scope color token in v1.
- Do not use underline, pill, border, highlight, Function Yellow, or centered tab styling for normal scope selection.

Inactive does not mean disabled. Inactive scope options remain selectable unless explicitly disabled.

## Create action row

For object-list screens with a create/new-item action, use a quiet text action row after the relevant control group and before the list.

Food & Drink Library baseline:

```text
SEARCH
input
ACTIVE | ARCHIVED

                         CREATE ITEM

LIST TOP BOUNDARY
list rows / list state
```

Approved behavior:

- `CREATE ITEM` stays outside the header.
- `CREATE ITEM` stays outside list rows.
- `CREATE ITEM` is right-aligned inside its own action row.
- Right alignment is allowed because this is an operational object-management action, not a section label.
- Right alignment improves mobile thumb ergonomics while keeping the action visually quiet.

Approved visual constraints:

- Text action only.
- No plus icon by default.
- No filled button for normal create on object-list screens.
- No action color token.
- No card/surface.
- No floating action button behavior.
- No local CTA styling.

Approved wording:

- Default: `CREATE ITEM`
- Domain-specific wording is allowed only when it is clearer and not narrower than the actual object model.
- Food & Drink Library uses `CREATE ITEM` because it may contain food, drink, and mixed nutrition/fluid items.

Approved spacing and touch behavior:

```css
--my-search-create-gap-compact: 24px;
--my-search-create-gap-comfortable: 32px;
--my-create-action-padding-y: 16px;
```

- Create text action uses the approved action text role.
- Create text action has 44px min-height and 112px min-width.
- Pressed state uses the shared pressed opacity token.
- Disabled state uses the approved disabled control color, keeps underline, and removes press/focus behavior.

Visibility rules:

- `CREATE ITEM` remains visible across object-list scopes by default.
- Food & Drink Library keeps `CREATE ITEM` visible in both ACTIVE and ARCHIVED scopes.
- `CREATE ITEM` remains visible during active search and no-results states.
- `CREATE ITEM` remains visible and enabled during normal object-list loading/error/empty/no-results states by default.
- The create action belongs to the library/object-management surface, not directly to the current list read state.
- If a future concrete technical/domain condition makes create genuinely impossible, that screen may explicitly disable or hide it as a separate use-case decision.

The create action row does not own a bottom divider. It only owns action placement, vertical padding, touch target, and action state.

## List boundary ownership

The list owns its top structural boundary.

When a full-screen object list follows a create action row, the list starts with a 1px Pebble top boundary. This boundary marks the start of the list, not the end of the action row.

Approved:

```text
CREATE ITEM

────────────────────────────────────
list rows / list state
```

Reason: a list boundary is part of the list component responsibility. Action components must not carry structural boundary responsibilities for whatever follows them.

Rules:

- The reusable list primitive owns the list top boundary.
- The create/new-item action row must not carry a bottom divider by default.
- Divider uses the approved divider color token.
- Divider is a 1px hairline.
- No shadow.
- No card.
- No extra surface background.
- No additional large gap after the list boundary.
- Do not attach list-boundary responsibilities to action components.
- Do not combine divider + large gap + card/list container.

## Reusable list primitive

A full-screen object list should use a reusable list primitive.

The list primitive owns:

- optional top structural boundary
- row separator grammar
- optional bottom boundary behavior
- list-level empty/loading/error slot placement, where applicable
- list spacing relationship to surrounding screen structure
- row composition contract enforcement

The list primitive does not own:

- domain-specific data fetching
- persistence behavior
- nutrition/fluid/bodyweight/workout calculations
- feature-specific business decisions
- sorting/order decisions

## List separator ownership

Row separators are owned by the reusable list primitive, not by each list item.

Approved separator behavior:

- The list may draw a top structural boundary when it starts a structural region.
- The list draws full-width 1px Pebble separators between rows.
- The list may draw a bottom boundary only when it is followed by another block or must behave as a closed list region.
- Full-screen scroll lists such as Food & Drink Library do not need a decorative final divider at the bottom by default.
- Row separators do not change during row pressed state.

Reason: separators describe the list structure. Individual list items should own their content layout and interaction state, not the structural rules for their siblings or parent list.

Rules:

- Do not make every list item carry a default bottom border as part of its reusable item contract.
- Do not let feature adapters decide separator behavior ad hoc.
- Do not create decorative separators without structural purpose.
- Do not create duplicate top boundaries after an existing approved structural boundary.
- Do not use content-inset separators in the default object-list primitive.
- Do not define separate row-separator color or 0.5px row-separator rules in v1.

## Object-list state placement

For full-screen object-management lists, loading, empty, and error states belong inside the list region.

Approved structure:

```text
RIGHT-ALIGNED TEXT ACTION

────────────────────────────────────
No active items
```

or:

```text
RIGHT-ALIGNED TEXT ACTION

────────────────────────────────────
Loading items
```

or:

```text
RIGHT-ALIGNED TEXT ACTION

────────────────────────────────────
Could not load items
RETRY
```

Reason: `No matching items`, `No active items`, `Loading items`, and list-level load errors describe the state of the list, not a separate screen message.

Rules:

- The list top boundary remains visible before the state message when the list region exists.
- State text is left-aligned to the list grid.
- State text uses the dedicated list-state typography role.
- Empty/no-results/loading states use secondary text color.
- Error states use the error token.
- The state message uses density-based top padding after the list boundary: compact 24px, comfortable 32px.
- Do not add dedicated list-state bottom padding in v1.
- Use short, factual, instrument-like wording by default.
- Use full available list width with natural wrapping; do not introduce a special max-width rule in v1.
- Do not remove the list region just because there are no rows.
- Do not render object-list states as unrelated screen-local blocks above or outside the list primitive.
- Do not use decorative empty illustrations, cards, large hero messages, or skeleton rows by default.

Approved default wording:

- `No active items`
- `No archived items`
- `No matching items`
- `Loading items`
- `Could not load items`

Food & Drink Library uses:

- active scope empty: `No active items`
- archived scope empty: `No archived items`
- search no-results: `No matching items`

Domain-specific wording is allowed only when it improves clarity without becoming narrower than the actual object model.

If the list has a real retry handler, show a quiet `RETRY` text action inside the list-state region. If no retry handler exists, show only the error text.

Retry action rules:

- left-aligned with the list state text
- 8px gap after the state text
- approved action typography
- no filled button
- no icon
- no card/panel
- no emotional app-copy

Design-system responsibility ends at placement: if the user changes search/scope while an error is visible, the data/use-case layer decides whether the state remains error, switches to loading, or resolves. The styleguide only says that visible error + retry belongs inside the list-state region.

## Loading behavior

Object-list loading skeletons are not part of the default v1 pattern.

Default v1 object-list behavior:

- no skeleton rows
- use short list-state text only if loading state is actually visible long enough to matter

Food & Drink Library:

- no skeleton rows in v1

Reason: Myoria is local-first / on-device and backed by SQLite/use cases, so normal object-list loading should usually be fast. Skeleton rows would likely add generic app decoration without solving a real network-delay problem.

If a future screen has genuinely slow computation, import, sync, or remote loading, it needs a separate loading pattern decision.

## Reusable list item primitive

Use the approved list item pattern:

```text
Item name                                      >
serving · CONTRIBUTION
```

The reusable list item primitive owns:

- first-line title placement
- trailing chevron placement, when navigable
- second-line metadata placement, when metadata exists
- row vertical padding
- row minimum height
- title/meta gap
- title-only vertical centering
- pressed/disabled visual state hooks
- touch target behavior

Feature/domain code may supply:

- title text
- metadata text parts
- contribution label
- state flags
- press handler
- accessibility label
- optional supported variants after they are approved by the design system

### Row title

Rules:

- Row title uses the row-title typography role.
- Row title is always one line in the default object-list row primitive.
- Row title truncates at the end.
- Title-only rows use the same row-title typography.
- Long full names belong on detail screens or future approved row variants, not default object-list rows.

### Row metadata

Approved metadata order:

```text
status prefix → serving amount → contribution
```

Normal examples:

```text
350 ml · NUTRITION + FLUID
100 g · NUTRITION
```

Archived examples:

```text
ARCHIVED · 350 ml · NUTRITION
ARCHIVED · 350 ml · NUTRITION + FLUID
```

Rules:

- Metadata uses the row-meta typography role.
- Metadata is always one line in the default object-list row primitive.
- Metadata truncates at the end if needed.
- Title and metadata live inside the same content block and both truncate before the fixed chevron zone.
- Metadata should stay short by contract.
- Use `·` to separate metadata groups.
- Use `+` inside a combined contribution label such as `NUTRITION + FLUID`.
- Use `|` only for compact scope selectors, not row metadata.
- Do not use placeholders such as `—` or `No metadata`.
- If serving is missing, show status prefix and/or contribution only.
- If contribution is missing, show status prefix and/or serving only.
- If all metadata is missing, omit the metadata line.

### Archived rows

Archived is a persistent data state, not a disabled state.

Rules:

- Archived rows use normal readable row grammar.
- Archived state is shown through metadata prefix `ARCHIVED`.
- `ARCHIVED` is uppercase.
- `ARCHIVED` uses the same row metadata typography as the rest of the metadata line.
- Archived rows remain navigable by default.
- Archived rows keep the normal trailing chevron when navigable.
- Do not use opacity-first archived styling.
- Do not make archived rows look disabled unless a specific domain rule says the row is genuinely unavailable.

### Row chevron

Rules:

- Navigable rows show a trailing chevron.
- Non-navigable / disabled rows do not show a chevron by default.
- Archived but navigable rows keep the normal trailing chevron.
- Chevron uses muted tone by default.
- Chevron is vertically centered within the full row.
- Row content has a fixed 12px minimum gap before the trailing chevron zone.
- Chevron sits centered inside a fixed 24px trailing zone.
- The trailing zone stays inside the normal content grid.
- Do not use negative margin for row chevrons.
- Do not use primary chevrons on every row by default.

### Row interaction and states

Pressed row:

- whole row content uses the shared pressed opacity token
- separator line remains stable
- no background highlight
- no color shift
- no chevron color change
- no layout movement
- instant state change in v1; no transition duration or platform-default animation dependency

Disabled / non-interactive row:

- rare exception only
- title uses the approved disabled control color
- metadata uses the approved disabled control color
- no trailing chevron by default
- no press handler
- no pressed feedback
- no opacity-based disabled styling

Non-navigable rows use the same row layout as navigable rows, but without the trailing chevron.

Navigable rows use full-width row touch area:

- title/content area is pressable
- chevron zone is pressable as part of the row
- do not make only the chevron tappable

### Row accessibility

Navigable object-list rows should expose an accessibility label based on visible row content.

Default:

- title + metadata, when metadata exists
- title only for title-only rows
- title + archived metadata for archived rows

Feature/domain code may provide a more precise accessibility label, but should not expose less meaningful information than the visible row content.

Default object-list rows do not define an accessibility hint. Feature/domain code may provide a hint only when the row action is not obvious from the row context.

Navigable object-list rows use a context-aware accessibility role:

- default: `button`
- feature/domain code may override only when a row is genuinely link-like or has a more specific approved interaction role
- non-interactive rows do not expose an interactive role

## Object-list behavior boundaries

### Sorting and ordering

Object-list row ordering is not defined by the design system.

Sorting/order is owned by the feature/use-case/domain layer. Alphabetical, recent-first, relevance-based, archived-first, or domain-specific sorting are product/data decisions.

### Grouping

Grouped object lists are context-based.

Default v1 object-list behavior:

- no group headers
- no ABC grouping
- no category grouping
- no sticky group headers

If alphabetical/category grouping is needed later, define a separate grouped-list pattern. Do not add local ad hoc group headers inside default object-list screens.

### Internal labels and counts

Default v1 object-list behavior:

- no extra `ITEMS`, `RESULTS`, or `LIST` label after the list top boundary
- no visible result count
- no count appended to `ACTIVE` / `ARCHIVED` by default

A separate section-label or count pattern may be needed only when a screen has multiple distinct list regions, search-heavy behavior, multi-select, bulk management, or analytics-like requirements.

### Hidden or inline row actions

Default v1 object-list behavior:

- no swipe actions
- no long-press actions
- no inline secondary row actions
- no row-level action toolbar
- no hidden destructive actions

Food & Drink Library v1:

- no swipe archive/delete actions
- no long-press archive/delete/context menu actions
- no inline EDIT / ARCHIVE / DELETE / RESTORE actions inside rows

Important object-management actions should live in detail screens or explicit action flows by default. Do not define detail-screen action styling in the object-list contract; detail screen actions require a separate screen-composition/action-pattern decision later.

### Selection, hover, and focus

Default v1 object-list behavior:

- no selected row state
- no current row state
- no Function Yellow selected row marker
- no hover state
- no focus visual styling

Selection/current state requires a separate approved selection-list pattern later. Keyboard/web focus treatment may be needed later, but it should be solved as a dedicated accessibility/input-modality pattern, not as an ad hoc object-list visual rule.

## Must-not-do rules

- Do not solve similar object-list screens with custom screen-local layouts.
- Do not rebuild lists feature-by-feature when an approved list/list-item primitive exists.
- Do not attach list-boundary responsibilities to action components.
- Do not make list items own default sibling separators.
- Do not let feature adapters decide separator behavior ad hoc.
- Do not render object-list empty/loading/error states as unrelated screen-local blocks outside the list primitive.
- Do not move create actions into headers unless a specific screen-composition decision approves it.
- Do not use floating action buttons.
- Do not use plus icons by default for create actions.
- Do not create filled CTA buttons for normal object-list create actions.
- Do not use cards, surfaces, or shadows to separate list management zones.
- Do not add divider lines decoratively; use them only when they mark a functional boundary.
- Do not add skeleton rows, grouped-list headers, result counts, hover states, selected states, swipe actions, long-press actions, or inline row action toolbars to default object-list screens without a separate approved pattern.
