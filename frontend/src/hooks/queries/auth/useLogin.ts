import { useMutation } from '@tanstack/react-query';
import AuthAPI from 'apis/auth';
import { getCurrentToken } from 'utils/firebase';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';

const useLogin = () =>
  useMutation<null, Error, string>({
    mutationFn: async (code: string) => {
      const currentToken = await getCurrentToken();

      const response = await AuthAPI.getSessionId(code, currentToken);

      throwOnInvalidStatus(response);
      return null;
    },
  });

export default useLogin;
