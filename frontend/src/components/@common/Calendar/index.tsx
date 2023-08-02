import { CalendarBox, DaysBox, HeaderBox, Wrapper } from './Calendar.style';
import useCalendar from 'hooks/useCalendar';
import { getDateToString, getDayInfo } from 'utils/date';
import { DAYS_OF_THE_WEEK } from 'constants/index';
import DaySmallBox from './DaySmallBox';

interface CalendarProps {
  currentDate: Date;
  dateCallback: ((value: string) => void) | null;
  max?: React.InputHTMLAttributes<HTMLInputElement>['max'];
  min?: React.InputHTMLAttributes<HTMLInputElement>['min'];
}

const Calendar = ({ currentDate, min, max, dateCallback }: CalendarProps) => {
  const { monthInfo, prevMonth, nextMonth } = useCalendar(currentDate);
  const { year, month, monthFirstDay, monthLastDate } = monthInfo;
  const boxLength = monthFirstDay + monthLastDate <= 35 ? 35 : 42;

  const daysOfWeeks = DAYS_OF_THE_WEEK.map((day) => <DaySmallBox key={day} date={day} />);
  const days = Array.from({ length: boxLength }).map((_, idx) => {
    const { date, isShow, isToday, currentDate, isInRange } = getDayInfo({
      idx,
      monthInfo,
      min,
      max,
    });

    const currentDay = isShow ? getDateToString(currentDate) : '';

    return isShow ? (
      <DaySmallBox
        key={idx}
        date={date}
        isToday={isToday}
        currentDate={currentDate}
        isInRange={isInRange}
        clickHandler={() => dateCallback?.(currentDay)}
      />
    ) : (
      <DaySmallBox key={idx} />
    );
  });

  const yearMonth = `${year}년 ${month}월`;

  return (
    <Wrapper role="application" aria-label="달력" aria-roledescription="calendar">
      <HeaderBox role="group">
        <button type="button" onClick={prevMonth} aria-label="이전 달 보기">
          {'<'}
        </button>
        <p role="alert">{yearMonth}</p>
        <button type="button" onClick={nextMonth} aria-label="다음 달 보기">
          {'>'}
        </button>
      </HeaderBox>
      <DaysBox>{daysOfWeeks}</DaysBox>
      <CalendarBox>{days}</CalendarBox>
    </Wrapper>
  );
};

export default Calendar;
