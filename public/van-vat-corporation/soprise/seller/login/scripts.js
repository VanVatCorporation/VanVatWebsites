/* ══════════════════════════════════════════════════
   SOPRISE SELLER PORTAL — scripts.js
   Handles: login, sidebar, QR, chart, toast, dropdown
══════════════════════════════════════════════════ */

/* ── Utility ── */
function $(id) { return document.getElementById(id); }

var toastTimer;
function showToast(msg, duration) {
    var t = $('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, duration || 2400);
}

/* ══════════════════════════════════════════════════
   LOGIN PAGE
══════════════════════════════════════════════════ */
(function initLogin() {
    if (!$('tab-pass')) return; // not on login page

    /* ── Tabs ── */
    var tabPass = $('tab-pass');
    var tabQr = $('tab-qr');
    var panelPass = $('panel-pass');
    var panelQr = $('panel-qr');

    function switchTab(toQr) {
        tabPass.classList.toggle('active', !toQr);
        tabQr.classList.toggle('active', toQr);
        panelPass.classList.toggle('hidden', toQr);
        panelQr.classList.toggle('hidden', !toQr);
        if (toQr) generateQR();
    }

    tabPass.addEventListener('click', function () { switchTab(false); });
    tabQr.addEventListener('click', function () { switchTab(true); });

    /* ── Password toggle ── */
    var pwToggle = $('pw-toggle');
    var pwInput = $('login-pw');
    var pwIcon = $('pw-icon');

    if (pwToggle) {
        pwToggle.addEventListener('click', function () {
            var isHidden = pwInput.type === 'password';
            pwInput.type = isHidden ? 'text' : 'password';
            pwIcon.className = isHidden ? 'fas fa-eye' : 'fas fa-eye-slash';
        });
    }

    /* ── Login button mock flow ── */
    var loginBtn = $('login-btn');
    var loginBtnText = $('login-btn-text');
    var loginSpinner = $('login-spinner');
    var loginId = $('login-id');

    if (loginBtn) {
        loginBtn.addEventListener('click', function () {
            var id = loginId ? loginId.value.trim() : '';
            var pw = pwInput ? pwInput.value.trim() : '';

            /* Basic validation */
            if (!id) {
                loginId && loginId.classList.add('error');
                showToast('Vui lòng nhập email hoặc số điện thoại.');
                loginId && loginId.focus();
                return;
            }
            if (!pw) {
                pwInput && pwInput.classList.add('error');
                showToast('Vui lòng nhập mật khẩu.');
                pwInput && pwInput.focus();
                return;
            }

            loginId && loginId.classList.remove('error');
            pwInput && pwInput.classList.remove('error');

            /* Show spinner */
            loginBtn.disabled = true;
            loginBtnText.classList.add('hidden');
            loginSpinner.classList.remove('hidden');

            /* Mock auth delay → redirect */
            setTimeout(function () {
                window.location.href = '/seller/dashboard';
            }, 1400);
        });

        /* Clear error on input */
        loginId && loginId.addEventListener('input', function () {
            this.classList.remove('error');
        });
        pwInput && pwInput.addEventListener('input', function () {
            this.classList.remove('error');
        });

        /* Allow Enter key */
        [loginId, pwInput].forEach(function (el) {
            el && el.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') loginBtn.click();
            });
        });
    }

    /* ── Social buttons (mock) ── */
    document.querySelectorAll('.social-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            showToast('Tính năng đăng nhập mạng xã hội sắp ra mắt! 🚀');
        });
    });

    /* ── Sub-account link (mock) ── */
    var subLink = document.querySelector('.subaccount-link');
    if (subLink) {
        subLink.addEventListener('click', function (e) {
            e.preventDefault();
            showToast('Tính năng tài khoản phụ sắp ra mắt!');
        });
    }

    /* ── QR code generator ── */
    function generateQR() {
        var grid = $('qr-grid');
        if (!grid) return;
        grid.innerHTML = '';
        /* Generate a seeded pseudo-random QR-like grid */
        var seed = Date.now();
        function rand(s) { return ((Math.sin(s) * 9301 + 49297) % 233280) / 233280; }
        var size = 10;
        for (var i = 0; i < size * size; i++) {
            var cell = document.createElement('div');
            cell.className = 'qr-cell';
            /* Corner finder patterns */
            var r = Math.floor(i / size), c = i % size;
            var inCorner = (r < 3 && c < 3) || (r < 3 && c >= size - 3) || (r >= size - 3 && c < 3);
            var isEdge = (r === 0 || r === size - 1 || c === 0 || c === size - 1) && inCorner;
            if (inCorner) {
                cell.style.background = (r === 1 && c >= 1 && c <= 1) || isEdge ? '#111827' : (rand(seed + i) > 0.4 ? '#111827' : 'transparent');
            } else {
                cell.style.background = rand(seed + i) > 0.55 ? '#111827' : 'transparent';
            }
            grid.appendChild(cell);
        }
    }

    var qrRefresh = $('qr-refresh');
    if (qrRefresh) {
        qrRefresh.addEventListener('click', function () {
            generateQR();
            showToast('Mã QR đã được làm mới.');
        });
    }

})();
