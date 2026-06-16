
//const loadPdfBtn = document.getElementById('load-pdf');
const pdfUrlInput = document.getElementById('pdf-url');
const iframe = document.querySelector('.pdf-container iframe');

document.addEventListener('DOMContentLoaded', () => {
    updateInputsFromHash();
});

function updateInputsFromHash() {
    var hash = window.location.hash.substring(1); // Get the hash value without the #
    //pdfUrlInput.value = hash;
    onTargetFolderChange();
    loadPdf();
}

function onTargetFolderChange() {
    //window.location.hash = pdfUrlInput.value;
}

//loadPdfBtn.addEventListener('click', () => {
//    loadPdf();
//});

function loadPdf() {
    const url = "";//pdfUrlInput.value.trim();
    if (url) {
        // Basic validation for PDF URL
        if (url.toLowerCase().endsWith('.pdf')) {
            iframe.src = url;
        } else {
            //alert('Please enter a valid PDF URL ending with .pdf');
        }
    } else {
        // alert('Please enter a PDF URL');
    }
}

// Add click handlers for the directory links
document.querySelector('a[href="#vanvat-project"]').addEventListener('click', (e) => {
    e.preventDefault();
    const projectPdfUrl = "https://placehold.co/600x800/png?text=Van+Vat+Project+Overview+PDF";
    //pdfUrlInput.value = projectPdfUrl;
    onTargetFolderChange();
    loadPdf();
});