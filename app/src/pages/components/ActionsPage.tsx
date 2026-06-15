import type { ReactElement } from 'react';

import { Action, TextAction } from '../../components';
import { StyleguidePage } from '../../shell/StyleguidePage';

export function ActionsPage(): ReactElement {
  return (
    <StyleguidePage
      title="Actions"
      description="Underlined text actions and quiet primary, secondary, destructive, and disabled button roles."
    >
      <div className="catalog-stack">
        <div className="sg-card">
          <h2>Text action roles</h2>
          <div className="my-button-row">
            <TextAction href="#">Create item</TextAction>
            <TextAction href="#" tone="destructive">
              Delete entry
            </TextAction>
          </div>
        </div>
        <div className="sg-card">
          <h2>Right-aligned action row</h2>
          <div className="my-action-row">
            <TextAction href="#" tone="destructive">
              Delete entry
            </TextAction>
          </div>
        </div>
        <div className="sg-card">
          <h2>Button roles</h2>
          <div className="my-button-row">
            <Action tone="primary">Save item</Action>
            <Action tone="secondary">Cancel</Action>
            <Action tone="destructive">Archive item</Action>
            <Action disabled tone="secondary">
              Disabled
            </Action>
          </div>
        </div>
        <div className="sg-card">
          <h2>Action-bearing header</h2>
          <header
            className="my-screen-header my-screen-header--with-action"
            style={{ marginBottom: 0 }}
          >
            <span className="my-screen-header-title-group">
              <a className="my-back-control" href="#">
                <span className="my-chevron my-chevron--left" />
              </a>
              <span className="my-secondary-screen-title">Edit item</span>
            </span>
            <a className="my-text-action my-header-action" href="#">
              SAVE
            </a>
          </header>
        </div>
      </div>
    </StyleguidePage>
  );
}
