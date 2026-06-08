import { PhonePreview } from '../shell/PhonePreview';

type MeasurementProps = {
  className?: string;
  supportingUnit?: boolean;
  unit: string;
  value: string;
};

type ProgressScaleProps = {
  emphasized?: boolean;
  overDetail?: string;
  overrun?: boolean;
  width: string;
};

export function TodayPreview() {
  return (
    <div className="sg-validation-stack">
      <PhonePreview label="Today">
        <section className="my-screen" aria-label="Today React preview">
          <header className="my-root-header">
            <p className="my-root-date">Tuesday, 2 June</p>
          </header>

          <div className="my-readout-stack">
            <a
              className="my-readout-block"
              href="#"
              aria-label="Nutrition, 861 of 2300 kcal"
            >
              <span className="my-section-label">Nutrition</span>
              <span className="my-readout-main">
                <span className="my-readout-content">
                  <Measurement value="861 / 2300" unit="kcal" />
                </span>
                <span className="my-list-row-chevron-zone" aria-hidden="true">
                  <span className="my-chevron" />
                </span>
              </span>
              <ProgressScale emphasized width="37%" />

              <span
                className="my-readout-secondary-stack"
                aria-label="Nutrition macro targets"
              >
                <span
                  className="my-readout-secondary"
                  aria-label="Protein, 156 of 180 grams"
                >
                  <span className="my-readout-secondary-main">
                    <span className="my-section-label">Protein</span>
                    <Measurement
                      className="my-readout-secondary-value"
                      supportingUnit
                      value="156 / 180"
                      unit="g"
                    />
                  </span>
                  <ProgressScale width="87%" />
                </span>

                <span
                  className="my-readout-secondary"
                  aria-label="Carbs, 210 of 250 grams"
                >
                  <span className="my-readout-secondary-main">
                    <span className="my-section-label">Carbs</span>
                    <Measurement
                      className="my-readout-secondary-value"
                      supportingUnit
                      value="210 / 250"
                      unit="g"
                    />
                  </span>
                  <ProgressScale width="84%" />
                </span>

                <span
                  className="my-readout-secondary"
                  aria-label="Fat, 92 of 70 grams, 22 grams over"
                >
                  <span className="my-readout-secondary-main">
                    <span className="my-section-label">Fat</span>
                    <Measurement
                      className="my-readout-secondary-value"
                      supportingUnit
                      value="92 / 70"
                      unit="g"
                    />
                  </span>
                  <ProgressScale width="100%" overrun overDetail="22 g over" />
                </span>
              </span>
            </a>

            <div className="my-readout-pair">
              <a
                className="my-readout-pair-item"
                href="#"
                aria-label="Fluid, 0.6 of 3 liters"
              >
                <span className="my-section-label">Fluid</span>
                <span className="my-readout-pair-main">
                  <Measurement
                    className="my-readout-pair-value"
                    supportingUnit
                    value="0.6 / 3"
                    unit="L"
                  />
                  <span className="my-list-row-chevron-zone" aria-hidden="true">
                    <span className="my-chevron" />
                  </span>
                </span>
                <ProgressScale width="18%" />
              </a>

              <a
                className="my-readout-pair-item"
                href="#"
                aria-label="Bodyweight, 73.5 kg, logged 07:12"
              >
                <span className="my-section-label">Bodyweight</span>
                <span className="my-readout-pair-main">
                  <Measurement
                    className="my-readout-pair-value"
                    supportingUnit
                    value="73.5"
                    unit="kg"
                  />
                  <span className="my-list-row-chevron-zone" aria-hidden="true">
                    <span className="my-chevron" />
                  </span>
                </span>
                <span className="my-readout-detail">Logged 07:12</span>
              </a>
            </div>

            <a
              className="my-readout-block"
              href="#"
              aria-label="Workout active, push session, 42 min"
            >
              <span className="my-section-label">Workout</span>
              <span className="my-readout-main">
                <span className="my-readout-content">
                  <span className="my-operational-marker" aria-hidden="true" />
                  <span className="my-operational-status">Active</span>
                </span>
                <span className="my-list-row-chevron-zone" aria-hidden="true">
                  <span className="my-chevron" />
                </span>
              </span>
              <span className="my-readout-detail">Push session · 42 min</span>
            </a>
          </div>
        </section>
      </PhonePreview>
    </div>
  );
}

function Measurement({
  className,
  supportingUnit = false,
  unit,
  value,
}: MeasurementProps) {
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

function ProgressScale({
  emphasized = false,
  overDetail,
  overrun = false,
  width,
}: ProgressScaleProps) {
  const classNames = ['my-progress-scale'];

  if (emphasized) {
    classNames.push('my-progress-scale--emphasized');
  }

  return (
    <span className={classNames.join(' ')} aria-hidden="true">
      <span className="my-progress-scale-track">
        <span className="my-progress-scale-line" />
        <span className="my-progress-scale-fill" style={{ width }} />
        <span className="my-progress-scale-tick my-progress-scale-tick--start" />
        <span className="my-progress-scale-tick my-progress-scale-tick--middle" />
        <span className="my-progress-scale-tick my-progress-scale-tick--end" />
        {overrun ? <span className="my-progress-scale-overrun" /> : null}
      </span>
      {overDetail ? (
        <span className="my-progress-scale-over-detail">{overDetail}</span>
      ) : null}
    </span>
  );
}
