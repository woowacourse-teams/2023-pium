import type { DictionaryPlantRegistrationForm } from 'types/dictionaryPlantRegistration';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAddToast from 'hooks/useAddToast';
import DictionaryPlantRegistrationAPI from 'apis/dictionaryPlantRegistration';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';
import { URL_PATH } from 'constants/index';

const useDictionaryPlantRegister = () => {
  const addToast = useAddToast();
  const navigate = useNavigate();

  return useMutation<void, Error, DictionaryPlantRegistrationForm>({
    mutationFn: async (form) => {
      const response = await DictionaryPlantRegistrationAPI.register(form);
      throwOnInvalidStatus(response);
    },

    onSuccess: () => {
      addToast('success', '식물 등록 신청에 성공했어요.');
      navigate(URL_PATH.main, { replace: true });
    },

    onError: () => {
      addToast('error', '식물 등록 신청에 실패했어요.');
    },

    retry: 0,
  });
};

export default useDictionaryPlantRegister;
