import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userInfo } from 'store/atoms/userInfo';
import Auth from 'apis/auth';
import { throwOnInvalidStatus } from 'apis/throwOnInvalidStatus';
import { URL_PATH } from 'constants/index';

const useAuth = () => {
  const { getSessionId, logout, withdraw } = Auth;
  const setUserInfo = useSetRecoilState(userInfo);
  const navigate = useNavigate();

  const userLogin = (code: string) =>
    useQuery({
      queryKey: ['getSession'],
      queryFn: async () => {
        const response = await getSessionId(code);

        throwOnInvalidStatus(response);
      },
      throwOnError: true,
    });

  const userLogout = useMutation({
    mutationFn: async () => {
      const response = await logout();

      throwOnInvalidStatus(response);
    },
    onSuccess: () => {
      navigate(URL_PATH.main);
      setUserInfo({
        isLogin: false,
        id: '-1',
      });
    },
    throwOnError: true,
  });

  const userWithdraw = useMutation({
    mutationFn: async () => {
      const response = await withdraw();

      throwOnInvalidStatus(response);
    },
    onSuccess: () => {
      navigate(URL_PATH.main);
      setUserInfo({
        isLogin: false,
        id: '-1',
      });
    },
    throwOnError: true,
  });

  return { userLogin, userLogout, userWithdraw };
};

export default useAuth;
