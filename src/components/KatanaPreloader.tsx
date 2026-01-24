"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function KatanaPreloader() {
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    
    // Particle System for Sparks
    const canvas = canvasRef.current;
    if (canvas) {
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        let particles: any[] = [];
        
        // Create explosion of sparks
        const createExplosion = () => {
            for (let i = 0; i < 100; i++) {
                particles.push({
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2,
                    vx: (Math.random() - 0.5) * 30, // High velocity
                    vy: (Math.random() - 0.5) * 30,
                    life: 1,
                    color: Math.random() > 0.5 ? "#00ffff" : "#ff0055",
                    size: Math.random() * 3
                });
            }
        };

        // Delay explosion to match slash
        setTimeout(createExplosion, 1800);

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((p, index) => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02;
                p.size *= 0.95;
                
                if (p.life <= 0) {
                    particles.splice(index, 1);
                } else {
                    ctx.globalAlpha = p.life;
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
            requestAnimationFrame(animate);
        };
        animate();
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <div className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center bg-black">
          
          {/* Top Half */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%", rotate: -2, scale: 1.1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="absolute top-0 left-0 w-full h-1/2 bg-black flex items-end justify-center overflow-hidden border-b-2 border-white/10 z-20"
            style={{ originY: 1 }}
          >
             <div className="mb-[-50px] font-black italic text-[15vw] text-white/5 tracking-widest pointer-events-none select-none font-bangers">
                AKIBA
             </div>
          </motion.div>

          {/* Bottom Half */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%", rotate: 2, scale: 1.1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-black flex items-start justify-center overflow-hidden border-t-2 border-white/10 z-20"
            style={{ originY: 0 }}
          >
              <div className="mt-[-50px] font-black italic text-[15vw] text-white/5 tracking-widest pointer-events-none select-none font-bangers">
                LANE
             </div>
          </motion.div>

          {/* Canvas for Sparks */}
          <canvas ref={canvasRef} className="absolute inset-0 z-30 pointer-events-none" />

          {/* Center Loading Text (Disappears before slash) */}
          <motion.div
             exit={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
             transition={{ duration: 0.3 }}
             className="relative z-20 flex flex-col items-center"
          >
             <div className="flex gap-2">
                {["L", "O", "A", "D", "I", "N", "G"].map((l, i) => (
                    <motion.span
                        key={i}
                        animate={{ opacity: [0.2, 1, 0.2], y: [0, -10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="font-mono text-xl text-anime-cyan font-bold"
                    >
                        {l}
                    </motion.span>
                ))}
             </div>
             
             {/* Charging Bar */}
             <div className="w-48 h-1 bg-gray-900 mt-4 rounded-full overflow-hidden relative">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 1.5, ease: "linear" }}
                 className="h-full bg-anime-pink box-shadow-[0_0_20px_#ff0055]"
               />
               <motion.div 
                 animate={{ left: ["-100%", "100%"] }}
                 transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                 className="absolute top-0 w-20 h-full bg-white/50 blur-sm"
               />
             </div>
          </motion.div>

          {/* THE SLASH (Diagonal Energy Beam) */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0, width: "0%" }}
            animate={{ scaleX: [0, 1.5, 0], opacity: [0, 1, 0], width: ["0%", "150%"] }}
            transition={{ duration: 0.4, delay: 1.7, ease: "circOut" }}
            className="absolute top-1/2 left-1/2 h-[4px] bg-white shadow-[0_0_100px_#00ffff,0_0_50px_#ff0055] z-40 origin-center -translate-x-1/2 -translate-y-1/2"
            style={{ rotate: -15 }}
          />
          
          {/* SCREEN CRACK OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.3, delay: 1.7 }}
            className="absolute inset-0 z-40 pointer-events-none mix-blend-overlay"
          >
             <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 0 L40 45 L0 100" fill="none" stroke="white" strokeWidth="0.5" />
                <path d="M100 0 L60 55 L100 100" fill="none" stroke="white" strokeWidth="0.5" />
                <path d="M40 45 L60 55" fill="none" stroke="white" strokeWidth="1" />
                <path d="M20 20 L40 45 L30 80" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.2" />
                <path d="M80 20 L60 55 L70 80" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.2" />
             </svg>
          </motion.div>
          
          {/* Screen Shake & Flash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.1, delay: 1.8 }}
            className="absolute inset-0 bg-white z-50 mix-blend-overlay"
          />

        </div>
      )}
    </AnimatePresence>
  );
}