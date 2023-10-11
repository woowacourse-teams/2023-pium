import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import WebPushSubscribeAPI, { SUBSCRIBE_URL } from 'apis/webPush';
import noRetryIfUnauthorized from 'utils/noRetryIfUnauthorized';
import throwOnInvalidStatus from 'utils/throwOnInvalidStatus';

interface CurrentSubscribe {
  isSubscribe: boolean;
}

const useWebPush = () => {
  const subscribe = useMutation({
    mutationFn: async (token: string) => await WebPushSubscribeAPI.subscribe(token),
  });

  const unSubscribe = useMutation({
    mutationFn: async () => await WebPushSubscribeAPI.unSubscribe(),
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

  return { subscribe, unSubscribe, currentSubscribe };
};

export default useWebPush;
