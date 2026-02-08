"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, ShoppingCart, Filter } from "lucide-react";
import { products } from "@/lib/products";
import { categories } from "@/lib/data";
import { useStore } from "@/context/StoreContext";
import { useState, useMemo, useEffect } from "react";
import { Product } from "@/lib/data";

type ProductGridProps = {
  productsToShow?: Product[];
};

function ProductCard({ product, tiltEnabled }: { product: Product; tiltEnabled: boolean }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(ySpring, [-50, 50], [12, -12]);
  const rotateY = useTransform(xSpring, [-50, 50], [-12, 12]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEnabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx);
    y.set(dy);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getCategoryColor = (catId: string) => {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.color : "border-white/20";
  };

  return (
    <motion.div
      layout
      key={product.id}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={tiltEnabled ? { rotateX, rotateY, transformStyle: "preserve-3d" } : {}}
        className={`relative bg-gray-900/70 border-4 border-black group-hover:${getCategoryColor(product.category).replace('border-', 'border-')} clip-card overflow-hidden transition-all duration-300 shadow-[10px_10px_0px_0px_rgba(255,255,255,0.08)] group-hover:shadow-[20px_20px_0px_0px_var(--color-anime-pink)] group-hover:-translate-y-2 holo-effect paper-texture`}
      >
        <div className="absolute top-0 left-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-white border-r-transparent z-30" />
        <div className="absolute top-0 right-0 z-20 bg-black px-4 py-1 border-l-2 border-b-2 border-white transform skew-x-[-10deg] origin-top-right mr-[-5px]">
          <span className={`font-black italic text-sm ${
            product.rarity === 'UR' ? 'text-anime-yellow animate-pulse' :
            product.rarity === 'SSR' ? 'text-anime-pink' : 'text-white'
          }`}>
            {product.rarity}
          </span>
        </div>

        <div className="aspect-[4/5] relative flex items-center justify-center overflow-hidden bg-[#f7f2ea]">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px] z-10 pointer-events-none" />
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain group-hover:scale-110 transition-all duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bangers text-7xl text-anime-pink opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200 z-20 pointer-events-none text-stroke-black rotate-[-12deg]">
            POW!
          </div>
        </div>

        <div className="p-5 bg-[#f7f2ea] text-black relative z-10">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-black text-lg md:text-xl italic uppercase leading-tight mb-1">
                {product.name}
              </h3>
              <p className="text-[10px] font-mono bg-black text-white inline-block px-1">
                #{product.id}
              </p>
            </div>
            <span className="font-bangers text-xl md:text-2xl text-anime-purple">
              {product.currency}{product.price}{product.category === 'set' ? ' (each)' : ''}
            </span>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-black text-white font-black text-sm uppercase py-3 hover:bg-anime-pink hover:scale-105 transition-all clip-button flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
            >
              <ShoppingCart className="w-4 h-4" /> GET IT
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`w-12 border-2 border-black flex items-center justify-center hover:scale-105 transition-all clip-button shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] ${wishlist.includes(product.id) ? 'bg-anime-pink text-white' : 'bg-white text-black'}`}
            >
              <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProductGrid({ productsToShow }: ProductGridProps) {
  const { currentCategory, setCategory } = useStore();
  const [sortOrder, setSortOrder] = useState("default");
  const [tiltEnabled, setTiltEnabled] = useState(true);
  const [pageSize, setPageSize] = useState(12);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    const update = () => setTiltEnabled(mq.matches);
    update();
    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => {
      const size = mq.matches ? 12 : 18;
      setPageSize(size);
      setVisibleCount(size);
    };
    update();
    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [currentCategory, sortOrder, productsToShow, pageSize]);

  const filteredProducts = useMemo(() => {
    let filtered = productsToShow 
      ? productsToShow
      : currentCategory === "all" 
        ? products 
        : products.filter(p => p.category === currentCategory);

    switch (sortOrder) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "name-asc":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return filtered;
    }
  }, [currentCategory, sortOrder, productsToShow]);

  return (
    <section id="product-grid" className="py-6 px-6 bg-black/30 min-h-screen relative z-10 edge-tear -mt-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-6 border-b border-white/10 pb-4">
          <div>
            <p className="font-mono text-xs tracking-[0.4em] text-anime-pink">LOOT ARCHIVE</p>
            <h2 className="text-4xl md:text-6xl font-bangers text-white mb-2 uppercase">
              {currentCategory === "all" ? "All Relics" : categories.find(c => c.id === currentCategory)?.title}
            </h2>
            <p className="font-mono text-anime-cyan text-sm tracking-widest flex items-center gap-2">
              <Filter className="w-4 h-4" /> // FILTER: {currentCategory.toUpperCase()}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <select 
              onChange={(e) => setSortOrder(e.target.value)} 
              className="bg-black border border-white/20 rounded-md px-3 py-2 text-white font-mono text-xs"
            >
              <option value="default">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select>
            <button 
              onClick={() => setCategory("all")}
              className="px-6 py-2 border border-anime-pink text-anime-pink font-mono text-xs hover:bg-anime-pink hover:text-white transition-colors clip-button"
            >
              VIEW ALL_
            </button>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence>
            {filteredProducts.slice(0, visibleCount).map((product) => (
              <ProductCard key={product.id} product={product} tiltEnabled={tiltEnabled} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length > visibleCount && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setVisibleCount((v) => v + pageSize)}
              className="px-8 py-3 border border-anime-cyan text-anime-cyan font-mono text-xs clip-button hover:bg-anime-cyan hover:text-white transition-colors"
            >
              LOAD MORE
            </button>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500 font-mono">
            // NO ITEMS FOUND IN THIS SECTOR
          </div>
        )}
      </div>
    </section>
  );
}
