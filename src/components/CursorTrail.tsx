"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function CursorTrail() {
  if (typeof window !== "undefined") {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    if (!mq.matches) return null;
  }
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Trail */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-anime-cyan pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* Ghost Echo */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full bg-anime-pink/20 blur-xl pointer-events-none z-[9997]"
        style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
        }}
        transition={{ delay: 0.1 }}
      />
    </>
  );
}
