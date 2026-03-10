"use client";
import { Heart, Camera, Film, MessageCircle } from "lucide-react";

export default function BottomNav({ setActiveSection }: { setActiveSection: (s: string) => void }) {
    const menus = [
        { id: 'story', icon: Heart, label: 'Story' },
        { id: 'memories', icon: Camera, label: 'Photos' },
        { id: 'video', icon: Film, label: 'Video' },
        { id: 'wishes', icon: MessageCircle, label: 'Wishes' },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-pink-100 flex gap-8">
            {menus.map((menu) => (
                <button
                    key={menu.id}
                    onClick={() => setActiveSection(menu.id)}
                    className="flex flex-col items-center gap-1 group"
                >
                    <menu.icon className="text-[#9D8189] group-hover:text-pink-500 transition-colors w-6 h-6" />
                    <span className="text-[10px] uppercase tracking-widest text-[#9D8189]/60">{menu.label}</span>
                </button>
            ))}
        </div>
    );
}