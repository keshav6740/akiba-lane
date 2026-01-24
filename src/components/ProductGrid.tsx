"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Filter } from "lucide-react";
import { products, categories } from "@/lib/data";
import { useStore } from "@/context/StoreContext";

export default function ProductGrid() {
  const { currentCategory, addToCart, toggleWishlist, wishlist, setCategory } = useStore();

  const filteredProducts = currentCategory === "all" 
    ? products 
    : products.filter(p => p.category === currentCategory);

  const getCategoryColor = (catId: string) => {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.color : "border-white/20";
  };

  return (
    <section id="product-grid" className="py-24 px-6 bg-black border-t border-white/5 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-bangers text-white mb-2 uppercase">
              {currentCategory === "all" ? "All Loot" : categories.find(c => c.id === currentCategory)?.title}
            </h2>
            <p className="font-mono text-anime-cyan text-sm tracking-widest flex items-center gap-2">
              <Filter className="w-4 h-4" /> // FILTER: {currentCategory.toUpperCase()}
            </p>
          </div>
          <button 
            onClick={() => setCategory("all")}
            className="px-6 py-2 border border-anime-pink text-anime-pink font-mono text-xs hover:bg-anime-pink hover:text-white transition-colors clip-button"
          >
            VIEW ALL_
          </button>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative"
              >
                {/* Manga Panel Card */}
                <div className={`relative bg-gray-900 border-4 border-black group-hover:${getCategoryColor(product.category).replace('border-', 'border-')} clip-card overflow-hidden transition-all duration-300 shadow-[5px_5px_0px_0px_rgba(255,255,255,0.1)] group-hover:shadow-[8px_8px_0px_0px_var(--color-anime-pink)]`}>
                  
                  {/* Comic Book Corner Triangle */}
                  <div className="absolute top-0 left-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-white border-r-transparent z-30" />
                  
                  {/* Rarity Badge */}
                  <div className="absolute top-0 right-0 z-20 bg-black px-4 py-1 border-l-2 border-b-2 border-white transform skew-x-[-10deg] origin-top-right mr-[-5px]">
                    <span className={`font-black italic text-sm ${
                      product.rarity === 'UR' ? 'text-anime-yellow animate-pulse' : 
                      product.rarity === 'SSR' ? 'text-anime-pink' : 'text-white'
                    }`}>
                      {product.rarity}
                    </span>
                  </div>

                  {/* Image Container */}
                  <div className="aspect-[4/5] relative flex items-center justify-center overflow-hidden bg-white">
                    {/* Halftone Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px] z-10 pointer-events-none" />
                    
                    {/* Product Image */}
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    
                    {/* Action Text On Hover */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bangers text-6xl text-anime-pink opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-200 z-20 pointer-events-none text-stroke-black">
                      POW!
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 bg-white text-black relative z-10">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-black text-xl italic uppercase leading-none mb-1">
                          {product.name}
                        </h3>
                        <p className="text-[10px] font-mono bg-black text-white inline-block px-1">
                          #{product.id}
                        </p>
                      </div>
                      <span className="font-bangers text-2xl text-anime-purple">
                        {product.currency}{product.price}
                      </span>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button 
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-black text-white font-black text-sm uppercase py-3 hover:bg-anime-pink hover:-translate-y-1 transition-all clip-button flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
                      >
                        <ShoppingCart className="w-4 h-4" /> GET IT
                      </button>
                      <button 
                        onClick={() => toggleWishlist(product.id)}
                        className={`w-12 border-2 border-black flex items-center justify-center hover:-translate-y-1 transition-all clip-button shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] ${wishlist.includes(product.id) ? 'bg-anime-pink text-white' : 'bg-white text-black'}`}
                      >
                        <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500 font-mono">
            // NO ITEMS FOUND IN THIS SECTOR
          </div>
        )}
      </div>
    </section>
  );
}