// TODO: 클래스로 변환해서 사용해보기

type NotificationPermission = 'granted' | 'default' | 'denied';

interface PushStatusState {
  pushSupport: boolean; // 현재 기기가 push기능을 지원하는지
  //[MDN](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription)
  // pushSubscription: PushSubscription | null; // 현재 구독중인 service endpoint와 구독 해제 기능을 제공하고 있음.
  notificationPermission?: NotificationPermission; // 현재 알림 상태가 어떤지
  currentToken: string | null;
}

export const isSupported =
  'serviceWorker' in navigator && 'Notification' in window && 'PushManager' in window;

const initialPushStatus: PushStatusState = {
  pushSupport: false,
  currentToken: null,
};

class PushStatus {
  private pushStatus: PushStatusState = initialPushStatus;

  constructor() {
    this.pushStatus.pushSupport = isSupported;
  }

  updatePushStatus(pushStatus: PushStatusState) {
    this.pushStatus = pushStatus;
  }

  getCurrentToken(): string {
    if (!this.pushStatus.currentToken) throw new Error('등록된 토큰이 없습니다');
    return this.pushStatus.currentToken;
  }

  setCurrentToken(token: string | null) {
    this.pushStatus.currentToken = token;
  }

  getPermission() {
    if (!this.pushStatus.notificationPermission) throw new Error('알림 상태를 알 수 없습니다');
    return this.pushStatus.notificationPermission;
  }

  setPermission(permission: NotificationPermission) {
    this.pushStatus.notificationPermission = permission;
  }

  getIsSupport() {
    return this.pushStatus.pushSupport;
  }
}

const pushStatus = new PushStatus();

export default pushStatus;
