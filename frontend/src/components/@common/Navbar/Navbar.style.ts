import { keyframes, styled } from 'styled-components';

export const Wrapper = styled.nav<{ $hide: boolean }>`
  position: fixed;
  z-index: ${(props) => props.theme.zIndex.fixed};
  bottom: 0;

  display: grid;
  grid-template-rows: 2px 58px;
  align-items: center;
  justify-content: space-around;

  width: 100%;
  max-width: ${(props) => props.theme.width.pad};
  height: 60px;
  padding: 0 8px;

  background: white;
  box-shadow: 0 -1px 1px -1px ${(props) => props.theme.color.subLight};

  transform: translateY(${({ $hide }) => ($hide ? '60px' : '0')});
  transition: transform 0.3s ease-out;
`;

export const Button = styled.button`
  height: 100%;
  grid-row-start: 2;
`;

const move = (offset: number) => keyframes`
  0% { transform: translateX(${offset}px) };
  100% { transform: translateX(0) }
`;

export const Roof = styled.div<{ $position: number; $transitionOffset: number }>`
  height: 2px;
  grid-row-start: 1;
  grid-column-start: ${({ $position }) => $position};
  background-color: ${({ theme: { color } }) => color.fontPrimaryForBackground};
  animation: ${({ $transitionOffset }) => move($transitionOffset)} 0.3s ease-out;
`;
