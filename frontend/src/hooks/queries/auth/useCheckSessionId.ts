import { useQuery } from '@tanstack/react-query';
import useUnauthorize from 'hooks/useUnauthorize';
import StatusError from 'models/statusError';
import AuthAPI from 'apis/auth';
import { throwOnInvalidStatus } from 'utils/throwOnInvalidStatus';

const useCheckSessionId = (throwOnError = true) => {
  const { retryCallback } = useUnauthorize();

  return useQuery<null, Error | StatusError>({
    queryKey: ['checkSessionId'],
    queryFn: async () => {
      const response = await AuthAPI.checkSessionId();
      throwOnInvalidStatus(response);
      return null;
    },
    retry: retryCallback,
    throwOnError,
  });
};

export default useCheckSessionId;
