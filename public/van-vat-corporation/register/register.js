const form = document.getElementById('registerForm');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', (e) => {

    e.preventDefault();
    if (e.target.checkValidity()) {
        errorMessage.classList.add('hidden');
        errorMessage.textContent = '';

        checkForNationalId();
    } else {
        e.target.reportValidity(); // This triggers default validation messages
    }

});

function postToServer() {

    (async () => {
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Simple password confirmation check
        if (data.password !== data.confirmPassword) {
            errorMessage.textContent = 'Mật khẩu và nhập lại mật khẩu không khớp.';
            errorMessage.classList.remove('hidden');
            return;
        }
        // Convert birthdate to timestamp (milliseconds since epoch)
        if (data.birthdate) {
            const date = new Date(data.birthdate);
            data.birthdate = date.getTime();
        }

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include' // Important for cookies
            });

            if (!response.ok) {
                // Try to parse JSON error response
                let errorData;
                try {
                    errorData = await response.json();
                } catch {
                    errorData = { error: 'Đăng ký thất bại. Vui lòng thử lại.' };
                }
                errorMessage.textContent = errorData.error || 'Đăng ký thất bại. Vui lòng thử lại.';
                errorMessage.classList.remove('hidden');
            } else {
                // Success: JWT cookie was set automatically, redirect to account center
                const result = await response.json();
                console.log('Registration successful:', result);
                window.location.href = 'https://account.vanvatcorp.com/account-center/';
            }
        } catch (error) {
            errorMessage.textContent = 'Lỗi kết nối. Vui lòng thử lại.';
            errorMessage.classList.remove('hidden');
        }
    })();
}


// Toggle password visibility for password field
const togglePasswordBtn = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
togglePasswordBtn.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePasswordBtn.querySelector('i').classList.toggle('fa-eye');
    togglePasswordBtn.querySelector('i').classList.toggle('fa-eye-slash');
});

// Toggle password visibility for confirm password field
const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
toggleConfirmPasswordBtn.addEventListener('click', () => {
    const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
    toggleConfirmPasswordBtn.querySelector('i').classList.toggle('fa-eye');
    toggleConfirmPasswordBtn.querySelector('i').classList.toggle('fa-eye-slash');
});

// Toggle password visibility for nationalID field
const toggleNationalIDBtn = document.getElementById('toggleNationalID');
const nationalIDInput = document.getElementById('nationalID');
toggleNationalIDBtn.addEventListener('click', () => {
    const type = nationalIDInput.getAttribute('type') === 'password' ? 'text' : 'password';
    nationalIDInput.setAttribute('type', type);
    toggleNationalIDBtn.querySelector('i').classList.toggle('fa-eye');
    toggleNationalIDBtn.querySelector('i').classList.toggle('fa-eye-slash');
});



// Modal elements
const modalOverlay = document.getElementById('modalOverlay');
const modalCancel = document.getElementById('modalCancel');
const modalConfirm = document.getElementById('modalConfirm');

modalCancel.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
});

function checkForNationalId() {
    // If nationalID is empty, show modal and prevent form submission
    if (nationalIDInput.value.trim() === '') {
        modalOverlay.classList.remove('hidden');
    }
    else
        postToServer();
}

modalConfirm.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
    postToServer();
});