import type { HistoryResponse } from 'types/history';
import type { PetPlantDetails } from 'types/petPlant';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { YearList } from 'pages/PetPlantTimeline/converter';
import {
  convertDateListToYearMap,
  convertHistoryResponseListToDateList,
  convertYearMapToYearList,
} from 'pages/PetPlantTimeline/converter';
import HistoryAPI, { HISTORY } from 'apis/history';

const useYearList = (petPlantId: PetPlantDetails['id']) =>
  useInfiniteQuery<
    HistoryResponse,
    Error,
    YearList,
    [typeof HISTORY, PetPlantDetails['id']],
    number
  >({
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
    select: (data) => {
      const dateList = convertHistoryResponseListToDateList(data.pages);
      const yearMap = convertDateListToYearMap(dateList);
      const yearList = convertYearMapToYearList(yearMap);
      return yearList;
    },
  });

export default useYearList;
