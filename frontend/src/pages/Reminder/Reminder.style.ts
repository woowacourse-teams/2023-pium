import { TodayStatus } from 'types/api/reminder';
import { css, styled } from 'styled-components';

export interface BackgroundProps {
  status: TodayStatus;
}

const convertReminderBackground = (status: TodayStatus) => {
  switch (status) {
    case 'late':
      return '#FCF3F3';
    case 'today':
      return '#F3FCF5';
    case 'future':
      return '#F3F3F3';
    default:
      return '#F3F3F3';
  }
};

export const Wrapper = styled.section<BackgroundProps>`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 72px);
  padding-bottom: 24px;

  background: ${({ status }) => convertReminderBackground(status)};
`;

export const HeaderBox = styled.article`
  display: flex;
  align-items: center;

  height: 72px;

  background: ${(props) => props.theme.color.background};
  border-bottom: solid 1px ${(props) => props.theme.color.gray};
`;

export const Title = styled.p`
  width: 100%;
  font: normal 2.4rem /3.2rem 'NanumSquareRound';
  text-align: center;
`;

export const ContentBox = styled.article`
  width: 100%;
  margin: 0 auto;
`;

export const MonthReminderBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-end;

  width: 332px;
  margin: 24px auto;
`;

export const MonthTitle = styled.p`
  width: 100%;
  font: 900 2.8rem/4rem 'NanumSquareRound';
`;

export const ReminderCardBox = styled.div`
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

export const DateLabel = styled.label`
  position: absolute;
  top: 8px;
  font: 700 2rem/2rem 'NanumSquareRound';
`;

export const FillStyle = css`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.color.primary};
`;

export const EmptyStyle = css`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.color.gray};
`;
