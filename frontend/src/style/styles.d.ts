import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      background: string;
      primary: string;
      sub: string;
      accent: string;
    };
    font: {
      emphasize: string;
      subTitle: string;
      title: string;
    };
  }
}
