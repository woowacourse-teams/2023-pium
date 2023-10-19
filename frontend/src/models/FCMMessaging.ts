import { Analytics, getAnalytics } from 'firebase/analytics';
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { Messaging, deleteToken, getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyAOEUhyDZ1FQ2Ly77t-TNEqzb-686teUKU',
  authDomain: 'pium-7ddfe.firebaseapp.com',
  projectId: 'pium-7ddfe',
  storageBucket: 'pium-7ddfe.appspot.com',
  messagingSenderId: '66938335591',
  appId: '1:66938335591:web:88ebf4f7f9dba08031ffc2',
  measurementId: 'G-8SL2D547VW',
};

class FCMMessaging {
  private app: FirebaseApp | null = null;
  private messaging: Messaging | null = null;
  private analytics: Analytics | null = null;

  constructor(config: FirebaseOptions) {
    this.app = initializeApp(config);
    this.analytics = getAnalytics(this.app);
  }

  checkMessaging() {
    return this.messaging ? true : false;
  }

  registerMessaging() {
    if (!this.app) throw new Error('메세지 등록을 위해서는 FCM 초기화가 필요합니다.');
    this.messaging = getMessaging(this.app);
  }

  setOnMessaging() {
    if (!this.messaging) return;
    onMessage(this.messaging, (payload) => {
      const { notification } = payload;

      const notificationTitle = notification?.title ?? '피움 알림';
      const notificationOptions = {
        body: notification?.body ?? '내용이 없습니다',
        icon: notification?.icon ?? './assets/favicon-32x32.png',
      };
      const foregroundNotification = new Notification(notificationTitle, notificationOptions);

      foregroundNotification.onclick = function (event) {
        event.preventDefault();
        foregroundNotification.close();
      };
    });
  }

  async getCurrentToken() {
    if (!this.messaging) throw new Error('등록된 메세지가 없어서 토큰을 반환할 수 없습니다');
    const permission = Notification.permission;
    console.log('notification', permission);

    if (permission !== 'granted') return null;

    return await getToken(this.messaging, {
      vapidKey: process.env.VAPID_PUBLIC_KEY ?? '',
    });
  }

  async deleteCurrentToken() {
    if (!this.messaging) throw new Error('등록된 메서지가 없어서 토큰을 삭제할 수 없습니다');
    return await deleteToken(this.messaging);
  }
}

export default new FCMMessaging(firebaseConfig);
