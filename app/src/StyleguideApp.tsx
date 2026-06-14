import type { ReactElement } from 'react';

import { StyleguideShell } from './shell/StyleguideShell';
import { getStyleguideRoute, type StyleguideRouteId } from './styleguideRoutes';

type StyleguideAppProps = {
  routeId: StyleguideRouteId;
};

export function StyleguideApp({ routeId }: StyleguideAppProps): ReactElement {
  const route = getStyleguideRoute(routeId);
  const Page = route.page;

  return (
    <StyleguideShell currentRouteId={routeId}>
      <Page />
    </StyleguideShell>
  );
}
