import { isSupported } from 'firebase/messaging';
import FCMMessaging from 'models/FCMMessaging';
import PushStatus, { isSupported as isBrowserSupport } from 'models/PushStatus';

const registerPwaServiceWorker = async (workerPath: string) => {
  // 지원하지 않는 브라우저라면 return;
  const FCMSupported = await isSupported();

  if (!isBrowserSupport || !FCMSupported) {
    return;
  }
  // 기존에 있던 서비스 워커를 가져옴
  let registration = await navigator.serviceWorker.getRegistration();

  const oldScriptUrl = registration?.active?.scriptURL;

  // 서비스워커 등록이 되어 있지 않다면 새로 등록함.
  if (!oldScriptUrl) {
    registration = await navigator.serviceWorker.register(workerPath);
  } else {
    const oldScriptPath = new URL(oldScriptUrl).pathname;
    // 서비스 워커 업데이트가 일어나거나, 기존 서비스 워커가 없다면 새로 등록함.
    if (!registration || oldScriptPath !== workerPath) {
      registration = await navigator.serviceWorker.register(workerPath);
    }
  }

  FCMMessaging.setOnMessaging();

  PushStatus.updatePushStatus({
    notificationPermission: 'default',
    pushSupport: FCMSupported && isBrowserSupport,
  });
};

export default registerPwaServiceWorker;
