/* eslint-disable no-undef */
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyCNVyJ1qLPvMiuZDK97O-rmB3mz48UqC1g',
  authDomain: 'pium-7445f.firebaseapp.com',
  databaseURL: 'https://pium-7445f.firebaseio.com',
  projectId: 'pium-7445f',
  storageBucket: 'pium-7445f.appspot.com',
  messagingSenderId: '14284052337',
  appId: '1:14284052337:web:4ccb34224d907e73fa48d0',
  measurementId: 'G-Z5F62MDJ8N',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

const version = 1;
const assetCacheName = `assets-${version}`;

/**
 * cache 설정
 * TODO: 처음 파일들을 캐싱하는 것인데 파일 명이 달라져서 매번 갈아끼워 줘야 하는 문제가 있는것 같습니다.
 * 근데, 버저닝 생각하면 괜찮을지도?
 *
 * 파일명이 firebase-messaging-sw인 이유는, 해당 파일명으로 serviceWorker를 하지 않으면 firebase에서 인식이 되지 않더라구여;;
 *
 * https://web.dev/service-worker-mindset/ 참조
 * https://web.dev/learn/pwa/caching/
 */

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(assetCacheName).then((cache) => {
      // 캐시로 저장할 파일을 지정. 어떤 파일을 넣을지는 차후 얘기해 보며 좋을 듯.
      cache.addAll([
        '/main.43e3611a6c9133f38206.bundle.js',
        '/vendors-node_modules_react-dom_client_js-node_modules_react-router-dom_dist_index_js-node_mod-cccd04.261f3e9fe64cb376e09d.bundle.js',
        '/assets/logo.webp',
        '/index.html',
        '/',
      ]);
    })
  );

  // 제어중인 서비스 워커가 존재해도 대기 상태 건너 뜀
  self.skipWaiting();
});

// 기존에 있던 cache 삭제
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== assetCacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  // 활성화 즉시 클라이언트를 제어한다.(새로고침 불필요)
  self.clients.claim();
});

// 오프라인 상태라면, 캐시에 저장되어 있는 파일들 fetch로 받아옴
self.addEventListener('fetch', (event) => {
  if (!navigator.onLine) {
    event.respondWith(caches.match(event.request).then((result) => result && result));
  }
});

messaging.onBackgroundMessage((payload) => {
  const {
    notification: { title, body },
  } = payload;
  // Customize notification here
  const path = '/reminder';

  const notificationTitle = title;
  const notificationOptions = {
    body: body,
    icon: './assets/favicon-32x32.png',
    badge: './assets/favicon-16x16.png',
    data: path,
    tag: 'reminder-alert',
    vibrate: [200, 100, 200, 100, 200, 100, 200], // 짝수 인덱스는 진동 시간, 홀수 인덱스는 휴식 시간
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const movePath = self.location.origin + event.notification.data; // 알림 클릭시에 리마인더로 이동 가능

  event.waitUntil(self.clients.openWindow(movePath));
});
