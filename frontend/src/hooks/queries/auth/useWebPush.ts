import { useMutation } from '@tanstack/react-query';
import useAddToast from 'hooks/@common/useAddToast';
import WebPushSubscribeAPI from 'apis/webPush';
import { pushStatus } from 'utils/pushStatus';

const useWebPushSubscribe = () => {
  const addToast = useAddToast();

  return useMutation({
    mutationFn: async (token: string) => await WebPushSubscribeAPI.subscribe(token),
    onSuccess: () => {
      pushStatus.pushSubscription = null;
      addToast('success', '알림을 등록했습니다.', 3000);
    },
  });
};

const useWebPushUnSubscribe = () => {
  const addToast = useAddToast();

  return useMutation({
    mutationFn: async () => await WebPushSubscribeAPI.unSubscribe(),

    onSuccess: () => {
      pushStatus.pushSubscription = null;
      addToast('info', '알림을 거부했습니다.', 3000);
    },
  });
};

export { useWebPushSubscribe, useWebPushUnSubscribe };
