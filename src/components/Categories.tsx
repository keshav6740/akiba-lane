"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data";
import { useStore } from "@/context/StoreContext";

export default function Categories() {
  const { setCategory } = useStore();

  return (
    <section className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-anime-purple/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 flex items-end gap-4">
          <h2 className="text-5xl md:text-7xl font-bangers text-white uppercase tracking-wider">
            Sector <span className="text-transparent bg-clip-text bg-gradient-to-r from-anime-cyan to-anime-purple">Select</span>
          </h2>
          <div className="h-4 w-full max-w-xs bg-repeating-linear-gradient-45 from-transparent to-anime-cyan/20 bg-[length:10px_10px]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`group relative h-72 border-2 ${cat.color} bg-black/50 backdrop-blur-sm ${cat.bg} transition-all duration-300 clip-card overflow-hidden cursor-pointer`}
            >
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 p-2 bg-white/10 backdrop-blur-md border-b border-l border-white/20">
                <ArrowRight className="w-4 h-4 text-white -rotate-45 group-hover:rotate-0 transition-transform" />
              </div>

              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] bg-[position:0_0] group-hover:bg-[position:100%_100%] transition-[background-position] duration-700" />

              <div className="p-8 h-full flex flex-col justify-between relative z-10">
                <div className={`w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-black/50 group-hover:scale-110 transition-transform duration-300 text-white`}>
                  <cat.icon className="w-8 h-8" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bangers uppercase tracking-wide mb-2 text-white group-hover:translate-x-2 transition-transform">{cat.title}</h3>
                  <p className="font-mono text-xs text-gray-400 border-l-2 border-white/30 pl-3 group-hover:text-white transition-colors">{cat.desc}</p>
                </div>
              </div>
              
              <div className="absolute bottom-0 right-0 text-6xl font-black text-white/5 font-bangers -mb-4 -mr-4 group-hover:scale-110 transition-transform">
                0{idx + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}