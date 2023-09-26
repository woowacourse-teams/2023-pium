import { styled } from 'styled-components';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  row-gap: 80px;
  margin-top: 80px;
`;

export const Description = styled.p`
  font: ${({ theme: { font } }) => font.dictTitle};
  text-align: center;
`;
