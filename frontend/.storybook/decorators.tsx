import type { Decorator } from '@storybook/react';
import React from 'react';
import { GlobalStyle } from '../src/style/Global.style';

export const decorateGlobalStyle: Decorator = (Story) => (
  <>
    <GlobalStyle />
    <Story />
  </>
);
