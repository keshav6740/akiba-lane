"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

export default function KatanaPreloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Total animation time
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <div className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center">
          
          {/* Top Half */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%", rotate: -5 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="absolute top-0 left-0 w-full h-1/2 bg-black flex items-end justify-center overflow-hidden border-b border-white/20"
            style={{ originY: 1 }}
          >
             <div className="mb-[-50px] font-black italic text-9xl text-white opacity-10 tracking-widest pointer-events-none select-none">
                AKIBA
             </div>
          </motion.div>

          {/* Bottom Half */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%", rotate: 5 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-black flex items-start justify-center overflow-hidden border-t border-white/20"
            style={{ originY: 0 }}
          >
              <div className="mt-[-50px] font-black italic text-9xl text-white opacity-10 tracking-widest pointer-events-none select-none">
                LANE
             </div>
          </motion.div>

          {/* Center Logo/Loading Content */}
          <motion.div
             exit={{ opacity: 0, scale: 2 }}
             transition={{ duration: 0.3 }}
             className="relative z-10 flex flex-col items-center"
          >
             <motion.div 
               animate={{ 
                 textShadow: [
                   "0 0 10px #ff0055", 
                   "0 0 20px #ff0055", 
                   "0 0 10px #ff0055"
                 ] 
               }}
               transition={{ duration: 0.5, repeat: Infinity }}
               className="font-bangers text-6xl text-white tracking-widest flex items-center gap-4"
             >
                <Zap className="w-12 h-12 text-anime-cyan animate-pulse" />
                LOADING
             </motion.div>
             <div className="w-64 h-2 bg-gray-900 mt-4 rounded-full overflow-hidden border border-white/20">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 2, ease: "easeInOut" }}
                 className="h-full bg-anime-pink shadow-[0_0_10px_#ff0055]"
               />
             </div>
          </motion.div>

          {/* The SLASH Line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 1.8 }}
            className="absolute top-1/2 left-0 w-full h-[2px] bg-white shadow-[0_0_50px_white] z-20 origin-left"
            style={{ rotate: -15 }}
          />
          
          {/* Flash Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.2, delay: 1.9 }}
            className="absolute inset-0 bg-white z-30"
          />

        </div>
      )}
    </AnimatePresence>
  );
}
