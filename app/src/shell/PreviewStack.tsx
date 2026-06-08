import type { ReactNode } from 'react';

type PreviewStackProps = {
  children: ReactNode;
};

export function PreviewStack({ children }: PreviewStackProps) {
  return <div className="sg-validation-stack">{children}</div>;
}
