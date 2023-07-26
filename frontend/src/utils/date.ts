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
 * 오늘 날짜를 YYYY-MM-DD 형태의 string으로 반환합니다.
 * @returns 'YYYY-MM-DD'
 */
export const getToday = () => {
  const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
  const localTime = new Date(Date.now() - timezoneOffset);
  return localTime.toISOString().slice(0, 10);
};

/**
 * 두 날짜 사이의 날짜 간격을 음이 아닌 정수로 반환합니다.
 * @param one `new Date()`의 인자로 들어갈 수 있는 값
 * @param another `new Date()`의 인자로 들어갈 수 있는 값
 * @returns 음이 아닌 정수
 */
export const getDaysBetween = (one: string | number | Date, another: string | number | Date) => {
  const singleDay = 1000 * 60 * 60 * 24;
  const oneDay = Math.floor(new Date(one).getTime() / singleDay);
  const anotherDay = Math.floor(new Date(another).getTime() / singleDay);
  return Math.abs(oneDay - anotherDay);
};

/**
 * 오늘 날짜로부터 특정 일수 이전 혹은 이후의 날을 YYYY-MM-DD 형태로 반환합니다.
 * @param particularNumber 특정 날짜
 * @returns 'YYYY-MM-DD'
 */
export const getParticularDateFromToday = (particularNumber: number) => {
  const today = new Date();

  const particularDate = new Date(today.setDate(today.getDate() + particularNumber));

  return particularDate.toISOString().slice(0, 10);
};
