import React, { useState } from 'react';
import {
    HelpCircle,
    Eye,
    EyeOff,
    QrCode,
    RefreshCw,
    Loader2
} from 'lucide-react';
import MaintenanceBanner from '../../../components/common/MaintenanceBanner';

const SopriseSellerLogin: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'pass' | 'qr'>('pass');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-inter">
            <MaintenanceBanner />

            {/* Top Bar */}
            <header className="bg-white border-b h-16 flex items-center justify-between px-6 md:px-12">
                <a href="/van-vat-corporation/soprise" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-black text-sm italic">S</div>
                    <span className="text-xl font-black text-blue-900 tracking-tighter">Sop<span className="text-indigo-600 italic">rise</span></span>
                    <span className="h-4 w-[1px] bg-gray-200 mx-2"></span>
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Kênh Người Bán</span>
                </a>
                <button className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-blue-700 transition">
                    <HelpCircle size={16} /> Bạn cần giúp đỡ?
                </button>
            </header>

            <main className="flex-grow flex flex-col lg:flex-row shadow-2xl">

                {/* Left: Pitch */}
                <div className="lg:w-1/2 bg-gradient-to-br from-blue-700 to-indigo-900 p-12 lg:p-24 text-white flex flex-col justify-center relative overflow-hidden">
                    <div className="relative z-10 max-w-lg">
                        <div className="bg-blue-600/30 w-fit px-3 py-1 rounded-full text-[0.65rem] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2 border border-blue-400/20 backdrop-blur-md">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
                            Dành cho người bán
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-6 tracking-tighter">
                            Bán hàng chuyên nghiệp.<br />
                            <span className="text-blue-200">Không phí bất ngờ.</span>
                        </h1>
                        <p className="text-lg text-blue-100/80 font-medium mb-12 leading-relaxed">
                            Quản lý gian hàng của bạn một cách hiệu quả trên Soprise — sàn thương mại công bằng nhất Việt Nam.
                        </p>

                        <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-12">
                            <div>
                                <p className="text-3xl font-black text-white mb-1 tracking-tighter">0%</p>
                                <p className="text-[0.65rem] font-black text-blue-200 uppercase tracking-widest">Phí ẩn</p>
                            </div>
                            <div className="border-l border-white/10 pl-8">
                                <p className="text-3xl font-black text-white mb-1 tracking-tighter">24/7</p>
                                <p className="text-[0.65rem] font-black text-blue-200 uppercase tracking-widest">Hỗ trợ seller</p>
                            </div>
                            <div className="border-l border-white/10 pl-8">
                                <p className="text-3xl font-black text-white mb-1 tracking-tighter">30'</p>
                                <p className="text-[0.65rem] font-black text-blue-200 uppercase tracking-widest">Lên sàn ngay</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Background Elements */}
                    <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-20 -left-20 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl"></div>
                </div>

                {/* Right: Login Card */}
                <div className="lg:w-1/2 flex items-center justify-center p-6 bg-white">
                    <div className="w-full max-w-[480px] bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 p-8 md:p-12 border border-gray-100 transition-all hover:shadow-blue-900/15">

                        {/* Tabs */}
                        <div className="flex bg-gray-50 p-1.5 rounded-2xl mb-10">
                            <button
                                onClick={() => setActiveTab('pass')}
                                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'pass' ? 'bg-white text-blue-700 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                Đăng nhập
                            </button>
                            <button
                                onClick={() => setActiveTab('qr')}
                                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'qr' ? 'bg-white text-blue-700 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <QrCode size={16} /> Mã QR
                            </button>
                        </div>

                        {activeTab === 'pass' ? (
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[0.65rem] font-black text-gray-400 uppercase tracking-widest pl-1">Email / SĐT / Tên đăng nhập</label>
                                    <input
                                        type="text" required placeholder="Nhập định danh của bạn"
                                        className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-700 rounded-2xl px-5 py-4 outline-none transition-all font-medium text-gray-900"
                                    />
                                </div>

                                <div className="space-y-2 relative">
                                    <label className="text-[0.65rem] font-black text-gray-400 uppercase tracking-widest pl-1">Mật khẩu</label>
                                    <div className="relative group">
                                        <input
                                            type={showPassword ? "text" : "password"} required placeholder="••••••••"
                                            className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-700 rounded-2xl px-5 py-4 outline-none transition-all font-bold text-gray-900 pr-14 underline-offset-8"
                                        />
                                        <button
                                            type="button" onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-blue-700 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit" disabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-black py-5 rounded-2xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all active:scale-[0.98] mt-4 uppercase tracking-[0.2em] text-sm disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="animate-spin h-6 w-6 mx-auto" /> : "Đăng nhập"}
                                </button>

                                <div className="text-center">
                                    <a href="#" className="text-[0.7rem] font-black text-gray-400 uppercase tracking-widest hover:text-blue-700 transition">Quên mật khẩu?</a>
                                </div>

                                <div className="flex items-center gap-4 py-2">
                                    <div className="h-[1px] bg-gray-100 flex-grow"></div>
                                    <span className="text-[0.6rem] font-black text-gray-300 uppercase tracking-[0.3em]">Hoặc</span>
                                    <div className="h-[1px] bg-gray-100 flex-grow"></div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button type="button" className="flex items-center justify-center gap-2 py-4 border border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition active:scale-95">
                                        <svg width="18" height="18" fill="#1877f2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> Facebook
                                    </button>
                                    <button type="button" className="flex items-center justify-center gap-2 py-4 border border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition active:scale-95">
                                        <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" /><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" /><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" /><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" /></svg>
                                        Google
                                    </button>
                                </div>

                                <p className="text-[0.65rem] text-center text-gray-400 font-medium px-4">
                                    Bằng việc đăng nhập, bạn đồng ý với <a href="#" className="font-bold text-blue-700 underline underline-offset-2">Điều khoản dịch vụ</a> & <a href="#" className="font-bold text-blue-700 underline underline-offset-2">Chính sách bảo mật</a> của Soprise
                                </p>

                                <div className="pt-6 border-t border-gray-50 text-center">
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                                        Bạn mới biết đến Soprise? <a href="#" className="text-blue-700 border-b-2 border-blue-700 pb-0.5 ml-1">Đăng ký ngay</a>
                                    </p>
                                </div>
                            </form>
                        ) : (
                            <div className="flex flex-col items-center py-4">
                                <div className="relative group cursor-pointer p-4 bg-white border-2 border-dashed border-gray-200 rounded-3xl mb-8 group">
                                    <div className="w-48 h-48 bg-gray-50 flex items-center justify-center rounded-2xl shadow-inner relative overflow-hidden">
                                        <QrCode size={120} className="text-gray-200 group-hover:text-blue-700 transition-colors" />
                                        <div className="absolute inset-0 bg-blue-700/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-[0.6rem] font-black text-blue-700 uppercase tracking-widest bg-white px-3 py-1.5 rounded-full shadow-lg">Refresh QR</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-gray-600 text-center max-w-[240px] leading-relaxed mb-10">
                                    Quét mã bằng ứng dụng Soprise để đăng nhập cực nhanh
                                </p>
                                <button className="flex items-center gap-2 text-xs font-black text-blue-700 uppercase tracking-[0.2em] hover:gap-3 transition-all">
                                    <RefreshCw size={14} /> Làm mới mã
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
};

export default SopriseSellerLogin;
