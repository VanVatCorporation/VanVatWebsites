import React from 'react';
import MaintenanceBanner from '../../components/common/MaintenanceBanner';
import { FileText, CheckCircle, AlertTriangle, Scale } from 'lucide-react';

const TermsOfService: React.FC = () => {
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

            <main className="flex-grow pt-32 pb-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl mb-4">
                            <FileText size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Điều khoản dịch vụ</h1>
                        <p className="text-gray-500 font-medium">Thoả thuận sử dụng nền tảng Vạn Vật Ecosystem</p>
                        <div className="w-20 h-1.5 bg-blue-700 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Sidebar Navigation */}
                        <aside className="hidden lg:block space-y-2 sticky top-40 h-fit">
                            {[
                                "Chấp nhận điều khoản",
                                "Sử dụng dịch vụ",
                                "Trách nhiệm tài khoản",
                                "Sở hữu trí tuệ",
                                "Chấm dứt",
                                "Giới hạn trách nhiệm"
                            ].map((item, i) => (
                                <a key={i} href={`#section-${i + 1}`} className="block text-xs font-black uppercase tracking-widest text-gray-400 hover:text-blue-700 transition py-2 border-l-2 border-transparent hover:border-blue-700 pl-4">
                                    {item}
                                </a>
                            ))}
                        </aside>

                        {/* Main Content */}
                        <article className="lg:col-span-3 space-y-16">
                            <section id="section-1" className="space-y-6">
                                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                    <CheckCircle className="text-emerald-500" size={24} />
                                    1. Chấp nhận điều khoản
                                </h2>
                                <p className="text-gray-700 leading-relaxed font-medium">
                                    Bằng việc truy cập hoặc sử dụng dịch vụ của Tập đoàn Vạn Vật, bạn đồng ý tuân thủ các Điều khoản dịch vụ này và tất cả các luật và quy định áp dụng. Nếu bạn không đồng ý, vui lòng tạm dừng sử dụng dịch vụ.
                                </p>
                            </section>

                            <section id="section-2" className="space-y-6">
                                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                    <Scale className="text-blue-600" size={24} />
                                    2. Sử dụng dịch vụ
                                </h2>
                                <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 space-y-4">
                                    <p className="text-gray-700 leading-relaxed font-medium">
                                        Bạn đồng ý sử dụng dịch vụ của chúng tôi chỉ cho các mục đích hợp pháp và không vi phạm quyền của người khác. Các hành vi sau bị nghiêm cấm:
                                    </p>
                                    <ul className="space-y-3">
                                        {[
                                            "Xâm nhập trái phép hệ thống kỹ thuật.",
                                            "Phát tán mã độc hoặc nội dung vi phạm pháp luật.",
                                            "Mạo danh cá nhân hoặc tổ chức khác."
                                        ].map((li, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                                <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                                                {li}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>

                            <section id="section-3" className="space-y-6">
                                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                    <CheckCircle className="text-indigo-600" size={24} />
                                    3. Trách nhiệm tài khoản
                                </h2>
                                <p className="text-gray-700 leading-relaxed font-medium italic border-l-4 border-indigo-100 pl-6">
                                    Bạn chịu trách nhiệm giữ bí mật thông tin tài khoản của mình và mọi hoạt động xảy ra dưới tài khoản đó. Vạn Vật không chịu trách nhiệm cho các mất mát do sơ suất cá nhân.
                                </p>
                            </section>

                            <section id="section-4" className="space-y-6">
                                <h2 className="text-2xl font-black text-gray-900">4. Sở hữu trí tuệ</h2>
                                <p className="text-gray-700 leading-relaxed font-medium">
                                    Tất cả nội dung, nhãn hiệu và dữ liệu trên trang web thuộc sở hữu của Tập đoàn Vạn Vật hoặc các bên cấp phép và được bảo vệ bởi luật sở hữu trí tuệ quốc tế.
                                </p>
                            </section>

                            <section id="section-5" className="bg-red-50 p-8 md:p-10 rounded-[2.5rem] border border-red-100">
                                <h2 className="text-2xl font-black text-red-900 mb-6 flex items-center gap-3">
                                    <AlertTriangle className="text-red-600" size={24} />
                                    5. Chấm dứt
                                </h2>
                                <p className="text-red-800/80 leading-relaxed font-bold text-sm">
                                    Chúng tôi có quyền tạm ngưng hoặc chấm dứt quyền truy cập dịch vụ của bạn bất cứ lúc nào, không cần thông báo, nếu bạn vi phạm các Điều khoản này hoặc có hành vi gây hại cho hệ thống.
                                </p>
                            </section>

                            <section id="section-6" className="space-y-6">
                                <h2 className="text-2xl font-black text-gray-900">6. Giới hạn trách nhiệm</h2>
                                <p className="text-gray-700 leading-relaxed font-medium bg-gray-900 text-white p-8 rounded-[2rem]">
                                    Tập đoàn Vạn Vật không chịu trách nhiệm về bất kỳ thiệt hại trực tiếp hay gián tiếp nào phát sinh từ việc sử dụng hiệu quả hoặc không thể sử dụng dịch vụ của chúng tôi.
                                </p>
                            </section>
                        </article>
                    </div>
                </div>
            </main>

            <footer className="bg-blue-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <img alt="Logo" className="h-6 w-6 brightness-0 invert" src="https://www.vanvatcorp.com/public-res/logo-512.jpg" />
                        <p className="text-[0.6rem] font-black uppercase tracking-[0.3em] opacity-60">© 2026 VanVat Corp</p>
                    </div>
                    <div className="flex gap-8 text-[0.6rem] font-black uppercase tracking-widest">
                        <a href="/privacy-policy" className="hover:text-blue-300 transition">Privacy Policy</a>
                        <a href="/support" className="hover:text-blue-300 transition">Contact Legal</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default TermsOfService;
