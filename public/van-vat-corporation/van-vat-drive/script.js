document.addEventListener('DOMContentLoaded', () => {
    refreshAvailableFiles();
    refreshAvailableSpace();
    updateInputsFromHash();
});

let backgroundFirstLoading = true;

let progressBar = document.getElementById('uploadProgressBar');


const uploadArrow = document.getElementById('uploadArrowServerIcon');

const targetFolder = document.getElementById('targetFolderInput');

let state = -1;//0 Drag 1 File 2 Folder



function refreshAvailableFiles() {
    fetch('/api/files')
        .then(response => response.json())
        .then(files => {
            const fileList = document.getElementById('allFileList');
            fileList.textContent = '';
            files.forEach(file => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `/global/${file}`;
                a.textContent = file;
                li.appendChild(a);
                li.className = "border-b py-2";
                fileList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching files:', error));
}


function refreshAvailableSpace() {
    fetch('/api/diskInfo')
        .then(response => response.json())
        .then(json => {
            const infoText = document.getElementById('diskInfoText');
            const infoBar = document.getElementById('diskInfoBar');
            const body = document.getElementById('body');

            const percentAvailable = (json.spaceLeft / json.spaceTotal) * 100;
            const percentOccupied = 100 - percentAvailable;

            infoText.innerHTML = `<b>Tổng: ${(json.spaceTotal / (1024 * 1024)).toFixed(2)} MB</b><br>Còn: ${(json.spaceLeft / (1024 * 1024)).toFixed(2)} MB<br>Khả dụng: ${percentAvailable.toFixed(2)}%`; //Khả dụng: ${ (json.availableSpace / (1024 * 1024)).toFixed(2) } GB

            infoBar.value = percentOccupied;


            const red = Math.floor(255 * (percentOccupied / 100));
            const green = Math.floor(255 * (1 - (percentOccupied / 100)));
            infoText.style.setProperty('accent-color', `rgb(${red}, ${green}, 0)`);
            infoBar.style.setProperty('accent-color', `rgb(${red}, ${green}, 0)`);
            //infoBar.style.background = `linear-gradient(to right, rgb(${red}, ${green}, 0) ${100}%, #e0e0e0 ${100}%);  border-radius: 15px;`;

            //body.style.background = `linear-gradient(to right, rgb(${128 + red / 2}, ${128 + green / 2}, 128) ${100}%, #e0e0e0 ${100}%)`;

            //setTimeout(() => {
            //    body.style.backgroundColor = `rgb(${128 + red / 2}, ${128 + green / 2}, 128)`;
            //}, 2000); // Waits for 2000 milliseconds (2 seconds)
            //if (backgroundFirstLoading)
            //    body.style.backgroundColor = `rgb(${128 + red / 2}, ${128 + green / 2}, 128)`;
            //backgroundFirstLoading = false;

        })
        .catch(error => console.error('Error fetching files:', error));
}















function listFiles(files, fileList) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.kind === 'directory') {
            listFiles(file.getFiles(), fileList)
        } else {
            fileList.push(file);
        }
    }
}


function listAllFiles(files) {
    const fileList = [];

    listFiles(files, fileList);

    return fileList;
}






async function readDeepDirectory(directoryEntry, fileList) {
    const reader = directoryEntry.createReader();
    let entries = [];
    let readEntriesBatch;

    do {
        readEntriesBatch = await readEntries(reader);
        entries = entries.concat(readEntriesBatch);
    } while (readEntriesBatch.length > 0);

    for (const entry of entries) {
        if (entry.isDirectory) {
            await readDeepDirectory(entry, fileList); // Recursively read subdirectories
        } else if (entry.isFile) {
            const file = await getFile(entry);
            fileList.push(file);
        }
    }
}
function readEntries(reader) {
    return new Promise((resolve, reject) => {
        reader.readEntries((entries) => {
            resolve(entries);
        }, reject);
    });
}

function getFile(fileEntry) {
    return new Promise((resolve, reject) => {
        fileEntry.file(resolve, reject);
    });
}



async function readDirectory(directoryEntry) {
    const fileList = [];
    await readDeepDirectory(directoryEntry, fileList);
    return fileList;
}











function selectFile(e) {
    storedFiles.length = 0;
    var theFiles = e.target.files;

    for (var i = 0; i < theFiles.length; i++) {
        if (theFiles[i]) {
            storedFiles.push(theFiles[i]);
        }
    }
    document.getElementById('uploadText').textContent = `Tải lên ${storedFiles.length} mục`;
    document.getElementById('uploadButton').disabled = storedFiles.length === 0;
    uploadArrow.style.opacity = 1;
    uploadArrow.style.transform = 'translateY(-50px)';
    const failedImg = document.getElementById('uploadErrorServerIcon');
    failedImg.style.opacity = 0;
}
function selectFolder(e) {
    storedFiles.length = 0;
    var theFiles = e.target.files;
    var relativePath = theFiles[0].webkitRelativePath;
    var folder = relativePath.split("/");
    document.getElementById('folderNameUpload').value = `${folder[0]}`;


    storedFiles.push(...listAllFiles(theFiles));
    //for (var i = 0; i < theFiles.length; i++) {
    //    storedFiles.push(listAllFiles(theFiles[i]));
    //}
    document.getElementById('uploadText').textContent = `Tải lên ${storedFiles.length} mục`;
    document.getElementById('uploadButton').disabled = storedFiles.length === 0;
    uploadArrow.style.opacity = 1;
    uploadArrow.style.transform = 'translateY(-50px)';
    const failedImg = document.getElementById('uploadErrorServerIcon');
    failedImg.style.opacity = 0;
}


function dragOverHandler(event) {
    event.preventDefault();
    document.getElementById('uploadText').textContent = "Thả để tải lên";
    uploadArrow.style.opacity = 1;
    uploadArrow.style.transform = 'translateY(-50px)';
    const failedImg = document.getElementById('uploadErrorServerIcon');
    failedImg.style.opacity = 0;
}
function dragLeaveHandler(event) {
    event.preventDefault();
    document.getElementById('uploadText').textContent = "Ấn, hoặc kéo vào đây để tải lên";
    uploadArrow.style.opacity = 0;
    uploadArrow.style.transform = 'translateY(0px)';
    document.getElementById('uploadButton').disabled = true;
}
let storedFiles = [];
async function dropHandler(event) {
    event.preventDefault();
    storedFiles.length = 0;
    state = 0;
    var items = event.dataTransfer.items;

    var folderName = items[0].webkitGetAsEntry().name;
    document.getElementById('folderNameUpload').value = folderName;



    for await (const item of items) {
        const entry = item.webkitGetAsEntry();
        console.log(items.length);
        if (entry.isDirectory) {
            storedFiles.push(...await readDirectory(entry));
            //await readDeepDirectory(entry, storedFiles);
        } else if (entry.isFile) {
            const file = item.getAsFile();
            storedFiles.push(file);
        }
    }


    document.getElementById('uploadText').textContent = `Tải lên ${storedFiles.length} mục`;
    document.getElementById('uploadButton').disabled = storedFiles.length === 0;
}
function clickHandler(event) {
    event.preventDefault();
    var isFolder = document.getElementById('isFolderUpload');
    document.getElementById(isFolder.checked ? 'folderPicker' : 'filePicker').click();
    state = isFolder.checked ? 2 : 1;
}


function uploadButton(event) {
    event.preventDefault();
    var formData = new FormData();
    switch (state) {
        case 0:
            upload(event, formData);
            break;
        case 1:
            uploadFile(event, formData);
            break;
        case 2:
            uploadFolder(event, formData);
            break;
        // additional cases
        default:
            console.log("Shit");
    }
    uploadButtonAnimation(event);
}
function uploadButtonAnimation(event) {
    const uploadProgressContainer = document.getElementById('uploadProgressContainer');
    uploadProgressContainer.classList.remove('hidden', 'slide-up');
    uploadProgressContainer.classList.add('slide-down');
}



function uploadToServer(formData, uploadType, isDragUpload, isUsingMulter) {

    //Todo: isUsingMulter is always true. Temporary fix as the busboy didnt work!
    isUsingMulter = true;

    if (window.location.hash.substring(1) === '') if (!confirm("Có vẻ như tên thư mục bạn đã để trống... Bạn có thực sự muốn tải lên thư mục chính không? (Không khuyến khích)")) {
        return
    }

    if (!isDragUpload) {
        uploadArrow.style.opacity = 1;
        uploadArrow.style.transform = 'translateY(-50px)';
    }

    formData.append('targetFolder', targetFolder.value);
    formData.append('folderName', document.getElementById('folderNameUpload').value);
    storedFiles.forEach(file => {
        formData.append('files[]', file);
        console.log(file.name);
    });

    const xhr = new XMLHttpRequest();
    xhr.open('POST', uploadType + (isUsingMulter ? "-old" : ""), true);
    function failedUpload(errorCode) {

        document.getElementById('uploadText').textContent = "Tải lên thất bại!";
        const failedImg = document.getElementById('uploadErrorServerIcon');
        failedImg.style.opacity = 1;
        const arrow = document.getElementById('uploadArrowServerIcon');
        arrow.style.opacity = 0;
        arrow.style.transform = 'translateY(599px)';
        setTimeout(() => {
            arrow.style.transform = 'translateY(0px)';
        }, 1000); // Waits for 2000 milliseconds (2 seconds)

        document.getElementById('filePicker').value = null;
        document.getElementById('folderPicker').value = null;


        refreshAvailableFiles();
        refreshAvailableSpace();

        alert(errorCode ? `Tải lên thất bại!\nNguyên nhân: ${errorCode}` : 'Tải lên thất bại!');
    }






    xhr.onerror = function () {
        failedUpload("Kết nối đặt lại. Có thể do đầy bộ nhớ?");
    };
    xhr.ontimeout = function () {
        failedUpload("Hết thời gian.");
    };


    xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            modifyUploadInfo(event.loaded, event.total, percentComplete);
            progressBar.value = percentComplete;


            const red = Math.floor(255 * (1 - (percentComplete / 100)));
            const green = Math.floor(255 * (percentComplete / 100));
            progressBar.style.setProperty('accent-color', `rgb(${red}, ${green}, 0)`);
            //body.style.backgroundColor = `rgb(${128 + red / 2}, ${128 + green / 2}, 128)`;
        }

        if (xhr.status === 413) {
            failedUpload("Kết nối đặt lại do bộ nhớ đầy.");
        }
    };

    xhr.onload = () => {
        if (xhr.status === 200) {


            storedFiles.length = 0;


            document.getElementById('uploadText').textContent = "Tải lên thành công!";
            const arrow = document.getElementById('uploadArrowServerIcon');
            arrow.style.opacity = 0;
            arrow.style.transform = 'translateY(-599px)';
            setTimeout(() => {
                arrow.style.transform = 'translateY(0px)';
                setTimeout(() => {
                    uploadProgressContainer.classList.remove('slide-down');
                    uploadProgressContainer.classList.add('slide-up');
                    setTimeout(() => {
                        uploadProgressContainer.classList.add('hidden');
                    }, 500);
                }, 1000);
            }, 1000); // Waits for 2000 milliseconds (2 seconds)


            document.getElementById('filePicker').value = null;
            document.getElementById('folderPicker').value = null;


            refreshAvailableFiles();
            refreshAvailableSpace();

        } else {
            failedUpload();
        }
    };

    xhr.send(formData);

    if (isDragUpload)
        document.getElementById('uploadButton').disabled = true;
}
function upload(event, formData) {
    event.preventDefault();

    var isUsingMulter = document.getElementById('old_upload');
    uploadToServer(formData, '/upload-drag', true, isUsingMulter.checked);
}
function uploadFile(event, formData) {
    event.preventDefault();

    var isUsingMulter = document.getElementById('old_upload');
    uploadToServer(formData, '/upload', false, isUsingMulter.checked);
}
function uploadFolder(event, formData) {
    event.preventDefault();

    var isUsingMulter = document.getElementById('old_upload');
    uploadToServer(formData, '/upload-folder', false, isUsingMulter.checked);
}



function modifyUploadInfo(current, max, ratio) {
    document.getElementById("uploadProgressInfo").textContent = `${(current / 1048576).toFixed(2)}MB/${(max / 1048576).toFixed(2)}MB (${ratio.toFixed(1)}%)`
}


function onTargetFolderChange() {
    window.location.hash = targetFolder.value;
}

function updateInputsFromHash() {
    var hash = window.location.hash.substring(1); // Get the hash value without the #
    targetFolder.value = hash;
    onTargetFolderChange();
}





//async function getDirectoryHandle() {
//    const directoryHandle = await window.showDirectoryPicker();
//    return directoryHandle;
//}