import { useQuery } from '@tanstack/react-query';
import StatusError from 'models/statusError';
import useUnauthorize from 'hooks/useUnauthorize';
import AuthAPI from 'apis/auth';
import { throwOnInvalidStatus } from 'utils/throwOnInvalidStatus';

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
