import type { DataResponse } from 'types/DataResponse';
import type { PetPlantItem } from 'types/petPlant';
import { useQuery } from '@tanstack/react-query';
import useUnauthorize from 'hooks/useUnauthorize';
import PetAPI, { PET } from 'apis/pet';
import { throwOnInvalidStatus } from 'utils/throwOnInvalidStatus';
import useCheckSessionId from '../auth/useCheckSessionId';

const usePetPlantCardList = () => {
  const { retryCallback } = useUnauthorize();
  const { isSuccess } = useCheckSessionId();

  return useQuery<DataResponse<PetPlantItem[]>, Error, PetPlantItem[]>({
    queryKey: [PET, 'list'],
    queryFn: async () => {
      const response = await PetAPI.getList();
      throwOnInvalidStatus(response);

      const data = await response.json();
      return data;
    },
    select: ({ data }) => data,
    suspense: true,
    retry: retryCallback,
    enabled: isSuccess,
  });
};

export default usePetPlantCardList;
