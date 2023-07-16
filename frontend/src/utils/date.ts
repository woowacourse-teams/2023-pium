// YYYY-MM-DD 형태로 받은 날짜를 YYYY년 MM월 DD일로 변경
export const convertDateKorYear = (date: string) =>
  new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

// 오늘 날짜를 YYYY-MM-DD 형태로 받기
export const getToday = () => {
  const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
  const localTime = new Date(Date.now() - timezoneOffset);
  return localTime.toISOString().slice(0, 10);
};
