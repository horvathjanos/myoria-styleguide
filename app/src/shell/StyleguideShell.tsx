import type { ReactNode } from 'react';

import type { StyleguideHref } from '../navigation';
import { styleguideNavGroups } from '../navigation';

type StyleguideShellProps = {
  children: ReactNode;
  currentHref: StyleguideHref;
};

export function StyleguideShell({
  children,
  currentHref,
}: StyleguideShellProps) {
  return (
    <main className="sg-page">
      <nav className="sg-nav" aria-label="Styleguide navigation">
        <strong className="sg-brand">
          <a href="./index.html">Myoria UI Styleguide</a>
        </strong>

        {styleguideNavGroups.map((group) => (
          <div className="sg-nav-group" key={group.title}>
            <span className="sg-nav-title">{group.title}</span>
            {group.links.map((link) => {
              const isCurrent = link.href === currentHref;

              return (
                <a
                  aria-current={isCurrent ? 'page' : undefined}
                  className={isCurrent ? 'is-current' : undefined}
                  href={link.href}
                  key={link.href}
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
