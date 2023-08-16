import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusError from 'models/statusError';
import { GUIDE, STATUS_CODE, URL_PATH } from 'constants/index';
import useAddToast from './useAddToast';

const useUnauthorize = () => {
  const navigate = useNavigate();
  const addToast = useAddToast();

  const throwOnErrorCallback = useCallback(
    (error: Error | StatusError) =>
      !(error instanceof StatusError) || error.statusCode !== STATUS_CODE.unauthorize,
    []
  );

  const retryCallback = useCallback((failureCount: number, error: StatusError | Error) => {
    if (error instanceof StatusError && error.statusCode === STATUS_CODE.unauthorize) {
      return false;
    }

    if (failureCount === 3) {
      return false;
    }
    return true;
  }, []);

  const redirectLoginPage = useCallback(
    (error: Error | StatusError) => {
      if (error instanceof StatusError && error.statusCode === STATUS_CODE.unauthorize) {
        addToast('warning', GUIDE.login);
        navigate(URL_PATH.login, { replace: true });
      }
    },
    [addToast, navigate]
  );

  return { throwOnErrorCallback, retryCallback, redirectLoginPage };
};

export default useUnauthorize;
