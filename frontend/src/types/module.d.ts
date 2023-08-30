import theme from './theme.style';

declare module '*.svg';
declare module '*.png';

declare module 'styled-components' {
  export type DefaultTheme = typeof theme;
}
