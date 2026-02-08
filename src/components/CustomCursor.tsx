"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  if (typeof window !== "undefined") {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    if (!mq.matches) return null;
  }

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const apply = () => {
      if (mq.matches) {
        document.body.classList.add("cursor-none");
      } else {
        document.body.classList.remove("cursor-none");
      }
    };
    apply();
    if (mq.addEventListener) {
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    }
    mq.addListener(apply);
    return () => mq.removeListener(apply);
  }, []);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button, a, .cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1,
          rotate: isHovering ? 45 : 0
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        <div className="w-full h-full border-2 border-anime-cyan relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-anime-pink" />
          <div className="absolute top-0 left-1/2 h-full w-[1px] bg-anime-pink" />
        </div>
      </motion.div>
      
      <motion.div
         className="fixed top-0 left-0 w-[6px] h-[6px] bg-white rounded-full pointer-events-none z-[9999] hidden md:block"
         animate={{
           x: mousePosition.x - 3,
           y: mousePosition.y - 3,
         }}
         transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.01 }}
      />
    </>
  );
}
