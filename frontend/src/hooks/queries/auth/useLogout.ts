import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAddToast from 'hooks/useAddToast';
import useUnauthorize from 'hooks/useUnauthorize';
import AuthAPI from 'apis/auth';
import { throwOnInvalidStatus } from 'utils/throwOnInvalidStatus';
import { URL_PATH } from 'constants/index';

const useLogout = () => {
  const navigate = useNavigate();
  const addToast = useAddToast();
  const { retryCallback } = useUnauthorize();

  return useMutation({
    mutationFn: async () => {
      const response = await AuthAPI.logout();
      throwOnInvalidStatus(response);
    },
    onSuccess: () => {
      addToast('info', '로그아웃에 성공했어요.');
      navigate(URL_PATH.main, { replace: true });
    },
    throwOnError: true,
    retry: retryCallback,
  });
};

export default useLogout;
