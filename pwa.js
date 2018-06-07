if ("serviceWorker" in navigator) {
    let options = {
        scope: "./"
    };

    navigator.serviceWorker.register("./service-worker.js", options).then(() => {
        console.log("Registerd Service worker");
    });
}