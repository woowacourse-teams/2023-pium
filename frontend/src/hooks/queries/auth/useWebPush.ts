import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import useAddToast from 'hooks/@common/useAddToast';
import PushStatus from 'models/PushStatus';
import WebPushSubscribeAPI, { SUBSCRIBE_URL } from 'apis/webPush';
import { deleteCurrentToken, getCurrentToken } from 'utils/firebase';
import noRetryIfUnauthorized from 'utils/noRetryIfUnauthorized';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';

interface CurrentSubscribe {
  subscribe: boolean;
}

// 지금 tanskack query에서 error를 잡지 않고 무조건 success를 돌려버림... 그 이유ㄴ느 뭔지 모르겟다 정말;;
const useWebPush = () => {
  const addToast = useAddToast();
  const queryClient = useQueryClient();

  const subscribe = useMutation({
    mutationFn: async (token: string) => {
      const response = await WebPushSubscribeAPI.subscribe(token);
      throwOnInvalidStatus(response);

      return null;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [SUBSCRIBE_URL] });

      const prevData = queryClient.getQueryState([SUBSCRIBE_URL]);
      queryClient.setQueryData([SUBSCRIBE_URL], () => ({ subscribe: true }));

      return { prevData };
    },

    onError: async (error, __, context) => {
      queryClient.setQueryData([SUBSCRIBE_URL], context?.prevData);
      addToast({ type: 'error', message: error.message });

      await deleteCurrentToken();
      const currentToken = await getCurrentToken();
      PushStatus.setCurrentToken(currentToken);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [SUBSCRIBE_URL] });
    },
  });

  const unSubscribe = useMutation({
    mutationFn: async () => {
      const response = await WebPushSubscribeAPI.unSubscribe();
      throwOnInvalidStatus(response);

      return null;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [SUBSCRIBE_URL] });

      const prevData = queryClient.getQueryState([SUBSCRIBE_URL]);
      queryClient.setQueryData([SUBSCRIBE_URL], () => ({ subscribe: false }));

      return { prevData };
    },
    onSuccess: async () => {
      console.log('설마 성공?');
      await deleteCurrentToken();
      const currentToken = await getCurrentToken();
      PushStatus.setCurrentToken(currentToken);
    },
    onError: (error, __, context) => {
      queryClient.setQueryData([SUBSCRIBE_URL], context?.prevData);
      addToast({ type: 'error', message: error.message });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [SUBSCRIBE_URL] });
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
