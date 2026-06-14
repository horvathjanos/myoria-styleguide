import type { ReactElement } from 'react';

import { StyleguidePage } from '../../shell/StyleguidePage';

const contracts = [
  ['Design-system v1 draft', 'design-system-v1.md'],
  ['Color contract', 'color-contract-v1.md'],
  ['Typography contract', 'typography-contract-v1.md'],
  ['Spacing contract', 'spacing-contract-v1.md'],
  ['Readout contract', 'readout-contract-v1.md'],
  ['Progress-scale contract', 'progress-scale-contract-v1.md'],
  ['Screen composition contract', 'screen-composition-contract-v1.md'],
  ['Styleguide tooling contract', 'styleguide-tooling-contract-v1.md'],
] as const;

export function DesignSystemPage(): ReactElement {
  return (
    <StyleguidePage
      title="Design system"
      description="The approved contracts behind the rendered foundations, components, and screen previews."
    >
      <div className="sg-grid">
        {contracts.map(([label, href]) => (
          <article className="sg-card" key={href}>
            <h2>{label}</h2>
            <a className="my-text-action" href={href}>
              Read contract
            </a>
          </article>
        ))}
      </div>
    </StyleguidePage>
  );
}
