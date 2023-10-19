import styled from 'styled-components';

export const Wrapper = styled.header<{ $transparent: boolean }>`
  position: fixed;
  z-index: ${(props) => props.theme.zIndex.fixed};
  top: 0;

  display: flex;
  align-items: center;

  width: 100%;
  max-width: ${(props) => props.theme.width.pad};
  height: 48px;
  padding: 0 16px;

  background-color: ${(props) =>
    props.$transparent ? 'transparent' : props.theme.color.background};
  box-shadow: 0 2px 2px -2px ${(props) => (props.$transparent ? 'transparent' : props.theme.color.gray)};
`;

export const BackButton = styled.button`
  position: absolute;
  left: 16px;

  display: flex;
  align-items: center;

  width: 20px;
`;

export const TransparentSensor = styled.div<{ $height: `${string}px` }>`
  position: absolute;
  top: 0;
  height: ${(props) => props.$height};
`;
