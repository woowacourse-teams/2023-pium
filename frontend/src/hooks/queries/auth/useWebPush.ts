import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import useAddToast from 'hooks/@common/useAddToast';
import useGetToken from 'hooks/firebase/useGetToken';
import FCMMessaging from 'models/FCMMessaging';
import StatusError from 'models/statusError';
import WebPushSubscribeAPI, { SUBSCRIBE_URL } from 'apis/webPush';
import noRetryIfUnauthorized from 'utils/noRetryIfUnauthorized';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';

export interface CurrentSubscribe {
  subscribe: boolean;
}

const useWebPush = () => {
  const addToast = useAddToast();
  const queryClient = useQueryClient();

  const { data: token } = useGetToken();

  // token이 null인 경우는 알림이 허용되지 않은 경우
  if (token === null) {
    throw new Error('알림을 허용하지 않았습니다');
  }

  const subscribe = useMutation({
    mutationFn: async () => {
      const response = await WebPushSubscribeAPI.subscribe(token);
      throwOnInvalidStatus(response);

      return null;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [SUBSCRIBE_URL] });

      const prevData = queryClient.getQueryState<CurrentSubscribe>([SUBSCRIBE_URL]);
      queryClient.setQueryData([SUBSCRIBE_URL], () => ({ subscribe: true }));

      return { prevData };
    },

    onError: async (error, __, context) => {
      queryClient.setQueryData([SUBSCRIBE_URL], context?.prevData);

      addToast({ type: 'error', message: '구독하는데 문제가 발생했습니다' });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [SUBSCRIBE_URL] });
    },
  });

  // 구독 해제를 했을 때 구독 취소 API와 fcm에서 토큰 삭제가 모두 이루어 져야 함. 근데 그게 안된다면 에러를 던진다.
  const unSubscribe = useMutation({
    mutationFn: async () => {
      const fcmDeleteToken = await FCMMessaging.deleteCurrentToken();

      if (!fcmDeleteToken) {
        throw new Error('토큰 삭제에 실패했습니다');
      }

      const results = await WebPushSubscribeAPI.unSubscribe();

      throwOnInvalidStatus(results);

      return null;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getFCMToken'] });
      await queryClient.cancelQueries({ queryKey: [SUBSCRIBE_URL] });

      const prevData = queryClient.getQueryState<string | null>(['getFCMToken']);
      const prevSubscribe = queryClient.getQueryState<CurrentSubscribe>([SUBSCRIBE_URL]);

      queryClient.setQueryData([SUBSCRIBE_URL], () => ({ subscribe: false }));

      return { prevData, prevSubscribe };
    },

    onError: async (error, __, context) => {
      queryClient.setQueryData(['getFCMToken'], context?.prevData);
      queryClient.setQueryData([SUBSCRIBE_URL], context?.prevSubscribe);

      if (error instanceof StatusError) {
        const errorData = await error.errorResponse?.json();
        addToast({ type: 'error', message: errorData['message'] });
      } else {
        addToast({ type: 'error', message: '구독 취소 중에 문제가 발생했습니다' });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [SUBSCRIBE_URL] });
      queryClient.invalidateQueries({ queryKey: ['getFCMToken'] });
    },
  });

  const { data: currentSubscribe } = useSuspenseQuery<CurrentSubscribe>({
    queryKey: [SUBSCRIBE_URL],
    queryFn: async () => {
      const response = await WebPushSubscribeAPI.currentSubscribe();
      throwOnInvalidStatus(response);
      const data = await response.json();

      return data;
    },
    retry: noRetryIfUnauthorized,
  });

  return {
    subscribe: subscribe.mutate,
    unSubscribe: unSubscribe.mutate,
    currentSubscribe: currentSubscribe.subscribe,
  };
};

export default useWebPush;
