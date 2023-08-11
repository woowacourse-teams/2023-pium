import type { DataResponse } from 'types/DataResponse';
import type { PetPlantItem } from 'types/petPlant';
import { useQuery } from '@tanstack/react-query';
import PetAPI, { PET } from 'apis/pet';
import { throwOnInvalidStatus } from 'apis/throwOnInvalidStatus';

const usePetPlantCardList = () =>
  useQuery<DataResponse<PetPlantItem[]>, Error, PetPlantItem[]>({
    queryKey: [PET, 'list'],
    queryFn: async () => {
      const response = await PetAPI.getList();
      throwOnInvalidStatus(response);

      const data = await response.json();
      return data;
    },
    select: ({ data }) => data,
    suspense: true,
  });

export default usePetPlantCardList;
