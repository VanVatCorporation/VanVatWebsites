/**
 * Complete Profile JavaScript Handler
 * For social login users who need to complete their profile
 * 
 * - Checks profile status on load
 * - Pre-fills data from OAuth provider
 * - Submits to /api/auth/complete-profile
 */

document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('completeProfileForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.getElementById('submitBtn');
    const birthdateContainer = document.getElementById('birthdateContainer');
    const birthdateInput = document.getElementById('birthdate');
    const birthdateRequired = document.getElementById('birthdateRequired');

    // Check profile status and pre-fill data
    try {
        const response = await fetch('https://account.vanvatcorp.com/api/auth/profile-status', {
            credentials: 'include'
        });

        if (!response.ok) {
            // Not authenticated or error - redirect to login
            window.location.href = '/login';
            return;
        }

        const data = await response.json();

        if (data.profileComplete) {
            // Profile already complete - redirect to account center
            window.location.href = '/account-center';
            return;
        }

        // Pre-fill form fields
        if (data.prefill) {
            if (data.prefill.firstName) {
                document.getElementById('firstName').value = data.prefill.firstName;
            }
            if (data.prefill.lastName) {
                document.getElementById('lastName').value = data.prefill.lastName;
            }
            if (data.prefill.birthdate) {
                // Format date for input (YYYY-MM-DD)
                const date = new Date(data.prefill.birthdate);
                const yyyy = date.getFullYear();
                const mm = String(date.getMonth() + 1).padStart(2, '0');
                const dd = String(date.getDate()).padStart(2, '0');
                birthdateInput.value = `${yyyy}-${mm}-${dd}`;
                // If birthdate is already set, make it optional
                birthdateInput.removeAttribute('required');
                birthdateRequired.style.display = 'none';
            }
            if (data.prefill.gender !== null && data.prefill.gender !== undefined) {
                const genderRadio = document.querySelector(`input[name="gender"][value="${data.prefill.gender}"]`);
                if (genderRadio) genderRadio.checked = true;
            }
        }
    } catch (error) {
        console.error('Error checking profile status:', error);
        window.location.href = '/login';
        return;
    }

    // Toggle password visibility
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        togglePassword.querySelector('i').classList.toggle('fa-eye');
        togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // Toggle confirm password visibility
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    toggleConfirmPassword.addEventListener('click', () => {
        const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
        confirmPasswordInput.type = type;
        toggleConfirmPassword.querySelector('i').classList.toggle('fa-eye');
        toggleConfirmPassword.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // Toggle national ID visibility
    const toggleNationalID = document.getElementById('toggleNationalID');
    const nationalIDInput = document.getElementById('nationalID');
    toggleNationalID.addEventListener('click', () => {
        const type = nationalIDInput.type === 'password' ? 'text' : 'password';
        nationalIDInput.type = type;
        toggleNationalID.querySelector('i').classList.toggle('fa-eye');
        toggleNationalID.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear previous messages
        errorMessage.classList.add('hidden');
        successMessage.classList.add('hidden');

        // Validate form
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Check password match
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        if (password !== confirmPassword) {
            errorMessage.textContent = 'Mật khẩu và nhập lại mật khẩu không khớp.';
            errorMessage.classList.remove('hidden');
            return;
        }

        // Check password length
        if (password.length < 6) {
            errorMessage.textContent = 'Mật khẩu phải có ít nhất 6 ký tự.';
            errorMessage.classList.remove('hidden');
            return;
        }

        // Check gender
        const gender = document.querySelector('input[name="gender"]:checked');
        if (!gender) {
            errorMessage.textContent = 'Vui lòng chọn giới tính.';
            errorMessage.classList.remove('hidden');
            return;
        }

        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Đang xử lý...';

        // Collect form data
        const formData = {
            username: document.getElementById('username').value,
            password: password,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            gender: parseInt(gender.value),
            location: document.getElementById('location').value || null,
            nationalID: nationalIDInput.value || null
        };

        // Add birthdate if provided
        const birthdate = birthdateInput.value;
        if (birthdate) {
            formData.birthdate = new Date(birthdate).getTime();
        }

        try {
            const response = await fetch('https://account.vanvatcorp.com/api/auth/complete-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok && data.success) {
                successMessage.textContent = 'Hoàn tất đăng ký thành công! Đang chuyển hướng...';
                successMessage.classList.remove('hidden');

                // Redirect to account center after a brief delay
                setTimeout(() => {
                    window.location.href = '/account-center';
                }, 1500);
            } else {
                errorMessage.textContent = data.error || 'Có lỗi xảy ra. Vui lòng thử lại.';
                errorMessage.classList.remove('hidden');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Hoàn tất đăng ký';
            }
        } catch (error) {
            console.error('Error completing profile:', error);
            errorMessage.textContent = 'Lỗi kết nối. Vui lòng thử lại.';
            errorMessage.classList.remove('hidden');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Hoàn tất đăng ký';
        }
    });
});
