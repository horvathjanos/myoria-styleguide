# MYORIA-493 Core Tracking V1 Manual QA Closeout

## Status

- Ticket: MYORIA-493 / GitHub issue #481
- Scope: docs-only closeout note for recent Core Tracking V1 manual QA
- Production UI touched: no
- Domain/application/persistence behavior touched: no
- SQLite schema, migrations, or seed data touched: no
- Generated styleguide source touched: no
- Workout touched: no

## Purpose

This note records the manual QA evidence gathered after the recent Core
Tracking V1 form and Food Library fixes:

- MYORIA-489 Add Fluid / Add Weight form migration
- MYORIA-490 Add Food selected logging step migration
- MYORIA-491 Food Library create/edit form migration
- MYORIA-492 Food Library validation visibility fix

It is a closeout note, not a production change, design redesign, or replacement
for the full MYORIA-480 manual QA runbook.

## Overall Closeout Result

The tested Core Tracking V1 areas below are functionally passing based on the
recorded manual QA evidence. No blocker is recorded in this closeout for Add
Fluid, Add Weight, selected Add Food logging, or Food Library create/edit
basics after MYORIA-492.

Accepted visual and navigation debt remains documented separately and must not
be confused with a Core Tracking V1 functional blocker unless it prevents the
user from completing the tested logging, create, edit, or search flow.

## Tested Areas

| Area | Result | Evidence |
| --- | --- | --- |
| Add Fluid form | Pass | The form is functionally OK after MYORIA-489. Fluid logging writes through correctly, and Fluid report / Today summaries update. |
| Add Weight form | Pass | The form is functionally OK after MYORIA-489. Bodyweight logging writes through correctly, and Bodyweight report / Today summaries update. |
| Selected Add Food, nutrition-only item | Pass | Selecting and logging a nutrition-only catalog item works. Nutrition report and Today nutrition summary update after logging. |
| Selected Add Food, mixed nutrition + fluid item | Pass | Selecting and logging a mixed catalog item works. Nutrition and Fluid projections update their reports and Today summaries correctly. |
| Food Library navigation | Pass | Food & Drink Library is reachable from the Today overflow menu. |
| Food Library Create Item initial state | Pass | Create Item opens clean after MYORIA-492, with no red required-field validation and no global validation message on first open. |
| Food Library required-field behavior | Pass | Save remains disabled while required fields are empty, and required validation appears after interaction / blur. |
| Food Library create nutrition item | Pass | Creating a valid nutrition item succeeds, and the item appears in Food & Drink Library. |
| Created item Add Food availability | Pass | The created item appears in Add Food search results and can be selected. |
| Food Library edit existing item | Pass | Editing an existing created item succeeds. The edited name appears in Food & Drink Library and Add Food search results. |
| Food Library fallback row wording | Pass | Default basis-backed rows now show `Default 100 g` / `Default 100 ml` instead of misleading `Serving` fallback wording. |

## Accepted Debt

These items are accepted debt for this closeout and are not blockers by
themselves:

- Add Food selected form remains visually rough compared with the final desired
  Core Tracking form grammar.
- Food Library create/edit form is functionally OK but still visually long and
  not final.
- Header, back-label, title, and date rhythm remains inconsistent and is
  already classified as needing a separate shell/header contract.
- Food & Drink Library is currently exposed from the Today overflow menu, not
  from an Add Food no-result state.
- Food Library detail screen visual debt remains outside this closeout.
- Workout remains deferred and is not part of this manual QA closeout.

## Follow-Up Candidates

These are candidates for future issues, not MYORIA-493 implementation work:

- Define and implement the Add Food no-result -> Create Item -> return to Add
  Food flow. The remembered desired flow is that when a food is missing from
  Add Food search, the user is offered a path to create a new Food/Drink
  Library item and then ideally returns to the Add Food logging flow.
- Create the separate shell/header rhythm contract for root date rows, child
  back rows, screen titles, and object identity.
- Continue visual refinement of the selected Add Food form after the functional
  closeout remains stable.
- Continue visual refinement of the Food Library create/edit and detail
  surfaces without changing domain/application/persistence behavior.
- Add a dedicated Food Library no-result creation affordance only after the
  navigation/return contract is decided.

## Not Blockers For This Closeout

Do not treat these as blockers for MYORIA-493:

- The Add Food selected form looking less polished than final design intent.
- The Food Library create/edit form being long.
- Header/back/title/date rhythm inconsistency.
- Food Library entry point being Today overflow only.
- Absence of an Add Food no-result create path.
- Any future desire to return from Create Item directly into Add Food search.
- Workout remaining deferred.

## What Was Not Changed

- No production UI was changed.
- No tokens, token allowlists, styleguide route source, or generated styleguide
  source were changed.
- No domain, application, repository, SQLite, migration, schema, or seed data
  was changed.
- No Add Food no-result -> Create Item return flow was implemented.
- No opportunistic visual redesign was performed.

## Relationship To MYORIA-480

MYORIA-480 remains the full manual QA runbook. This closeout records the recent
manual QA result evidence for the form and Food Library slices that landed
after the runbook was created.

Future full release QA should still use MYORIA-480 as the runbook and may cite
this note as supporting evidence for the areas listed above.
