import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer id="main-footer" className="py-10 bg-[#0f172a] text-slate-400">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://www.vanvatcorp.com/public-res/logo-512.jpg"
                            className="h-7 w-7 rounded-lg opacity-80"
                            alt="Logo"
                        />
                        <p className="text-sm font-medium">© 2026 Tập đoàn Vạn Vật. All rights reserved.</p>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                        <a className="hover:text-white transition-colors" href="https://www.vanvatcorp.com/privacy-policy">Privacy Policy</a>
                        <a className="hover:text-white transition-colors" href="https://www.vanvatcorp.com/terms-of-service">Terms of Service</a>
                        <a className="hover:text-white transition-colors" href="/van-vat-corporation/sitemap/">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
