import type { HistoryResponse } from 'types/api/history';
import type { PetPlantDetails } from 'types/api/petPlant';
import { useInfiniteQuery } from '@tanstack/react-query';
import HistoryAPI, { HISTORY } from 'apis/history';

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
  const map2list = <T>(map: Record<string, T>) =>
    Object.entries(map).sort(([a], [b]) => Number(b) - Number(a));

  const yearList: YearList = map2list(yearMap).map(([year, monthMap]) => [
    year,
    map2list(monthMap),
  ]);

  return yearList;
};

const useYearList = (petPlantId: PetPlantDetails['id']) =>
  useInfiniteQuery<HistoryResponse, Error, YearList, [string, PetPlantDetails['id']], number>({
    queryKey: [HISTORY, petPlantId],
    queryFn: async ({ pageParam }) => {
      const response = await HistoryAPI.getPetPlant(petPlantId, pageParam);
      const data = await response.json();
      return data;
    },
    defaultPageParam: 0,
    getNextPageParam: ({ hasNext }, _allPages, lastPageParam) => {
      return hasNext ? lastPageParam + 1 : undefined;
    },
    suspense: true,
    select: ({ pages }) => {
      const dateList = convertHistoryResponseListToDateList(pages);
      const yearMap = convertDateListToYearMap(dateList);
      const yearList = convertYearMapToYearList(yearMap);
      return yearList;
    },
  });

export default useYearList;
