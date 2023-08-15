import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { userInfo } from 'store/atoms/userInfo';
import useUnauthorize from 'hooks/useUnauthorize';
import AuthAPI from 'apis/auth';
import { throwOnInvalidStatus } from 'apis/throwOnInvalidStatus';

const useCheckSessionId = () => {
  const setUserInfo = useSetRecoilState(userInfo);
  const { throwOnErrorCallback, retryCallback } = useUnauthorize();

  return useMutation({
    mutationFn: async () => {
      const response = await AuthAPI.checkSessionId();
      throwOnInvalidStatus(response);

      return await response.json();
    },
    onSuccess: () => {
      setUserInfo({
        isLogin: true,
      });
    },
    throwOnError: throwOnErrorCallback,
    retry: retryCallback,
  });
};

export default useCheckSessionId;
