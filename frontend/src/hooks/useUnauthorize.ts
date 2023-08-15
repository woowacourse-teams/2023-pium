import { useCallback } from 'react';
import StatusError from 'apis/statusError';
import { STATUS_CODE } from 'constants/index';

const useUnauthorize = () => {
  const throwOnErrorCallback = useCallback((error: Error | StatusError) => {
    if (error instanceof StatusError) {
      if (error.statusCode === STATUS_CODE.unauthorize) {
        return false;
      }
    }
    return true;
  }, []);

  const retryCallback = useCallback((failureCount: number, error: StatusError | Error) => {
    if (error instanceof StatusError) {
      if (error.statusCode === STATUS_CODE.unauthorize) {
        return false;
      }
    }

    if (failureCount === 3) {
      return false;
    }
    return true;
  }, []);

  return { throwOnErrorCallback, retryCallback };
};

export default useUnauthorize;
