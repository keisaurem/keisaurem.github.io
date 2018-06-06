if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js").then(function() {
        console.log("Registerd Service worker");
    });
}

Notification.requestPermission().then(function(permissions) {
    switch (permissions) {
        case "granted":
            // 許可された場合

            const notification = new Notification("title", {
                body: "body",
                icon: "./icon-192.png",
                data: {
                    hoge: "hoge"
                }
            });
            
            break;
        case "denied":
            // ブロックされた場合
            break;
        case "default":
            // 無視された場合
            break;
        default:
            break;
    }
});
