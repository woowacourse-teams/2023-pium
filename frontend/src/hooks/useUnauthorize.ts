import { useCallback } from 'react';
import StatusError from 'models/statusError';
import { STATUS_CODE } from 'constants/index';

const useUnauthorize = () => {
  const retryCallback = useCallback((failureCount: number, error: StatusError | Error) => {
    if (error instanceof StatusError && error.statusCode === STATUS_CODE.unauthorize) {
      return false;
    }

    if (failureCount === 3) {
      return false;
    }
    return true;
  }, []);

  return { retryCallback };
};

export default useUnauthorize;
