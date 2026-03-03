"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-black text-white cursor-auto relative overflow-hidden">
      <div className="parallax-bg" />
      <Navbar />
      <div className="max-w-3xl mx-auto relative z-10 px-6 pt-28 pb-16">
        <h1 className="text-4xl md:text-6xl font-bangers mb-6 text-center uppercase">Returns &amp; Exchanges</h1>
        <div className="space-y-6 text-gray-300 text-sm md:text-base font-mono">
          <p>
            We carefully pack every order to ensure items arrive safely. If your item arrives damaged,
            contact us within 48 hours of delivery with clear photos and we will resolve it quickly.
          </p>
          <p>
            Returns are accepted only for damaged or incorrect items. For collectibles, we do not accept
            returns due to change of mind.
          </p>
          <p>
            If a replacement is available, we will ship it after verification. If not, we will offer a
            suitable alternative or refund, depending on availability.
          </p>
          <p>
            For return support, reach out on WhatsApp or email with your Order ID.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
