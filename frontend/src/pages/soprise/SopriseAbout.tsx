import React from 'react';
import MaintenanceBanner from '../../components/common/MaintenanceBanner';
import {
    Store,
    Zap,
    ShieldCheck,
    Headset,
    Rocket,
    Users,
    Check,
    X,
    ArrowRight,
    PlayCircle,
    TrendingUp,
    HeartHandshake
} from 'lucide-react';

const SopriseAbout: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col font-inter selection:bg-blue-600 selection:text-white">
            <MaintenanceBanner />

            {/* Navbar */}
            <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 z-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
                    <a className="flex items-center gap-2" href="/van-vat-corporation/soprise">
                        <div className="w-9 h-9 bg-blue-700 rounded-xl flex items-center justify-center text-white font-black italic text-lg shadow-lg shadow-blue-700/20">S</div>
                        <span className="text-2xl font-black text-blue-900 tracking-tighter">Sop<span className="text-indigo-600 italic">rise</span></span>
                    </a>
                    <div className="hidden lg:flex items-center gap-10">
                        {["Tính năng", "So sánh", "Quy trình", "Đánh giá"].map((item, i) => (
                            <a key={i} href={`#${item}`} className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-blue-700 transition">{item}</a>
                        ))}
                    </div>
                    <a href="/van-vat-corporation/soprise/seller/register" className="bg-blue-700 text-white px-6 py-3 rounded-2xl text-[0.65rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-700/20">Bán hàng ngay</a>
                </div>
            </nav>

            <main className="flex-grow pt-20">
                {/* Hero Section */}
                <section className="relative h-[800px] flex items-center justify-center overflow-hidden bg-gray-50">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-[0.6rem] font-black uppercase tracking-widest mb-8 border border-blue-100">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                            Sàn thương mại công bằng nhất Việt Nam
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter mb-8 leading-[0.9]">
                            Vươn lên cùng<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 italic">Soprise</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 font-medium mb-12 leading-relaxed">
                            Chúng tôi tin rằng người bán xứng đáng được đối xử công bằng.
                            Không phí ẩn, không bất ngờ — chỉ có tăng trưởng thật sự.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button className="group bg-gray-900 text-white px-10 py-5 rounded-[2rem] text-sm font-black uppercase tracking-widest hover:bg-black transition-all shadow-2xl flex items-center gap-3">
                                <Store size={20} /> Đăng ký bán hàng
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                            </button>
                            <button className="flex items-center gap-3 px-10 py-5 rounded-[2rem] text-sm font-black uppercase tracking-widest text-gray-600 hover:bg-gray-100 transition-all">
                                <PlayCircle size={22} className="text-blue-700" /> Khám phá thêm
                            </button>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-24 border-t border-gray-100 pt-16">
                            {[
                                { val: "0%", label: "Phí ẩn", icon: ShieldCheck },
                                { val: "+500", label: "Danh mục", icon: Zap },
                                { val: "24/7", label: "Hỗ trợ", icon: Headset },
                                { val: "100%", label: "Minh bạch", icon: HeartHandshake }
                            ].map((s, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex items-center justify-center gap-2 text-blue-700">
                                        <s.icon size={20} />
                                        <span className="text-3xl font-black tracking-tighter text-gray-900">{s.val}</span>
                                    </div>
                                    <p className="text-[0.65rem] font-black uppercase tracking-widest text-gray-400">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="Tính năng" className="py-32 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-24 max-w-3xl mx-auto space-y-4">
                            <span className="text-blue-700 font-black text-xs uppercase tracking-[0.3em]">Mọi thứ bạn cần</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Hỗ trợ tối đa cho gian hàng</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Phí minh bạch", desc: "Mọi khoản phí đều được công khai rõ ràng trước khi bạn đăng ký.", icon: Zap },
                                { title: "Tăng trưởng thật", desc: "Phân tích bán hàng chi tiết, gợi ý tối ưu và hỗ trợ tiếp thị.", icon: TrendingUp },
                                { title: "Bảo vệ kép", desc: "Chính sách hoàn trả công bằng cho cả người mua và người bán.", icon: ShieldCheck },
                                { title: "Hỗ trợ 24/7", desc: "Đội ngũ chuyên biệt giải quyết vấn đề bằng con người thật.", icon: Headset },
                                { title: "Lên sàn nhanh", desc: "Từ đăng ký đến gian hàng hoạt động chỉ trong 30 phút.", icon: Rocket },
                                { title: "Cộng đồng", desc: "Tham gia mạng lưới người bán chuyên nghiệp để cùng phát triển.", icon: Users }
                            ].map((f, i) => (
                                <div key={i} className="group p-10 rounded-[3rem] bg-gray-50 border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 transition-all">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-700 shadow-sm mb-8 group-hover:bg-blue-700 group-hover:text-white transition-all">
                                        <f.icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 mb-4">{f.title}</h3>
                                    <p className="text-gray-500 font-medium leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Comparison Table */}
                <section id="So sánh" className="py-32 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-8">Người bán xứng đáng được đối xử tốt hơn.</h2>
                                <p className="text-lg text-gray-500 font-medium leading-relaxed mb-8">
                                    Chúng tôi thấy điều gì đó không ổn trên thị trường hiện nay. Các sàn lớn hứa hẹn công bằng nhưng rồi tăng phí và bỏ mặc người bán.
                                </p>
                                <div className="p-8 bg-blue-700 text-white rounded-[2.5rem] shadow-2xl shadow-blue-700/20">
                                    <p className="text-lg font-bold italic leading-relaxed">
                                        "Soprise cam kết không tăng phí hoa hồng quá 15% trong 3 năm đầu, và mọi thay đổi sẽ thông báo trước ít nhất 60 ngày."
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 border border-gray-100 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[5rem]"></div>
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-50">
                                            <th className="pb-6 text-[0.65rem] font-black uppercase tracking-widest text-gray-400">Tiêu chí</th>
                                            <th className="pb-6 text-[0.65rem] font-black uppercase tracking-widest text-gray-400 text-center">Sàn khác</th>
                                            <th className="pb-6 text-[0.65rem] font-black uppercase tracking-widest text-blue-700 text-center">Soprise</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {[
                                            { label: "Phí hoa hồng", other: false, soprise: true, desc: "Cố định, rõ ràng" },
                                            { label: "Phí ẩn", other: false, soprise: true, desc: "Không có" },
                                            { label: "Hỗ trợ seller", other: "Hạn chế", soprise: true, desc: "Chuyên biệt 24/7" },
                                            { label: "Báo trước đổi CS", other: false, soprise: true, desc: "Báo trước 60 ngày" },
                                            { label: "Dữ liệu người bán", other: "Sàn sở hữu", soprise: true, desc: "Bạn sở hữu" }
                                        ].map((row, i) => (
                                            <tr key={i}>
                                                <td className="py-6 font-black text-sm text-gray-900">{row.label}</td>
                                                <td className="py-6 text-center">
                                                    <div className="flex items-center justify-center text-red-400">
                                                        {typeof row.other === 'boolean' ? <X size={20} /> : <span className="text-[0.65rem] font-black uppercase tracking-widest">{row.other}</span>}
                                                    </div>
                                                </td>
                                                <td className="py-6 text-center">
                                                    <div className="flex flex-col items-center gap-1 text-emerald-500">
                                                        <Check size={20} strokeWidth={3} />
                                                        <span className="text-[0.6rem] font-black uppercase tracking-widest text-gray-400">{row.desc}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Steps Section */}
                <section id="Quy trình" className="py-32 bg-white">
                    <div className="container mx-auto px-6 text-center">
                        <div className="mb-24 space-y-4">
                            <span className="text-blue-700 font-black text-xs uppercase tracking-[0.3em]">Chỉ 3 bước</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Bắt đầu vươn lên</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                            {/* Connector line */}
                            <div className="hidden lg:block absolute top-10 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-gray-100 z-0"></div>

                            {[
                                { step: 1, title: "Đăng ký", desc: "Tạo tài khoản miễn phí chỉ với email và SĐT. Xác minh nhanh gọn." },
                                { step: 2, title: "Đăng sản phẩm", desc: "Tải ảnh, đặt giá. Công cụ AI gợi ý tối ưu và làm nổi bật sản phẩm." },
                                { step: 3, title: "Vươn lên", desc: "Nhận đơn, xử lý giao vận và theo dõi doanh thu theo thời gian thực." }
                            ].map((s, i) => (
                                <div key={i} className="relative z-10 space-y-8">
                                    <div className="w-20 h-20 bg-blue-700 text-white rounded-[2rem] flex items-center justify-center text-2xl font-black mx-auto shadow-2xl shadow-blue-700/30">
                                        {s.step}
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-black text-gray-900 tracking-tight">{s.title}</h3>
                                        <p className="text-gray-500 font-medium leading-relaxed max-w-[280px] mx-auto">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section id="final-cta" className="py-32 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="bg-gradient-to-br from-blue-700 to-indigo-900 p-16 md:p-24 rounded-[4rem] text-white text-center relative overflow-hidden shadow-3xl">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                            <div className="relative z-10 space-y-10">
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                                    Sẵn sàng vươn lên<br />
                                    <span className="text-blue-200">cùng Soprise?</span>
                                </h2>
                                <p className="text-xl text-blue-100/70 font-medium max-w-2xl mx-auto italic">
                                    Đăng ký miễn phí hôm nay. Không cần thẻ tín dụng. Không cam kết dài hạn.
                                    Chỉ cần bạn và tâm huyết của bạn.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                                    <button className="bg-white text-blue-900 px-12 py-5 rounded-[2rem] text-[0.85rem] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-2xl">
                                        Đăng ký miễn phí ngay
                                    </button>
                                    <button className="px-12 py-5 rounded-[2rem] text-[0.85rem] font-black uppercase tracking-[0.2em] border border-white/20 hover:bg-white/10 transition-all">
                                        Tìm hiểu về Vạn Vật
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-50 border-t py-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
                    <div className="col-span-1 md:col-span-2 space-y-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-black italic shadow-lg shadow-blue-700/20">S</div>
                            <span className="text-xl font-black text-blue-900 tracking-tighter">Sop<span className="text-indigo-600 italic">rise</span></span>
                        </div>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest leading-loose">
                            Một sản phẩm tinh hoa thuộc hệ sinh thái của Tập đoàn Vạn Vật.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <p className="text-[0.65rem] font-black text-blue-700 uppercase tracking-widest">Pháp lý</p>
                        <div className="flex flex-col gap-4 text-sm font-black text-gray-400 uppercase tracking-widest">
                            <a href="/privacy-policy" className="hover:text-blue-700 transition">Bảo mật</a>
                            <a href="/terms-of-service" className="hover:text-blue-700 transition">Điều khoản</a>
                        </div>
                    </div>
                    <div className="space-y-6 text-right">
                        <p className="text-[0.65rem] font-black text-blue-700 uppercase tracking-widest">Liên hệ</p>
                        <p className="text-sm font-black text-gray-900">+84 327 777 596</p>
                        <p className="text-[0.6rem] font-black text-gray-400 uppercase tracking-widest leading-loose">
                            © 2026 VanVat Corporation.<br />All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SopriseAbout;
