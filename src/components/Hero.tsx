"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { useRef, useEffect } from "react";
import { ChevronDown, Zap, Layers } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const yText = useTransform(smoothScroll, [0, 1], [0, 300]);
  const opacity = useTransform(smoothScroll, [0, 0.5], [1, 0]);

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);
      spotlightX.set(e.clientX);
      spotlightY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, spotlightX, spotlightY]);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  
  // Spotlight Gradient
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, rgba(255,255,255,0.07), transparent 80%)`;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black perspective-1000"
    >
      {/* Cinematic Spotlight */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay"
        style={{ background: spotlight }}
      />

      {/* Volumetric God Rays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
         <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-b from-transparent via-anime-purple/10 to-transparent rotate-45 animate-godray-1 blur-3xl" />
         <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-b from-transparent via-anime-cyan/5 to-transparent -rotate-45 animate-godray-2 blur-3xl" />
         <style jsx>{`
            @keyframes godray-1 { 0% { transform: rotate(45deg) translateY(0); } 50% { transform: rotate(45deg) translateY(-50px); } 100% { transform: rotate(45deg) translateY(0); } }
            @keyframes godray-2 { 0% { transform: rotate(-45deg) translateY(0); } 50% { transform: rotate(-45deg) translateY(50px); } 100% { transform: rotate(-45deg) translateY(0); } }
         `}</style>
      </div>

            {/* Background Layers */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0510] to-black opacity-90" />
            <div className="manga-lines opacity-10" />
            <div className="cyber-plane opacity-30" />
      
            {/* Floating Debris */}      {Array.from({ length: 5 }).map((_, i) => (
         <motion.div
            key={i}
            className="absolute border border-anime-cyan/30 bg-anime-cyan/5 backdrop-blur-sm z-0"
            style={{
                width: 50 + Math.random() * 100,
                height: 50 + Math.random() * 100,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0%',
            }}
            animate={{
                y: [0, -100, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
            }}
            transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear"
            }}
         />
      ))}

      <div className="relative z-10 w-full max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div 
          style={{ y: yText, opacity }}
          className="text-left"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-anime-cyan" />
            <span className="font-mono text-anime-cyan tracking-widest text-sm">EST. 2026 // TOKYO</span>
          </div>

          <h1 className="font-bangers text-7xl md:text-9xl tracking-wide leading-none mb-6 relative z-10 text-white drop-shadow-[0_0_15px_rgba(255,0,85,0.5)]">
            <span className="block glitch-text" data-text="LEVEL UP">LEVEL UP</span>
            <span 
                className="block liquid-metal" 
                data-text="YOUR WORLD"
            >
                YOUR WORLD
            </span>
          </h1>

          <p className="font-mono text-gray-400 max-w-lg mb-8 border-l-2 border-anime-pink pl-6 py-2">
            SYSTEM INITIALIZED. ACCESSING DATABASE OF PREMIUM FIGURES, MYSTERY CRATES, AND RARE ARTIFACTS.
          </p>

          <div className="flex flex-wrap gap-6">
            <button 
              onClick={() => scrollToSection('product-grid')}
              className="relative group overflow-hidden px-8 py-4 bg-anime-pink clip-button font-bold tracking-wider hover:bg-white hover:text-black transition-colors duration-300 shadow-[0_0_20px_rgba(255,0,85,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="w-5 h-5" /> START SHOPPING
              </span>
              <div className="absolute inset-0 bg-white transform -translate-x-full skew-x-12 group-hover:translate-x-0 transition-transform duration-300 z-0" />
            </button>
            
            <button 
              onClick={() => scrollToSection('categories-section')}
              className="px-8 py-4 border border-anime-cyan text-anime-cyan clip-button font-bold tracking-wider hover:bg-anime-cyan/10 transition-colors flex items-center gap-2"
            >
              <Layers className="w-5 h-5" /> VIEW COLLECTION
            </button>
          </div>
        </motion.div>

        {/* Hero Visual/3D Card with Mouse Parallax */}
        <div className="relative hidden lg:block perspective-1000">
          <motion.div 
            initial={{ y: -500, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, damping: 10, delay: 2.5 }} // Delay matches preloader end
            style={{ rotateX, rotateY }}
            className="relative w-[600px] h-[700px] bg-gray-900 border border-white/10 clip-card p-8 group transform-style-3d shadow-2xl"
          >
            {/* Scanning Line Animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg z-20">
              <motion.div 
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[2px] bg-anime-cyan shadow-[0_0_20px_#00ffff]"
              />
            </div>

            {/* Cyberpunk UI Overlay */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-anime-cyan" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-anime-cyan" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-anime-cyan" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-anime-cyan" />
            
            <div className="absolute inset-0 bg-[url('https://media.istockphoto.com/id/1364505362/vector/abstract-technology-background-concept-circle-circuit-digital-metal-blue-on-grey-background.jpg?s=612x612&w=0&k=20&c=K6qW9Tqg0DrsXyTq0DrsXyTq0DrsXyTq0DrsXyTq0DrsXyTq=')] opacity-20 mix-blend-overlay bg-cover" />

            {/* Content inside card */}
            <div className="relative z-10 h-full flex flex-col justify-between transform-style-3d translate-z-20">
               <div className="flex justify-between text-xs font-mono text-anime-cyan/70">
                 <span>ID: #9932-A</span>
                 <span>STATUS: ONLINE</span>
               </div>
               
               <div className="text-center transform translate-z-50">
                 <motion.div 
                   animate={{ scale: [1, 1.1, 1] }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="w-48 h-48 mx-auto bg-gradient-to-br from-anime-pink to-anime-purple rounded-full blur-2xl opacity-50 mb-4" 
                 />
                 <h3 className="font-bangers text-7xl mt-[-100px] text-white/90 drop-shadow-lg">MYSTERY BOX</h3>
                 <p className="font-mono text-sm text-anime-purple mt-2 tracking-[0.5em]">SR // SSR // UR</p>
               </div>

               <div className="space-y-2">
                 <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-anime-pink" 
                   />
                 </div>
                 <div className="flex justify-between text-[10px] font-mono text-gray-400">
                   <span>RARITY RATE</span>
                   <span>85%</span>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-anime-cyan cursor-pointer"
        onClick={() => scrollToSection('categories-section')}
      >
        <ChevronDown className="w-8 h-8 opacity-70" />
      </motion.div>
    </section>
  );
}