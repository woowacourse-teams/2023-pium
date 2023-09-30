const version = 1;
const assetCacheName = `assets-${version}`;

/**
 * cache 설정
 * TODO: 처음 파일들을 캐싱하는 것인데 파일 명이 달라져서 매번 갈아끼워 줘야 하는 문제가 있는것 같습니다.
 * 근데, 버저닝 생각하면 괜찮을지도?
 * https://web.dev/service-worker-mindset/ 참조
 * https://web.dev/learn/pwa/caching/
 */

this.addEventListener('install', (event) => {
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
});

// 기존에 있던 cache 삭제
this.addEventListener('activate', (event) => {
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
});

// 오프라인 상태라면, 캐시에 저장되어 있는 파일들 fetch로 받아옴
this.addEventListener('fetch', (event) => {
  if (!navigator.onLine) {
    event.respondWith(caches.match(event.request).then((result) => result && result));
  }
});
