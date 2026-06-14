import type { ReactElement } from 'react';

import { StyleguidePage } from '../../shell/StyleguidePage';

type ScaleCase = {
  emphasized?: boolean;
  label: string;
  overDetail?: string;
  overrun?: boolean;
  width: string;
};

const scaleCases: readonly ScaleCase[] = [
  {
    emphasized: true,
    label: 'Open scale emphasized — 37%',
    width: '37%',
  },
  {
    emphasized: true,
    label: 'Open scale emphasized — 100%',
    width: '100%',
  },
  {
    emphasized: true,
    label: 'Calories over — emphasized red overrun',
    overDetail: '150 kcal over',
    overrun: true,
    width: '100%',
  },
  {
    label: 'Fat over — standard red overrun',
    overDetail: '22 g over',
    overrun: true,
    width: '100%',
  },
];

export function ProgressScalePage(): ReactElement {
  return (
    <StyleguidePage
      title="Progress scale"
      description="Visual validation for tick density, fill behavior, and over-target red overrun segments."
    >
      <div className="sg-phone-wrap">
        <div className="my-phone">
          <section
            className="my-screen"
            aria-label="Progress scale validation preview"
          >
            <header className="my-root-header">
              <p className="my-root-date">Progress scale validation</p>
            </header>
            <div className="sg-progress-scale-stack">
              <div className="sg-progress-scale-case">
                <p className="sg-progress-scale-label">
                  Plain line reference — 37%
                </p>
                <span className="my-progress my-progress--primary">
                  <span className="my-progress-fill" style={{ width: '37%' }} />
                </span>
              </div>
              {scaleCases.map((scaleCase) => (
                <ProgressScaleCase key={scaleCase.label} {...scaleCase} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </StyleguidePage>
  );
}

function ProgressScaleCase({
  emphasized = false,
  label,
  overDetail,
  overrun = false,
  width,
}: ScaleCase): ReactElement {
  const classNames = ['my-progress-scale'];

  if (emphasized) {
    classNames.push('my-progress-scale--emphasized');
  }

  return (
    <div className="sg-progress-scale-case">
      <p className="sg-progress-scale-label">{label}</p>
      <div className={classNames.join(' ')} aria-label={label}>
        <div className="my-progress-scale-track">
          <span className="my-progress-scale-line" />
          <span className="my-progress-scale-fill" style={{ width }} />
          <span className="my-progress-scale-tick my-progress-scale-tick--start" />
          <span className="my-progress-scale-tick my-progress-scale-tick--middle" />
          <span className="my-progress-scale-tick my-progress-scale-tick--end" />
          {overrun ? <span className="my-progress-scale-overrun" /> : null}
        </div>
        {overDetail ? (
          <p className="my-progress-scale-over-detail">{overDetail}</p>
        ) : null}
      </div>
    </div>
  );
}
