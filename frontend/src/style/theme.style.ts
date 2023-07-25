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
  title: 'normal 700 3.2rem/4rem "NanumSquareRound"',
  input: 'normal 500 1.8rem/2.2rem "NanumSquareRound"',
  dictTitle: 'normal 600 1.8rem/2.2rem "NanumSquareRound"',
  dictContent: 'normal 400 1.4rem/1.8rem "NanumSquareRound"',
  reminderCardContent: '500 1rem/1.5rem "NanumsquareRound"',
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
