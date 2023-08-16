import { NewPetPlantRequest } from 'types/petPlant';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useToast from 'hooks/useToast';
import useUnauthorize from 'hooks/useUnauthorize';
import PetAPI from 'apis/pet';
import { throwOnInvalidStatus } from 'apis/throwOnInvalidStatus';
import { URL_PATH } from 'constants/index';

const useRegisterPetPlant = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { retryCallback } = useUnauthorize();

  return useMutation<void, Error, NewPetPlantRequest>({
    mutationFn: async (form) => {
      const response = await PetAPI.register(form);
      throwOnInvalidStatus(response);
    },

    onSuccess: () => {
      addToast('success', '반려 식물 등록에 성공했어요.');
      navigate(URL_PATH.petList, { replace: true });
    },

    onError: () => {
      addToast('error', '반려 식물 정보 등록에 실패했어요.');
    },
    throwOnError: true,
    retry: retryCallback,
  });
};

export default useRegisterPetPlant;
