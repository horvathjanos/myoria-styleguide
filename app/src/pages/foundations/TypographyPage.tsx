import type { ReactElement } from 'react';

import { Measurement } from '../../components';
import { StyleguidePage } from '../../shell/StyleguidePage';

export function TypographyPage(): ReactElement {
  return (
    <StyleguidePage
      title="Typography"
      description="Approved type roles for root context, secondary screens, rows, actions, measurements, inputs, and inline feedback."
    >
      <div className="catalog-stack">
        <div className="sg-card">
          <p className="my-root-date">Tuesday, 2 June</p>
          <p className="sg-note">Root date only; no explicit Today title</p>
        </div>
        <div className="sg-card">
          <p className="my-secondary-screen-title">Food &amp; Drink Library</p>
          <p className="sg-note">
            Secondary screen context · 14 / 18 · sans 400
          </p>
        </div>
        <div className="sg-card">
          <span className="my-section-label">SEARCH</span>
          <p className="sg-note">
            Section label · 14 / 18 · condensed 500 uppercase
          </p>
        </div>
        <div className="sg-card">
          <span className="my-list-row-title">
            NÖM PRO 35 Protein Drink Chocolate
          </span>
          <p className="sg-note">Row title · 16 / 20 · sans 400</p>
        </div>
        <div className="sg-card">
          <span className="my-list-row-meta">350 ml · NUTRITION + FLUID</span>
          <p className="sg-note">Row meta · 13 / 17 · mono 400</p>
        </div>
        <div className="sg-card">
          <a className="my-text-action" href="#">
            CREATE ITEM
          </a>
          <p className="sg-note">
            Action text · 14 / 18 · condensed 500 uppercase
          </p>
        </div>
        <div className="sg-card">
          <Measurement value="861 / 2300" unit="kcal" />
          <p className="sg-note">
            Measurement value mono 24 / 28; unit sans 11 / 14
          </p>
        </div>
        <div className="sg-card">
          <input className="my-line-input" placeholder="Search items" />
          <p className="sg-note">Text input · 15 / 20 · sans</p>
        </div>
        <div className="sg-card">
          <input
            aria-label="Numeric input example"
            className="my-line-input my-line-input--numeric"
            readOnly
            value="350"
          />
          <p className="sg-note">Numeric input · 15 / 20 · mono</p>
        </div>
        <div className="sg-card">
          <p className="my-inline-error">Name is required.</p>
          <p className="my-inline-warning">Possible duplicate.</p>
          <p className="sg-note">Inline feedback · 13 / 18 · sans</p>
        </div>
      </div>
    </StyleguidePage>
  );
}
