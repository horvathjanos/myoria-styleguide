import type { ReactElement, ReactNode } from 'react';

import type { StyleguideScreenId } from '../navigation';

type ScreenPreviewPageProps = {
  children: ReactNode;
  description: string;
  id: StyleguideScreenId;
  title: string;
};

export function ScreenPreviewPage({
  children,
  description,
  id,
  title,
}: ScreenPreviewPageProps): ReactElement {
  return (
    <section className="sg-screen-page" id={id}>
      <header className="sg-screen-page-header">
        <h2 className="sg-screen-page-title">{title}</h2>
        <p className="sg-screen-page-description">{description}</p>
      </header>

      {children}
    </section>
  );
}
