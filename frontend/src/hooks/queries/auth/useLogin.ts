import { useSuspenseQuery } from '@tanstack/react-query';
import AuthAPI from 'apis/auth';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';

const useLogin = (code: string) =>
  useSuspenseQuery<null, Error, void>({
    queryKey: ['getSession', code],
    queryFn: async () => {
      const response = await AuthAPI.getSessionId(code);
      throwOnInvalidStatus(response);
      return null;
    },
  });

export default useLogin;
