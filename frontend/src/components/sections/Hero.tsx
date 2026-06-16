import React from 'react';
import { LayoutGrid, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
    return (
        <header
            id="hero"
            className="bg-[#0f1f6e] relative overflow-hidden pt-16"
            aria-label="Hero section"
        >
            {/* Background patterns */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)'
                    }}
                ></div>
            </div>
            <div
                className="absolute w-[600px] h-[600px] rounded-full bg-blue-500/25 blur-[120px] -top-[200px] -right-[100px] pointer-events-none z-0"
            ></div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 md:py-28 relative z-10">
                <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
                    {/* Text Content */}
                    <div className="md:w-1/2 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3.5 py-1 text-[0.8rem] font-medium text-blue-200 mb-5">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse-slow"></span>
                            Đang hoạt động & phát triển
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-5xl xl:text-6xl font-extrabold leading-tight mb-6 text-white">
                            Một tiềm năng<br />
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                phát triển không<br />ngừng nghỉ
                            </span>
                        </h1>
                        <p className="text-blue-100 text-lg mb-10 max-w-md mx-auto md:mx-0 leading-relaxed">
                            Với Tập đoàn Vạn Vật còn sơ khai nhưng đầy tiềm năng, chúng tôi hứa hẹn cung cấp các dịch vụ từ
                            trực tiếp đến trực tuyến — mang đến trải nghiệm tốt nhất chưa từng có!
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <a
                                href="https://services.vanvatcorp.com/"
                                className="bg-white text-blue-900 font-bold px-7 py-3 rounded-lg shadow-lg hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-200 flex items-center"
                            >
                                <LayoutGrid className="mr-2 w-4 h-4 opacity-70" />
                                Dịch vụ của chúng tôi
                            </a>
                            <a
                                href="#contact"
                                className="bg-transparent text-white font-bold px-7 py-3 rounded-lg border border-white/50 hover:bg-white/10 hover:border-white transition-all duration-200 flex items-center"
                            >
                                Liên hệ <ArrowRight className="ml-2 w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="md:w-1/2 w-full">
                        <div className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/40 to-indigo-500/20 rounded-2xl z-0"></div>
                            <img
                                src="https://storage.googleapis.com/a1aa/image/fe047c91-b3de-4005-a9b4-2f0abae4e70c.jpg"
                                alt="Đội ngũ chuyên gia Vạn Vật"
                                className="w-full relative z-10 rounded-2xl shadow-2xl"
                                width={600}
                                height={400}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Transition to next section */}
            <div className="h-16 bg-gradient-to-b from-transparent to-[#f9fafb]"></div>

            <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
        </header>
    );
};

export default Hero;
