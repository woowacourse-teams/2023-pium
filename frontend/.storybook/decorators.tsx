import type { Decorator } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../src/style/Global.style';
import theme from '../src/style/theme.style';

export const decorateGlobalStyle: Decorator = (Story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Story />
  </ThemeProvider>
);

export const decorateToastRoot: Decorator = (Story) => (
  <>
    <div id="toast-root"></div>
    <Story />
  </>
);
