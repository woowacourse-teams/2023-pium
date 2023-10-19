import styled from 'styled-components';

export const Wrapper = styled.header`
  position: fixed;
  z-index: ${(props) => props.theme.zIndex.fixed};
  top: 0;

  display: flex;
  align-items: center;

  width: 100%;
  max-width: ${(props) => props.theme.width.pad};
  height: 48px;
  padding: 0 16px;

  background-color: ${(props) => props.theme.color.background + 'aa'};
  backdrop-filter: blur(2px);
  box-shadow: 0 2px 2px -2px ${(props) => props.theme.color.gray};
`;

export const BackButton = styled.button`
  position: absolute;
  left: 16px;
  display: flex;
  align-items: center;
`;
