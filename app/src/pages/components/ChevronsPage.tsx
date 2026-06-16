import type { ReactElement } from 'react';

import { ListRow, SecondaryScreenHeader } from '../../components';
import { StyleguidePage } from '../../shell/StyleguidePage';

const chevrons = [
  ['Left muted', 'my-chevron my-chevron--left'],
  ['Right muted', 'my-chevron'],
  ['Left primary', 'my-chevron my-chevron--left my-chevron--primary'],
  ['Right primary', 'my-chevron my-chevron--primary'],
] as const;

export function ChevronsPage(): ReactElement {
  return (
    <StyleguidePage
      title="Chevrons"
      description="CSS mirror of the production MyoriaChevron primitive: left/right direction and muted/primary tone."
    >
      <div className="catalog-stack">
        {chevrons.map(([label, className]) => (
          <div className="chevron-demo-row" key={label}>
            <span>{label}</span>
            <span className={className} />
          </div>
        ))}
        <div className="sg-card">
          <h2>Back header usage</h2>
          <div style={{ marginBottom: 0 }}>
            <SecondaryScreenHeader
              backHref="#"
              backLabel="Food & Drink Library"
            />
          </div>
        </div>
        <div className="sg-card">
          <h2>Row trailing usage</h2>
          <ListRow
            label="NÖM PRO 35 Protein Drink Chocolate"
            meta="350 ml · NUTRITION + FLUID"
            title="NÖM PRO 35 Protein Drink Chocolate"
          />
        </div>
      </div>
    </StyleguidePage>
  );
}
