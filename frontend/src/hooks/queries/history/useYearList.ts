import type { PageDataResponse } from 'types/api';
import type { HistoryType, HistoryItem } from 'types/history';
import type { PetPlantDetails } from 'types/petPlant';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import {
  convertHistoryItemListToYearMap,
  convertHistoryResponseListToHistoryItemList,
  convertYearMapToYearList,
  type YearList,
} from 'components/petPlant/Timeline/converter';
import HistoryAPI, { HISTORY_URL } from 'apis/history';
import noRetryIfUnauthorized from 'utils/noRetryIfUnauthorized';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';

const useYearList = (petPlantId: PetPlantDetails['id'], filter: HistoryType[] = []) =>
  useInfiniteQuery<
    PageDataResponse<HistoryItem[]>,
    Error,
    YearList,
    [typeof HISTORY_URL, typeof petPlantId, typeof filter],
    number
  >({
    queryKey: [HISTORY_URL, petPlantId, filter],
    queryFn: async ({ pageParam }) => {
      const response = await HistoryAPI.getPetPlant(petPlantId, pageParam, 20, filter);
      throwOnInvalidStatus(response);
      return response.json();
    },

    initialPageParam: 0,
    getNextPageParam: ({ hasNext }, _, lastPageParam) => (hasNext ? lastPageParam + 1 : null),

    throwOnError: true,
    retry: noRetryIfUnauthorized,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    gcTime: 0,

    select: (data) => {
      const historyItemList = convertHistoryResponseListToHistoryItemList(data.pages);
      const yearMap = convertHistoryItemListToYearMap(historyItemList);
      const yearList = convertYearMapToYearList(yearMap);
      return yearList;
    },
  });

export default useYearList;
