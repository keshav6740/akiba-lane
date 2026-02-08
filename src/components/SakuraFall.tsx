"use client";

import { useEffect, useState } from "react";

type Petal = {
  id: number;
  style: React.CSSProperties;
};

export default function SakuraFall() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const count = typeof window !== "undefined" && window.innerWidth < 768 ? 10 : 30;
    setPetals(Array.from({ length: count }, (_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        animation: `sakura ${10 + Math.random() * 10}s linear ${Math.random() * 10}s infinite`,
        width: `${10 + Math.random() * 15}px`,
        height: `${10 + Math.random() * 15}px`,
        background: `rgba(255, 183, 197, ${0.4 + Math.random() * 0.4})`,
        borderRadius: "100% 0 100% 0",
        position: 'absolute',
      }
    })));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <style>{`
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
      `}</style>
      {petals.map((petal) => (
        <div key={petal.id} style={petal.style} />
      ))}
    </div>
  );
}
