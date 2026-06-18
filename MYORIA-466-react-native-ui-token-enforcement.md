# MYORIA-466 React Native UI Token Enforcement

## Status

- Ticket: MYORIA-466
- Scope: production React Native token enforcement, baseline checker, and UI
  family classification
- Production UI touched: yes, limited to safe token substitutions in primitives,
  Add Food picker/list rows, and Food & Drink Library list/search grammar
- Non-goal: mass migration of legacy screens, detail surfaces, forms, workout,
  settings/data utilities, or Today instrument internals

## Verdict

Production now has an explicit React Native styleguide contract mirror and a
runnable raw-style-value checker.

The repo should still not claim full production UI compliance. The checker
currently passes because existing debt is classified and allowlisted with
reasons. This is intentional: the new enforcement goal is to prevent future
silent drift while making the current compliance state visible.

## New Production Contract Source

New file:

- `src/ui/theme/styleguideContract.ts`

This file mirrors the current `docs/styleguide/tokens.css` grammar for React
Native. It is deliberately small and role-based:

- `uiPalette`
- `uiColors`
- `uiSpacing`
- `uiScreen`
- `uiList`
- `uiInput`
- `uiAction`
- `uiSeparator`
- `uiChevron`
- `uiTypography`
- `uiReport`

The older `src/ui/theme/myoriaTheme.ts` remains in place for legacy surfaces,
but it is not the styleguide contract source for new or newly aligned UI.

## Enforcement Script

New command:

```text
pnpm check:ui-styles
```

Implementation:

- `scripts/check-ui-style-tokens.mjs`
- `scripts/ui-style-token-allowlist.json`

The checker scans non-test production TypeScript/TSX files under `src/ui/**`.
It detects suspicious raw visual values including:

- `fontSize`
- `lineHeight`
- margin and padding properties
- `gap`, `rowGap`, `columnGap`
- `borderRadius`
- width/height/minHeight
- border widths
- positional nudges such as `top`, `left`, `right`, `bottom`
- raw hex colors, including TSX placeholder/icon colors

Allowed by default:

- `0`
- `1` only for border-line properties
- token source files
- test files and test utilities

Everything else must either use a token/primitive or be explicitly classified in
the allowlist.

Current baseline result:

```text
UI style token check passed.
Scanned 169 production UI files.
Allowed 2363 existing raw values in 52 classified files.
```

## Allowlist Rules

`scripts/ui-style-token-allowlist.json` is a debt register, not a hiding place.
Every entry must include:

- path
- classification
- reason category
- reason

Allowed reason categories:

- legacy screen awaiting contract
- missing RN token/primitive
- mechanical React Native/platform value
- temporary exception
- third-party/platform constraint
- intentionally retained legacy behavior

Allowed classifications:

- Compliant
- Mostly compliant with documented exceptions
- Functional but visually legacy
- Non-compliant / needs contract
- Unknown / needs deeper audit

New UI style work should shrink this file over time. Adding a new file to the
allowlist requires explaining why the value cannot be tokenized now.

## Safe Remediation Completed

The following values were replaced with styleguide contract tokens or primitives:

- `SecondaryHeader` spacing, touch target, pressed opacity, and back-label type
- `MyoriaChevron` dimensions, stroke dimensions, offsets, opacity, and colors
- Add Food picker row/search/title/status/list styles that directly map to the
  Add Food flow and list-row contracts
- Food & Drink Library list/search/screen/list-state styles that directly map
  to object-list grammar

Intentionally not changed:

- Add Food selected-food confirmation and edit/delete form controls
- Food Library detail and create/edit forms
- Fluid/bodyweight add/edit workflows
- Today instrument layout internals
- app shell/menu/tab grammar
- settings/data utility panels
- workout surfaces
- older daily/logging panels

## Production UI Family Classification

| Family                                 | Classification                                                   | Contract/token source                                                    | Notes                                                                                             |
| -------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| App shell / navigation shell           | Functional but visually legacy                                   | partial legacy `myoriaTheme`; future shell contract needed               | Menu, tabs, backdrop, and icon colors are allowlisted.                                            |
| Today                                  | Mostly compliant with documented exceptions                      | Today visual direction plus styleguide tokens; missing Today RN contract | Dense instrument values remain local by design until a focused Today pass.                        |
| Nutrition Report                       | Mostly compliant with documented exceptions                      | `report-day-contract-v1`, `styleguideContract`                           | Day/report grammar is aligned; selected-food/edit/delete workflows remain form/detail debt.       |
| Fluid Report                           | Mostly compliant with documented exceptions                      | `report-day-contract-v1`                                                 | Day/detail grammar is aligned; add/edit workflow controls remain legacy/domain-colored.           |
| Bodyweight Report                      | Mostly compliant with documented exceptions                      | `report-day-contract-v1`                                                 | Day/detail grammar is aligned; add-weight workflow placeholder/input values remain partially raw. |
| Add Food                               | Mostly compliant with documented exceptions                      | `food-add-flow-contract-v1`, `styleguideContract`                        | Picker/search/rows are tokenized where safe; confirmation form remains out of scope.              |
| Food & Drink Library list              | Mostly compliant with documented exceptions                      | `MYORIA-449`, list-row/screen styleguide grammar, `styleguideContract`   | List/search/shell values are partly tokenized; list-specific widths/nudges are documented.        |
| Food Library detail                    | Functional but visually legacy                                   | `MYORIA-456` audit only                                                  | Detail cards, metric cards, and local actions await a dedicated object-detail contract.           |
| Food item create/edit form             | Functional but visually legacy                                   | `MYORIA-456` audit only                                                  | Form inputs, toggles, basis controls, validation, and dirty-discard states await a form contract. |
| Entry detail family                    | Mostly compliant with documented exceptions                      | report/detail snapshot grammar                                           | Nutrition/fluid/bodyweight detail surfaces are quieter but still lack shared snapshot primitives. |
| Fluid entry detail                     | Mostly compliant with documented exceptions                      | report/detail snapshot grammar                                           | Detail is closer to the report family; linked/projection states remain local.                     |
| Bodyweight entry detail                | Mostly compliant with documented exceptions                      | report/detail snapshot grammar                                           | Detail is closer to the report family; direct edit remains a product decision.                    |
| Range placeholders                     | Mostly compliant with documented exceptions                      | `report-day-contract-v1`                                                 | Placeholder grammar is quiet and non-card; remaining raw values are allowlisted.                  |
| Workout surfaces                       | Non-compliant / needs contract                                   | none for current workout UI                                              | Explicitly deferred from Core Tracking V1 styleguide enforcement.                                 |
| Day detail / logbook                   | Functional but visually legacy                                   | none                                                                     | Needs a logbook/detail contract before migration.                                                 |
| Daily nutrition and old logging panels | Functional but visually legacy                                   | none                                                                     | Older functional panels remain allowlisted until replaced or contracted.                          |
| Goals / profile                        | Functional but visually legacy                                   | none                                                                     | Settings/profile form grammar needs a contract.                                                   |
| Import/export/dev utility panels       | Functional but visually legacy or Non-compliant / needs contract | none                                                                     | Utility and developer panels are classified instead of silently ignored.                          |
| Progress V1                            | Unknown / needs deeper audit                                     | none                                                                     | Not covered by the recent styleguide audits; needs a focused review.                              |

## Future UI Rule

Any production UI style change must map each new visual value to one of:

- `src/ui/theme/styleguideContract.ts`
- an existing production primitive
- a documented styleguide contract
- a justified allowlist entry with classification and reason

Raw local numbers or hex colors in production UI are suspicious by default.
If a contract is missing, the issue should say so explicitly and avoid
redesigning the surface piecemeal.

## Recommended Follow-Up

- Replace raw placeholder colors with a shared RN input/placeholder primitive.
- Define Food Library detail and create/edit form contracts before changing
  those surfaces.
- Define a Today RN instrument contract before tokenizing miniature readouts and
  progress marks.
- Define workout styleguide grammar before migrating live workout or workout log
  panels.
- Gradually shrink `scripts/ui-style-token-allowlist.json` as focused contracts
  and primitives land.
