"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Ghost, Zap, Search, X, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { useState, useEffect, useRef } from "react";
import { products } from "@/lib/products";
import { categories } from "@/lib/data";

export default function Navbar() {
  const { cart, setCategory, toggleCart, addToCart } = useStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCategoriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 md:py-4 bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2 group cursor-pointer">
            <Zap className="text-anime-pink w-6 h-6 md:w-8 md:h-8 fill-anime-pink group-hover:animate-pulse" />
            <span className="text-xl md:text-2xl font-black italic tracking-tighter text-white group-hover:animate-glitch">
              AKIBA<span className="text-anime-pink">LANE</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-[0.3em] font-orbitron">
            <Link href="/#shop" className="hover:text-anime-pink transition-colors relative group">
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-anime-pink group-hover:w-full transition-all duration-300" />
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsCategoriesOpen((v) => !v)}
                className="hover:text-anime-pink transition-colors relative group flex items-center gap-1"
              >
                Categories
                <ChevronDown className="w-4 h-4" />
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-anime-pink group-hover:w-full transition-all duration-300" />
              </button>
              {isCategoriesOpen && (
                <div className="absolute top-8 left-0 bg-black/90 border border-white/10 shadow-xl w-52 z-50 backdrop-blur-xl">
                  <button
                    className="w-full text-left px-4 py-2 text-xs hover:bg-white/5"
                    onClick={() => {
                      setIsCategoriesOpen(false);
                      const el = document.getElementById("categories-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      className="w-full text-left px-4 py-2 text-xs hover:bg-white/5"
                      onClick={() => {
                        setCategory(cat.id);
                        setIsCategoriesOpen(false);
                        const el = document.getElementById("product-grid");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link href="/wishlist" className="hover:text-anime-pink transition-colors relative group">
              Wishlist
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-anime-pink group-hover:w-full transition-all duration-300" />
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3 md:gap-4">
            <button onClick={() => setIsSearchOpen(true)} aria-label="Search products" className="hover:text-anime-cyan transition-colors">
              <Search className="w-5 h-5 cursor-pointer" />
            </button>

            <div onClick={toggleCart} className="relative cursor-pointer group hover:scale-110 transition-transform">
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 group-hover:text-anime-pink transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-anime-pink text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>

            <button onClick={() => setIsContactOpen(true)} aria-label="Contact admin" className="hover:text-anime-purple transition-colors hidden md:block">
              <Ghost className="w-6 h-6 cursor-pointer hover:rotate-12" />
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label="Menu"
              className="md:hidden hover:text-anime-pink transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Slide-Out Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-black/60 z-[55] md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-72 bg-black/95 backdrop-blur-xl border-l border-white/10 z-[56] md:hidden pt-20 px-6 overflow-y-auto"
            >
              <div className="space-y-1">
                <Link
                  href="/#shop"
                  onClick={closeMobileMenu}
                  className="block w-full py-3 px-4 text-sm font-orbitron uppercase tracking-[0.2em] text-white hover:text-anime-pink hover:bg-white/5 transition-colors border-b border-white/5"
                >
                  Shop
                </Link>
                <div className="border-b border-white/5">
                  <p className="py-3 px-4 text-sm font-orbitron uppercase tracking-[0.2em] text-gray-400">
                    Categories
                  </p>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      className="block w-full text-left py-2 px-6 text-xs font-mono text-gray-300 hover:text-anime-pink hover:bg-white/5 transition-colors"
                      onClick={() => {
                        setCategory(cat.id);
                        closeMobileMenu();
                        const el = document.getElementById("product-grid");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
                <Link
                  href="/wishlist"
                  onClick={closeMobileMenu}
                  className="block w-full py-3 px-4 text-sm font-orbitron uppercase tracking-[0.2em] text-white hover:text-anime-pink hover:bg-white/5 transition-colors border-b border-white/5"
                >
                  Wishlist
                </Link>
                <button
                  onClick={() => { closeMobileMenu(); setIsContactOpen(true); }}
                  className="block w-full py-3 px-4 text-sm font-orbitron uppercase tracking-[0.2em] text-white hover:text-anime-purple hover:bg-white/5 transition-colors border-b border-white/5 text-left"
                >
                  Contact
                </button>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10">
                <Link href="/shipping-policy" onClick={closeMobileMenu} className="block py-2 text-xs text-gray-500 hover:text-white font-mono">
                  Shipping Policy
                </Link>
                <Link href="/returns" onClick={closeMobileMenu} className="block py-2 text-xs text-gray-500 hover:text-white font-mono">
                  Returns
                </Link>
                <Link href="/faq" onClick={closeMobileMenu} className="block py-2 text-xs text-gray-500 hover:text-white font-mono">
                  FAQ
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl pt-20 md:pt-32 px-4 md:px-6"
          >
            <button onClick={() => setIsSearchOpen(false)} className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-anime-pink">
              <X className="w-8 h-8 md:w-10 md:h-10" />
            </button>

            <div className="max-w-4xl mx-auto">
              <input
                autoFocus
                type="text"
                placeholder="SEARCH..."
                className="w-full bg-transparent border-b-2 border-white/20 text-2xl md:text-6xl font-black text-white py-3 md:py-4 outline-none focus:border-anime-cyan uppercase placeholder:text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <div className="mt-6 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-h-[60vh] overflow-y-auto pb-6">
                {searchQuery && filteredProducts.map(product => (
                  <div key={product.id} className="flex items-center justify-between gap-3 md:gap-4 p-3 md:p-4 border border-white/10 hover:border-anime-cyan bg-gray-900/50 cursor-pointer" onClick={() => {
                    setCategory(product.category);
                    setIsSearchOpen(false);
                    const el = document.getElementById('product-grid');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    <div className="flex items-center gap-3">
                      <img src={product.image} className="w-12 h-12 md:w-16 md:h-16 object-cover" alt={product.name} />
                      <div>
                        <h4 className="font-bold text-white text-sm">{product.name}</h4>
                        <p className="text-anime-pink text-xs md:text-sm">{product.currency}{product.price}{product.category === 'set' ? ' (each)' : ''}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="px-3 md:px-4 py-2 border border-anime-cyan text-anime-cyan font-mono text-xs hover:bg-anime-cyan hover:text-white transition-colors clip-button shrink-0"
                    >
                      ADD
                    </button>
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
              className="bg-gray-900 border-2 border-anime-purple p-6 md:p-8 max-w-sm w-full relative clip-card shadow-[0_0_50px_rgba(138,43,226,0.3)]"
            >
              <button onClick={() => setIsContactOpen(false)} className="absolute top-4 right-4 hover:text-anime-purple">
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-6">
                <Ghost className="w-12 h-12 md:w-16 md:h-16 text-anime-purple mx-auto mb-4 animate-bounce" />
                <h3 className="text-xl md:text-2xl font-bangers text-white">ADMIN CONTACT</h3>
                <p className="text-gray-400 text-sm font-mono mt-2">Direct line to Akiba HQ</p>
              </div>

              <div className="space-y-4">
                <a href="mailto:admin@akibastore.com" target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-white/5 hover:bg-anime-purple/20 border border-white/10 text-center font-bold text-white transition-colors text-sm md:text-base">
                  EMAIL SUPPORT
                </a>
                <a href="https://wa.me/919426340289" target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-white/5 hover:bg-green-500/20 border border-white/10 text-center font-bold text-white transition-colors text-sm md:text-base">
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
