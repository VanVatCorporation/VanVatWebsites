document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/Global/OnlineText/RetrieveText')
    .then(response => response.json())
    .then(files => {
        document.getElementById("onlineText").value = files.text;
    })
});

function readText() {
    const text = document.getElementById("directoryText").value;
    if (text === "") return;
    var data = { directory: text };


    fetch('/api/Global/OnlineText/ReadText', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(files => {
            if (files.returnCode == 400) alert("Thay đổi thất bại!");
            if (files.returnCode == 200)
                location.reload();
        })
}
function uploadText() {
    var data = { text: document.getElementById("onlineText").value };


    fetch('/api/Global/OnlineText/SubmitText', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(files => {
            if (files.returnCode == 400) alert("Thay đổi thất bại!");
            //if (files.returnCode == 200)
        })
}

function uploadAndSaveText() {
    const direct = document.getElementById("directoryText").value;
    if (direct === "") return;
    var data = {
        text: document.getElementById("onlineText").value,
        directory: direct
    };


    fetch('/api/Global/OnlineText/SaveText', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(files => {
            if (files.returnCode == 400) alert("Lưu thất bại!");
            //if (files.returnCode == 200)
        })
}