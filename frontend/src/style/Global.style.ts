import { createGlobalStyle } from 'styled-components';
import { reset } from './reset.style';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'NanumSquareRound';
    font-weight: normal;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff') format('woff');
  }

  * {
    font-family: "Noto Sans KR", sans-serif !important;
  }
  
  /********** hidden scroll **********/
  html,
  body {
    scrollbar-width: none;
    font-size: 62.5%;
  }

  body::-webkit-scrollbar {
    display: none;
  }
`;
