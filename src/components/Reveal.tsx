"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export default function Reveal({ children, width = "fit-content", delay = 0.25, direction = "up" }: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const getVariants = () => {
    switch (direction) {
      case "up": return { hidden: { y: 75, opacity: 0 }, visible: { y: 0, opacity: 1 } };
      case "down": return { hidden: { y: -75, opacity: 0 }, visible: { y: 0, opacity: 1 } };
      case "left": return { hidden: { x: 75, opacity: 0 }, visible: { x: 0, opacity: 1 } };
      case "right": return { hidden: { x: -75, opacity: 0 }, visible: { x: 0, opacity: 1 } };
    }
  };

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.5, delay }}
      >
        {children}
      </motion.div>
      <motion.div 
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" }
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.5, ease: "easeIn" }}
        style={{
            position: "absolute",
            top: 4,
            bottom: 4,
            left: 0,
            right: 0,
            background: "var(--color-anime-pink)",
            zIndex: 20
        }}
      />
    </div>
  );
}
