// components/HeroVideo.tsx
"use client";
import { motion } from "framer-motion";

export default function HeroVideo() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full max-w-2xl aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 mb-8"
        >
            <video
                autoPlay
                loop
                muted
                playsInline // Penting untuk autoplay kat phone
                className="w-full h-full object-cover"
            >
                <source src="/Birthday.mp4" type="video/mp4" />
                Browser Hafiz tak support video tag ni.
            </video>
            {/* Overlay sikit supaya teks atas video nampak jelas (optional) */}
            <div className="absolute inset-0 bg-black/10"></div>
        </motion.div>
    );
}