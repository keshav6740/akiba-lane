"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { AlertCircle } from "lucide-react";

export default function AnimeToast() {
  const { notification } = useStore();

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          className="fixed bottom-10 right-10 z-[100] bg-black border-l-4 border-anime-pink p-4 shadow-[0_0_20px_rgba(255,0,85,0.4)] clip-card"
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="text-anime-pink w-6 h-6 animate-pulse" />
            <div>
              <h4 className="font-bangers text-xl text-white tracking-wide">SYSTEM ALERT</h4>
              <p className="font-mono text-xs text-anime-cyan">{notification}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
