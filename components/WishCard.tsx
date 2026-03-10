"use client";
import { motion } from "framer-motion";

export default function WishCard({ content }: { content: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-pink-100 max-w-md w-full my-4"
        >
            <p className="text-[#9D8189] leading-relaxed italic">
                "{content}"
            </p>
            <div className="mt-4 text-right text-xs text-pink-400">❤️</div>
        </motion.div>
    );
}