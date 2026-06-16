import type { ReactElement } from 'react';

type SecondaryScreenHeaderProps = {
  backHref: string;
  title: string;
};

export function SecondaryScreenHeader({
  backHref,
  title,
}: SecondaryScreenHeaderProps): ReactElement {
  return (
    <header className="my-screen-header">
      <a className="my-back-control" href={backHref} aria-label="Go back">
        <span className="my-chevron my-chevron--left" aria-hidden="true" />
        <span className="my-secondary-screen-title">{title}</span>
      </a>
    </header>
  );
}
