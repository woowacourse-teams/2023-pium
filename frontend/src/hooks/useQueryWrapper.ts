import { UseInfiniteQueryResult, UseQueryResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userInfo } from 'store/atoms/userInfo';
import StatusError from 'apis/statusError';
import { GUIDE, STATUS_CODE, URL_PATH } from 'constants/index';
import useToast from './useToast';

const useQueryWrapper = <TData = unknown, TError = Error | StatusError, HookParams = unknown>(
  hook: (
    params?: HookParams
  ) => UseQueryResult<TData, TError> | UseInfiniteQueryResult<TData, TError>
) => {
  const query = hook();

  const navigate = useNavigate();
  const { addToast } = useToast();
  const setUserInfo = useSetRecoilState(userInfo);

  useEffect(() => {
    if (query.error instanceof StatusError) {
      if (query.error.statusCode === STATUS_CODE.unauthorize) {
        addToast('warning', GUIDE.login);
        setUserInfo({ isLogin: false });
        navigate(URL_PATH.login);
      }
    }
  }, [query.error, addToast, setUserInfo, navigate]);

  return query;
};

export default useQueryWrapper;
