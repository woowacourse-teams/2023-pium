import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAddToast from 'hooks/@common/useAddToast';
import AuthAPI from 'apis/auth';
import noRetryIfUnauthorized from 'utils/noRetryIfUnauthorized';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';
import { URL_PATH } from 'constants/index';

const useWithdraw = () => {
  const navigate = useNavigate();
  const addToast = useAddToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await AuthAPI.withdraw();
      throwOnInvalidStatus(response);
    },

    onSuccess: () => {
      addToast({ type: 'success', message: '회원 탈퇴에 성공했어요' });
      navigate(URL_PATH.main, { replace: true });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['checkSessionId'] });
    },

    throwOnError: true,
    retry: noRetryIfUnauthorized,
  });
};

export default useWithdraw;
