import type { ReactElement, ReactNode } from 'react';

import {
  PhonePreview,
  PreviewStack,
  ScreenPreviewPage,
  SecondaryScreenHeader,
  TextAction,
} from '../components';

export function FluidEntryDetailScreenPage(): ReactElement {
  return (
    <ScreenPreviewPage
      title="Fluid Entry Detail"
      description="Read-only fluid snapshot with local delete confirmation and error states."
    >
      <PreviewStack>
        <PhonePreview label="Normal detail">
          <FluidEntryScreen ariaLabel="Fluid entry detail preview">
            <SnapshotSummary name="Water" meta="330 ml · Today 14:20" />
            <DeleteAction />
          </FluidEntryScreen>
        </PhonePreview>

        <PhonePreview label="Delete confirmation">
          <FluidEntryScreen ariaLabel="Fluid entry delete confirmation preview">
            <SnapshotSummary name="Water" meta="330 ml · Today 14:20" />
            <DeleteConfirmation />
          </FluidEntryScreen>
        </PhonePreview>

        <PhonePreview label="Delete error">
          <FluidEntryScreen ariaLabel="Fluid entry delete error preview">
            <SnapshotSummary name="Water" meta="330 ml · Today 14:20" />
            <DeleteError />
          </FluidEntryScreen>
        </PhonePreview>
      </PreviewStack>
    </ScreenPreviewPage>
  );
}

type FluidEntryScreenProps = Readonly<{
  ariaLabel: string;
  children: ReactNode;
}>;

function FluidEntryScreen({
  ariaLabel,
  children,
}: FluidEntryScreenProps): ReactElement {
  return (
    <section className="my-screen" aria-label={ariaLabel}>
      <SecondaryScreenHeader backHref="screens/today/" title="Fluid entry" />

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
      aria-label="Selected fluid log snapshot"
    >
      <p className="my-snapshot-title">{name}</p>
      <p className="my-snapshot-meta">{meta}</p>
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
          This removes it from today's fluid total.
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
