import { useQuery } from '@tanstack/react-query';
import AuthAPI from 'apis/auth';
import { throwOnInvalidStatus } from 'apis/throwOnInvalidStatus';

const useLogin = (code: string) => {
  return useQuery<null, Error, void>({
    queryKey: ['getSession', code],
    queryFn: async () => {
      const response = await AuthAPI.getSessionId(code);

      throwOnInvalidStatus(response);

      return null;
    },
    suspense: true,
  });
};

export default useLogin;
