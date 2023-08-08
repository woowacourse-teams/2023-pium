import type { PetPlantDetails } from 'types/petPlant';
import { useQuery } from '@tanstack/react-query';
import PetAPI from 'apis/pet';

const usePetPlantDetails = (petPlantId: PetPlantDetails['id']) =>
  useQuery<PetPlantDetails>({
    queryKey: ['petPlantDetails', petPlantId],
    queryFn: async () => {
      const response = await PetAPI.getDetails(petPlantId);

      if (!response.ok) throw new Error('Response not OK');

      const data = await response.json();
      return data;
    },

    refetchOnWindowFocus: false,
    suspense: true,
  });

export default usePetPlantDetails;
