import type { PetPlantDetails } from 'types/petPlant';
import { useQuery } from '@tanstack/react-query';
import useQueryWrapper from 'hooks/useQueryWrapper';
import useUnauthorize from 'hooks/useUnauthorize';
import PetAPI from 'apis/pet';
import { throwOnInvalidStatus } from 'apis/throwOnInvalidStatus';

const usePetPlantDetails = (petPlantId: PetPlantDetails['id']) => {
  const { throwOnErrorCallback, retryCallback } = useUnauthorize();

  const petPlaitDetailsQuery = () =>
    useQuery<PetPlantDetails>({
      queryKey: ['petPlantDetails', petPlantId],
      queryFn: async () => {
        const response = await PetAPI.getDetails(petPlantId);

        throwOnInvalidStatus(response);

        const data = await response.json();
        return data;
      },

      refetchOnWindowFocus: false,
      suspense: true,
      throwOnError: throwOnErrorCallback,
      retry: retryCallback,
    });

  return useQueryWrapper(petPlaitDetailsQuery);
};

export default usePetPlantDetails;
