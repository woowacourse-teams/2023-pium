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

    const permission = await Notification.requestPermission();
    PushStatus.setPermission(permission);

    if (permission !== 'granted') {
      addToast({ type: 'info', message: '알림이 허용되지 않았습니다', time: 3000 });
      return;
    }
    try {
      // 필요 없음!
      subscribe();
    } catch (error) {
      addToast({ type: 'error', message: '구독중에 에러가 발생했습니다', time: 3000 });
    }
  };

  const unSubscribeAlert = () => {
    unSubscribe();
  };

  return {
    currentSubscribe, // 현재 FCM을 구독하고 있는지 아닌지
    subscribeAlert,
    unSubscribeAlert,
  };
};

export default usePushAlert;
