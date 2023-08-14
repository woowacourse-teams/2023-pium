import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userInfo } from 'store/atoms/userInfo';
import Auth from 'apis/auth';
import { throwOnInvalidStatus } from 'apis/throwOnInvalidStatus';
import { URL_PATH } from 'constants/index';

const useAuth = () => {
  const { getSessionId, logout, withdraw, checkSessionId } = Auth;
  const setUserInfo = useSetRecoilState(userInfo);
  const navigate = useNavigate();

  const userLogin = (code: string) =>
    useQuery({
      queryKey: ['getSession'],
      queryFn: async () => {
        const response = await getSessionId(code);

        throwOnInvalidStatus(response);
        const data = await response.json();

        const { sessionId } = data;

        sessionStorage.setItem('sessionId', JSON.stringify(sessionId));
        setUserInfo({ isLogin: true });

        return data;
      },
      throwOnError: true,
      suspense: true,
    });

  const userLogout = useMutation({
    mutationFn: async () => {
      const response = await logout();

      throwOnInvalidStatus(response);
      return await response.text();
    },
    onSuccess: () => {
      navigate(URL_PATH.main);
      setUserInfo({
        isLogin: false,
      });
    },
    throwOnError: true,
  });

  const userWithdraw = useMutation({
    mutationFn: async () => {
      const response = await withdraw();

      throwOnInvalidStatus(response);
      return await response.text();
    },
    onSuccess: () => {
      navigate(URL_PATH.main);
      setUserInfo({
        isLogin: false,
      });
    },
    throwOnError: true,
  });

  const checkUserSessionId = useMutation({
    mutationFn: async () => {
      const response = await checkSessionId();
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

  return { userLogin, userLogout, userWithdraw, checkUserSessionId };
};

export default useAuth;
