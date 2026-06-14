import { createRoot } from 'react-dom/client';

import { StyleguideApp } from './src/StyleguideApp';
import { isStyleguideRouteId } from './src/styleguideRoutes';

const rootElement = document.getElementById('styleguide-root');
const routeId = document.body.dataset.styleguideRouteId;

if (!rootElement) {
  throw new Error('Missing styleguide root element.');
}

if (!routeId || !isStyleguideRouteId(routeId)) {
  throw new Error('Missing or invalid styleguide route id.');
}

createRoot(rootElement).render(<StyleguideApp routeId={routeId} />);
