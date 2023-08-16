import { useQuery } from '@tanstack/react-query';
import useUnauthorize from 'hooks/useUnauthorize';
import AuthAPI from 'apis/auth';
import StatusError from 'apis/statusError';
import { throwOnInvalidStatus } from 'apis/throwOnInvalidStatus';

const useCheckSessionId = () => {
  const { throwOnErrorCallback, retryCallback } = useUnauthorize();

  return useQuery<null, Error | StatusError>({
    queryKey: ['checkSessionId'],
    queryFn: async () => {
      const response = await AuthAPI.checkSessionId();
      throwOnInvalidStatus(response);
      return null;
    },
    throwOnError: throwOnErrorCallback,
    retry: retryCallback,
  });
};

export default useCheckSessionId;
