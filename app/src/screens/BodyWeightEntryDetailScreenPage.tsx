import type { ReactElement, ReactNode } from 'react';

import {
  Measurement,
  PhonePreview,
  PreviewStack,
  ScreenPreviewPage,
  SecondaryScreenHeader,
  TextAction,
} from '../components';

export function BodyWeightEntryDetailScreenPage(): ReactElement {
  return (
    <ScreenPreviewPage
      title="Body Weight Entry Detail"
      description="Read-only body weight snapshot with local delete confirmation and error states."
    >
      <PreviewStack>
        <PhonePreview label="Normal detail">
          <BodyWeightEntryScreen ariaLabel="Body weight entry detail preview">
            <SnapshotSummary loggedAt="Today 07:12" />
            <DeleteAction />
          </BodyWeightEntryScreen>
        </PhonePreview>

        <PhonePreview label="Delete confirmation">
          <BodyWeightEntryScreen ariaLabel="Body weight entry delete confirmation preview">
            <SnapshotSummary loggedAt="Today 07:12" />
            <DeleteConfirmation />
          </BodyWeightEntryScreen>
        </PhonePreview>

        <PhonePreview label="Delete error">
          <BodyWeightEntryScreen ariaLabel="Body weight entry delete error preview">
            <SnapshotSummary loggedAt="Today 07:12" />
            <DeleteError />
          </BodyWeightEntryScreen>
        </PhonePreview>
      </PreviewStack>
    </ScreenPreviewPage>
  );
}

type BodyWeightEntryScreenProps = Readonly<{
  ariaLabel: string;
  children: ReactNode;
}>;

function BodyWeightEntryScreen({
  ariaLabel,
  children,
}: BodyWeightEntryScreenProps): ReactElement {
  return (
    <section className="my-screen" aria-label={ariaLabel}>
      <SecondaryScreenHeader
        backHref="screens/today/"
        title="Body weight entry"
      />

      <div className="my-snapshot-detail">{children}</div>
    </section>
  );
}

type SnapshotSummaryProps = Readonly<{
  loggedAt: string;
}>;

function SnapshotSummary({ loggedAt }: SnapshotSummaryProps): ReactElement {
  return (
    <section
      className="my-snapshot-summary"
      aria-label="Selected body weight snapshot"
    >
      <Measurement
        className="my-snapshot-title"
        supportingUnit
        unit="kg"
        value="72.8"
      />
      <p className="my-snapshot-meta">{loggedAt}</p>
    </section>
  );
}

function DeleteAction(): ReactElement {
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

function DeleteConfirmation(): ReactElement {
  return (
    <section className="my-local-correction" aria-label="Entry action">
      <section
        className="my-local-confirmation"
        aria-label="Delete confirmation"
      >
        <p className="my-local-confirmation-title">Delete this entry?</p>
        <p className="my-local-confirmation-body">
          This removes it from body weight history.
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

function DeleteError(): ReactElement {
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
