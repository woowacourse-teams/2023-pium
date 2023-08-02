type Month = string;
type Day = string;

type YearMap = Record<Month, MonthMap>;
type MonthMap = Record<Day, number[]>;

const date2map = (dateList: string[]) => {
  const yearMap: YearMap = {};

  dateList.forEach((date) => {
    const [year, month, day] = date.split('-').map(Number);

    if (!yearMap[year]) {
      yearMap[year] = {};
    }

    if (!yearMap[year][month]) {
      yearMap[year][month] = [];
    }

    yearMap[year][month].push(day);
  });

  return yearMap;
};

export default date2map;
