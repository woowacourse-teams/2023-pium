import { useState } from 'react';
import SvgIcons from 'components/@common/SvgIcons';
import { AlertSpan, Button, CalendarBox, DaysBox, HeaderBox, Wrapper } from './Calendar.style';
import { convertDateKorYear, getDateToString, getDayInfo, getDaysBetween } from 'utils/date';
import { DateValidate } from 'utils/validate';
import { DAYS_OF_THE_WEEK } from 'constants/index';
import theme from 'style/theme.style';
import DaySmallBox from './DaySmallBox';
import useCalendar from './hooks/useCalendar';

interface CalendarProps {
  selectedDate: Date | null;
  dateCallback: ((value: string) => void) | null;
  max?: React.InputHTMLAttributes<HTMLInputElement>['max'];
  min?: React.InputHTMLAttributes<HTMLInputElement>['min'];
}

const Calendar = (props: CalendarProps) => {
  const { selectedDate, min = '1945/08/15', max = '2099/12/31', dateCallback } = props;

  const { monthInfo, setPrevMonth, setNextMonth } = useCalendar(selectedDate ?? new Date());
  const { year, month, monthFirstDay, monthLastDate } = monthInfo;
  const boxLength = monthFirstDay + monthLastDate <= 35 ? 35 : 42;
  const [message, setMessage] = useState('');

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
      isInRange
        ? dateCallback?.(currentDay)
        : setMessage(`${convertDateKorYear(currentDate)}은 범위 내 날짜가 아닙니다`);

    return isShow ? (
      <DaySmallBox
        key={idx}
        date={date}
        isToday={isToday}
        isSelected={selectedDate !== null && getDaysBetween(currentDate, selectedDate) === 0}
        currentDate={currentDate}
        isInRange={isInRange}
        clickHandler={clickHandler}
      />
    ) : (
      <DaySmallBox key={idx} />
    );
  });

  const yearMonth = `${year}년 ${month}월`;
  const isPrevMonthOutOfRange = !DateValidate.isDateInRange({
    dateToCheck: new Date(Number(year), Number(month) - 1, 0),
    startDate: new Date(min),
    endDate: new Date(max),
  });
  const isNextMonthOutOfRange = !DateValidate.isDateInRange({
    dateToCheck: new Date(Number(year), Number(month), 1),
    startDate: new Date(min),
    endDate: new Date(max),
  });

  return (
    <Wrapper role="application" aria-label="달력" aria-roledescription="calendar">
      <HeaderBox role="group">
        <Button
          type="button"
          onClick={setPrevMonth}
          aria-label="이전 달 보기"
          disabled={isPrevMonthOutOfRange}
        >
          <SvgIcons
            icon="arrow-left"
            size={32}
            color={theme.color.sub}
            opacity={isPrevMonthOutOfRange ? '10%' : '100%'}
          />
        </Button>
        <p role="alert">{yearMonth}</p>
        <Button
          type="button"
          onClick={setNextMonth}
          aria-label="다음 달 보기"
          disabled={isNextMonthOutOfRange}
        >
          <SvgIcons
            icon="arrow-right"
            size={32}
            color={theme.color.sub}
            opacity={isNextMonthOutOfRange ? '10%' : '100%'}
          />
        </Button>
      </HeaderBox>
      <DaysBox aria-hidden="true">{daysOfWeeks}</DaysBox>
      <CalendarBox aria-live="assertive">{days}</CalendarBox>
      <AlertSpan role="alert">{message}</AlertSpan>
    </Wrapper>
  );
};

export default Calendar;
