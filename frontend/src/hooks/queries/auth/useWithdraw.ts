import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import AuthAPI from 'apis/auth';
import noRetryIfUnauthorized from 'utils/noRetryIfUnauthorized';
import { throwOnInvalidStatus } from 'utils/throwOnInvalidStatus';
import { URL_PATH } from 'constants/index';

const useWithdraw = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const response = await AuthAPI.withdraw();
      throwOnInvalidStatus(response);
    },

    onSuccess: () => {
      navigate(URL_PATH.main, { replace: true });
    },

    throwOnError: true,
    retry: noRetryIfUnauthorized,
  });
};

export default useWithdraw;
