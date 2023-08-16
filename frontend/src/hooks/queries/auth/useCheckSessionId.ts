import { useMutation } from '@tanstack/react-query';
import useUnauthorize from 'hooks/useUnauthorize';
import AuthAPI from 'apis/auth';
import { throwOnInvalidStatus } from 'apis/throwOnInvalidStatus';

const useCheckSessionId = () => {
  const { throwOnErrorCallback, retryCallback } = useUnauthorize();

  return useMutation({
    mutationFn: async () => {
      const response = await AuthAPI.checkSessionId();
      throwOnInvalidStatus(response);
    },
    throwOnError: throwOnErrorCallback,
    retry: retryCallback,
  });
};

export default useCheckSessionId;
