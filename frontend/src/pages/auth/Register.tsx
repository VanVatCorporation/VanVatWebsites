import React, { useState } from 'react';
import { Mail, Lock, UserPlus, User, MapPin, Calendar, HelpCircle, AlertCircle, Loader2, Target } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import MaintenanceBanner from '../../components/common/MaintenanceBanner';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        location: '',
        nationalID: '',
        gender: '',
        birthdate: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!formData.nationalID && !showModal) {
            setShowModal(true);
            return;
        }

        setLoading(true);
        setError(null);
        setShowModal(false);

        try {
            const { error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        username: formData.username,
                        location: formData.location,
                        gender: formData.gender,
                        birthdate: formData.birthdate,
                        national_id: formData.nationalID // Should ideally be hashed or handled by edge function
                    }
                }
            });

            if (error) throw error;

            // Redirect or show success
            window.location.href = '/van-vat-corporation/account/complete-profile';
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-inter selection:bg-blue-600 selection:text-white relative">
            <MaintenanceBanner />

            {/* Navbar Placeholder */}
            <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
                    <a className="flex items-center gap-2" href="/">
                        <img alt="Logo" className="h-8 w-8" src="https://www.vanvatcorp.com/public-res/logo-512.jpg" />
                        <span className="text-xl font-bold text-blue-700">Tập đoàn Vạn Vật</span>
                    </a>
                </div>
            </nav>

            <main className="flex-grow flex items-center justify-center pt-28 pb-20 px-6">
                <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <div className="text-center mb-10 space-y-3">
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Tham gia Vạn Vật</h1>
                        <p className="text-gray-500 font-medium tracking-tight">Khám phá sức mạnh của hệ sinh thái công nghệ hàng đầu</p>
                    </div>

                    <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-gray-100">
                        <form onSubmit={handleRegister} className="space-y-10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                {/* Account Basics */}
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
                                        <div className="w-10 h-10 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center font-black">1</div>
                                        <h2 className="text-xl font-black tracking-tight text-gray-900 uppercase tracking-widest text-sm">Thông tin tài khoản</h2>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[0.65rem] font-black text-gray-400 uppercase tracking-widest ml-1">Họ</label>
                                            <input name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:outline-none transition-all font-medium" placeholder="First Name" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[0.65rem] font-black text-gray-400 uppercase tracking-widest ml-1">Tên</label>
                                            <input name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:outline-none transition-all font-medium" placeholder="Last Name" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[0.65rem] font-black text-gray-400 uppercase tracking-widest ml-1">Tên người dùng</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                            <input name="username" required value={formData.username} onChange={handleChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:outline-none transition-all font-medium" placeholder="vanvat_user" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[0.65rem] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                            <input name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:outline-none transition-all font-medium" placeholder="you@example.com" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[0.65rem] font-black text-gray-400 uppercase tracking-widest ml-1">Mật khẩu</label>
                                            <div className="relative group">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                                <input name="password" type="password" required value={formData.password} onChange={handleChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:outline-none transition-all font-medium" placeholder="••••••••" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[0.65rem] font-black text-gray-400 uppercase tracking-widest ml-1">Xác nhận</label>
                                            <input name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:outline-none transition-all font-medium" placeholder="••••••••" />
                                        </div>
                                    </div>
                                </div>

                                {/* Personal Details */}
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
                                        <div className="w-10 h-10 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center font-black">2</div>
                                        <h2 className="text-xl font-black tracking-tight text-gray-900 uppercase tracking-widest text-sm">Thông tin cá nhân</h2>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[0.65rem] font-black text-gray-400 uppercase tracking-widest ml-1">Quốc tịch</label>
                                        <div className="relative group">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                            <select name="location" required value={formData.location} onChange={handleChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:outline-none transition-all font-medium appearance-none">
                                                <option value="">Chọn quốc tịch</option>
                                                <option value="VN">Vietnam</option>
                                                <option value="US">USA</option>
                                                <option value="EN">England</option>
                                                <option value="AU">Australia</option>
                                                <option value="Others">Others</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center ml-1">
                                            <label className="text-[0.65rem] font-black text-gray-400 uppercase tracking-widest">Căn cước công dân (Không bắt buộc)</label>
                                            <HelpCircle size={14} className="text-gray-300 cursor-help" />
                                        </div>
                                        <div className="relative group">
                                            <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                            <input name="nationalID" value={formData.nationalID} onChange={handleChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:outline-none transition-all font-medium" placeholder="ID Number (Optional)" />
                                        </div>
                                        <p className="text-[0.6rem] font-bold text-gray-400 italic">Dữ liệu sẽ được mã hóa bảo mật tuyệt đối.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[0.65rem] font-black text-gray-400 uppercase tracking-widest ml-1">Giới tính</label>
                                        <div className="flex gap-4">
                                            {['Nam', 'Nữ'].map((g, i) => (
                                                <label key={i} className={`flex-grow flex items-center justify-center py-4 rounded-2xl border-2 transition-all cursor-pointer font-black text-[0.65rem] uppercase tracking-widest ${formData.gender === i.toString() ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-50 bg-gray-50 text-gray-400 hover:border-gray-200'}`}>
                                                    <input type="radio" name="gender" value={i.toString()} checked={formData.gender === i.toString()} onChange={handleChange} className="hidden" />
                                                    {g}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[0.65rem] font-black text-gray-400 uppercase tracking-widest ml-1">Ngày sinh</label>
                                        <div className="relative group">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                            <input name="birthdate" type="date" required value={formData.birthdate} onChange={handleChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:outline-none transition-all font-medium" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-100 p-6 rounded-[2rem] flex items-center gap-4 text-red-600">
                                    <AlertCircle size={24} />
                                    <p className="font-bold text-sm leading-tight">{error}</p>
                                </div>
                            )}

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-700 text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-blue-700/30 hover:shadow-blue-700/50 hover:scale-[1.01] active:scale-95 transition-all text-lg uppercase tracking-[0.2em] flex items-center justify-center gap-4"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={24} /> : <UserPlus size={24} />}
                                    {loading ? 'Đang tạo tài khoản...' : 'Bắt đầu ngay'}
                                </button>
                                <p className="mt-8 text-center text-[0.65rem] font-black text-gray-400 uppercase tracking-widest">
                                    Đã có tài khoản? <a href="/van-vat-corporation/login" className="text-blue-700 hover:underline">Đăng nhập ngay</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            {/* National ID Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(30,58,138,0.25)] w-full max-w-sm p-10 text-center space-y-6">
                        <div className="w-20 h-20 bg-amber-50 text-amber-550 rounded-[2rem] flex items-center justify-center mx-auto">
                            <Target size={40} className="text-amber-500" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Ký danh bị trống</h3>
                            <p className="text-sm font-medium text-gray-500 leading-relaxed">Bạn có chắc muốn tiếp tục mà không nhập căn cước công dân? Một số đặc quyền tài chính sẽ bị giới hạn.</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => handleRegister()} className="w-full bg-blue-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-700/20 hover:scale-105 transition-all uppercase tracking-widest text-xs">Phát hành ngay</button>
                            <button onClick={() => setShowModal(false)} className="w-full bg-gray-50 text-gray-900 font-black py-4 rounded-2xl hover:bg-gray-100 transition-all uppercase tracking-widest text-xs">Điền ngay</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
