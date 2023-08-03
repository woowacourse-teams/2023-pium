import type { HistoryResponse } from 'types/api/history';

type DateList = string[];

type Year = string;
type Month = string;
type Day = number;

type YearMap = Record<Year, MonthMap>;
type MonthMap = Record<Month, Day[]>;

type YearList = [Year, MonthList][];
type MonthList = [Month, Day[]][];

const convertHistoryResponseListToDateList = (historyResponseList: HistoryResponse[]) =>
  historyResponseList.reduce<DateList>(
    (accWaterDateList, page) => accWaterDateList.concat(page.waterDateList),
    []
  );

const convertDateListToYearMap = (dateList: string[]) => {
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

const convertYearMapToYearList = (yearMap: YearMap) => {
  const convertMapToList = <T>(map: Record<string, T>) =>
    Object.entries(map).sort(([a], [b]) => Number(b) - Number(a));

  const yearList: YearList = convertMapToList(yearMap).map(([year, monthMap]) => [
    year,
    convertMapToList(monthMap),
  ]);

  return yearList;
};

export const convertHistoryResponseListToYearList = (historyResponseList: HistoryResponse[]) => {
  const dateList = convertHistoryResponseListToDateList(historyResponseList);
  const yearMap = convertDateListToYearMap(dateList);
  const yearList = convertYearMapToYearList(yearMap);
  return yearList;
};
