import type { ReactElement } from 'react';

import { ListRow, StatePreview } from '../../components';
import { StyleguidePage } from '../../shell/StyleguidePage';

export function StatesPage(): ReactElement {
  return (
    <StyleguidePage
      title="State grammar"
      description="States stay calm, textual, and local to the relevant screen or component."
    >
      <div className="catalog-stack">
        <StatePreview tone="loading">Loading items</StatePreview>
        <StatePreview tone="empty">No active items</StatePreview>
        <StatePreview tone="empty">No archived items</StatePreview>
        <StatePreview tone="error">Could not load library items.</StatePreview>
        <div className="my-warning-panel">
          <strong>Possible duplicate</strong>
          <span>NÖM PRO 35 Protein Drink Chocolate already exists.</span>
        </div>
        <div className="my-error-panel">
          <strong>Save failed</strong>
          <span>
            Keep the message near the failed action or affected field.
          </span>
        </div>
        <div className="my-list">
          <ListRow
            archived
            label="Archived food"
            meta="100 g · NUTRITION"
            title="Archived food"
          />
          <ListRow
            disabled
            label="Linked source unavailable"
            meta="Cannot open this source from here"
            title="Linked source unavailable"
          />
        </div>
        <p className="my-linked-unavailable">
          Linked-unavailable state must not fake a cross-domain record or
          navigation path.
        </p>
      </div>
    </StyleguidePage>
  );
}
