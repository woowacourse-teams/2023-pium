import type { PageDataResponse } from 'types/api';
import type { HistoryItem } from 'types/history';

export interface TimelineItem {
  type: HistoryItem['type'];
  previous: HistoryItem['content']['previous'];
  current: HistoryItem['content']['current'];
}

type DayMap = Record<string, TimelineItem[]>;
type MonthMap = Record<string, DayMap>;
type YearMap = Record<string, MonthMap>;

type DayList = [string, TimelineItem[]][];
type MonthList = [string, DayList][];
export type YearList = [string, MonthList][];

export const convertHistoryResponseListToHistoryItemList = (
  historyResponseList: PageDataResponse<HistoryItem[]>[]
) =>
  historyResponseList.reduce<HistoryItem[]>(
    (accWaterDateList, page) => accWaterDateList.concat(page.data),
    []
  );

export const convertHistoryItemListToYearMap = (historyItemList: HistoryItem[]) => {
  const yearMap: YearMap = {};

  historyItemList.forEach(({ date, type, content: { previous, current } }) => {
    const [year, month, day] = date.split('-').map(Number);

    if (!yearMap[year]) yearMap[year] = {};
    if (!yearMap[year][month]) yearMap[year][month] = {};
    if (!yearMap[year][month][day]) yearMap[year][month][day] = [];

    yearMap[year][month][day].push({
      type,
      previous,
      current,
    });
  });

  return yearMap;
};

export const convertYearMapToYearList = (yearMap: YearMap): YearList =>
  convertMapToList(yearMap).map(([year, monthMap]) => [
    year,
    convertMapToList(monthMap).map(([month, dayMap]) => [month, convertMapToList(dayMap)]),
  ]);

const convertMapToList = <T>(map: Record<string, T>) =>
  Object.entries(map).sort(([a], [b]) => Number(b) - Number(a));
