import useWebPush from 'hooks/queries/auth/useWebPush';
import { getCurrentToken } from 'utils/firebase';
import { pushStatus } from 'utils/pushStatus';
import useAddToast from './useAddToast';

const usePushAlert = () => {
  const addToast = useAddToast();
  const { subscribe, unSubscribe, currentSubscribe } = useWebPush();

  const subscribeAlert = async () => {
    if (!pushStatus.pushSupport) {
      addToast({ type: 'warning', message: '지원하지 않는 브라우저입니다', time: 3000 });
      return;
    }

    // subscribe를 하지 않으려면 해당 토큰을 제거해야 한다.
    const permission = await Notification.requestPermission();
    pushStatus.notificationPermission = permission;

    if (permission !== 'granted') {
      addToast({ type: 'info', message: '알림을 거부했습니다', time: 3000 });
      return;
    }
    try {
      const currentToken = await getCurrentToken(); // 여기서 새로운 토큰을 전달하면 됨.

      subscribe(currentToken);
    } catch (error) {
      addToast({ type: 'error', message: '구독중에 에러가 발생했습니다', time: 3000 });
    }
  };

  const unSubscribeAlert = () => {
    unSubscribe();
  };

  return {
    currentSubscribe, // 현재 FCM을 구독하고 있는지 아닌지
    pushSupport: pushStatus.pushSupport, // 푸시 서비스를 지원하는지 여부
    notificationDenied: pushStatus.notificationPermission, // 알림 구독 여부
    subscribeAlert,
    unSubscribeAlert,
  };
};

export default usePushAlert;
