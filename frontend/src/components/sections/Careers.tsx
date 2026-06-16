import { Code, ListTodo, Palette, ArrowRight } from 'lucide-react';

const jobs = [
    {
        icon: <Code className="text-blue-600 w-5 h-5" />,
        bg: 'bg-blue-50',
        title: 'Software Engineer',
        desc: 'Develop and maintain scalable software solutions in a collaborative environment.'
    },
    {
        icon: <ListTodo className="text-green-600 w-5 h-5" />,
        bg: 'bg-green-50',
        title: 'Product Manager',
        desc: 'Lead product development cycles and coordinate cross-functional teams.'
    },
    {
        icon: <Palette className="text-purple-600 w-5 h-5" />,
        bg: 'bg-purple-50',
        title: 'UX/UI Designer',
        desc: 'Design intuitive user experiences and interfaces for our products.'
    }
];

const Careers: React.FC = () => {
    return (
        <section id="careers" className="py-20 bg-gray-50" aria-label="Cơ hội nghề nghiệp">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center mb-14">
                    <p className="text-[0.75rem] font-bold tracking-widest uppercase text-blue-700 mb-2">Tuyển dụng</p>
                    <h2 className="text-3xl md:text-3.5xl font-extrabold text-gray-900 leading-tight">Join Our Team</h2>
                    <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                        We're always looking for talented and passionate individuals to help us shape the future.
                        Explore our current openings and become part of the Tập đoàn Vạn Vật family.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {jobs.map((job, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-blue-300 hover:shadow-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-9 h-9 rounded-lg ${job.bg} flex items-center justify-center`}>
                                    {job.icon}
                                </div>
                                <h3 className="font-bold text-gray-900">{job.title}</h3>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed mb-4">{job.desc}</p>
                            <a
                                href="/van-vat-corporation/contact-us/"
                                className="text-sm text-blue-700 font-semibold hover:underline flex items-center gap-1 group"
                            >
                                Apply Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Careers;
