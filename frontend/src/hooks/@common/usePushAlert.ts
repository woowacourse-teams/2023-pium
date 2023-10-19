import useWebPush from 'hooks/queries/auth/useWebPush';
import FCMMessaging from 'models/FCMMessaging';
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
      addToast({ type: 'info', message: '알림이 허용되지 않았습니다', time: 3000 });
      return;
    }
    // TODO: 사용자가 처음 알림 설정을 한 것인지 아니면 기존에
    try {
      let token = PushStatus.getCurrentToken();

      // 이중 throw... 이게 괜찮은걸까?
      if (token === null) {
        // TODO: 여기서 시간이 좀 걸림;;
        token = await FCMMessaging.getCurrentToken();

        if (token === null) throw new Error();
      }

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
    subscribeAlert,
    unSubscribeAlert,
  };
};

export default usePushAlert;
