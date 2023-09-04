import { useQuery } from '@tanstack/react-query';
import StatusError from 'models/statusError';
import AuthAPI from 'apis/auth';
import noRetryIfUnauthorized from 'utils/noRetryIfUnauthorized';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';

const useCheckSessionId = (throwOnError = true) =>
  useQuery<null, Error | StatusError>({
    queryKey: ['checkSessionId'],
    queryFn: async () => {
      const response = await AuthAPI.checkSessionId();
      throwOnInvalidStatus(response);
      return null;
    },

    throwOnError,
    retry: noRetryIfUnauthorized,
  });

export default useCheckSessionId;
