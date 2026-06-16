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
   DASHBOARD PAGE
══════════════════════════════════════════════════ */
(function initDashboard() {
    if (!document.querySelector('.dash-sidebar')) return; // not on dashboard

    /* ── Sidebar collapsible groups ── */
    document.querySelectorAll('.sidebar-group[data-group]').forEach(function (group) {
        var btn = group.querySelector('.sidebar-group-btn');
        var children = group.querySelector('.sidebar-children');
        if (!btn || !children) return;

        btn.addEventListener('click', function () {
            var isOpen = children.classList.contains('open');

            /* Close all others */
            document.querySelectorAll('.sidebar-children.open').forEach(function (c) {
                c.classList.remove('open');
            });
            document.querySelectorAll('.sidebar-group-btn.open').forEach(function (b) {
                b.classList.remove('open');
                b.setAttribute('aria-expanded', 'false');
            });

            /* Toggle this one */
            if (!isOpen) {
                children.classList.add('open');
                btn.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    /* ── Sidebar link active state ── */
    document.querySelectorAll('.sidebar-link').forEach(function (link) {
        link.addEventListener('click', function () {
            document.querySelectorAll('.sidebar-link').forEach(function (l) {
                l.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    /* ── Bar chart (7-day sales mock data) ── */
    var chartEl = $('chart-bars');
    if (chartEl) {
        var days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
        var vals = [320000, 580000, 410000, 760000, 890000, 1100000, 1250000];
        var maxV = Math.max.apply(null, vals);

        days.forEach(function (day, i) {
            var wrap = document.createElement('div');
            wrap.className = 'chart-bar-wrap';

            var bar = document.createElement('div');
            bar.className = 'chart-bar' + (i === days.length - 1 ? ' today' : '');
            var pct = Math.round((vals[i] / maxV) * 100);
            bar.style.height = pct + '%';
            bar.title = day + ': đ' + vals[i].toLocaleString('vi-VN');

            bar.addEventListener('mouseenter', function () {
                showToast(day + ': đ' + vals[i].toLocaleString('vi-VN'), 1600);
            });

            var label = document.createElement('div');
            label.className = 'chart-bar-label';
            label.textContent = day;

            wrap.appendChild(bar);
            wrap.appendChild(label);
            chartEl.appendChild(wrap);
        });
    }

    /* ── User dropdown (mock) ── */
    var userBtn = $('user-btn');
    if (userBtn) {
        userBtn.addEventListener('click', function () {
            showToast('Tính năng menu tài khoản sắp ra mắt!');
        });
    }

    /* ── Suggestion action buttons ── */
    document.querySelectorAll('.suggestion-action').forEach(function (btn) {
        btn.addEventListener('click', function () {
            showToast('Tính năng này sắp ra mắt! 🚀');
        });
    });

    /* ── Promo button ── */
    var promoBtn = document.querySelector('.promo-btn');
    if (promoBtn) {
        promoBtn.addEventListener('click', function () {
            showToast('Tạo chiến dịch quảng cáo — sắp ra mắt! 🚀');
        });
    }

    /* ── Topbar icon buttons (mock) ── */
    document.querySelectorAll('.dash-topbar-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var label = this.getAttribute('title') || 'Tính năng';
            showToast(label + ' — sắp ra mắt!');
        });
    });

    /* ── Stat cards clickable ── */
    document.querySelectorAll('.stat-card').forEach(function (card) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function () {
            showToast('Xem chi tiết đơn hàng — sắp ra mắt!');
        });
    });

    /* ── Alert link ── */
    var alertLink = document.querySelector('.dash-alert a');
    if (alertLink) {
        alertLink.addEventListener('click', function (e) {
            e.preventDefault();
            showToast('Đang chuyển đến hồ sơ gian hàng...');
        });
    }

})();