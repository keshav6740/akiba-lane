"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { useRef, useEffect } from "react";
import { ChevronDown, Zap, Sparkles } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const yText = useTransform(smoothScroll, [0, 1], [0, 260]);
  const opacity = useTransform(smoothScroll, [0, 0.5], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);
      spotlightX.set(e.clientX);
      spotlightY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, spotlightX, spotlightY]);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const spotlight = useMotionTemplate`radial-gradient(700px circle at ${spotlightX}px ${spotlightY}px, rgba(255,255,255,0.08), transparent 70%)`;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden torii-frame">
      <motion.div className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay" style={{ background: spotlight }} />

      <div className="absolute inset-0 z-0">
        <div className="sun-disc -right-20 top-[-120px] opacity-70" />
        <div className="sakura-haze" />
      </div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        <motion.div style={{ y: yText, opacity }} className="text-left">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-anime-pink" />
            <span className="font-mono text-anime-pink tracking-[0.4em] text-xs">SHRINE // AKIBA</span>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-0 h-full w-[2px] bg-gradient-to-b from-anime-pink/70 to-transparent" />
            <h1 className="font-bangers text-7xl md:text-9xl leading-none tracking-wide text-white drop-shadow-[0_0_35px_rgba(255,183,197,0.45)]">
              <span className="block glitch-text" data-text="SUMMON">SUMMON</span>
              <span className="block liquid-metal" data-text="THE COLLECTION">THE COLLECTION</span>
            </h1>
          </div>

          <p className="font-mono text-gray-200 max-w-xl mt-6 border-l-2 border-anime-pink/60 pl-6">
            Step into the sacred aisle of rare figures, cursed relics, and limited shrine drops.
            Every piece is handpicked for true collectors.
          </p>

          <div className="flex flex-wrap gap-5 mt-10">
            <button
              onClick={() => scrollToSection("product-grid")}
              className="relative group overflow-hidden px-8 py-4 bg-anime-pink clip-button font-bold tracking-wider hover:bg-white hover:text-black transition-colors duration-300 shadow-[0_0_30px_rgba(255,77,126,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="w-5 h-5" /> ENTER THE SHOP
              </span>
              <div className="absolute inset-0 bg-white transform -translate-x-full skew-x-12 group-hover:translate-x-0 transition-transform duration-300 z-0" />
            </button>
            <button
              onClick={() => scrollToSection("categories-section")}
              className="px-8 py-4 border border-anime-cyan text-anime-cyan clip-button font-bold tracking-wider hover:bg-anime-cyan/10 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> SHRINE GATES
            </button>
          </div>
        </motion.div>

        <div className="relative hidden lg:block perspective-1000">
          <motion.div
            initial={{ y: -400, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, damping: 12, delay: 1.6 }}
            style={{ rotateX, rotateY }}
            className="relative w-[560px] h-[720px] bg-gray-900/60 border border-white/10 clip-card p-8 transform-style-3d shadow-[0_40px_140px_rgba(0,0,0,0.65)] paper-texture ink-vignette"
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg z-20">
              <motion.div
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[2px] bg-anime-cyan shadow-[0_0_20px_#6ee7ff]"
              />
            </div>

            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-anime-cyan" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-anime-cyan" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-anime-cyan" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-anime-cyan" />

            <div className="relative z-10 h-full flex flex-col justify-between transform-style-3d translate-z-20">
              <div className="flex justify-between text-xs font-mono text-anime-cyan/70">
                <span>ID: #AKB-313</span>
                <span>STATUS: OPEN</span>
              </div>

              <div className="text-center transform translate-z-50">
                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="w-52 h-52 mx-auto bg-gradient-to-br from-[#ffb7c5] to-[#7a4cf3] rounded-full blur-2xl opacity-60 mb-4"
                />
                <h3 className="font-bangers text-7xl mt-[-100px] text-white/90 drop-shadow-lg">MYSTERY BOX</h3>
                <p className="font-mono text-sm text-anime-purple mt-2 tracking-[0.5em]">SR // SSR // UR</p>
              </div>

              <div className="space-y-2">
                <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-anime-pink"
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-gray-400">
                  <span>RARITY RATE</span>
                  <span>85%</span>
                </div>
              </div>
            </div>
          </motion.div>
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
