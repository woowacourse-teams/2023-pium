import { DefaultTheme } from 'styled-components';

const color = {
  background: '#FFFFFF',
  primary: '#1BCC66',
  fontPrimaryForBackground: '#008929',
  fontAccentForBackground: '#d73a2e',
  sub: '#333333',
  subLight: '#444444',
  accent: '#EB4D3D',
  gray: '#C8C8C8',
  grayLight: '#ECECEC',
  grayDark: '#A5A5A5',
};

const font = {
  emphasize: '',
  subTitle: 'normal 600 2rem/2.4rem "GmarketSansMedium"',
  title: 'normal 700 3.2rem/4rem "GmarketSansMedium"',
  input: 'normal 500 1.8rem/2.2rem "GmarketSansMedium"',
  dictTitle: 'normal 600 1.8rem/2.2rem "GmarketSansMedium"',
  dictContent: 'normal 400 1.4rem/1.8rem "GmarketSansMedium"',
  reminderCardContent: '500 1rem/1.5rem "GmarketSansMedium"',
};

const width = {
  mobile: '360px',
  pad: '768px',
};

const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  offcanvas: 1050,
  modal: 1060,
  popover: 1070,
  tooltip: 1080,
};

const theme: DefaultTheme = {
  color,
  font,
  width,
  zIndex,
};

export default theme;
