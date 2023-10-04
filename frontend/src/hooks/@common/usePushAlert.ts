import { useWebPushSubscribe, useWebPushUnSubscribe } from 'hooks/queries/auth/useWebPush';
import { pushStatus } from 'utils/pushStatus';
import { urlB64ToUint8Array } from 'utils/urlB64ToUint8Array';
import useAddToast from './useAddToast';

const usePushAlert = () => {
  const addToast = useAddToast();

  const { mutate: subscribe } = useWebPushSubscribe();
  const { mutate: unSubScribe } = useWebPushUnSubscribe();

  const subscribeToggle = () => {
    if (!pushStatus.pushSupport) {
      addToast('warning', '지원하지 않는 브라우저입니다', 3000);
      return;
    }

    Notification.requestPermission().then((permission) => {
      pushStatus.notificationPermission = permission;

      if (permission !== 'granted') {
        addToast('info', '알림을 거부했습니다', 3000);
        return;
      }

      if (pushStatus.pushSubscription) {
        pushStatus.pushSubscription.unsubscribe().then((success) => {
          if (success && pushStatus.pushSubscription) {
            const { endpoint } = pushStatus.pushSubscription;
            unSubScribe(endpoint);
            addToast('info', '알림을 비활성화 합니다.', 3000);
          }
        });
      } else {
        const option = {
          userVisibleOnly: true,
          applicationServerKey: urlB64ToUint8Array(process.env.VAPID_PUBLIC_KEY ?? ''),
        };
        navigator.serviceWorker.ready.then((registration) => {
          registration.pushManager.subscribe(option).then((pushSubscription) => {
            subscribe(pushSubscription);
            pushStatus.pushSubscription = pushSubscription;
          });
        });
      }
    });
  };

  return {
    isSubscribe: pushStatus.pushSubscription ? true : false,
    pushSupport: pushStatus.pushSupport,
    subscribeToggle,
  };
};

export default usePushAlert;
