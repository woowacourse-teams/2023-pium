import { isSupported, updatePushStatus } from 'utils/pushStatus';

const registerPwaServiceWorker = async () => {
  // 지원하지 않는 브라우저라면 return;
  if (!isSupported) {
    return;
  }
  // 기존에 있던 서비스 워커를 가져옴
  let registration = await navigator.serviceWorker.getRegistration();

  const newScriptPath = '/firebase-messaging-sw.js';
  const oldScriptUrl = registration?.active?.scriptURL;

  // 서비스워커 등록이 되어 있지 않다면 새로 등록함.
  if (!oldScriptUrl) {
    registration = await navigator.serviceWorker.register(newScriptPath);
  } else {
    const oldScriptPath = new URL(oldScriptUrl).pathname;
    // 서비스 워커 업데이트가 일어나거나, 기존 서비스 워커가 없다면 새로 등록함.
    if (!registration || oldScriptPath !== newScriptPath) {
      registration = await navigator.serviceWorker.register(newScriptPath);
    }
  }

  // 새로운 서비스워커로 업데이트
  await updatePushStatus(registration);
};

export default registerPwaServiceWorker;