import type { PetPlantDetails } from 'types/petPlant';
import { useQuery } from '@tanstack/react-query';
import PetAPI from 'apis/pet';
import noRetryIfUnauthorized from 'utils/noRetryIfUnauthorized';
import { throwOnInvalidStatus } from 'utils/throwOnInvalidStatus';
import useCheckSessionId from '../auth/useCheckSessionId';

const usePetPlantDetails = (petPlantId: PetPlantDetails['id']) => {
  const { isSuccess } = useCheckSessionId();

  return useQuery<PetPlantDetails>({
    queryKey: ['petPlantDetails', petPlantId],
    queryFn: async () => {
      const response = await PetAPI.getDetails(petPlantId);

      throwOnInvalidStatus(response);

      const data = await response.json();
      return data;
    },

    refetchOnWindowFocus: false,
    suspense: true,
    retry: noRetryIfUnauthorized,
    enabled: isSuccess,
  });
};

export default usePetPlantDetails;
