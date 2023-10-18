// TODO: 클래스로 변환해서 사용해보기
type PushStatus = {
  pushSupport: boolean; // 현재 기기가 push기능을 지원하는지
  //[MDN](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription)
  // pushSubscription: PushSubscription | null; // 현재 구독중인 service endpoint와 구독 해제 기능을 제공하고 있음.
  serviceWorkerRegistration?: ServiceWorkerRegistration; // serviceWorker에 등록되어 있는지
  notificationPermission?: 'granted' | 'default' | 'denied'; // 현재 알림 상태가 어떤지
  currentToken: string;
};

export const isSupported =
  'serviceWorker' in navigator && 'Notification' in window && 'PushManager' in window;

export const updatePushStatus = async (registration: ServiceWorkerRegistration, token: string) => {
  pushStatus.pushSupport = isSupported;
  pushStatus.serviceWorkerRegistration = registration;
  pushStatus.notificationPermission = Notification.permission;
  pushStatus.currentToken = token;
};

export const pushStatus: PushStatus = {
  pushSupport: false,
  currentToken: '',
};
