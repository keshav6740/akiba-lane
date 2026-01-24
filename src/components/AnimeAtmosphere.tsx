"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CHARACTERS = [
  "ゴ", // Go (Menacing)
  "ド", // Do (Don - Boom)
  "ン", // N
  "秋", // Aki (Autumn/Akiba)
  "葉", // Ba (Leaf)
  "原", // Bara (Field)
  "侍", // Samurai
  "刀", // Katana
];

export default function AnimeAtmosphere() {
  const [elements, setElements] = useState<any[]>([]);

  useEffect(() => {
    // Generate static background elements
    const newElements = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      char: CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${2 + Math.random() * 10}rem`,
      rotation: Math.random() * 360,
      opacity: 0.05 + Math.random() * 0.1, // Very subtle
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute font-black text-white select-none mix-blend-overlay"
          style={{
            top: el.top,
            left: el.left,
            fontSize: el.size,
            rotate: el.rotation,
            opacity: el.opacity,
            fontFamily: "'Noto Sans JP', sans-serif", // Ensure you have a font that supports Kanji or fallback
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [el.opacity, el.opacity * 1.5, el.opacity],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {el.char}
        </motion.div>
      ))}
      
      {/* Magic Circle (Center) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] opacity-[0.03] pointer-events-none">
         <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
            <circle cx="50" cy="50" r="48" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="4 2" />
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.2" fill="none" />
            <path d="M50 10 L90 80 L10 80 Z" stroke="white" strokeWidth="0.2" fill="none" />
            <path d="M50 90 L90 20 L10 20 Z" stroke="white" strokeWidth="0.2" fill="none" />
         </svg>
      </div>
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 60s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
