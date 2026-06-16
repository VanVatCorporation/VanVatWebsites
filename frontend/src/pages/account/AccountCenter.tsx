import React, { useState, useEffect, useRef } from 'react';
import {
    Loader2,
    Camera,
    Edit,
    UserMinus,
    Mail,
    MapPin,
    Calendar,
    CheckCircle,
    XCircle,
    LogOut,
    Layers,
    Star
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import MaintenanceBanner from '../../components/common/MaintenanceBanner';

interface UserProfile {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string;
    bio?: string;
    location?: string;
    gender?: number; // 0: Male, 1: Female, 2: Other
    birthdate?: string;
    createdAt: string;
    reputation: number;
    globalTierID: number;
}

const AccountCenter: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<UserProfile>>({});
    const [updateStatus, setUpdateStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);

    // Mock loading for now since Supabase/Backend is not yet linked
    useEffect(() => {
        const timer = setTimeout(() => {
            setProfile({
                id: '1',
                username: 'nguyenviet',
                firstName: 'Việt',
                lastName: 'Nguyễn Quốc',
                email: 'contact@vanvatcorp.com',
                avatarUrl: 'https://www.vanvatcorp.com/public-res/logo-512.jpg',
                bio: 'Nhà sáng lập Tập đoàn Vạn Vật.',
                location: 'VN',
                gender: 0,
                birthdate: '2000-01-01T00:00:00.000Z',
                createdAt: '2025-01-01T00:00:00.000Z',
                reputation: 150,
                globalTierID: 3
            });
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleLogout = () => {
        console.log('Logging out...');
    };

    const startEditing = () => {
        if (profile) {
            setFormData(profile);
            setIsEditing(true);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setProfile(prev => ({ ...prev!, ...formData }));
            setIsEditing(false);
            setLoading(false);
            setUpdateStatus({ type: 'success', message: 'Hồ sơ đã được cập nhật thành công!' });
            setTimeout(() => setUpdateStatus(null), 3000);
        }, 800);
    };

    const handleAvatarClick = () => {
        avatarInputRef.current?.click();
    };

    if (loading && !profile) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-50">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="animate-spin h-12 w-12 border-b-2 border-blue-700 mx-auto" />
                        <p className="mt-4 text-gray-600 font-medium tracking-wide">Đang tải hồ sơ...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const tiers: Record<number, string> = { 1: 'Standard', 2: 'Premium', 3: 'Elite' };
    const locationMap: Record<string, string> = { 'US': 'USA', 'EN': 'England', 'AU': 'Australia', 'VN': 'Vietnam' };
    const genderMap: Record<number, string> = { 0: 'Nam', 1: 'Nữ', 2: 'Khác' };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <MaintenanceBanner />
            <Navbar />

            <main className="flex-grow pt-28 pb-20">
                <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">

                    <div className="flex items-center justify-between mb-8 group">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Account Center</h1>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-red-600 font-bold hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                        >
                            Đăng xuất <LogOut size={18} />
                        </button>
                    </div>

                    {updateStatus && (
                        <div className={`mb-6 p-4 rounded-xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${updateStatus.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                            }`}>
                            {updateStatus.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
                            <span className="font-semibold">{updateStatus.message}</span>
                        </div>
                    )}

                    {!isEditing ? (
                        <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-8 md:p-10 border border-gray-100 overflow-hidden relative">
                            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 opacity-10"></div>

                            <div className="relative flex flex-col md:flex-row items-center gap-8 mb-12">
                                <div className="group relative">
                                    <div className="absolute inset-0 bg-blue-700 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                    <img
                                        src={profile?.avatarUrl}
                                        alt="User Avatar"
                                        className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-2xl relative z-10"
                                    />
                                    <button
                                        onClick={handleAvatarClick}
                                        className="absolute bottom-1 right-1 bg-blue-700 text-white rounded-full p-3 hover:bg-blue-800 transition shadow-lg z-20 scale-90 hover:scale-100"
                                    >
                                        <Camera size={20} />
                                    </button>
                                    <input type="file" ref={avatarInputRef} accept="image/*" className="hidden" />
                                </div>

                                <div className="text-center md:text-left flex-1">
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                                        <h2 className="text-3xl lg:text-3.5xl font-black text-gray-900">@{profile?.username}</h2>
                                        <div className="flex gap-2 justify-center md:justify-start">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                                <Layers size={14} /> Tier: {tiers[profile?.globalTierID || 1]}
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                                <Star size={14} /> {profile?.reputation} Reputation
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 font-medium max-w-xl italic">
                                        {profile?.bio || 'Chưa có tiểu sử. Hãy giới thiệu bản thân nhé!'}
                                    </p>
                                </div>

                                <button
                                    onClick={startEditing}
                                    className="px-6 py-3 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition shadow-lg shadow-blue-700/20 active:scale-95 flex items-center gap-2"
                                >
                                    <Edit size={18} /> Chỉnh sửa hồ sơ
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <h3 className="text-xl font-extrabold text-gray-900 border-l-4 border-blue-700 pl-4">Personal Info</h3>
                                    <div className="space-y-6">
                                        <div className="group">
                                            <label className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest block mb-1 group-hover:text-blue-700 transition-colors">Full Name</label>
                                            <p className="text-lg font-bold text-gray-800">{profile?.firstName} {profile?.lastName}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest block mb-1">Gender</label>
                                                <p className="font-bold text-gray-800">{genderMap[profile?.gender ?? 2]}</p>
                                            </div>
                                            <div>
                                                <label className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest block mb-1">Birthday</label>
                                                <p className="font-bold text-gray-800">
                                                    {profile?.birthdate ? new Date(profile.birthdate).toLocaleDateString() : 'Chưa thiết lập'}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest block mb-1">Location</label>
                                            <div className="flex items-center gap-2 font-bold text-gray-800">
                                                <MapPin size={18} className="text-blue-700" />
                                                {locationMap[profile?.location || ''] || 'Chưa thiết lập'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <h3 className="text-xl font-extrabold text-gray-900 border-l-4 border-indigo-700 pl-4">Account Security</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest block mb-1">Email address</label>
                                            <div className="flex items-center gap-2 font-bold text-gray-800">
                                                <Mail size={18} className="text-indigo-700" />
                                                {profile?.email}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest block mb-1">Member Since</label>
                                            <div className="flex items-center gap-2 font-bold text-gray-800">
                                                <Calendar size={18} className="text-indigo-700" />
                                                {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'Unknown'}
                                            </div>
                                        </div>
                                        <div className="pt-6 border-t border-gray-100">
                                            <p className="text-[0.7rem] font-black text-red-600 uppercase tracking-widest mb-3">Danger Zone</p>
                                            <a href="/request-deletion" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-red-600 transition-colors">
                                                <UserMinus size={16} /> Delete Account
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 animate-in zoom-in-95 duration-200">
                            <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-2">
                                <Edit className="text-blue-700" /> Chỉnh sửa hồ sơ
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Tên (First Name)</label>
                                        <input
                                            type="text" name="firstName" value={formData.firstName || ''} onChange={handleInputChange} required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Họ (Last Name)</label>
                                        <input
                                            type="text" name="lastName" value={formData.lastName || ''} onChange={handleInputChange} required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Giới tính</label>
                                        <select
                                            name="gender"
                                            value={formData.gender ?? ''}
                                            onChange={(e) => setFormData(prev => ({ ...prev, gender: parseInt(e.target.value) }))}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium bg-white appearance-none"
                                        >
                                            <option value={0}>Nam</option>
                                            <option value={1}>Nữ</option>
                                            <option value={2}>Khác</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Ngày sinh</label>
                                        <input
                                            type="date" name="birthdate"
                                            value={formData.birthdate ? formData.birthdate.split('T')[0] : ''}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Vị trí (Location)</label>
                                        <select
                                            name="location" value={formData.location || ''} onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium bg-white appearance-none"
                                        >
                                            <option value="VN">Vietnam</option>
                                            <option value="US">USA</option>
                                            <option value="AU">Australia</option>
                                            <option value="EN">England</option>
                                            <option value="Others">Khác</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Tiểu sử (Bio)</label>
                                        <textarea
                                            name="bio" rows={4} value={formData.bio || ''} onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium resize-none text-[0.95rem]"
                                            placeholder="Giới thiệu về bản thân bạn..."
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-8 border-t">
                                    <button
                                        type="submit"
                                        className="flex-1 md:flex-none px-10 py-3 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition shadow-lg shadow-blue-700/20 active:scale-95"
                                    >
                                        Lưu thay đổi
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="flex-1 md:flex-none px-10 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition active:scale-95"
                                    >
                                        Hủy bỏ
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AccountCenter;
