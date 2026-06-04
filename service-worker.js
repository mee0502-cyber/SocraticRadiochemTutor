const CACHE_NAME = 'socratic-chem-v2';
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
    })
  );
});

// フェッチ時にキャッシュから応答（無ければネットワーク）
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
