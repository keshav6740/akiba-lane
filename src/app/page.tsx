import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductGrid from "@/components/ProductGrid";
import CustomCursor from "@/components/CustomCursor";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className="min-h-screen">
      <CustomCursor />
      <div className="parallax-bg" />
      <Navbar />

      <Hero />

      <div id="shop" className="relative z-10 bg-black">
        <div id="categories-section">
          <Categories />
        </div>

        <Marquee text="LIMITED DROP // AKIBA LANE" />

        <div id="product-grid">
          <ProductGrid />
        </div>
      </div>

      <Footer />

      <ScrollToTop />
    </main>
  );
}
