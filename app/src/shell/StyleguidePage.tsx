import type { ReactNode } from 'react';

type StyleguidePageProps = {
  children: ReactNode;
  description: string;
  title: string;
};

export function StyleguidePage({
  children,
  description,
  title,
}: StyleguidePageProps) {
  return (
    <section className="sg-content">
      <header className="sg-header">
        <h1 className="sg-title">{title}</h1>
        <p className="sg-description">{description}</p>
      </header>

      {children}
    </section>
  );
}
