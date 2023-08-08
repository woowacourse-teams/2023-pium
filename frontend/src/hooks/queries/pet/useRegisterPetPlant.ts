import { NewPetPlantRequest } from 'types/petPlant';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useToast from 'hooks/useToast';
import PetAPI from 'apis/pet';
import { URL_PATH } from 'constants/index';

const useRegisterPetPlant = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  return useMutation<void, Error, NewPetPlantRequest>({
    mutationFn: async (form) => {
      const response = await PetAPI.register(form);
      if (response.status !== 201) throw new Error('Edit failed');
    },

    onSuccess: () => {
      addToast('success', '반려 식물 등록에 성공했어요.');
      navigate(URL_PATH.petList, { replace: true });
    },

    onError: () => {
      addToast('error', '반려 식물 정보 등록에 실패했어요.');
    },
  });
};

export default useRegisterPetPlant;
