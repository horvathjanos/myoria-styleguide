import { FoodDrinkLibraryPreview } from './screens/FoodDrinkLibraryPreview';
import { TodayPreview } from './screens/TodayPreview';
import { StyleguidePage } from './shell/StyleguidePage';
import { StyleguideShell } from './shell/StyleguideShell';

export function StyleguideApp() {
  return (
    <StyleguideShell currentHref="./react.html">
      <StyleguidePage
        title="React TS Preview"
        description="Small React and TypeScript styleguide shell proof. These previews reuse the existing static CSS/tokens while migrating screens incrementally."
      >
        <TodayPreview />
        <FoodDrinkLibraryPreview />
      </StyleguidePage>
    </StyleguideShell>
  );
}
