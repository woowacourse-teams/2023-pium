import { styled } from 'styled-components';

export const ReminderCardBox = styled.article`
  display: flex;
  gap: 8px;
  width: 312px;
`;

export const InfoBox = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;

  width: 24px;
`;

export const DateLabel = styled.span`
  position: absolute;
  top: 8px;
  font: 700 2rem/2rem 'GmarketSans';
`;

export const CheckButton = styled.button`
  width: 20px;
  height: 20px;

  background: ${({ theme }) => theme.color.background};
  border: solid 1px ${({ theme }) => theme.color.grayDark};
  border-radius: 4px;
`;
