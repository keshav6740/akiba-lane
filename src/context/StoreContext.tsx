"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/lib/data";

type CartItem = Product & { quantity: number };

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[];
  currentCategory: string;
  isCartOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  setCategory: (category: string) => void;
  toggleCart: () => void;
  notification: string | null;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showNotification(`ACQUIRED: ${product.name}`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showNotification("REMOVED FROM FAVORITES");
        return prev.filter((id) => id !== productId);
      } else {
        showNotification("ADDED TO FAVORITES");
        return [...prev, productId];
      }
    });
  };

  const setCategory = (category: string) => {
    setCurrentCategory(category);
    // Smooth scroll to product grid
    const element = document.getElementById("product-grid");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        currentCategory,
        isCartOpen,
        addToCart,
        removeFromCart,
        toggleWishlist,
        setCategory,
        toggleCart,
        notification,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
