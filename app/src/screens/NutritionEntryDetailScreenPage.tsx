import type { ReactElement, ReactNode } from 'react';

import {
  Measurement,
  PhonePreview,
  PreviewStack,
  ScreenPreviewPage,
  SecondaryScreenHeader,
} from '../components';

type NutritionFact = Readonly<{
  label: string;
  value: string;
}>;

const macroFacts: readonly NutritionFact[] = [
  { label: 'Protein', value: '31 g' },
  { label: 'Carbs', value: '28 g' },
  { label: 'Fat', value: '9 g' },
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
            <SnapshotSummary name="Greek yogurt" meta="250 g · Logged 12:42" />
            <PrimaryNutritionSnapshot value="320" unit="kcal" />
            <FactList facts={macroFacts} />
            <CorrectionAction />
          </NutritionEntryScreen>
        </PhonePreview>

        <PhonePreview label="Delete confirmation">
          <NutritionEntryScreen ariaLabel="Nutrition entry delete confirmation preview">
            <SnapshotSummary name="Greek yogurt" meta="250 g · Logged 12:42" />
            <PrimaryNutritionSnapshot value="320" unit="kcal" />
            <FactList facts={macroFacts} />
            <CorrectionConfirmation />
          </NutritionEntryScreen>
        </PhonePreview>

        <PhonePreview label="Delete error">
          <NutritionEntryScreen ariaLabel="Nutrition entry delete error preview">
            <SnapshotSummary name="Greek yogurt" meta="250 g · Logged 12:42" />
            <PrimaryNutritionSnapshot value="320" unit="kcal" />
            <FactList facts={macroFacts} />
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
}: NutritionEntryScreenProps) {
  return (
    <section className="my-screen" aria-label={ariaLabel}>
      <SecondaryScreenHeader
        backHref="screens/today/"
        title="Nutrition entry"
      />

      <div className="my-snapshot-detail">{children}</div>
    </section>
  );
}

type SnapshotSummaryProps = Readonly<{
  meta: string;
  name: string;
}>;

function SnapshotSummary({ meta, name }: SnapshotSummaryProps) {
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

type PrimaryNutritionSnapshotProps = Readonly<{
  unit: string;
  value: string;
}>;

function PrimaryNutritionSnapshot({
  unit,
  value,
}: PrimaryNutritionSnapshotProps) {
  return (
    <section className="my-snapshot-primary" aria-label={`${value} ${unit}`}>
      <Measurement value={value} unit={unit} />
    </section>
  );
}

function FactList({ facts }: { facts: readonly NutritionFact[] }) {
  return (
    <div className="my-fact-list" aria-label="Nutrition snapshot facts">
      {facts.map((fact) => (
        <div className="my-fact-row" key={fact.label}>
          <span className="my-fact-label">{fact.label}</span>
          <span className="my-fact-value">{fact.value}</span>
        </div>
      ))}
    </div>
  );
}

function CorrectionAction() {
  return (
    <section className="my-local-correction" aria-label="Correction">
      <p className="my-section-label">Correction</p>
      <a className="my-text-action" href="#">
        Delete entry
      </a>
    </section>
  );
}

function CorrectionConfirmation() {
  return (
    <section className="my-local-correction" aria-label="Correction">
      <p className="my-section-label">Correction</p>
      <section
        className="my-local-confirmation"
        aria-label="Delete confirmation"
      >
        <p className="my-local-confirmation-title">Delete this entry?</p>
        <p className="my-local-confirmation-body">
          This removes it from today's nutrition totals.
        </p>
        <div className="my-local-confirmation-actions">
          <a className="my-text-action" href="#">
            Keep entry
          </a>
          <a className="my-text-action" href="#">
            Delete
          </a>
        </div>
      </section>
    </section>
  );
}

function CorrectionError() {
  return (
    <section className="my-local-correction" aria-label="Correction">
      <p className="my-section-label">Correction</p>
      <div className="my-error-panel">
        <strong>Could not delete entry</strong>
        <span>Try again.</span>
      </div>
      <a className="my-text-action" href="#">
        Delete entry
      </a>
    </section>
  );
}
