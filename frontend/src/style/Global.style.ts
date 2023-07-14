import { createGlobalStyle } from 'styled-components';
import { reset } from './reset.style';

export const GlobalStyle = createGlobalStyle`
  ${reset}


  * {
    font-family: "NanumSquareRound", "Noto Sans KR", sans-serif;
  }

  html, body, #root {
    height: 100%;
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
