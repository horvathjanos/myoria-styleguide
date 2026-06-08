import type { ReactNode } from 'react';

import { PhonePreview } from '../shell/PhonePreview';
import { PreviewStack } from '../shell/PreviewStack';

type NutritionFact = Readonly<{
  label: string;
  value: string;
}>;

const entryDetailFacts: readonly NutritionFact[] = [
  { label: 'Amount', value: '250 g' },
  { label: 'Calories', value: '320 kcal' },
  { label: 'Protein', value: '31 g' },
  { label: 'Carbs', value: '28 g' },
  { label: 'Fat', value: '9 g' },
];

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
          <SnapshotSummary name="Greek yogurt" meta="Logged 12:42" />
          <FactList facts={entryDetailFacts} />
          <LocalAction label="Delete" />
        </NutritionEntryScreen>
      </PhonePreview>

      <PhonePreview label="Delete confirmation">
        <NutritionEntryScreen ariaLabel="Nutrition entry delete confirmation React preview">
          <SnapshotSummary
            name="Greek yogurt"
            meta="250 g · 320 kcal · Logged 12:42"
          />
          <FactList facts={macroFacts} />
          <LocalConfirmation />
        </NutritionEntryScreen>
      </PhonePreview>

      <PhonePreview label="Local delete error">
        <NutritionEntryScreen ariaLabel="Nutrition entry delete error React preview">
          <SnapshotSummary
            name="Greek yogurt"
            meta="250 g · 320 kcal · Logged 12:42"
          />
          <FactList facts={macroFacts} />
          <ErrorPanel />
          <LocalAction label="Delete" />
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

function LocalAction({ label }: { label: string }) {
  return (
    <div className="my-local-action-row">
      <a className="my-text-action" href="#">
        {label}
      </a>
    </div>
  );
}

function LocalConfirmation() {
  return (
    <section className="my-local-confirmation" aria-label="Delete confirmation">
      <p className="my-local-confirmation-title">Delete this entry?</p>
      <p className="my-local-confirmation-body">
        This item will be deleted from the day and totals.
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
  );
}

function ErrorPanel() {
  return (
    <div className="my-error-panel">
      <strong>Could not delete entry</strong>
      <span>Keep the entry visible and try again.</span>
    </div>
  );
}
