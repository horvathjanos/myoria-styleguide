import type { ReactElement, ReactNode } from 'react';

import {
  Measurement,
  PhonePreview,
  PreviewStack,
  ScreenPreviewPage,
  SecondaryScreenHeader,
  TextAction,
} from '../components';

type NutritionReadout = Readonly<{
  ariaLabel: string;
  label: string;
  unit: string;
  value: string;
}>;

const energyReadout: NutritionReadout = {
  ariaLabel: 'Energy, 320 kilocalories',
  label: 'Energy',
  unit: 'kcal',
  value: '320',
};

const macroReadouts: readonly NutritionReadout[] = [
  { ariaLabel: 'Protein, 31 grams', label: 'Protein', unit: 'g', value: '31' },
  { ariaLabel: 'Carbs, 28 grams', label: 'Carbs', unit: 'g', value: '28' },
  { ariaLabel: 'Fat, 9 grams', label: 'Fat', unit: 'g', value: '9' },
];

export function NutritionEntryDetailScreenPage(): ReactElement {
  return (
    <ScreenPreviewPage
      title="Nutrition Entry Detail"
      description="Read-only nutrition snapshot with local correction, confirmation, and error states."
    >
      <PreviewStack>
        <PhonePreview label="Normal detail">
          <NutritionEntryScreen ariaLabel="Nutrition entry detail preview">
            <SnapshotSummary name="Greek yogurt" meta="250 g · Today 12:42" />
            <NutritionSnapshotReadouts
              energy={energyReadout}
              macros={macroReadouts}
            />
            <CorrectionAction />
          </NutritionEntryScreen>
        </PhonePreview>

        <PhonePreview label="Delete confirmation">
          <NutritionEntryScreen ariaLabel="Nutrition entry delete confirmation preview">
            <SnapshotSummary name="Greek yogurt" meta="250 g · Today 12:42" />
            <NutritionSnapshotReadouts
              energy={energyReadout}
              macros={macroReadouts}
            />
            <CorrectionConfirmation />
          </NutritionEntryScreen>
        </PhonePreview>

        <PhonePreview label="Delete error">
          <NutritionEntryScreen ariaLabel="Nutrition entry delete error preview">
            <SnapshotSummary name="Greek yogurt" meta="250 g · Today 12:42" />
            <NutritionSnapshotReadouts
              energy={energyReadout}
              macros={macroReadouts}
            />
            <CorrectionError />
          </NutritionEntryScreen>
        </PhonePreview>
      </PreviewStack>
    </ScreenPreviewPage>
  );
}

type NutritionEntryScreenProps = Readonly<{
  ariaLabel: string;
  children: ReactNode;
}>;

function NutritionEntryScreen({
  ariaLabel,
  children,
}: NutritionEntryScreenProps): ReactElement {
  return (
    <section className="my-screen" aria-label={ariaLabel}>
      <SecondaryScreenHeader backHref="#" backLabel="Nutrition report" />

      <div className="my-snapshot-detail">{children}</div>
    </section>
  );
}

type SnapshotSummaryProps = Readonly<{
  meta: string;
  name: string;
}>;

function SnapshotSummary({ meta, name }: SnapshotSummaryProps): ReactElement {
  return (
    <section
      className="my-snapshot-summary"
      aria-label="Selected food log snapshot"
    >
      <p className="my-snapshot-title">{name}</p>
      <p className="my-snapshot-meta">{meta}</p>
    </section>
  );
}

function NutritionSnapshotReadouts({
  energy,
  macros,
}: Readonly<{
  energy: NutritionReadout;
  macros: readonly NutritionReadout[];
}>): ReactElement {
  return (
    <section
      className="my-snapshot-readout-stack"
      aria-label="Nutrition snapshot readouts"
    >
      <SnapshotReadout readout={energy} priority="primary" />

      <div className="my-snapshot-readout-group" aria-label="Macro readouts">
        {macros.map((macro) => (
          <SnapshotReadout key={macro.label} readout={macro} />
        ))}
      </div>
    </section>
  );
}

function SnapshotReadout({
  priority = 'supporting',
  readout,
}: Readonly<{
  priority?: 'primary' | 'supporting';
  readout: NutritionReadout;
}>): ReactElement {
  const classNames = ['my-snapshot-readout'];

  if (priority === 'primary') {
    classNames.push('my-snapshot-readout--primary');
  }

  return (
    <div className={classNames.join(' ')} aria-label={readout.ariaLabel}>
      <Measurement
        className="my-snapshot-readout-value"
        supportingUnit
        unit={readout.unit}
        value={readout.value}
      />
      <span className="my-snapshot-readout-label">{readout.label}</span>
    </div>
  );
}

function CorrectionAction(): ReactElement {
  return (
    <section className="my-local-correction" aria-label="Entry action">
      <div className="my-action-row">
        <TextAction href="#" tone="destructive">
          Delete entry
        </TextAction>
      </div>
    </section>
  );
}

function CorrectionConfirmation(): ReactElement {
  return (
    <section className="my-local-correction" aria-label="Entry action">
      <section
        className="my-local-confirmation"
        aria-label="Delete confirmation"
      >
        <p className="my-local-confirmation-title">Delete this entry?</p>
        <p className="my-local-confirmation-body">
          This removes it from nutrition totals for the selected day.
        </p>
        <div className="my-local-confirmation-actions">
          <TextAction href="#">Keep entry</TextAction>
          <TextAction href="#" tone="destructive">
            Delete
          </TextAction>
        </div>
      </section>
    </section>
  );
}

function CorrectionError(): ReactElement {
  return (
    <section className="my-local-correction" aria-label="Entry action">
      <div className="my-error-panel">
        <strong>Could not delete entry</strong>
        <span>Try again.</span>
      </div>
      <div className="my-action-row">
        <TextAction href="#" tone="destructive">
          Delete entry
        </TextAction>
      </div>
    </section>
  );
}
