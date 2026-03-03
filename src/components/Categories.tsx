"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data";
import { useStore } from "@/context/StoreContext";

export default function Categories() {
  const { setCategory } = useStore();

  return (
    <section className="pt-8 pb-0 px-4 md:px-6 bg-black/30 relative overflow-hidden torii-frame edge-tear -mb-20">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-anime-purple/15 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8">
          <p className="font-mono text-xs tracking-[0.4em] text-anime-pink">CHOOSE A GATE</p>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bangers text-white uppercase tracking-wider">
            Shrine <span className="text-transparent bg-clip-text bg-gradient-to-r from-anime-pink to-anime-purple">Gates</span>
          </h2>
          <div className="sakura-divider mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className={`group relative h-48 md:h-72 border-2 ${cat.color} bg-black/50 backdrop-blur-sm ${cat.bg} transition-all duration-300 clip-card overflow-hidden cursor-pointer paper-texture`}
              role="button"
              aria-label={`Browse ${cat.title}`}
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-anime-pink/10 blur-2xl" />
              <div className="absolute top-0 right-0 p-2 bg-white/10 backdrop-blur-md border-b border-l border-white/20">
                <ArrowRight className="w-4 h-4 text-white -rotate-45 group-hover:rotate-0 transition-transform" />
              </div>

              <div className="p-4 md:p-8 h-full flex flex-col justify-between relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center bg-black/60 group-hover:scale-110 transition-transform duration-300 text-white">
                    <cat.icon className="w-5 h-5 md:w-8 md:h-8" />
                  </div>
                  <div className="text-3xl md:text-6xl font-black text-white/10 font-bangers">0{idx + 1}</div>
                </div>

                <div>
                  <h3 className="text-lg md:text-2xl font-bangers uppercase tracking-wide mb-1 md:mb-2 text-white group-hover:translate-x-2 transition-transform">{cat.title}</h3>
                  <p className="font-mono text-[10px] md:text-xs text-gray-300 border-l-2 border-white/30 pl-2 md:pl-3 hidden sm:block">{cat.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
