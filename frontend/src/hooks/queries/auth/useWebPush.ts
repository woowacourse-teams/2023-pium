import { useMutation } from '@tanstack/react-query';
import WebPushSubscribeAPI from 'apis/webPush';
import { pushStatus } from 'utils/pushStatus';

const useWebPushSubscribe = () => {
  return useMutation({
    mutationFn: async (subscription: PushSubscription) =>
      await WebPushSubscribeAPI.subscribe(subscription),
  });
};

const useWebPushUnSubscribe = () => {
  return useMutation({
    mutationFn: async (endpoint: string) => await WebPushSubscribeAPI.unSubscribe(endpoint),

    onSuccess: () => {
      pushStatus.pushSubscription = null;
    },
  });
};

export { useWebPushSubscribe, useWebPushUnSubscribe };
