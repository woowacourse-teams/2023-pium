import type { PageDataResponse } from 'types/api';
import type { GardenPostItem } from 'types/garden';
import { useInfiniteQuery } from '@tanstack/react-query';
import GardenAPI, { GARDEN_URL } from 'apis/garden';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';

const useGardenPostList = (dictionaryPlantId: number | null) =>
  useInfiniteQuery<
    PageDataResponse<GardenPostItem[]>,
    Error,
    GardenPostItem[],
    [typeof GARDEN_URL, typeof dictionaryPlantId],
    number
  >({
    queryKey: [GARDEN_URL, dictionaryPlantId],
    queryFn: async ({ pageParam }) => {
      const response = await GardenAPI.getList(dictionaryPlantId, pageParam);
      throwOnInvalidStatus(response);
      return response.json();
    },

    initialPageParam: 0,
    getNextPageParam: ({ hasNext }, _, lastPageParam) => (hasNext ? lastPageParam + 1 : null),

    throwOnError: true,
    select: ({ pages }) => pages.reduce<GardenPostItem[]>((acc, { data }) => acc.concat(data), []),
  });

export default useGardenPostList;
