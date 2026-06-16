import type { ReactElement } from 'react';

type SecondaryScreenHeaderProps = {
  backLabel: string;
  backHref: string;
};

export function SecondaryScreenHeader({
  backLabel,
  backHref,
}: SecondaryScreenHeaderProps): ReactElement {
  return (
    <header className="my-screen-header">
      <a className="my-back-control" href={backHref} aria-label="Go back">
        <span className="my-chevron my-chevron--left" aria-hidden="true" />
        <span className="my-secondary-screen-title">{backLabel}</span>
      </a>
    </header>
  );
}
