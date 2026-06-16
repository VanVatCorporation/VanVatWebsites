import React from 'react';
import { Check, Star } from 'lucide-react';

const milestones = [
    { date: '01/2025', text: 'Thành lập tập đoàn và xây dựng đội ngũ cốt lõi.', status: 'done' },
    { date: '06/2025', text: 'Ra mắt các dịch vụ trực tuyến đầu tiên.', status: 'done' },
    { date: '12/2025', text: 'Mở rộng thị trường quốc tế và hợp tác chiến lược.', status: 'done' },
    { date: '06/2026 — Hiện tại', text: 'Đạt vị thế hàng đầu trong ngành và phát triển bền vững.', status: 'current' }
];

const Roadmap: React.FC = () => {
    return (
        <section id="roadmap" className="py-20 bg-gray-50" aria-label="Lộ trình">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center mb-16">
                    <p className="text-[0.75rem] font-bold tracking-widest uppercase text-blue-700 mb-2">Hành trình</p>
                    <h2 className="text-3xl md:text-3.5xl font-extrabold text-gray-900 leading-tight">Roadmap</h2>
                </div>

                {/* Desktop View */}
                <div className="hidden md:block relative max-w-5xl mx-auto">
                    {/* Connecting line */}
                    <div
                        className="absolute top-[23px] left-[12.5%] right-[12.5%] h-[2px] rounded-full"
                        style={{ background: 'linear-gradient(90deg, #16a34a 25%, #16a34a 50%, #16a34a 72%, #f59e0b 80%)' }}
                    ></div>

                    <div className="grid grid-cols-4 gap-4">
                        {milestones.map((milestone, index) => (
                            <div key={index} className="flex flex-col items-center relative z-10 text-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white transition-all ${milestone.status === 'done'
                                        ? 'bg-green-600 text-white shadow-[0_0_0_2px_#16a34a]'
                                        : 'bg-amber-500 text-white shadow-[0_0_0_2px_#f59e0b] animate-roadmap-pulse'
                                    }`}>
                                    {milestone.status === 'done' ? <Check size={20} /> : <Star size={20} />}
                                </div>
                                <div className="mt-4">
                                    <p className={`text-sm font-bold mb-1 ${milestone.status === 'done' ? 'text-green-600' : 'text-amber-600'}`}>
                                        {milestone.date}
                                    </p>
                                    <p className="text-gray-600 text-sm">{milestone.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile View */}
                <div className="md:hidden space-y-6 max-w-sm mx-auto">
                    {milestones.map((milestone, index) => (
                        <div key={index} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${milestone.status === 'done' ? 'bg-green-600 text-white' : 'bg-amber-500 text-white'
                                    }`}>
                                    {milestone.status === 'done' ? <Check size={16} /> : <Star size={16} />}
                                </div>
                                {index < milestones.length - 1 && (
                                    <div className={`flex-1 w-px mt-1 ${milestone.status === 'done' ? 'bg-green-300' : 'bg-amber-300'}`}></div>
                                )}
                            </div>
                            <div className="pb-4">
                                <p className={`font-bold text-sm ${milestone.status === 'done' ? 'text-green-600' : 'text-amber-600'}`}>
                                    {milestone.date}
                                </p>
                                <p className="text-gray-600 text-sm mt-1">{milestone.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes roadmap-pulse {
          0%, 100% { box-shadow: 0 0 0 2px #f59e0b, 0 0 0 5px rgba(245, 158, 11, 0.25); }
          50% { box-shadow: 0 0 0 2px #f59e0b, 0 0 0 10px rgba(245, 158, 11, 0.15); }
        }
        .animate-roadmap-pulse {
          animation: roadmap-pulse 2.5s ease-in-out infinite;
        }
      `}</style>
        </section>
    );
};

export default Roadmap;
