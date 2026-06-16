import { MapPin, Phone, Mail, Globe, Send } from 'lucide-react';

const Contact: React.FC = () => {
    const contactInfo = [
        { icon: <MapPin className="text-blue-600 w-5 h-5" />, label: 'Địa chỉ', value: '1234 Innovation Drive, Bình Chánh, TP. HCM, VN' },
        { icon: <Phone className="text-blue-600 w-5 h-5" />, label: 'Điện thoại', value: '+84327777596' },
        { icon: <Mail className="text-blue-600 w-5 h-5" />, label: 'Email', value: 'contact@vanvatcorp.com' },
        { icon: <Globe className="text-blue-600 w-5 h-5" />, label: 'Website', value: 'www.vanvatcorp.com' }
    ];

    const socialLinks = [
        { icon: <i className="fab fa-facebook-f"></i>, label: 'Facebook' },
        { icon: <i className="fab fa-twitter"></i>, label: 'Twitter' },
        { icon: <i className="fab fa-linkedin-in"></i>, label: 'LinkedIn' },
        { icon: <i className="fab fa-instagram"></i>, label: 'Instagram' }
    ];

    return (
        <section id="contact" className="py-20 bg-white" aria-label="Liên hệ">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center mb-14">
                    <p className="text-[0.75rem] font-bold tracking-widest uppercase text-blue-700 mb-2">Kết nối</p>
                    <h2 className="text-3xl md:text-3.5xl font-extrabold text-gray-900 leading-tight">Liên hệ chúng tôi</h2>
                </div>

                <div className="flex flex-col md:flex-row gap-12 max-w-5xl mx-auto">
                    {/* Form Side */}
                    <div className="md:w-1/2">
                        <form action="#" method="POST" className="space-y-5 bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-sm">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="name">Họ và tên</label>
                                <input
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[0.95rem] outline-none focus:border-blue-700 focus:ring-3 focus:ring-blue-100 transition-all"
                                    id="name" name="name" placeholder="Nhập họ và tên" required type="text"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">Địa chỉ Email</label>
                                <input
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[0.95rem] outline-none focus:border-blue-700 focus:ring-3 focus:ring-blue-100 transition-all"
                                    id="email" name="email" placeholder="you@example.com" required type="email"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="message">Nội dung</label>
                                <textarea
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[0.95rem] outline-none focus:border-blue-700 focus:ring-3 focus:ring-blue-100 transition-all resize-none"
                                    id="message" name="message" placeholder="Nhập nội dung tin nhắn..." required rows={5}
                                ></textarea>
                            </div>
                            <button
                                className="w-full bg-blue-700 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2"
                                type="submit"
                            >
                                <Send size={18} /> Gửi tin nhắn
                            </button>
                        </form>
                    </div>

                    {/* Info Side */}
                    <div className="md:w-1/2 flex flex-col justify-center gap-7">
                        <div className="space-y-6">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm mb-0.5">{info.label}</p>
                                        <p className="text-gray-500 text-sm leading-relaxed">{info.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3 pt-2">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    aria-label={social.label}
                                    href="#"
                                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center text-blue-700 hover:text-blue-800 transition-all duration-200"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
