// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAOEUhyDZ1FQ2Ly77t-TNEqzb-686teUKU',
  authDomain: 'pium-7ddfe.firebaseapp.com',
  projectId: 'pium-7ddfe',
  storageBucket: 'pium-7ddfe.appspot.com',
  messagingSenderId: '66938335591',
  appId: '1:66938335591:web:88ebf4f7f9dba08031ffc2',
  measurementId: 'G-8SL2D547VW',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

/**
 * firebase에서 pushManager를 등록하지 않고도 값 사용이 가능한 이유.
 *
 * getToken 메서드에서 getTokenInternal이라는 메서드를 return 하는데, getPushSubscription 이라는 메서드에서 pushManager를 통해서 serviceWorker에 등록을 하기 때문.
 * getTokenInternal를 호출 하기 전 vapidKey를 업데이트 하고, 해당 messaging 객체를 넘겨준다.
 *
 * https://github.dev/firebase/firebase-js-sdk
 */

const getCurrentToken = async () =>
  await getToken(messaging, {
    vapidKey: process.env.VAPID_PUBLIC_KEY ?? '',
  });

onMessage(messaging, (payload) => {
  console.log(payload, 'this is payload');
});

export { analytics, messaging, getCurrentToken };
