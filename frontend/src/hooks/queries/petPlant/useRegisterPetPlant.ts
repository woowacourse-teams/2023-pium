import { NewPetPlantRequest } from 'types/petPlant';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAddToast from 'hooks/useAddToast';
import PetPlantAPI from 'apis/petPlant';
import noRetryIfUnauthorized from 'utils/noRetryIfUnauthorized';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';
import { URL_PATH } from 'constants/index';

const useRegisterPetPlant = () => {
  const navigate = useNavigate();
  const addToast = useAddToast();

  return useMutation<void, Error, NewPetPlantRequest>({
    mutationFn: async (form) => {
      const response = await PetPlantAPI.register(form);
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
    retry: noRetryIfUnauthorized,
  });
};

export default useRegisterPetPlant;
