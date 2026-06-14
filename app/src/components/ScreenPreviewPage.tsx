import type { ReactElement, ReactNode } from 'react';

type ScreenPreviewPageProps = {
  children: ReactNode;
  description: string;
  title: string;
};

export function ScreenPreviewPage({
  children,
  description,
  title,
}: ScreenPreviewPageProps): ReactElement {
  return (
    <section className="sg-screen-page">
      <header className="sg-screen-page-header">
        <h2 className="sg-screen-page-title">{title}</h2>
        <p className="sg-screen-page-description">{description}</p>
      </header>

      {children}
    </section>
  );
}
