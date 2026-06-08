import { PhonePreview } from '../shell/PhonePreview';
import { PreviewStack } from '../shell/PreviewStack';

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

export function FoodDrinkLibraryPreview() {
  return (
    <PreviewStack>
      <PhonePreview label="Active scope">
        <FoodDrinkLibraryScreen
          ariaLabel="Food and drink library React active preview"
          rows={activeRows}
          searchId="react-food-search-active"
          scope="active"
        />
      </PhonePreview>

      <PhonePreview label="Archived scope">
        <FoodDrinkLibraryScreen
          ariaLabel="Food and drink library React archived preview"
          rows={archivedRows}
          searchId="react-food-search-archived"
          scope="archived"
        />
      </PhonePreview>

      <PhonePreview label="Empty active scope">
        <FoodDrinkLibraryScreen
          ariaLabel="Food and drink library React empty active preview"
          emptyBody="Create reusable foods and drinks for logging."
          emptyTitle="No items yet"
          rows={[]}
          searchId="react-food-search-empty-active"
          scope="active"
        />
      </PhonePreview>

      <PhonePreview label="Empty archived scope">
        <FoodDrinkLibraryScreen
          ariaLabel="Food and drink library React empty archived preview"
          emptyBody="Items hidden from logging will appear here."
          emptyTitle="No archived items"
          rows={[]}
          searchId="react-food-search-empty-archived"
          scope="archived"
        />
      </PhonePreview>
    </PreviewStack>
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
      <header className="my-screen-header">
        <a className="my-back-control" href="./index.html" aria-label="Go back">
          <span className="my-chevron my-chevron--left" aria-hidden="true" />
        </a>
        <h2 className="my-screen-title">Food & Drink Library</h2>
      </header>

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
          <LibraryListRow key={row.title} row={row} />
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

function LibraryListRow({ row }: { row: LibraryRow }) {
  const className = row.archived
    ? 'my-list-row my-list-row--archived'
    : 'my-list-row';

  return (
    <a className={className} href="#" aria-label={row.label}>
      <span className="my-list-row-main">
        <span className="my-list-row-content">
          <span className="my-list-row-title">{row.title}</span>
          <span className="my-list-row-meta">{row.meta}</span>
        </span>
        <span className="my-list-row-chevron-zone" aria-hidden="true">
          <span className="my-chevron" />
        </span>
      </span>
    </a>
  );
}
