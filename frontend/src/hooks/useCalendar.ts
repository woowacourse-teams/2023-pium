import { MonthInfo } from 'types/date';
import { useState } from 'react';
import { getMonthInfo } from 'utils/date';

const useCalendar = (currentDate: Date) => {
  const [monthInfo, setMonthInfo] = useState<MonthInfo>(() => getMonthInfo(currentDate));

  const prevMonth = () => {
    const { year, month } = monthInfo;
    const prevMonth = Number(month) - 1 < 1 ? 12 : Number(month) - 1;
    const prevYear = Number(month) - 1 < 1 ? Number(year) - 1 : Number(year);

    setMonthInfo(() => getMonthInfo(new Date(`${prevYear}-${prevMonth}`)));
  };

  const nextMonth = () => {
    const { year, month } = monthInfo;
    const nextMonth = Number(month) + 1 > 12 ? 1 : Number(month) + 1;
    const nextYear = Number(month) + 1 > 12 ? Number(year) + 1 : Number(year);

    setMonthInfo(() => getMonthInfo(new Date(`${nextYear}-${nextMonth}`)));
  };

  return { monthInfo, prevMonth, nextMonth };
};

export default useCalendar;
