import type { HistoryResponse } from 'types/api/history';
import type { PetPlantDetails } from 'types/api/petPlant';
import { useInfiniteQuery } from '@tanstack/react-query';
import HistoryAPI, { HISTORY } from 'apis/history';

const useWaterDateList = (petPlantId: PetPlantDetails['id']) =>
  useInfiniteQuery<HistoryResponse, Error, string[], [string, PetPlantDetails['id']], number>({
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
    select: (data) =>
      data.pages.reduce<string[]>(
        (accWaterDateList, page) => accWaterDateList.concat(page.waterDateList),
        []
      ),
  });

export default useWaterDateList;
