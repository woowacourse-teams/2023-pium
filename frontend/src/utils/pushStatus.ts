type PushStatus = {
  pushSupport: boolean; // 현재 기기가 push기능을 지원하는지
  //[MDN](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription)
  pushSubscription: PushSubscription | null; // 현재 구독중인 service endpoint와 구독 해제 기능을 제공하고 있음.
  serviceWorkerRegistration?: ServiceWorkerRegistration; // serviceWorker에 등록되어 있는지
  notificationPermission?: 'granted' | 'default' | 'denied'; // 현재 알림 상태가 어떤지
};

export const isSupported =
  'serviceWorker' in navigator && 'Notification' in window && 'PushManager' in window;

export const updatePushStatus = async (registration: ServiceWorkerRegistration) => {
  pushStatus.pushSupport = !!registration?.pushManager;
  pushStatus.pushSubscription = await registration?.pushManager?.getSubscription();
  pushStatus.serviceWorkerRegistration = registration;
  pushStatus.notificationPermission = Notification.permission;
};

export const pushStatus: PushStatus = {
  pushSupport: false,
  pushSubscription: null,
};
