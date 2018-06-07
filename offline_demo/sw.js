const STATIC_FILES = [
    "/static_datas/sample.json"
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
    event.respondWith(
        fetch(evnet.request).then((response) => {
            if (!response || response.status !== 200 || response.type !== "basic") {
                // 上手くいかなかったらキャッシュから
                caches.match(event.request, {cacheName: CACHE_NAME}, (cache) => {
                    if (cache) {
                        console.log("response from ws");
                        return cache;
                    }
                });
            }
            if (response.status === 200) {
                // 通信が成立したらそのままリターン
                let responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                console.log("response from server");
                return response;
            }
        })
    );
    
    
    // console.log(event.request.url);
    // if (event.request.url.indexOf("static_datas") > -1) {
    //     console.log("Response from cache!");
    //     let res = caches.match(event.request, {
    //         cacheName: CACHE_NAME
    //     });
    //     event.respondWith(res);
    // // }
    // event.respondWith(
    //     fetchRequest
    //     caches.match(event.request, {cacheName: CACHE_NAME}).then((cache) => {
    //         if (cache) {
    //             // キャッシュがあればreturn
    //             return cache;
    //         }
    //         let fetchRequest = evnet.request.clone();
    //         return fetch(fetchRequest).then((response) => {
    //             if (!response || response.status !== 200 || response.type !== "basic") {
    //                 // レスポンスがイカれてたならそのままreturn
    //                 return response;
    //             }
    //             let responseToCache = response.clone();
    //             caches.open(CACHE_NAME).then((cache) => {
    //                 cache.put(event.request, responseToCache);
    //             });
    //             return response;
    //         });
    //     })
    // );
});
