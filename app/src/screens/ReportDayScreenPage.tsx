import type { ReactElement } from 'react';

import {
  Measurement,
  PhonePreview,
  PreviewStack,
  ScreenPreviewPage,
  SecondaryScreenHeader,
  TextAction,
} from '../components';

type ReportDomain = 'nutrition' | 'fluid' | 'bodyweight';

type ReportMode = 'Day' | 'Week' | 'Month' | 'Year' | 'All';

type SummaryMetric = {
  label: string;
  unit?: string;
  value: string;
};

type ReportEntry = {
  ariaLabel: string;
  meta: string;
  secondary?: string;
  title: string;
  trailing: string;
  unavailable?: boolean;
};

type ReportDayScreenProps = {
  actionLabel: string;
  ariaLabel: string;
  domain: ReportDomain;
  emptyBody?: string;
  emptyTitle?: string;
  entries: ReportEntry[];
  entryCountLabel: string;
  metrics: SummaryMetric[];
  title: string;
};

const nutritionEntries: ReportEntry[] = [
  {
    ariaLabel: 'Open nutrition entry Greek yogurt',
    meta: '250 g · Logged 00:10',
    secondary: '31 g protein · 28 g carbs · 9 g fat',
    title: 'Greek yogurt',
    trailing: '320 kcal',
  },
  {
    ariaLabel: 'Open nutrition entry Rice',
    meta: '80 g · Logged 12:40',
    secondary: '6 g protein · 62 g carbs · 1 g fat',
    title: 'Rice',
    trailing: '280 kcal',
  },
  {
    ariaLabel: 'Open nutrition entry Chicken breast',
    meta: '180 g · Logged 19:05',
    secondary: '56 g protein · 0 g carbs · 6 g fat',
    title: 'Chicken breast',
    trailing: '300 kcal',
  },
];

const fluidEntries: ReportEntry[] = [
  {
    ariaLabel: 'Open fluid entry Water',
    meta: 'Logged 00:10',
    title: 'Water',
    trailing: '330 ml',
  },
  {
    ariaLabel: 'Open fluid entry Coffee',
    meta: 'Logged 08:30',
    title: 'Coffee',
    trailing: '200 ml',
  },
  {
    ariaLabel: 'Open fluid entry Electrolyte drink',
    meta: 'Logged 18:20',
    title: 'Electrolyte drink',
    trailing: '500 ml',
  },
];

const bodyweightEntries: ReportEntry[] = [
  {
    ariaLabel: 'Open bodyweight entry 73.5 kg',
    meta: 'Logged 07:12',
    title: 'Morning weigh-in',
    trailing: '73.5 kg',
  },
  {
    ariaLabel: 'Open bodyweight entry 73.7 kg',
    meta: 'Logged 21:40',
    title: 'Evening check',
    trailing: '73.7 kg',
  },
];

const unavailableEntries: ReportEntry[] = [
  {
    ariaLabel: 'Linked protein drink, unavailable from this report',
    meta: '350 ml · Logged 08:45',
    secondary: 'Linked from Nutrition',
    title: 'Protein drink',
    trailing: '350 ml',
    unavailable: true,
  },
  {
    ariaLabel: 'Open fluid entry Water',
    meta: 'Logged 11:20',
    title: 'Water',
    trailing: '500 ml',
  },
];

export function ReportDayScreenPage(): ReactElement {
  return (
    <ScreenPreviewPage
      title="Report Day"
      description="Daily report grammar for Nutrition, Fluid, and Bodyweight screens."
    >
      <PreviewStack>
        <PhonePreview label="Nutrition Report Day">
          <ReportDayScreen
            actionLabel="Add food"
            ariaLabel="Nutrition report day preview"
            domain="nutrition"
            entries={nutritionEntries}
            entryCountLabel="3 logged"
            metrics={[
              { label: 'Energy', value: '900', unit: 'kcal' },
              { label: 'Protein', value: '93', unit: 'g' },
              { label: 'Carbs', value: '90', unit: 'g' },
              { label: 'Fat', value: '16', unit: 'g' },
            ]}
            title="Nutrition report"
          />
        </PhonePreview>

        <PhonePreview label="Fluid Report Day">
          <ReportDayScreen
            actionLabel="Add fluid"
            ariaLabel="Fluid report day preview"
            domain="fluid"
            entries={fluidEntries}
            entryCountLabel="3 logged"
            metrics={[
              { label: 'Total', value: '1.0', unit: 'L' },
              { label: 'Entries', value: '3' },
            ]}
            title="Fluid report"
          />
        </PhonePreview>

        <PhonePreview label="Bodyweight Report Day">
          <ReportDayScreen
            actionLabel="Add weight"
            ariaLabel="Bodyweight report day preview"
            domain="bodyweight"
            entries={bodyweightEntries}
            entryCountLabel="2 logged"
            metrics={[
              { label: 'Latest', value: '73.5', unit: 'kg' },
              { label: 'Entries', value: '2' },
            ]}
            title="Bodyweight report"
          />
        </PhonePreview>

        <PhonePreview label="Empty Day">
          <ReportDayScreen
            actionLabel="Add food"
            ariaLabel="Nutrition report empty day preview"
            domain="nutrition"
            emptyBody="Add a food entry when there is something to log."
            emptyTitle="No entries for this day"
            entries={[]}
            entryCountLabel="0 logged"
            metrics={[
              { label: 'Energy', value: '0', unit: 'kcal' },
              { label: 'Protein', value: '0', unit: 'g' },
              { label: 'Carbs', value: '0', unit: 'g' },
              { label: 'Fat', value: '0', unit: 'g' },
            ]}
            title="Nutrition report"
          />
        </PhonePreview>

        <PhonePreview label="Unavailable Row">
          <ReportDayScreen
            actionLabel="Add fluid"
            ariaLabel="Fluid report unavailable row preview"
            domain="fluid"
            entries={unavailableEntries}
            entryCountLabel="2 logged"
            metrics={[
              { label: 'Total', value: '0.9', unit: 'L' },
              { label: 'Entries', value: '2' },
            ]}
            title="Fluid report"
          />
        </PhonePreview>
      </PreviewStack>
    </ScreenPreviewPage>
  );
}

function ReportDayScreen({
  actionLabel,
  ariaLabel,
  domain,
  emptyBody,
  emptyTitle,
  entries,
  entryCountLabel,
  metrics,
  title,
}: ReportDayScreenProps): ReactElement {
  return (
    <section className="my-screen my-report-day" aria-label={ariaLabel}>
      <SecondaryScreenHeader backHref="#" backLabel="Today" />

      <section className="my-screen-lead" aria-label={`${title} identity`}>
        <p className="my-screen-lead-title">{title}</p>
        <p className="my-screen-lead-meta">Tuesday, 2 June · Europe/Vienna</p>
      </section>

      <ReportModeSelector activeMode="Day" />

      <section className="my-report-day-summary" aria-label={`${title} totals`}>
        {metrics.map((metric) => (
          <ReportSummaryMetric key={metric.label} metric={metric} />
        ))}
      </section>

      <section
        className="my-report-day-entries"
        aria-label={`${title} entries`}
      >
        <div className="my-report-day-section-header">
          <div>
            <p className="my-section-label">Entries</p>
            <p className="my-report-day-entry-count">{entryCountLabel}</p>
          </div>
          <div className="my-action-row my-report-day-action-row">
            <TextAction href="#">{actionLabel}</TextAction>
          </div>
        </div>

        <div className="my-report-day-list">
          {entries.map((entry) => (
            <ReportEntryRow
              domain={domain}
              entry={entry}
              key={`${entry.title}-${entry.meta}`}
            />
          ))}

          {entries.length === 0 && emptyTitle && emptyBody ? (
            <div className="my-list-state">
              <p className="my-list-state-title">{emptyTitle}</p>
              <p className="my-list-state-body">{emptyBody}</p>
            </div>
          ) : null}
        </div>
      </section>
    </section>
  );
}

function ReportModeSelector({
  activeMode,
}: {
  activeMode: ReportMode;
}): ReactElement {
  const modes: ReportMode[] = ['Day', 'Week', 'Month', 'Year', 'All'];

  return (
    <nav className="my-report-mode-selector" aria-label="Report range">
      {modes.map((mode, index) => (
        <span className="my-report-mode-option" key={mode}>
          <a
            aria-current={mode === activeMode ? 'page' : undefined}
            className={mode === activeMode ? 'is-active' : 'is-inactive'}
            href="#"
          >
            {mode}
          </a>
          {index < modes.length - 1 ? (
            <span className="my-report-mode-divider" aria-hidden="true">
              |
            </span>
          ) : null}
        </span>
      ))}
    </nav>
  );
}

function ReportSummaryMetric({
  metric,
}: {
  metric: SummaryMetric;
}): ReactElement {
  return (
    <div className="my-report-summary-metric">
      {metric.unit ? (
        <Measurement supportingUnit value={metric.value} unit={metric.unit} />
      ) : (
        <span className="my-report-summary-count">{metric.value}</span>
      )}
      <span className="my-section-label">{metric.label}</span>
    </div>
  );
}

function ReportEntryRow({
  domain,
  entry,
}: {
  domain: ReportDomain;
  entry: ReportEntry;
}): ReactElement {
  const classNames = ['my-report-entry-row'];

  if (entry.unavailable) {
    classNames.push('my-report-entry-row--unavailable');
  }

  const content = (
    <span className="my-report-entry-row-main">
      <span className="my-report-entry-row-content">
        <span className="my-report-entry-row-title">{entry.title}</span>
        {entry.secondary ? (
          <span className="my-report-entry-row-secondary">
            {entry.secondary}
          </span>
        ) : null}
        <span className="my-report-entry-row-meta">{entry.meta}</span>
      </span>
      <span className="my-report-entry-row-trailing">{entry.trailing}</span>
    </span>
  );

  if (entry.unavailable) {
    return (
      <div
        aria-label={entry.ariaLabel}
        className={classNames.join(' ')}
        data-report-domain={domain}
      >
        {content}
      </div>
    );
  }

  return (
    <a
      aria-label={entry.ariaLabel}
      className={classNames.join(' ')}
      data-report-domain={domain}
      href="#"
    >
      {content}
      <span className="my-list-row-chevron-zone" aria-hidden="true">
        <span className="my-chevron" />
      </span>
    </a>
  );
}
