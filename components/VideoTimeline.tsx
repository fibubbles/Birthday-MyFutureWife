"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

export default function VideoTimeline() {
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchVideos() {
            const { data, error } = await supabase
                .from("videos")
                .select("*")
                .order("created_at", { ascending: true });

            if (!error && data) {
                setVideos(data);
            }

            setLoading(false);
        }

        fetchVideos();
    }, []);

    if (loading)
        return (
            <p className="text-center text-pink-400">
                Memuatkan kenangan...
            </p>
        );

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 relative">

            {/* Garis tengah timeline */}
            <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-pink-200/30 hidden md:block"></div>

            {videos.map((vid, index) => (
                <motion.div
                    key={vid.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative flex flex-col md:flex-row items-center mb-20 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
                        }`}
                >

                    {/* Dot timeline */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-pink-400 rounded-full border-4 border-white shadow-lg hidden md:block z-10"></div>

                    {/* --- KOTAK VIDEO DENGAN BINGKAI ROMANTIK --- */}
                    <div className="w-full md:w-[45%] group perspective">

                        <motion.div
                            whileHover={{ rotateY: 10, scale: 1.02 }}
                            className="relative p-6 bg-white/70 rounded-[40px] shadow-2xl backdrop-blur-sm border-4 border-white transform-style-3d transition-all duration-500"
                        >

                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-pink-300/30 to-rose-300/30 rounded-[40px] blur-2xl -z-10 group-hover:opacity-100 opacity-0 transition-opacity"></div>

                            {/* Inner frame */}
                            <div className="relative aspect-[16/10] rounded-[30px] overflow-hidden border-8 border-white bg-gray-950 shadow-inner flex items-center justify-center">

                                {/* Blur background video */}
                                <video
                                    src={vid.video_url}
                                    className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-60 scale-150"
                                    muted
                                    loop
                                    playsInline
                                />

                                {/* Real video */}
                                <video
                                    src={vid.video_url}
                                    controls
                                    playsInline
                                    className="relative z-10 max-w-full max-h-full rounded-2xl shadow-lg object-contain"
                                />

                                {/* Light reflection */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent z-20 pointer-events-none"></div>

                            </div>

                            {/* Handwritten sticker */}
                            <div className="absolute -bottom-5 -right-5 bg-pink-500 text-white handwriting text-xl px-6 py-2 rounded-full shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform">
                                Memori Kita ❤️
                            </div>

                        </motion.div>

                    </div>

                    {/* Caption & Date */}
                    <div
                        className={`w-full md:w-[45%] mt-6 md:mt-0 ${index % 2 === 0
                                ? "md:pl-12 text-left"
                                : "md:pr-12 md:text-right"
                            }`}
                    >

                        <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                            {vid.date}
                        </span>

                        <h3 className="handwriting text-4xl text-[#9D8189] mt-3">
                            {vid.title}
                        </h3>

                        <p className="text-[#9D8189]/70 italic mt-2 leading-relaxed bg-white/50 p-4 rounded-2xl border border-white">
                            "{vid.description}"
                        </p>

                    </div>

                </motion.div>
            ))}
        </div>
    );
}