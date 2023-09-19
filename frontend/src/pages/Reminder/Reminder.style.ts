import { TodayStatus } from 'types/reminder';
import { Link } from 'react-router-dom';
import { css, styled } from 'styled-components';

export interface BackgroundProps {
  status: TodayStatus;
}

const convertReminderBackground: {
  [key in TodayStatus]: string;
} = {
  late: '#FCF3F3',
  today: '#F3FCF5',
  future: '#F3F3F3',
};

export const Wrapper = styled.div<BackgroundProps>`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 72px);
  padding-bottom: 68px;

  background: ${({ status }) => convertReminderBackground[status]};
`;

export const ContentBox = styled.main`
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
  font: 900 2.8rem/4rem 'GmarketSans';
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
  font: 700 2rem/2rem 'GmarketSans';
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

export const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 80%;
`;

export const Title = styled.p`
  margin-bottom: 16px;
  font: 700 2.4rem/4rem GmarketSans;
`;

export const Register = styled(Link)`
  width: 200px;
  font: 600 2rem/2.4rem GmarketSans;
  text-align: center;
`;
