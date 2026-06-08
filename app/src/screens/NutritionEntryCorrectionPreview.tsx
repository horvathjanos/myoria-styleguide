import type { ReactNode } from 'react';

import { PhonePreview } from '../shell/PhonePreview';
import { PreviewStack } from '../shell/PreviewStack';

type NutritionFact = Readonly<{
  label: string;
  value: string;
}>;

const macroFacts: readonly NutritionFact[] = [
  { label: 'Protein', value: '31 g' },
  { label: 'Carbs', value: '28 g' },
  { label: 'Fat', value: '9 g' },
];

export function NutritionEntryCorrectionPreview() {
  return (
    <PreviewStack>
      <PhonePreview label="Entry detail">
        <NutritionEntryScreen ariaLabel="Nutrition entry detail React preview">
          <SnapshotSummary name="Greek yogurt" meta="250 g · Logged 12:42" />
          <PrimaryNutritionSnapshot value="320" unit="kcal" />
          <FactList facts={macroFacts} />
          <CorrectionAction />
        </NutritionEntryScreen>
      </PhonePreview>

      <PhonePreview label="Delete confirmation">
        <NutritionEntryScreen ariaLabel="Nutrition entry delete confirmation React preview">
          <SnapshotSummary name="Greek yogurt" meta="250 g · Logged 12:42" />
          <PrimaryNutritionSnapshot value="320" unit="kcal" />
          <FactList facts={macroFacts} />
          <CorrectionConfirmation />
        </NutritionEntryScreen>
      </PhonePreview>

      <PhonePreview label="Local delete error">
        <NutritionEntryScreen ariaLabel="Nutrition entry delete error React preview">
          <SnapshotSummary name="Greek yogurt" meta="250 g · Logged 12:42" />
          <PrimaryNutritionSnapshot value="320" unit="kcal" />
          <FactList facts={macroFacts} />
          <CorrectionError />
        </NutritionEntryScreen>
      </PhonePreview>
    </PreviewStack>
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
      <header className="my-screen-header">
        <a
          className="my-back-control"
          href="./screens/today.html"
          aria-label="Go back"
        >
          <span className="my-chevron my-chevron--left" aria-hidden="true" />
        </a>
        <h2 className="my-screen-title">Nutrition entry</h2>
      </header>

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
    <section
      className="my-snapshot-primary"
      aria-label="Primary nutrition snapshot"
    >
      <span className="my-section-label">Calories</span>
      <span className="my-measurement">
        <span className="my-measurement-value">{value}</span>
        <span className="my-measurement-unit">{unit}</span>
      </span>
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
