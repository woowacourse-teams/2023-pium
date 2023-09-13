import type { Decorator } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../src/style/Global.style';
import theme from '../src/style/theme.style';

export const decorateGlobalStyle: Decorator = (Story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <RecoilRoot>
      <Story />
    </RecoilRoot>
  </ThemeProvider>
);

export const decorateQueryClient: Decorator = (Story) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  );
};
