import React, { useState } from 'react';
import {
    AlertTriangle,
    XCircle,
    CheckCircle,
    ArrowLeft,
    Loader2,
    Trash2
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const RequestDeletion: React.FC = () => {
    const [confirmed, setConfirmed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!confirmed) return;

        if (!window.confirm("Bạn có CHẮC CHẮN muốn xóa tài khoản? Hành động này không thể hoàn tác.")) {
            return;
        }

        setLoading(true);
        // Integration with Supabase will happen here
        setTimeout(() => {
            setLoading(false);
            setStatus('success');
        }, 2000);
    };

    if (status === 'success') {
        return (
            <div className="flex flex-col min-h-screen bg-white">
                <Navbar />
                <main className="flex-grow flex items-center justify-center p-6">
                    <div className="text-center animate-in fade-in zoom-in-95 duration-500">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 text-green-600 rounded-full mb-8 shadow-xl shadow-green-100">
                            <CheckCircle size={56} />
                        </div>
                        <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">Tài khoản đã xóa</h2>
                        <p className="text-xl text-gray-500 mb-10 max-w-md mx-auto font-medium">
                            Tài khoản của bạn và toàn bộ dữ liệu liên quan đã được gỡ bỏ vĩnh viễn khỏi hệ thống của chúng tôi.
                        </p>
                        <a href="/" className="inline-block bg-blue-700 text-white font-black px-12 py-4 rounded-2xl hover:bg-blue-800 transition shadow-xl shadow-blue-700/20 active:scale-95 uppercase tracking-widest">
                            Trở về trang chủ
                        </a>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Navbar />

            <main className="flex-grow pt-28 pb-20 px-6">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/5 p-8 md:p-12 border border-gray-100">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 text-red-600 rounded-2xl mb-6 rotate-3">
                                <AlertTriangle size={40} />
                            </div>
                            <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Yêu cầu xóa tài khoản</h1>
                            <p className="text-gray-500 font-medium leading-relaxed">
                                Chúng tôi rất tiếc khi bạn muốn rời đi. Vui lòng hiểu rằng việc xóa tài khoản là một hành động vĩnh viễn.
                            </p>
                        </div>

                        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-10 rounded-2xl">
                            <h2 className="text-sm font-black text-red-800 mb-4 uppercase tracking-widest">Hệ quả nghiêm trọng</h2>
                            <ul className="space-y-4 text-red-700 font-medium">
                                <li className="flex items-start gap-3">
                                    <XCircle size={18} className="mt-1 flex-shrink-0" />
                                    <span>Toàn bộ dữ liệu cá nhân, hồ sơ và cài đặt sẽ bị <strong>gỡ bỏ vĩnh viễn</strong>.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <XCircle size={18} className="mt-1 flex-shrink-0" />
                                    <span>Bạn sẽ mất quyền truy cập vào tất cả dịch vụ của Vạn Vật và các gói đăng ký kèm theo.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <XCircle size={18} className="mt-1 flex-shrink-0" />
                                    <span>Điểm uy tín, cấp độ và phần thưởng đã tích lũy sẽ bị xóa và không thể khôi phục.</span>
                                </li>
                                <li className="flex items-start gap-3 text-red-800 font-black">
                                    <AlertTriangle size={18} className="mt-1 flex-shrink-0" />
                                    <span>Hành động này <strong>không thể đảo ngược</strong>.</span>
                                </li>
                            </ul>
                        </div>

                        <form onSubmit={handleDelete} className="space-y-8">
                            <label
                                className={`flex items-center gap-4 p-5 border-2 rounded-2xl transition-all cursor-pointer ${confirmed ? 'border-red-600 bg-red-50/50 shadow-lg shadow-red-100' : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                                    }`}
                            >
                                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${confirmed ? 'bg-red-600 border-red-600' : 'bg-white border-gray-300'
                                    }`}>
                                    {confirmed && <div className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                                <input
                                    type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} required className="hidden"
                                />
                                <span className={`text-sm font-bold transition-colors ${confirmed ? 'text-red-700' : 'text-gray-500'}`}>
                                    Tôi hiểu các hệ quả và muốn xóa tài khoản vĩnh viễn cùng toàn bộ dữ liệu liên quan.
                                </span>
                            </label>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    type="submit" disabled={!confirmed || loading}
                                    className="flex-1 bg-red-600 text-white font-black py-4 rounded-2xl hover:bg-red-700 disabled:opacity-50 transition shadow-xl shadow-red-600/20 active:scale-95 flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <Trash2 size={20} />}
                                    Xóa tài khoản vĩnh viễn
                                </button>
                                <a
                                    href="/van-vat-corporation/account/account-center"
                                    className="flex-1 bg-gray-100 text-gray-700 font-black py-4 rounded-2xl hover:bg-gray-200 transition text-center flex items-center justify-center gap-2 active:scale-95 border border-gray-200/50"
                                >
                                    <ArrowLeft size={18} /> Giữ lại tài khoản
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default RequestDeletion;
