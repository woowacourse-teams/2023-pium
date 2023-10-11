import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import useWebPush from 'hooks/queries/auth/useWebPush';
import { SUBSCRIBE_URL } from 'apis/webPush';
import { getCurrentToken } from 'utils/firebase';
import { pushStatus } from 'utils/pushStatus';
import useAddToast from './useAddToast';

const usePushAlert = () => {
  const addToast = useAddToast();
  const queryClient = useQueryClient();

  const { subscribe, unSubscribe, currentSubscribe } = useWebPush();

  const [isSubscribe, setIsSubscribe] = useState(currentSubscribe.data.isSubscribe);

  const subscribeAlert = async () => {
    if (!pushStatus.pushSupport) {
      addToast('warning', '지원하지 않는 브라우저입니다', 3000);
      return;
    }

    // subscribe를 하지 않으려면 해당 토큰을 제거해야 한다.
    const permission = await Notification.requestPermission();
    pushStatus.notificationPermission = permission;

    if (permission !== 'granted') {
      addToast('info', '알림을 거부했습니다', 3000);
      return;
    }

    const currentToken = await getCurrentToken(); // 여기서 새로운 토큰을 전달하면 됨.

    subscribe.mutate(currentToken, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [SUBSCRIBE_URL] });
        addToast('success', '알림을 등록했습니다.', 3000);
      },
      onError: () => {
        setIsSubscribe(false);
        addToast('error', '알림 등록에 실패했습니다.', 3000);
      },
    });
  };

  const unSubscribeAlert = async () => {
    unSubscribe.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [SUBSCRIBE_URL] });
        addToast('info', '알림을 해제했습니다.', 3000);
      },
      onError: () => {
        setIsSubscribe(true);
        addToast('error', '알림 해제에 실패했습니다.', 3000);
      },
    });
  };

  return {
    isSubscribe, // 현재 FCM을 구독하고 있는지 아닌지
    pushSupport: pushStatus.pushSupport, // 푸시 서비스를 지원하는지 여부
    notificationDenied: pushStatus.notificationPermission, // 알림을 구독하지 않음
    subscribeAlert,
    unSubscribeAlert,
  };
};

export default usePushAlert;
