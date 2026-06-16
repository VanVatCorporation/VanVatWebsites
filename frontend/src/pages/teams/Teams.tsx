import React from 'react';
import MaintenanceBanner from '../../components/common/MaintenanceBanner';
import { Mail, ArrowRight, UserCheck, Zap, Globe, Target } from 'lucide-react';

const leaders = [
    { name: "James Anderson", role: "Chief Executive Officer", bio: "Nhà lãnh đạo tầm nhìn thúc đẩy đổi mới và tăng trưởng tại Tập đoàn Vạn Vật.", img: "https://storage.googleapis.com/a1aa/image/6f237570-0828-4dc1-5aee-56f1a84c78f2.jpg" },
    { name: "Maria Lopez", role: "Chief Financial Officer", bio: "Chuyên gia về chiến lược tài chính và quản lý tăng trưởng doanh nghiệp.", img: "https://storage.googleapis.com/a1aa/image/27e82b7a-96b8-4f11-b592-cb74673a2557.jpg" },
    { name: "David Kim", role: "Chief Technology Officer", bio: "Dẫn đầu các sáng kiến công nghệ và phát triển sản phẩm đột phá.", img: "https://storage.googleapis.com/a1aa/image/e219925a-5746-4a81-fd09-b0b7a8bd7e2d.jpg" },
    { name: "Samantha Green", role: "Chief Marketing Officer", bio: "Định hình chiến lược thương hiệu và gắn kết khách hàng toàn cầu.", img: "https://storage.googleapis.com/a1aa/image/1c6a1c33-a31a-46c2-32f8-4cd1f211d660.jpg" }
];

const Teams: React.FC = () => {
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
                </div>
            </nav>

            <main className="flex-grow pt-24 pb-24">
                {/* Hero */}
                <section className="bg-gradient-to-br from-blue-700 to-indigo-900 py-24 text-white">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-[0.6rem] font-black uppercase tracking-widest border border-white/10">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                                Potentials of Innovation
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">Một tiềm năng<br />phát triển <span className="text-blue-300">không ngừng.</span></h1>
                            <p className="text-lg text-blue-100/70 font-medium leading-relaxed max-w-xl">
                                Chúng tôi hứa hẹn cung cấp các thể loại dịch vụ từ trực tiếp đến trực tuyến, mang đến cho khách hàng một trải nghiệm tốt nhất chưa từng có.
                            </p>
                            <div className="flex gap-4 pt-4">
                                <button className="bg-white text-blue-900 px-8 py-4 rounded-2xl text-[0.7rem] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Dịch vụ của chúng tôi</button>
                                <button className="px-8 py-4 rounded-2xl text-[0.7rem] font-black uppercase tracking-widest border border-white/20 hover:bg-white/10 transition-all">Liên hệ</button>
                            </div>
                        </div>
                        <div className="relative group">
                            <img alt="Teams" className="rounded-[3rem] shadow-2xl relative z-10" src="https://storage.googleapis.com/a1aa/image/fe047c91-b3de-4005-a9b4-2f0abae4e70c.jpg" />
                            <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                        </div>
                    </div>
                </section>

                {/* Values Card */}
                <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Tầm nhìn rực sáng", icon: Zap, desc: "Kiến tạo tương lai số bền vững và nhân văn." },
                            { title: "Sứ mệnh toàn cầu", icon: Globe, desc: "Mang giá trị Việt Nam vươn xa trên bản đồ quốc tế." },
                            { title: "Cam kết bền bỉ", icon: Target, desc: "Luôn đặt lợi ích của người dùng lên hàng đầu." }
                        ].map((v, i) => (
                            <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 space-y-4">
                                <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center">
                                    <v.icon size={24} />
                                </div>
                                <h3 className="text-xl font-black text-gray-900">{v.title}</h3>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Leadership Grid */}
                <section className="max-w-7xl mx-auto px-6 py-32">
                    <div className="text-center mb-24 space-y-4">
                        <span className="text-blue-700 font-black text-xs uppercase tracking-[0.3em]">Leadership</span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Đội ngũ dẫn dắt Vạn Vật</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {leaders.map((person, i) => (
                            <div key={i} className="group flex flex-col items-center text-center space-y-6">
                                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-[3.5rem] overflow-hidden shadow-2xl group-hover:scale-[1.02] transition-all">
                                    <img alt={person.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src={person.img} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 gap-4">
                                        <div className="flex justify-center gap-4">
                                            <a href="#" className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center hover:bg-white/40 transition-colors">
                                                <svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                            </a>
                                            <a href="#" className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center hover:bg-white/40 transition-colors">
                                                <svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                                            </a>
                                            <a href="#" className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center hover:bg-white/40 transition-colors"><Mail size={16} className="text-white" /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2 px-4">
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">{person.name}</h3>
                                    <p className="text-[0.65rem] font-black text-blue-700 uppercase tracking-widest">{person.role}</p>
                                    <p className="text-sm text-gray-400 font-medium leading-relaxed mt-4 line-clamp-2">{person.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Join CTA */}
                <section className="max-w-5xl mx-auto px-6">
                    <div className="bg-gray-900 rounded-[4rem] p-16 md:p-24 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-700/20 blur-[100px]"></div>
                        <div className="relative z-10 space-y-10">
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">Bạn muốn trở thành một phần của vạn vật?</h2>
                            <p className="text-lg text-gray-400 font-medium max-w-2xl mx-auto italic">
                                Chúng tôi luôn tìm kiếm những tài năng đam mê để cùng nhau định hình tương lai.
                                Khám phá các vị trí đang mở và gia đình Vạn Vật.
                            </p>
                            <button className="group bg-blue-700 text-white px-12 py-6 rounded-[2rem] text-[0.8rem] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all flex items-center gap-4 mx-auto shadow-2xl shadow-blue-700/40">
                                <UserCheck size={24} /> Tham gia ngay
                                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-50 py-12 px-6 border-t font-black uppercase tracking-widest text-[0.6rem] text-gray-400">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <img alt="Logo" className="h-6 w-6 grayscale opacity-60" src="https://www.vanvatcorp.com/public-res/logo-512.jpg" />
                        <span>Tập đoàn Vạn Vật — 2026</span>
                    </div>
                    <div className="flex gap-8">
                        <a href="/privacy-policy" className="hover:text-blue-700 transition">Privacy</a>
                        <a href="/terms-of-service" className="hover:text-blue-700 transition">Terms</a>
                        <a href="/careers" className="hover:text-blue-700 transition">Contact Legal</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Teams;
