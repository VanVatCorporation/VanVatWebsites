import React from 'react';
import {
    Coins,
    ShieldAlert,
    Zap,
    Info,
    ArrowRight,
    Globe,
    Lock,
    Users,
    Activity
} from 'lucide-react';
import MaintenanceBanner from '../../components/common/MaintenanceBanner';

const Cryptocurrencies: React.FC = () => {
    const tokens = [
        {
            id: 'vanvat',
            symbol: 'VANVAT',
            name: 'Centralized Utility Token',
            desc: 'A centralize token in the decentralize world that aims to maximize user benefit. We currently airdrop and give user rewards using this token.',
            icon: <Activity className="text-blue-600" size={32} />,
            bg: 'bg-blue-50',
            border: 'border-blue-100',
            features: ['Quản lý tập trung', 'Phần thưởng hệ sinh thái', 'Airdrop định kỳ'],
            stats: { supply: 'Tối đa 1 tỷ', holders: '5,400+', status: 'Đang hoạt động' }
        },
        {
            id: 'vava',
            symbol: 'VAVA',
            name: 'Standard Governance Token',
            desc: 'A normal decentralize token. Like any other token. It serves as the primary governance unit for the Vạn Vật DAO and future voting protocols.',
            icon: <Zap className="text-amber-600" size={32} />,
            bg: 'bg-amber-50',
            border: 'border-amber-100',
            features: ['Quản trị DAO', 'Cung cấp thanh khoản', 'Phí giao dịch thấp'],
            stats: { supply: 'Tối đa 500 triệu', holders: '2,100+', status: 'Beta' }
        },
        {
            id: 'fdvava',
            symbol: 'FDVAVA',
            name: 'Fully Decentralized VAVA',
            desc: 'A token that technically user-based and user have full control over it. User can burn, mint, even transfer the token from another user without consent.',
            icon: <ShieldAlert className="text-red-600" size={32} />,
            bg: 'bg-red-50',
            border: 'border-red-100',
            warning: 'Not recommended as an investment. You technically have no ownership!',
            features: ['Phân quyền tuyệt đối', 'Tự do Mint/Burn', 'Thử nghiệm xã hội'],
            stats: { supply: 'Không xác định', holders: '900+', status: 'Thử nghiệm' }
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-inter selection:bg-blue-600 selection:text-white">
            <MaintenanceBanner />

            {/* Header */}
            <nav className="w-full bg-white border-b h-20 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-50 backdrop-blur-md bg-white/90">
                <a className="flex items-center gap-3 transition-transform hover:scale-105" href="/">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Coins className="text-white" size={24} />
                    </div>
                    <span className="text-xl font-black text-blue-900 tracking-tighter uppercase">Cryptocurrencies</span>
                </a>
                <div className="flex gap-4">
                    <a href="/van-vat-corporation/contact-us" className="text-xs font-black text-gray-500 hover:text-blue-700 uppercase tracking-widest transition">Hỗ trợ</a>
                    <a href="/van-vat-corporation/crypshop" className="bg-blue-700 text-white font-black px-6 py-2.5 rounded-xl shadow-lg shadow-blue-700/20 text-[0.65rem] uppercase tracking-widest hover:scale-105 transition-all">Sử dụng Token</a>
                </div>
            </nav>

            <main className="flex-grow pt-16">
                {/* Hero Section */}
                <section className="bg-white py-24 border-b">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center space-y-8 animate-in fade-in slide-in-from-top-10 duration-1000">
                        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-2xl">
                            <Info size={14} className="text-blue-600" />
                            <span className="text-[0.65rem] font-black text-blue-700 uppercase tracking-widest">Hệ sinh thái tiền điện tử Vạn Vật</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tighter max-w-4xl mx-auto">
                            Tiềm năng phát triển <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">không ngừng nghỉ.</span>
                        </h1>
                        <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
                            Chúng tôi hứa hẹn cung cấp các thể loại dịch vụ từ trực tiếp đến trực tuyến, mang đến cho khách hàng một trải nghiệm tốt nhất chưa từng có thông qua hệ thống token đa dạng.
                        </p>
                    </div>
                </section>

                {/* Tokens Grid */}
                <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {tokens.map(token => (
                            <div key={token.id} className={`flex flex-col bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border ${token.border} p-8 lg:p-10 transition-all hover:scale-[1.02] duration-300 relative overflow-hidden group`}>
                                {/* Floating Background Icon */}
                                <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity rotate-12 group-hover:rotate-45 duration-700">
                                    {React.cloneElement(token.icon as React.ReactElement<any>, { size: 240 })}
                                </div>

                                <div className={`${token.bg} w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-inner`}>
                                    {token.icon}
                                </div>

                                <div className="mb-8">
                                    <h3 className="text-3xl font-black text-gray-900 tracking-tighter mb-1">{token.symbol}</h3>
                                    <p className="text-[0.65rem] font-black text-gray-400 uppercase tracking-widest">{token.name}</p>
                                </div>

                                <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8">
                                    {token.desc}
                                </p>

                                {token.warning && (
                                    <div className="bg-red-50 border border-red-100 p-4 rounded-2xl mb-8 flex items-start gap-3">
                                        <ShieldAlert size={18} className="text-red-500 flex-shrink-0" />
                                        <p className="text-[0.65rem] font-bold text-red-700 leading-normal">{token.warning}</p>
                                    </div>
                                )}

                                <div className="space-y-4 mb-10">
                                    {token.features.map(f => (
                                        <div key={f} className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                                            <span className="text-xs font-bold text-gray-600">{f}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto pt-8 border-t border-gray-50 grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <p className="text-[0.55rem] font-black text-gray-300 uppercase tracking-widest mb-1">Cung ứng</p>
                                        <p className="text-xs font-black text-gray-900">{token.stats.supply}</p>
                                    </div>
                                    <div className="border-l border-gray-50">
                                        <p className="text-[0.55rem] font-black text-gray-300 uppercase tracking-widest mb-1">Trạng thái</p>
                                        <p className="text-xs font-black text-blue-700">{token.stats.status}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Ecosystem Section */}
                <section className="bg-gray-900 py-24 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-20">
                        <div className="lg:w-1/2 relative">
                            <div className="absolute inset-0 bg-blue-500/20 blur-[120px] rounded-full"></div>
                            <img alt="Blockchain visualization"
                                className="w-full rounded-[3rem] opacity-80"
                                src="https://storage.googleapis.com/a1aa/image/fe047c91-b3de-4005-a9b4-2f0abae4e70c.jpg" />
                        </div>
                        <div className="lg:w-1/2 space-y-12 z-10 text-white">
                            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter leading-tight">Mở rộng trải nghiệm <br /> <span className="text-blue-400 italic">của bạn.</span></h2>
                            <div className="space-y-8">
                                {[
                                    { icon: <Globe size={20} />, title: "Khả năng tương tác cao", desc: "Sử dụng token Vạn Vật trên toàn bộ hệ sinh thái từ CryptoShop đến Dịch vụ trực tuyến." },
                                    { icon: <Lock size={20} />, title: "Bảo mật phi tập trung", desc: "Công nghệ blockchain đảm bảo quyền sở hữu và tính minh bạch tuyệt đối." },
                                    { icon: <Users size={20} />, title: "Cộng đồng là trung tâm", desc: "Tham gia bỏ phiếu và định hướng phát triển tập đoàn thông qua token VAVA." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:bg-blue-600 transition-colors">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black mb-2 tracking-tight">{item.title}</h4>
                                            <p className="text-sm text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-32 bg-white text-center">
                    <div className="max-w-3xl mx-auto px-6 lg:px-12 space-y-10">
                        <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-tight">Khám phá tiềm năng <br /> tài chính tương lai ngay hôm nay.</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="bg-blue-700 text-white font-black px-10 py-5 rounded-[2rem] shadow-2xl shadow-blue-700/30 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-sm flex items-center gap-3">
                                Nhận Token Miễn Phí <ArrowRight size={20} />
                            </button>
                            <a href="/van-vat-corporation/crypshop" className="bg-gray-100 text-gray-900 font-black px-10 py-5 rounded-[2rem] hover:bg-gray-200 transition-all uppercase tracking-widest text-sm">
                                Đến CrypShop
                            </a>
                        </div>
                        <p className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest">Yêu cầu tài khoản Vạn Vật để tham gia Airdrop</p>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-500 py-12 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-black text-xs">V</div>
                        <p className="text-xs font-black uppercase tracking-widest opacity-60">© 2026 VanVat Corporation. Distributed Ledger Technology.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 text-[0.6rem] font-black uppercase tracking-widest">
                        <a className="hover:text-white transition" href="/privacy-policy">Bảo mật</a>
                        <a className="hover:text-white transition" href="/terms-of-service">Điều khoản</a>
                        <a className="hover:text-white transition" href="/sitemap">Sitemap</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Cryptocurrencies;
