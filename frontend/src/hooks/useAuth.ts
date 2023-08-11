import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userInfo } from 'store/atoms/userInfo';
import Auth from 'apis/auth';
import { URL_PATH } from 'constants/index';

const useAuth = () => {
  const { getSessionId, logout, withdraw } = Auth;
  const setUserInfo = useSetRecoilState(userInfo);
  const navigate = useNavigate();

  const userLogin = useMutation({
    mutationFn: (code: string) => getSessionId(code),
    onSuccess: () => navigate(URL_PATH.main),
    onError: (error: Error) => {
      throw new Error(error.message);
    },
    throwOnError: true,
  });

  const userLogout = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate(URL_PATH.main);
      setUserInfo({
        isLogin: false,
        id: '-1',
      });
    },
  });

  const userWithdraw = useMutation({
    mutationFn: withdraw,
    onSuccess: () => {
      navigate(URL_PATH.main);
      setUserInfo({
        isLogin: false,
        id: '-1',
      });
    },
  });

  return { userLogin, userLogout, userWithdraw };
};

export default useAuth;
