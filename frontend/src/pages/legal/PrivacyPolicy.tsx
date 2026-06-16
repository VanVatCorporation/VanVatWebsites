import React from 'react';
import MaintenanceBanner from '../../components/common/MaintenanceBanner';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col font-inter selection:bg-blue-600 selection:text-white">
            <MaintenanceBanner />

            {/* Navbar Placeholder - Should use global Navbar in real app */}
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
                            <Shield size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Chính sách bảo mật</h1>
                        <p className="text-gray-500 font-medium">Cập nhật lần cuối: Tháng 6, 2026</p>
                        <div className="w-20 h-1.5 bg-blue-700 mx-auto rounded-full"></div>
                    </div>

                    <article className="prose prose-blue max-w-none space-y-12">
                        <section className="bg-gray-50 p-8 md:p-10 rounded-[2.5rem] border border-gray-100">
                            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 bg-blue-700 text-white text-sm rounded-lg">1</span>
                                Giới thiệu
                            </h2>
                            <p className="text-gray-700 leading-relaxed font-medium">
                                Tập đoàn Vạn Vật cam kết bảo vệ quyền riêng tư và thông tin cá nhân của khách hàng và người dùng.
                                Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn khi bạn sử dụng dịch vụ của chúng tôi.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 bg-blue-700 text-white text-sm rounded-lg">2</span>
                                Thông tin chúng tôi thu thập
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { title: "Thông tin cá nhân", desc: "Tên, email, số điện thoại khi đăng ký hoặc liên hệ." },
                                    { title: "Thông tin kỹ thuật", desc: "Địa chỉ IP, loại trình duyệt để cải thiện trải nghiệm." },
                                    { title: "Dữ liệu sử dụng", desc: "Phân tích hành vi để nâng cao chất lượng dịch vụ." }
                                ].map((item, i) => (
                                    <div key={i} className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
                                        <h4 className="font-black text-blue-700 mb-2">{item.title}</h4>
                                        <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-blue-700 p-8 md:p-10 rounded-[2.5rem] text-white">
                            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 bg-white text-blue-700 text-sm rounded-lg">3</span>
                                Cách chúng tôi sử dụng thông tin
                            </h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0">
                                {[
                                    "Cung cấp và duy trì dịch vụ ổn định.",
                                    "Giao tiếp về cập nhật và hỗ trợ kỹ thuật.",
                                    "Cải thiện sản phẩm dựa trên phản hồi.",
                                    "Tuân thủ các yêu cầu pháp lý nghiêm ngặt."
                                ].map((step, i) => (
                                    <li key={i} className="flex gap-4 items-start bg-white/10 p-4 rounded-2xl border border-white/10">
                                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-sm font-bold">{step}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <section className="p-8 border border-gray-100 rounded-[2rem]">
                                <h2 className="text-xl font-black text-gray-900 mb-4 tracking-tight">4. Bảo mật thông tin</h2>
                                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                    Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức để bảo vệ thông tin cá nhân của bạn khỏi truy cập trái phép, mất mát hoặc thay đổi.
                                </p>
                            </section>
                            <section className="p-8 border border-gray-100 rounded-[2rem]">
                                <h2 className="text-xl font-black text-gray-900 mb-4 tracking-tight">5. Chia sẻ thông tin</h2>
                                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                    Chúng tôi không bán hoặc cho thuê thông tin cá nhân của bạn. Thông tin chỉ được chia sẻ với đối tác tin cậy tuân thủ bảo mật.
                                </p>
                            </section>
                        </div>

                        <section className="bg-gray-900 p-10 rounded-[3rem] text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-700/20 blur-3xl"></div>
                            <div className="relative z-10 space-y-8">
                                <h2 className="text-3xl font-black tracking-tighter">Liên hệ hỗ trợ dữ liệu</h2>
                                <p className="text-gray-400 font-medium">Nếu bạn có yêu cầu xóa dữ liệu hoặc thắc mắc về quyền riêng tư, hãy kết nối với đội ngũ pháp lý của chúng tôi.</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 border border-white/10">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[0.6rem] font-black text-gray-500 uppercase tracking-widest">Email</p>
                                            <p className="text-sm font-bold">contact@vanvatcorp.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 border border-white/10">
                                            <Phone size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[0.6rem] font-black text-gray-500 uppercase tracking-widest">Hotline</p>
                                            <p className="text-sm font-bold">+84 327 777 596</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 border border-white/10">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[0.6rem] font-black text-gray-500 uppercase tracking-widest">Văn phòng</p>
                                            <p className="text-sm font-bold">Innovation Dr, TP. HCM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </article>
                </div>
            </main>

            <footer className="bg-gray-50 py-12 border-t">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">© 2026 VanVat Corporation. All rights reserved.</p>
                    <div className="flex gap-8 text-[0.65rem] font-black uppercase tracking-widest text-gray-500">
                        <a href="/terms-of-service" className="hover:text-blue-700 transition">Terms of Service</a>
                        <a href="/sitemap" className="hover:text-blue-700 transition">Sitemap</a>
                        <a href="/contact-us" className="hover:text-blue-700 transition">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PrivacyPolicy;
