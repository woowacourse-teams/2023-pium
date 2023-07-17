import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 100%;

  background: white;
`;

export const PageArea = styled.main`
  width: 100%;
  max-width: ${(props) => props.theme.width.pad};
  height: 100%;
  padding: 0 16px;

  background: white;
`;
