import type { DictionaryRegistrationForm } from 'types/dictionaryRegistration';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAddToast from 'hooks/useAddToast';
import DictionaryRegistrationAPI from 'apis/dictionaryRegistration';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';
import { URL_PATH } from 'constants/index';

const useDictionaryRegistrationRequest = () => {
  const addToast = useAddToast();
  const navigate = useNavigate();

  return useMutation<void, Error, DictionaryRegistrationForm>({
    mutationFn: async (form) => {
      const response = await DictionaryRegistrationAPI.register(form);
      throwOnInvalidStatus(response);
    },

    onSuccess: (_, { name }) => {
      addToast('success', '식물 등록 신청에 성공했어요.');

      navigate(name ? `${URL_PATH.dictSearch}?search=${name ?? ''}` : URL_PATH.main, {
        replace: true,
      });
    },

    onError: () => {
      addToast('error', '식물 등록 신청에 실패했어요.');
    },

    retry: 0,
  });
};

export default useDictionaryRegistrationRequest;