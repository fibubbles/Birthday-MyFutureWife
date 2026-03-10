"use client";
import { motion } from "framer-motion";

export default function PolaroidGallery({ photos }: { photos: any[] }) {
    return (
        <div className="flex flex-wrap justify-center gap-8 p-10">
            {photos.map((photo, index) => (
                <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: index % 2 === 0 ? 3 : -3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                    className="bg-white p-4 pb-10 shadow-lg border border-pink-100 w-64"
                >
                    {/* Kotak Gambar */}
                    <div className="w-full aspect-square overflow-hidden bg-gray-200">
                        <img
                            src={photo.image_url}
                            className="w-full h-full object-cover"
                            alt="Memory"
                        />
                    </div>

                    {/* Kapsyen */}
                    <p className="mt-4 text-center text-[#9D8189] text-2xl"
                        style={{ fontFamily: 'var(--font-dancing)' }}>
                        {photo.caption}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}