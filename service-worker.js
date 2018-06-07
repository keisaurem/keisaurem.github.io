self.addEventListener("fetch", (event) => {
    // ネットワークリクエストの傍受
    console.dir(event.request);
    console.dir(event.request.url);
    event.respondWith(new Response("hogehoge"));
});
