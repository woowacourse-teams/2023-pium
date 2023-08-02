import { ReminderStatus } from 'types/api/reminder';
import { styled } from 'styled-components';
import { BackgroundProps } from 'pages/Reminder/Reminder.style';
import theme from '../../../style/theme.style';

export const convertCardStatusBar = (status: ReminderStatus) => {
  switch (status) {
    case 'late':
      return theme.color.accent;
    case 'today':
      return theme.color.primary;
    case 'future':
      return theme.color.grayDark;
    default:
      return theme.color.grayDark;
  }
};

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 280px;
  height: 86px;

  background: ${({ theme }) => theme.color.background};
  border: solid 0.5px ${({ theme }) => theme.color.grayLight};
  border-radius: 8px 0 0 8px;
`;

export const StatusBar = styled.div<BackgroundProps>`
  width: 6px;
  height: 100%;
  background: ${({ status }) => convertCardStatusBar(status)};
  border-radius: 8px 0 0 8px;
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 128px;
  height: 68px;
`;

export const NickName = styled.p`
  font: 600 1.4rem/2.1rem 'NanumsquareRound';
  color: ${({ theme }) => theme.color.sub};
`;

export const DictionaryPlantName = styled.p`
  color: ${({ theme }) => theme.color.grayDark};
`;

export const Alert = styled.p<BackgroundProps>`
  font: ${({ theme }) => theme.font.reminderCardContent};
  color: ${({ status }) => convertCardStatusBar(status)};
`;

export const ActionBox = styled.div`
  width: 58px;
  height: 100%;
  border-left: solid 0.5px ${({ theme }) => theme.color.gray};

  div {
    height: 50%;
    label {
      font: ${({ theme }) => theme.font.reminderCardContent};
    }
    input {
      height: 100%;
    }
  }
`;
