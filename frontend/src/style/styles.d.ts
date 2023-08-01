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
      sub100: string;
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
  }
}
