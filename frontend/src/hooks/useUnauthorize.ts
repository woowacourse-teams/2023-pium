import StatusError from 'models/statusError';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GUIDE, STATUS_CODE, URL_PATH } from 'constants/index';
import useToast from './useToast';

const useUnauthorize = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

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

  const redirectLoginPage = useCallback((error: Error | StatusError) => {
    if (error instanceof StatusError && error.statusCode === STATUS_CODE.unauthorize) {
      addToast('warning', GUIDE.login);
      navigate(URL_PATH.login);
    }
  }, []);

  return { throwOnErrorCallback, retryCallback, redirectLoginPage };
};

export default useUnauthorize;
