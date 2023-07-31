import type { PetPlant, PetPlantListResponse } from 'types/api/petPlant';
import { useQuery } from '@tanstack/react-query';
import PetAPI, { PET } from 'apis/pet';

const usePetPlantCardList = () =>
  useQuery<PetPlantListResponse, Error, PetPlant[]>({
    queryKey: [PET, 'list'],
    queryFn: async () => {
      const response = await PetAPI.getList();
      const data = await response.json();
      return data;
    },
    select: ({ data }) => data,
    suspense: true,
  });

export default usePetPlantCardList;
