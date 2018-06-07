const STATIC_FILES = [
    // "/static_datas/sample.json"
];
const CACHE_NAME = "sample";

self.addEventListener("install", (event) => {
    event.waitUntil(
        // キャッシュを開く
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.all(STATIC_FILES.map((url) => {
                // urlにfetchする
                return fetch(new Request(url)).then((response) => {
                    if (response.ok) {
                        // レスポンスが正しい＝生きているならば、キャッシュ追加
                        return cache.put(response.url, response);
                    }
                    return Promise.reject(response.url + " " + response.status);
                });
            }));
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            let promises = [];
            keys.forEach((cacheName) => {
                if (cacheName != CACHE_NAME) {
                    // 古いキャッシュの削除
                    promises.push(caches.delete(cacheName));
                }
            });
            return Promise.all(promises);
        })
    );
});

self.addEventListener("fetch", (event) => {
    // ネットワークリクエストの傍受
    console.dir(event.request);
    // if (event.request.url.indexOf("takashi") > -1) {
    //     event.respondWith(new Response("koyubi"));
    // }
});
