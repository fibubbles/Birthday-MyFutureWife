"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Camera, Film, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

// Import Komponen
import Countdown from "../components/Countdown";
import HeroVideo from "../components/HeroVideo";
import PolaroidGallery from "../components/PolaroidGallery";
import FloatingMusic from "../components/FloatingMusic";
import HeartRain from "../components/HeartRain";
import VideoTimeline from "../components/VideoTimeline";

// -------------------
// HERO SECTION
// -------------------
function HeroSection() {
  return (
    <div className="flex flex-col items-center px-6 text-center">
      <HeroVideo />
      <h1 className="text-5xl md:text-7xl font-black text-[#9D8189] mt-8 tracking-tighter">
        HAPPY BIRTHDAY! ❤️
      </h1>
      <p className="handwriting text-4xl text-pink-600 mt-4 italic">
        "Life with you is my favorite adventure."
      </p>
    </div>
  );
}

// -------------------
// ENDING SECTION
// -------------------
function EndingSection() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ type: "spring" }}
      >
        <h2 className="handwriting text-7xl text-pink-600 mb-6 font-bold">
          The Best Is Yet To Come
        </h2>
        <div className="max-w-xl bg-white/30 p-8 rounded-[40px] backdrop-blur-sm border border-white/50 shadow-xl">
          <p className="text-[#9D8189] text-xl leading-relaxed">
            Terima kasih sayang sebab masih ada bersama baby dan sanggup lalui semua yang kita hadap selama ni. Baby hargai sayang lebih dari yang sayang tahu.
            <br /><br />
            Sepanjang kita kenal dan bersama, terlalu banyak perkara yang kita lalui sama-sama. Baby ikhlas tolong dan ada untuk sayang dari waktu sayang belajar sampai sayang dah dapat kerja tetap, dan baby bangga dapat tengok sayang sampai ke tahap sayang hari ini.
            <br /><br />
            Baby betul-betul ikhlas nak jadikan sayang sebagai isteri baby suatu hari nanti. Tapi dalam masa yang sama, baby juga belajar untuk terima kalau satu hari nanti Allah tentukan jalan yang berbeza untuk kita.
            <br /><br />
            Apa pun yang jadi, baby tetap bersyukur pernah ada dalam perjalanan hidup sayang dan dapat tunaikan janji baby untuk sentiasa ada dan bantu sayang jadi lebih kuat.
            <br /><br />
            Selagi kita masih bersama hari ini, baby akan tetap jaga hati sayang dan cuba jadi yang terbaik untuk sayang.
            <br /><br />
            Happy Birthday Sayang, semoga panjang umur dimurahkan rezeki dan dipermudahkan segala urusan jadi anak yang solehah taat kepada ibu, jadi akak yang baik kepada adik-adik sayang dan jadi bakal isteri dan ibu yang baik kepada anak-anak suatu hari nanti aamiin.
            <br /><br />
            <span className="font-bold text-2xl text-pink-500">
              Next Milestone: Our Wedding? 💍
            </span>
          </p>
        </div>
        <div className="mt-10 text-7xl animate-pulse">🏠❤️✨</div>
      </motion.div>
    </div>
  );
}

// -------------------
// BOTTOM NAV
// -------------------
function BottomNav({ activeSection, setActiveSection }: any) {
  const navItems = [
    { icon: Heart, label: "Story", key: "story" },
    { icon: Camera, label: "Photos", key: "memories" },
    { icon: Film, label: "Video", key: "video" },
    { icon: Sparkles, label: "Future", key: "ending" },
  ];
  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-white/90 backdrop-blur-md px-6 py-4 rounded-full shadow-2xl border border-pink-100 flex gap-6 md:gap-12">
      {navItems.map(({ icon: Icon, label, key }) => (
        <button
          key={key}
          onClick={() => setActiveSection(key)}
          className={`flex flex-col items-center gap-1 transition-all ${activeSection === key
            ? "text-pink-500 scale-110"
            : "text-gray-400 hover:text-pink-300"
            }`}
        >
          <Icon size={24} fill={activeSection === key ? "currentColor" : "none"} />
          <span className="text-[10px] uppercase font-bold tracking-widest">
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
}

// -------------------
// MAIN HOME COMPONENT
// -------------------
export default function Home() {
  const [activeSection, setActiveSection] = useState("story");
  const [photos, setPhotos] = useState<any[]>([]);

  const [isLocked, setIsLocked] = useState(true);
  const [isProposing, setIsProposing] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  // 1. REMOTE RESET & ANTI-CHEAT LOGIC
  useEffect(() => {
    // Fungsi untuk check reset dari Supabase
    const checkResetStatus = async () => {
      try {
        const { data } = await supabase
          .from("system_config")
          .select("is_reset")
          .eq("id", 1) // Pastikan Hafiz ada row ID 1 kat table ni
          .single();

        if (data?.is_reset === true) {
          localStorage.clear();
          // Set balik is_reset ke false supaya tak loop refresh
          await supabase
            .from("system_config")
            .update({ is_reset: false })
            .eq("id", 1);

          window.location.reload();
        }
      } catch (error) {
        console.error("Error checking reset:", error);
      }
    };

    // Check status setiap 5 saat
    const interval = setInterval(checkResetStatus, 5000);

    // LOGIK ANTI-CHEAT ASAL
    const urlParams = new URLSearchParams(window.location.search);
    const shouldReset = urlParams.get('reset');

    if (shouldReset === 'true') {
      localStorage.removeItem("proposal_answered");
      localStorage.removeItem("proposal_result");
      window.location.href = window.location.pathname;
      return;
    }

    const hasAnswered = localStorage.getItem("proposal_answered");
    const lastResult = localStorage.getItem("proposal_result");

    if (hasAnswered) {
      if (lastResult === "YES") {
        setShowMainContent(true);
      } else if (lastResult === "NO") {
        setIsRejected(true);
      }
    }

    return () => clearInterval(interval);
  }, []);

  // 2. FETCH PHOTOS
  useEffect(() => {
    async function getPhotos() {
      const { data } = await supabase
        .from("photos")
        .select("*")
        .order("created_at", { ascending: true });
      if (data) setPhotos(data);
    }
    getPhotos();
  }, []);

  // 3. LOCK SCREEN TIMER LOGIC (TARGET: 10 MAC 2026)
  useEffect(() => {
    const targetDate = new Date("2026-03-10T00:00:00").getTime();

    const checkLock = () => {
      if (new Date().getTime() >= targetDate) {
        setIsLocked(false);
        const hasAnswered = localStorage.getItem("proposal_answered");
        if (!hasAnswered) {
          setIsProposing(true);
        }
      }
    };

    checkLock();
    const interval = setInterval(checkLock, 1000);
    return () => clearInterval(interval);
  }, []);

  // 4. SUBMIT ANSWER TO SUPABASE
  const submitAnswer = async (jawapan: string) => {
    await supabase
      .from("proposals")
      .insert([{
        answer: jawapan,
        device_id: window.navigator.userAgent
      }]);

    localStorage.setItem("proposal_answered", "true");
    localStorage.setItem("proposal_result", jawapan);

    if (jawapan === "YES") {
      setIsConfirming(true);
    } else {
      setIsRejected(true);
    }
  };

  // --- RENDERING FLOWS ---

  // A. LOCKED
  if (isLocked) {
    return (
      <div className="fixed inset-0 z-[999] bg-[#FDFCF0] flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-10 bg-white rounded-[40px] shadow-2xl border-4 border-pink-100 max-w-lg"
        >
          <h1 className="handwriting text-6xl text-pink-500 mb-4">Sabar Ya Sayang...</h1>
          <p className="text-[#9D8189]/70 mb-8 italic text-lg">A big surprise awaits you in</p>
          <Countdown />
          <div className="mt-10 text-5xl animate-bounce">🔒</div>
        </motion.div>
      </div>
    );
  }

  // B. REJECTED SCREEN
  if (isRejected) {
    return (
      <div className="fixed inset-0 z-[1000] bg-[#FDFCF0] flex items-center justify-center p-8 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md">
          <h1 className="handwriting text-6xl text-[#9D8189] mb-4">Saya faham...</h1>
          <p className="text-[#9D8189]/70 italic text-xl">Terima kasih sebab sudi jawab dengan jujur. ❤️</p>
          <p className="mt-8 text-sm text-gray-400 font-sans tracking-widest uppercase">(Access Revoked Permanently)</p>
        </motion.div>
      </div>
    );
  }

  // C. PROPOSAL STEP 1
  if (isProposing && !isConfirming && !showMainContent) {
    return (
      <div className="fixed inset-0 z-[999] bg-pink-50 flex items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-12 rounded-[50px] shadow-2xl border-4 border-pink-200 max-w-xl">
          <h2 className="handwriting text-5xl text-pink-600 mb-10 leading-tight">
            Jika ke depan dan akan datang, sudikah awak jadi peneman hidup saya sehingga impian kita berdua tercapai?
          </h2>
          <div className="flex gap-6 justify-center">
            <button
              onClick={() => submitAnswer("YES")}
              className="bg-pink-500 text-white px-12 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-110 active:scale-95 transition-all"
            >
              YES! ❤️
            </button>
            <button
              onClick={() => submitAnswer("NO")}
              className="bg-gray-100 text-gray-400 px-12 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all"
            >
              No...
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // D. PROPOSAL STEP 2 (CONFIRMATION)
  if (isConfirming && !showMainContent) {
    return (
      <div className="fixed inset-0 z-[1000] bg-rose-100 flex items-center justify-center p-6 text-center">
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white p-12 rounded-[50px] shadow-2xl border-4 border-rose-300 max-w-xl">
          <div className="text-7xl mb-6">🥺</div>
          <h2 className="handwriting text-5xl text-rose-600 mb-10 leading-tight">
            Awak betul-betul ni... <br /> nak saya jadi suami awak?
          </h2>
          <button
            onClick={() => {
              confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
              setShowMainContent(true);
            }}
            className="bg-rose-500 text-white px-14 py-5 rounded-full font-bold text-xl shadow-xl hover:scale-110 active:scale-95 transition-all"
          >
            SANGAT PASTI! 😍
          </button>
        </motion.div>
      </div>
    );
  }

  // E. MAIN CONTENT (SUCCESS)
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FDFCF0] to-[#F7CAD0] pb-32 overflow-x-hidden">
      <HeartRain />
      <FloatingMusic />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col items-center pt-10"
        >
          {activeSection === "story" && <HeroSection />}

          {activeSection === "memories" && (
            <div className="w-full">
              <h2 className="handwriting text-6xl text-center text-[#9D8189] mb-10">Our Memory Lane</h2>
              <PolaroidGallery photos={photos} />
            </div>
          )}

          {activeSection === "video" && (
            <section className="w-full py-10">
              <div className="text-center mb-16 px-4">
                <h2 className="handwriting text-7xl text-[#9D8189] animate-pulse">Our Cinema</h2>
                <p className="text-[#9D8189]/60 italic mt-2 font-light">Scroll ke bawah untuk melihat perjalanan kita...</p>
              </div>
              <VideoTimeline />
              <div className="text-center mt-20 pb-10 px-4">
                <p className="handwriting text-4xl text-pink-500">...and many more to come! ❤️</p>
              </div>
            </section>
          )}

          {activeSection === "ending" && <EndingSection />}
        </motion.div>
      </AnimatePresence>

      <BottomNav activeSection={activeSection} setActiveSection={setActiveSection} />
    </main>
  );
}