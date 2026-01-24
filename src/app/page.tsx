import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductGrid from "@/components/ProductGrid";
import CustomCursor from "@/components/CustomCursor";
import CyberHUD from "@/components/CyberHUD";
import Reveal from "@/components/Reveal";
import { Ghost, Instagram, Twitter, Github } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen cursor-none">
      <CustomCursor />
      <CyberHUD />
      <div className="parallax-bg" />
      <Navbar />
      
      <Hero />
      
      <div id="shop" className="relative z-10 bg-black">
        <div id="categories-section">
          <Categories />
        </div>
        <div id="product-grid">
          <ProductGrid />
        </div>
      </div>

      {/* Mystery Box Promotion Section */}
      <section className="py-32 px-6 bg-anime-purple/10 border-y border-anime-purple/30 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-anime-purple/20 blur-[150px] rounded-full animate-pulse" />
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black italic mb-8 leading-tight">
              UNLEASH THE <br />
              <span className="text-anime-purple text-glow">MYSTERY BOX</span>
            </h2>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Get 3-5 randomized high-quality items worth over 50 for just $79. Only 100 boxes available per month!
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <button className="px-12 py-5 bg-anime-purple hover:bg-anime-purple/80 text-white font-black text-xl italic skew-x-[-12deg] transition-all transform hover:scale-110 active:scale-95 shadow-[0_0_30px_rgba(112,0,255,0.4)]">
              <span className="skew-x-[12deg] inline-block">CLAIM YOURS</span>
            </button>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Reveal direction="right">
              <div className="flex items-center gap-2 mb-6">
                <Ghost className="text-anime-pink w-8 h-8" />
                <span className="text-2xl font-black italic tracking-tighter">
                  AKIBA<span className="text-anime-pink">LANE</span>
                </span>
              </div>
              <p className="text-gray-500 max-w-sm mb-8">
                The premier destination for anime collectors. Founded by fans, for fans. Join our community and level up your shelf today.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full hover:border-anime-pink transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full hover:border-anime-pink transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full hover:border-anime-pink transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </Reveal>
          </div>
          
          <div>
            <Reveal delay={0.3}>
              <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-sm">Quick Links</h4>
              <ul className="space-y-4 text-gray-500 font-medium">
                <li><a href="#" className="hover:text-anime-pink transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-anime-pink transition-colors">Affiliates</a></li>
                <li><a href="#" className="hover:text-anime-pink transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-anime-pink transition-colors">Returns</a></li>
              </ul>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.5}>
              <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-sm">Community</h4>
              <ul className="space-y-4 text-gray-500 font-medium">
                <li><a href="#" className="hover:text-anime-pink transition-colors">Discord Server</a></li>
                <li><a href="#" className="hover:text-anime-pink transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-anime-pink transition-colors">Anime Blog</a></li>
                <li><a href="#" className="hover:text-anime-pink transition-colors">Events</a></li>
              </ul>
            </Reveal>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">© 2026 AKIBA LANE. Built with passion for the culture.</p>
          <div className="flex gap-6 text-gray-600 text-sm">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}