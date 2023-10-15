import styled from 'styled-components';

export const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 4px;

  height: 200px;
  padding: 40px 0;

  font: 700 1.6rem/2rem NanumSquareRound;
  text-align: center;

  border-top: 1px solid ${({ theme }) => theme.color.grayLight};
`;
