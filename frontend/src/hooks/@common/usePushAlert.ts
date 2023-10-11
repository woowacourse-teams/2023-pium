import useWebPush from 'hooks/queries/auth/useWebPush';
import { getCurrentToken } from 'utils/firebase';
import { pushStatus } from 'utils/pushStatus';
import useAddToast from './useAddToast';

const usePushAlert = () => {
  const addToast = useAddToast();

  const { subscribe, unSubscribe } = useWebPush();

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

    subscribe.mutate(currentToken);
  };

  const unSubscribeAlert = async () => {
    unSubscribe.mutate();
  };

  return {
    isSubscribe: pushStatus.pushSubscription ? true : false,
    pushSupport: pushStatus.pushSupport,
    subscribeAlert,
    unSubscribeAlert,
  };
};

export default usePushAlert;
