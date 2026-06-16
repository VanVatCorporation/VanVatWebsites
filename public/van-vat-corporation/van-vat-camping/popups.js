
const modalOverlay = document.getElementById('modal-overlay');
const termsModal = document.getElementById('terms-modal');
const paymentModal = document.getElementById('payment-modal');

const termsCheckbox = document.getElementById('terms-agree-checkbox');
const termsConfirmBtn = document.getElementById('terms-confirm-btn');

const paymentCancelBtn = document.getElementById('payment-cancel-btn');
const paymentConfirmBtn = document.getElementById('payment-confirm-btn');
const paymentFormSection = document.getElementById('payment-form-section');
const paymentQrSection = document.getElementById('payment-qr-section');
const paymentQrSpinner = document.getElementById("payment-qr-spinner");

// Your existing booking button
const bookNowBtn = document.getElementById('book-now');

// Show terms modal and overlay
function showTermsModal() {
    modalOverlay.classList.remove('hidden');
    termsModal.classList.remove('hidden');
}


// Hide all modals and overlay
function hideAllModals() {

    // Reset modal to initial state
    paymentFormSection.style.display = '';
    paymentQrSection.style.display = '';


    modalOverlay.classList.add('hidden');
    termsModal.classList.add('hidden');
    termsModalCard.classList.add('hidden');
    loadingSpinner.classList.add('hidden');
    paymentModal.classList.add('hidden');
    detailsBox.classList.add('hidden');
    // Reset checkbox and button
    termsCheckbox.checked = false;
    termsConfirmBtn.disabled = true;
}

// Show loading spinner for 1 second then show payment modal
function showLoadingThenPayment() {
    loadingSpinner.classList.remove('hidden');
    replaceTextImmediately("Vui lòng đợi...");


    setTimeout(() => {
        if (window.updateVietQR) window.updateVietQR();

        loadingSpinner.classList.add("hidden");
        paymentModal.classList.remove("hidden");


        paymentQrSpinner.classList.remove('hidden');

        // Refresh QR code
        setTimeout(() => {
            paymentQrSpinner.classList.add('hidden');
        }, 3000);

    }, 1000);
}

// Show loading spinner for 1 second then show payment modal
function showLoadingAfterSubmitPayment() {
    // loadingSpinner.classList.remove('hidden');
    // loadingText.textContent = "Đang hoàn tất thanh toán...";

    // setTimeout(() => {
    //     loadingSpinner.classList.add('hidden');
    //     paymentModal.classList.add('hidden');
    //     loadingText.textContent = "-";
    //     approvedPayment();
    // }, 3000);


    // Hide form and QR sections
    paymentFormSection.style.display = 'none';
    paymentQrSection.style.display = 'none';

    loadingSpinner.classList.remove('hidden');

    replaceTextImmediately("Đang xử lý giao dịch...");

    // Simulate success (50%) or failure (50%)
    var isSuccess = Math.random() > 0.5; // Adjust probability as needed

    if (!isSuccess) {
        const randomReason = failureReasons[Math.floor(Math.random() * failureReasons.length)];
        //detailsText.innerHTML = `<p>${randomReason}</p>`;
        paymentFail(randomReason);
    }
    else {
        // After 3 seconds, animate transition
        setTimeout(() => {
            replaceText("Đang liên lạc với phía trung gian...");

            // Simulate success (50%) or failure (50%)
            isSuccess = Math.random() > 0.5; // Adjust probability as needed

            if (!isSuccess) {
                const randomReason = failureReasons[Math.floor(Math.random() * failureReasons.length)];
                //detailsText.innerHTML = `<p>${randomReason}</p>`;
                paymentFail(randomReason);
            }
            else {
                setTimeout(() => {
                    replaceText("Đang hoàn tất những bước cuối cùng...");

                    setTimeout(() => {

                        // Simulate success (50%) or failure (50%)
                        isSuccess = Math.random() > 0.5; // Adjust probability as needed

                        if (isSuccess) {
                            paymentSuccess();
                        } else {
                            const randomReason = failureReasons[Math.floor(Math.random() * failureReasons.length)];
                            //detailsText.innerHTML = `<p>${randomReason}</p>`;
                            paymentFail(randomReason);
                        }

                    }, 2000);

                }, 3000);
            }

        }, 2000);
    }










}


function paymentSuccess() {
    replaceText("Giao dịch thành công!");

    hideSpinner();
    showSuccessTickAnimation();

    setTimeout(() => {
        showDetailsBoxAnimation();
        replaceDetailsTextImmediately("Thanh toán thành công! Cảm ơn bạn đã đặt chỗ.")

        setTimeout(() => {
            approvedPayment();
            resetStates();
        }, 1500);

    }, 1000);
}
function paymentFail(reason) {
    replaceText("Giao dịch thất bại!");

    hideSpinner();
    showFailTickAnimation();

    setTimeout(() => {
        showDetailsBoxAnimation();
        replaceDetailsTextImmediately(`Thanh toán không thành công! 
        Lý do: ${reason}`)
    }, 1600);
}



function approvedPayment() {

    alert('Thanh toán thành công! Cảm ơn bạn đã đặt chỗ.');
    hideAllModals();
    // Optionally reset your booking form here

    completedBooking();
}





// Enable confirm button only if checkbox checked
termsCheckbox.addEventListener('change', () => {
    termsConfirmBtn.disabled = !termsCheckbox.checked;
});

// When user clicks booking button, show terms modal instead of direct booking
// --- Attention: Booking.js already handle the code
//bookNowBtn.addEventListener('click', (e) => {
//    e.preventDefault();
//    showTermsModal();
//});

// When user confirms terms
termsConfirmBtn.addEventListener('click', () => {
    showTermsCardModal();
});

// Cancel payment modal
paymentCancelBtn.addEventListener('click', () => {
    hideAllModals();
});

// Confirm payment (you can add real payment logic here)
paymentConfirmBtn.addEventListener('click', () => {

    // Basic form validation (example: check if card number is empty)
    const cardNumber = document.getElementById('card-number').value.trim();
    if (!cardNumber) {
        alert('Vui lòng nhập số thẻ tín dụng.');
        return;
    }

    showLoadingAfterSubmitPayment();
});






// Optional: close modals if user clicks outside modal content
modalOverlay.addEventListener('click', () => {
    hideAllModals();
});