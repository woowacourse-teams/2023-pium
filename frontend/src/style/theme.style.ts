import { DefaultTheme } from 'styled-components';

const color = {
  background: '#FFFFFF',
  primary: '#1BCC66',
  sub: '#333333',
  accent: '#EB4D3D',
  gray: '#C8C8C8',
  grayLight: '#ECECEC',
  grayDark: '#A5A5A5',
};

const font = {
  emphasize: '',
  subTitle: '',
  title: 'normal 700 3.2rem/4rem NanumSquareRound',
};

const width = {
  mobile: '360px',
  pad: '768px',
};

const theme: DefaultTheme = {
  color,
  font,
  width,
};

export default theme;
