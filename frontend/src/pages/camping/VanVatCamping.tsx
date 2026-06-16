import React from 'react';
import MaintenanceBanner from '../../components/common/MaintenanceBanner';
import {
    Compass,
    Tent,
    Wind,
    Star,
    ArrowRight,
    Trees,
    Mountain
} from 'lucide-react';

const VanVatCamping: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#faf9f6] flex flex-col font-inter selection:bg-emerald-600 selection:text-white">
            <MaintenanceBanner />

            {/* Header */}
            <nav className="w-full h-24 flex items-center justify-between px-6 md:px-12 fixed top-0 left-0 z-50 bg-[#faf9f6]/90 backdrop-blur-md border-b border-emerald-900/5">
                <a className="flex items-center gap-3" href="/">
                    <img alt="Logo" className="h-10 w-10 rounded-xl" src="https://www.vanvatcorp.com/public-res/logo-512.jpg" />
                    <span className="text-xl font-bold tracking-tight text-emerald-900 tracking-tighter">Vạn Vật <span className="text-emerald-600 italic">Cắm Trại</span></span>
                </a>
                <div className="hidden md:flex items-center gap-10">
                    {["Địa điểm", "Trải nghiệm", "Lưu trú", "Về chúng tôi"].map((item, i) => (
                        <a key={i} href="#" className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-emerald-900/40 hover:text-emerald-700 transition">{item}</a>
                    ))}
                </div>
                <button className="bg-emerald-800 text-white px-8 py-3 rounded-full text-[0.65rem] font-black uppercase tracking-[0.2em] hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-800/20">Đặt chỗ ngay</button>
            </nav>

            <main className="flex-grow pt-24">
                {/* Hero Section */}
                <section className="relative h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-white mx-6 mt-6 rounded-[3rem] shadow-2xl">
                    <img
                        alt="Camping background"
                        className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] brightness-75 transition-all duration-1000 group-hover:scale-105"
                        src="https://storage.googleapis.com/a1aa/image/3b1263d8-5ec9-4fe5-8858-5d153835698b.jpg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-transparent to-emerald-900/20"></div>

                    <div className="relative z-10 text-center space-y-10 px-6 max-w-4xl">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white">
                            <Compass size={20} className="text-emerald-400" />
                            <span className="text-[0.7rem] font-black uppercase tracking-[0.3em]">Hành trình về với thiên nhiên</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.8] drop-shadow-2xl">
                            Khám phá<br /><span className="text-emerald-400 italic">Sự tĩnh lặng.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-emerald-50 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                            Trải nghiệm cắm trại cao cấp (Glamping) tại những địa điểm hoang sơ và thơ mộng nhất Việt Nam. Nơi tâm hồn bạn được chữa lành.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                            <button className="bg-white text-emerald-900 px-12 py-5 rounded-full text-[0.85rem] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-3 group">
                                Tìm kiếm địa điểm <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </button>
                            <button className="text-white border border-white/30 px-12 py-5 rounded-full text-[0.85rem] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center gap-3">
                                <Tent size={24} /> Xem dịch vụ
                            </button>
                        </div>
                    </div>
                </section>

                {/* Destinations/Sub-services */}
                <section className="py-32 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
                            <div className="space-y-4">
                                <span className="text-emerald-700 font-black text-xs uppercase tracking-[0.3em]">Hệ sinh thái Camping</span>
                                <h2 className="text-4xl md:text-5xl font-black text-emerald-900 tracking-tight">Dịch vụ cắm trại Vạn Vật</h2>
                            </div>
                            <p className="max-w-md text-emerald-900/50 font-medium leading-relaxed">
                                Chúng tôi mang đến hai trải nghiệm độc đáo dành cho những ai đam mê xê dịch và khát khao sự tiện nghi giữa núi rừng.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {[
                                {
                                    name: "Vạn Vật CampSite",
                                    desc: "Những bãi cắm trại tự túc được quy hoạch bài bản, an toàn và gần gũi nhất với thiên nhiên.",
                                    icon: Trees,
                                    img: "https://storage.googleapis.com/a1aa/image/44c6db22-3a5c-4eb4-b9ba-9a5732155700.jpg",
                                    color: "bg-emerald-700"
                                },
                                {
                                    name: "Vạn Vật CampStay",
                                    desc: "Dịch vụ lưu trú Glamping cao cấp với đầy đủ tiện nghi, giường đệm và buffet sáng giữa rừng.",
                                    icon: Tent,
                                    img: "https://storage.googleapis.com/a1aa/image/d3674685-648b-49ea-8004-98ae8a7ecf3d.jpg",
                                    color: "bg-emerald-900"
                                }
                            ].map((s, i) => (
                                <a key={i} href="#" className="group relative h-[600px] rounded-[3.5rem] overflow-hidden shadow-2xl block border border-emerald-900/5">
                                    <img alt={s.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1" src={s.img} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/20 to-transparent"></div>
                                    <div className="absolute bottom-16 left-12 right-12 space-y-6">
                                        <div className={`w-16 h-16 ${s.color} text-white rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform`}>
                                            <s.icon size={32} />
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-3xl font-black text-white tracking-tight">{s.name}</h3>
                                            <p className="text-emerald-100/70 font-medium leading-relaxed max-w-sm">{s.desc}</p>
                                            <div className="pt-4 flex items-center gap-4 text-emerald-400 font-black uppercase tracking-[0.2em] text-[0.65rem] opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                                                Khám phá địa điểm <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Values/Features */}
                <section className="py-32 bg-emerald-900 text-white rounded-[4rem] mx-6 mb-32 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-700/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
                    <div className="container mx-auto px-10 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                            {[
                                { title: "Hoang sơ", icon: Mountain, val: "Pure" },
                                { title: "Bền vững", icon: Wind, val: "Green" },
                                { title: "Tiện nghi", icon: Star, val: "Luxe" },
                                { title: "An tâm", icon: Star, val: "Safe" }
                            ].map((v, i) => (
                                <div key={i} className="space-y-6 text-center md:text-left">
                                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-white/10">
                                        <v.icon size={28} />
                                    </div>
                                    <div>
                                        <p className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-emerald-400/60 mb-2">{v.val}</p>
                                        <h4 className="text-2xl font-black tracking-tight">{v.title}</h4>
                                        <p className="text-sm font-medium text-emerald-100/50 mt-4 leading-relaxed">Luôn đảm bảo trải nghiệm tốt nhất từ những chi tiết nhỏ nhất.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-[#faf9f6] border-t border-emerald-900/5 py-20 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="space-y-6 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <img alt="Logo" className="h-6 w-6 grayscale" src="https://www.vanvatcorp.com/public-res/logo-512.jpg" />
                            <span className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-emerald-900/60">Tập đoàn Vạn Vật — Camping Ecosystem</span>
                        </div>
                        <p className="text-2xl font-black text-emerald-900 tracking-tight italic">"Nghỉ ngơi, Chữa lành và Kết nối."</p>
                    </div>
                    <div className="flex flex-col items-center md:items-end gap-6 text-right">
                        <div className="flex gap-10 text-[0.65rem] font-black uppercase tracking-[0.3em] text-emerald-900/40">
                            <a href="/privacy-policy" className="hover:text-emerald-700 transition">Bảo mật</a>
                            <a href="/terms-of-service" className="hover:text-emerald-700 transition">Điều khoản</a>
                            <a href="/careers" className="hover:text-emerald-700 transition">Hợp tác</a>
                        </div>
                        <p className="text-[0.6rem] font-black uppercase tracking-widest text-emerald-900/30">© 2026 VanVat Corporation. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default VanVatCamping;
