# MYORIA-430 Production Screen Grammar Parity Audit

Status: completed audit for the MYORIA-425 through MYORIA-429 screen grammar refinements.

This audit compares the private production app against the current styleguide contracts. It is intentionally narrow: it records parity, applies only a small mechanical root-header slot fix, and avoids new visual design work.

## Audited contracts

- `SecondaryHeader` back label semantics introduced/refined in MYORIA-425 through MYORIA-427.
- Root and secondary identity-to-body rhythm from MYORIA-428.
- Shared root/secondary top-context slot from MYORIA-429.
- Logged-entry snapshot grammar for nutrition, fluid, and bodyweight detail surfaces where production currently has equivalent screens.
- Styleguide checker coverage for the important styleguide invariants.

## Production parity findings

### Aligned

- `src/ui/primitives/SecondaryHeader.tsx` uses `backLabel` as a destination label, not as current screen identity.
- Production `SecondaryHeader` renders chevron and label as one `Pressable` back control.
- Visible report/detail back labels are destination-only:
  - `Today`
  - `Nutrition report`
  - `Fluid report`
  - `Bodyweight report`
  - `Food & Drink Library`
- Visible `Back to ...` copy is not rendered by the audited report/detail screens. It remains in accessibility labels, which is allowed.
- Nutrition, Fluid, and Bodyweight report screens place current screen identity below `SecondaryHeader` with report name plus local day/timezone metadata.
- Nutrition Entry Detail uses destination label `Nutrition report`, object summary first, separate energy readout, macro readouts, local delete confirmation/error behavior, and no visible edit affordance.
- Fluid Entry Detail uses destination label `Fluid report`, object summary first, and does not duplicate the amount as a separate Amount readout.
- Food & Drink Library Detail uses destination label `Food & Drink Library` and object-summary identity.
- Styleguide tokens, components, docs, and checker already enforce the shared top-context slot and secondary label grammar.

### Fixed in this slice

- Production Today root header now has the same 44px top-context lane height as `SecondaryHeader`.
- This is a mechanical parity fix against the MYORIA-429 styleguide contract. It does not change Today content, readouts, navigation, or domain logic.

### Deferred gaps

- The production Food & Drink Library list screen still uses its own header shape: a chevron-only back affordance with `Food & Drink Library` as the visible header title. The styleguide grammar expects a destination-only secondary header (`Today`) plus a separate current identity block below it.
- That Food & Drink Library gap is not fixed here because converting the screen to the newer secondary-header plus ScreenLead grammar would be visible product design work, and MYORIA-430 explicitly forbids inventing a library redesign or moving `Create item` speculatively.
- Production Bodyweight report currently exposes the selected-day report and add-weight workflow. A Body Weight Entry Detail production screen equivalent to the styleguide snapshot route was not found in this audit, so measurement-owned detail parity is deferred until that screen exists.
- Several older production report/list styles still use pre-styleguide visual choices such as cards, local colors, and route-local spacing. Those are broad production migration gaps, not MYORIA-430 fixes.

## Explicit non-changes

- No Food & Drink Library redesign was performed.
- `Create item` was not moved.
- No readout layouts were redesigned.
- No delete flows were redesigned.
- No domain/application behavior was changed.
- No route-specific pixel nudges, transforms, or absolute positioning were introduced for screen grammar parity.
