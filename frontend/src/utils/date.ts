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
