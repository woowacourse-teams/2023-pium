import type { PetPlantDetails } from 'types/petPlant';
import { useSuspenseQuery } from '@tanstack/react-query';
import PetPlantAPI from 'apis/petPlant';
import noRetryIfUnauthorized from 'utils/noRetryIfUnauthorized';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';

const usePetPlantDetails = (petPlantId: PetPlantDetails['id']) => {
  return useSuspenseQuery<PetPlantDetails>({
    queryKey: ['petPlantDetails', petPlantId],
    queryFn: async () => {
      const response = await PetPlantAPI.getDetails(petPlantId);

      throwOnInvalidStatus(response);

      const data = await response.json();
      return data;
    },

    refetchOnWindowFocus: false,
    retry: noRetryIfUnauthorized,
  });
};

export default usePetPlantDetails;
