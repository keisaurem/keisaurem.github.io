self.addEventListener("fetch", (event) => {
    // ネットワークリクエストの傍受
    console.dir(event.request);
    if (evvent.request.url.indexOf("takashi") > -1) {
        event.respondWith(new Response("koyubi"));
    }
});
