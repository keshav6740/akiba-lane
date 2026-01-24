import type { Metadata } from "next";
import { Orbitron, Bangers, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import SakuraFall from "@/components/SakuraFall";
import AnimeToast from "@/components/AnimeToast";
import CartDrawer from "@/components/CartDrawer";
import KatanaPreloader from "@/components/KatanaPreloader";
import AnimeAtmosphere from "@/components/AnimeAtmosphere";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const bangers = Bangers({
  variable: "--font-bangers",
  subsets: ["latin"],
  weight: ["400"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akiba Lane | Premium Anime Figures & Collectibles",
  description: "The ultimate destination for high-quality anime action figures, mystery boxes, and exclusive accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${bangers.variable} antialiased bg-black text-white overflow-x-hidden`}
      >
        <StoreProvider>
          <div className="noise-overlay fixed inset-0 z-[9999] pointer-events-none opacity-5 mix-blend-overlay"></div>
          <KatanaPreloader />
          <SakuraFall />
          <AnimeAtmosphere />
          <AnimeToast />
          <CartDrawer />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
