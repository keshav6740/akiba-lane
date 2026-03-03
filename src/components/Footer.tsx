"use client";

import { useState } from "react";
import { Ghost, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("ok");
    setEmail("");
  };

  return (
    <footer className="bg-black/40 py-12 md:py-20 px-4 md:px-6 border-t border-white/5 relative z-10 torii-frame edge-tear">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        <div className="col-span-1 sm:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Ghost className="text-anime-pink w-8 h-8" />
            <span className="text-2xl font-black italic tracking-tighter">
              AKIBA<span className="text-anime-pink">LANE</span>
            </span>
          </div>
          <p className="text-gray-300 max-w-sm mb-6 md:mb-8 text-sm md:text-base">
            The premier destination for anime collectors. Founded by fans, for fans. Join our community and level up your shelf today.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/akibalane.official?igsh=eTUwMDBxb2FrZzFk"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full hover:border-anime-pink transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-sm">Quick Links</h4>
          <ul className="space-y-4 text-gray-300 font-medium">
            <li><Link href="/shipping-policy" className="hover:text-anime-pink transition-colors">Shipping Policy</Link></li>
            <li><Link href="/returns" className="hover:text-anime-pink transition-colors">Returns</Link></li>
            <li><Link href="/faq" className="hover:text-anime-pink transition-colors">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-sm">Newsletter</h4>
          <form onSubmit={submit} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-black border border-white/20 p-3 text-white font-mono text-xs"
            />
            <button
              type="submit"
              className="w-full border border-anime-cyan text-anime-cyan font-mono text-xs py-3 clip-button hover:bg-anime-cyan hover:text-white transition-colors"
            >
              JOIN
            </button>
            {status === "ok" && (
              <p className="text-xs text-anime-cyan font-mono">Thanks. You&apos;re on the list.</p>
            )}
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 md:mt-20 pt-6 md:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
        <p className="text-gray-600 text-xs md:text-sm">© 2026 AKIBA LANE. Built with passion for the culture.</p>
        <div className="flex gap-6 text-gray-600 text-xs md:text-sm">
          <Link href="/shipping-policy" className="hover:text-white">Shipping</Link>
          <Link href="/returns" className="hover:text-white">Returns</Link>
          <Link href="/faq" className="hover:text-white">FAQ</Link>
        </div>
      </div>
    </footer>
  );
}
