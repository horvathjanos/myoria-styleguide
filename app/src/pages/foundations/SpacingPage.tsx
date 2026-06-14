import type { ReactElement } from 'react';

import { StyleguidePage } from '../../shell/StyleguidePage';

const spacingSamples = [
  [4, '4 px'],
  [8, '8 px'],
  [12, '12 px'],
  [16, '16 px'],
  [24, '24 px'],
  [32, '32 px screen padding / section spacing'],
  [48, '48 px major rhythm'],
  [64, '64 px large header gap'],
  [44, '44 px minimum touch target'],
] as const;

export function SpacingPage(): ReactElement {
  return (
    <StyleguidePage
      title="Spacing"
      description="Small scale for measured rhythm, screen padding, sections, rows, and touch targets."
    >
      <div className="catalog-stack">
        {spacingSamples.map(([width, label]) => (
          <div className="spacing-sample" key={label}>
            <span className="spacing-bar" style={{ width }} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </StyleguidePage>
  );
}
