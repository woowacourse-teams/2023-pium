import { createGlobalStyle } from 'styled-components';
import GmarketSansBold from 'assets/fonts/GmarketSansOTF/GmarketSansBold.otf';
import GmarketSansLight from 'assets/fonts/GmarketSansOTF/GmarketSansLight.otf';
import GmarketSansMedium from 'assets/fonts/GmarketSansOTF/GmarketSansMedium.otf';

export const GlobalFont = createGlobalStyle`
  @font-face {
    font-family: 'GmarketSansMedium';
    font-weight: 500;
    font-style: normal;
    src: local('GmarketSansOTFMedium'), local('GmarketSansOTFMedium');
    src: url(${GmarketSansMedium}) format('opentype');
  };

  @font-face {
    font-family: 'GmarketSansLight';
    font-weight: 200;
    font-style: normal;
    src: local('GmarketSansOTFLight'), local('GmarketSansOTFLight');
    src: url(${GmarketSansLight}) format('opentype');
  };

  @font-face {
    font-family: 'GmarketSansBold';
    font-weight: 900;
    font-style: bold;
    src: local('GmarketSansOTFBold'), local('GmarketSansOTFBold');
    src: url(${GmarketSansBold}) format('opentype');
  };
`;
