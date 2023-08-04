import { DayInfo, MonthInfo } from 'types/date';
import { dateValidate } from './validate';

/**
 * 받은 날짜를 한국식으로 표현합니다.
 * @param date `new Date()`를 이용해 날짜 형태로 변경할 수 있는 값
 * @returns 'YYYY년 MM월 DD일'
 */
export const convertDateKorYear = (date: string | number | Date) =>
  new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

/**
 * 특정 날짜를 YYYY-MM-DD 형태의 string으로 반환합니다.
 * @param date 입력 받은 특정 날짜
 * @returns 'YYYY-MM-DD'
 */
export const getDateToString = (date = new Date()) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * YYYY-MM-DD 형태의 값을 Date 형태로 반환합니다.
 * @param date YYYY-MM-DD 형태의 날짜
 * @return new Date();
 */

export const getStringToDate = (date: string | number | Date | null) => {
  if (typeof date !== 'string') return new Date();
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day);
};

/**
 * 두 날짜 사이의 날짜 간격을 음이 아닌 정수로 반환합니다.
 * @param one `new Date()`의 인자로 들어갈 수 있는 값
 * @param another `new Date()`의 인자로 들어갈 수 있는 값
 * @returns 음이 아닌 정수
 */
export const getDaysBetween = (one: string | number | Date, another: string | number | Date) => {
  const first = getStringToDate(one);
  const second = getStringToDate(another);

  const diff = Math.abs(first.getTime() - second.getTime());
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return days;
};

/**
 * 어떤 날부터 특정 일수 이전 혹은 이후의 날을 YYYY-MM-DD 형태로 반환합니다.
 * @param particularNumber 특정 일수
 * @param specificDay 기준이 되는 날짜 (기본값은 오늘)
 * @returns YYYY-MM-DD
 */

export const getParticularDateFromSpecificDay = (
  particularNumber: number,
  specificDay = new Date()
) => {
  const particularDate = new Date(specificDay.setDate(specificDay.getDate() + particularNumber));

  return getDateToString(particularDate);
};

/**
 *
 * params들은 YYYY-MM-DD의 형태를 띈다
 * @param prev 첫 번째 날짜
 * @param next 두 번째 날짜
 * @returns 두 날짜 사이에 차이
 */

export const getDaysBetweenDate = (prev: string, next: string) => {
  const first = getStringToDate(prev);
  const second = getStringToDate(next);

  const diff = Math.abs(first.getTime() - second.getTime());
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return days;
};

/**
 * 날짜를 입력 받고, 해당 연,월과 첫 번째 요일 그리고 마지막 날짜를 반환하는 메서드
 * @param date 현재 날짜
 * @returns MonthInfo
 */

export const getMonthInfo = (date = new Date()): MonthInfo => {
  const year = date.getFullYear(); // 연
  const month = date.getMonth() + 1; // 월
  const monthFirstDay = new Date(year, month - 1).getDay(); // 첫 번째 요일
  const monthLastDate = new Date(year, month, 0).getDate(); // 마지막 날짜

  return {
    year: year.toString(),
    month: month.toString().padStart(2, '0'),
    monthFirstDay,
    monthLastDate,
  };
};

export const getDayInfo = ({ idx, monthInfo, min, max }: DayInfo) => {
  const date = idx - monthInfo.monthFirstDay + 1;
  const isShow = date > 0 && date <= monthInfo.monthLastDate;

  const currentDate = getStringToDate(`${monthInfo.year}-${monthInfo.month}-${date}`);
  const isToday = isShow && getDateToString() === getDateToString(currentDate);

  const startDate = min ? new Date(min) : null;
  const endDate = max ? new Date(max) : null;

  const isInRange = dateValidate.isDateInRange({ dateToCheck: currentDate, startDate, endDate });

  return { date, isShow, isToday, currentDate, isInRange };
};
