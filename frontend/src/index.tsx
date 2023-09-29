import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import swDev from './swDev';

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { worker } = require('./mocks/browser');

  worker.start({
    serviceWorker: {
      url: 'http://localhost:8282/mockServiceWorker.js',
    },
  });
} else {
  swDev();
}
const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
