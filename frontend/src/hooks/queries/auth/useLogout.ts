import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useUnauthorize from 'hooks/useUnauthorize';
import AuthAPI from 'apis/auth';
import { throwOnInvalidStatus } from 'apis/throwOnInvalidStatus';
import { URL_PATH } from 'constants/index';

const useLogout = () => {
  const navigate = useNavigate();
  const { throwOnErrorCallback, retryCallback } = useUnauthorize();

  return useMutation({
    mutationFn: async () => {
      const response = await AuthAPI.logout();

      throwOnInvalidStatus(response);
    },
    onSuccess: () => {
      navigate(URL_PATH.main);
    },
    throwOnError: throwOnErrorCallback,
    retry: retryCallback,
  });
};

export default useLogout;
