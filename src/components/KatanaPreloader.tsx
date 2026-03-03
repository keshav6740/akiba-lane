"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function KatanaPreloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <div className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center bg-black">

          {/* Top Half */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 left-0 w-full h-1/2 bg-black flex items-end justify-center overflow-hidden border-b border-white/10 z-20"
          >
            <div className="mb-[-50px] font-black italic text-[15vw] text-white/5 tracking-widest pointer-events-none select-none font-bangers">
              AKIBA
            </div>
          </motion.div>

          {/* Bottom Half */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-black flex items-start justify-center overflow-hidden border-t border-white/10 z-20"
          >
            <div className="mt-[-50px] font-black italic text-[15vw] text-white/5 tracking-widest pointer-events-none select-none font-bangers">
              LANE
            </div>
          </motion.div>

          {/* Center Loading */}
          <motion.div
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="relative z-20 flex flex-col items-center"
          >
            <span className="font-mono text-sm text-anime-cyan font-bold tracking-[0.3em]">
              LOADING
            </span>

            {/* Simple progress bar */}
            <div className="w-40 h-0.5 bg-gray-900 mt-3 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "linear" }}
                className="h-full bg-anime-pink"
              />
            </div>
          </motion.div>

          {/* Slash line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1.5, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.3, delay: 1.0, ease: "circOut" }}
            className="absolute top-1/2 left-0 right-0 h-[2px] bg-white z-40 origin-center"
            style={{ rotate: -15 }}
          />

          {/* Flash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 0.1, delay: 1.1 }}
            className="absolute inset-0 bg-white z-50 mix-blend-overlay"
          />
        </div>
      )}
    </AnimatePresence>
  );
}