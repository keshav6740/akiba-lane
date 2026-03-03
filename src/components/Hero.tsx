"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, Zap, Sparkles } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const yText = useTransform(smoothScroll, [0, 1], [0, 200]);
  const opacity = useTransform(smoothScroll, [0, 0.5], [1, 0]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="sun-disc -right-20 top-[-120px] opacity-70" />
        <div className="sakura-haze" />
      </div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-6 md:gap-10 pt-16 md:pt-0">
        <motion.div style={{ y: yText, opacity }} className="text-left">
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="h-[2px] w-8 md:w-12 bg-anime-pink" />
            <span className="font-mono text-anime-pink tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-xs">SHRINE // AKIBA</span>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-0 h-full w-[2px] bg-gradient-to-b from-anime-pink/70 to-transparent hidden md:block" />
            <h1 className="font-bangers text-5xl sm:text-6xl md:text-7xl lg:text-9xl leading-none tracking-wide text-white drop-shadow-[0_0_35px_rgba(255,183,197,0.45)]">
              <span className="block">SUMMON</span>
              <span className="block liquid-metal" data-text="THE COLLECTION">THE COLLECTION</span>
            </h1>
          </div>

          <p className="font-mono text-gray-200 max-w-xl mt-4 md:mt-6 border-l-2 border-anime-pink/60 pl-4 md:pl-6 text-sm md:text-base">
            Step into the sacred aisle of rare figures, cursed relics, and limited shrine drops.
            Every piece is handpicked for true collectors.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-5 mt-6 md:mt-10">
            <button
              onClick={() => scrollToSection("product-grid")}
              className="relative group overflow-hidden px-6 md:px-8 py-3 md:py-4 bg-anime-pink clip-button font-bold tracking-wider hover:bg-white hover:text-black transition-colors duration-300 shadow-[0_0_30px_rgba(255,77,126,0.5)] text-sm md:text-base"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" /> ENTER THE SHOP
              </span>
            </button>
            <button
              onClick={() => scrollToSection("categories-section")}
              className="px-6 md:px-8 py-3 md:py-4 border border-anime-cyan text-anime-cyan clip-button font-bold tracking-wider hover:bg-anime-cyan/10 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Sparkles className="w-5 h-5" /> SHRINE GATES
            </button>
          </div>
        </motion.div>

        {/* Mystery Box Card — desktop only, static (no mouse tracking) */}
        <div className="relative hidden lg:block">
          <div
            className="relative w-[560px] h-[720px] bg-gray-900/60 border border-white/10 clip-card p-8 shadow-[0_40px_140px_rgba(0,0,0,0.65)] paper-texture"
          >
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-anime-cyan" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-anime-cyan" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-anime-cyan" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-anime-cyan" />

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between text-xs font-mono text-anime-cyan/70">
                <span>ID: #AKB-313</span>
                <span>STATUS: OPEN</span>
              </div>

              <div className="text-center">
                <div className="w-52 h-52 mx-auto bg-gradient-to-br from-[#ffb7c5] to-[#7a4cf3] rounded-full blur-2xl opacity-60 mb-4" />
                <h3 className="font-bangers text-7xl mt-[-100px] text-white/90 drop-shadow-lg">MYSTERY BOX</h3>
                <p className="font-mono text-sm text-anime-purple mt-2 tracking-[0.5em]">SR // SSR // UR</p>
              </div>

              <div className="space-y-2">
                <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-anime-pink w-[85%]" />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-gray-400">
                  <span>RARITY RATE</span>
                  <span>85%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-anime-pink cursor-pointer"
        onClick={() => scrollToSection("categories-section")}
      >
        <ChevronDown className="w-8 h-8 opacity-70" />
      </motion.div>
    </section>
  );
}
