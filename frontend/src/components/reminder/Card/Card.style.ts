import { TodayStatus } from 'types/reminder';
import { styled } from 'styled-components';
import { BackgroundProps } from 'pages/Reminder/Reminder.style';
import theme from 'style/theme.style';

const convertCardStatusBar: {
  [key in TodayStatus]: string;
} = {
  late: theme.color.fontAccentForBackground,
  today: theme.color.fontPrimaryForBackground,
  future: theme.color.subLight,
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
  background: ${({ status }) => convertCardStatusBar[status]};
  border-radius: 8px 0 0 8px;
`;

export const ContentBox = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 128px;
  height: 68px;

  li {
    overflow: hidden;
    width: auto;
  }
`;

export const NickName = styled.li`
  font: 600 1.4rem/2.1rem 'GmarketSans';
  color: ${({ theme }) => theme.color.sub};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DictionaryPlantName = styled.li`
  color: ${({ theme }) => theme.color.grayDark};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Alert = styled.li<BackgroundProps>`
  font: ${({ theme }) => theme.font.reminderCardContent};
  color: ${({ status }) => convertCardStatusBar[status]};
`;

export const ActionBox = styled.div`
  width: 58px;
  height: 100%;
  border-left: solid 0.5px ${({ theme }) => theme.color.gray};

  div {
    height: 50%;
    &:last-child {
      border-top: solid 0.5px ${({ theme }) => theme.color.gray};
    }

    label {
      font: ${({ theme }) => theme.font.reminderCardContent};
    }
    input {
      height: 100%;
    }
  }
`;
