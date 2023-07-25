import { TodayStatus } from 'types/api/reminder';
import { styled } from 'styled-components';
import { BackgroundProps } from 'pages/Reminder/Reminder.style';
import theme from '../../style/theme.style';

export const convertCardStatusBar = (status: TodayStatus) => {
  switch (status) {
    case 'late':
      return theme.color.accent;
    case 'exist':
      return theme.color.primary;
    case 'none':
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

export const Image = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 50%;
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 128px;
  height: 68px;

  p {
    font: ${({ theme }) => theme.font.reminderCardContent};
    color: ${({ theme }) => theme.color.grayDark};
  }

  p:first-child {
    font: 600 1.4rem/2.1rem 'NanumsquareRound';
    color: ${({ theme }) => theme.color.sub};
  }
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

export const PutOff = styled.button`
  width: 100%;
  height: 50%;

  font: ${({ theme }) => theme.font.reminderCardContent};
  color: ${({ theme }) => theme.color.gray};

  border-top: solid 0.5px ${({ theme: { color } }) => color.gray};
`;
