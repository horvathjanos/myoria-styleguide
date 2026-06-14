import type { ReactElement, ReactNode } from 'react';

type StatePreviewTone = 'empty' | 'error' | 'loading';

type StatePreviewProps = {
  children: ReactNode;
  tone: StatePreviewTone;
};

export function StatePreview({
  children,
  tone,
}: StatePreviewProps): ReactElement {
  return <p className={`my-state my-state--${tone}`}>{children}</p>;
}
