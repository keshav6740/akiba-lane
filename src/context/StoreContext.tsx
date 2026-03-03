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
  updateCartQuantity: (productId: string, quantity: number) => void;
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

  // Load wishlist from localStorage
  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem("wishlist");
      if (storedWishlist) {
        const parsed = JSON.parse(storedWishlist);
        if (Array.isArray(parsed)) setWishlist(parsed);
      }
    } catch {
      // Corrupted data — ignore
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch {
      // Storage full or unavailable
    }
  }, [wishlist]);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsed = JSON.parse(storedCart);
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch {
      // Corrupted data — ignore
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {
      // Storage full or unavailable
    }
  }, [cart]);

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

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
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

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        currentCategory,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
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
