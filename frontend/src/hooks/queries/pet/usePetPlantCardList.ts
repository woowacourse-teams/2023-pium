import type { DataResponse } from 'types/api/DataResponse';
import type { PetPlantItem } from 'types/api/petPlant';
import { useQuery } from '@tanstack/react-query';
import PetAPI, { PET } from 'apis/pet';

const usePetPlantCardList = () =>
  useQuery<DataResponse<PetPlantItem[]>, Error, PetPlantItem[]>({
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
