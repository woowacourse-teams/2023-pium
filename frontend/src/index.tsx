import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import registerServiceWork from './registerServiceWork';

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { worker } = require('./mocks/browser');
  registerServiceWork('/devLocalServiceWorker.js');

  worker.start({
    serviceWorker: {
      url: 'http://localhost:8282/devLocalServiceWorker.js',
    },
  });
}

if (process.env.NODE_ENV === 'production') {
  registerServiceWork('/firebase-messaging-sw.js');
}

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
