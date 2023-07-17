import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { storybookHandlers } from '../src/mocks/storybookHandlers';
import { decorateGlobalStyle } from './decorators';

initialize({
  serviceWorker: {
    url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`,
  },
  onUnhandledRequest: 'bypass',
});

const customViewPort = {
  standardViewPort: {
    name: 'standardViewPort',
    styles: {
      width: '360px',
      height: '800px',
    },
  },
};

const preview: Preview = {
  decorators: [decorateGlobalStyle],
  parameters: {
    viewport: {
      viewports: { ...INITIAL_VIEWPORTS, ...customViewPort },

      defaultViewport: 'standardViewPort',
    },
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
