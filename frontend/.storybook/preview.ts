import type { Preview } from '@storybook/react';
import { decorateGlobalStyle } from './decolators';

const preview: Preview = {
  decorators: [decorateGlobalStyle],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
