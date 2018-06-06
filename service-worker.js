// service-worker.js
self.addEventListener("install", function(e) {
    console.log("[ServiceWorker] Install");
    // e.waitUntil(
    //     caches.open("airhorner").then((cache) => {
    //         return cache.addAll([
    //             "/",
    //             "/index.html",
    //             "/index.html?utm_source=homescreen",
    //             "/?utm_source=homescreen",
    //             "/icon-192.png",
    //             "/icon-256.png",
    //             "/pwa.js"
    //         ]);
    //     })
    // );
});

self.addEventListener("activate", function(e) {
    console.log("[ServiceWorker] Activate");
});

// push受信
// self.addEventListener("push", function(e) {
//     let data = e.data.json();
//     return e.waitUntil(
//         self.registration.showNotification (
//             data.title,
//             {
//                 icon: "./icon-192.png",
//                 body: data.body,
//                 tag: data.tag
//             }
//         )
//     );
// });

// 現状では、この処理を書かないとService Workerが有効と判定されないようです
self.addEventListener("fetch", function(event) {});
