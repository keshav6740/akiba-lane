import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductGrid from "@/components/ProductGrid";
import CustomCursor from "@/components/CustomCursor";
import CyberHUD from "@/components/CyberHUD";
import Marquee from "@/components/Marquee";
import CursorTrail from "@/components/CursorTrail";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className="min-h-screen cursor-none snap-container">
      <CustomCursor />
      <CursorTrail />
      <CyberHUD />
      <div className="parallax-bg" />
      <Navbar />
      
      <div className="snap-section">
        <Hero />
      </div>

      
      <div id="shop" className="relative z-10 bg-black">
        <div id="categories-section" className="snap-section">
          <Categories />
        </div>
        
        <Marquee text="LIMITED DROP // AKIBA LANE" />
        
        <div id="product-grid" className="snap-section">
          <ProductGrid />
        </div>
      </div>

      <Footer />

      <ScrollToTop />
    </main>
  );
}
