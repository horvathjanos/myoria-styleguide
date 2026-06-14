import type { ReactElement } from 'react';

import { Measurement } from '../../components';
import { StyleguidePage } from '../../shell/StyleguidePage';

export function MeasurementsPage(): ReactElement {
  return (
    <StyleguidePage
      title="Measurements"
      description="Numbers use the mono stack where precision matters; units stay visually quieter and adjacent."
    >
      <div className="catalog-stack">
        <Measurement value="861 / 2300" unit="kcal" />
        <Measurement value="550 / 3000" unit="ml" />
        <span className="sg-note">
          Fluid values stay exact in Today; do not lossy-round ml.
        </span>
        <Measurement value="73.5" unit="kg" />
        <span className="my-list-row-meta">100 g</span>
        <span className="my-list-row-meta">350 ml</span>
      </div>
    </StyleguidePage>
  );
}
