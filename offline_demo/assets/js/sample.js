if ("serviceWorker" in navigator) {
    let options = {
        scope: "./"
    };

    navigator.serviceWorker.register("/offline_demo/sw.js", options).then(() => {
        console.log("Registerd Service worker");
    });
}

function onClickRequest () {
    request("/static_datas/sample.json", {data: "data"}, 
        (data) => {
            console.dir(data);
            let elm = document.createElement("li");
            elm.innerHTML = data.title;
            document.getElementById("messagelist").appendChild(elm);
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