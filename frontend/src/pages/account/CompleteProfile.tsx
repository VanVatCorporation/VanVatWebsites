import React, { useState, useEffect } from 'react';
import {
    Loader2,
    Eye,
    EyeOff,
    CheckCircle,
    XCircle,
    User,
    Lock,
    Calendar,
    MapPin,
    IdCard
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const CompleteProfile: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showNationalID, setShowNationalID] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: '0',
        birthdate: '',
        location: '',
        nationalID: ''
    });
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    useEffect(() => {
        // Mock check for profile status
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setStatus({ type: 'error', message: 'Mật khẩu không khớp!' });
            return;
        }
        setLoading(true);
        // Integration with Supabase will happen here
        setTimeout(() => {
            setLoading(false);
            setStatus({ type: 'success', message: 'Hoàn tất hồ sơ thành công! Đang chuyển hướng...' });
        }, 1500);
    };

    if (loading && !status) {
        return (
            <div className="flex flex-col min-h-screen bg-white">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <Loader2 className="animate-spin h-10 w-10 text-blue-700" />
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/30">
            <Navbar />

            <main className="flex-grow pt-28 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">Hoàn tất hồ sơ</h1>
                        <p className="text-gray-500 font-medium tracking-wide">Vui lòng cung cấp thêm thông tin để sử dụng đầy đủ dịch vụ</p>
                    </div>

                    {status && (
                        <div className={`mb-8 p-4 rounded-xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${status.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                            }`}>
                            {status.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
                            <span className="font-bold">{status.message}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-8 md:p-12 border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">

                            {/* Account Basics */}
                            <div className="space-y-8">
                                <h2 className="text-xl font-black text-gray-900 border-l-4 border-blue-700 pl-4 tracking-wide uppercase text-sm">Account Settings</h2>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Họ</label>
                                        <input
                                            type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Tên</label>
                                        <input
                                            type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Username <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text" name="username" value={formData.username} onChange={handleInputChange} required placeholder="username"
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Password <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInputChange} required placeholder="••••••••"
                                            className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold"
                                        />
                                        <button
                                            type="button" onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-700 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Confirm Password <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required placeholder="••••••••"
                                            className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold"
                                        />
                                        <button
                                            type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-700 transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Personal Details */}
                            <div className="space-y-8">
                                <h2 className="text-xl font-black text-gray-900 border-l-4 border-indigo-700 pl-4 tracking-wide uppercase text-sm">Personal Details</h2>

                                <div className="space-y-3">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1 block">Giới tính <span className="text-red-500">*</span></label>
                                    <div className="flex gap-4">
                                        <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all cursor-pointer font-bold ${formData.gender === '0' ? 'border-indigo-700 bg-indigo-50 text-indigo-700 shadow-lg shadow-indigo-100' : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'}`}>
                                            <input type="radio" name="gender" value="0" checked={formData.gender === '0'} onChange={handleInputChange} className="hidden" />
                                            <span>Nam</span>
                                        </label>
                                        <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all cursor-pointer font-bold ${formData.gender === '1' ? 'border-indigo-700 bg-indigo-50 text-indigo-700 shadow-lg shadow-indigo-100' : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'}`}>
                                            <input type="radio" name="gender" value="1" checked={formData.gender === '1'} onChange={handleInputChange} className="hidden" />
                                            <span>Nữ</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Ngày sinh <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="date" name="birthdate" value={formData.birthdate} onChange={handleInputChange} required
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-700 focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Quốc tịch</label>
                                    <div className="relative">
                                        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        <select
                                            name="location" value={formData.location} onChange={handleInputChange}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-700 focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-medium bg-white appearance-none"
                                        >
                                            <option value="">Chọn quốc tịch</option>
                                            <option value="VN">Vietnam</option>
                                            <option value="US">USA</option>
                                            <option value="AU">Australia</option>
                                            <option value="EN">England</option>
                                            <option value="Others">Khác</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">CCCD / National ID</label>
                                    <div className="relative">
                                        <IdCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type={showNationalID ? "text" : "password"} name="nationalID" value={formData.nationalID} onChange={handleInputChange} placeholder="Không bắt buộc"
                                            className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 focus:border-indigo-700 focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-bold"
                                        />
                                        <button
                                            type="button" onClick={() => setShowNationalID(!showNationalID)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-700 transition-colors"
                                        >
                                            {showNationalID ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    <p className="text-[0.65rem] text-gray-400 italic pl-1">Sẽ được mã hóa bảo mật. Cung cấp để tăng điểm uy tín.</p>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit" disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-black py-4 rounded-2xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all active:scale-[0.98] mt-12 text-lg uppercase tracking-widest disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin mx-auto h-7 w-7" /> : "Hoàn tất đăng ký"}
                        </button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CompleteProfile;
