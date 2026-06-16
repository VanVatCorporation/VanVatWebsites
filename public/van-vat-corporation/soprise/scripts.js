var CATEGORIES = [{ id: 'all', icon: 'fa-th', label: 'Tất cả' }, { id: 'fashion', icon: 'fa-tshirt', label: 'Thời trang' }, { id: 'electronics', icon: 'fa-mobile-alt', label: 'Điện tử' }, { id: 'home', icon: 'fa-home', label: 'Nhà cửa' }, { id: 'beauty', icon: 'fa-magic', label: 'Làm đẹp' }, { id: 'food', icon: 'fa-utensils', label: 'Thực phẩm' }, { id: 'books', icon: 'fa-book', label: 'Sách & VPP' }, { id: 'toys', icon: 'fa-gamepad', label: 'Đồ chơi & Game' }, { id: 'sports', icon: 'fa-running', label: 'Thể thao' }, { id: 'auto', icon: 'fa-car', label: 'Xe & Phụ kiện' }, { id: 'pet', icon: 'fa-paw', label: 'Thú cưng' }, { id: 'health', icon: 'fa-heartbeat', label: 'Sức khoẻ' }];

var MOCK_PRODUCTS = [
    { id: 1, name: 'Áo thun basic unisex form rộng cotton 100%', price: 85000, original: 150000, sold: 2341, location: 'TP.HCM', cat: 'fashion', tag: 'hot', emoji: '👕', isNew: false },
    { id: 2, name: 'Quần jean nữ skinny lưng cao co giãn 4 chiều', price: 189000, original: 350000, sold: 876, location: 'Hà Nội', cat: 'fashion', tag: 'sale', emoji: '👖', isNew: false },
    { id: 3, name: 'Tai nghe Bluetooth không dây chống ồn ANC', price: 299000, original: 599000, sold: 1203, location: 'TP.HCM', cat: 'electronics', tag: 'hot', emoji: '🎧', isNew: false },
    { id: 4, name: 'Chuột gaming không dây RGB 6 nút lập trình', price: 245000, original: 420000, sold: 654, location: 'Đà Nẵng', cat: 'electronics', tag: 'new', emoji: '🖱️', isNew: true },
    { id: 5, name: 'Bình giữ nhiệt inox 500ml giữ nóng 12h', price: 95000, original: 180000, sold: 3210, location: 'TP.HCM', cat: 'home', tag: 'sale', emoji: '🧋', isNew: false },
    { id: 6, name: 'Đèn bàn LED cảm ứng điều chỉnh độ sáng', price: 145000, original: 280000, sold: 987, location: 'Hà Nội', cat: 'home', tag: 'hot', emoji: '💡', isNew: false },
    { id: 7, name: 'Kem dưỡng ẩm chống nắng SPF50+ không nhờn', price: 125000, original: 220000, sold: 4520, location: 'TP.HCM', cat: 'beauty', tag: 'hot', emoji: '🧴', isNew: false },
    { id: 8, name: 'Son môi lì Hàn Quốc 16h không lem không khô', price: 89000, original: 160000, sold: 1876, location: 'Hà Nội', cat: 'beauty', tag: 'sale', emoji: '💄', isNew: false },
    { id: 9, name: 'Hạt điều rang muối Bình Phước 500g sạch', price: 65000, original: 90000, sold: 5430, location: 'Bình Phước', cat: 'food', tag: 'hot', emoji: '🥜', isNew: false },
    { id: 10, name: 'Trà ô long sữa bột pha sẵn hộp 10 gói', price: 48000, original: 75000, sold: 2109, location: 'TP.HCM', cat: 'food', tag: 'sale', emoji: '🧋', isNew: false },
    { id: 11, name: 'Sách Tư Duy Nhanh Và Chậm - Daniel Kahneman', price: 98000, original: 145000, sold: 732, location: 'Hà Nội', cat: 'books', tag: 'new', emoji: '📚', isNew: true },
    { id: 12, name: 'Bộ bút màu chì 36 màu cho học sinh', price: 55000, original: 85000, sold: 1543, location: 'TP.HCM', cat: 'books', tag: 'sale', emoji: '✏️', isNew: false },
    { id: 13, name: 'Đồ chơi xếp hình tương thích LEGO 500 mảnh', price: 210000, original: 380000, sold: 432, location: 'Hà Nội', cat: 'toys', tag: 'new', emoji: '🧩', isNew: true },
    { id: 14, name: 'Tạ tay điều chỉnh được 2-10kg mỗi quả', price: 320000, original: 550000, sold: 298, location: 'TP.HCM', cat: 'sports', tag: 'new', emoji: '🏋️', isNew: true },
    { id: 15, name: 'Găng tay đấm bốc tập gym da PU cao cấp', price: 175000, original: 290000, sold: 543, location: 'Đà Nẵng', cat: 'sports', tag: 'sale', emoji: '🥊', isNew: false },
    { id: 16, name: 'Phụ kiện phản quang xe đạp trẻ em an toàn', price: 35000, original: 55000, sold: 876, location: 'TP.HCM', cat: 'auto', tag: 'sale', emoji: '🚴', isNew: false },
    { id: 17, name: 'Thức ăn hạt cho chó nhỏ dưới 10kg túi 2kg', price: 155000, original: 250000, sold: 1234, location: 'TP.HCM', cat: 'pet', tag: 'hot', emoji: '🐕', isNew: false },
    { id: 18, name: 'Cát vệ sinh cho mèo khử mùi bentonite 5L', price: 72000, original: 110000, sold: 2100, location: 'Hà Nội', cat: 'pet', tag: 'sale', emoji: '🐈', isNew: false },
    { id: 19, name: 'Viên uống bổ sung Vitamin C 1000mg hộp 60v', price: 115000, original: 195000, sold: 3421, location: 'TP.HCM', cat: 'health', tag: 'hot', emoji: '💊', isNew: false },
    { id: 20, name: 'Khẩu trang y tế kháng khuẩn hộp 50 cái', price: 38000, original: 60000, sold: 8754, location: 'TP.HCM', cat: 'health', tag: 'sale', emoji: '😷', isNew: false },
    { id: 21, name: 'Váy hoa nhí dáng xòe cổ vuông tiểu thư', price: 165000, original: 290000, sold: 1087, location: 'TP.HCM', cat: 'fashion', tag: 'new', emoji: '👗', isNew: true },
    { id: 22, name: 'Giày sneaker nữ đế bằng vintage phong cách', price: 285000, original: 490000, sold: 765, location: 'Hà Nội', cat: 'fashion', tag: 'hot', emoji: '👟', isNew: false },
    { id: 23, name: 'Bàn phím cơ 75% switch brown đèn RGB', price: 459000, original: 750000, sold: 312, location: 'TP.HCM', cat: 'electronics', tag: 'new', emoji: '⌨️', isNew: true },
    { id: 24, name: 'Củ sạc nhanh 65W GaN nhỏ gọn 3 cổng USB-C', price: 189000, original: 320000, sold: 2345, location: 'Hà Nội', cat: 'electronics', tag: 'hot', emoji: '🔌', isNew: false }
];

var FLASH_PRODUCTS = [
    { id: 101, name: 'Ốp lưng trong suốt chống sốc iPhone 15', price: 25000, original: 89000, sold: 5432, emoji: '📱', discount: 72 },
    { id: 102, name: 'Móc khóa da handmade phong cách retro', price: 35000, original: 95000, sold: 3211, emoji: '🔑', discount: 63 },
    { id: 103, name: 'Kẹp tóc cua đính đá thời trang Hàn', price: 18000, original: 55000, sold: 7654, emoji: '✨', discount: 67 },
    { id: 104, name: 'Tất cotton kháng khuẩn khử mùi 5 đôi', price: 45000, original: 120000, sold: 4321, emoji: '🧦', discount: 63 },
    { id: 105, name: 'Lót chuột gaming XXL 80x40cm chống trơn', price: 55000, original: 150000, sold: 2109, emoji: '🖱️', discount: 63 },
    { id: 106, name: 'Hộp đựng trang sức ngăn kéo 3 tầng', price: 78000, original: 195000, sold: 1876, emoji: '💍', discount: 60 }
];

/* === FETCH FUNCTION — swap for real API === */
function fetchProducts(opts) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            var r = MOCK_PRODUCTS.slice();
            if (opts.category && opts.category !== 'all') r = r.filter(function (p) { return p.cat === opts.category; });
            if (opts.search && opts.search.trim() !== '') { var q = opts.search.trim().toLowerCase(); r = r.filter(function (p) { return p.name.toLowerCase().includes(q); }); }
            if (opts.sort === 'price-asc') r.sort(function (a, b) { return a.price - b.price; });
            else if (opts.sort === 'price-desc') r.sort(function (a, b) { return b.price - a.price; });
            else if (opts.sort === 'newest') r = r.filter(function (p) { return p.isNew; }).concat(r.filter(function (p) { return !p.isNew; }));
            else if (opts.sort === 'bestseller') r.sort(function (a, b) { return b.sold - a.sold; });
            resolve({ products: r, total: r.length });
        }, 80);
    });
}

var state = { activeCategory: 'all', activeSort: 'default', searchQuery: '', cartCount: 0, favorites: {} };

function fmtPrice(n) { return n.toLocaleString('vi-VN') + 'đ'; }
function fmtSold(n) { return n >= 1000 ? (Math.floor(n / 100) / 10).toFixed(1) + 'k' : String(n); }
function disc(o, p) { return Math.round((1 - p / o) * 100); }
function tagHTML(t) { var m = { hot: ['tag-hot', 'HOT'], new: ['tag-new', 'MỚI'], sale: ['tag-sale', 'SALE'] }; if (!m[t]) return ''; return '<span class="product-tag ' + m[t][0] + '">' + m[t][1] + '</span>'; }

function cardHTML(p) {
    var d = p.discount || disc(p.original, p.price);
    var fav = state.favorites[p.id] ? ' active' : '';
    return '<div class="product-card" data-id="' + p.id + '">'
        + '<div class="product-img-wrap">'
        + '<div class="product-img-placeholder">' + p.emoji + '</div>'
        + '<span class="product-discount-badge">-' + d + '%</span>'
        + '<button class="product-fav-btn' + fav + '" data-fav="' + p.id + '" aria-label="Yêu thích"><i class="fas fa-heart"></i></button>'
        + '</div>'
        + '<div class="product-info">'
        + tagHTML(p.tag)
        + '<div class="product-name">' + p.name + '</div>'
        + '<div class="product-price-row"><span class="product-price">' + fmtPrice(p.price) + '</span><span class="product-price-original">' + fmtPrice(p.original) + '</span></div>'
        + '<div class="product-meta"><span class="product-sold">Đã bán ' + fmtSold(p.sold) + '</span>' + (p.location ? '<span class="product-location"><i class="fas fa-map-marker-alt"></i>' + p.location + '</span>' : '') + '</div>'
        + '</div></div>';
}

function attachEvents(container) {
    container.querySelectorAll('.product-card').forEach(function (c) {
        c.addEventListener('click', function (e) {
            if (e.target.closest('[data-fav]')) return;
            state.cartCount++;
            document.getElementById('cart-count').textContent = state.cartCount;
            showToast('Đã thêm vào giỏ hàng! 🛒');
        });
    });
    container.querySelectorAll('[data-fav]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            var id = this.dataset.fav;
            state.favorites[id] = !state.favorites[id];
            this.classList.toggle('active', !!state.favorites[id]);
            showToast(state.favorites[id] ? '❤️ Đã thêm vào yêu thích' : 'Đã bỏ yêu thích');
        });
    });
}

function renderCategories() {
    var nav = document.getElementById('cat-nav-inner');
    nav.innerHTML = CATEGORIES.map(function (c) {
        return '<button class="cat-nav-item' + (state.activeCategory === c.id ? ' active' : '') + '" data-cat="' + c.id + '"><i class="fas ' + c.icon + '"></i> ' + c.label + '</button>';
    }).join('');
    nav.querySelectorAll('[data-cat]').forEach(function (btn) {
        btn.addEventListener('click', function () { state.activeCategory = this.dataset.cat; renderCategories(); loadProducts(); });
    });
}

function renderFlash() {
    var g = document.getElementById('flash-grid');
    g.innerHTML = FLASH_PRODUCTS.map(function (p) { return cardHTML(p); }).join('');
    attachEvents(g);
}

function loadProducts() {
    fetchProducts({ category: state.activeCategory, sort: state.activeSort, search: state.searchQuery }).then(function (res) {
        var g = document.getElementById('main-product-grid');
        if (!res.products.length) { g.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:48px 24px;color:#9ca3af"><i class="fas fa-search" style="font-size:36px;display:block;margin-bottom:12px"></i><p>Không tìm thấy sản phẩm nào.</p></div>'; return; }
        g.innerHTML = res.products.map(function (p) { return cardHTML(p); }).join('');
        attachEvents(g);
    });
}

/* === SEARCH === */
(function () {
    var input = document.getElementById('search-input');
    var box = document.getElementById('search-suggestions');
    var btn = document.getElementById('search-btn');
    var timer;
    var TRENDING = ['áo thun basic', 'tai nghe bluetooth', 'kem dưỡng ẩm', 'sách kỹ năng', 'giày sneaker', 'bình giữ nhiệt'];
    function showSug(q) {
        var items = q ? MOCK_PRODUCTS.filter(function (p) { return p.name.toLowerCase().includes(q.toLowerCase()); }).slice(0, 6).map(function (p) { return '<div class="suggestion-item"><i class="fas fa-search"></i>' + p.name + '</div>'; })
            : TRENDING.slice(0, 5).map(function (t) { return '<div class="suggestion-item"><i class="fas fa-fire"></i>' + t + '</div>'; });
        if (!items.length) { box.classList.remove('active'); return; }
        box.innerHTML = items.join('');
        box.classList.add('active');
        box.querySelectorAll('.suggestion-item').forEach(function (el) {
            el.addEventListener('mousedown', function (e) { e.preventDefault(); input.value = this.textContent.trim(); doSearch(input.value); });
        });
    }
    function doSearch(q) { state.searchQuery = q; box.classList.remove('active'); loadProducts(); }
    input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(function () { showSug(input.value); }, 120); });
    input.addEventListener('focus', function () { showSug(input.value); });
    document.addEventListener('click', function (e) { if (!e.target.closest('.search-wrap')) box.classList.remove('active'); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') doSearch(input.value); });
    btn.addEventListener('click', function () { doSearch(input.value); });
})();

/* === SORT === */
document.querySelectorAll('[data-sort]').forEach(function (btn) {
    btn.addEventListener('click', function () {
        document.querySelectorAll('[data-sort]').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        state.activeSort = this.dataset.sort;
        loadProducts();
    });
});

/* === CAROUSEL === */
(function () {
    var slides = document.querySelectorAll('.banner-slide');
    var dots = document.querySelectorAll('.banner-dot');
    var cur = 0, timer;
    function goTo(n) { slides[cur].classList.remove('active'); dots[cur].classList.remove('active'); cur = (n + slides.length) % slides.length; slides[cur].classList.add('active'); dots[cur].classList.add('active'); }
    function start() { timer = setInterval(function () { goTo(cur + 1); }, 4000); }
    function stop() { clearInterval(timer); }
    document.getElementById('banner-prev').addEventListener('click', function () { stop(); goTo(cur - 1); start(); });
    document.getElementById('banner-next').addEventListener('click', function () { stop(); goTo(cur + 1); start(); });
    dots.forEach(function (d) { d.addEventListener('click', function () { stop(); goTo(parseInt(this.dataset.slide)); start(); }); });
    start();
})();

/* === COUNTDOWN === */
(function () {
    var end = Date.now() + (2 * 3600 + 47 * 60 + 33) * 1000;
    function tick() { var diff = Math.max(0, end - Date.now()); document.getElementById('cd-h').textContent = String(Math.floor(diff / 3600000)).padStart(2, '0'); document.getElementById('cd-m').textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'); document.getElementById('cd-s').textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'); }
    setInterval(tick, 1000); tick();
})();

/* === TOAST === */
var toastTimer;
function showToast(msg) { var t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2200); }

/* === INIT === */
renderCategories();
renderFlash();
loadProducts();