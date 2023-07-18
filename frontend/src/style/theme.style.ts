import { DefaultTheme } from 'styled-components';

const color = {
  background: '#FFFFFF',
  primary: '#1BCC66',
  sub: '#333333',
  accent: '#EB4D3D',
};

const font = {
  emphasize: '',
  subTitle: '',
  title: 'normal 700 3.2rem/4rem',
  input: 'normal 500 1.8rem/2.2rem',
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
