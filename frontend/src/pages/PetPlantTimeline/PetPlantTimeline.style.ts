import { styled } from 'styled-components';

export const Header = styled.header`
  position: fixed;
  z-index: ${(props) => props.theme.zIndex.fixed};
  top: 0;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  width: 100%;
  max-width: ${(props) => props.theme.width.pad};
  height: 48px;

  background-color: ${(props) => props.theme.color.background};
  box-shadow: 0 2px 2px -2px ${(props) => props.theme.color.gray};
`;

export const ButtonLabel = styled.span`
  margin-left: 1rem;
`;

export const Main = styled.main`
  position: relative;

  width: 100%;
  min-height: 100%;
  padding: 80px 0;

  background-color: white;
`;
