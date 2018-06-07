if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/notification_demo/sw.js").then(() => {
        console.log("Registerd Service worker");
    });
}

Notification.requestPermission().then(function(permissions) {
    switch (permissions) {
        case "granted":
            // 許可された場合
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


function onClickNotification(){

    const notification = new Notification("Thanks!", {
        body: "Notification!",
        icon: "/notification_demo/assets/img/icon-192.png",
        tag: "notification"
    });

    return false;
}