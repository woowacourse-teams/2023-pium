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
      const cookies = document.cookie.split(';');

      const sessionCookie = cookies.find((cookie) => {
        const [name] = cookie.split('=');
        return name === 'JSESSION';
      });
      console.log(sessionCookie);
      const sessionId = sessionCookie?.split('=')[1].slice(0, 10);

      localStorage.setItem('sessionId', JSON.stringify(sessionId));

      setUserInfo({ isLogin: true });
      return null;
    },
    suspense: true,
  });
};

export default useLogin;
