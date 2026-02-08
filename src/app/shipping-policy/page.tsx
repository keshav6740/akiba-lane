"use client";

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16 cursor-auto relative overflow-hidden">
      <div className="parallax-bg" />
      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-6xl font-bangers mb-6 text-center uppercase">Shipping Policy</h1>
        <div className="space-y-6 text-gray-300 text-sm md:text-base font-mono">
          <p>
            We ship across India. Orders are typically processed within 1-2 business days.
            Shipping timelines depend on your location and courier availability.
          </p>
          <p>
            Once shipped, you will receive a tracking update via WhatsApp or email.
            Delivery usually takes 3-7 business days for metro cities and 5-10 business days for other locations.
          </p>
          <p>
            Please ensure your address and contact number are accurate to avoid delivery delays.
            If a package is returned due to an incorrect address, re-shipping charges may apply.
          </p>
          <p>
            For any questions, contact us and we will help you immediately.
          </p>
        </div>
      </div>
    </main>
  );
}
