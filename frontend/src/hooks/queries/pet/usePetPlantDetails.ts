import type { PetPlantDetails } from 'types/petPlant';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import useUnauthorize from 'hooks/useUnauthorize';
import PetAPI from 'apis/pet';
import { throwOnInvalidStatus } from 'utils/throwOnInvalidStatus';
import useCheckSessionId from '../auth/useCheckSessionId';

const usePetPlantDetails = (petPlantId: PetPlantDetails['id']) => {
  const { retryCallback, redirectLoginPage } = useUnauthorize();
  const { isSuccess, error } = useCheckSessionId();

  useEffect(() => {
    if (error) {
      redirectLoginPage(error);
    }
  }, [error, redirectLoginPage]);

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
    enabled: isSuccess,
  });
};

export default usePetPlantDetails;
