import { useEffect, type ReactElement, type ReactNode } from 'react';

import {
  getStyleguideRouteHref,
  styleguideNavGroups,
  type StyleguideRouteId,
} from '../styleguideRoutes';

type StyleguideShellProps = {
  children: ReactNode;
  currentRouteId: StyleguideRouteId;
};

export function StyleguideShell({
  children,
  currentRouteId,
}: StyleguideShellProps): ReactElement {
  useEffect(() => {
    document.dispatchEvent(new Event('styleguide:rendered'));
  }, []);

  return (
    <main className="sg-page">
      <nav className="sg-nav" aria-label="Styleguide navigation">
        <strong className="sg-brand">
          <a href={getStyleguideRouteHref('home')}>Myoria UI Styleguide</a>
        </strong>

        {styleguideNavGroups.map((group) => (
          <div className="sg-nav-group" key={group.title}>
            <span className="sg-nav-title">{group.title}</span>
            {group.links.map((link) => {
              const isCurrent = link.routeId === currentRouteId;

              return (
                <a
                  aria-current={isCurrent ? 'page' : undefined}
                  className={isCurrent ? 'is-current' : undefined}
                  href={getStyleguideRouteHref(link.routeId)}
                  key={link.routeId}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        ))}
      </nav>

      {children}
    </main>
  );
}
