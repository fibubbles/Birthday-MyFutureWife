"use client";
import { useState, useEffect } from "react";
import Countdown from "./Countdown";

export default function LockScreen({ children }: { children: React.ReactNode }) {
    const [isLocked, setIsLocked] = useState(true);
    const targetDate = new Date("2026-03-11T00:00:00").getTime();

    useEffect(() => {
        const checkTime = () => {
            const now = new Date().getTime();
            if (now >= targetDate) {
                setIsLocked(false);
            }
        };

        checkTime();
        const interval = setInterval(checkTime, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    if (isLocked) {
        return (
            <div className="fixed inset-0 z-[999] bg-[#FDFCF0] flex flex-col items-center justify-center p-6 text-center">
                <div className="max-w-md p-10 bg-white rounded-[40px] shadow-2xl border-4 border-pink-100">
                    <h1 className="handwriting text-5xl text-[#9D8189] mb-6">Sabar Sayang...</h1>
                    <p className="text-[#9D8189]/70 mb-8 italic text-lg">
                        "Sesuatu yang indah sedang menunggu awak. Tunggu jam berdetak ke 11 Mac ya?"
                    </p>
                    <Countdown />
                    <div className="mt-10 text-pink-300 animate-bounce">🔒 ❤️</div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}