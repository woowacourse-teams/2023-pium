import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userInfo } from 'store/atoms/userInfo';
import StatusError from 'apis/statusError';
import { GUIDE, STATUS_CODE, URL_PATH } from 'constants/index';
import useToast from './useToast';

const useUnauthorize = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const setUserInfo = useSetRecoilState(userInfo);

  const throwOnErrorCallback = useCallback(
    (error: Error | StatusError) => {
      if (error instanceof StatusError) {
        if (error.statusCode === STATUS_CODE.unauthorize) {
          addToast('warning', GUIDE.login);
          setUserInfo({ isLogin: false });
          navigate(URL_PATH.login);
          return false;
        }
      }

      return true;
    },
    [navigate, addToast, setUserInfo]
  );

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
