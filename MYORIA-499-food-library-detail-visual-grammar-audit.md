# MYORIA-499 Food Library Detail Visual Grammar Audit

## Status

- Ticket: MYORIA-499 / GitHub issue #487
- Scope: docs-first audit of Food & Drink Library detail visual grammar and
  lifecycle action/confirmation grammar
- Production UI touched: no
- Domain/application/persistence/schema/seed changes: no
- Token changes: no
- Style allowlist changes: no
- Generated output manual edits: no

## Scope

This audit reviews the current Food & Drink Library detail screen before any
detail-screen production UI alignment. It covers the read-only detail anatomy,
local edit/archive/restore actions, hide confirmation state, relationship to
the Food Library list and Create/Edit form grammar, V1 acceptance, and the
smallest safe follow-up implementation slice.

It does not implement a redesign, change archive/restore behavior, change Food
Library Create/Edit forms, or reopen Add Food, Fluid, Bodyweight, Workout, or
report behavior.

## Source Material Reviewed

- `docs/styleguide/MYORIA-498-core-tracking-v1-current-state-checkpoint.md`
- `docs/styleguide/MYORIA-487-core-tracking-v1-form-screen-grammar-contract.md`
- `docs/styleguide/MYORIA-491-food-library-create-edit-form-migration.md`
- `docs/styleguide/MYORIA-492-food-library-validation-visibility.md`
- `docs/styleguide/MYORIA-477-food-library-functional-qa-acceptance.md`
- `docs/styleguide/MYORIA-456-food-library-detail-form-audit.md`
- `docs/nutrition/unified-food-drink-library-vision.md`
- `src/ui/nutrition/FoodDrinkLibrary/FoodDrinkLibraryDetailScreen.tsx`
- `src/ui/nutrition/FoodDrinkLibrary/FoodDrinkLibraryScreen.styles.ts`
- `src/ui/nutrition/FoodDrinkLibrary/components/FoodDrinkLibraryRow.tsx`
- `src/ui/nutrition/FoodDrinkLibrary/FoodDrinkLibraryScreenContainer.tsx`
- `src/ui/nutrition/FoodDrinkLibrary/__tests__/FoodDrinkLibraryScreen.test.tsx`
- `src/ui/shared/form/index.ts`
- `src/ui/theme/styleguideContract.ts`

## Current Screen Anatomy

### Header And Back Behavior

The detail route renders `SecondaryHeader` with `Food & Drink Library` as the
back destination. The container routes this back action to the library list, not
to Today. This is contract-backed by the secondary-screen shell grammar and is
behaviorally correct for an object detail opened from the Food Library list.

### Title And Identity

The item name appears in `snapshotSummary` as `snapshotTitle`, with
contribution text below as `snapshotMeta`. Archived items append `Archived` to
the meta line. This is conceptually aligned with object-detail identity, but
the current title size is larger than the current `uiTypography.screenTitle`
rhythm used by the more recently aligned Core Tracking surfaces.

### Contribution / Status Badges

The detail screen does not render visual badge components. It renders
contribution/status as text from `formatContribution(item)` plus optional
`Archived`. This avoids decorative chrome and is acceptable for V1, though a
future object-detail contract should decide whether contribution state belongs
in the identity line or a quiet status/readout section.

### Serving / Default Basis Display

Nutrition basis is shown as text at the top of the Nutrition summary via
`formatBasis(item)`. Serving metadata appears only when `serving.sizeG`,
`serving.sizeMl`, or `serving.unit` exists. That behavior matches the detail
screen role: full catalog values live on detail, while list rows stay minimal.

Visually, basis and serving are wrapped in card-style summary sections and
heavy value rows. The information is correct, but the treatment remains older
object-detail visual debt.

### Nutrition Values

Nutrition detail appears when `item.countsTowardNutrition` is true. The screen
shows basis text, a metric grid for kcal/protein/carbs/fat, and optional rows
for saturated fat, sugar, fiber, polyols, and salt when present.

The values are useful and complete for the current V1 detail role. The visual
grammar is the rough part: nutrition is a rounded bordered section containing
nested rounded metric cards with heavy `900` value typography. This reads more
like dashboard KPI cards than quiet catalog reference data.

### Fluid Contribution Display

Fluid detail appears when `item.fluid.countsTowardFluid` is true. It uses the
same `Metric` component for a single `Counts as fluid` value. The displayed
fact is correct, but the metric-card treatment is visually heavier than needed
for one catalog reference value.

### Aliases

Aliases appear only when the alias list is non-empty. Each alias is rendered as
plain text inside an `Aliases` summary section. This is behaviorally suitable
and avoids exposing technical alias metadata. The surrounding card treatment is
still legacy detail grammar.

### Notes

The user-facing note appears only when present. It is rendered as body text in
a `Note` summary section. This matches the product vision that detail should be
a user-readable summary and not a technical metadata screen. The card wrapper
remains non-blocking visual debt.

### Archived Status

Archived items show `Archived` in the identity meta and also show a `Status`
summary section with `Archived`. This is explicit and understandable. It may be
slightly duplicative, but it is not a blocker. A future object-detail contract
can decide whether archived status should live only in identity metadata or in
a quiet status section.

### Edit / Archive / Restore Actions

Detail actions live at the bottom of the scroll content:

- `Edit` opens the shared Create/Edit form route.
- Active items expose `Hide from logging`.
- Archived items expose `Restore to logging`.
- Lifecycle pending state disables restore or hide confirmation submit actions
  and changes labels to `Restoring...` / `Hide from logging...`.

The behavior and copy match the accepted lifecycle model. The visual treatment
uses large filled/bordered local buttons rather than the newer quiet local
action grammar or shared action primitives.

### Confirmation States

Active-item hide uses an inline confirmation box with this copy:

```text
Hide from logging?
This item will no longer appear in normal logging search.
Existing logs will not change.
```

The confirmation offers `Keep item` and `Hide from logging`. This is
behaviorally aligned with the product rule that archive/hide is not hard delete
and historical logs do not change. The visual treatment is a rounded bordered
confirmation card with heavy buttons; that remains design debt, not a
functional blocker.

Duplicate warning and dirty-discard confirmations belong to the Create/Edit
form route, not the detail route. Detail only links to edit and does not
directly render those states.

## Classification Table

| Area | Current implementation | Classification | Notes |
| --- | --- | --- | --- |
| Secondary header/back to list | `SecondaryHeader`, back label `Food & Drink Library` | Contract-backed | Matches parent-surface back behavior. |
| Full-screen background | `styles.screen.backgroundColor = uiColors.background` through `libraryColors.background` | Contract-backed | Uses the shared background role. |
| Item identity | Large item title plus contribution/status meta | Token-backed but visually rough | Concept is sound; title rhythm is louder than newer Core Tracking surfaces. |
| Contribution/status text | Text-only contribution and archived copy | Contract-adjacent | Avoids badge chrome; final placement needs object-detail contract. |
| Nutrition section | Rounded `summarySection` with nested `metricCell` cards | Legacy/design debt | Useful data, but card-in-card and heavy metric typography are old grammar. |
| Optional nutrition rows | Label/value rows inside Nutrition card | Token-backed but visually rough | Correct facts; values are heavy and section wrapper is legacy. |
| Fluid contribution | Single metric card | Legacy/design debt | Correct fact, heavier than needed for one read-only value. |
| Serving section | Rounded summary section with detail rows | Legacy/design debt | Correct metadata; should likely become quiet object-detail rows. |
| Aliases section | Text rows inside rounded summary section | Token-backed but visually rough | User-readable and conditional; wrapper is old card grammar. |
| Note section | Body text inside rounded summary section | Token-backed but visually rough | Good content model; card wrapper is old grammar. |
| Archived status section | Identity meta plus optional Status section | Needs contract | Explicit but duplicative; future contract should choose one treatment. |
| Edit action | Large filled primary local button | Legacy/design debt | Action is available; visual weight is too strong for object-local edit. |
| Hide from logging action | Large bordered secondary local button | Legacy/design debt | Behavior and copy are accepted; visual treatment is old. |
| Restore to logging action | Large bordered secondary local button | Legacy/design debt | Restore without confirmation is accepted; visual treatment is old. |
| Hide confirmation | Rounded bordered confirmation box with large buttons | Legacy/design debt | Copy and placement are understandable; should align with local lifecycle confirmation grammar later. |
| Error message | Local alert text in detail action area | Token-backed but visually rough | Local error placement is acceptable; padding/style remains older. |
| Duplicate warning / dirty discard | Not rendered on detail route | Not applicable | Owned by Create/Edit form route after `Edit`. |
| Interaction blockers | None found in source review | No functional blocker found | Manual QA should still verify reachability and text overlap on target device. |

## Comparison To Accepted Grammar

### Food Library List Grammar

The list is closer to current object-list grammar: it uses a secondary header,
quiet screen lead, underline search, active/archived scope controls, unframed
rows, dividers, and a chevron affordance. Detail keeps the same parent surface
and full-screen background but switches to stacked cards and large buttons.

The detail screen should not copy list rows, but it should inherit the same
quiet object-management tone: structural spacing, section labels, value rows,
and local text actions instead of filled card stacks.

### Food Library Create/Edit Form Grammar

Create/Edit has already moved to shared form primitives for fields, option
groups, validation text, and action rows. Detail has not. Detail is mostly
read-only, so it should not become a form; however, lifecycle actions and
confirmation states should reuse or explicitly align with shared action and
validation/confirmation grammar where it fits.

### Report-Day Detail/Delete Grammar

Logged-entry detail/delete screens use snapshot/readout grammar and local
destructive actions. Food Library detail is not an immutable logged-entry
snapshot, but it can borrow the quiet readout and lifecycle-confirmation
principles: facts first, subdued labels, no nested cards, factual confirmation
copy, and local actions that do not look like primary app CTAs.

### Shared Form / Action Primitives

`MyoriaFormActionRow` is available and already used by Create/Edit and Add Food
steps. The current detail actions are route-local buttons. A future slice can
either use the shared action row for the hide confirmation, or define a
small object-detail lifecycle action grammar if text actions are a better fit
than paired form buttons.

### Background Containment

The detail screen uses the shared background role and does not introduce a
contrasting whole-screen card. That part is accepted. The debt is inside the
scroll body: repeated rounded white sections, nested metric cards, and
confirmation cards create visual noise and possible awkward partial-card
scroll positions.

### No-Card / No-Shadow / No-Decorative-Surface Principles

The screen does not use shadows or decorative illustrations. It does use
card-like rounded bordered sections and nested cards for normal read-only
facts. That conflicts with the current direction for quiet Core Tracking
surfaces, but it is visual debt rather than a functional problem.

## Lifecycle Action And Confirmation Grammar

### Edit

`Edit` is visible and simple. It routes to the existing Create/Edit form through
the container. The issue is visual weight: a filled button makes object edit
look like a global primary action. Future detail grammar should make Edit a
quiet object action while preserving route behavior and dirty-discard behavior
inside the form.

### Archive / Deactivate

The accepted user-facing action is `Hide from logging`. It correctly opens a
confirmation before changing lifecycle state. The copy clearly states that the
item leaves normal logging search and existing logs will not change. The action
should remain behaviorally unchanged.

Visually, `Hide from logging` should likely become a destructive-adjacent local
text action or compact lifecycle action, not a large bordered button.

### Restore / Reactivate

The accepted user-facing action is `Restore to logging`. It runs without a
confirmation and keeps the user on detail. This matches the settled V1
lifecycle model. Visually, restore should be quiet and constructive, with
pending state preserved.

### Duplicate / Dirty Discard

Duplicate warning and dirty discard are form-route concerns. Detail should not
absorb them. Any future detail slice must avoid changing create/edit duplicate
warning, dirty-discard, validation visibility, or Save behavior.

### Destructive Confirmation Copy And Placement

The hide confirmation copy is accepted and factual. Placement inline near the
lifecycle action is reasonable. The visual container and action buttons are the
debt: they use old bordered card/button grammar rather than a quiet local
confirmation grammar.

## V1 Acceptance Decision

Current Food Library detail visual grammar does not block Core Tracking V1.

Accepted for V1:

- Header/back behavior.
- User-readable item identity.
- Contribution/status display.
- Nutrition, fluid, serving, aliases, note, and archived status visibility.
- Edit route access.
- Hide-from-logging confirmation behavior and copy.
- Restore-to-logging behavior.
- Local lifecycle error display.

Accepted as non-blocking design debt:

- Rounded bordered summary sections.
- Nested metric cards.
- Heavy detail value typography.
- Large filled/bordered local action buttons.
- Rounded bordered hide confirmation box.
- Slight archived-status duplication between identity and Status section.

No functional blocker was found from the source/doc review. This acceptance
should be revisited only if manual QA finds that controls are unreachable,
text overlaps essential controls, lifecycle actions cannot complete, or the
screen misleadingly implies that archive/hide deletes historical logs.

## Non-Blocking Design Debt

- Detail facts are currently grouped as cards rather than quiet object-detail
  sections.
- Nutrition metrics look like dashboard KPI cards instead of catalog reference
  facts.
- Fluid contribution uses the same heavy metric card despite being a single
  read-only value.
- Edit, hide, and restore actions are visually heavier than current local
  action grammar.
- Hide confirmation copy is good, but the box/button treatment is older.
- Detail and Create/Edit grammar are now visibly out of step because the forms
  use shared primitives and detail still uses route-local legacy actions.
- Current component tests do not directly exercise `FoodDrinkLibraryDetailScreen`
  rendering or lifecycle action styling; behavior is covered indirectly through
  container/use-case docs and tests.

## Blockers

No Core Tracking V1 functional blocker was identified in this audit.

Potential blocker conditions for future QA:

- Back from detail does not return to the Food Library list.
- Edit cannot be reached.
- Hide confirmation cannot be opened, canceled, or confirmed.
- Restore cannot be triggered for archived items.
- Pending lifecycle state leaves the item stuck.
- Detail text overlaps actions or prevents operation on the release device.
- Copy implies that hiding deletes or rewrites historical logs.

## Recommended Implementation Slice

Recommended next implementation slice: `MYORIA-500 — Align Food Library detail
visual grammar`.

Smallest safe scope:

- Keep `FoodDrinkLibraryDetailScreen` as the only production screen touched.
- Keep `FoodDrinkLibraryScreenContainer` route behavior, archive/restore use
  cases, and all repository/application behavior unchanged.
- Keep `SecondaryHeader` and current back-to-list behavior.
- Replace rounded summary cards with quiet object-detail sections using
  existing token roles.
- Replace nested nutrition/fluid metric cards with quiet value/readout rows.
- Align Edit, Hide from logging, Restore to logging, and hide confirmation to
  existing shared action or local text-action grammar.
- Preserve existing lifecycle copy, pending labels, disabled states,
  accessibility labels, and local error handling.
- Add focused component tests for detail anatomy and lifecycle actions if the
  implementation slice touches production UI.

Do not include:

- Food Library Create/Edit form changes.
- Add Food changes.
- Archive/restore semantics changes.
- Duplicate warning or dirty-discard changes.
- Token value or allowlist changes.
- Broad Food Library redesign.

## Manual QA Implications

No new manual QA is required for this docs-only audit.

Before any future detail UI alignment is accepted, manually verify on the
release device/simulator:

- active item detail opens from the active list
- archived item detail opens from the archived list
- back from detail returns to the Food Library list
- Edit opens the existing edit form with current item values
- Hide from logging opens the confirmation
- Keep item cancels the confirmation
- Confirm hide archives the item, keeps historical-log-preservation copy
  accurate, reloads the list, and keeps the user in context
- Restore to logging restores an archived item and keeps the user in context
- lifecycle pending labels/disabled states are understandable
- long item names, aliases, notes, optional nutrient rows, and mixed
  nutrition + fluid detail do not overlap actions

## Non-Goals

- No production UI changes in this slice.
- No token changes.
- No style allowlist changes.
- No generated output manual edits.
- No domain, application, persistence, schema, seed, migration, or read-model
  changes.
- No Add Food changes.
- No Fluid or Bodyweight changes.
- No Workout work.
- No Food Library Create/Edit form changes.
- No duplicate warning or dirty-discard changes.
- No archive/restore behavior changes.
- No broad redesign or route-specific hacks.

## Verification

Commands run for this docs-only audit:

- `pnpm format:check` — passed
- `git diff --check` — passed
- `git diff --cached --check` — passed
- `pnpm styleguide:build` — passed
- `pnpm styleguide:check` — passed
