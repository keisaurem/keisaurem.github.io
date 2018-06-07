self.addEventListener("fetch", (event) => {
    // ネットワークリクエストの傍受
    console.dir(event.request);
    if (event.request.url.indexOf("takashi") > -1) {
        event.respondWith(new Response("koyubi"));
    }
});
