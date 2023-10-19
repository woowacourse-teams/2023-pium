import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAddToast from 'hooks/@common/useAddToast';
import AuthAPI from 'apis/auth';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';
import { URL_PATH } from 'constants/index';

const useLogin = () => {
  const navigation = useNavigate();
  const addToast = useAddToast();

  const queryClient = useQueryClient();

  return useMutation<null, Error, string>({
    mutationFn: async (code: string) => {
      const response = await AuthAPI.getSessionId(code);

      throwOnInvalidStatus(response);
      return null;
    },

    onSuccess: () => {
      navigation(URL_PATH.reminder, { replace: true });
    },

    onError: (error) => {
      addToast({ type: 'error', message: error.message, time: 3000 });
      navigation(URL_PATH.login, { replace: true });
    },

    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ['checkSessionId'] });
    },
  });
};

export default useLogin;
