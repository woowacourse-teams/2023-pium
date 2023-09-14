import type { Decorator } from '@storybook/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../src/style/Global.style';
import theme from '../src/style/theme.style';
import SvgIcons from './SvgIcon';

export const decorateGlobalStyle: Decorator = (Story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <RecoilRoot>
      <SvgIcons />
      <Story />
    </RecoilRoot>
  </ThemeProvider>
);

export const decorateToastRoot: Decorator = (Story) => (
  <>
    <div id="toast-root"></div>
    <Story />
  </>
);
