const CACHE_NAME = 'socratic-chem-v14';
const ASSETS = [
  'index.html',
  'style.css',
  'app.js',
  'mobile.html',
  'mobile.css',
  'mobile.js',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

// インストール時にファイルをキャッシュ
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // 新しいService Workerを強制的に即時アクティブ化
});

// アクティベート時に古いキャッシュをクリーンアップ
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      return self.clients.claim(); // アクティブ化後、即座にページを制御下に置く
    })
  );
});

// フェッチ時にネットワーク優先（オフライン時はキャッシュ）
self.addEventListener('fetch', (e) => {
  // APIリクエスト等はキャッシュしない
  if (e.request.url.includes('googleapis.com')) {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then((response) => {
        // 正常なレスポンスがあればキャッシュに保存して返す
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // ネットワークエラー（オフライン）時はキャッシュから取得
        return caches.match(e.request);
      })
  );
});
