import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import useAddToast from 'hooks/@common/useAddToast';
import WebPushSubscribeAPI, { SUBSCRIBE_URL } from 'apis/webPush';
import { deleteCurrentToken, getCurrentToken } from 'utils/firebase';
import noRetryIfUnauthorized from 'utils/noRetryIfUnauthorized';
import { pushStatus } from 'utils/pushStatus';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';

interface CurrentSubscribe {
  subscribe: boolean;
}

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
      pushStatus.currentToken = currentToken;
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
      await deleteCurrentToken();
      const currentToken = await getCurrentToken();
      pushStatus.currentToken = currentToken;
    },
    onError: (error, __, context) => {
      // 업데이트에 실패한 경우 이전 값으로 반환
      queryClient.setQueryData([SUBSCRIBE_URL], context?.prevData);
      addToast({ type: 'error', message: error.message });
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
      return data;
    },
    retry: noRetryIfUnauthorized,
  });

  return {
    subscribe: subscribe.mutate,
    unSubscribe: unSubscribe.mutate,
    currentSubscribe: currentSubscribe.data.subscribe,
  };
};

export default useWebPush;
