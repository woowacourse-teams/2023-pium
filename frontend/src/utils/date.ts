import type { DateFormat, DayInfo, KoreanDateFormat, Month, MonthInfo, Year } from 'types/date';
import { ERROR } from 'constants/index';
import { dateValidate } from './validate';

/**
 * 주어진 문자열이 20, 21세기의 'YYYY-MM-DD' 형태인지 판별합니다.
 * @param target 임의의 문자열
 * @returns `DateFormat` 형식이면 true, 아니면 false
 */
export const isDateFormat = (target: string): target is DateFormat => {
  if (target.trim().length !== 10) return false;

  const [yearString, monthString, dateString] = target.trim().split('-');

  if (!yearString || !monthString || !dateString) return false;
  if (yearString.length !== 4 || monthString.length !== 2 || dateString.length !== 2) {
    return false;
  }

  const [year, month, dateValue] = target.trim().split('-').map(Number);
  const date = new Date(year, month - 1, dateValue);

  if (
    year !== date.getFullYear() ||
    month !== date.getMonth() + 1 ||
    dateValue !== date.getDate()
  ) {
    return false;
  }

  if (date < new Date(1900, 1, 1) || date > new Date(2099, 12, 31)) return false;

  return true;
};

/**
 * 주어진 연도가 20세기 또는 21세기인지 판별합니다.
 * @param target 연도를 표현하는 문자열
 * @returns 20세기 또는 21세기면 true, 아니면 false
 */
export const isYear = (target: string): target is Year => {
  const value = Number(target);
  return value >= 1900 && value < 2100;
};

/**
 * 주어진 문자열이 20, 21세기의 'YYYY년 MM월 DD일' 형태인지 판별합니다.
 * @param target 임의의 문자열
 * @returns `KoreanDateFormat` 형식이면 true, 아니면 false
 */
export const isKoreanDateFormat = (target: string): target is KoreanDateFormat => {
  if (target.trim().length !== 13) return false;

  const [yearString, monthDateString] = target.trim().split('년 ');
  const [monthString, dateFormatString] = monthDateString.split('월 ');
  const [dateString] = dateFormatString.split('일');

  return isDateFormat(`${yearString}-${monthString}-${dateString}`);
};

/**
 * 받은 날짜를 한국식으로 표현합니다.
 * @param date `new Date()`를 이용해 날짜 형태로 변경할 수 있는 값
 * @returns 'YYYY년 MM월 DD일'
 */
export const convertDateKorYear = (date: string | number | Date): KoreanDateFormat => {
  const [year, month, dateValue] = getDateToString(new Date(date)).split('-');
  const result = `${year}년 ${month}월 ${dateValue}일`;

  if (!isKoreanDateFormat(result)) throw new Error(ERROR.dateFormat);

  return result;
};

/**
 * 특정 날짜를 YYYY-MM-DD 형태의 string으로 반환합니다.
 * @param date 입력 받은 특정 날짜
 * @returns 'YYYY-MM-DD'
 */
export const getDateToString = (date = new Date()): DateFormat => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0') as Month;
  const day = date.getDate().toString().padStart(2, '0');

  const dateString = `${year}-${month}-${day}`;

  if (!isDateFormat(dateString)) throw new Error(ERROR.dateFormat);

  return dateString;
};

/**
 * 문자열 형태의 날짜 값을 Date 형태로 반환합니다.
 *
 * IOS Safari에서 YYYY-MM-DD 형태의 문자열을 new Date()의 인자로 줄 수 없는 문제 해결을 위한 함수.
 * @param date 문자열
 * @return new Date(YYYY, MM, DD);
 */
export const getStringToDate = (date: string) => {
  if (!date.includes('-')) return new Date(date);
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
  const first = typeof one === 'string' && isDateFormat(one) ? getStringToDate(one) : new Date(one);
  const second =
    typeof another === 'string' && isDateFormat(another)
      ? getStringToDate(another)
      : new Date(another);

  const diff = Math.abs(first.getTime() - second.getTime());
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return days;
};

/**
 * 어떤 날부터 특정 일수 이전 혹은 이후의 날을 YYYY-MM-DD 형태로 반환합니다.
 * @param particularNumber 특정 일수
 * @param specificDay 기준이 되는 날짜 (기본값은 오늘)
 * @returns DateFormat
 */
export const getParticularDateFromSpecificDay = (
  particularNumber: number,
  specificDay = new Date()
) => {
  const particularDate = new Date(specificDay.setDate(specificDay.getDate() + particularNumber));

  return getDateToString(particularDate);
};

/**
 * 날짜를 입력 받아 해당 연, 월과 첫 번째 요일 그리고 마지막 날짜를 반환하는 메서드
 * @param date 현재 날짜
 * @returns MonthInfo
 */
export const getMonthInfo = (date = new Date()): MonthInfo => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const monthFirstDay = new Date(year, month - 1).getDay(); // 첫 번째 요일
  const monthLastDate = new Date(year, month, 0).getDate(); // 마지막 날짜

  const validatedYear = year.toString();
  if (!isYear(validatedYear)) throw new Error(ERROR.yearFormat);

  return {
    year: validatedYear,
    month: month.toString().padStart(2, '0') as Month,
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
