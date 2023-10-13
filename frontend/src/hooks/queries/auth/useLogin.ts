import { useMutation } from '@tanstack/react-query';
import AuthAPI from 'apis/auth';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';

const useLogin = () =>
  useMutation<null, Error, string>({
    mutationFn: async (code: string) => {
      const response = await AuthAPI.getSessionId(code);

      throwOnInvalidStatus(response);
      return null;
    },
  });

export default useLogin;
