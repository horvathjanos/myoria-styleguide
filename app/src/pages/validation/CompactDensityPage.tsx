import type { ReactElement } from 'react';

import {
  ListRow,
  Measurement,
  SecondaryScreenHeader,
  TextAction,
} from '../../components';
import { StyleguidePage } from '../../shell/StyleguidePage';

type Density = 'comfortable' | 'compact';

const densityRows = [
  ['Chicken breast', '100 g · NUTRITION'],
  [
    'Protein Drink Chocolate Double Zero Dark Choc Style',
    '350 ml · NUTRITION + FLUID',
  ],
  ['Greek yogurt', '100 g · NUTRITION'],
  ['Rice', '50 g · NUTRITION'],
] as const;

export function CompactDensityPage(): ReactElement {
  return (
    <StyleguidePage
      title="Compact density"
      description="Comfortable and compact variants use identical mock content and preview width so only density changes are visible."
    >
      <div className="sg-validation-stack">
        <DensityPair
          comfortableLabel="Object-list — comfortable"
          compactLabel="Object-list — compact"
          renderPreview={(density) => <ObjectListPreview density={density} />}
        />
        <DensityPair
          comfortableLabel="Measurement/root screen — comfortable"
          compactLabel="Measurement/root screen — compact"
          renderPreview={(density) => <MeasurementPreview density={density} />}
        />
      </div>
    </StyleguidePage>
  );
}

type DensityPairProps = {
  comfortableLabel: string;
  compactLabel: string;
  renderPreview: (density: Density) => ReactElement;
};

function DensityPair({
  comfortableLabel,
  compactLabel,
  renderPreview,
}: DensityPairProps): ReactElement {
  return (
    <section className="sg-validation-pair">
      <DensityPreview density="comfortable" label={comfortableLabel}>
        {renderPreview('comfortable')}
      </DensityPreview>
      <DensityPreview density="compact" label={compactLabel}>
        {renderPreview('compact')}
      </DensityPreview>
    </section>
  );
}

type DensityPreviewProps = {
  children: ReactElement;
  density: Density;
  label: string;
};

function DensityPreview({
  children,
  density,
  label,
}: DensityPreviewProps): ReactElement {
  return (
    <div>
      <p className="sg-preview-label">{label}</p>
      <div className="sg-phone-wrap" data-density={density}>
        <div className="my-phone">{children}</div>
      </div>
    </div>
  );
}

function ObjectListPreview({ density }: { density: Density }): ReactElement {
  return (
    <section
      className="my-screen"
      aria-label={`Object-list ${density} density preview`}
    >
      <SecondaryScreenHeader backHref="#" title="Food & Drink Library" />
      <div className="my-object-list-control">
        <span className="my-section-label">SEARCH</span>
        <input
          className="my-line-input"
          placeholder="Search items"
          type="search"
        />
        <div className="my-scope-selector" aria-label="Filter scope">
          <a className="is-active" href="#">
            ACTIVE
          </a>
          <span className="my-scope-divider">|</span>
          <a className="is-inactive" href="#">
            ARCHIVED
          </a>
        </div>
      </div>
      <div className="my-action-row my-object-list-action-row">
        <TextAction href="#">Create item</TextAction>
      </div>
      <div className="my-list">
        {densityRows.map(([title, meta]) => (
          <ListRow
            key={title}
            label={`${title}, ${meta}`}
            meta={meta}
            title={title}
          />
        ))}
      </div>
    </section>
  );
}

function MeasurementPreview({ density }: { density: Density }): ReactElement {
  return (
    <section
      className="my-screen"
      aria-label={`Measurement root ${density} density preview`}
    >
      <header className="my-root-header">
        <p className="my-root-date">Tuesday, 2 June</p>
      </header>
      <div className="my-readout-stack">
        <ValidationReadout label="Nutrition">
          <Measurement value="861 / 2300" unit="kcal" />
        </ValidationReadout>
        <ValidationReadout label="Fluid">
          <Measurement value="0.6 / 3" unit="L" />
        </ValidationReadout>
        <ValidationReadout label="Bodyweight">
          <Measurement value="73.5" unit="kg" />
        </ValidationReadout>
        <ValidationReadout label="Workout">
          <span className="my-operational-status">Active · Push session</span>
        </ValidationReadout>
      </div>
    </section>
  );
}

type ValidationReadoutProps = {
  children: ReactElement;
  label: string;
};

function ValidationReadout({
  children,
  label,
}: ValidationReadoutProps): ReactElement {
  return (
    <div className="my-readout-block">
      <span className="my-section-label">{label}</span>
      <span className="my-readout-main">
        <span className="my-readout-content">{children}</span>
      </span>
    </div>
  );
}
