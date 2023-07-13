import { GlobalStyle } from '../src/style/Global.style';
import type { Decorator } from '@storybook/react';
import React from 'react';

export const decorateGlobalStyle: Decorator = (Story) => (
  <>
    <GlobalStyle />
    <Story />
  </>
);
