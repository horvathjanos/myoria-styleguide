import type { ReactElement } from 'react';

type MeasurementProps = {
  className?: string;
  supportingUnit?: boolean;
  unit: string;
  value: string;
};

export function Measurement({
  className,
  supportingUnit = false,
  unit,
  value,
}: MeasurementProps): ReactElement {
  const classNames = ['my-measurement'];

  if (supportingUnit) {
    classNames.push('my-measurement--supporting-unit');
  }

  if (className) {
    classNames.push(className);
  }

  return (
    <span className={classNames.join(' ')}>
      <span className="my-measurement-value">{value}</span>
      <span className="my-measurement-unit">{unit}</span>
    </span>
  );
}
