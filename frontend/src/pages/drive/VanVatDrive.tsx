import React, { useState } from 'react';
import MaintenanceBanner from '../../components/common/MaintenanceBanner';
import {
    Cloud,
    Upload,
    Folder,
    File,
    Search,
    Plus,
    MoreVertical,
    Download,
    Trash2,
    Info,
    Clock,
    Shield
} from 'lucide-react';

const VanVatDrive: React.FC = () => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        // Simulate upload
        setUploading(true);
        let p = 0;
        const interval = setInterval(() => {
            p += 5;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setUploading(false);
                setProgress(0);
            }
        }, 100);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-inter selection:bg-blue-600 selection:text-white">
            <MaintenanceBanner />

            {/* Sidebar & Header Layout */}
            <div className="flex flex-grow pt-16">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r hidden lg:flex flex-col p-6 fixed h-full z-10">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-9 h-9 bg-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                            <Cloud size={20} />
                        </div>
                        <span className="text-xl font-black text-blue-900 tracking-tighter">VanVat <span className="italic text-indigo-600">Drive</span></span>
                    </div>

                    <button className="w-full bg-blue-700 text-white rounded-2xl py-4 flex items-center justify-center gap-2 font-black uppercase text-[0.65rem] tracking-widest hover:scale-105 transition-all shadow-xl shadow-blue-700/20 mb-10">
                        <Plus size={18} /> Tải lên mới
                    </button>

                    <nav className="flex-grow space-y-2">
                        {[
                            { label: "Tất cả tệp", icon: Folder, active: true },
                            { label: "Gần đây", icon: Clock },
                            { label: "Đã chia sẻ", icon: Folder },
                            { label: "Thùng rác", icon: Trash2 },
                            { label: "Bảo mật", icon: Shield }
                        ].map((item, i) => (
                            <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${item.active ? 'bg-blue-50 text-blue-700' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'}`}>
                                <item.icon size={18} />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-auto pt-6 border-t space-y-4">
                        <div className="flex items-center justify-between text-[0.6rem] font-black uppercase tracking-widest text-gray-400">
                            <span>Dung lượng</span>
                            <span>75%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <p className="text-[0.65rem] text-gray-500 font-medium">15 GB / 20 GB đang dùng</p>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-grow lg:ml-64 p-6 md:p-10">
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div className="relative flex-grow max-w-2xl">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Tìm kiếm tệp, thư mục..."
                                className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-400 hover:text-blue-700 transition shadow-sm border border-gray-100">
                                <Info size={20} />
                            </button>
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-700 font-black text-sm border border-indigo-200">NV</div>
                        </div>
                    </header>

                    {/* Upload Zone */}
                    <section
                        className={`mb-12 border-2 border-dashed rounded-[2.5rem] p-12 text-center transition-all ${isDragOver ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-white'}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {uploading ? (
                            <div className="space-y-6">
                                <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto animate-bounce">
                                    <Upload size={32} />
                                </div>
                                <div className="max-w-md mx-auto space-y-2">
                                    <div className="flex justify-between text-xs font-black uppercase tracking-widest text-blue-700">
                                        <span>Đang tải lên tệp...</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="w-16 h-16 bg-blue-700/10 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Upload size={32} />
                                </div>
                                <h2 className="text-xl font-black text-gray-900">Kéo và thả tệp vào đây</h2>
                                <p className="text-sm text-gray-400 font-medium italic">Hoặc click để chọn tệp từ thiết bị của bạn</p>
                                <button className="mt-8 bg-white border border-gray-200 text-gray-900 px-8 py-3 rounded-xl text-[0.65rem] font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">Chọn tệp</button>
                            </div>
                        )}
                    </section>

                    {/* File Explorer */}
                    <section className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Thư mục đề xuất</h3>
                            <button className="text-xs font-bold text-blue-700 hover:underline">Xem tất cả</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { name: "Tài liệu học tập", count: "124 tệp", color: "bg-blue-50 text-blue-700" },
                                { name: "Dự án Vạn Vật", count: "56 tệp", color: "bg-indigo-50 text-indigo-700" },
                                { name: "Ảnh kỷ niệm", count: "1.2k tệp", color: "bg-amber-50 text-amber-700" },
                                { name: "Sao lưu hệ thống", count: "8 tệp", color: "bg-emerald-50 text-emerald-700" }
                            ].map((dir, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group cursor-pointer">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className={`w-12 h-12 ${dir.color} rounded-2xl flex items-center justify-center`}>
                                            <Folder size={24} />
                                        </div>
                                        <MoreVertical size={18} className="text-gray-300 group-hover:text-gray-900" />
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-1">{dir.name}</h4>
                                    <p className="text-xs text-gray-400 font-medium">{dir.count}</p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Tệp tin gần đây</h3>
                            </div>
                            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-50 bg-gray-50/50">
                                            <th className="px-8 py-4 text-[0.6rem] font-black uppercase tracking-widest text-gray-400">Tên tệp</th>
                                            <th className="px-8 py-4 text-[0.6rem] font-black uppercase tracking-widest text-gray-400">Loại</th>
                                            <th className="px-8 py-4 text-[0.6rem] font-black uppercase tracking-widest text-gray-400">Kích thước</th>
                                            <th className="px-8 py-4 text-[0.6rem] font-black uppercase tracking-widest text-gray-400">Sửa đổi</th>
                                            <th className="px-8 py-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {[
                                            { name: "De-Cuong-Hoc-Tap.pdf", type: "PDF", size: "2.4 MB", date: "2 giờ trước" },
                                            { name: "VanVat-Logo-Concept.png", type: "Image", size: "1.1 MB", date: "Hôm qua" },
                                            { name: "Bao-Cao-Quy-1.xlsx", type: "Sheet", size: "540 KB", date: "15/05/2026" },
                                            { name: "Product-Strategy.docx", type: "Doc", size: "890 KB", date: "12/05/2026" }
                                        ].map((file, i) => (
                                            <tr key={i} className="hover:bg-gray-50 transition-colors group">
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-700 transition-all">
                                                            <File size={18} />
                                                        </div>
                                                        <span className="text-sm font-bold text-gray-900">{file.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-xs font-black text-gray-400">{file.type}</td>
                                                <td className="px-8 py-5 text-sm font-medium text-gray-500">{file.size}</td>
                                                <td className="px-8 py-5 text-sm font-medium text-gray-500">{file.date}</td>
                                                <td className="px-8 py-5 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                                        <button className="p-2 text-gray-400 hover:text-blue-700 transition"><Download size={18} /></button>
                                                        <button className="p-2 text-gray-400 hover:text-red-500 transition"><Trash2 size={18} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            {/* Footer Placeholder for Drive */}
            <footer className="bg-white border-t py-6 px-6 lg:ml-64 relative z-0">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[0.6rem] font-black text-gray-400 uppercase tracking-widest">© 2026 VanVat Drive — Secure Cloud Storage</p>
                    <div className="flex gap-8 text-[0.6rem] font-black uppercase tracking-widest text-gray-400">
                        <a href="/privacy-policy" className="hover:text-blue-700 transition">Bảo mật</a>
                        <a href="/terms-of-service" className="hover:text-blue-700 transition">Điều khoản</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default VanVatDrive;
