"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { X, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function CartDrawer() {
  const { cart, isCartOpen, toggleCart, removeFromCart } = useStore();
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", city: "" });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    const itemsList = cart.map(item => `- ${item.name} x${item.quantity} (${item.currency}${item.price})`).join('\n');
    const message = `
*NEW ORDER REQUEST*
------------------
*Customer:* ${formData.name}
*Phone:* ${formData.phone}
*City:* ${formData.city}
------------------
*ITEMS:*
${itemsList}
------------------
*TOTAL ESTIMATE:* Rs. ${total}
------------------
Please confirm availability and payment details.
    `.trim();

    const phone = "9426340289";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-black border-l border-anime-pink z-[70] shadow-[0_0_50px_rgba(255,0,85,0.2)] overflow-y-auto"
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h2 className="text-3xl font-bangers text-white tracking-wide">
                  YOUR <span className="text-anime-pink">LOOT</span>
                </h2>
                <button onClick={toggleCart} className="hover:text-anime-pink transition-colors">
                  <X className="w-8 h-8" />
                </button>
              </div>

              {!checkoutMode ? (
                <>
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                    {cart.length === 0 ? (
                      <div className="text-center text-gray-500 mt-20 font-mono">
                        <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p>CONTAINER EMPTY</p>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div key={item.id} className="flex gap-4 bg-gray-900/50 p-3 rounded border border-white/5 relative group">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded border border-white/10" />
                          <div className="flex-1">
                            <h4 className="font-bold text-white text-sm line-clamp-1">{item.name}</h4>
                            <p className="text-anime-pink font-mono text-xs mt-1">
                              {item.currency}{item.price} x {item.quantity}
                            </p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="mt-8 border-t border-white/10 pt-6">
                    <div className="flex justify-between text-xl font-bold mb-6 font-mono">
                      <span>TOTAL</span>
                      <span className="text-anime-cyan">Rs. {total}</span>
                    </div>
                    <button 
                      onClick={() => setCheckoutMode(true)}
                      disabled={cart.length === 0}
                      className="w-full bg-anime-pink text-white font-black py-4 skew-x-[-5deg] hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      PROCEED TO CHECKOUT
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col">
                  <button onClick={() => setCheckoutMode(false)} className="text-gray-500 mb-6 hover:text-white text-sm">
                    ← Back to Cart
                  </button>
                  
                  <h3 className="text-xl font-bold mb-6 font-bangers text-anime-cyan">TRANSMISSION DETAILS</h3>
                  
                  <form onSubmit={handleCheckout} className="space-y-4 font-mono text-sm">
                    <div>
                      <label className="block text-gray-400 mb-2">CODENAME (Name)</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-gray-900 border border-white/20 p-3 focus:border-anime-pink outline-none text-white"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-2">CONTACT (Phone)</label>
                      <input 
                        required
                        type="tel" 
                        className="w-full bg-gray-900 border border-white/20 p-3 focus:border-anime-pink outline-none text-white"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 mb-2">LOCATION (City)</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-gray-900 border border-white/20 p-3 focus:border-anime-pink outline-none text-white"
                        placeholder="Enter your city"
                        value={formData.city}
                        onChange={e => setFormData({...formData, city: e.target.value})}
                      />
                    </div>

                    <button type="submit" className="w-full bg-green-600 text-white font-black py-4 mt-8 hover:bg-green-500 transition-colors uppercase flex items-center justify-center gap-2">
                      <MessageCircle className="w-5 h-5" /> SEND VIA WHATSAPP
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
