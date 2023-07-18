import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { storybookHandlers } from '../src/mocks/storybookHandlers';
import { decorateGlobalStyle, decorateToastRoot } from './decorators';

initialize({
  serviceWorker: {
    url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`,
  },
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  decorators: [decorateGlobalStyle, decorateToastRoot],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    msw: { handlers: [...storybookHandlers] },
  },

  loaders: [mswLoader],
};

export default preview;
