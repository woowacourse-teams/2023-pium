import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userInfo } from 'store/atoms/userInfo';
import AuthAPI from 'apis/auth';
import { throwOnInvalidStatus } from 'apis/throwOnInvalidStatus';
import { URL_PATH } from 'constants/index';

const useCheckSessionId = () => {
  const setUserInfo = useSetRecoilState(userInfo);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const response = await AuthAPI.checkSessionId();
      throwOnInvalidStatus(response);

      return await response.json();
    },
    onError: () => {
      navigate(URL_PATH.main);
      setUserInfo({
        isLogin: false,
      });
    },
    onSuccess: () => {
      setUserInfo({
        isLogin: true,
      });
    },
    retry: false,
  });
};

export default useCheckSessionId;
