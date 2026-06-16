document.addEventListener('DOMContentLoaded', () => {
    refreshAvailableFiles();
});

var photo = [];
var photoLoaded = 0;
var photoLoadPerTime = 50;

function refreshAvailableFiles() {
    var hash = window.location.hash.substring(1);
    fetch('https://archive.vanvatcorp.com/time-capsule/photos/' + hash)
        .then(response => response.json())
        .then(files => {
            files.forEach(file => {
                photo.push({
                    imgUrl: `https://drive.vanvatcorp.com/read-only/${hash}/${file}`,
                    name: file
                });
            });



        })
        .catch(error => console.error('Error fetching files:', error));
}

const loadMoreButton = document.getElementById("load-more-btn");
const loadMoreInput = document.getElementById("load-more-txt");
const loadAmountInput = document.getElementById("load-amount-txt");
const container = document.getElementById("image-container");

loadMoreInput.onchange = () => {
    photoLoaded = Number.parseInt(loadMoreInput.value);
}
loadAmountInput.value = 50;
loadAmountInput.onchange = () => {
    photoLoadPerTime = Number.parseInt(loadAmountInput.value);
}

loadMoreButton.onclick = () => {

    if (photoLoaded + photoLoadPerTime < photo.length) {
        for (let i = photoLoaded; i < photoLoaded + photoLoadPerTime; i++) {
            addSingleImage(photo[i].imgUrl, photo[i].name);
        }
        photoLoaded += photoLoadPerTime;
    }
    else {
        for (let i = photoLoaded; i < photo.length; i++) {
            addSingleImage(photo[i].imgUrl, photo[i].name);
            photoLoaded = i;
        }
    }
    loadMoreInput.value = photoLoaded;
}
function addSingleImage(imageURL, name) {
    const art = document.createElement("article");
    const div1 = document.createElement("div");
    const a = document.createElement("a");
    const img1 = document.createElement("img");
    const div2 = document.createElement("div");

    art.className = "relative rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex-grow";
    art.style = "flex-basis: calc(25% - 1rem); min-width: 220px; max-width: 400px";


    img1.className = "w-full h-full object-cover";
    img1.src = imageURL;
    img1.loading = "lazy"
    a.href = imageURL;

    div2.className = "absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-sm font-semibold px-3 py-2 truncate";
    div2.textContent = name;


    const width = img1.naturalWidth;
    const height = img1.naturalHeight;
    const ratio = (width / height).toFixed(2); // Rounded to 2 decimal places

    //aspect-[4/3]
    div1.className = `w-full`;

    container.appendChild(art);

    art.appendChild(div1);
    art.appendChild(div2);

    a.appendChild(img1);
    div1.appendChild(a);

}