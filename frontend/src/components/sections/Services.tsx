import React from 'react';
import { Cloud, BarChart3, ShieldCheck, Handshake } from 'lucide-react';

const services = [
    {
        icon: <Cloud className="text-blue-600" />,
        bg: 'bg-blue-50',
        title: 'Giải pháp Đám mây',
        description: 'Hạ tầng đám mây linh hoạt và bảo mật, tùy chỉnh theo nhu cầu doanh nghiệp.'
    },
    {
        icon: <BarChart3 className="text-green-600" />,
        bg: 'bg-green-50',
        title: 'Phân tích Dữ liệu',
        description: 'Khai thác insight từ dữ liệu, hỗ trợ ra quyết định kinh doanh thông minh hơn.'
    },
    {
        icon: <ShieldCheck className="text-purple-600" />,
        bg: 'bg-purple-50',
        title: 'An ninh Mạng',
        description: 'Bảo vệ tài sản số với các giải pháp bảo mật tiên tiến, đáng tin cậy.'
    },
    {
        icon: <Handshake className="text-amber-600" />,
        bg: 'bg-amber-50',
        title: 'Tư vấn Chiến lược',
        description: 'Tư vấn chuyên sâu giúp tối ưu vận hành và đẩy nhanh tăng trưởng.'
    }
];

const Services: React.FC = () => {
    return (
        <section id="services" className="py-20 bg-gray-50" aria-label="Dịch vụ">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center mb-14">
                    <p className="text-[0.75rem] font-bold tracking-widest uppercase text-blue-700 mb-2">Giải pháp</p>
                    <h2 className="text-3xl md:text-3.5xl font-extrabold text-gray-900 leading-tight">Các dịch vụ hiện tại</h2>
                    <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                        Từ hạ tầng đám mây đến tư vấn chiến lược — chúng tôi cung cấp đầy đủ công cụ bạn cần.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative bg-white border border-gray-200 rounded-2xl p-7 transition-all duration-300 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                        >
                            {/* Top border effect */}
                            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-700 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                            <div className={`w-13 h-13 ${service.bg} rounded-xl flex items-center justify-center mb-5 text-2xl`}>
                                {service.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
