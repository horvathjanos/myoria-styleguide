# Report Day Contract V1

Status: MYORIA-442 styleguide source of truth for report day-mode production
parity slices.

This contract defines the day-mode grammar for the Nutrition, Fluid, and
Bodyweight report screens. It is styleguide/design-system work only; it does
not change production behavior.

Canonical styleguide route:

- `docs/styleguide/screens/report-day/index.html`

Source preview:

- `docs/styleguide/app/src/screens/ReportDayScreenPage.tsx`

## Purpose

Report day-mode screens are secondary daily inspection surfaces. They should
feel like one family while still allowing domain-specific facts.

The screen answers:

- What day am I inspecting?
- Which range mode is selected?
- What are this day's totals?
- Which entries contributed to the day?
- Where can I add another entry?
- Which rows can open entry detail?

## Shell

Use the shared secondary screen shell:

```text
[back chevron] Today

Report name
Selected day · timezone

DAY | WEEK | MONTH | YEAR | ALL
```

Rules:

- The secondary header label names the back destination: `Today`.
- The current screen identity belongs in `ScreenLead`.
- The selected day and timezone are metadata, not a second title.
- Report day examples use user-facing date text, for example `Tuesday, 2 June`.
- Do not show raw local-day ids or raw ISO timestamps in the visual grammar.
- Day/Week/Month/Year/All uses quiet text selection with pipe separators.
- Range modes are shown as available navigation targets in the styleguide, but
  range report implementation remains deferred.

## Summary

The day summary uses quiet measurement/readout facts, not dashboard cards.

Nutrition:

```text
900 kcal    93 g
ENERGY      PROTEIN

90 g        16 g
CARBS       FAT
```

Fluid:

```text
1.0 L       3
TOTAL       ENTRIES
```

Bodyweight:

```text
73.5 kg     2
LATEST      ENTRIES
```

Rules:

- Summary facts sit in the report body, below the mode selector.
- A simple structural line may introduce the summary.
- No filled cards, shadows, badges, icons, or dashboard KPI containers.
- Numeric values use the measurement/value hierarchy.
- Units are visually subordinate when present.
- Labels use section-label grammar.
- Domain differences are content differences only, not separate visual systems.

## Entries Section

Structure:

```text
ENTRIES                ADD FOOD
3 entries

────────────────────────────
row
row
row
```

Rules:

- The section title is `ENTRIES`.
- Entry count is quiet metadata.
- Add actions are quiet text actions, right-aligned in the section header.
- Add action copy is domain-specific: `ADD FOOD`, `ADD FLUID`, `ADD WEIGHT`.
- Do not use large filled Add buttons in report day mode.
- The list owns its top boundary.
- Empty state text appears inside the list region after the list boundary.
- Empty states do not duplicate the visible add action as a second CTA.

## Entry Rows

Interactive row structure:

```text
Title                         trailing fact    >
secondary detail if needed
Logged HH:mm
```

Nutrition rows may use a secondary macro line because nutrition entries have
several captured contribution facts:

```text
Greek yogurt                  320 kcal         >
31 g protein · 28 g carbs · 9 g fat
250 g · Logged 00:10
```

Fluid rows can be compact:

```text
Water                         330 ml           >
Logged 00:10
```

Bodyweight rows can be compact:

```text
Morning weigh-in              73.5 kg          >
Logged 07:12
```

Rules:

- Rows are quiet list rows, not rounded cards.
- Rows use list-owned separators.
- Row title is primary.
- Secondary text is readable supporting information.
- Time/meta text uses the row-meta role.
- Interactive rows show the fixed trailing chevron zone.
- The chevron zone defines the shared right-edge affordance axis.
- Non-interactive rows do not show a chevron and must not imply navigation.
- Do not make only the chevron tappable; the whole row is the target when a row
  is interactive.
- Do not use raw ISO timestamps.
- Use `Logged HH:mm` for report day row time metadata unless a later product
  decision needs date disambiguation.

## Empty States

Use calm list-state grammar:

```text
No entries for this day
Add a food entry when there is something to log.
```

Rules:

- Empty state lives inside the entries list region.
- The list top boundary remains visible.
- The add action remains visible in the section header.
- No card, illustration, icon, hero empty state, or second CTA.
- Copy may be domain-specific but should remain short and factual.

## Non-Interactive Rows

Some future report rows may represent linked or unavailable projections. They
can remain visible if they are useful, but they must not imply navigation.

Rules:

- No chevron.
- No navigable affordance.
- Keep the row readable.
- Explain unavailable context through secondary text when needed, for example
  `Linked from Nutrition`.
- Do not mute the whole row to the point that logged data looks disabled or
  lost.

## Deferred

- Production refactor is deferred to later tickets.
- Week / Month / Year / All range report implementation is deferred.
- A reusable production report-row primitive is deferred until at least one
  production parity slice proves the shape.
- Today, entry detail, Food Library, and domain/application behavior are out of
  scope for this contract.
- Dark-mode validation can continue through the global styleguide controls; no
  dark-mode-only report design is introduced here.

Recommended production slices:

- `MYORIA-443 implement Fluid Report day-mode parity from styleguide`
- `MYORIA-444 implement Bodyweight Report day-mode parity from styleguide`
- `MYORIA-445 implement Nutrition Report day-mode parity from styleguide`
