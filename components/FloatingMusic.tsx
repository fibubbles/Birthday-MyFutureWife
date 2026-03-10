"use client";
import { useState, useRef, useEffect } from "react";
import { Music, Play, Pause } from "lucide-react";

export default function FloatingMusic() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Senarai lagu Hafiz (Pastikan nama fail dalam folder public betul)
    const playlist = [
        "/song.mp3",
        "/song2.mp3",
        "/song3.mp3"
    ];

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Fungsi ni yang buat lagu tu tukar automatik
    const handleNextTrack = () => {
        const nextIndex = (currentTrackIndex + 1) % playlist.length;
        setCurrentTrackIndex(nextIndex);

        // Tunggu sekejap baru play lagu seterusnya
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }, 500);
    };

    return (
        <div className="fixed top-6 right-6 z-[200]">
            <audio
                ref={audioRef}
                src={playlist[currentTrackIndex]}
                onEnded={handleNextTrack} // Bila habis, dia trigger fungsi tukar lagu
            />

            <button
                onClick={togglePlay}
                className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-pink-200 text-pink-500 hover:scale-110 transition-transform"
            >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
        </div>
    );
}