// Login JavaScript Handler
// Handles user login with JWT authentication via httpOnly cookies

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    const errorDiv = document.getElementById('errorMessage');

    // Check for OAuth error in URL query params
    const urlParams = new URLSearchParams(window.location.search);
    const oauthError = urlParams.get('error');

    if (oauthError && errorDiv) {
        const errorMessages = {
            'oauth_denied': 'Bạn đã từ chối quyền truy cập. Vui lòng thử lại.',
            'no_code': 'Không nhận được mã xác thực. Vui lòng thử lại.',
            'token_exchange_failed': 'Xác thực thất bại. Vui lòng thử lại.',
            'oauth_failed': 'Đăng nhập bằng mạng xã hội thất bại. Vui lòng thử lại.',
            'email_exists': 'Email này đã được đăng ký. Vui lòng đăng nhập bằng mật khẩu.'
        };

        errorDiv.textContent = errorMessages[oauthError] || 'Có lỗi xảy ra. Vui lòng thử lại.';
        errorDiv.classList.remove('hidden');

        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Clear previous error
            if (errorDiv) {
                errorDiv.textContent = '';
                errorDiv.classList.add('hidden');
            }

            try {
                const response = await fetch('https://account.vanvatcorp.com/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password }),
                    credentials: 'include' // Important for cookies
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    // Login successful - JWT cookie is set automatically
                    window.location.href = 'https://account.vanvatcorp.com/account-center/';
                } else {
                    // Show error
                    if (errorDiv) {
                        errorDiv.textContent = data.error || 'Login failed. Please try again.';
                        errorDiv.classList.remove('hidden');
                    } else {
                        alert(data.error || 'Login failed. Please try again.');
                    }
                }
            } catch (error) {
                if (errorDiv) {
                    errorDiv.textContent = 'Network error. Please check your connection and try again.';
                    errorDiv.classList.remove('hidden');
                } else {
                    alert('Network error. Please check your connection and try again.');
                }
            }
        });
    }
});
