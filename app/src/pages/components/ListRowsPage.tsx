import type { ReactElement } from 'react';

import { ListRow } from '../../components';
import { StyleguidePage } from '../../shell/StyleguidePage';

const rows = [
  {
    label: 'Simple row, secondary information',
    meta: 'Secondary information',
    title: 'Simple row',
  },
  {
    label: 'Chicken breast, 100 g, nutrition',
    meta: '100 g · NUTRITION',
    title: 'Chicken breast',
  },
  {
    label:
      'NÖM PRO 35 Protein Drink Chocolate Extra Long Label Stress Test, 350 ml, nutrition and fluid',
    meta: '350 ml · NUTRITION + FLUID',
    title: 'NÖM PRO 35 Protein Drink Chocolate Extra Long Label Stress Test',
  },
  {
    label: 'Water, 500 ml, fluid',
    meta: '500 ml · FLUID',
    title: 'Water',
  },
] as const;

export function ListRowsPage(): ReactElement {
  return (
    <StyleguidePage
      title="List rows"
      description="Rows prioritize the title, keep chevrons on the trailing axis, and place metadata on the second line."
    >
      <div className="my-list">
        {rows.map((row) => (
          <ListRow key={row.title} {...row} />
        ))}
        <ListRow
          archived
          label="Archived item, 100 g, nutrition"
          meta="100 g · NUTRITION"
          title="Archived item"
        />
        <ListRow
          disabled
          label="Linked entry unavailable, original source cannot be opened here"
          meta="Original source cannot be opened here"
          title="Linked entry unavailable"
        />
        <p className="my-linked-unavailable">
          Linked-unavailable state: show the condition plainly; do not fake
          cross-domain navigation.
        </p>
      </div>
    </StyleguidePage>
  );
}
