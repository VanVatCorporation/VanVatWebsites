import React, { useState } from 'react';
import MaintenanceBanner from '../../components/common/MaintenanceBanner';
import {
    Music,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume2,
    ListMusic,
    Mic2,
    Heart,
    Share2,
    Repeat,
    Shuffle,
    Search,
    Sparkles
} from 'lucide-react';

const VanVatMusic: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col font-inter selection:bg-indigo-600 selection:text-white text-white">
            <MaintenanceBanner />

            {/* Header / Search */}
            <header className="h-20 flex items-center justify-between px-6 md:px-12 fixed top-0 left-0 w-full z-50 bg-gray-900/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Music size={20} />
                    </div>
                    <span className="text-xl font-black tracking-tighter">VanVat <span className="text-indigo-400 italic">Music</span></span>
                </div>

                <div className="hidden md:flex relative w-full max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm nghệ sĩ, bài hát..."
                        className="w-full pl-11 pr-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                    />
                </div>

                <div className="flex items-center gap-6">
                    <button className="text-[0.65rem] font-black uppercase tracking-widest text-gray-400 hover:text-white transition">Gói Premium</button>
                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-sm">NV</div>
                </div>
            </header>

            <main className="flex-grow pt-20 pb-32">
                <div className="container mx-auto px-6 lg:px-12 py-12 flex flex-col lg:flex-row gap-12">
                    {/* Left Panel: Featured & Playlist */}
                    <div className="w-full lg:w-2/3 space-y-12">
                        {/* Hero / Now Playing Detail */}
                        <section className="relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-[3rem] blur-3xl opacity-50"></div>
                            <div className="relative p-10 md:p-16 bg-white/5 border border-white/10 rounded-[3rem] flex flex-col md:flex-row items-center gap-12 hover:bg-white/[0.07] transition-all">
                                <div className="relative shrink-0">
                                    <img alt="Album" className="w-64 h-64 rounded-[2rem] shadow-2xl group-hover:rotate-3 transition-transform duration-700" src="https://storage.googleapis.com/a1aa/image/b94fa4e3-d929-48b6-15e5-e77f0ea570e4.jpg" />
                                    <div className="absolute inset-0 rounded-[2rem] shadow-inner border border-white/10"></div>
                                </div>
                                <div className="space-y-6 text-center md:text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
                                        <Sparkles size={14} />
                                        <span className="text-[0.6rem] font-bold uppercase tracking-widest">Recommended for you</span>
                                    </div>
                                    <div className="space-y-2">
                                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">Midnight <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 italic">Echoes</span></h1>
                                        <p className="text-xl text-gray-400 font-medium tracking-tight">The Lunar Syndicate • Eternal Rhythms</p>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                        <button className="bg-white text-gray-900 px-8 py-3.5 rounded-full text-sm font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Nghe ngay</button>
                                        <button className="p-3.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white"><Heart size={20} /></button>
                                        <button className="p-3.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white"><Share2 size={20} /></button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Recent Tracks List */}
                        <section className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-500">Danh sách bài hát</h2>
                                <button className="text-xs font-bold text-indigo-400 hover:underline">Xem tất cả</button>
                            </div>
                            <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden">
                                {[
                                    { title: "Velocity", artist: "Arcade Runner", time: "3:42", album: "Cyber Dash" },
                                    { title: "Neon Dreams", artist: "Holo Wave", time: "4:05", album: "Starlight" },
                                    { title: "Oceanic", artist: "Deep Blue", time: "5:12", album: "Horizon" },
                                    { title: "Fragments", artist: "Silent Key", time: "2:58", album: "Origins" }
                                ].map((track, i) => (
                                    <div key={i} className="flex items-center justify-between p-5 hover:bg-white/5 transition-all group cursor-pointer border-b border-white/[0.02] last:border-0 px-8">
                                        <div className="flex items-center gap-6">
                                            <span className="text-xs font-black text-gray-600 group-hover:text-indigo-400 transition-colors w-4">{i + 1}</span>
                                            <div className="space-y-1">
                                                <p className="font-bold text-white group-hover:text-indigo-400 transition-colors">{track.title}</p>
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">{track.artist}</p>
                                            </div>
                                        </div>
                                        <div className="hidden md:block text-xs font-black text-gray-500 uppercase tracking-widest">{track.album}</div>
                                        <div className="flex items-center gap-8">
                                            <span className="text-xs font-medium text-gray-500">{track.time}</span>
                                            <Play size={16} className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Panel: Lyrics & Extras */}
                    <div className="w-full lg:w-1/3 space-y-12">
                        <section className="bg-white/5 border border-white/10 rounded-[3rem] p-10 space-y-10 h-full min-h-[600px] flex flex-col">
                            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400">Lời bài hát</h3>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-white/10"></div>
                                </div>
                            </div>

                            <div className="flex-grow space-y-8 text-xl font-black leading-tight tracking-tight overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
                                <p className="text-white opacity-40">Walking down the crystal street</p>
                                <p className="text-white">Echoes of a thousand feet</p>
                                <p className="text-white opacity-40">Searching for a sign to keep</p>
                                <p className="text-white opacity-40 italic">Waiting for the soul to sleep...</p>
                                <p className="text-white opacity-40">Midnight echoes in the dark</p>
                                <p className="text-white opacity-40">Lighting up a tiny spark</p>
                            </div>

                            <button className="w-full py-4 border border-white/10 rounded-2xl text-[0.6rem] font-black uppercase tracking-widest text-gray-400 hover:bg-white/5 transition-all">Mở chế độ toàn màn hình</button>
                        </section>
                    </div>
                </div>
            </main>

            {/* Sticky Player Bar */}
            <div className="fixed bottom-0 left-0 w-full z-50 bg-gray-900/90 backdrop-blur-2xl border-t border-white/5 py-4 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-10">
                    <div className="flex items-center gap-5 shrink-0">
                        <img alt="Album" className="w-14 h-14 rounded-xl shadow-lg border border-white/10" src="https://storage.googleapis.com/a1aa/image/b94fa4e3-d929-48b6-15e5-e77f0ea570e4.jpg" />
                        <div className="hidden sm:block">
                            <p className="font-bold text-white tracking-tight">Midnight Echoes</p>
                            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">The Lunar Syndicate</p>
                        </div>
                    </div>

                    <div className="flex-grow max-w-2xl flex flex-col items-center gap-3">
                        <div className="flex items-center gap-10">
                            <button className="text-gray-500 hover:text-white transition"><Shuffle size={18} /></button>
                            <button className="text-gray-400 hover:text-white transition"><SkipBack size={24} fill="currentColor" /></button>
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-12 h-12 bg-white text-gray-900 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                            >
                                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} className="ml-1" fill="currentColor" />}
                            </button>
                            <button className="text-gray-400 hover:text-white transition"><SkipForward size={24} fill="currentColor" /></button>
                            <button className="text-gray-500 hover:text-white transition"><Repeat size={18} /></button>
                        </div>
                        <div className="w-full flex items-center gap-4 px-4">
                            <span className="text-[0.6rem] font-bold text-gray-500 w-10 text-right">1:24</span>
                            <div className="flex-grow h-1.5 bg-white/5 rounded-full overflow-hidden relative group cursor-pointer">
                                <div className="absolute top-0 left-0 h-full bg-indigo-500 group-hover:bg-indigo-400 transition-colors" style={{ width: '38.5%' }}></div>
                            </div>
                            <span className="text-[0.6rem] font-bold text-gray-500 w-10">3:42</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-6 shrink-0 w-48">
                        <button className="text-gray-500 hover:text-white transition"><Mic2 size={18} /></button>
                        <button className="text-gray-500 hover:text-white transition"><ListMusic size={18} /></button>
                        <div className="flex items-center gap-3">
                            <Volume2 size={18} className="text-gray-500" />
                            <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                                <div className="absolute top-0 left-0 h-full bg-white/20" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VanVatMusic;
