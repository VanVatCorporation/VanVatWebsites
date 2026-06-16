

document.addEventListener('DOMContentLoaded', () => {
    editDirectoryPath();
});

function editDirectoryPath() {
    const h1Header = document.querySelector('.directory-header');
    const titleHead = document.querySelector('.head-title');
    const directoryHiddenText = document.querySelector('.directory-hidden-html');

    const str = directoryHiddenText.textContent.split("/");
    var str1 = "/"
    var lastDirectory = "";
    for (const a of str) {
        if (a === "")
            continue;

        str1 += a + "/";
        lastDirectory = a;

        const a1 = document.createElement("i");
        const a2 = document.createElement("a");
        const a21 = document.createElement("span");
        const a211 = document.createElement("span");
        const a2111 = document.createElement("b");
        const a2112 = document.createElement("span");
        const a22 = document.createElement("span");

        a1.className = "fas fa-chevron-right text-blue-500 z-20";
        a2.className = "group relative inline-block px-3 py-1 rounded-md cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-blue-700";
        a2.href = str1;
        a21.className = "relative z-10";
        a211.className = "";//"particle-container";
        a2111.innerHTML = a;
        a2112.className = "particles";
        a2112.ariaHidden = true;
        a22.className = "absolute inset-0 bg-transparent group-hover:bg-gray-300 group-active:bg-gray-600 rounded-md transition-colors";



        h1Header.appendChild(a1);
        h1Header.appendChild(a2);
        a2.appendChild(a21);
        a21.appendChild(a211);
        a211.appendChild(a2111);
        a211.appendChild(a2112);
        a2.appendChild(a22);
    }

    titleHead.textContent = titleHead.textContent.replace(/\{directory-last\}/g, lastDirectory);
    const directoryClassesElement = document.querySelectorAll(".icon-directory");
    const fileClassesElement = document.querySelectorAll(".icon");

    const file_listing_text = document.querySelector(".txt-file-listing");
    file_listing_text.textContent = file_listing_text.textContent
        .replace(/\{file_num\}/g, fileClassesElement.length - directoryClassesElement.length)
        .replace(/\{folder_num\}/g, directoryClassesElement.length);


    directoryHiddenText.remove();
}
