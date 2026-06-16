import React from 'react';
import MaintenanceBanner from '../../components/common/MaintenanceBanner';
import {
    Stethoscope,
    HeartPulse,
    ArrowRight,
    Star,
    Sparkles,
    Activity,
    ClipboardList
} from 'lucide-react';

const VanVatHealthcare: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col font-inter selection:bg-rose-600 selection:text-white">
            <MaintenanceBanner />

            {/* Navbar */}
            <nav className="w-full h-20 flex items-center justify-between px-6 md:px-12 fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md border-b">
                <a className="flex items-center gap-2" href="/">
                    <div className="w-9 h-9 bg-rose-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <HeartPulse size={20} />
                    </div>
                    <span className="text-xl font-black text-rose-900 tracking-tighter">VanVat <span className="text-gray-900 italic">Healthcare</span></span>
                </a>
                <div className="hidden lg:flex items-center gap-10">
                    {["Dịch vụ", "Chuyên gia", "Bệnh viện", "Sức khỏe số"].map((item, i) => (
                        <a key={i} href="#" className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-rose-600 transition">{item}</a>
                    ))}
                </div>
                <button className="bg-rose-600 text-white px-8 py-3 rounded-2xl text-[0.65rem] font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-xl shadow-rose-600/20">Hẹn lịch ngay</button>
            </nav>

            <main className="flex-grow pt-20">
                {/* Hero */}
                <section className="relative py-24 md:py-32 overflow-hidden bg-rose-50/30">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-600/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/2"></div>

                    <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10">
                            <div className="inline-flex items-center gap-3 px-5 py-2 bg-rose-100/50 text-rose-700 rounded-full border border-rose-200">
                                <Sparkles size={16} />
                                <span className="text-[0.65rem] font-black uppercase tracking-[0.2em]">Tận tâm vì nụ cười của bạn</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9]">
                                Sức khỏe là<br />
                                <span className="text-rose-600 italic">Gốc rễ.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
                                Hệ sinh thái chăm sóc sức khỏe toàn diện từ Vạn Vật Corporation. Kết nối công nghệ và y đức để mang lại cuộc sống hạnh phúc.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <button className="group bg-rose-600 text-white px-10 py-5 rounded-[2rem] text-sm font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-2xl shadow-rose-600/30 flex items-center justify-center gap-4">
                                    Tìm kiếm dịch vụ <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </button>
                                <button className="flex items-center justify-center gap-4 px-10 py-5 rounded-[2rem] text-sm font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all">
                                    <Activity size={24} className="text-rose-600" /> Hồ sơ sức khỏe
                                </button>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-rose-600/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative bg-white p-6 rounded-[4rem] shadow-3xl border border-gray-100 overflow-hidden">
                                <img alt="Healthcare" className="rounded-[3rem] w-full grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" src="https://storage.googleapis.com/a1aa/image/331a9805-4e78-43e6-a232-a7d50a266205.jpg" />
                                <div className="absolute bottom-12 right-12 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/50 space-y-2">
                                    <div className="flex gap-1 text-amber-500">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                                    </div>
                                    <p className="text-sm font-bold text-gray-900">"Dịch vụ tận tâm & hiện đại"</p>
                                    <p className="text-[0.6rem] font-black text-gray-400 uppercase tracking-widest">— Sophia Nguyễn</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sub-services Grid */}
                <section className="py-32 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-24 space-y-4">
                            <span className="text-rose-600 font-black text-xs uppercase tracking-[0.3em]">Hệ sinh thái Healthcare</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Dịch vụ chuyên biệt</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {[
                                {
                                    name: "Vạn Vật Nha Khoa",
                                    desc: "Chăm sóc và thẩm mỹ răng miệng tiêu chuẩn quốc tế với công nghệ Smile-Design.",
                                    icon: Stethoscope,
                                    tags: ["Kỹ thuật cao", "Máy móc hiện đại"]
                                },
                                {
                                    name: "Vạn Vật Khám Bệnh",
                                    desc: "Hệ thống phòng khám đa khoa hiện đại, quy trình chuyên nghiệp và nhanh chóng.",
                                    icon: ClipboardList,
                                    tags: ["Đặt lịch nhanh", "Đội ngũ chuyên gia"]
                                },
                                {
                                    name: "Sức Khỏe Số",
                                    desc: "Tư vấn sức khỏe trực tuyến và quản lý hồ sơ bệnh án bằng AI và Blockchain.",
                                    icon: Activity,
                                    tags: ["Trực tuyến 24/7", "Bảo mật tuyệt đối"]
                                }
                            ].map((s, i) => (
                                <div key={i} className="group p-10 bg-gray-50 rounded-[3rem] border border-transparent hover:border-rose-100 hover:bg-white hover:shadow-2xl hover:shadow-rose-900/5 transition-all flex flex-col justify-between h-[420px]">
                                    <div className="space-y-8">
                                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-rose-600 shadow-sm group-hover:bg-rose-600 group-hover:text-white transition-all transform group-hover:-rotate-6">
                                            <s.icon size={32} />
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-2xl font-black text-gray-900 group-hover:text-rose-600 transition-colors uppercase tracking-tight">{s.name}</h3>
                                            <p className="text-gray-500 font-medium leading-relaxed">{s.desc}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex flex-wrap gap-3">
                                            {s.tags.map((tag, j) => (
                                                <span key={j} className="text-[0.6rem] font-black uppercase tracking-widest text-rose-400 bg-rose-50 px-3 py-1 rounded-full">{tag}</span>
                                            ))}
                                        </div>
                                        <button className="flex items-center gap-3 text-[0.7rem] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-rose-600 transition-colors">
                                            Khám phá dịch vụ <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-32">
                    <div className="container mx-auto px-6">
                        <div className="bg-gray-900 rounded-[4rem] p-16 md:p-24 text-center text-white relative overflow-hidden">
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-rose-600/20 blur-[120px] rounded-full translate-y-1/2"></div>
                            <div className="relative z-10 space-y-10">
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                                    Vì một cuộc sống<br />
                                    <span className="text-rose-400 italic">Khỏe mạnh hơn.</span>
                                </h2>
                                <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto italic">
                                    Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn bất cứ lúc nào.
                                    Hãy để Vạn Vật Healthcare chăm sóc sức khỏe cho gia đình bạn.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                                    <button className="bg-rose-600 text-white px-12 py-5 rounded-[2rem] text-[0.85rem] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl shadow-rose-600/40">
                                        Đăng ký lịch khám
                                    </button>
                                    <button className="px-12 py-5 rounded-[2rem] text-[0.85rem] font-black uppercase tracking-[0.2em] border border-white/20 hover:bg-white/10 transition-all">
                                        Tư vấn miễn phí
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-50 border-t py-16 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                            <HeartPulse size={16} />
                        </div>
                        <span className="text-[0.65rem] font-black uppercase tracking-widest text-rose-900">VanVat Healthcare — Health Ecosystem</span>
                    </div>
                    <div className="flex gap-10 text-[0.65rem] font-black uppercase tracking-[0.3em] text-gray-400">
                        <a href="/privacy-policy" className="hover:text-rose-600 transition">Privacy</a>
                        <a href="/terms-of-service" className="hover:text-rose-600 transition">Terms</a>
                        <a href="/careers" className="hover:text-rose-600 transition">Experts</a>
                    </div>
                    <p className="text-[0.6rem] font-black uppercase tracking-widest text-gray-400">© 2026 VanVat Corporation. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default VanVatHealthcare;
