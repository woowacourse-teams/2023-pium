import useWebPush from 'hooks/queries/auth/useWebPush';
import PushStatus from 'models/PushStatus';
import useAddToast from './useAddToast';

const usePushAlert = () => {
  const addToast = useAddToast();
  const { subscribe, unSubscribe, currentSubscribe } = useWebPush();

  const subscribeAlert = async () => {
    if (!PushStatus.getIsSupport()) {
      addToast({ type: 'warning', message: '지원하지 않는 브라우저입니다', time: 3000 });
      return;
    }

    // subscribe를 하지 않으려면 해당 토큰을 제거해야 한다.
    const permission = await Notification.requestPermission();
    PushStatus.setPermission(permission);

    if (permission !== 'granted') {
      addToast({ type: 'info', message: '알림을 거부했습니다', time: 3000 });
      return;
    }

    try {
      const token = PushStatus.getCurrentToken();
      subscribe(token);
    } catch (error) {
      addToast({ type: 'error', message: '구독중에 에러가 발생했습니다', time: 3000 });
    }
  };

  const unSubscribeAlert = () => {
    unSubscribe();
  };

  return {
    currentSubscribe, // 현재 FCM을 구독하고 있는지 아닌지
    pushSupport: PushStatus.getIsSupport(), // 푸시 서비스를 지원하는지 여부
    notificationDenied: PushStatus.getPermission(), // 알림 구독 여부
    subscribeAlert,
    unSubscribeAlert,
  };
};

export default usePushAlert;
