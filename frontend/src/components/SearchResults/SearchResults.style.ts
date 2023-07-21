import { styled } from 'styled-components';

export const ResultArea = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 10px;
`;

export const Title = styled.p`
  font: ${({ theme }) => theme.font.dictTitle};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  padding: 10px;
`;
