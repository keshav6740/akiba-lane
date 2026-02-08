"use client";

import { motion } from "framer-motion";

export default function Marquee({ text, direction = "left", speed = 20 }: { text: string, direction?: "left" | "right", speed?: number }) {
  return (
    <div className="relative flex overflow-hidden py-4 opacity-10 pointer-events-none select-none z-0">
      <motion.div
        initial={{ x: direction === "left" ? 0 : "-100%" }}
        animate={{ x: direction === "left" ? "-100%" : 0 }}
        transition={{ ease: "linear", duration: speed, repeat: Infinity }}
        className="flex whitespace-nowrap"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="text-[10rem] md:text-[15rem] font-black font-bangers mx-4 text-transparent text-stroke-white leading-none">
            {text} 
          </span>
        ))}
      </motion.div>
      <motion.div
        initial={{ x: direction === "left" ? 0 : "-100%" }}
        animate={{ x: direction === "left" ? "-100%" : 0 }}
        transition={{ ease: "linear", duration: speed, repeat: Infinity }}
        className="flex whitespace-nowrap absolute top-4 left-full"
      >
         {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="text-[10rem] md:text-[15rem] font-black font-bangers mx-4 text-transparent text-stroke-white leading-none">
            {text} 
          </span>
        ))}
      </motion.div>
    </div>
  );
}

