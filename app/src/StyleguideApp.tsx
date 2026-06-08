import { FoodDrinkLibraryPreview } from './screens/FoodDrinkLibraryPreview';
import { StyleguidePage } from './shell/StyleguidePage';
import { StyleguideShell } from './shell/StyleguideShell';

export function StyleguideApp() {
  return (
    <StyleguideShell currentHref="./react.html">
      <StyleguidePage
        title="React TS Preview"
        description="Small React and TypeScript styleguide shell proof. This preview reuses the existing static CSS/tokens and migrates only Food & Drink Library for now."
      >
        <FoodDrinkLibraryPreview />
      </StyleguidePage>
    </StyleguideShell>
  );
}
