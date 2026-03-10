"use client";
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

export default function Countdown() {
    const [isClient, setIsClient] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isBirthday, setIsBirthday] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // SET TARIKH BIRTHDAY KAT SINI (Tahun, Bulan-1, Hari, Jam, Minit)
        // Bulan Mac adalah index 2 (Jan=0, Feb=1, Mac=2)
        const targetDate = new Date(2026, 2, 11, 0, 0, 0);

        const timer = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                setIsBirthday(true);
                clearInterval(timer);
                // Letupkan confetti bila dah sampai masa!
                confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            } else {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!isClient) return null;

    return (
        <div className="flex flex-col items-center gap-6">
            {!isBirthday ? (
                <div className="grid grid-cols-4 gap-4">
                    {Object.entries(timeLeft).map(([label, value]) => (
                        <motion.div
                            key={label}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="bg-white/40 backdrop-blur-md p-4 rounded-xl shadow-inner border border-white/50"
                        >
                            <div className="text-3xl font-bold text-deep-rose">{value}</div>
                            <div className="text-xs uppercase tracking-widest text-gray-500">{label}</div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className="bg-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:bg-pink-600 transition"
                    onClick={() => alert("Surprise! Nanti kita link ke page Gallery!")}
                >
                    🎁 Buka Surprise Sekarang!
                </motion.button>
            )}
        </div>
    );
}