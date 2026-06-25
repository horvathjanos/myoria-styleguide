# MYORIA-496 Add Food Selected Step Form Grammar

## What Was Migrated

MYORIA-496 tightens the Add Food selected-item confirmation step so its visible
form structure follows the Core Tracking V1 shared form grammar.

The selected step is the screen shown after choosing a catalog item from Add
Food recent/search results or after returning from the MYORIA-495 missing-item
create flow. It lets the user confirm amount and unit before logging the item.

## Primitives And Contracts Used

The selected step uses existing shared form primitives from `src/ui/shared/form`:

- `MyoriaFormField` for Selected food, Amount, and Unit field structure
- `MyoriaTextInput` for the numeric amount line input
- `MyoriaOptionGroup` for the unit selector
- `MyoriaFormActionRow` for Cancel plus the log action

The selected food identity remains compact, token-backed text. Mixed
nutrition + fluid items still show `Also logs Fluid`.

## Behavior Preserved

- Add Food recent/search behavior is unchanged.
- Selecting a nutrition-only item still opens the amount/unit confirmation step.
- Selecting a mixed nutrition + fluid item still opens the same confirmation
  step and uses `Log food and fluid` copy.
- Logging still uses the existing selected Add Food submit path.
- MYORIA-495 Add Food no-result Create Item return still lands on this selected
  step with the created item selected.
- Cancel remains wired to the existing Add Food cancel behavior.

## Intentionally Not Changed

- No Add Food search/recent redesign.
- No Food & Drink Library create/detail/edit/archive behavior changes.
- No auto-log behavior after creating an item.
- No domain, application, persistence, schema, migration, seed, or read-model
  changes.
- No token value changes and no token allowlist changes.

## Accepted V1 Debt

- The broader Add Food route still uses its existing screen/header rhythm.
- The Add Food search/recent picker remains a separate contracted surface.
- The shared primary action row remains the current V1 form action grammar even
  though later form contract work may refine button tone globally.
