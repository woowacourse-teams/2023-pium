import { CalendarBox, DaysBox, HeaderBox, Wrapper } from './Calendar.style';
import useCalendar from 'hooks/useCalendar';
import useToast from 'hooks/useToast';
import { getDateToString, getDayInfo } from 'utils/date';
import { DAYS_OF_THE_WEEK } from 'constants/index';
import ArrowLeft from '../Icons/ArrowLeft';
import ArrowRight from '../Icons/ArrowRight';
import DaySmallBox from './DaySmallBox';

interface CalendarProps {
  currentDate: Date;
  dateCallback: ((value: string) => void) | null;
  max?: React.InputHTMLAttributes<HTMLInputElement>['max'];
  min?: React.InputHTMLAttributes<HTMLInputElement>['min'];
}

const Calendar = ({ currentDate, min, max, dateCallback }: CalendarProps) => {
  const { monthInfo, setPrevMonth, setNextMonth } = useCalendar(currentDate);
  const { year, month, monthFirstDay, monthLastDate } = monthInfo;
  const boxLength = monthFirstDay + monthLastDate <= 35 ? 35 : 42;
  const { addToast } = useToast();

  const daysOfWeeks = DAYS_OF_THE_WEEK.map((day) => <DaySmallBox key={day} date={day} />);
  const days = Array.from({ length: boxLength }).map((_, idx) => {
    const { date, isShow, isToday, currentDate, isInRange } = getDayInfo({
      idx,
      monthInfo,
      min,
      max,
    });

    const currentDay = isShow ? getDateToString(currentDate) : '';
    const clickHandler = () =>
      isInRange ? dateCallback?.(currentDay) : addToast('warning', '범위 내 날짜가 아닙니다');

    return isShow ? (
      <DaySmallBox
        key={idx}
        date={date}
        isToday={isToday}
        currentDate={currentDate}
        isInRange={isInRange}
        clickHandler={clickHandler}
      />
    ) : (
      <DaySmallBox key={idx} />
    );
  });

  const yearMonth = `${year}년 ${month}월`;

  return (
    <Wrapper role="application" aria-label="달력" aria-roledescription="calendar">
      <HeaderBox role="group">
        <button type="button" onClick={setPrevMonth} aria-label="이전 달 보기">
          <ArrowLeft width={28} height={28} />
        </button>
        <p role="alert">{yearMonth}</p>
        <button type="button" onClick={setNextMonth} aria-label="다음 달 보기">
          <ArrowRight width={28} height={28} />
        </button>
      </HeaderBox>
      <DaysBox aria-hidden="true">{daysOfWeeks}</DaysBox>
      <CalendarBox>{days}</CalendarBox>
    </Wrapper>
  );
};

export default Calendar;
