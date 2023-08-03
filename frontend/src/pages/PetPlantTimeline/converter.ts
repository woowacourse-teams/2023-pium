import type { HistoryResponse } from 'types/api/history';

type DateList = string[];

type Day = number;
type Month = string;
type Year = string;

type MonthMap = Record<Month, Day[]>;
type YearMap = Record<Year, MonthMap>;

type MonthList = [Month, Day[]][];
export type YearList = [Year, MonthList][];

export const convertHistoryResponseListToDateList = (historyResponseList: HistoryResponse[]) =>
  historyResponseList.reduce<DateList>(
    (accWaterDateList, page) => accWaterDateList.concat(page.waterDateList),
    []
  );

export const convertDateListToYearMap = (dateList: string[]) => {
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

export const convertYearMapToYearList = (yearMap: YearMap) => {
  const convertMapToList = <T>(map: Record<string, T>) =>
    Object.entries(map).sort(([a], [b]) => Number(b) - Number(a));

  const yearList: YearList = convertMapToList(yearMap).map(([year, monthMap]) => [
    year,
    convertMapToList(monthMap),
  ]);

  return yearList;
};
