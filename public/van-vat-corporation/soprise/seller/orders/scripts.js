/* ══════════════════════════════════════════════════
   SOPRISE SELLER — orders/scripts.js
   Full order management: tabs, filter, sort, bulk
══════════════════════════════════════════════════ */

/* ── Mock order data ── */
var MOCK_ORDERS = [
    {
        id: 'SP240001', code: 'SP240001',
        product: 'Áo thun basic unisex form rộng cotton 100%',
        emoji: '👕', qty: 2, buyer: 'nguyen_minh',
        amount: 170000, buyerPaid: 170000,
        status: 'pending', proc: 'unprocessed',
        shipping: 'GHN', deadline: 2, isNew: true
    },
    {
        id: 'SP240002', code: 'SP240002',
        product: 'Tai nghe Bluetooth không dây chống ồn ANC',
        emoji: '🎧', qty: 1, buyer: 'tran_thu_ha',
        amount: 299000, buyerPaid: 299000,
        status: 'confirmed', proc: 'unprocessed',
        shipping: 'GHTK', deadline: 5, isNew: false
    },
    {
        id: 'SP240003', code: 'SP240003',
        product: 'Kem dưỡng ẩm chống nắng SPF50+ không nhờn',
        emoji: '🧴', qty: 3, buyer: 'le_phuong',
        amount: 375000, buyerPaid: 375000,
        status: 'pickup', proc: 'unprocessed',
        shipping: 'JT', deadline: 1, isNew: false
    },
    {
        id: 'SP240004', code: 'SP240004',
        product: 'Bình giữ nhiệt inox 500ml giữ nóng 12h',
        emoji: '🧋', qty: 1, buyer: 'pham_duc',
        amount: 95000, buyerPaid: 95000,
        status: 'shipping', proc: 'processed',
        shipping: 'Viettel', deadline: null, isNew: false
    },
    {
        id: 'SP240005', code: 'SP240005',
        product: 'Son môi lì Hàn Quốc 16h không lem không khô',
        emoji: '💄', qty: 2, buyer: 'hoang_oanh',
        amount: 178000, buyerPaid: 178000,
        status: 'delivered', proc: 'processed',
        shipping: 'GHN', deadline: null, isNew: false
    },
    {
        id: 'SP240006', code: 'SP240006',
        product: 'Hạt điều rang muối Bình Phước 500g sạch',
        emoji: '🥜', qty: 4, buyer: 'vo_thanh',
        amount: 260000, buyerPaid: 260000,
        status: 'delivered', proc: 'processed',
        shipping: 'VNPT', deadline: null, isNew: false
    },
    {
        id: 'SP240007', code: 'SP240007',
        product: 'Chuột gaming không dây RGB 6 nút lập trình',
        emoji: '🖱️', qty: 1, buyer: 'nguyen_bao',
        amount: 245000, buyerPaid: 245000,
        status: 'returned', proc: 'processed',
        shipping: 'GHN', deadline: null, isNew: false
    },
    {
        id: 'SP240008', code: 'SP240008',
        product: 'Đèn bàn LED cảm ứng điều chỉnh độ sáng',
        emoji: '💡', qty: 1, buyer: 'trinh_mai',
        amount: 145000, buyerPaid: 145000,
        status: 'cancelled', proc: 'processed',
        shipping: 'GHTK', deadline: null, isNew: false
    },
    {
        id: 'SP240009', code: 'SP240009',
        product: 'Váy hoa nhí dáng xòe cổ vuông tiểu thư',
        emoji: '👗', qty: 1, buyer: 'bui_lan',
        amount: 165000, buyerPaid: 165000,
        status: 'pending', proc: 'unprocessed',
        shipping: 'JT', deadline: 3, isNew: true
    },
    {
        id: 'SP240010', code: 'SP240010',
        product: 'Củ sạc nhanh 65W GaN nhỏ gọn 3 cổng USB-C',
        emoji: '🔌', qty: 2, buyer: 'dang_hieu',
        amount: 378000, buyerPaid: 378000,
        status: 'confirmed', proc: 'unprocessed',
        shipping: 'GHN', deadline: 6, isNew: false
    },
    {
        id: 'SP240011', code: 'SP240011',
        product: 'Viên uống bổ sung Vitamin C 1000mg hộp 60v',
        emoji: '💊', qty: 2, buyer: 'phan_thu',
        amount: 230000, buyerPaid: 230000,
        status: 'shipping', proc: 'processed',
        shipping: 'Viettel', deadline: null, isNew: false
    },
    {
        id: 'SP240012', code: 'SP240012',
        product: 'Giày sneaker nữ đế bằng vintage phong cách',
        emoji: '👟', qty: 1, buyer: 'cao_linh',
        amount: 285000, buyerPaid: 285000,
        status: 'delivered', proc: 'processed',
        shipping: 'GHTK', deadline: null, isNew: false
    },
];

/* ── Tab config ── */
var TABS = [
    { id: 'all', label: 'Tất cả', filter: function (o) { return true; } },
    { id: 'pending', label: 'Chờ xác nhận', filter: function (o) { return o.status === 'pending'; } },
    { id: 'pickup', label: 'Chờ lấy hàng', filter: function (o) { return o.status === 'pickup'; } },
    { id: 'shipping', label: 'Đang giao', filter: function (o) { return o.status === 'shipping'; } },
    { id: 'delivered', label: 'Đã giao', filter: function (o) { return o.status === 'delivered'; } },
    { id: 'returned', label: 'Hoàn trả/Huỷ', filter: function (o) { return o.status === 'returned' || o.status === 'cancelled'; } },
];

/* ── Status display map ── */
var STATUS_MAP = {
    pending: { label: 'Chờ xác nhận', cls: 'pending', icon: 'fa-clock' },
    confirmed: { label: 'Đã xác nhận', cls: 'confirmed', icon: 'fa-check' },
    pickup: { label: 'Chờ lấy hàng', cls: 'pickup', icon: 'fa-box-open' },
    shipping: { label: 'Đang giao', cls: 'shipping', icon: 'fa-truck' },
    delivered: { label: 'Đã giao', cls: 'delivered', icon: 'fa-check-circle' },
    returned: { label: 'Hoàn trả', cls: 'returned', icon: 'fa-undo' },
    cancelled: { label: 'Đã huỷ', cls: 'cancelled', icon: 'fa-times-circle' },
};

/* ── State ── */
var state = {
    activeTab: 'all',
    activeProc: 'all',
    searchQuery: '',
    searchField: 'code',
    shippingFilter: 'all',
    activeSort: 'deadline',
    selected: {},
};

/* ── Helpers ── */
function fmtPrice(n) { return n.toLocaleString('vi-VN') + 'đ'; }

function countTab(tabId) {
    var tab = TABS.find(function (t) { return t.id === tabId; });
    return tab ? MOCK_ORDERS.filter(tab.filter).length : 0;
}

/* ── Render tabs ── */
function renderTabs() {
    var wrap = document.getElementById('order-tabs');
    if (!wrap) return;
    wrap.innerHTML = TABS.map(function (t) {
        var cnt = countTab(t.id);
        var active = state.activeTab === t.id ? ' active' : '';
        return '<button class="order-tab' + active + '" data-tab="' + t.id + '" role="tab" aria-selected="' + (state.activeTab === t.id) + '">'
            + t.label
            + '<span class="tab-count">' + cnt + '</span>'
            + '</button>';
    }).join('');

    wrap.querySelectorAll('[data-tab]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            state.activeTab = this.dataset.tab;
            state.selected = {};
            renderTabs();
            renderOrders();
            updateBulkBar();
        });
    });
}

/* ── Filter + sort orders ── */
function getFilteredOrders() {
    var tab = TABS.find(function (t) { return t.id === state.activeTab; });
    var results = MOCK_ORDERS.filter(tab ? tab.filter : function () { return true; });

    /* Processing status chip */
    if (state.activeProc !== 'all') {
        results = results.filter(function (o) { return o.proc === state.activeProc; });
    }

    /* Shipping unit */
    if (state.shippingFilter !== 'all') {
        results = results.filter(function (o) { return o.shipping === state.shippingFilter; });
    }

    /* Search */
    if (state.searchQuery.trim()) {
        var q = state.searchQuery.trim().toLowerCase();
        results = results.filter(function (o) {
            if (state.searchField === 'code') return o.code.toLowerCase().includes(q);
            if (state.searchField === 'product') return o.product.toLowerCase().includes(q);
            if (state.searchField === 'buyer') return o.buyer.toLowerCase().includes(q);
            return false;
        });
    }

    /* Sort */
    if (state.activeSort === 'newest') {
        results = results.slice().reverse();
    } else if (state.activeSort === 'amount-desc') {
        results = results.slice().sort(function (a, b) { return b.amount - a.amount; });
    } else {
        /* deadline: unprocessed (urgent first) → processed */
        results = results.slice().sort(function (a, b) {
            var da = a.deadline !== null ? a.deadline : 999;
            var db = b.deadline !== null ? b.deadline : 999;
            return da - db;
        });
    }

    return results;
}

/* ── Render table ── */
function renderOrders() {
    var tbody = document.getElementById('orders-tbody');
    var empty = document.getElementById('orders-empty');
    if (!tbody) return;

    var orders = getFilteredOrders();

    if (!orders.length) {
        tbody.innerHTML = '';
        empty && empty.classList.add('visible');
        return;
    }

    empty && empty.classList.remove('visible');

    tbody.innerHTML = orders.map(function (o) {
        var st = STATUS_MAP[o.status] || STATUS_MAP.pending;
        var sel = state.selected[o.id] ? ' checked' : '';
        var cdClass = o.deadline === null ? 'done' : (o.deadline <= 2 ? 'urgent' : 'normal');
        var cdText = o.deadline === null ? '—' : (o.deadline <= 1 ? '⚠ Còn ' + o.deadline + ' giờ' : 'Còn ' + o.deadline + ' giờ');

        /* Action buttons based on status */
        var actions = '';
        if (o.status === 'pending' || o.status === 'confirmed') {
            actions = '<button class="action-link green" data-action="confirm" data-id="' + o.id + '">Xác nhận</button>'
                + '<button class="action-link" data-action="detail" data-id="' + o.id + '">Xem chi tiết</button>'
                + '<button class="action-link red" data-action="cancel" data-id="' + o.id + '">Huỷ đơn</button>';
        } else if (o.status === 'pickup') {
            actions = '<button class="action-link green" data-action="ship" data-id="' + o.id + '">Giao hàng</button>'
                + '<button class="action-link" data-action="detail" data-id="' + o.id + '">Xem chi tiết</button>';
        } else {
            actions = '<button class="action-link" data-action="detail" data-id="' + o.id + '">Xem chi tiết</button>';
        }

        return '<tr data-order-id="' + o.id + '">'
            + '<td><input type="checkbox" class="row-check order-check" data-id="' + o.id + '"' + sel + ' aria-label="Chọn đơn ' + o.id + '" /></td>'
            + '<td>'
            + '<div class="order-product-cell">'
            + '<div class="order-product-thumb">' + o.emoji + '</div>'
            + '<div class="order-product-info">'
            + '<div class="order-code">#' + o.code + (o.isNew ? ' <span style="background:var(--green);color:#fff;font-size:9px;padding:1px 5px;border-radius:3px;font-weight:700">MỚI</span>' : '') + '</div>'
            + '<div class="order-product-name">' + o.product + '</div>'
            + '<div class="order-qty">x' + o.qty + ' · ' + o.buyer + '</div>'
            + '</div>'
            + '</div>'
            + '</td>'
            + '<td>'
            + '<div class="order-amount">' + fmtPrice(o.amount) + '</div>'
            + '<div class="order-amount-sub">NM thanh toán: ' + fmtPrice(o.buyerPaid) + '</div>'
            + '</td>'
            + '<td style="text-align:center">'
            + '<span class="status-badge ' + st.cls + '"><i class="fas ' + st.icon + '"></i>' + st.label + '</span>'
            + '</td>'
            + '<td style="text-align:center">'
            + '<span class="order-countdown ' + cdClass + '">' + cdText + '</span>'
            + '</td>'
            + '<td><span class="shipping-badge">' + o.shipping + '</span></td>'
            + '<td><div class="order-actions">' + actions + '</div></td>'
            + '</tr>';
    }).join('');

    /* Restore checked state */
    tbody.querySelectorAll('.order-check').forEach(function (cb) {
        cb.checked = !!state.selected[cb.dataset.id];
        cb.addEventListener('change', function () {
            if (this.checked) {
                state.selected[this.dataset.id] = true;
            } else {
                delete state.selected[this.dataset.id];
            }
            syncCheckAll();
            updateBulkBar();
        });
    });

    /* Action buttons */
    tbody.querySelectorAll('[data-action]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var action = this.dataset.action;
            var id = this.dataset.id;
            handleOrderAction(action, id);
        });
    });
}

/* ── Order actions ── */
function handleOrderAction(action, id) {
    var order = MOCK_ORDERS.find(function (o) { return o.id === id; });
    if (!order) return;

    if (action === 'confirm') {
        order.status = 'confirmed';
        order.proc = 'unprocessed';
        showToast('✅ Đã xác nhận đơn #' + id);
        renderTabs();
        renderOrders();
    } else if (action === 'ship') {
        order.status = 'shipping';
        order.proc = 'processed';
        order.deadline = null;
        showToast('🚚 Đã bàn giao đơn #' + id + ' cho ' + order.shipping);
        renderTabs();
        renderOrders();
    } else if (action === 'cancel') {
        order.status = 'cancelled';
        order.proc = 'processed';
        order.deadline = null;
        showToast('❌ Đã huỷ đơn #' + id);
        renderTabs();
        renderOrders();
    } else if (action === 'detail') {
        showToast('📋 Xem chi tiết đơn #' + id + ' — sắp ra mắt!');
    }
}

/* ── Check all ── */
function syncCheckAll() {
    var checkAll = document.getElementById('check-all');
    var allChecks = document.querySelectorAll('.order-check');
    if (!checkAll || !allChecks.length) return;
    var allChecked = Array.prototype.every.call(allChecks, function (c) { return c.checked; });
    checkAll.checked = allChecked;
    checkAll.indeterminate = !allChecked && Object.keys(state.selected).length > 0;
}

var checkAllEl = document.getElementById('check-all');
if (checkAllEl) {
    checkAllEl.addEventListener('change', function () {
        var filtered = getFilteredOrders();
        if (this.checked) {
            filtered.forEach(function (o) { state.selected[o.id] = true; });
        } else {
            state.selected = {};
        }
        renderOrders();
        updateBulkBar();
    });
}

/* ── Bulk bar ── */
function updateBulkBar() {
    var bar = document.getElementById('bulk-bar');
    var count = document.getElementById('bulk-count');
    var n = Object.keys(state.selected).length;
    if (bar) bar.classList.toggle('visible', n > 0);
    if (count) count.textContent = n + ' đơn được chọn';
}

var bulkClear = document.getElementById('bulk-clear');
if (bulkClear) {
    bulkClear.addEventListener('click', function () {
        state.selected = {};
        renderOrders();
        updateBulkBar();
    });
}

var bulkShipAll = document.getElementById('bulk-ship-all');
if (bulkShipAll) {
    bulkShipAll.addEventListener('click', function () {
        var ids = Object.keys(state.selected);
        showToast('🚚 Giao hàng loạt ' + ids.length + ' đơn — sắp ra mắt!');
    });
}

var bulkCancel = document.getElementById('bulk-cancel');
if (bulkCancel) {
    bulkCancel.addEventListener('click', function () {
        var ids = Object.keys(state.selected);
        showToast('❌ Huỷ loạt ' + ids.length + ' đơn — sắp ra mắt!');
    });
}

/* ── Filter chips ── */
document.querySelectorAll('[data-proc]').forEach(function (btn) {
    btn.addEventListener('click', function () {
        document.querySelectorAll('[data-proc]').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        state.activeProc = this.dataset.proc;
    });
});

/* ── Sort buttons ── */
document.querySelectorAll('[data-sort]').forEach(function (btn) {
    btn.addEventListener('click', function () {
        document.querySelectorAll('[data-sort]').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        state.activeSort = this.dataset.sort;
        renderOrders();
    });
});

/* ── Apply / Reset ── */
var btnApply = document.getElementById('btn-apply');
if (btnApply) {
    btnApply.addEventListener('click', function () {
        state.searchQuery = (document.getElementById('filter-search') || {}).value || '';
        state.searchField = (document.getElementById('filter-field') || {}).value || 'code';
        state.shippingFilter = (document.getElementById('filter-shipping') || {}).value || 'all';
        state.selected = {};
        renderOrders();
        updateBulkBar();
        showToast('Đã áp dụng bộ lọc');
    });
}

var btnReset = document.getElementById('btn-reset');
if (btnReset) {
    btnReset.addEventListener('click', function () {
        var si = document.getElementById('filter-search');
        var fi = document.getElementById('filter-field');
        var sh = document.getElementById('filter-shipping');
        if (si) si.value = '';
        if (fi) fi.value = 'code';
        if (sh) sh.value = 'all';
        document.querySelectorAll('[data-proc]').forEach(function (b) { b.classList.remove('active'); });
        var allChip = document.querySelector('[data-proc="all"]');
        if (allChip) allChip.classList.add('active');
        state.searchQuery = '';
        state.searchField = 'code';
        state.shippingFilter = 'all';
        state.activeProc = 'all';
        state.selected = {};
        renderOrders();
        updateBulkBar();
        showToast('Đã đặt lại bộ lọc');
    });
}

/* ── Live search on Enter ── */
var searchInput = document.getElementById('filter-search');
if (searchInput) {
    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') btnApply && btnApply.click();
    });
}

/* ── Export buttons ── */
var btnExport = document.getElementById('btn-export');
if (btnExport) {
    btnExport.addEventListener('click', function () { showToast('Xuất báo cáo — sắp ra mắt!'); });
}

var btnExportHistory = document.getElementById('btn-export-history');
if (btnExportHistory) {
    btnExportHistory.addEventListener('click', function () { showToast('Lịch sử xuất báo cáo — sắp ra mắt!'); });
}

var btnBulkShip = document.getElementById('btn-bulk-ship');
if (btnBulkShip) {
    btnBulkShip.addEventListener('click', function () { showToast('🚚 Giao hàng loạt — sắp ra mắt!'); });
}

/* ── INIT ── */
renderTabs();
renderOrders();