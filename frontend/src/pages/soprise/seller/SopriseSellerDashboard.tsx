import React, { useState } from 'react';
import {
    Bell,
    ChevronDown,
    Download,
    Box,
    Tags,
    Megaphone,
    ChartLine,
    Wallet,
    Settings,
    LayoutDashboard,
    Info,
    ArrowUp,
    Star,
    GraduationCap,
    MessageSquare,
    Zap,
    ChevronRight
} from 'lucide-react';
import MaintenanceBanner from '../../../components/common/MaintenanceBanner';

const SopriseSellerDashboard: React.FC = () => {
    const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

    const stats = [
        { label: 'Chờ Xác Nhận', value: 3, color: 'text-gray-900', bg: 'bg-white' },
        { label: 'Chờ Lấy Hàng', value: 1, color: 'text-amber-600', bg: 'bg-white' },
        { label: 'Đã Xử Lý', value: 12, color: 'text-emerald-600', bg: 'bg-white' },
        { label: 'Sản Phẩm Tạm Khoá', value: 0, color: 'text-red-600', bg: 'bg-white' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-inter">
            <MaintenanceBanner />

            {/* Dashboard Topbar */}
            <header className="bg-white border-b h-16 flex items-center justify-between px-6 sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-black text-sm italic">S</div>
                    <span className="text-xl font-black text-blue-900 tracking-tighter">Sop<span className="text-indigo-600 italic">rise</span></span>
                    <span className="h-4 w-[1px] bg-gray-200 mx-2"></span>
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest hidden md:block">Kênh Người Bán</span>
                </div>

                <div className="flex items-center gap-2">
                    <button className="p-2.5 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all"><Download size={20} /></button>
                    <button className="p-2.5 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-4 h-4 bg-red-600 text-[0.6rem] font-black text-white rounded-full flex items-center justify-center border-2 border-white">5</span>
                    </button>
                    <button className="p-2.5 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all"><MessageSquare size={20} /></button>
                    <span className="h-6 w-[1px] bg-gray-100 mx-2"></span>
                    <button className="flex items-center gap-3 pl-2 group">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-700 to-indigo-800 text-white rounded-lg flex items-center justify-center font-black text-xs shadow-lg shadow-blue-700/20">V</div>
                        <div className="hidden lg:block text-left">
                            <p className="text-[0.6rem] font-black text-gray-400 uppercase tracking-widest mb-0.5">vavastore1234</p>
                            <div className="flex items-center gap-1">
                                <span className="text-xs font-bold text-gray-900">Người bán Platinum</span>
                                <ChevronDown size={12} className="text-gray-400" />
                            </div>
                        </div>
                    </button>
                </div>
            </header>

            <div className="flex-grow flex overflow-hidden">

                {/* Sidebar */}
                <aside className="w-64 bg-white border-r hidden lg:flex flex-col flex-shrink-0">
                    <div className="p-6 border-b">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-lg font-black shadow-inner">V</div>
                            <div>
                                <h3 className="text-sm font-black text-gray-900">vavastore1234</h3>
                                <div className="flex items-center gap-1.5 pt-0.5">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-sm shadow-emerald-500/50"></span>
                                    <span className="text-[0.7rem] font-bold text-emerald-600">Đang hoạt động</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <nav className="flex-grow overflow-y-auto p-4 space-y-2 no-scrollbar">
                        <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-black text-sm transition-all border border-blue-100/50">
                            <LayoutDashboard size={20} /> Tổng quan
                        </a>

                        {[
                            { id: 'orders', label: 'Đơn hàng', icon: <Box size={20} />, sub: ['Tất cả đơn', 'Chờ xác nhận', 'Chờ lấy hàng', 'Đang giao'] },
                            { id: 'products', label: 'Sản phẩm', icon: <Tags size={20} />, sub: ['Tất cả sản phẩm', 'Thêm sản phẩm', 'Cần bổ sung', 'Tối ưu AI'] },
                            { id: 'marketing', label: 'Marketing', icon: <Megaphone size={20} />, sub: ['Quảng cáo', 'Flash Sale', 'Mã giảm giá'] },
                            { id: 'analytics', label: 'Phân tích', icon: <ChartLine size={20} />, sub: ['Doanh số', 'Khách hàng', 'Sản phẩm'] },
                            { id: 'finance', label: 'Tài chính', icon: <Wallet size={20} />, sub: ['Số dư', 'Giao dịch', 'Rút tiền'] },
                            { id: 'settings', label: 'Cài đặt', icon: <Settings size={20} />, sub: ['Hồ sơ shop', 'Thiết lập', 'Tài khoản phụ'] },
                        ].map(group => (
                            <div key={group.id} className="space-y-1">
                                <button
                                    onClick={() => setExpandedGroup(expandedGroup === group.id ? null : group.id)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all hover:bg-gray-50 border border-transparent ${expandedGroup === group.id ? 'text-gray-900 font-black' : 'text-gray-500 font-bold'}`}
                                >
                                    <span className="flex items-center gap-3">{group.icon} {group.label}</span>
                                    <ChevronRight size={14} className={`transition-transform duration-300 ${expandedGroup === group.id ? 'rotate-90' : ''}`} />
                                </button>
                                {expandedGroup === group.id && (
                                    <div className="pl-12 space-y-1 animate-in slide-in-from-top-2 duration-200">
                                        {group.sub.map(s => (
                                            <a key={s} href="#" className="block p-2 text-xs font-black text-gray-400 hover:text-blue-700 uppercase tracking-widest transition-colors">{s}</a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-grow overflow-y-auto p-6 md:p-10 no-scrollbar">

                    {/* Alert Banner */}
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-[1.5rem] flex items-center gap-4 mb-10 animate-in fade-in duration-700 shadow-sm">
                        <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
                            <Info size={20} />
                        </div>
                        <p className="text-sm font-bold text-amber-800">
                            Hoàn tất hồ sơ gian hàng để tăng hiển thị sản phẩm tới 15% khách hàng tiềm năng. <a href="#" className="font-black underline underline-offset-4 ml-1">Cập nhật ngay →</a>
                        </p>
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Tổng quan</h1>
                        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
                            <button className="px-5 py-2 bg-gray-50 text-gray-500 rounded-lg text-[0.65rem] font-black uppercase tracking-widest hover:text-blue-700 transition">Hôm nay</button>
                            <button className="px-5 py-2 text-gray-500 rounded-lg text-[0.65rem] font-black uppercase tracking-widest hover:text-blue-700 transition">7 ngày qua</button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {stats.map(s => (
                            <div key={s.label} className="bg-white p-6 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-gray-50 hover:scale-[1.02] transition-transform cursor-pointer group">
                                <p className="text-4xl font-black mb-3 tracking-tighter group-hover:scale-105 transition-transform origin-left">{s.value}</p>
                                <p className={`text-[0.65rem] font-black uppercase tracking-widest ${s.color} opacity-60`}>{s.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* Analytics Main Card */}
                        <div className="xl:col-span-2 space-y-8">
                            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 p-8 border border-gray-50">
                                <div className="flex items-center justify-between mb-10">
                                    <div>
                                        <h2 className="text-xl font-black text-gray-900 tracking-tight mb-1">Phân Tích Bán Hàng</h2>
                                        <p className="text-[0.65rem] font-black text-gray-400 uppercase tracking-widest leading-none">Hôm nay 00:00 — 16:00 GMT+7</p>
                                    </div>
                                    <button className="flex items-center gap-2 text-[0.65rem] font-black text-blue-700 uppercase tracking-widest hover:gap-3 transition-all">
                                        Chi tiết <ChevronRight size={14} />
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-50">
                                                <th className="text-left py-4 text-[0.6rem] font-black text-gray-300 uppercase tracking-[0.2em] pl-4">Chỉ số</th>
                                                <th className="text-right py-4 text-[0.6rem] font-black text-gray-300 uppercase tracking-[0.2em]">Hôm nay</th>
                                                <th className="text-right py-4 text-[0.6rem] font-black text-gray-300 uppercase tracking-[0.2em]">Hôm qua</th>
                                                <th className="text-right py-4 text-[0.6rem] font-black text-gray-300 uppercase tracking-[0.2em] pr-4">Thay đổi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {[
                                                { label: 'Doanh số', cur: 'đ1.250.000', prev: 'đ980.000', up: true, val: '27.6%' },
                                                { label: 'Lượt truy cập', cur: '248', prev: '191', up: true, val: '29.8%' },
                                                { label: 'Product Clicks', cur: '84', prev: '67', up: true, val: '25.4%' },
                                                { label: 'Đơn hàng', cur: '16', prev: '11', up: true, val: '45.5%' },
                                                { label: 'Tỷ lệ chuyển đổi', cur: '6.45%', prev: '5.76%', up: true, val: '12.0%' },
                                            ].map(row => (
                                                <tr key={row.label} className="group hover:bg-gray-50/50 transition-colors">
                                                    <td className="py-5 font-black text-sm text-gray-500 pl-4">{row.label}</td>
                                                    <td className="py-5 text-right font-black text-sm text-gray-900">{row.cur}</td>
                                                    <td className="py-5 text-right font-bold text-sm text-gray-400">{row.prev}</td>
                                                    <td className="py-5 text-right pr-4">
                                                        <span className="inline-flex items-center gap-1 font-black text-[0.65rem] text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                                                            <ArrowUp size={10} className="stroke-[4px]" /> {row.val}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Promo Banner */}
                            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl shadow-blue-700/20">
                                <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                                    <h3 className="text-2xl font-black mb-3 tracking-tight">🚀 Bắt đầu dịch vụ hiển thị đầu tiên của bạn</h3>
                                    <p className="text-blue-100 font-medium">Tăng trưởng doanh số ước tính +15% — Nhận ngay đ100.000 tín dụng quảng cáo miễn phí</p>
                                </div>
                                <button className="relative z-10 bg-white text-blue-900 font-black px-10 py-4 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest whitespace-nowrap">Tạo ngay</button>
                                {/* Decorative */}
                                <div className="absolute -right-10 -bottom-10 opacity-10">
                                    <Zap size={240} className="rotate-12" fill="currentColor" />
                                </div>
                            </div>
                        </div>

                        {/* Side Cards */}
                        <div className="space-y-8">
                            {/* Performance Card */}
                            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 p-8 border border-gray-50">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xl font-black text-gray-900 tracking-tight">Hiệu quả</h2>
                                    <button className="text-gray-400 hover:text-blue-700 transition"><ChevronRight size={18} /></button>
                                </div>
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-4xl font-black text-emerald-600 tracking-tighter">Tốt</span>
                                    <span className="text-[0.65rem] font-black text-gray-400 uppercase tracking-widest">Hiệu suất tổng</span>
                                </div>
                                <p className="text-[0.65rem] font-black text-amber-500 uppercase tracking-widest mb-10">1 chỉ số cần cải thiện</p>

                                <div className="space-y-6">
                                    {[
                                        { label: 'Tỷ lệ phản hồi chat', val: '98.2%', status: 'good' },
                                        { label: 'Thời gian phản hồi', val: '< 1 giờ', status: 'good' },
                                        { label: 'Tỷ lệ đơn huỷ', val: '2.1%', status: 'warn' },
                                        { label: 'Đánh giá trung bình', val: '4.8 ⭐', status: 'good' },
                                    ].map(i => (
                                        <div key={i.label} className="flex justify-between items-center group">
                                            <span className="text-xs font-bold text-gray-400 group-hover:text-gray-600 transition-colors">{i.label}</span>
                                            <span className={`text-[0.65rem] font-black uppercase px-2 py-1 rounded-md ${i.status === 'warn' ? 'text-amber-600 bg-amber-50' : 'text-emerald-600 bg-emerald-50'}`}>{i.val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Suggestions Card */}
                            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 p-8 border border-gray-50">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-xl font-black text-gray-900 tracking-tight">Gợi ý</h2>
                                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[0.6rem] font-black rounded-md">3 Mới</span>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    {[
                                        { icon: <ChartLine size={18} />, color: 'bg-blue-50 text-blue-700', text: 'Tăng trưởng ước tính +15% nếu bật quảng cáo cho sản phẩm bán chạy nhất', action: 'Tạo quảng cáo' },
                                        { icon: <Star size={18} />, color: 'bg-amber-50 text-amber-600', text: 'Tạo mã giảm giá — Nhận đ3.000 tín dụng dịch vụ hiển thị', action: 'Thực hiện' },
                                        { icon: <GraduationCap size={18} />, color: 'bg-emerald-50 text-emerald-600', text: 'Hoàn thành khoá học Bán hàng Soprise — Nhận 5 lần đẩy sản phẩm', action: 'Học ngay' },
                                    ].map(i => (
                                        <div key={i.text} className="flex gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center shadow-inner ${i.color}`}>
                                                {i.icon}
                                            </div>
                                            <div className="space-y-3">
                                                <p className="text-[0.65rem] font-bold text-gray-500 leading-relaxed">{i.text}</p>
                                                <button className="text-[0.6rem] font-black text-blue-700 uppercase tracking-[0.2em] border-b-2 border-blue-700 pb-0.5 hover:pb-1 transition-all">{i.action}</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SopriseSellerDashboard;
