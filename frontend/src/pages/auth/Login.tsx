import React, { useState } from 'react';
import { Mail, Lock, LogIn, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import MaintenanceBanner from '../../components/common/MaintenanceBanner';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            // Redirect or handle successful login
            window.location.href = '/van-vat-corporation/account/account-center';
        } catch (err: any) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple' | 'github') => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/van-vat-corporation/account/account-center`
                }
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-inter selection:bg-blue-600 selection:text-white">
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

            <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-6">
                <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <div className="text-center mb-10 space-y-3">
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Chào mừng quay lại</h1>
                        <p className="text-gray-500 font-medium tracking-tight">Đăng nhập vào hệ sinh thái Vạn Vật của bạn</p>
                    </div>

                    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-gray-100">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1" htmlFor="email">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:outline-none transition-all font-medium text-gray-900"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest" htmlFor="password">Password</label>
                                    <a href="/reset-password" onClick={(e) => e.preventDefault()} className="text-[0.65rem] font-black text-blue-600 uppercase tracking-widest hover:underline">Quên mật khẩu?</a>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:outline-none transition-all font-medium text-gray-900"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 animate-in shake duration-500">
                                    <AlertCircle size={18} />
                                    <p className="text-xs font-bold leading-tight">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-700/30 hover:shadow-blue-700/50 hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-3"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : <LogIn size={20} />}
                                {loading ? 'Đang xác thực...' : 'Đăng nhập ngay'}
                            </button>
                        </form>

                        <div className="relative my-10">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <div className="relative flex justify-center text-[0.65rem] font-black uppercase tracking-widest">
                                <span className="bg-white px-4 text-gray-400">hoặc tiếp tục với</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => handleSocialLogin('google')}
                                className="flex items-center justify-center gap-3 py-4 bg-white border-2 border-gray-50 rounded-2xl hover:bg-gray-50 hover:border-gray-100 transition-all font-black text-[0.65rem] uppercase tracking-widest text-gray-600"
                            >
                                <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" /><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" /><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" /><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" /></svg> Google
                            </button>
                            <button
                                onClick={() => handleSocialLogin('facebook')}
                                className="flex items-center justify-center gap-3 py-4 bg-white border-2 border-gray-50 rounded-2xl hover:bg-gray-50 hover:border-gray-100 transition-all font-black text-[0.65rem] uppercase tracking-widest text-gray-600"
                            >
                                <svg width="18" height="18" fill="#1877f2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> Facebook
                            </button>
                            <button
                                onClick={() => handleSocialLogin('github')}
                                className="col-span-2 flex items-center justify-center gap-3 py-4 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all font-black text-[0.65rem] uppercase tracking-widest"
                            >
                                <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg> Tiếp tục với GitHub
                            </button>
                        </div>

                        <p className="mt-10 text-center text-[0.65rem] font-black text-gray-400 uppercase tracking-widest">
                            Chưa có tài khoản? <a href="/van-vat-corporation/register" className="text-blue-700 hover:underline">Đăng ký ngay</a>
                        </p>
                    </div>
                </div>
            </main>

            <footer className="py-8 bg-white border-t">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[0.6rem] font-black uppercase tracking-widest text-gray-400">
                    <p>© 2026 VanVat Corporation</p>
                    <div className="flex gap-6">
                        <a href="/privacy-policy" className="hover:text-blue-700 transition">Privacy</a>
                        <a href="/terms-of-service" className="hover:text-blue-700 transition">Terms</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Login;
