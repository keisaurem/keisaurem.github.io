if ("serviceWorker" in navigator) {
    let options = {
        scope: "./"
    };

    navigator.serviceWorker.register("./service-worker.js", options).then(() => {
        console.log("Registerd Service worker");
    });
}

function onClickRequest () {
    request("takashi.json", {data: "data"}, 
        (data) => {
            console.dir(data);
        },
        (xhr) => {
            console.dir(xhr);
        });
}

function request (url, data, success, error) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                success(xhr.responseText);
                return;
            }
            error(xhr);
        }
    }
    xhr.open("GET", url, true);
    xhr.send(data);
}