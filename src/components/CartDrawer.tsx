"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { X, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function CartDrawer() {
  const { cart, isCartOpen, toggleCart, removeFromCart } = useStore();
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address1: "",
    address2: "",
    state: "",
    city: "",
    pincode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const itemsList = cart
      .map(item => `- ${item.name} x${item.quantity} (${item.currency}${item.price})`)
      .join("\n");
    const address = [
      formData.address1,
      formData.address2,
      formData.city,
      formData.state,
      formData.pincode,
    ]
      .filter(Boolean)
      .join(", ");
    const orderPayload = {
      name: formData.name,
      phone: formData.phone,
      address,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        currency: item.currency,
        quantity: item.quantity,
      })),
      total,
      currency: "Rs.",
      status_paid: false,
      status_fulfilled: false,
      source: "whatsapp",
    };

    let orderId: string | null = null;
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
      const json = await res.json();
      if (!res.ok) {
        setSubmitError("Order save failed. Please try again or contact support.");
      } else {
        orderId = json.id || null;
        // Fire and forget sheet sync to keep checkout fast
        fetch("/api/orders/sync-sheet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: json.order }),
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      setSubmitError("Order save failed. Please try again or contact support.");
    } finally {
      setIsSubmitting(false);
    }

    const message = `
*NEW ORDER REQUEST*
------------------
*Customer:* ${formData.name}
*Phone:* ${formData.phone}
*Address:* ${address}
------------------
*ITEMS:*
${itemsList}
------------------
*TOTAL ESTIMATE:* Rs. ${total}
------------------
Please confirm availability and payment details.
Also provide me with theme stickers.
    `.trim();

    const phone = "9426340289";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
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
                    {"\u2190 Back to Cart"}
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
                      <label className="block text-gray-400 mb-2">STREET ADDRESS (LINE 1)</label>
                      <input
                        required
                        type="text"
                        className="w-full bg-gray-900 border border-white/20 p-3 focus:border-anime-pink outline-none text-white"
                        placeholder="House no, Street, Area"
                        value={formData.address1}
                        onChange={e => setFormData({ ...formData, address1: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-2">STREET ADDRESS (LINE 2)</label>
                      <input
                        type="text"
                        className="w-full bg-gray-900 border border-white/20 p-3 focus:border-anime-pink outline-none text-white"
                        placeholder="Landmark, Apartment, etc. (optional)"
                        value={formData.address2}
                        onChange={e => setFormData({ ...formData, address2: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-2">STATE</label>
                      <select
                        required
                        className="w-full bg-gray-900 border border-white/20 p-3 focus:border-anime-pink outline-none text-white"
                        value={formData.state}
                        onChange={e => setFormData({ ...formData, state: e.target.value })}
                      >
                        <option value="">Select state</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Ladakh">Ladakh</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-2">CITY</label>
                      <input
                        required
                        type="text"
                        className="w-full bg-gray-900 border border-white/20 p-3 focus:border-anime-pink outline-none text-white"
                        placeholder="Type your city"
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-2">PIN CODE</label>
                      <input
                        required
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]{6}"
                        className="w-full bg-gray-900 border border-white/20 p-3 focus:border-anime-pink outline-none text-white"
                        placeholder="6-digit PIN"
                        value={formData.pincode}
                        onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                      />
                    </div>

                  {submitError && (
                    <p className="text-red-400 text-xs">{submitError}</p>
                  )}
                  <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-600 text-white font-black py-4 mt-8 hover:bg-green-500 transition-colors uppercase flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
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

