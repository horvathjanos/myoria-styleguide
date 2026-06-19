import type { ReactElement } from 'react';

import {
  Measurement,
  PhonePreview,
  PreviewStack,
  ScreenPreviewPage,
} from '../components';

type ProgressScaleProps = {
  emphasized?: boolean;
  overDetail?: string;
  overrun?: boolean;
  width: string;
};

type TodayFixture = {
  bodyweight: {
    ariaLabel: string;
    detail: string;
    unit: string;
    value: string;
  };
  date: string;
  fluid: {
    ariaLabel: string;
    progressWidth: string;
    value: string;
  };
  nutrition: {
    ariaLabel: string;
    calories: {
      progressWidth: string;
      value: string;
    };
    macros: TodayMacroFixture[];
  };
  workout: {
    ariaLabel: string;
    detail: string;
    showOperationalMarker: boolean;
    status: string;
  };
};

type TodayMacroFixture = {
  ariaLabel: string;
  label: string;
  overDetail?: string;
  overrun?: boolean;
  progressWidth: string;
  value: string;
};

const defaultTodayFixture: TodayFixture = {
  bodyweight: {
    ariaLabel: 'Bodyweight, 73.5 kg, logged 07:12',
    detail: 'Logged 07:12',
    unit: 'kg',
    value: '73.5',
  },
  date: 'Tuesday, 2 June',
  fluid: {
    ariaLabel: 'Fluid, 0.6 of 3 liters',
    progressWidth: '18%',
    value: '0.6 / 3',
  },
  nutrition: {
    ariaLabel: 'Nutrition, 861 of 2300 kcal',
    calories: {
      progressWidth: '37%',
      value: '861 / 2300',
    },
    macros: [
      {
        ariaLabel: 'Protein, 156 of 180 grams',
        label: 'Protein',
        progressWidth: '87%',
        value: '156 / 180',
      },
      {
        ariaLabel: 'Carbs, 210 of 250 grams',
        label: 'Carbs',
        progressWidth: '84%',
        value: '210 / 250',
      },
      {
        ariaLabel: 'Fat, 92 of 70 grams, 22 grams over',
        label: 'Fat',
        overDetail: '22 g over',
        overrun: true,
        progressWidth: '100%',
        value: '92 / 70',
      },
    ],
  },
  workout: {
    ariaLabel: 'Workout active, push session, 42 min',
    detail: 'Push session · 42 min',
    showOperationalMarker: true,
    status: 'Active',
  },
};

const emptyTodayFixture: TodayFixture = {
  bodyweight: {
    ariaLabel: 'Bodyweight, not logged',
    detail: 'Not logged',
    unit: '',
    value: '—',
  },
  date: 'Tuesday, 2 June',
  fluid: {
    ariaLabel: 'Fluid, 0 of 3 liters',
    progressWidth: '0%',
    value: '0 / 3',
  },
  nutrition: {
    ariaLabel: 'Nutrition, 0 of 2300 kcal',
    calories: {
      progressWidth: '0%',
      value: '0 / 2300',
    },
    macros: [
      {
        ariaLabel: 'Protein, 0 of 180 grams',
        label: 'Protein',
        progressWidth: '0%',
        value: '0 / 180',
      },
      {
        ariaLabel: 'Carbs, 0 of 250 grams',
        label: 'Carbs',
        progressWidth: '0%',
        value: '0 / 250',
      },
      {
        ariaLabel: 'Fat, 0 of 80 grams',
        label: 'Fat',
        progressWidth: '0%',
        value: '0 / 80',
      },
    ],
  },
  workout: {
    ariaLabel: 'Workout, no workouts yet',
    detail: '',
    showOperationalMarker: false,
    status: 'No workouts yet',
  },
};

export function TodayScreenPage(): ReactElement {
  return (
    <ScreenPreviewPage
      title="Today"
      description="Root daily readouts for nutrition, fluid, bodyweight, and workout status."
    >
      <PreviewStack>
        <PhonePreview label="Default">
          <TodayScreen fixture={defaultTodayFixture} />
        </PhonePreview>

        <PhonePreview label="Empty day">
          <TodayScreen fixture={emptyTodayFixture} />
        </PhonePreview>
      </PreviewStack>
    </ScreenPreviewPage>
  );
}

function TodayScreen({ fixture }: { fixture: TodayFixture }): ReactElement {
  return (
    <section className="my-screen" aria-label="Today screen preview">
      <header className="my-root-header">
        <p className="my-root-date">{fixture.date}</p>
      </header>

      <div className="my-readout-stack">
        <a
          className="my-readout-block"
          href="#"
          aria-label={fixture.nutrition.ariaLabel}
        >
          <span className="my-section-label">Nutrition</span>
          <span className="my-readout-main">
            <span className="my-readout-content">
              <Measurement
                value={fixture.nutrition.calories.value}
                unit="kcal"
              />
            </span>
            <span className="my-list-row-chevron-zone" aria-hidden="true">
              <span className="my-chevron" />
            </span>
          </span>
          <ProgressScale
            emphasized
            width={fixture.nutrition.calories.progressWidth}
          />

          <span
            className="my-readout-secondary-stack"
            aria-label="Nutrition macro targets"
          >
            {fixture.nutrition.macros.map((macro) => (
              <span
                className="my-readout-secondary"
                aria-label={macro.ariaLabel}
                key={macro.label}
              >
                <span className="my-readout-secondary-main">
                  <span className="my-section-label">{macro.label}</span>
                  <Measurement
                    className="my-readout-secondary-value"
                    supportingUnit
                    value={macro.value}
                    unit="g"
                  />
                </span>
                <ProgressScale
                  width={macro.progressWidth}
                  overrun={macro.overrun}
                  overDetail={macro.overDetail}
                />
              </span>
            ))}
          </span>
        </a>

        <div className="my-readout-pair">
          <a
            className="my-readout-pair-item"
            href="#"
            aria-label={fixture.fluid.ariaLabel}
          >
            <span className="my-section-label">Fluid</span>
            <span className="my-readout-pair-main">
              <Measurement
                className="my-readout-pair-value"
                supportingUnit
                value={fixture.fluid.value}
                unit="L"
              />
              <span className="my-list-row-chevron-zone" aria-hidden="true">
                <span className="my-chevron" />
              </span>
            </span>
            <ProgressScale width={fixture.fluid.progressWidth} />
          </a>

          <a
            className="my-readout-pair-item"
            href="#"
            aria-label={fixture.bodyweight.ariaLabel}
          >
            <span className="my-section-label">Bodyweight</span>
            <span className="my-readout-pair-main">
              <Measurement
                className="my-readout-pair-value"
                supportingUnit
                value={fixture.bodyweight.value}
                unit={fixture.bodyweight.unit}
              />
              <span className="my-list-row-chevron-zone" aria-hidden="true">
                <span className="my-chevron" />
              </span>
            </span>
            <span className="my-readout-detail">
              {fixture.bodyweight.detail}
            </span>
          </a>
        </div>

        <a
          className="my-readout-block"
          href="#"
          aria-label={fixture.workout.ariaLabel}
        >
          <span className="my-section-label">Workout</span>
          <span className="my-readout-main">
            <span className="my-readout-content">
              {fixture.workout.showOperationalMarker ? (
                <span className="my-operational-marker" aria-hidden="true" />
              ) : null}
              <span className="my-operational-status">
                {fixture.workout.status}
              </span>
            </span>
            <span className="my-list-row-chevron-zone" aria-hidden="true">
              <span className="my-chevron" />
            </span>
          </span>
          {fixture.workout.detail ? (
            <span className="my-readout-detail">{fixture.workout.detail}</span>
          ) : null}
        </a>
      </div>
    </section>
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
