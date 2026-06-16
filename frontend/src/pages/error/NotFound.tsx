import React from 'react';
import { Home, AlertCircle, ArrowLeft } from 'lucide-react';
import MaintenanceBanner from '../../components/common/MaintenanceBanner';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col font-inter">
            <MaintenanceBanner />

            {/* Navbar */}
            <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between h-16">
                    <a className="flex items-center space-x-2" href="/">
                        <img alt="Corporation logo" className="h-10 w-10" height="40"
                            src="https://www.vanvatcorp.com/public-res/logo-512.jpg" width="40" />
                        <span className="text-2xl font-bold text-blue-700">Tập đoàn Vạn Vật</span>
                    </a>
                </div>
            </nav>

            <main className="flex-grow pt-24 flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-700 via-indigo-800 to-blue-900 text-white px-6 sm:px-8 lg:px-12 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

                <div className="md:w-1/2 text-left max-w-xl z-10 animate-in slide-in-from-left duration-700">
                    <div className="flex items-center gap-4 mb-6">
                        <h1 className="text-9xl font-black select-none tracking-tighter opacity-20">404</h1>
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl flex items-center gap-2">
                            <AlertCircle size={16} className="text-blue-300" />
                            <span className="text-xs font-black uppercase tracking-widest text-blue-100">Page Missing</span>
                        </div>
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight tracking-tight">
                        Oops! The page ran off to join the circus <span className="inline-block animate-bounce">🎪</span>
                    </h2>
                    <p className="text-lg sm:text-xl mb-12 text-blue-100 font-medium leading-relaxed opacity-90">
                        We tried to find the page you requested, but it seems it's busy juggling flaming torches somewhere else. Don't worry, we've got plenty of other amazing acts for you to enjoy!
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a
                            href="/"
                            className="bg-white text-blue-800 font-black px-8 py-4 rounded-2xl shadow-xl shadow-blue-900/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 uppercase tracking-widest text-sm"
                        >
                            <Home size={20} /> Back to Safety Net
                        </a>
                        <button
                            onClick={() => window.history.back()}
                            className="bg-blue-600/30 backdrop-blur-md border border-white/20 text-white font-black px-8 py-4 rounded-2xl hover:bg-white/10 active:scale-95 transition-all flex items-center gap-3 uppercase tracking-widest text-sm"
                        >
                            <ArrowLeft size={20} /> Go Back
                        </button>
                    </div>
                </div>

                <div className="md:w-1/2 flex flex-col items-center z-10 animate-in zoom-in duration-1000 mt-12 md:mt-0">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-white/5 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <img
                            alt="Funny circus scene"
                            className="rounded-[2.5rem] shadow-2xl w-full max-w-md border-4 border-white/10 hover:border-white/30 transition-all transform hover:-rotate-1"
                            height="400"
                            loading="lazy"
                            src="https://storage.googleapis.com/a1aa/image/0753a0b0-f920-4e52-20c9-89bedf72df04.jpg"
                            width="600"
                        />
                    </div>
                </div>
            </main>

            <footer className="bg-blue-900/95 backdrop-blur-sm text-blue-200 py-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-60">
                        © 2026 Tập đoàn Vạn Vật. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 text-[0.65rem] font-black uppercase tracking-widest">
                        <a className="hover:text-white transition" href="/privacy-policy">Privacy Policy</a>
                        <a className="hover:text-white transition" href="/terms-of-service">Terms of Service</a>
                        <a className="hover:text-white transition" href="/sitemap">Sitemap</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default NotFound;
