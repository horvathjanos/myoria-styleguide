import { createRoot } from 'react-dom/client';

import { StyleguideApp } from './src/StyleguideApp';

const rootElement = document.getElementById('styleguide-root');

if (!rootElement) {
  throw new Error('Missing styleguide root element.');
}

createRoot(rootElement).render(<StyleguideApp />);
