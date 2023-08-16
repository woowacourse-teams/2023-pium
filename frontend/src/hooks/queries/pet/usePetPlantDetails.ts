import type { PetPlantDetails } from 'types/petPlant';
import { useQuery } from '@tanstack/react-query';
import useUnauthorize from 'hooks/useUnauthorize';
import PetAPI from 'apis/pet';
import { throwOnInvalidStatus } from 'apis/throwOnInvalidStatus';

const usePetPlantDetails = (petPlantId: PetPlantDetails['id']) => {
  const { retryCallback } = useUnauthorize();

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
    retry: retryCallback,
  });
};

export default usePetPlantDetails;
