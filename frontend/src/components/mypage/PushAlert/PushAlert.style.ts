import styled from 'styled-components';

export const PushAlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: space-around;

  width: 80%;
  margin: 0 auto;
`;

export const WarnParagraph = styled.p`
  font: 400 1.2rem/1.6rem NanumSquareRound;
  color: ${({ theme }) => theme.color.accent};
  text-align: right;
`;

export const PushAlertContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  p {
    font: 600 1.6rem/2rem NanumSquareRound;
  }
`;
