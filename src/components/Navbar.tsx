"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Ghost, Zap, Search, X } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { useState } from "react";
import { products } from "@/lib/data";

export default function Navbar() {
  const { cart, setCategory, toggleCart } = useStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isContactOpen, setIsContactOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavClick = (cat: string) => {
    setCategory(cat);
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-md border-b border-white/10"
      >
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <Zap className="text-anime-pink w-8 h-8 fill-anime-pink group-hover:animate-pulse" />
          <span className="text-2xl font-black italic tracking-tighter text-white group-hover:animate-glitch">
            AKIBA<span className="text-anime-pink">LANE</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest font-orbitron">
          <button onClick={() => handleNavClick("individual")} className="hover:text-anime-pink transition-colors relative group">
            Figures
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-anime-pink group-hover:w-full transition-all duration-300" />
          </button>
          <button onClick={() => handleNavClick("myst_box")} className="hover:text-anime-pink transition-colors relative group">
            Mystery Box
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-anime-pink group-hover:w-full transition-all duration-300" />
          </button>
          <button onClick={() => handleNavClick("hp")} className="hover:text-anime-pink transition-colors relative group">
            Harry Potter
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-anime-pink group-hover:w-full transition-all duration-300" />
          </button>
          <button onClick={() => handleNavClick("set")} className="hover:text-anime-pink transition-colors relative group">
            Sets
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-anime-pink group-hover:w-full transition-all duration-300" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <Search onClick={() => setIsSearchOpen(true)} className="w-5 h-5 cursor-pointer hover:text-anime-cyan transition-colors" />
          
          <div onClick={toggleCart} className="relative cursor-pointer group hover:scale-110 transition-transform">
            <ShoppingCart className="w-6 h-6 group-hover:text-anime-pink transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-anime-pink text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                {cartCount}
              </span>
            )}
          </div>
          
          <Ghost onClick={() => setIsContactOpen(true)} className="w-6 h-6 cursor-pointer hover:text-anime-purple transition-colors hover:rotate-12" />
        </div>
      </motion.nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl pt-32 px-6"
          >
            <button onClick={() => setIsSearchOpen(false)} className="absolute top-8 right-8 text-white hover:text-anime-pink">
              <X className="w-10 h-10" />
            </button>
            
            <div className="max-w-4xl mx-auto">
              <input 
                autoFocus
                type="text" 
                placeholder="SEARCH DATABASE..." 
                className="w-full bg-transparent border-b-2 border-white/20 text-4xl md:text-6xl font-black text-white py-4 outline-none focus:border-anime-cyan uppercase placeholder:text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
                {searchQuery && filteredProducts.map(product => (
                  <div key={product.id} className="flex gap-4 p-4 border border-white/10 hover:border-anime-cyan bg-gray-900/50 cursor-pointer" onClick={() => {
                    // Logic to jump to product could be added here
                    setIsSearchOpen(false);
                  }}>
                    <img src={product.image} className="w-16 h-16 object-cover" alt={product.name} />
                    <div>
                      <h4 className="font-bold text-white">{product.name}</h4>
                      <p className="text-anime-pink text-sm">{product.currency}{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsContactOpen(false)}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-gray-900 border-2 border-anime-purple p-8 max-w-sm w-full relative clip-card shadow-[0_0_50px_rgba(138,43,226,0.3)]"
            >
              <button onClick={() => setIsContactOpen(false)} className="absolute top-4 right-4 hover:text-anime-purple">
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center mb-6">
                <Ghost className="w-16 h-16 text-anime-purple mx-auto mb-4 animate-bounce" />
                <h3 className="text-2xl font-bangers text-white">ADMIN CONTACT</h3>
                <p className="text-gray-400 text-sm font-mono mt-2">Direct line to Akiba HQ</p>
              </div>

              <div className="space-y-4">
                <a href="mailto:admin@akibastore.com" target="_blank" className="block w-full py-3 bg-white/5 hover:bg-anime-purple/20 border border-white/10 text-center font-bold text-white transition-colors">
                  EMAIL SUPPORT
                </a>
                <a href="https://wa.me/9426340289" target="_blank" className="block w-full py-3 bg-white/5 hover:bg-green-500/20 border border-white/10 text-center font-bold text-white transition-colors">
                  WHATSAPP
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
