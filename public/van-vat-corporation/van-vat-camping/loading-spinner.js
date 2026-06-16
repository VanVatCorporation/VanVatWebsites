const loadingSpinner = document.getElementById("loading-spinner");
const spinner = document.getElementById("spinner");
const loadingSpinnerDisplayText = document.getElementById(
    "loading-spinner-text-display"
);
const loadingSpinnerReplacementText = document.getElementById(
    "loading-spinner-text-replacement"
);

const successTick = document.getElementById('success-tick');
const failTick = document.getElementById('failure-x');
const detailsBox = document.getElementById('extra-details-popup');
const detailsText = document.getElementById('details-content');
const closeDetailsPopup = document.getElementById('close-details-popup');




closeDetailsPopup.addEventListener('click', () => {
    hideAllModals();

    resetStates();
});



function resetStates() {
    showSpinner();

    hideSuccessTickAnimation();
    hideFailTickAnimation();
}






function replaceText(textContent) {
    loadingSpinnerReplacementText.textContent = textContent;
    loadingSpinnerDisplayText.classList.add("fade-scale-out");

    setTimeout(() => {
        loadingSpinnerReplacementText.classList.add("fade-scale-in");
        loadingSpinnerReplacementText.classList.remove("hidden");
        loadingSpinnerDisplayText.classList.add("hidden");

        setTimeout(() => {
            loadingSpinnerReplacementText.classList.add("hidden");
            loadingSpinnerDisplayText.classList.remove("hidden");
            loadingSpinnerDisplayText.classList.remove("fade-scale-out");
            loadingSpinnerReplacementText.classList.remove("fade-scale-in");
            loadingSpinnerDisplayText.textContent = textContent;
        }, 200);
    }, 200);
}

function replaceTextImmediately(textContent) {
    loadingSpinnerDisplayText.textContent = textContent;
}
function replaceDetailsTextImmediately(textContent) {
    detailsText.textContent = textContent;
}

function hideSpinner() {
    spinner.classList.add('hidden');
}
function showSpinner() {
    spinner.classList.remove('hidden');
}

function hideSuccessTickAnimation() {
    successTick.classList.remove("fade-scale-in-keep");
    successTick.classList.add('hidden');
}
function showSuccessTickAnimation() {
    successTick.classList.remove("hidden");
    successTick.classList.add("fade-scale-in-keep");
}

function hideFailTickAnimation() {
    failTick.classList.remove("fade-scale-in-keep");
    failTick.classList.add('hidden');
}
function showFailTickAnimation() {
    failTick.classList.remove("hidden");
    failTick.classList.add("fade-scale-in-keep");
}

function hideDetailsBoxAnimation() {
    detailsBox.classList.remove("fade-scale-in-keep");
    detailsBox.classList.add('hidden');
}
function showDetailsBoxAnimation() {
    detailsBox.classList.remove("hidden");
    detailsBox.classList.add("fade-scale-in-keep");
}