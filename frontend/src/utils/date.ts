// YYYY-MM-DD 형태로 받은 날짜를 YYYY년 MM월 DD일로 변경
export const convertDateKorYear = (date: string) => {
  const [year, month, day] = date.split('-');

  return year + '년 ' + month.replace('0', '') + '월 ' + day.replace('0', '') + '일 ';
};

// 오늘 날짜를 YYYY-MM-DD 형태로 받기
export const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);

  return [year, month, day].join('-');
};
