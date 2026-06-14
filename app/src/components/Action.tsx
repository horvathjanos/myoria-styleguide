import type { ReactElement, ReactNode } from 'react';

type ActionTone = 'primary' | 'secondary' | 'destructive';

type ActionProps = {
  children: ReactNode;
  disabled?: boolean;
  tone: ActionTone;
};

export function Action({
  children,
  disabled = false,
  tone,
}: ActionProps): ReactElement {
  const classNames = ['my-button', `my-button--${tone}`];

  if (disabled) {
    classNames.push('my-button--disabled');
  }

  return (
    <button className={classNames.join(' ')} disabled={disabled}>
      {children}
    </button>
  );
}
