// TODO: 클래스로 변환해서 사용해보기
import FCMMessaging from './FCMMessaging';

type NotificationPermission = 'granted' | 'default' | 'denied';

interface PushStatusState {
  pushSupport: boolean; // 현재 기기가 push기능을 지원하는지
  //[MDN](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription)
  // pushSubscription: PushSubscription | null; // 현재 구독중인 service endpoint와 구독 해제 기능을 제공하고 있음.
  notificationPermission: NotificationPermission; // 현재 알림 상태가 어떤지
  currentToken: string | null;
}

export const isSupported =
  'serviceWorker' in navigator && 'Notification' in window && 'PushManager' in window;

const initialPushStatus: PushStatusState = {
  pushSupport: isSupported,
  currentToken: null,
  notificationPermission: 'default',
};

class PushStatus {
  private pushStatus: PushStatusState = initialPushStatus;

  async updatePushStatus(pushStatus: PushStatusState) {
    this.pushStatus = pushStatus;

    if (pushStatus.notificationPermission !== 'granted') {
      this.pushStatus.currentToken = null;
      await FCMMessaging.deleteCurrentToken();
    }
  }

  getCurrentToken() {
    return this.pushStatus.currentToken;
  }

  setCurrentToken(token: string | null) {
    this.pushStatus.currentToken = token;
  }

  getPermission() {
    return this.pushStatus.notificationPermission;
  }

  async setPermission(permission: NotificationPermission) {
    if (permission !== 'granted') {
      this.pushStatus.currentToken = null;
      await FCMMessaging.deleteCurrentToken();
    }

    this.pushStatus.notificationPermission = permission;
  }

  getIsSupport() {
    return this.pushStatus.pushSupport;
  }
}

export default new PushStatus();
