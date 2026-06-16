import React, { useState } from 'react';
import {
    Search,
    ShoppingCart,
    Coins,
    ShieldCheck,
    Zap,
    Globe,
    Wallet,
    Cpu,
    MessageSquare,
    ChevronRight,
    ArrowRight
} from 'lucide-react';
import MaintenanceBanner from '../../components/common/MaintenanceBanner';

const Crypshop: React.FC = () => {
    const [email, setEmail] = useState('');

    const products = [
        {
            id: 1,
            name: "Smartphone Crypto Wallet",
            desc: "Thiết bị di động tích hợp ví tiền điện tử an toàn, dễ sử dụng.",
            price: "0.025 BTC",
            image: "https://storage.googleapis.com/a1aa/image/bc427cc7-7004-4cb8-43cc-4c5cd17d0b1a.jpg",
            tag: "Bán chạy"
        },
        {
            id: 2,
            name: "Gaming Laptop Crypto",
            desc: "Laptop hiệu năng cao hỗ trợ khai thác tiền điện tử hiệu quả.",
            price: "0.15 BTC",
            image: "https://storage.googleapis.com/a1aa/image/02e49bae-799d-49eb-5b19-63bb76ee67da.jpg",
            tag: "Hiệu năng cao"
        },
        {
            id: 3,
            name: "Hardware Crypto Wallet",
            desc: "Ví phần cứng bảo mật cao cấp, lưu trữ tiền điện tử an toàn.",
            price: "0.01 BTC",
            image: "https://storage.googleapis.com/a1aa/image/f9c18b7a-6c9c-42d5-c14b-ec454049749d.jpg",
            tag: "Bảo mật"
        },
        {
            id: 4,
            name: "Crypto Smartwatch",
            desc: "Đồng hồ thông minh theo dõi giá tiền điện tử và danh mục đầu tư.",
            price: "0.03 BTC",
            image: "https://storage.googleapis.com/a1aa/image/1bba70aa-c70a-4981-3380-33a9f252a422.jpg",
            tag: "Tiện ích"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-inter selection:bg-blue-600 selection:text-white">
            <MaintenanceBanner />

            {/* Premium Header */}
            <nav className="w-full bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-between h-20">
                        <a className="flex items-center gap-3 transition-transform hover:scale-105" href="/">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <Coins className="text-white" size={24} />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-xl font-black text-blue-900 tracking-tighter uppercase">CrypShop</span>
                                <span className="text-[0.6rem] font-black text-gray-400 uppercase tracking-[0.3em]">Corporation</span>
                            </div>
                        </a>

                        <div className="hidden lg:flex items-center gap-8 font-black text-[0.65rem] uppercase tracking-[0.2em] text-gray-500">
                            {['Sản phẩm', 'Cách hoạt động', 'Lợi ích', 'Đội ngũ'].map(item => (
                                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-blue-700 transition relative group">
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-700 transition-all group-hover:w-full"></span>
                                </a>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="p-3 text-gray-400 hover:text-blue-700 transition hover:bg-blue-50 rounded-2xl">
                                <Search size={20} />
                            </button>
                            <button className="p-3 text-gray-400 hover:text-blue-700 transition hover:bg-blue-50 rounded-2xl relative">
                                <ShoppingCart size={20} />
                                <span className="absolute top-2 right-2 w-4 h-4 bg-blue-700 text-[0.6rem] font-black text-white rounded-full flex items-center justify-center border-2 border-white">0</span>
                            </button>
                            <a href="/login" className="hidden md:flex bg-blue-700 text-white font-black px-6 py-3 rounded-2xl shadow-xl shadow-blue-700/20 hover:scale-105 active:scale-95 transition-all text-[0.65rem] uppercase tracking-widest">
                                Đăng nhập
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-white py-20 lg:py-32 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-20">
                    <div className="lg:w-1/2 space-y-10 animate-in slide-in-from-left duration-1000">
                        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-2xl">
                            <Zap size={14} className="text-blue-600 animate-pulse" />
                            <span className="text-[0.65rem] font-black text-blue-700 uppercase tracking-widest">Tiên phong E-commerce Crypto</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tighter">
                            Mua sắm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 italic">tương lai</span> với Crypto.
                        </h1>
                        <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-xl">
                            Vạn Vật CrypShop — Nền tảng thương mại điện tử đầu tiên tại Việt Nam hỗ trợ thanh toán trực tiếp bằng Bitcoin và các loại tiền điện tử hàng đầu.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <a href="#products" className="bg-blue-700 text-white font-black px-10 py-5 rounded-[2rem] shadow-2xl shadow-blue-700/30 hover:shadow-blue-700/50 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-sm flex items-center gap-3">
                                Mua sắm ngay <ChevronRight size={20} />
                            </a>
                            <a href="#how-it-works" className="bg-white border-2 border-gray-100 text-gray-900 font-black px-10 py-5 rounded-[2rem] hover:bg-gray-50 transition-all uppercase tracking-widest text-sm">
                                Tìm hiểu thêm
                            </a>
                        </div>
                    </div>
                    <div className="lg:w-1/2 relative animate-in zoom-in duration-1000">
                        <div className="absolute -inset-10 bg-gradient-to-br from-blue-700/20 to-transparent blur-3xl opacity-50 rounded-full"></div>
                        <div className="relative group">
                            <img alt="Crypto e-commerce"
                                className="w-full rounded-[3rem] shadow-2xl shadow-blue-900/10 border-4 border-white transition-transform group-hover:scale-[1.02] duration-500"
                                src="https://storage.googleapis.com/a1aa/image/86a7425d-2961-4fd7-18d4-37d9629a2d21.jpg" />
                            <div className="absolute top-10 -left-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/50 animate-bounce duration-[3s]">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-black">₿</div>
                                    <div>
                                        <p className="text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest">Giá Bitcoin</p>
                                        <p className="font-black text-emerald-600 tracking-tight">$68,432.12</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section id="sản-phẩm" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex items-end justify-between mb-16">
                        <div>
                            <p className="text-[0.65rem] font-black text-blue-700 uppercase tracking-[0.3em] mb-4">Danh mục</p>
                            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Sản phẩm nổi bật</h2>
                        </div>
                        <a href="#" className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-blue-700 transition uppercase tracking-widest group">
                            Tất cả sản phẩm <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map(p => (
                            <div key={p.id} className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 p-6 border border-gray-100/50 hover:scale-[1.03] transition-all group">
                                <div className="relative mb-6">
                                    <img src={p.image} alt={p.name} className="w-full h-56 object-cover rounded-3xl shadow-inner group-hover:rotate-1 transition-transform" />
                                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[0.6rem] font-black text-blue-700 uppercase tracking-widest shadow-lg">
                                        {p.tag}
                                    </span>
                                </div>
                                <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight leading-none">{p.name}</h3>
                                <p className="text-sm text-gray-500 font-medium mb-6 line-clamp-2">{p.desc}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <div>
                                        <p className="text-[0.6rem] font-black text-gray-400 uppercase tracking-widest">Giá Bitcoin</p>
                                        <p className="text-xl font-black text-blue-700 tracking-tighter">{p.price}</p>
                                    </div>
                                    <button className="bg-gray-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg shadow-gray-900/20 active:scale-90">
                                        <ShoppingCart size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Layer */}
            <section id="cách-hoạt-động" className="py-24 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <h2 className="text-4xl font-black text-center mb-20 tracking-tighter">Trải nghiệm mua sắm <span className="text-blue-700 italic">Crypto-first</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[40%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-100 to-transparent"></div>

                        {[
                            { icon: <Globe className="text-blue-600" size={32} />, title: "Đăng ký & Kết nối", text: "Tạo tài khoản và kết nối ví tiền điện tử của bạn cực kỳ nhanh chóng.", step: "01" },
                            { icon: <ShoppingCart className="text-indigo-600" size={32} />, title: "Chọn sản phẩm", text: "Duyệt qua danh mục công nghệ đa dạng hỗ trợ Web3 và Metaverse.", step: "02" },
                            { icon: <ShieldCheck className="text-emerald-600" size={32} />, title: "Thanh toán ẩn danh", text: "Thanh toán an toàn, minh bạch qua blockchain với phí giao dịch cực thấp.", step: "03" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center relative z-10 group">
                                <div className="w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-8 border border-gray-50 transform group-hover:-translate-y-2 transition-all">
                                    {item.icon}
                                    <span className="absolute -top-3 -right-3 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-[0.65rem] font-black">{item.step}</span>
                                </div>
                                <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-xs">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Value Proposition */}
            <section id="lợi-ích" className="py-24 bg-blue-700 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-800 skew-x-12 transform translate-x-20"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <h2 className="text-5xl font-black leading-tight tracking-tighter">Tại sao chọn CrypShop?</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {[
                                    { icon: <ShieldCheck size={24} />, title: "Bảo mật tuyệt đối", desc: "Mọi giao dịch đều được ghi lại trên sổ cái Blockchain không thể thay đổi." },
                                    { icon: <Globe size={24} />, title: "Quy mô Toàn cầu", desc: "Không giới hạn biên giới, chúng tôi hỗ trợ thanh toán từ mọi nơi." },
                                    { icon: <Zap size={24} />, title: "Tốc độ Tức thì", desc: "Mạng lưới Layer-2 giúp xác nhận giao dịch trong vài giây." },
                                    { icon: <Wallet size={24} />, title: "Ví Web3 Sẵn sàng", desc: "Tương thích hoàn hảo với Metamask, TrustWallet và nhiều ví khác." }
                                ].map((benefit, i) => (
                                    <div key={i} className="space-y-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                                            {benefit.icon}
                                        </div>
                                        <h4 className="text-lg font-black tracking-tight">{benefit.title}</h4>
                                        <p className="text-sm text-blue-100 opacity-80 leading-relaxed">{benefit.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10">
                            <div className="flex items-center gap-4 mb-10">
                                <Cpu className="text-white" size={40} />
                                <h3 className="text-2xl font-black tracking-tight">Hạ tầng Blockchain độc quyền</h3>
                            </div>
                            <div className="space-y-6">
                                <div className="h-64 bg-gray-900 rounded-3xl shadow-inner relative overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
                                    <div className="grid grid-cols-4 gap-2 opacity-30">
                                        {[...Array(16)].map((_, i) => (
                                            <div key={i} className="w-8 h-8 bg-blue-400 rounded-lg animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                                        ))}
                                    </div>
                                    <p className="relative z-10 text-[0.65rem] font-black uppercase tracking-[0.4em] text-blue-400">Network Validating...</p>
                                </div>
                                <div className="flex justify-between items-center bg-white/10 p-5 rounded-2xl">
                                    <span className="text-xs font-black uppercase tracking-widest">Active nodes</span>
                                    <span className="text-emerald-400 font-black">12,543 Online</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="bg-gray-900 rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                        <div className="relative z-10 max-w-2xl mx-auto space-y-10">
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Sẵn sàng bước vào <br /> kỷ nguyên Web3?</h2>
                            <p className="text-gray-400 font-medium">Để lại email để nhận thông tin về các bộ sưu tập giới hạn và mã giảm giá khi thanh toán bằng CrypCoin.</p>
                            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-grow bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-700 transition"
                                />
                                <button className="bg-white text-gray-900 font-black px-8 py-4 rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest">
                                    Tham gia
                                </button>
                            </form>
                        </div>
                        {/* Decorative Icons */}
                        <div className="absolute -bottom-10 -left-10 text-white/5 rotate-12">
                            <Coins size={300} fill="currentColor" />
                        </div>
                        <div className="absolute top-0 -right-10 text-white/5 -rotate-12">
                            <Globe size={240} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-50 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b pb-16 mb-12">
                        <div className="space-y-6">
                            <a className="flex items-center gap-3" href="/">
                                <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-black text-xs">C</div>
                                <span className="text-xl font-black text-gray-900 tracking-tighter uppercase">CrypShop</span>
                            </a>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">Nền tảng thương mại điện tử đột phá, nơi công nghệ blockchain phục vụ nhu cầu mua sắm thực tế của mọi người.</p>
                        </div>
                        <div>
                            <h4 className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-gray-900 mb-8">Hỗ trợ</h4>
                            <ul className="space-y-4 text-sm font-bold text-gray-500">
                                {['Trung tâm trợ giúp', 'Thanh toán Crypto', 'Chính sách vận chuyển', 'Hoàn tiền'].map(item => (
                                    <li key={item} className="hover:text-blue-700 cursor-pointer transition">{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-gray-900 mb-8">Páp lý</h4>
                            <ul className="space-y-4 text-sm font-bold text-gray-500">
                                {['Điều khoản dịch vụ', 'Chính sách bảo mật', 'Xử lý dữ liệu', 'Cookies'].map(item => (
                                    <li key={item} className="hover:text-blue-700 cursor-pointer transition">{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-gray-900 mb-8">Liên hệ</h4>
                            <div className="flex items-center gap-4">
                                <button className="w-12 h-12 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-700 transition">
                                    <MessageSquare size={20} />
                                </button>
                                <p className="text-sm font-black text-gray-900 uppercase tracking-widest">Chat với AI ngay</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-[0.65rem] font-black text-gray-400 uppercase tracking-widest">© 2026 VanVat Corporation. Modernized with excellence.</p>
                        <div className="flex gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-5 h-5 bg-gray-200 rounded-full"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Crypshop;
