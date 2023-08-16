import { useMutation } from '@tanstack/react-query';
import useUnauthorize from 'hooks/useUnauthorize';
import AuthAPI from 'apis/auth';
import StatusError from 'apis/statusError';
import { throwOnInvalidStatus } from 'apis/throwOnInvalidStatus';

const useCheckSessionId = () => {
  const { throwOnErrorCallback, retryCallback, redirectLoginPage } = useUnauthorize();

  return useMutation({
    mutationFn: async () => {
      const response = await AuthAPI.checkSessionId();
      throwOnInvalidStatus(response);
    },

    onError: (error: Error | StatusError) => {
      redirectLoginPage(error);
    },
    throwOnError: throwOnErrorCallback,
    retry: retryCallback,
  });
};

export default useCheckSessionId;
