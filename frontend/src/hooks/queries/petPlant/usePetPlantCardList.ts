import type { DataResponse } from 'types/api';
import type { PetPlantItem } from 'types/petPlant';
import { useSuspenseQuery } from '@tanstack/react-query';
import PetPlantAPI, { PET_PLANT_URL } from 'apis/petPlant';
import noRetryIfUnauthorized from 'utils/noRetryIfUnauthorized';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';

const usePetPlantCardList = () => {
  return useSuspenseQuery<DataResponse<PetPlantItem[]>, Error, PetPlantItem[]>({
    queryKey: [PET_PLANT_URL, 'list'],
    queryFn: async () => {
      const response = await PetPlantAPI.getList();
      throwOnInvalidStatus(response);

      const data = await response.json();
      return data;
    },

    select: ({ data }) => data,
    retry: noRetryIfUnauthorized,
  });
};

export default usePetPlantCardList;
