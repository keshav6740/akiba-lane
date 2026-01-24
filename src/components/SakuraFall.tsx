"use client";

import { useEffect, useState } from "react";

export default function SakuraFall() {
  const [petals, setPetals] = useState<number[]>([]);

  useEffect(() => {
    // Generate 30 petals
    setPetals(Array.from({ length: 30 }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((i) => (
        <div
          key={i}
          className="absolute animate-sakura"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
            width: `${10 + Math.random() * 15}px`,
            height: `${10 + Math.random() * 15}px`,
            background: `rgba(255, 183, 197, ${0.4 + Math.random() * 0.4})`,
            borderRadius: "100% 0 100% 0",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes sakura {
          0% {
            top: -10%;
            transform: translateX(0) rotate(0deg);
          }
          100% {
            top: 110%;
            transform: translateX(100px) rotate(360deg);
          }
        }
        .animate-sakura {
          animation-name: sakura;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}
