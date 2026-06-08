export type StyleguideNavLink = {
  href: string;
  label: string;
};

export type StyleguideNavGroup = {
  links: StyleguideNavLink[];
  title: string;
};

export const styleguideNavGroups: StyleguideNavGroup[] = [
  {
    title: 'Foundations',
    links: [
      { href: './design-system-v1.md', label: 'Design-system v1 draft' },
      {
        href: './styleguide-tooling-contract-v1.md',
        label: 'Styleguide tooling contract',
      },
      { href: './readout-contract-v1.md', label: 'Readout contract' },
      {
        href: './progress-scale-contract-v1.md',
        label: 'Progress scale contract',
      },
      { href: './components/typography.html', label: 'Typography' },
      { href: './components/colors.html', label: 'Colors' },
      { href: './components/spacing.html', label: 'Spacing' },
      { href: './components/chevrons.html', label: 'Chevrons' },
    ],
  },
  {
    title: 'Components',
    links: [
      { href: './components/list-rows.html', label: 'List rows' },
      { href: './components/inputs.html', label: 'Inputs' },
      { href: './components/actions.html', label: 'Actions' },
      { href: './components/measurements.html', label: 'Measurements' },
      { href: './components/states.html', label: 'States' },
    ],
  },
  {
    title: 'Screens',
    links: [
      { href: './screens/today.html', label: 'Today' },
      {
        href: './screens/food-drink-library.html',
        label: 'Food & Drink Library',
      },
      {
        href: './screens/nutrition-entry-correction.html',
        label: 'Nutrition Entry Correction',
      },
      { href: './react.html', label: 'React TS Preview' },
    ],
  },
  {
    title: 'Validation',
    links: [
      { href: './validation/compact-density.html', label: 'Compact density' },
      { href: './validation/progress-scale.html', label: 'Progress scale' },
    ],
  },
];
