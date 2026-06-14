type StyleguideNavLink = Readonly<{
  href: string;
  label: string;
}>;

type StyleguideNavGroup = Readonly<{
  links: readonly StyleguideNavLink[];
  title: string;
}>;

export const styleguideNavGroups = [
  {
    title: 'Foundations',
    links: [
      { href: './design-system-v1.md', label: 'Design system' },
      { href: './components/colors.html', label: 'Colors' },
      { href: './components/typography.html', label: 'Typography' },
      { href: './components/spacing.html', label: 'Spacing' },
      { href: './readout-contract-v1.md', label: 'Readouts' },
      {
        href: './progress-scale-contract-v1.md',
        label: 'Progress scales',
      },
    ],
  },
  {
    title: 'Components',
    links: [
      {
        href: './screen-composition-contract-v1.md',
        label: 'Screen headers',
      },
      { href: './components/measurements.html', label: 'Measurements' },
      { href: './components/list-rows.html', label: 'List rows' },
      { href: './components/actions.html', label: 'Actions' },
      { href: './components/inputs.html', label: 'Inputs' },
      { href: './components/states.html', label: 'States' },
      {
        href: './design-system-v1.md#10a-snapshot-detail-facts',
        label: 'Snapshot details',
      },
    ],
  },
  {
    title: 'Screens',
    links: [
      { href: './react.html#today', label: 'Today' },
      {
        href: './react.html#food-drink-library',
        label: 'Food & Drink Library',
      },
      {
        href: './react.html#nutrition-entry-detail',
        label: 'Nutrition Entry Detail',
      },
    ],
  },
  {
    title: 'Validation',
    links: [
      {
        href: './validation/compact-density.html',
        label: 'Compact density',
      },
      {
        href: './validation/progress-scale.html',
        label: 'Progress scale',
      },
    ],
  },
] as const satisfies readonly StyleguideNavGroup[];

export type StyleguideHref =
  (typeof styleguideNavGroups)[number]['links'][number]['href'];

export type StyleguideScreenId =
  | 'today'
  | 'food-drink-library'
  | 'nutrition-entry-detail';

export const DEFAULT_STYLEGUIDE_SCREEN_ID: StyleguideScreenId = 'today';

export function isStyleguideScreenId(
  value: string,
): value is StyleguideScreenId {
  return (
    value === 'today' ||
    value === 'food-drink-library' ||
    value === 'nutrition-entry-detail'
  );
}
