"use client";

import { motion } from "framer-motion";

type MarqueeProps = {
  text?: string;
  speed?: number;
};

export default function Marquee({ text = "AKIBA LANE", speed = 20 }: MarqueeProps) {
  return (
    <div className="overflow-hidden whitespace-nowrap py-2 relative opacity-30">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: speed, repeat: Infinity }}
        className="flex whitespace-nowrap will-change-transform"
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i} className="text-[8rem] md:text-[12rem] font-black font-bangers mx-4 text-transparent text-stroke-white leading-none">
            {text}{" "}
          </span>
        ))}
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={`d-${i}`} className="text-[8rem] md:text-[12rem] font-black font-bangers mx-4 text-transparent text-stroke-white leading-none">
            {text}{" "}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
