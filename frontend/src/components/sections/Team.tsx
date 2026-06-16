import React from 'react';

const team = [
    {
        name: 'Nguyễn Quốc Việt',
        role: 'Chief Executive Officer',
        desc: 'Nhà sáng lập Tập đoàn Vạn Vật. Mang đến những ý tưởng điên rồ nhưng hết sức khả thi và thiết thực.',
        img: 'https://www.vanvatcorp.com/res/ceo.jpg'
    },
    {
        name: 'Maria Lopez',
        role: 'Chief Financial Officer',
        desc: 'Expert in financial strategy and corporate growth management.',
        img: 'https://storage.googleapis.com/a1aa/image/27e82b7a-96b8-4f11-b592-cb74673a2557.jpg'
    },
    {
        name: 'David Kim',
        role: 'Chief Technology Officer',
        desc: 'Leading technology innovation and product development.',
        img: 'https://storage.googleapis.com/a1aa/image/e219925a-5746-4a81-fd09-b0b7a8bd7e2d.jpg'
    },
    {
        name: 'Samantha Green',
        role: 'Chief Marketing Officer',
        desc: 'Driving brand strategy and customer engagement worldwide.',
        img: 'https://storage.googleapis.com/a1aa/image/1c6a1c33-a31a-46c2-32f8-4cd1f211d660.jpg'
    }
];

const Team: React.FC = () => {
    return (
        <section id="team" className="py-20 bg-white" aria-label="Đội ngũ lãnh đạo">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center mb-14">
                    <p className="text-[0.75rem] font-bold tracking-widest uppercase text-blue-700 mb-2">Con người</p>
                    <h2 className="text-3xl md:text-3.5xl font-extrabold text-gray-900 leading-tight">Các vị lãnh đạo</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {team.map((member, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                            <img
                                className="w-22 h-22 rounded-full object-cover border-[3px] border-blue-100 mx-auto mb-4"
                                src={member.img}
                                alt={`${member.name} - ${member.role}`}
                                loading="lazy"
                            />
                            <h3 className="font-bold text-gray-900">{member.name}</h3>
                            <p className="text-blue-600 text-sm font-medium mt-1 mb-2">{member.role}</p>
                            <p className="text-gray-500 text-[0.8rem] leading-relaxed">{member.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
