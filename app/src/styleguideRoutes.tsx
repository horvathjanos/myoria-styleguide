import type { ComponentType } from 'react';

import { ActionsPage } from './pages/components/ActionsPage';
import { ChevronsPage } from './pages/components/ChevronsPage';
import { InputsPage } from './pages/components/InputsPage';
import { ListRowsPage } from './pages/components/ListRowsPage';
import { MeasurementsPage } from './pages/components/MeasurementsPage';
import { StatesPage } from './pages/components/StatesPage';
import { ColorsPage } from './pages/foundations/ColorsPage';
import { DesignSystemPage } from './pages/foundations/DesignSystemPage';
import { SpacingPage } from './pages/foundations/SpacingPage';
import { TypographyPage } from './pages/foundations/TypographyPage';
import { HomePage } from './pages/HomePage';
import { CompactDensityPage } from './pages/validation/CompactDensityPage';
import { ProgressScalePage } from './pages/validation/ProgressScalePage';
import { ValidationOverviewPage } from './pages/validation/ValidationOverviewPage';
import { BodyWeightEntryDetailScreenPage } from './screens/BodyWeightEntryDetailScreenPage';
import { FluidEntryDetailScreenPage } from './screens/FluidEntryDetailScreenPage';
import { FoodDrinkLibraryScreenPage } from './screens/FoodDrinkLibraryScreenPage';
import { NutritionEntryDetailScreenPage } from './screens/NutritionEntryDetailScreenPage';
import { ReportDayScreenPage } from './screens/ReportDayScreenPage';
import { TodayScreenPage } from './screens/TodayScreenPage';

export type StyleguideRouteGroup =
  | 'Foundations'
  | 'Components'
  | 'Screens'
  | 'Validation';

type StyleguideRouteDefinition = Readonly<{
  group?: StyleguideRouteGroup;
  id: string;
  navLabel?: string;
  page: ComponentType;
  path: string;
  title: string;
}>;

export const styleguideRoutes = [
  {
    id: 'home',
    path: '',
    title: 'Myoria UI Styleguide',
    page: HomePage,
  },
  {
    group: 'Foundations',
    id: 'design-system',
    navLabel: 'Design system',
    path: 'foundations/design-system/',
    title: 'Design system',
    page: DesignSystemPage,
  },
  {
    group: 'Foundations',
    id: 'typography',
    navLabel: 'Typography',
    path: 'foundations/typography/',
    title: 'Typography',
    page: TypographyPage,
  },
  {
    group: 'Foundations',
    id: 'colors',
    navLabel: 'Colors',
    path: 'foundations/colors/',
    title: 'Colors',
    page: ColorsPage,
  },
  {
    group: 'Foundations',
    id: 'spacing',
    navLabel: 'Spacing',
    path: 'foundations/spacing/',
    title: 'Spacing',
    page: SpacingPage,
  },
  {
    group: 'Components',
    id: 'actions',
    navLabel: 'Actions',
    path: 'components/actions/',
    title: 'Actions',
    page: ActionsPage,
  },
  {
    group: 'Components',
    id: 'inputs',
    navLabel: 'Inputs',
    path: 'components/inputs/',
    title: 'Inputs',
    page: InputsPage,
  },
  {
    group: 'Components',
    id: 'list-rows',
    navLabel: 'List rows',
    path: 'components/list-rows/',
    title: 'List rows',
    page: ListRowsPage,
  },
  {
    group: 'Components',
    id: 'measurements',
    navLabel: 'Measurements',
    path: 'components/measurements/',
    title: 'Measurements',
    page: MeasurementsPage,
  },
  {
    group: 'Components',
    id: 'states',
    navLabel: 'States',
    path: 'components/states/',
    title: 'States',
    page: StatesPage,
  },
  {
    group: 'Components',
    id: 'chevrons',
    navLabel: 'Chevrons',
    path: 'components/chevrons/',
    title: 'Chevrons',
    page: ChevronsPage,
  },
  {
    group: 'Screens',
    id: 'today',
    navLabel: 'Today',
    path: 'screens/today/',
    title: 'Today',
    page: TodayScreenPage,
  },
  {
    group: 'Screens',
    id: 'food-drink-library',
    navLabel: 'Food & Drink Library',
    path: 'screens/food-drink-library/',
    title: 'Food & Drink Library',
    page: FoodDrinkLibraryScreenPage,
  },
  {
    group: 'Screens',
    id: 'report-day',
    navLabel: 'Report Day',
    path: 'screens/report-day/',
    title: 'Report Day',
    page: ReportDayScreenPage,
  },
  {
    group: 'Screens',
    id: 'nutrition-entry-detail',
    navLabel: 'Nutrition Entry Detail',
    path: 'screens/nutrition-entry-detail/',
    title: 'Nutrition Entry Detail',
    page: NutritionEntryDetailScreenPage,
  },
  {
    group: 'Screens',
    id: 'fluid-entry-detail',
    navLabel: 'Fluid Entry Detail',
    path: 'screens/fluid-entry-detail/',
    title: 'Fluid Entry Detail',
    page: FluidEntryDetailScreenPage,
  },
  {
    group: 'Screens',
    id: 'body-weight-entry-detail',
    navLabel: 'Body Weight Entry Detail',
    path: 'screens/body-weight-entry-detail/',
    title: 'Body Weight Entry Detail',
    page: BodyWeightEntryDetailScreenPage,
  },
  {
    group: 'Validation',
    id: 'validation',
    navLabel: 'Overview',
    path: 'validation/',
    title: 'Validation',
    page: ValidationOverviewPage,
  },
  {
    group: 'Validation',
    id: 'compact-density',
    navLabel: 'Compact density',
    path: 'validation/compact-density/',
    title: 'Compact density',
    page: CompactDensityPage,
  },
  {
    group: 'Validation',
    id: 'progress-scale',
    navLabel: 'Progress scale',
    path: 'validation/progress-scale/',
    title: 'Progress scale',
    page: ProgressScalePage,
  },
] as const satisfies readonly StyleguideRouteDefinition[];

export type StyleguideRoute = (typeof styleguideRoutes)[number];
export type StyleguideRouteId = StyleguideRoute['id'];

type StyleguideLegacyRoute = Readonly<{
  path: string;
  routeId: StyleguideRouteId;
}>;

export const styleguideLegacyRoutes = [
  { path: 'react.html', routeId: 'home' },
  { path: 'components/actions.html', routeId: 'actions' },
  { path: 'components/chevrons.html', routeId: 'chevrons' },
  { path: 'components/colors.html', routeId: 'colors' },
  { path: 'components/inputs.html', routeId: 'inputs' },
  { path: 'components/list-rows.html', routeId: 'list-rows' },
  { path: 'components/measurements.html', routeId: 'measurements' },
  { path: 'components/spacing.html', routeId: 'spacing' },
  { path: 'components/states.html', routeId: 'states' },
  { path: 'components/typography.html', routeId: 'typography' },
  {
    path: 'screens/food-drink-library.html',
    routeId: 'food-drink-library',
  },
  {
    path: 'screens/nutrition-entry-correction.html',
    routeId: 'nutrition-entry-detail',
  },
  { path: 'screens/today.html', routeId: 'today' },
  {
    path: 'validation/compact-density.html',
    routeId: 'compact-density',
  },
  {
    path: 'validation/progress-scale.html',
    routeId: 'progress-scale',
  },
] as const satisfies readonly StyleguideLegacyRoute[];

const styleguideRouteIds = new Set<string>(
  styleguideRoutes.map((route) => route.id),
);

export const styleguideNavGroups = (
  ['Foundations', 'Components', 'Screens', 'Validation'] as const
).map((title) => ({
  title,
  links: styleguideRoutes.flatMap((route) => {
    if (!('group' in route) || route.group !== title) {
      return [];
    }

    return [
      {
        label: route.navLabel,
        routeId: route.id,
      },
    ];
  }),
}));

export function getStyleguideRoute(
  routeId: StyleguideRouteId,
): StyleguideRoute {
  const route = styleguideRoutes.find((candidate) => candidate.id === routeId);

  if (!route) {
    throw new Error(`Unknown styleguide route: ${routeId}`);
  }

  return route;
}

export function getStyleguideRouteHref(routeId: StyleguideRouteId): string {
  const route = getStyleguideRoute(routeId);

  return route.path;
}

export function isStyleguideRouteId(value: string): value is StyleguideRouteId {
  return styleguideRouteIds.has(value);
}
