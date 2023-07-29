import { styled } from 'styled-components';

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  padding: 30px 10px;
`;

export const Title = styled.h1`
  padding-left: 10px;
  font: ${({ theme }) => theme.font.title};
`;
