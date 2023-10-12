import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import useAddToast from 'hooks/@common/useAddToast';
import WebPushSubscribeAPI, { SUBSCRIBE_URL } from 'apis/webPush';
import noRetryIfUnauthorized from 'utils/noRetryIfUnauthorized';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';

interface CurrentSubscribe {
  isSubscribe: boolean;
}

const useWebPush = () => {
  const addToast = useAddToast();
  const queryClient = useQueryClient();

  const subscribe = useMutation({
    mutationFn: async (token: string) => {
      const response = await WebPushSubscribeAPI.subscribe(token);
      throwOnInvalidStatus(response);
      if (response.status === 407) {
        throw new Error('랜덤 실패');
      }

      return null;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [SUBSCRIBE_URL] });

      const prevData = queryClient.getQueryState([SUBSCRIBE_URL]);

      return { prevData };
    },
    onSuccess: () => {
      addToast('success', '알림을 등록했습니다.', 3000);
    },
    onError: (_, __, context) => {
      queryClient.setQueryData([SUBSCRIBE_URL], context?.prevData);
      addToast('error', '알림 등록에 실패했습니다.', 3000);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [SUBSCRIBE_URL] });
    },
  });

  const unSubscribe = useMutation({
    mutationFn: async () => {
      const response = await WebPushSubscribeAPI.unSubscribe();
      throwOnInvalidStatus(response);
      if (response.status === 407) {
        throw new Error('랜덤 실패');
      }

      return null;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [SUBSCRIBE_URL] });

      const prevData = queryClient.getQueryState([SUBSCRIBE_URL]);

      return { prevData };
    },
    onSuccess: () => {
      addToast('info', '알림을 해제했습니다.', 3000);
    },
    onError: (_, __, context) => {
      // 업데이트에 실패한 경우 이전 값으로 반환
      queryClient.setQueryData([SUBSCRIBE_URL], context?.prevData);
      addToast('error', '알림 해제에 실패했습니다.', 3000);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [SUBSCRIBE_URL] });
    },
  });

  const currentSubscribe = useSuspenseQuery<CurrentSubscribe>({
    queryKey: [SUBSCRIBE_URL],
    queryFn: async () => {
      const response = await WebPushSubscribeAPI.currentSubscribe();
      throwOnInvalidStatus(response);

      const data = await response.json();
      console.log(data, 'current subscribe');
      return data;
    },
    retry: noRetryIfUnauthorized,
  });

  return { subscribe, unSubscribe, currentSubscribe };
};

export default useWebPush;
