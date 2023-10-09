import type { ImageFormData } from 'types/@common';
import type { NewPetPlantRequest } from 'types/petPlant';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAddToast from 'hooks/@common/useAddToast';
import PetPlantAPI from 'apis/petPlant';
import noRetryIfUnauthorized from 'utils/noRetryIfUnauthorized';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';
import { URL_PATH } from 'constants/index';

const useRegisterPetPlant = () => {
  const navigate = useNavigate();
  const addToast = useAddToast();

  return useMutation<void, Error, ImageFormData<NewPetPlantRequest>>({
    mutationFn: async (form) => {
      const response = await PetPlantAPI.register(form);
      throwOnInvalidStatus(response);
    },

    // TODO: 첫 식물 등록시에 navigate로 반환하고 알림 설정하겠냐고 물어보기
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
