import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 100%;

  background: white;
`;

export const PageArea = styled.main`
  position: relative;

  width: 100%;
  max-width: ${(props) => props.theme.width.pad};
  height: 100%;

  background: white;
`;
