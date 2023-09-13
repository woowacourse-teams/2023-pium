import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { withRouter } from 'storybook-addon-react-router-v6';
import dictionaryPlantRegistrationHandlers from '../src/mocks/handlers/dictionaryPlantRegistration';
import { storybookHandlers } from '../src/mocks/storybookHandlers';
import { decorateGlobalStyle, decorateQueryClient } from './decorators';

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
  decorators: [decorateGlobalStyle, decorateQueryClient, withRouter],
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

    msw: { handlers: [...storybookHandlers, ...dictionaryPlantRegistrationHandlers] },
  },

  loaders: [mswLoader],
};

export default preview;
