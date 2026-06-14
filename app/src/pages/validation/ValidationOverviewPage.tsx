import type { ReactElement } from 'react';

import { StyleguidePage } from '../../shell/StyleguidePage';
import { getStyleguideRouteHref } from '../../styleguideRoutes';

export function ValidationOverviewPage(): ReactElement {
  return (
    <StyleguidePage
      title="Validation"
      description="Internal regression and stress-test surfaces for modes, primitives, edge cases, and layout behavior."
    >
      <div className="sg-grid">
        <article className="sg-card">
          <h2>Compact density</h2>
          <p className="sg-note">
            Compares comfortable and compact density using identical content and
            preview geometry.
          </p>
          <a
            className="my-text-action"
            href={getStyleguideRouteHref('compact-density')}
          >
            Open density validation
          </a>
        </article>
        <article className="sg-card">
          <h2>Progress scale</h2>
          <p className="sg-note">
            Exercises tick density, fill behavior, and over-target states.
          </p>
          <a
            className="my-text-action"
            href={getStyleguideRouteHref('progress-scale')}
          >
            Open progress validation
          </a>
        </article>
      </div>
    </StyleguidePage>
  );
}
