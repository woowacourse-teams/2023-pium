import type { PetPlantDetails } from 'types/petPlant';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAddToast from 'hooks/common/useAddToast';
import PetPlantAPI from 'apis/petPlant';
import { URL_PATH } from 'constants/index';

const useDeletePetPlant = () => {
  const navigate = useNavigate();
  const addToast = useAddToast();

  return useMutation({
    mutationFn: async (petPlantId: PetPlantDetails['id']) => {
      const response = await PetPlantAPI.remove(petPlantId);
      if (response.status !== 204) throw new Error('Edit failed');
    },

    onSuccess: () => {
      addToast('success', '반려 식물을 삭제했어요.');
      navigate(URL_PATH.petList, { replace: true });
    },

    onError: () => {
      addToast('error', '반려 식물 삭제에 실패했어요.');
    },
  });
};

export default useDeletePetPlant;
