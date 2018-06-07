self.addEventListener("fetch", function(event) {
    // ネットワークリクエストの傍受
    console.dir(event.request);
});
