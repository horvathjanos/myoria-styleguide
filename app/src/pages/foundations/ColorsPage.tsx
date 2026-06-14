import type { CSSProperties, ReactElement } from 'react';

import { StyleguidePage } from '../../shell/StyleguidePage';

const colors = [
  [
    'Braun White',
    '#F0EDE5 · light background / inverted text',
    '--my-palette-braun-white',
  ],
  ['Warm Black', '#1A1A18 · primary text', '--my-palette-warm-black'],
  ['Anthracite', '#2E2E2C · secondary text', '--my-palette-anthracite'],
  [
    'Braun Grey',
    '#8A8A87 · muted text / inactive detail',
    '--my-palette-braun-grey',
  ],
  ['Pebble', '#C5C3BE · light structural line', '--my-palette-pebble'],
  [
    'Function Yellow',
    '#D4B018 · active / operational only',
    '--my-palette-function-yellow',
  ],
  [
    'Signal Red',
    '#C02820 · error / destructive / critical only',
    '--my-palette-signal-red',
  ],
  [
    'Dark housing',
    '#10100F · dark-mode extension',
    '--my-dark-extension-housing',
  ],
  [
    'Dark structural line',
    '#4A4A45 · dark-mode extension',
    '--my-dark-extension-line',
  ],
] as const;

export function ColorsPage(): ReactElement {
  return (
    <StyleguidePage
      title="Colors"
      description="Approved closed Rams/Braun color contract with rare functional signals."
    >
      <div className="sg-grid">
        {colors.map(([name, description, variable]) => (
          <div className="token-swatch" key={variable}>
            <span
              className="token-color"
              style={{ background: `var(${variable})` } as CSSProperties}
            />
            <strong>{name}</strong>
            <span>{description}</span>
          </div>
        ))}
      </div>
      <div className="sg-card">
        <h2>Intentionally absent</h2>
        <p className="sg-note">
          No generic surface, action, accent, warning, domain,
          screenshot-sampled, or opacity-mixed color tokens are part of v1.
        </p>
      </div>
    </StyleguidePage>
  );
}
