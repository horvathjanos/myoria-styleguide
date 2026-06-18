# MYORIA-463 Core Tracking V1 Gap Audit

## Status

- Ticket: MYORIA-463
- Scope: audit and roadmap documentation only
- Production UI touched: no
- Styleguide route/source touched: no
- Workout scope: deferred outside Core Tracking V1

## Executive Verdict

Core Tracking V1, excluding Workout, is close to usable but should not be called done yet.

The main Nutrition, Fluid, Bodyweight, Today, Food Library, goals, persistence, and import/export foundations exist on current `main`. The remaining risk is not a broad missing feature area. It is a small set of release decisions and QA proof points:

- whether Week/Month/Year/All report placeholders are acceptable for V1
- whether linked Nutrition + Fluid entries can remain read-only/unavailable from projection screens
- whether Bodyweight correction can remain delete-and-relog rather than direct edit
- whether goals can be user-configured opportunistically instead of seeded/defaulted
- whether import/export and manual simulator/device QA have passed a release checklist

No production code blocker was found that requires reopening the recent report/Add Food/Food Library visual alignment work. The smallest path to Core Tracking V1 is a decision and QA sequence first, followed by one or two focused implementation slices only if those decisions reject the current behavior.

## Audit Inputs

Source and docs reviewed:

- `README.md`
- `PRODUCT_REQUIREMENTS_DOCUMENT.md`
- `MVP_ROADMAP.md`
- `DATA_MODEL.md`
- `docs/development/codex-implementation-guardrails.md`
- `docs/styleguide/MYORIA-456-food-library-detail-form-audit.md`
- `src/ui/today/**`
- `src/ui/nutrition/**`
- `src/ui/fluid/**`
- `src/ui/bodyweight/**`
- `src/ui/goal/**`
- `src/ui/export/**`
- `src/ui/import/**`
- `src/application/nutrition/**`
- `src/application/fluid/**`
- `src/application/bodyweight/**`
- `src/application/food/**`
- `src/application/goal/**`
- `src/application/export/**`
- `src/application/import/**`
- relevant SQLite migration and persistence test coverage by search

This audit is based on static source/test review. It does not claim a fresh simulator visual QA pass.

## Current Completed Areas

### Today

Classification: Should-have complete enough for V1.

Today is implemented as the production root surface for current-day tracking. It shows nutrition, fluid, bodyweight, goal/target context, quiet workout state, report navigation, Food & Drink Library, and Settings/Data access. Existing tests cover labels, row grammar, target copy, bodyweight logged/not-logged states, fluid liter grammar, report navigation, and the library/settings ordering.

V1 condition: Today still needs to be included in final manual QA, especially after app restart and local-day changes.

### Nutrition

Classification: Core complete, with linked-entry caveat.

Implemented areas:

- deterministic manual food logging
- Add Food recent/search flow
- selected catalog food logging
- mixed Food + Drink Add Food logging through the canonical mixed boundary
- day report rows and totals
- entry detail snapshots
- manual nutrition entry edit
- nutrition entry soft delete
- catalog-backed rows shown as read-only where editing is unsupported
- linked rows marked unavailable for projection-specific edit/delete
- local validation, submit errors, dirty discard, and delete confirmation coverage
- SQLite/read-model tests for active totals, deleted filtering, manual snapshots, catalog-backed rows, and linked projection availability

V1 condition: Manual nutrition edit/delete looks complete enough. Linked mixed entries require an explicit V1 decision because the current behavior intentionally hides projection-specific edit/delete and explains that linked support is not available yet.

### Fluid

Classification: Core complete, with linked-entry caveat.

Implemented areas:

- Add Fluid workflow from report day
- preset/type and amount input
- amount-only edit workflow
- entry detail snapshot
- delete workflow
- linked mixed fluid rows display with read-model names
- mixed/unknown entries hide edit and delete actions
- linked delete refusal without refetching
- local validation, pending, discard, refresh-failure, and duplicate-submission coverage
- application tests for logging, amount update, delete, daily totals, sorting, and linked projection availability

V1 condition: Normal fluid entries have enough edit/delete coverage. Linked mixed entries inherit the same decision risk as Nutrition.

### Bodyweight

Classification: Core logging/delete complete; direct edit is a Should-have decision.

Implemented areas:

- bodyweight logging with kg input
- selected-day/report day entry display
- add-weight workflow
- entry detail snapshot
- delete workflow from report detail and selected-day surface
- validation, submit errors, pending state, dirty discard, and delete confirmation coverage
- application tests for kg/lb canonicalization, occurred-at handling, source/confidence/protocol/note fields, delete, selected-day filtering, same-time ordering, and local-day boundaries

Known gap: Bodyweight entry detail intentionally has no visible Edit action. Correction is possible by deleting and logging again, but that is less direct than Nutrition and Fluid.

V1 condition: Decide whether delete-and-relog is acceptable for Bodyweight V1. If not, add a focused Bodyweight edit slice.

### Food Library Basics

Classification: Functionally complete enough for V1; visual debt remains non-blocking.

Implemented areas:

- active/archived list scopes
- search
- overflow-safe catalog rows
- create item
- edit item
- validation near fields
- duplicate warning that still allows save
- archive/hide and restore lifecycle
- aliases, serving metadata, nutrition contribution, fluid contribution, and mixed item support
- repository loading and use-case tests for create/update/archive/restore behavior

V1 condition: Food Library detail and form grammar is visually behind current production grammar, but MYORIA-456 already classifies that as design-system debt rather than a V1 functional blocker.

### Goals / Targets / Settings

Classification: Basic user-configurable support exists; default policy is Unknown / needs confirmation.

Implemented areas:

- active goals application use cases
- goal creation and superseding active goals of the same type
- Today target display paths
- UI panel for calories, protein, bodyweight, and training priority goals

Known gap: The product decision for seeded/default targets versus user-configured-only targets is not documented as a Core Tracking V1 acceptance rule.

V1 condition: User-configurable goals can be enough for V1 if empty-goal states are accepted. If the app must feel preconfigured on first launch, define defaults in a focused slice.

### Persistence, Import, And Export

Classification: Foundation complete; release QA still required.

Implemented areas:

- SQLite migrations for the relevant tracking records
- nutrition food log snapshots
- mixed logged event linkage model
- soft-delete filtering paths
- v1 export JSON/CSV/AI handover summary bundle
- native share archive creation
- v1 JSON import preview, parsing, validation, and restore
- backward compatibility tests for omitted nutrition food logs and omitted legacy food entries

V1 condition: The code and tests provide a strong foundation, but a release candidate still needs manual export/import round-trip QA with Nutrition, Fluid, Bodyweight, Food Library, profile, and goals data.

## V1 Blockers

These are blockers to declaring Core Tracking V1 done, not necessarily blockers to continuing implementation.

### Blocker: Core Tracking V1 Acceptance Checklist

There is no single current checklist that says what "done" means for Core Tracking V1 after intentionally excluding Workout. Older docs still mention Workout and chat/AI as MVP expectations, while current implementation has moved toward structured tracking first.

Resolution: Create a release acceptance checklist that explicitly excludes Workout and defines minimum acceptable states for reports, corrections, goals, import/export, and manual QA.

### Blocker: Manual Release QA Has Not Been Recorded

The automated tests are broad, but V1 needs a recorded clean install, simulator/device, app restart, navigation, correction, and import/export pass.

Resolution: Run and document a manual QA pass before calling V1 complete.

### Unknown / Needs Confirmation: Linked Nutrition + Fluid Entry Lifecycle

Mixed Food + Drink items are logged through canonical linked data and appear in both Nutrition and Fluid projections. Current projection screens intentionally mark linked entries unavailable for edit/delete. This is tested and deliberate, but product acceptance is not settled.

V1 options:

- Accept current behavior: linked entries can be viewed, and projection-specific edit/delete is unavailable with explanatory copy.
- Require correction support: implement canonical linked-entry detail/edit/delete behavior in a focused slice.

If current behavior is accepted, this is not a blocker. If linked mixed entries must be correctable for V1, this becomes the highest-priority implementation blocker.

### Unknown / Needs Confirmation: Bodyweight Direct Edit

Bodyweight supports add and delete, but not direct edit. Delete-and-relog may be acceptable for private V1, but it is a weaker correction story than Nutrition and Fluid.

V1 options:

- Accept delete-and-relog for Bodyweight V1.
- Implement amount/timestamp edit for Bodyweight report detail.

If accepted, this is not a blocker. If direct correction is required, it is a focused implementation blocker.

## V1 Should-Haves

### Should-have: Explicit Range Report Decision

Week/Month/Year/All report tabs exist as quiet placeholders for Nutrition, Fluid, and Bodyweight. They are consistent and tested.

Recommendation: Accept range report placeholders for Core Tracking V1. Day reports plus Today provide the core tracking loop. Range aggregation, charts, and advanced analytics should be deferred unless the release definition specifically requires them.

### Should-have: Goal Defaults Decision

Goals are configurable, but the release should state whether an empty-goals first-run state is acceptable.

Recommendation: Accept user-configured goals for V1. Add seeded defaults only if first-run manual QA feels confusing without targets.

### Should-have: Import / Export Recovery QA

Automated coverage is meaningful, but V1 needs proof that a real export bundle can be generated, shared/saved, previewed, and restored in the app environment.

Recommendation: Make this part of release QA, not a broad feature redesign.

### Should-have: Documentation Alignment

Older docs still describe Workout and chat/AI as MVP expectations. The implementation direction is now Core Tracking V1 excluding Workout.

Recommendation: After acceptance decisions are made, update roadmap/readme language so the repo does not imply Workout blocks this milestone.

## V1 Non-Blocking Deferrals

### Defer: Workout

Workout is intentionally deferred as a separate milestone. It should not block Core Tracking V1.

Deferred scope includes:

- exercise library completion beyond current foundations
- active session state
- sets/reps/weights UX
- workout history
- progression tracking
- templates/plans
- live workout UX

### Defer: Range Reports Beyond Placeholders

Week/Month/Year/All report aggregation and charts can be deferred if placeholders are accepted. The current quiet placeholder grammar is adequate for a private V1 as long as the release checklist names it.

### Defer: Advanced Analytics And Charts

Advanced trends, chart polish, plateau detection, and insight surfaces are not required for Core Tracking V1.

### Defer: AI / Chat Integration

The product principle still names chat as an interface, but current Core Tracking V1 can ship as structured logging first. AI should remain deferred until structured flows and persistence are stable.

### Defer: Deep Food Library Redesign

Food Library detail and create/edit visual grammar can remain as known debt if create/edit/archive/restore flows pass functional QA.

## Design Debt Backlog

Known non-blocking design debt:

- Food Library detail still uses older card/action grammar.
- Food Library create/edit form still needs a long-form styleguide contract.
- Some settings/data panels use utilitarian form/button grammar that has not been harmonized with the latest report/list surfaces.
- Range report placeholders are visually acceptable but intentionally empty.
- Older roadmap docs still mix previous MVP language with the newer Core Tracking V1 milestone.

Do not treat these as blockers unless manual QA finds actual usability defects.

## Recommended Implementation Roadmap

Keep the roadmap decision-led and small. The first slices should reduce uncertainty before adding production code.

1. Define the Core Tracking V1 release acceptance checklist.
2. Decide that Workout is deferred and document the milestone boundary in current docs.
3. Decide whether range report placeholders are acceptable for V1.
4. Decide whether linked mixed entries can remain read-only/unavailable from projection screens.
5. Decide whether Bodyweight delete-and-relog is acceptable for V1 correction.
6. Run a focused manual QA pass on Today, Nutrition, Fluid, Bodyweight, Food Library, goals, import, and export.
7. Implement linked-entry lifecycle support only if the decision rejects current behavior.
8. Implement Bodyweight direct edit only if the decision rejects delete-and-relog.
9. Add or adjust tests for whichever focused implementation slices are chosen.
10. Update release docs and older roadmap/readme language to reflect the accepted Core Tracking V1 scope.

Estimated remaining issue count: 10 to 12 small issues.

If product decisions accept current linked-entry, Bodyweight, goals, and range-placeholder behavior, the remaining path is mostly QA and documentation. If they do not, expect 2 to 4 focused production issues before release.

## Suggested Issue Sequence

Do not create these automatically. They are recommended follow-up candidates.

1. `MYORIA-464 define Core Tracking V1 release acceptance checklist`
2. `MYORIA-465 decide range report placeholder acceptance for Core Tracking V1`
3. `MYORIA-466 decide linked Nutrition + Fluid entry lifecycle for V1`
4. `MYORIA-467 decide Bodyweight correction path for V1`
5. `MYORIA-468 run Core Tracking V1 manual simulator QA`
6. `MYORIA-469 verify Nutrition edit/delete/add-food release flows`
7. `MYORIA-470 verify Fluid edit/delete/linked release flows`
8. `MYORIA-471 verify Bodyweight add/delete/correction release flows`
9. `MYORIA-472 verify Food Library create/edit/archive release flows`
10. `MYORIA-473 verify goals/targets first-run and configured states`
11. `MYORIA-474 verify V1 import/export recovery round trip`
12. `MYORIA-475 align README and roadmap docs to Core Tracking V1 scope`

Recommended next slice: `MYORIA-464 define Core Tracking V1 release acceptance checklist`.

First possible production slice, if decisions require it: linked mixed-entry lifecycle support or Bodyweight direct edit. Do not start either until the acceptance decision is made.

## Release Readiness Checklist

Core Tracking V1 should not be called done until this checklist has been run and recorded.

### App And Persistence

- Clean install opens without migration errors.
- Existing install migration opens without data loss.
- App restart preserves Nutrition, Fluid, Bodyweight, Food Library, profile, and goals data.
- Local-day boundaries behave correctly around timezone-sensitive entries.
- Empty states are understandable on first launch.

### Today

- Today shows the current local day.
- Nutrition, Fluid, Bodyweight, and goal/target summaries render.
- Report navigation opens the intended report day screens.
- Food & Drink Library and Settings/Data remain reachable.
- Workout is visibly non-blocking or quiet enough for the deferred milestone.

### Nutrition

- Manual food logging works.
- Add Food default and search states work.
- Recent/search result rows remain overflow-safe, including long names.
- Catalog-backed selected food logging works.
- Mixed Food + Drink logging creates visible Nutrition and Fluid projections.
- Manual Nutrition entry detail opens.
- Manual Nutrition edit, cancel, validation, save, and delete work.
- Catalog-backed or linked read-only/unavailable behavior matches the accepted V1 decision.

### Fluid

- Add Fluid works with presets and custom amount.
- Fluid day totals update after add/edit/delete.
- Fluid entry detail opens for editable entries.
- Amount edit, cancel, validation, save, and delete work.
- Linked mixed Fluid rows follow the accepted V1 behavior.

### Bodyweight

- Add Weight works with validation and cancel.
- Bodyweight day/report state updates after add/delete.
- Bodyweight entry detail opens.
- Delete confirmation and delete work.
- Direct edit or delete-and-relog behavior matches the accepted V1 decision.

### Food Library

- Active and archived scopes switch correctly.
- Search works.
- Create nutrition-only, fluid-only, and mixed items if supported by the current form.
- Duplicate warning appears and still allows save.
- Edit preserves and updates item data.
- Archive/hide removes item from normal logging.
- Restore makes item available again.
- Historical logs remain intact after archive/hide.

### Goals / Targets

- Empty goal state is acceptable or defaults are present.
- Calories, protein, bodyweight, and training-priority goals can be set.
- Superseding a goal of the same type works without deleting history.
- Today reflects active targets as expected.

### Import / Export

- Export can generate JSON, CSV files, and summary for a selected day range.
- Native share/save flow opens successfully.
- Import preview rejects invalid files and unsupported versions.
- Import preview shows expected counts for a real export.
- Restore imports profile, goals, saved foods, nutrition logs, fluid entries, and bodyweight entries.
- Restored data appears in Today and report screens after app restart.

### Automated Checks

- `pnpm typecheck`
- `pnpm test`
- `pnpm format:check`
- `git diff --check`

## Risks And Unknowns

- Older docs still include Workout and chat/AI in MVP language, which can confuse release scope.
- Linked mixed-entry correction/delete is intentionally unavailable from projection screens; product acceptance is the key unknown.
- Bodyweight lacks direct edit; delete-and-relog may or may not satisfy correction expectations.
- Goals can be configured, but first-run defaults are not settled.
- Range placeholders are consistent and tested, but need explicit acceptance.
- Import/export has strong automated coverage but still needs real app-environment round-trip QA.
- Simulator/device visual QA was not performed in this audit.

## Final Recommendation

Proceed with `MYORIA-464 define Core Tracking V1 release acceptance checklist` before starting more production work.

After that, resolve the linked mixed-entry and Bodyweight correction decisions. If current behavior is accepted, Core Tracking V1 can likely move through QA/release documentation without another large implementation push. If either decision requires richer correction support, keep the implementation slices narrow and avoid reopening the broader report/Add Food/Food Library visual alignment tracks.
