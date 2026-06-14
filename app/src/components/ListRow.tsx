import type { ReactElement } from 'react';

type ListRowProps = {
  archived?: boolean;
  disabled?: boolean;
  label: string;
  meta: string;
  title: string;
};

export function ListRow({
  archived = false,
  disabled = false,
  label,
  meta,
  title,
}: ListRowProps): ReactElement {
  const classNames = ['my-list-row'];

  if (archived) {
    classNames.push('my-list-row--archived');
  }

  if (disabled) {
    classNames.push('my-list-row--disabled');
  }

  return (
    <a
      aria-disabled={disabled ? 'true' : undefined}
      aria-label={label}
      className={classNames.join(' ')}
      href="#"
    >
      <span className="my-list-row-main">
        <span className="my-list-row-content">
          <span className="my-list-row-title">{title}</span>
          <span className="my-list-row-meta">{meta}</span>
        </span>
        <span className="my-list-row-chevron-zone" aria-hidden="true">
          <span className="my-chevron" />
        </span>
      </span>
    </a>
  );
}
