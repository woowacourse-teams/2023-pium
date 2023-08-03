import type { HistoryResponse } from 'types/api/history';
import type { PetPlantDetails } from 'types/api/petPlant';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import HistoryAPI, { HISTORY } from 'apis/history';

const usePetPlantHistory = (petPlantId: PetPlantDetails['id']) =>
  useInfiniteQuery<
    HistoryResponse,
    Error,
    InfiniteData<HistoryResponse>,
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
  });

export default usePetPlantHistory;
