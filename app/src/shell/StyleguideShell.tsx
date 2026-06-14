import { useEffect, useState, type ReactElement, type ReactNode } from 'react';

import {
  DEFAULT_STYLEGUIDE_SCREEN_ID,
  isStyleguideScreenId,
  styleguideNavGroups,
  type StyleguideHref,
} from '../navigation';

type StyleguideShellProps = {
  children: ReactNode;
};

function resolveCurrentHref(): StyleguideHref {
  const hash = window.location.hash.slice(1);
  const screenId = isStyleguideScreenId(hash)
    ? hash
    : DEFAULT_STYLEGUIDE_SCREEN_ID;

  return `./react.html#${screenId}`;
}

export function StyleguideShell({
  children,
}: StyleguideShellProps): ReactElement {
  const [currentHref, setCurrentHref] =
    useState<StyleguideHref>(resolveCurrentHref);

  useEffect(() => {
    function updateCurrentHref() {
      setCurrentHref(resolveCurrentHref());
    }

    window.addEventListener('hashchange', updateCurrentHref);

    return () => {
      window.removeEventListener('hashchange', updateCurrentHref);
    };
  }, []);

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
