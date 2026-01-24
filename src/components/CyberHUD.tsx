"use client";

import { motion } from "framer-motion";

export default function CyberHUD() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Top Left Corner */}
      <div className="absolute top-8 left-8 hidden md:block">
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-anime-cyan animate-pulse" />
            <span className="font-mono text-[10px] text-anime-cyan tracking-widest">SYS.ONLINE</span>
        </div>
        <div className="w-32 h-[1px] bg-gradient-to-r from-anime-cyan to-transparent mt-1" />
        <div className="w-[1px] h-32 bg-gradient-to-b from-anime-cyan to-transparent absolute top-0 left-0" />
      </div>

      {/* Bottom Right Corner */}
      <div className="absolute bottom-8 right-8 hidden md:block">
        <div className="flex items-center gap-2 justify-end">
            <span className="font-mono text-[10px] text-anime-pink tracking-widest">SECURE_CONNECTION</span>
            <div className="w-2 h-2 bg-anime-pink animate-pulse" />
        </div>
        <div className="w-32 h-[1px] bg-gradient-to-l from-anime-pink to-transparent mt-1 ml-auto" />
        <div className="w-[1px] h-32 bg-gradient-to-t from-anime-pink to-transparent absolute bottom-0 right-0" />
      </div>

      {/* Scrolling Coordinates */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 hidden lg:flex flex-col gap-8 font-mono text-[10px] text-gray-700 writing-vertical-rl rotate-180">
         <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
            L-4492-X
         </motion.span>
         <span>COORD: 34.22.99</span>
         <span>TARGET: ACQUIRED</span>
      </div>

      {/* Grid Overlay (Subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[100] bg-[length:100%_2px,3px_100%] pointer-events-none mix-blend-overlay opacity-20" />
    </div>
  );
}
