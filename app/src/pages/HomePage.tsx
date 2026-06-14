import type { ReactElement } from 'react';

import { StyleguidePage } from '../shell/StyleguidePage';
import {
  getStyleguideRouteHref,
  styleguideNavGroups,
} from '../styleguideRoutes';

export function HomePage(): ReactElement {
  return (
    <StyleguidePage
      title="Myoria UI Styleguide"
      description="Canonical interface grammar, reusable components, screen previews, and internal validation surfaces."
    >
      <div className="sg-grid">
        {styleguideNavGroups.map((group) => (
          <article className="sg-card" key={group.title}>
            <h2>{group.title}</h2>
            <div className="catalog-stack">
              {group.links.map((link) => (
                <a
                  className="my-text-action"
                  href={getStyleguideRouteHref(link.routeId)}
                  key={link.routeId}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </StyleguidePage>
  );
}
