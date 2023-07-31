import type { PetListResponse, Pet } from 'types/api/petPlant';
import { useQuery } from '@tanstack/react-query';
import PetAPI, { PET } from 'apis/pet';

const usePetList = () =>
  useQuery<PetListResponse, Error, Pet[]>({
    queryKey: [PET, 'list'],
    queryFn: async () => {
      const response = await PetAPI.getList();
      const data = await response.json();
      return data;
    },
    select: ({ data }) => data,
    suspense: true,
  });

export default usePetList;
