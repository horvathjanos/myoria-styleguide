import { FoodDrinkLibraryScreenPage } from './screens/FoodDrinkLibraryScreenPage';
import { NutritionEntryDetailScreenPage } from './screens/NutritionEntryDetailScreenPage';
import { TodayScreenPage } from './screens/TodayScreenPage';
import { StyleguidePage } from './shell/StyleguidePage';
import { StyleguideShell } from './shell/StyleguideShell';

export function StyleguideApp(): ReactElement {
  return (
    <StyleguideShell>
      <StyleguidePage
        title="Myoria UI Styleguide"
        description="Canonical screen previews and reusable interface grammar for Myoria."
      >
        <TodayScreenPage />
        <FoodDrinkLibraryScreenPage />
        <NutritionEntryDetailScreenPage />
      </StyleguidePage>
    </StyleguideShell>
  );
}
import type { ReactElement } from 'react';
