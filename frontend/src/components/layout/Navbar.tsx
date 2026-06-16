import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Dịch vụ', href: 'https://services.vanvatcorp.com/' },
        { name: 'Về chúng tôi', href: '#about' },
        { name: 'Nhóm', href: '#team' },
        { name: 'Sự nghiệp', href: '#careers' },
        { name: 'Liên hệ', href: '#contact' },
    ];

    return (
        <nav
            id="main-nav"
            className={`w-full fixed left-0 z-50 transition-all duration-300 ${isScrolled ? 'top-0 backdrop-blur-xl bg-white/92 border-b border-black/5 shadow-sm' : 'top-0 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a className="flex items-center space-x-2 group" href="https://www.vanvatcorp.com/">
                        <img
                            alt="Logo Tập đoàn Vạn Vật"
                            className="h-9 w-9 rounded-lg"
                            src="https://www.vanvatcorp.com/public-res/logo-512.jpg"
                            width="36"
                            height="36"
                        />
                        <span className="text-xl font-bold text-blue-700 group-hover:text-blue-800 transition">
                            Tập đoàn Vạn Vật
                        </span>
                    </a>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center space-x-7">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="relative font-medium text-gray-700 text-sm hover:text-blue-700 transition-colors after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:height-[2px] after:bg-blue-700 after:rounded-sm hover:after:w-full after:transition-all after:duration-250"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Auth placeholder - will be handled by Supabase later */}
                    <div className="hidden md:flex" id="auth-navbar-placeholder"></div>

                    {/* Mobile toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                            className="text-gray-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 rounded p-1 transition"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden bg-white border-t border-gray-100 shadow-lg transition-all duration-300 ${isMenuOpen ? 'block' : 'hidden'}`}>
                <div className="py-2">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <div id="auth-navbar-mobile-placeholder" className="border-t border-gray-100 pt-2"></div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
