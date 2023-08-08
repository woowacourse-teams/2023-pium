import type { EditPetPlantRequest, PetPlantDetails } from 'types/petPlant';
import { useMutation } from '@tanstack/react-query';
import { generatePath, useNavigate } from 'react-router-dom';
import useToast from 'hooks/useToast';
import PetAPI from 'apis/pet';
import { URL_PATH } from 'constants/index';

const useEditPetPlant = (petPlantId: PetPlantDetails['id']) => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  return useMutation<void, Error, EditPetPlantRequest>({
    mutationFn: async (form) => {
      const response = await PetAPI.edit(petPlantId, form);
      if (response.status !== 200) throw new Error('Edit failed');
    },

    onSuccess: () => {
      addToast('success', '반려 식물 정보를 바꿨습니다.');
      navigate(generatePath(URL_PATH.petDetail, { id: petPlantId.toString() }), { replace: true });
    },

    onError: () => {
      addToast('error', '반려 식물 정보 수정에 실패했어요.');
    },
  });
};

export default useEditPetPlant;
