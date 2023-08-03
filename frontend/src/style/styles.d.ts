import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      background: string;
      primary: string;
      sub: string;
      accent: string;
      gray: string;
      grayLight: string;
      grayDark: string;
      subLight: string;
      fontPrimaryForBackground: string;
      fontAccentForBackground: string;
    };
    font: {
      emphasize: string;
      subTitle: string;
      title: string;
      input: string;
      dictTitle: string;
      dictContent: string;
      reminderCardContent: string;
    };
    width: {
      mobile: string;
      pad: string;
    };
    zIndex: {
      dropdown: number;
      sticky: number;
      fixed: number;
      modalBackdrop: number;
      offcanvas: number;
      modal: number;
      popover: number;
      tooltip: number;
    };
  }
}
