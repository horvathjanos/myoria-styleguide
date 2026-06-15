import type { ReactElement, ReactNode } from 'react';

type TextActionTone = 'default' | 'destructive';

type TextActionProps = {
  children: ReactNode;
  href: string;
  tone?: TextActionTone;
};

export function TextAction({
  children,
  href,
  tone = 'default',
}: TextActionProps): ReactElement {
  const classNames = ['my-text-action'];

  if (tone === 'destructive') {
    classNames.push('my-text-action--destructive');
  }

  return (
    <a className={classNames.join(' ')} href={href}>
      {children}
    </a>
  );
}
