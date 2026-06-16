import React from 'react';
import MaintenanceBanner from '../../components/common/MaintenanceBanner';
import {
    FileText,
    Library,
    PlayCircle,
    Award,
    ArrowRight,
    Users,
    Sparkles,
    Calendar,
    Download
} from 'lucide-react';

const VanVatAcademy: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col font-inter selection:bg-indigo-600 selection:text-white">
            <MaintenanceBanner />

            {/* Navbar */}
            <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 z-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
                    <a className="flex items-center gap-2" href="/">
                        <div className="w-10 h-10 bg-indigo-700 rounded-[1rem] flex items-center justify-center text-white font-black italic shadow-xl shadow-indigo-700/20">A</div>
                        <span className="text-2xl font-black text-indigo-900 tracking-tighter">VanVat <span className="text-blue-600 italic">Academy</span></span>
                    </a>
                    <div className="hidden lg:flex items-center gap-10">
                        {["Khóa học", "Tài liệu", "Luyện thi", "Thư viện"].map((item, i) => (
                            <a key={i} href="#" className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-indigo-700 transition">{item}</a>
                        ))}
                    </div>
                    <button className="bg-gray-900 text-white px-8 py-3 rounded-2xl text-[0.65rem] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl">Đăng nhập</button>
                </div>
            </nav>

            <main className="flex-grow pt-20">
                {/* Hero Section */}
                <section className="relative py-24 md:py-32 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl aspect-square bg-indigo-50 rounded-full blur-[120px] opacity-40 -translate-y-1/2"></div>

                    <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10">
                            <div className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 shadow-sm animate-fade-in">
                                <Sparkles size={16} />
                                <span className="text-[0.65rem] font-black uppercase tracking-[0.2em]">Khai phá tiềm năng vô hạn</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9]">
                                Học tập là<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-600 italic">Chìa khóa.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
                                Hệ thống học tập trực tuyến hiện đại nhất, cung cấp tài liệu, đề thi và khóa học tinh hoa phù hợp với mọi lộ trình phát triển.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <button className="group bg-indigo-700 text-white px-10 py-5 rounded-[2rem] text-sm font-black uppercase tracking-widest hover:bg-indigo-800 transition-all shadow-2xl shadow-indigo-700/30 flex items-center justify-center gap-4">
                                    Bắt đầu học ngay <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </button>
                                <button className="flex items-center justify-center gap-4 px-10 py-5 rounded-[2rem] text-sm font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all">
                                    <PlayCircle size={24} className="text-indigo-700" /> Xem giới thiệu
                                </button>
                            </div>
                            <div className="flex items-center gap-6 pt-6 grayscale opacity-60">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200"></div>)}
                                </div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Gia nhập cùng +10,000 học viên</p>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-indigo-600 blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                            <div className="relative bg-white p-6 rounded-[3.5rem] shadow-3xl border border-gray-100 overflow-hidden transform group-hover:-rotate-1 transition-all duration-700">
                                <img alt="Learning" className="rounded-[2.5rem] w-full" src="https://storage.googleapis.com/a1aa/image/ebcfd8e2-b131-4822-ba72-358cc10959ee.jpg" />
                                <div className="absolute top-12 left-12 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4">
                                    <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center"><Award size={20} /></div>
                                    <div className="pr-4">
                                        <p className="text-[0.6rem] font-black text-gray-400 uppercase tracking-widest">Premium Quality</p>
                                        <p className="text-sm font-bold text-gray-900">Chứng nhận Vạn Vật</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Dashboard Highlights */}
                <section className="py-32 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-24 space-y-4">
                            <span className="text-indigo-700 font-black text-xs uppercase tracking-[0.3em]">Hệ sinh thái học tập</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Tối ưu cho sự phát triển</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Kho tài liệu đồ sộ", desc: "Hơn 5,000 tài liệu luyện tập, bài giảng và tài liệu tham khảo chi tiết.", icon: Library },
                                { title: "Luyện thi thông minh", desc: "Ngân hàng đề thi (Testbank) với lời giải chi tiết và phân tích điểm yếu.", icon: FileText },
                                { title: "Cộng đồng học thuật", desc: "Sân vận động trí kiến, nơi trao đổi và giải đáp thắc mắc cùng chuyên gia.", icon: Users }
                            ].map((h, i) => (
                                <div key={i} className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-900/5 transition-all text-center group">
                                    <div className="w-16 h-16 bg-indigo-50 text-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-indigo-700 group-hover:text-white transition-all">
                                        <h.icon size={32} />
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 mb-4">{h.title}</h3>
                                    <p className="text-gray-500 font-medium leading-relaxed">{h.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Practice Files Exploration */}
                <section className="py-32 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col lg:flex-row gap-20 items-center">
                            <div className="w-full lg:w-1/2 space-y-10">
                                <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">Thư viện <span className="text-indigo-700">Tài liệu</span> thực hành</h2>
                                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                                    Chúng tôi tin vào việc "Học đi đôi với hành". Academy cung cấp hàng ngàn tệp tin thực hành, mã nguồn mẫu và bộ dữ liệu để bạn rèn luyện kỹ năng thực tế.
                                </p>
                                <div className="space-y-6">
                                    {[
                                        { label: "Tất cả bài giảng Slide/PDF", count: "2.4k tệp" },
                                        { label: "Dữ liệu thực hành (Excel/CSV)", count: "890 tệp" },
                                        { label: "Mã nguồn mẫu (Code snippets)", count: "1.2k tệp" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-indigo-200 transition-colors cursor-pointer group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-700 shadow-sm group-hover:scale-110 transition-transform">
                                                    <Download size={20} />
                                                </div>
                                                <span className="font-bold text-gray-900">{item.label}</span>
                                            </div>
                                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{item.count}</span>
                                        </div>
                                    ))}
                                </div>
                                <button className="text-sm font-black text-indigo-700 uppercase tracking-widest flex items-center gap-3 hover:translate-x-2 transition-transform">
                                    Khám phá thư viện tài liệu →
                                </button>
                            </div>
                            <div className="w-full lg:w-1/2">
                                <div className="bg-indigo-900 rounded-[4rem] p-12 md:p-16 text-white relative overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]"></div>
                                    <div className="space-y-8 relative z-10">
                                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center"><Calendar size={28} /></div>
                                        <h3 className="text-3xl font-black italic tracking-tight">"Tri thức là của cải duy nhất không thể bị đánh cắp."</h3>
                                        <div className="h-px bg-white/10"></div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-full"></div>
                                            <div>
                                                <p className="font-bold text-lg leading-none">James Anderson</p>
                                                <p className="text-xs font-black text-indigo-300 uppercase tracking-widest mt-1">Founder @ VanVat Corp</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-50 border-t py-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 text-center md:text-left">
                    <div className="col-span-1 md:col-span-2 space-y-8">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <div className="w-8 h-8 bg-indigo-700 rounded-lg flex items-center justify-center text-white font-black italic shadow-lg">A</div>
                            <span className="text-xl font-black text-indigo-900 tracking-tighter">VanVat <span className="text-blue-600 italic">Academy</span></span>
                        </div>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest leading-loose">
                            Một sáng kiến giáo dục tinh hoa của Tập đoàn Vạn Vật,<br />nhằm mục tiêu phổ cập tri thức chất lượng cao.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <p className="text-[0.65rem] font-black text-indigo-700 uppercase tracking-widest">Hỗ trợ</p>
                        <div className="flex flex-col gap-4 text-sm font-black text-gray-400 uppercase tracking-widest">
                            <a href="#" className="hover:text-indigo-700 transition">Trung tâm trợ giúp</a>
                            <a href="#" className="hover:text-indigo-700 transition">Hướng dẫn học viên</a>
                        </div>
                    </div>
                    <div className="space-y-6 md:text-right">
                        <p className="text-[0.65rem] font-black text-indigo-700 uppercase tracking-widest">Liên hệ</p>
                        <p className="text-sm font-black text-gray-900">academy@vanvatcorp.com</p>
                        <p className="text-[0.6rem] font-black text-gray-400 uppercase tracking-widest leading-loose">
                            © 2026 VanVat Corporation.<br />Education Platform.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default VanVatAcademy;
