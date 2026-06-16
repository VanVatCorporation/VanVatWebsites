import React from 'react';
import { ArrowRight } from 'lucide-react';

const About: React.FC = () => {
    const stats = [
        { label: 'Thành lập', value: '2025' },
        { label: 'Dịch vụ', value: '4+' },
        { label: 'Khởi nguồn', value: 'VN' }
    ];

    return (
        <section id="about" className="py-20 bg-white" aria-label="Về chúng tôi">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex flex-col md:flex-row items-center gap-14">
                    {/* Image Side */}
                    <div className="md:w-1/2 w-full">
                        <div className="relative inline-block w-full">
                            <div className="absolute inset-[-10px] bg-gradient-to-br from-blue-100 to-purple-100 rounded-[20px] z-0"></div>
                            <img
                                src="https://storage.googleapis.com/a1aa/image/b21ccaa5-26c6-4a29-c815-46a049da337e.jpg"
                                alt="Trụ sở Tập đoàn Vạn Vật"
                                className="rounded-2xl shadow-lg w-full relative z-10"
                                loading="lazy"
                                width={600}
                                height={400}
                            />
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="md:w-1/2">
                        <p className="text-[0.75rem] font-bold tracking-widest uppercase text-blue-700 mb-2">Về chúng tôi</p>
                        <h2 className="text-3xl md:text-3.5xl font-extrabold text-gray-900 leading-tight mb-6">Tập đoàn Vạn Vật</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Được thành lập vào 2025, Tập đoàn Vạn Vật có khả năng cung cấp cho người dùng những tiện ích,
                            cơ sở hạ tầng, dịch vụ — từ phi trực tuyến đến trực tuyến, giúp khai thác tối đa tiềm năng
                            trong mọi lĩnh vực, bao gồm giải trí, cá nhân hóa, hỗ trợ,...
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            Với tiềm năng phát triển cao, tập đoàn hứa hẹn sẽ mở rộng trên trường quốc tế, mang thương hiệu
                            Việt Nam ra toàn cầu!
                        </p>

                        {/* Stats row */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-blue-50 border border-blue-200 rounded-xl py-4 px-5 text-center transition-all hover:shadow-md">
                                    <div className="text-2xl font-extrabold text-blue-700">{stat.value}</div>
                                    <div className="text-[0.7rem] text-gray-500 uppercase tracking-wider mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <a
                            href="/van-vat-corporation/contact-us/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition shadow-sm"
                        >
                            Tìm hiểu thêm <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
