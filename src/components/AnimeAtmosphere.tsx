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

type Element = {
  id: number;
  char: string;
  style: any;
  animation: any;
};

export default function AnimeAtmosphere() {
  const [elements, setElements] = useState<Element[]>([]);

  useEffect(() => {
    // Generate static background elements
    const newElements = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      char: CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        fontSize: `${2 + Math.random() * 10}rem`,
        rotate: Math.random() * 360,
        opacity: 0.05 + Math.random() * 0.1, // Very subtle
        fontFamily: "'Noto Sans JP', sans-serif", // Ensure you have a font that supports Kanji or fallback
        position: 'absolute' as const,
        color: 'white',
        userSelect: 'none',
        mixBlendMode: 'overlay' as const,
      },
      animation: {
        y: [0, -20, 0],
        opacity: [0.05 + Math.random() * 0.1, 0.05 + Math.random() * 0.1 * 1.5, 0.05 + Math.random() * 0.1],
      }
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <style>{`
        .animate-spin-slow {
          animation: spin 60s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      
      {/* Magic Circle (Center) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] opacity-[0.03] pointer-events-none">
         <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
            <circle cx="50" cy="50" r="48" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="4 2" />
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.2" fill="none" />
            <path d="M50 10 L90 80 L10 80 Z" stroke="white" strokeWidth="0.2" fill="none" />
            <path d="M50 90 L90 20 L10 20 Z" stroke="white" strokeWidth="0.2" fill="none" />
         </svg>
      </div>
    </div>
  );
}
