import React from 'react';
import MaintenanceBanner from '../../components/common/MaintenanceBanner';
import {
    Book,
    GraduationCap,
    Cloud,
    Activity,
    Heart,
    Music,
    Stethoscope,
    Flag,
    Wind,
    ShieldPlus,
    Truck,
    Car,
    Smartphone,
    Layout,
    ExternalLink
} from 'lucide-react';

const services = [
    { name: "Vạn Vật Sách", icon: Book, url: "/van-vat-corporation/van-vat-book", desc: "Thư viện tri thức mở cho mọi người." },
    { name: "Vạn Vật Học Tập", icon: GraduationCap, url: "#", desc: "Hệ thống học tập trực tuyến hiện đại." },
    { name: "Vạn Vật Drive", icon: Cloud, url: "#", desc: "Lưu trữ đám mây bảo mật & tốc độ cao." },
    { name: "Vạn Vật Trực Tuyến", icon: Smartphone, url: "#", desc: "Các công cụ và ứng dụng web tiện ích." },
    { name: "Vạn Vật Đóng Góp", icon: Heart, url: "#", desc: "Nền tảng gây quỹ và hỗ trợ cộng đồng." },
    { name: "Vạn Vật Cắm Trại", icon: Activity, url: "#", desc: "Dịch vụ booking và trải nghiệm thiên nhiên." },
    { name: "Vạn Vật Âm Nhạc", icon: Music, url: "#", desc: "Cung cấp âm nhạc và giải trí không giới hạn." },
    { name: "Vạn Vật Lưu Trữ", icon: Layout, url: "#", desc: "Lưu trữ dữ liệu và kỷ niệm gia đình." },
    { name: "Vạn Vật Vận Tải", icon: Truck, url: "#", desc: "Dịch vụ vận động và logistics thông minh." },
    { name: "Vạn Vật Moving", icon: Car, url: "#", desc: "Hệ sinh thái di chuyển bền vững (Vanmove)." },
    { name: "Vạn Vật Sức Khỏe", icon: Stethoscope, url: "#", desc: "Chăm sóc sức khỏe và nha khoa hiện đại." },
    { name: "Vạn Vật Vì Tổ Quốc", icon: Flag, url: "#", desc: "Dự án hỗ trợ phát triển quốc gia." },
    { name: "Vạn Vật Vì Thiên Nhiên", icon: Wind, url: "#", desc: "Sáng kiến bảo vệ môi trường và sinh thái." },
    { name: "Vạn Vật Cứu Sinh", icon: ShieldPlus, url: "#", desc: "Hệ thống cứu trợ và bảo vệ sự sống." },
    { name: "Vạn Vật Từ Thiện", icon: Heart, url: "#", desc: "Các hoạt động thiện nguyện xã hội." }
];

const Services: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col font-inter selection:bg-blue-600 selection:text-white">
            <MaintenanceBanner />

            {/* Navbar Placeholder */}
            <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
                    <a className="flex items-center gap-2" href="/">
                        <img alt="Logo" className="h-8 w-8" src="https://www.vanvatcorp.com/public-res/logo-512.jpg" />
                        <span className="text-xl font-bold text-blue-700">Tập đoàn Vạn Vật</span>
                    </a>
                    <div className="hidden md:flex gap-8 text-[0.65rem] font-black uppercase tracking-widest text-gray-400">
                        <a href="/van-vat-corporation/about-us" className="hover:text-blue-700 transition">Về chúng tôi</a>
                        <a href="/van-vat-corporation/teams" className="hover:text-blue-700 transition">Đội ngũ</a>
                        <a href="/van-vat-corporation/careers" className="hover:text-blue-700 transition">Sự nghiệp</a>
                    </div>
                </div>
            </nav>

            <main className="flex-grow pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 space-y-4">
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight flex flex-col items-center gap-4">
                            Hệ sinh thái <span className="text-blue-700 italic">Vạn Vật</span>
                        </h1>
                        <p className="text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
                            Khám phá những dịch vụ và tiện ích được thiết kế để nâng tầm cuộc sống,
                            từ công nghệ trực tuyến đến trải nghiệm trực tiếp.
                        </p>
                        <div className="w-20 h-1.5 bg-blue-700 mx-auto rounded-full mt-6"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((s, i) => (
                            <a
                                key={i}
                                href={s.url}
                                className="group p-8 bg-gray-50 border border-gray-100 rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:shadow-blue-900/10 transition-all flex flex-col justify-between h-[280px]"
                            >
                                <div className="space-y-6">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-700 shadow-sm group-hover:bg-blue-700 group-hover:text-white transition-all transform group-hover:rotate-6">
                                        <s.icon size={28} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black text-gray-900 group-hover:text-blue-700 transition-colors">{s.name}</h3>
                                        <p className="text-sm text-gray-400 font-medium leading-relaxed">{s.desc}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-[0.6rem] font-black uppercase tracking-widest text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Khám phá ngay <ExternalLink size={12} />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="bg-gray-50 border-t py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[0.65rem] font-black text-gray-400 uppercase tracking-widest">© 2026 VanVat Corporation. All rights reserved.</p>
                    <div className="flex gap-8 text-[0.65rem] font-black uppercase tracking-widest text-gray-400">
                        <a href="/privacy-policy" className="hover:text-blue-700 transition">Privacy</a>
                        <a href="/terms-of-service" className="hover:text-blue-700 transition">Terms</a>
                        <a href="/contact-us" className="hover:text-blue-700 transition">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Services;
