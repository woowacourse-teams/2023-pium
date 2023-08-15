import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { userInfo } from 'store/atoms/userInfo';
import AuthAPI from 'apis/auth';
import { throwOnInvalidStatus } from 'apis/throwOnInvalidStatus';

const useLogin = (code: string) => {
  const setUserInfo = useSetRecoilState(userInfo);

  return useQuery<null, Error, void>({
    queryKey: ['getSession', code],
    queryFn: async () => {
      const response = await AuthAPI.getSessionId(code);

      throwOnInvalidStatus(response);
      const cookie = document.cookie;
      const [_, cookieValue] = cookie.split('=');
      const sessionId = cookieValue.slice(0, 10);

      sessionStorage.setItem('sessionId', JSON.stringify(sessionId));

      setUserInfo({ isLogin: true });
      return null;
    },
    suspense: true,
  });
};

export default useLogin;
