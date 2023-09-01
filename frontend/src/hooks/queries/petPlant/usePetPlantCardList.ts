import type { DataResponse } from 'types/DataResponse';
import type { PetPlantItem } from 'types/petPlant';
import { useQuery } from '@tanstack/react-query';
import PetPlantAPI, { PET_PLANT_URL } from 'apis/petPlant';
import noRetryIfUnauthorized from 'utils/noRetryIfUnauthorized';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';
import useCheckSessionId from '../auth/useCheckSessionId';

const usePetPlantCardList = () => {
  const { isSuccess } = useCheckSessionId();

  return useQuery<DataResponse<PetPlantItem[]>, Error, PetPlantItem[]>({
    queryKey: [PET_PLANT_URL, 'list'],
    queryFn: async () => {
      const response = await PetPlantAPI.getList();
      throwOnInvalidStatus(response);

      const data = await response.json();
      return data;
    },

    select: ({ data }) => data,

    suspense: true,
    retry: noRetryIfUnauthorized,
    enabled: isSuccess,
  });
};

export default usePetPlantCardList;
