# Myoria Static Styleguide Tooling Contract V1

Status: Janos-approved static styleguide tooling decisions.

This document describes helper UI for the static browser-openable styleguide. It is not production Myoria app UI.

## Scope

The static styleguide may contain lightweight controls that make previewing the design system easier.

These controls are tooling only. They do not introduce production components or production interaction patterns.

## Tooling direction

The styleguide remains a static published preview, but the preferred authoring
surface for new screen previews is now the small React TypeScript app:

```text
docs/styleguide/react.html
docs/styleguide/app/**
```

The app is built with the minimal esbuild script:

```text
scripts/build-styleguide-app.mjs
```

Reasons:

- the styleguide is still a design-system reference, not a production React Native component workbench
- React TS removes duplicated shell/navigation markup for new previews
- static HTML output keeps the preview browser-openable and publishable as plain files
- existing CSS/tokens remain the visual source of truth
- shell consistency can be protected with repository checks instead of a new catalog framework

Storybook may be reconsidered later, but only after reusable React Native components exist and can be rendered through React Native Web with acceptable fidelity. A Storybook spike should supplement this styleguide first; it should not replace this reference by default.

Vite, Histoire, Fractal, Astro, 11ty, Docusaurus, Next, and similar catalog/static-site frameworks are out of scope for the current styleguide direction.

## React migration policy

Canonical for new screen preview authoring:

```text
docs/styleguide/app/**
```

Legacy references during migration:

```text
docs/styleguide/screens/*.html
docs/styleguide/components/*.html
docs/styleguide/validation/*.html
```

Rules:

- Add new screen previews in React TS by default.
- Existing static HTML previews remain valid design references until migrated.
- Migrate incrementally; do not mass-rewrite legacy HTML.
- Keep legacy HTML pages working while equivalent React previews are introduced.
- Do not create new standalone HTML screen previews under `docs/styleguide/screens/**` unless a documented exception is added.
- Component catalog and validation HTML pages may remain static until a specific migration slice approves moving them.
- React preview components are styleguide-only. They must not import production React Native UI, application use cases, persistence adapters, or app navigation.
- Existing CSS classes and tokens may be reused directly from React markup.
- Do not introduce production-ready shared UI primitives in the styleguide app unless a separate production migration decision exists.

## Hosted public preview

The static styleguide is published to a public GitHub Pages preview.

Published URL:

```text
https://horvathjanos.github.io/myoria-styleguide/
```

Source of truth:

```text
horvathjanos/Myoria
  docs/styleguide/**
```

Published snapshot repository:

```text
horvathjanos/myoria-styleguide
```

Rules:

- The private `horvathjanos/Myoria` repository remains the source of truth.
- The public `horvathjanos/myoria-styleguide` repository is a published snapshot only.
- Do not edit the public snapshot repository by hand.
- Changes to `docs/styleguide/**` in `Myoria` are published by the `Publish styleguide` GitHub Actions workflow.
- The workflow copies the contents of `docs/styleguide` into the public repository root.
- The public repository exists only to host the rendered static preview through GitHub Pages.
- The public repository does not grant reuse rights for the design system or source content.

Required secret in `horvathjanos/Myoria`:

```text
STYLEGUIDE_PUBLISH_TOKEN
```

The secret contains a fine-grained GitHub token with write access to:

```text
horvathjanos/myoria-styleguide
```

Minimum token permission:

```text
Contents: Read and write
```

Published repository legal note:

```text
Copyright © 2026 Janos Horvath. All rights reserved.
No license is granted for reuse, redistribution, copying, modification, or derivative work.
```

## Publish workflow

Workflow path:

```text
.github/workflows/publish-styleguide.yml
```

Triggers:

- push to `main` when `docs/styleguide/**` changes
- push to `main` when the publish workflow changes
- manual `workflow_dispatch`

Publishing flow:

```text
Myoria main
→ docs/styleguide changes
→ Publish styleguide workflow
→ public myoria-styleguide repository main
→ GitHub Pages
→ https://horvathjanos.github.io/myoria-styleguide/
```

Expected behavior:

- Normal styleguide development happens in `docs/styleguide/**`.
- The hosted preview updates automatically after relevant `main` commits.
- GitHub Pages may take a short time to refresh after the public repository is updated.
- The hosted preview is a convenience preview, not a production deployment surface.

## Shell guardrail

The static shell is protected by:

```text
pnpm styleguide:check
```

The check verifies that every browser-openable styleguide HTML page:

- loads `styleguide-controls.js`
- has exactly one `aria-current="page"` marker
- points relative `href` and `src` values at existing files
- uses the canonical sidebar navigation groups and link targets

The check also verifies that:

- `docs/styleguide/app/src/navigation.ts` matches the canonical navigation
- no new legacy HTML screen preview is added under `docs/styleguide/screens/**` without an intentional exception

This check is the preferred way to prevent duplicated navigation and page-local shell drift.

Visual smoke testing with Playwright is deferred until Playwright is already part of the repo or a dedicated visual-regression slice approves the dependency and workflow.

## Primitive catalog rules

Component catalog pages must use canonical primitive markup for the primitive they document.

Screen pages may compose existing primitives, but must not reimplement primitive markup locally when a canonical primitive already exists.

Divergence between component-page primitive usage and screen-page primitive usage is a bug unless it is documented as an intentional variant in the relevant contract or validation page.

## Global theme control

The static styleguide has one global light/dark theme switch near the top-level UI.

Behavior:

- applies to the whole styleguide
- changes the root `data-theme` value
- may persist the selected theme in browser storage
- persisted value is only preview convenience, not product logic

Visual form:

```text
THEME
LIGHT | DARK
```

Rules:

- use one global theme switch
- apply theme at root/styleguide wrapper level
- do not create separate light/dark duplicate previews for every component by default
- theme switching must not affect density mode
- theme and density remain independent axes
- no native select
- no toggle switch component
- no pill control
- no production app component introduced just for this

## Global density control

The static styleguide may have one global density switch near the global theme switch.

Behavior:

- applies to the whole styleguide
- changes the root `data-density` value
- may persist the selected density in browser storage
- persisted value is only preview convenience, not product logic

Visual form:

```text
DENSITY
COMFORTABLE | COMPACT
```

Default / fallback:

- comfortable

Rules:

- default density remains comfortable
- comfortable remains the canonical visual source of truth
- compact is an approved validation mode, not a separate primary design
- density switch applies root-level `data-density`
- density switch does not affect theme
- theme and density remain independent axes
- missing or invalid stored density falls back to comfortable
- this is static styleguide UI, not production app UI

## Global mode script scope

The static styleguide mode script may be loaded by every browser-openable styleguide HTML page.

Purpose:

- apply persisted `data-theme` after navigation
- apply persisted `data-density` after navigation
- keep screen/component/validation pages visually consistent with the selected global preview mode

Rules:

- loading the script on a page does not require showing the global controls on that page
- pages without visible controls still apply stored root mode values
- the visible global controls remain lightweight styleguide tooling
- do not treat persisted mode state as product logic
- do not add per-preview controls because the script is globally available

## Global control placement

Global styleguide controls are placed near the top of the styleguide page, below the main title / intro.

Approved placement:

```text
Myoria Styleguide

THEME
LIGHT | DARK

DENSITY
COMFORTABLE | COMPACT

Tokens
Components
Screens
Validation
```

Rules:

- place global styleguide controls once near the top
- theme control appears above density control
- controls are stacked vertically
- no sticky/fixed control bar in v1
- no horizontal toolbar layout in v1
- no per-preview theme controls
- no responsive control-toolbar behavior in v1
- keep global controls lightweight and styleguide-only

## Validation section

The static styleguide has a section named:

```text
Validation
```

Placement:

- at the end of the static styleguide

Reason:

- canonical previews remain separate from verification previews
- compact density, progress-scale experiments, and future dark-mode / edge-case validation can live there without duplicating every preview throughout the styleguide

Current content order:

```text
Validation
  Compact density
    Object-list
    Measurement/root screen
  Progress scale
    Plain line reference
    Open scale
    Over-target red marker
```

## Compact density validation

Compact density validation shows comfortable and compact previews stacked vertically.

Approved labels:

- `Object-list — comfortable`
- `Object-list — compact`
- `Measurement/root screen — comfortable`
- `Measurement/root screen — compact`

Rules:

- use the same mobile frame width as canonical screen previews
- use the same mock content between comfortable and compact counterparts
- do not shorten compact content to make it look better
- do not duplicate every styleguide screen in compact
- no local light/dark duplicate previews inside density validation
- density validation follows the current global styleguide theme

Object-list validation content:

- normal populated list state
- multiple rows
- normal title + metadata rows
- at least one longer title to test truncation
- at least one archived row
- trailing chevrons
- standard row separators

Measurement/root validation content:

- normal daily readout state
- Nutrition section
- Fluid section
- Bodyweight section
- Workout section
- short realistic measurement/readout content

## Progress scale validation

Progress scale validation is a separate validation page, not the canonical Today progress implementation yet.

Path:

```text
docs/styleguide/validation/progress-scale.html
```

Purpose:

- test the open measurement-scale progress direction visually
- compare it against the current plain progress line
- validate tick density, marker/gap size, and over-target detail placement before promoting the primitive into canonical screen previews

Required cases:

- plain progress line reference
- open scale partial progress
- open scale 100% progress
- calories over target with Signal Red end marker
- fat over target with Signal Red end marker

Rules:

- keep the validation page clearly labeled as validation/prototype work
- do not replace canonical Today progress lines until the visual validation is approved
- follow current global styleguide theme and density
- do not add local light/dark duplicate previews

## Must-not-do rules

- Do not treat styleguide tooling controls as production Myoria controls.
- Do not over-groom the static styleguide page UI as if it were production app UI.
- Do not duplicate every component or screen for every theme/density combination.
- Do not mix canonical previews and validation previews without labeling.
- Do not use persisted styleguide theme/density state as product logic.
