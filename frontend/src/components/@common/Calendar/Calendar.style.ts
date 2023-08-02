import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
`;

export const HeaderBox = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 16px;

  font: 900 2rem/3.2rem 'NanumSquareRound';
`;

export const CalendarBox = styled.section`
  display: grid;
  grid-auto-rows: 40px;
  grid-template-columns: repeat(7, 40px);

  width: 300px;
  margin: 0 auto;

  font: 500 1.6rem/2.4rem 'NanumSquareRound';
  text-align: center;
`;

export const DaysBox = styled(CalendarBox)`
  margin-bottom: 8px;
`;
