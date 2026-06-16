import React, { useEffect, useRef } from 'react';
import MaintenanceBanner from '../../components/common/MaintenanceBanner';
import { Sparkles, Globe, ArrowRight, Library, Search, Layers, Users } from 'lucide-react';

const VanVatBook: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Firefly animation for hero canvas
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvas.parentElement?.clientWidth || 800;
        canvas.height = canvas.parentElement?.clientHeight || 600;

        const fireflies: any[] = [];
        for (let i = 0; i < 30; i++) {
            fireflies.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                s: Math.random() * 2 + 1,
                opacity: Math.random(),
                dir: Math.random() * Math.PI * 2
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            fireflies.forEach(f => {
                f.x += Math.cos(f.dir) * 0.5;
                f.y += Math.sin(f.dir) * 0.5;
                f.opacity += (Math.random() - 0.5) * 0.1;
                if (f.opacity < 0) f.opacity = 0;
                if (f.opacity > 1) f.opacity = 1;

                if (f.x < 0 || f.x > canvas.width || f.y < 0 || f.y > canvas.height) {
                    f.x = Math.random() * canvas.width;
                    f.y = Math.random() * canvas.height;
                }

                ctx.beginPath();
                ctx.arc(f.x, f.y, f.s, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(245, 200, 66, ${f.opacity * 0.3})`;
                ctx.fill();
            });
            requestAnimationFrame(animate);
        };
        animate();
    }, []);

    return (
        <div className="min-h-screen bg-[#060b18] text-white flex flex-col font-inter selection:bg-amber-500 selection:text-white">
            <MaintenanceBanner />

            {/* Nav */}
            <nav className="w-full h-24 flex items-center justify-between px-6 md:px-12 fixed top-0 left-0 z-50 bg-[#060b18]/80 backdrop-blur-md">
                <a className="flex items-center gap-3" href="/">
                    <img alt="Logo" className="h-10 w-10 rounded-xl" src="https://www.vanvatcorp.com/public-res/logo-512.jpg" />
                    <span className="text-xl font-bold tracking-tight">Vạn Vật <span className="text-amber-500 italic">OpenBooks</span></span>
                </a>
                <div className="hidden md:flex items-center gap-10">
                    {["Browse", "Collections", "About", "Contact"].map((item, i) => (
                        <a key={i} href="#" className="text-[0.65rem] font-black uppercase tracking-widest text-gray-500 hover:text-amber-500 transition">{item}</a>
                    ))}
                </div>
                <button className="bg-amber-600 text-[#060b18] px-8 py-3 rounded-full text-[0.65rem] font-black uppercase tracking-[0.2em] hover:bg-amber-500 transition-all shadow-xl shadow-amber-600/20">Bắt đầu đọc</button>
            </nav>

            <main className="flex-grow pt-24">
                {/* Hero Section */}
                <section className="relative h-[85vh] flex flex-col items-center justify-center overflow-hidden pt-20">
                    {/* Animated Particles Canvas */}
                    <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" id="bookCanvas"></canvas>

                    {/* Floating Book SVG Container */}
                    <div className="relative z-10 w-full max-w-[500px] mb-16 animate-float">
                        <svg className="w-full drop-shadow-[0_0_50px_rgba(245,200,66,0.15)] filter grayscale-[0.2]" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="leftPage" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#fffbe8" stopOpacity="0.88" />
                                    <stop offset="80%" stopColor="#fff8d0" stopOpacity="0.96" />
                                    <stop offset="100%" stopColor="#f0e8b0" stopOpacity="0.82" />
                                </linearGradient>
                                <linearGradient id="rightPage" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#f0e8b0" stopOpacity="0.82" />
                                    <stop offset="20%" stopColor="#fff8d0" stopOpacity="0.96" />
                                    <stop offset="100%" stopColor="#fffbe8" stopOpacity="0.88" />
                                </linearGradient>
                                <linearGradient id="leftCover" x1="0" y1="0" x2="0.3" y2="1">
                                    <stop offset="0%" stopColor="#1a2e50" />
                                    <stop offset="100%" stopColor="#0d1c34" />
                                </linearGradient>
                                <linearGradient id="rightCover" x1="0" y1="0" x2="0.3" y2="1">
                                    <stop offset="0%" stopColor="#1a2e50" />
                                    <stop offset="100%" stopColor="#0d1c34" />
                                </linearGradient>
                            </defs>
                            <ellipse cx="100" cy="154" rx="74" ry="8" fill="rgba(0,0,0,0.6)" />
                            <path d="M14,126 Q10,78 18,32 L100,28 L100,130 Q56,134 14,126 Z" fill="url(#leftCover)" />
                            <path d="M186,126 Q190,78 182,32 L100,28 L100,130 Q144,134 186,126 Z" fill="url(#rightCover)" />
                            <path d="M18,122 Q15,75 22,30 L100,26 L100,126 Q60,130 18,122 Z" fill="url(#leftPage)" />
                            <path d="M182,122 Q185,75 178,30 L100,26 L100,126 Q140,130 182,122 Z" fill="url(#rightPage)" />
                            <path d="M100,26 L100,126" stroke="#d4a820" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
                            {/* Text lines */}
                            <path d="M28,46 Q62,44 93,45" stroke="#c9a12e" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                            <path d="M26,56 Q60,54 93,55" stroke="#8a7040" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
                            <path d="M107,46 Q141,44 172,45" stroke="#c9a12e" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                            <path d="M107,56 Q141,54 174,55" stroke="#8a7040" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
                        </svg>
                    </div>

                    <div className="relative z-10 text-center space-y-6 px-6">
                        <p className="text-amber-500 font-serif italic text-2xl md:text-3xl leading-relaxed max-w-xl mx-auto">
                            "Không một ai xứng đáng phải gánh chịu nỗi đau của sự <span className="relative">
                                <span className="relative z-10 font-bold border-b-2 border-amber-500/30">thiếu tri thức</span>
                            </span>"
                        </p>
                        <h1 className="text-xs font-black uppercase tracking-[0.5em] text-gray-500">Mở cánh cửa trí tuệ cùng OpenBooks</h1>
                        <p className="max-w-2xl mx-auto text-gray-400 font-medium leading-relaxed">
                            OpenBooks mở ra thế giới học tập và phát triển — miễn phí, dễ tiếp cận và xây dựng cho tất cả những ai tin rằng tri thức không nên có rào cản.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
                            <button className="bg-amber-600 text-[#060b18] px-12 py-5 rounded-full text-[0.8rem] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl shadow-amber-600/30 flex items-center gap-3">
                                Bắt đầu đọc miễn phí <ArrowRight size={18} />
                            </button>
                            <button className="text-gray-400 hover:text-amber-500 px-12 py-5 rounded-full text-[0.8rem] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3">
                                Khám phá thư viện →
                            </button>
                        </div>
                    </div>
                </section>

                <div className="w-full max-w-4xl mx-auto px-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
                </div>

                {/* Features */}
                <section className="py-32 px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: "Hàng ngàn đầu sách", desc: "Từ kinh điển đến hiện đại, thư viện của chúng tôi phát triển mỗi tuần với các tựa sách chọn lọc.", icon: Library },
                            { title: "Đọc mọi nơi", desc: "Điện thoại, máy tính bảng hay máy tính. Tiến độ đọc được đồng bộ hoá liên tục.", icon: Sparkles },
                            { title: "Truy cập mở", desc: "Giáo dục không nên tốn kém. OpenBooks cung cấp quyền truy cập hoàn toàn miễn phí.", icon: Globe }
                        ].map((f, i) => (
                            <div key={i} className="group p-10 rounded-[2.5rem] bg-gray-900/40 border border-gray-800/50 hover:bg-gray-800/50 transition-all text-center">
                                <div className="w-16 h-16 bg-amber-600/10 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                                    <f.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                                <p className="text-sm text-gray-500 font-medium leading-loose">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Additional Content Grid */}
                <section className="py-32 bg-[#080d1a]">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">Trí tuệ hôm nay,<br /><span className="text-amber-500">Thế giới ngày mai.</span></h2>
                            <p className="text-gray-400 font-medium leading-relaxed">
                                Chúng tôi không chỉ cung cấp sách, chúng tôi cung cấp cơ hội. Một nền tảng không biên giới nơi tri thức được chia sẻ và bồi đắp.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { label: "Tìm kiếm thông minh", icon: Search },
                                    { label: "Bộ sưu tập cá nhân", icon: Layers },
                                    { label: "Cộng đồng đọc giả", icon: Users }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                        <div className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 group-hover:border-amber-500 group-hover:text-amber-500 transition-all">
                                            <item.icon size={18} />
                                        </div>
                                        <span className="font-bold text-gray-400 group-hover:text-white transition-colors">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-amber-600/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative bg-gray-900 border border-gray-800 p-12 rounded-[3.5rem] aspect-square flex flex-col justify-between overflow-hidden shadow-2xl">
                                <Sparkles className="text-amber-500/20 absolute -top-10 -right-10" size={300} />
                                <div className="space-y-4 relative z-10">
                                    <p className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-amber-500">Sứ mệnh</p>
                                    <p className="text-2xl font-black leading-snug">Chinh phục nỗi lo thiếu hụt tri thức bằng công nghệ và chia sẻ.</p>
                                </div>
                                <div className="space-y-6 relative z-10">
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-12 h-1.5 bg-amber-500/20 rounded-full"></div>)}
                                    </div>
                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">© 2026 VanVat OpenBooks</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-[#060b18] border-t border-gray-800 py-16 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-3 grayscale opacity-60">
                        <img alt="Logo" className="h-6 w-6" src="https://www.vanvatcorp.com/public-res/logo-512.jpg" />
                        <span className="text-[0.6rem] font-black uppercase tracking-widest">Tập đoàn Vạn Vật</span>
                    </div>
                    <div className="flex gap-10 text-[0.6rem] font-black uppercase tracking-[0.3em] text-gray-500">
                        <a href="/privacy-policy" className="hover:text-amber-500 transition">Privacy</a>
                        <a href="/terms-of-service" className="hover:text-amber-500 transition">Terms</a>
                        <a href="/careers" className="hover:text-amber-500 transition">Contact</a>
                    </div>
                    <p className="text-[0.6rem] font-black uppercase tracking-widest text-gray-600">© 2026 VanVat Corporation. All rights reserved.</p>
                </div>
            </footer>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(1deg); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default VanVatBook;
