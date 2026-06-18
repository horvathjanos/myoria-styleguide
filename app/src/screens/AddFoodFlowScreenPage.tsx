import type { ReactElement } from 'react';

import {
  PhonePreview,
  PreviewStack,
  ScreenPreviewPage,
  TextAction,
} from '../components';

type AddFoodRow = {
  defaultAmount: string;
  kcal: string;
  macros: string;
  title: string;
};

const recentRows: AddFoodRow[] = [
  {
    defaultAmount: 'Default 100 g',
    kcal: '165 kcal',
    macros: '31 g protein · 0 g carbs · 3.6 g fat',
    title: 'Chicken breast',
  },
  {
    defaultAmount: 'Default 350 ml',
    kcal: '245 kcal',
    macros: '35 g protein · 14 g carbs · 3 g fat · also logs Fluid',
    title: 'NÖM PRO 35 Protein Drink Chocolate',
  },
  {
    defaultAmount: 'Default 100 g',
    kcal: '130 kcal',
    macros: '2.4 g protein · 28 g carbs · 0.3 g fat',
    title:
      'Very long catalog food name with extra preparation notes and brand text',
  },
];

const searchRows: AddFoodRow[] = [
  {
    defaultAmount: 'Default 100 g',
    kcal: '165 kcal',
    macros: '31 g protein · 0 g carbs · 3.6 g fat',
    title: 'Chicken breast',
  },
  {
    defaultAmount: 'Default 150 g',
    kcal: '248 kcal',
    macros: '46.5 g protein · 0 g carbs · 5.4 g fat',
    title: 'Chicken breast cooked skinless portion from meal prep container',
  },
];

export function AddFoodFlowScreenPage(): ReactElement {
  return (
    <ScreenPreviewPage
      title="Add Food Flow"
      description="Task-flow grammar for selecting and logging a catalog food from Nutrition Report."
    >
      <PreviewStack>
        <PhonePreview label="Default">
          <AddFoodFlowScreen
            ariaLabel="Add Food default preview"
            context="Tuesday, 2 June · Nutrition report"
            inputId="react-add-food-search-default"
            rows={recentRows}
            searchValue=""
            sectionLabel="Recent"
          />
        </PhonePreview>

        <PhonePreview label="Search">
          <AddFoodFlowScreen
            ariaLabel="Add Food search preview"
            context="Tuesday, 2 June · Nutrition report"
            inputId="react-add-food-search-results"
            rows={searchRows}
            searchValue="chicken"
            sectionLabel="Search results"
          />
        </PhonePreview>

        <PhonePreview label="No Results">
          <AddFoodFlowScreen
            ariaLabel="Add Food no results preview"
            context="Tuesday, 2 June · Nutrition report"
            emptyBody="Try a simpler catalog name or add the item in Food & Drink Library later."
            emptyTitle="No catalog foods match this search"
            inputId="react-add-food-search-empty"
            rows={[]}
            searchValue="protein croissant"
            sectionLabel="Search results"
          />
        </PhonePreview>

        <PhonePreview label="Loading/Error">
          <AddFoodFlowScreen
            ariaLabel="Add Food loading and error preview"
            context="Tuesday, 2 June · Nutrition report"
            inputId="react-add-food-search-loading"
            isLoading
            localError="Food search could not load."
            rows={[]}
            searchValue="skyr"
            sectionLabel="Search results"
          />
        </PhonePreview>
      </PreviewStack>
    </ScreenPreviewPage>
  );
}

type AddFoodFlowScreenProps = {
  ariaLabel: string;
  context: string;
  emptyBody?: string;
  emptyTitle?: string;
  inputId: string;
  isLoading?: boolean;
  localError?: string;
  rows: AddFoodRow[];
  searchValue: string;
  sectionLabel: string;
};

function AddFoodFlowScreen({
  ariaLabel,
  context,
  emptyBody,
  emptyTitle,
  inputId,
  isLoading = false,
  localError,
  rows,
  searchValue,
  sectionLabel,
}: AddFoodFlowScreenProps): ReactElement {
  return (
    <section className="my-screen my-add-food-flow" aria-label={ariaLabel}>
      <section className="my-screen-lead" aria-label="Add Food identity">
        <p className="my-screen-lead-title">Add food</p>
        <p className="my-screen-lead-meta">{context}</p>
      </section>

      <div className="my-add-food-search">
        <label className="my-section-label" htmlFor={inputId}>
          Search catalog
        </label>
        <input
          className="my-line-input"
          id={inputId}
          placeholder="Search catalog foods"
          readOnly
          type="search"
          value={searchValue}
        />
      </div>

      {isLoading ? (
        <p className="my-local-status" role="status">
          Loading foods
        </p>
      ) : null}

      {localError ? (
        <p className="my-local-error" role="alert">
          {localError}
        </p>
      ) : null}

      <section className="my-add-food-results" aria-label={sectionLabel}>
        <p className="my-section-label">{sectionLabel}</p>
        <div className="my-add-food-list">
          {rows.map((row) => (
            <AddFoodOptionRow
              key={`${row.title}-${row.defaultAmount}`}
              row={row}
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

      <div className="my-action-row my-add-food-action-row">
        <TextAction href="#">Cancel</TextAction>
      </div>
    </section>
  );
}

function AddFoodOptionRow({ row }: { row: AddFoodRow }): ReactElement {
  return (
    <a
      aria-label={`Select food ${row.title}`}
      className="my-add-food-row"
      href="#"
    >
      <span className="my-add-food-row-main">
        <span className="my-add-food-row-primary">
          <span className="my-add-food-row-title">{row.title}</span>
          <span className="my-add-food-row-kcal">{row.kcal}</span>
        </span>
        <span className="my-add-food-row-default">{row.defaultAmount}</span>
        <span className="my-add-food-row-macros">{row.macros}</span>
      </span>
    </a>
  );
}
