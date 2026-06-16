import React, { useState } from 'react';
import {
    Search,
    ShoppingCart,
    UserCircle,
    HelpCircle,
    Info,
    Store,
    ChevronRight,
    ArrowRight,
    Bolt,
    LayoutGrid,
    MapPin,
    Heart,
    Layers
} from 'lucide-react';
import MaintenanceBanner from '../../components/common/MaintenanceBanner';

// Mock Data
const CATEGORIES = [
    { id: 'all', icon: <LayoutGrid size={18} />, label: 'Tất cả' },
    { id: 'fashion', icon: <Layers size={18} />, label: 'Thời trang' },
    { id: 'electronics', icon: <Bolt size={18} />, label: 'Điện tử' },
];

const MOCK_PRODUCTS = [
    { id: 1, name: 'Áo thun basic unisex form rộng cotton 100%', price: 85000, original: 150000, sold: 2341, location: 'TP.HCM', cat: 'fashion', tag: 'hot', emoji: '👕' },
    { id: 2, name: 'Tai nghe Bluetooth không dây chống ồn ANC', price: 299000, original: 599000, sold: 1203, location: 'TP.HCM', cat: 'electronics', tag: 'hot', emoji: '🎧' },
];

const Soprise: React.FC = () => {
    const [cartCount, setCartCount] = useState(0);
    const [activeCategory, setActiveCategory] = useState('all');
    const [favorites, setFavorites] = useState<Record<number, boolean>>({});

    const toggleFavorite = (id: number) => {
        setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const addToCart = () => {
        setCartCount(prev => prev + 1);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-inter">
            <MaintenanceBanner />

            {/* Utility Bar */}
            <div className="bg-blue-700 text-white py-1.5 text-[0.8rem] font-medium hidden md:block">
                <div className="max-w-7xl mx-auto px-6 flex justify-between">
                    <div className="flex items-center gap-4">
                        <a href="/van-vat-corporation/soprise/seller/login" className="flex items-center gap-1.5 hover:text-blue-100 transition">
                            <Store size={14} /> Kênh Người Bán
                        </a>
                        <span className="opacity-30">|</span>
                        <a href="/van-vat-corporation/soprise/seller/register" className="hover:text-blue-100 transition">Trở thành Người Bán Soprise</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1.5 hover:text-blue-100 transition"><HelpCircle size={14} /> Hỗ Trợ</button>
                        <span className="opacity-30">|</span>
                        <a href="/van-vat-corporation/about-us" className="flex items-center gap-1.5 hover:text-blue-100 transition"><Info size={14} /> Về Soprise</a>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="bg-white border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-8">
                    <a href="/van-vat-corporation/soprise" className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center text-white font-black text-xl italic">S</div>
                        <span className="text-3xl font-black tracking-tighter text-blue-800">Sop<span className="text-indigo-600 italic">rise</span></span>
                    </a>

                    {/* Search */}
                    <div className="flex-grow">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Tìm sản phẩm, thương hiệu..."
                                className="w-full bg-gray-100 border-2 border-transparent focus:bg-white focus:border-blue-700 rounded-2xl px-5 py-3 outline-none transition-all font-medium"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-700 text-white p-2.5 rounded-xl hover:bg-blue-800 transition shadow-lg shadow-blue-700/20">
                                <Search size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 flex-shrink-0">
                        <button className="relative p-2 text-gray-700 hover:bg-blue-50 rounded-xl transition-all group">
                            <ShoppingCart size={24} />
                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[0.65rem] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                                {cartCount}
                            </span>
                        </button>
                        <a href="/van-vat-corporation/account/account-center" className="flex items-center gap-3 pl-2 group">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-blue-700 group-hover:text-white transition-all shadow-inner">
                                <UserCircle size={28} />
                            </div>
                            <div className="hidden lg:block">
                                <p className="text-[0.65rem] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Tài khoản</p>
                                <p className="text-sm font-bold text-gray-900 leading-none">Đăng nhập</p>
                            </div>
                        </a>
                    </div>
                </div>
            </header>

            {/* Category Nav */}
            <nav className="bg-white border-b py-2 hidden sm:block">
                <div className="max-w-7xl mx-auto px-6 flex gap-6 overflow-x-auto no-scrollbar">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeCategory === cat.id ? 'bg-blue-700 text-white shadow-lg shadow-blue-700/20' : 'text-gray-500 hover:bg-blue-50 hover:text-blue-700'
                                }`}
                        >
                            {cat.icon} {cat.label}
                        </button>
                    ))}
                </div>
            </nav>

            <main className="flex-grow pt-8 pb-20">
                <div className="max-w-7xl mx-auto px-6 space-y-16">

                    {/* Banner Section */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 relative h-[400px] bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[2.5rem] overflow-hidden shadow-2xl group">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                            <div className="relative z-10 h-full p-12 flex flex-col justify-center text-white">
                                <p className="text-sm font-black uppercase tracking-[0.3em] mb-4 text-blue-200">⚡ Flash Sale mỗi ngày</p>
                                <h2 className="text-5xl lg:text-7xl font-black mb-6 leading-tight tracking-tighter">Giảm đến<br />50% hôm nay</h2>
                                <p className="text-lg font-medium lg:max-w-md text-blue-100 mb-10 leading-relaxed">Hàng ngàn sản phẩm chính hãng với mức giá ưu đãi nhất chưa từng có.</p>
                                <button className="flex items-center gap-3 bg-white text-blue-900 font-black px-10 py-5 rounded-2xl w-fit hover:scale-105 transition-transform shadow-2xl">
                                    Mua ngay <ArrowRight size={20} />
                                </button>
                            </div>
                            {/* Decorative Circles */}
                            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
                        </div>

                        <div className="space-y-6">
                            <div className="h-[188px] bg-amber-500 rounded-[2rem] p-8 text-white relative overflow-hidden group shadow-xl">
                                <div className="relative z-10">
                                    <p className="text-xs font-black uppercase mb-1 opacity-80">Ưu đãi đặc biệt</p>
                                    <h3 className="text-2xl font-black leading-tight">Miễn phí vận chuyển<br />đơn từ 99k</h3>
                                </div>
                                <div className="absolute -bottom-10 -right-10 opacity-30 group-hover:scale-110 transition-transform duration-500">
                                    <LayoutGrid size={120} />
                                </div>
                            </div>
                            <div className="h-[188px] bg-emerald-600 rounded-[2rem] p-8 text-white relative overflow-hidden group shadow-xl">
                                <div className="relative z-10">
                                    <p className="text-xs font-black uppercase mb-1 opacity-80">Seller mới</p>
                                    <h3 className="text-2xl font-black leading-tight">0 đồng phí<br />3 tháng đầu</h3>
                                </div>
                                <div className="absolute -bottom-10 -right-10 opacity-30 group-hover:scale-110 transition-transform duration-500">
                                    <Store size={120} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Flash Sale Section */}
                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-6">
                                <h2 className="text-3xl font-black italic tracking-tighter text-blue-800 flex items-center gap-3">
                                    <Bolt className="text-amber-500" fill="currentColor" /> FLASH SALE
                                </h2>
                                <div className="flex gap-2 font-mono">
                                    <span className="bg-gray-900 text-white px-2 py-1 rounded-lg font-black text-lg">02</span>
                                    <span className="text-gray-900 font-black text-lg">:</span>
                                    <span className="bg-gray-900 text-white px-2 py-1 rounded-lg font-black text-lg">47</span>
                                    <span className="text-gray-900 font-black text-lg">:</span>
                                    <span className="bg-gray-900 text-white px-2 py-1 rounded-lg font-black text-lg">33</span>
                                </div>
                            </div>
                            <button className="flex items-center gap-2 font-black text-sm text-blue-700 hover:gap-3 transition-all">
                                Xem tất cả <ChevronRight size={18} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="bg-white rounded-3xl p-4 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all border border-gray-50 flex flex-col group h-full">
                                    <div className="aspect-square bg-gray-100 rounded-2xl mb-4 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                                        {i === 1 ? '📱' : i === 2 ? '🎧' : i === 3 ? '👟' : i === 4 ? '🎒' : '🧴'}
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-xs font-black text-red-600 bg-red-50 w-fit px-2 py-0.5 rounded-full mb-2">-50%</p>
                                        <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight mb-2">Sản phẩm Flash Sale #{i}</h4>
                                        <p className="text-lg font-black text-blue-700">99.000đ</p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                                        <p className="text-[0.6rem] font-bold text-gray-400 uppercase tracking-tighter">Đã bán {i * 123}</p>
                                        <button onClick={addToCart} className="bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/20">
                                            <ShoppingCart size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Main Product Grid */}
                    <section>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                                <LayoutGrid className="text-blue-700" /> GỢI Ý HÔM NAY
                            </h2>
                            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                                {['Phổ biến', 'Bán chạy', 'Mới nhất', 'Giá tăng dần', 'Giá giảm dần'].map(filter => (
                                    <button key={filter} className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === 'Phổ biến' ? 'bg-blue-700 text-white shadow-lg shadow-blue-700/20' : 'bg-white border border-gray-100 text-gray-400 hover:border-blue-700 hover:text-blue-700'}`}>
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                            {MOCK_PRODUCTS.map(p => (
                                <div key={p.id} className="bg-white rounded-3xl p-5 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all border border-gray-50 flex flex-col group relative overflow-hidden">
                                    <div className="absolute top-4 right-4 z-10">
                                        <button
                                            onClick={() => toggleFavorite(p.id)}
                                            className={`p-2.5 rounded-full transition-all ${favorites[p.id] ? 'bg-red-50 text-red-600' : 'bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-500 shadow-lg'}`}
                                        >
                                            <Heart size={18} fill={favorites[p.id] ? "currentColor" : "none"} />
                                        </button>
                                    </div>
                                    <div className="aspect-[4/5] bg-gray-50 rounded-2xl mb-5 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500">
                                        {p.emoji}
                                    </div>
                                    <div className="flex-grow space-y-2">
                                        <p className="text-[0.65rem] font-black text-amber-600 uppercase tracking-widest bg-amber-50 w-fit px-2 py-0.5 rounded-md">Hot</p>
                                        <h4 className="text-[0.95rem] font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-700 transition-colors">{p.name}</h4>
                                        <div className="flex items-baseline gap-2 pt-1">
                                            <p className="text-xl font-black text-blue-700 tracking-tight">{p.price.toLocaleString()}đ</p>
                                            <p className="text-xs text-gray-400 line-through font-medium">{p.original.toLocaleString()}đ</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-5 border-t border-gray-50 flex flex-col gap-3">
                                        <div className="flex justify-between items-center text-[0.7rem] font-bold text-gray-400">
                                            <span className="flex items-center gap-1"><MapPin size={12} /> {p.location}</span>
                                            <span>Đã bán {p.sold}</span>
                                        </div>
                                        <button
                                            onClick={addToCart}
                                            className="w-full bg-gray-50 group-hover:bg-blue-700 text-gray-400 group-hover:text-white font-black py-3 rounded-xl transition-all shadow-sm hover:shadow-blue-700/20 active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            <ShoppingCart size={18} />
                                            THÊM VÀO GIỎ
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            {/* Soprise Footer */}
            <footer className="bg-white border-t pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-black text-sm italic">S</div>
                            <span className="font-extrabold text-blue-900 text-lg uppercase tracking-wider">Soprise — Tập đoàn Vạn Vật © 2026</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-bold text-gray-400 uppercase tracking-widest">
                            <a href="/van-vat-corporation/soprise/about" className="hover:text-blue-700 transition">Về Soprise</a>
                            <a href="/van-vat-corporation/soprise/seller" className="hover:text-blue-700 transition">Kênh người bán</a>
                            <a href="https://www.vanvatcorp.com/privacy-policy" className="hover:text-blue-700 transition">Bảo mật</a>
                            <a href="https://www.vanvatcorp.com/terms-of-service" className="hover:text-blue-700 transition">Điều khoản</a>
                        </div>
                    </div>
                    <div className="text-center pt-8 border-t border-gray-100">
                        <p className="text-xs font-medium text-gray-400 tracking-wide">Soprise là sản phẩm của Tập đoàn Vạn Vật. Mọi quyền được bảo lưu.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Soprise;
