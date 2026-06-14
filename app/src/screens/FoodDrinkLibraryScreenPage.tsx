import type { ReactElement } from 'react';

import {
  ListRow,
  PhonePreview,
  PreviewStack,
  ScreenPreviewPage,
  SecondaryScreenHeader,
} from '../components';

type Scope = 'active' | 'archived';

type LibraryRow = {
  archived?: boolean;
  label: string;
  meta: string;
  title: string;
};

const activeRows: LibraryRow[] = [
  {
    label: 'Chicken breast, 100 g, nutrition',
    meta: '100 g · NUTRITION',
    title: 'Chicken breast',
  },
  {
    label:
      'Protein Drink Chocolate Double Zero Dark Choc Style, 350 ml, nutrition and fluid',
    meta: '350 ml · NUTRITION + FLUID',
    title: 'Protein Drink Chocolate Double Zero Dark Choc Style',
  },
  {
    label: 'Greek yogurt, 100 g, nutrition',
    meta: '100 g · NUTRITION',
    title: 'Greek yogurt',
  },
  {
    label: 'Rice, 50 g, nutrition',
    meta: '50 g · NUTRITION',
    title: 'Rice',
  },
  {
    label: 'Water, 500 ml, fluid',
    meta: '500 ml · FLUID',
    title: 'Water',
  },
];

const archivedRows: LibraryRow[] = [
  {
    archived: true,
    label: 'Mango skyr drink, 350 ml, nutrition and fluid',
    meta: '350 ml · NUTRITION + FLUID',
    title: 'Mango skyr drink',
  },
  {
    archived: true,
    label: 'Old electrolyte drink, 500 ml, fluid',
    meta: '500 ml · FLUID',
    title: 'Old electrolyte drink',
  },
  {
    archived: true,
    label: 'Legacy cereal, 100 g, nutrition',
    meta: '100 g · NUTRITION',
    title: 'Legacy cereal',
  },
];

export function FoodDrinkLibraryScreenPage(): ReactElement {
  return (
    <ScreenPreviewPage
      title="Food & Drink Library"
      description="Object-list states for active, archived, and empty library scopes."
    >
      <PreviewStack>
        <PhonePreview label="Active">
          <FoodDrinkLibraryScreen
            ariaLabel="Food and drink library active preview"
            rows={activeRows}
            searchId="react-food-search-active"
            scope="active"
          />
        </PhonePreview>

        <PhonePreview label="Archived">
          <FoodDrinkLibraryScreen
            ariaLabel="Food and drink library archived preview"
            rows={archivedRows}
            searchId="react-food-search-archived"
            scope="archived"
          />
        </PhonePreview>

        <PhonePreview label="Empty active">
          <FoodDrinkLibraryScreen
            ariaLabel="Food and drink library empty active preview"
            emptyBody="Create reusable foods and drinks for logging."
            emptyTitle="No items yet"
            rows={[]}
            searchId="react-food-search-empty-active"
            scope="active"
          />
        </PhonePreview>

        <PhonePreview label="Empty archived">
          <FoodDrinkLibraryScreen
            ariaLabel="Food and drink library empty archived preview"
            emptyBody="Items hidden from logging will appear here."
            emptyTitle="No archived items"
            rows={[]}
            searchId="react-food-search-empty-archived"
            scope="archived"
          />
        </PhonePreview>
      </PreviewStack>
    </ScreenPreviewPage>
  );
}

type FoodDrinkLibraryScreenProps = {
  ariaLabel: string;
  emptyBody?: string;
  emptyTitle?: string;
  rows: LibraryRow[];
  searchId: string;
  scope: Scope;
};

function FoodDrinkLibraryScreen({
  ariaLabel,
  emptyBody,
  emptyTitle,
  rows,
  searchId,
  scope,
}: FoodDrinkLibraryScreenProps) {
  return (
    <section className="my-screen" aria-label={ariaLabel}>
      <SecondaryScreenHeader backHref="" title="Food & Drink Library" />

      <div className="my-object-list-control">
        <label className="my-section-label" htmlFor={searchId}>
          SEARCH
        </label>
        <input
          className="my-line-input"
          id={searchId}
          placeholder="Search items"
          type="search"
        />
        <ScopeSelector scope={scope} />
      </div>

      <div className="my-object-list-action-row">
        <a className="my-text-action" href="#">
          CREATE ITEM
        </a>
      </div>

      <div className="my-list">
        {rows.map((row) => (
          <ListRow
            archived={row.archived}
            key={row.title}
            label={row.label}
            meta={row.meta}
            title={row.title}
          />
        ))}

        {rows.length === 0 && emptyTitle && emptyBody ? (
          <div className="my-list-state">
            <p className="my-list-state-title">{emptyTitle}</p>
            <p className="my-list-state-body">{emptyBody}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ScopeSelector({ scope }: { scope: Scope }) {
  return (
    <div className="my-scope-selector" aria-label="Filter scope">
      <a className={scope === 'active' ? 'is-active' : 'is-inactive'} href="#">
        ACTIVE
      </a>
      <span className="my-scope-divider">|</span>
      <a
        className={scope === 'archived' ? 'is-active' : 'is-inactive'}
        href="#"
      >
        ARCHIVED
      </a>
    </div>
  );
}
