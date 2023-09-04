import type { HistoryResponse, HistoryType } from 'types/history';
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
import useCheckSessionId from '../auth/useCheckSessionId';

const useYearList = (petPlantId: PetPlantDetails['id'], filter: HistoryType[] = []) => {
  useCheckSessionId();

  return useInfiniteQuery<
    HistoryResponse,
    Error,
    YearList,
    [typeof HISTORY_URL, PetPlantDetails['id'], HistoryType[]],
    number
  >({
    queryKey: [HISTORY_URL, petPlantId, filter],
    queryFn: async ({ pageParam }) => {
      const response = await HistoryAPI.getPetPlant(petPlantId, pageParam, 20, filter);

      throwOnInvalidStatus(response);

      const data = await response.json();
      return data;
    },

    initialPageParam: 0,
    getNextPageParam: ({ hasNext }, _allPages, lastPageParam) => {
      return hasNext ? lastPageParam + 1 : undefined;
    },

    select: (data) => {
      const historyItemList = convertHistoryResponseListToHistoryItemList(data.pages);
      const yearMap = convertHistoryItemListToYearMap(historyItemList);
      const yearList = convertYearMapToYearList(yearMap);
      return yearList;
    },

    retry: noRetryIfUnauthorized,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    gcTime: 0,
  });
};

export default useYearList;
