import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userInfo } from 'store/atoms/userInfo';
import useUnauthorize from 'hooks/useUnauthorize';
import AuthAPI from 'apis/auth';
import { throwOnInvalidStatus } from 'apis/throwOnInvalidStatus';
import { URL_PATH } from 'constants/index';

const useLogout = () => {
  const setUserInfo = useSetRecoilState(userInfo);
  const navigate = useNavigate();
  const checkErrorStatus = useUnauthorize();

  return useMutation({
    mutationFn: async () => {
      const response = await AuthAPI.logout();

      throwOnInvalidStatus(response);
    },
    onSuccess: () => {
      navigate(URL_PATH.main);
      setUserInfo({
        isLogin: false,
      });
    },
    throwOnError: checkErrorStatus,
  });
};

export default useLogout;
