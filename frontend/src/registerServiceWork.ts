import { isSupported, pushStatus } from 'utils/pushStatus';

const updatePushStatus = async (registration: ServiceWorkerRegistration) => {
  pushStatus.serviceWorkerRegistration = registration;
  pushStatus.pushSupport = !!registration?.pushManager;
  pushStatus.pushSubscription = await registration?.pushManager?.getSubscription();
  pushStatus.notificationPermission = Notification.permission;
};

const registerPwaServiceWorker = async () => {
  if (!isSupported) {
    return;
  }

  let registration = await navigator.serviceWorker.getRegistration();

  const newScriptPath = '/serviceWorker.js';
  const oldScriptUrl = registration?.active?.scriptURL;

  if (!oldScriptUrl) {
    registration = await navigator.serviceWorker.register(newScriptPath);
  } else {
    const oldScriptPath = new URL(oldScriptUrl).pathname;
    if (!registration || oldScriptPath !== newScriptPath) {
      registration = await navigator.serviceWorker.register(newScriptPath);
    }
  }
  console.log(registration, 'registration@@');
  await updatePushStatus(registration);
};

export default registerPwaServiceWorker;
