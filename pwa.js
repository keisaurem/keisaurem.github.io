if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js").then(function() {
        console.log("Registerd Service worker");
    });
}

Notification.requestPermission().then(function(permissions) {
    if (permissions === "granted") {
        show_sample_notification();
    }
    // switch (permissions) {
    //     case "granted":
    //         // 許可された場合
    //         show_sample_notification();
    //         break;
    //     case "denied":
    //         // ブロックされた場合
    //         break;
    //     case "default":
    //         // 無視された場合
    //         break;
    //     default:
    //         break;
    // }
});

// navigator.serviceWorker.ready.then(function(registration) {
//     return registration.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: serverPublicKey
//     }).then(function (subscription) {
//         const endpoint = subscription.endpoint;
//         const publickey = encodeBase64URL(subscription.getKey("p256dh"));
//         const authSecret = encodeBase64URL(subscription.getKey("auth"));
//         let contentEncoding;
//         if ("supportedContentEncodings" in pushManager) {
//             contentEncoding = pushManager.supportedContentEncodings.includes("ase128gcm") ? "aes128gcm" : "aesgcm";
//         } else {
//             contentEncoding = "aesgcm";
//         }
//     });
// });

function show_sapmle_notification() {
    const notification = new Notification("Thanks!", {
        body: "Thenk you for application of notification!",
        icon: "./icon-192.png",
        data: {
            hoge: "hoge"
        }
    });
}

function encodeBase64URL(buffer) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}
