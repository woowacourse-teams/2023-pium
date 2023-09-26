import type { GardenRegisterForm } from 'types/garden';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAddToast from 'hooks/@common/useAddToast';
import GardenAPI from 'apis/garden';
import noRetryIfUnauthorized from 'utils/noRetryIfUnauthorized';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';
import { URL_PATH } from 'constants/index';

const useRegisterPetPlant = () => {
  const navigate = useNavigate();
  const addToast = useAddToast();

  return useMutation<void, Error, GardenRegisterForm>({
    mutationFn: async (form) => {
      const response = await GardenAPI.register(form);
      throwOnInvalidStatus(response);
    },

    onSuccess: () => {
      addToast('success', '게시글 등록에 성공했어요.');
      navigate(URL_PATH.garden, { replace: true });
    },

    onError: () => {
      addToast('error', '게시글 등록에 실패했어요.');
    },

    retry: noRetryIfUnauthorized,
  });
};

export default useRegisterPetPlant;
