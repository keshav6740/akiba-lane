"use client";

import { ArrowUp, Grid3X3 } from "lucide-react";
import { useState } from "react";

export default function ScrollToTop() {
  const [open, setOpen] = useState(false);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[80] flex flex-col items-end gap-2">
      {open && (
        <div className="bg-black/80 border border-white/10 backdrop-blur-xl p-3 clip-card space-y-2 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <button
            onClick={() => {
              setOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-full text-left text-xs font-mono text-white hover:text-anime-pink"
          >
            Top
          </button>
          <button
            onClick={() => {
              setOpen(false);
              scrollToId("categories-section");
            }}
            className="w-full text-left text-xs font-mono text-white hover:text-anime-pink"
          >
            Shrine Gates
          </button>
          <button
            onClick={() => {
              setOpen(false);
              scrollToId("product-grid");
            }}
            className="w-full text-left text-xs font-mono text-white hover:text-anime-pink"
          >
            All Relics
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-11 h-11 bg-black/80 text-white border border-white/10 flex items-center justify-center clip-button shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:border-anime-pink transition-colors"
        aria-label="Quick navigation"
      >
        <Grid3X3 className="w-4 h-4" />
      </button>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-12 h-12 bg-anime-pink text-white flex items-center justify-center clip-button shadow-[0_0_20px_rgba(255,0,85,0.4)] hover:bg-white hover:text-black transition-colors"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}
