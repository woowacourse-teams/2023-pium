import type { HistoryResponse, HistoryType } from 'types/history';
import type { PetPlantDetails } from 'types/petPlant';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import {
  convertHistoryItemListToYearMap,
  convertHistoryResponseListToHistoryItemList,
  convertYearMapToYearList,
  type YearList,
} from 'components/petPlant/Timeline/converter';
import useUnauthorize from 'hooks/useUnauthorize';
import HistoryAPI, { HISTORY } from 'apis/history';
import { throwOnInvalidStatus } from 'utils/throwOnInvalidStatus';
import useCheckSessionId from '../auth/useCheckSessionId';

const useYearList = (petPlantId: PetPlantDetails['id'], filter: HistoryType[] = []) => {
  const { retryCallback } = useUnauthorize();
  const { isSuccess } = useCheckSessionId();

  return useInfiniteQuery<
    HistoryResponse,
    Error,
    YearList,
    [typeof HISTORY, PetPlantDetails['id'], HistoryType[]],
    number
  >({
    queryKey: [HISTORY, petPlantId, filter],
    queryFn: async ({ pageParam }) => {
      const response = await HistoryAPI.getPetPlant(petPlantId, pageParam, 20, filter);

      throwOnInvalidStatus(response);

      const data = await response.json();
      return data;
    },
    defaultPageParam: 0,
    getNextPageParam: ({ hasNext }, _allPages, lastPageParam) => {
      return hasNext ? lastPageParam + 1 : undefined;
    },
    select: (data) => {
      const historyItemList = convertHistoryResponseListToHistoryItemList(data.pages);
      const yearMap = convertHistoryItemListToYearMap(historyItemList);
      const yearList = convertYearMapToYearList(yearMap);
      return yearList;
    },
    retry: retryCallback,
    enabled: isSuccess,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};

export default useYearList;
