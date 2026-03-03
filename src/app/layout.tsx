import type { Metadata } from "next";
import { Orbitron, Bangers, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import AnimeToast from "@/components/AnimeToast";
import CartDrawer from "@/components/CartDrawer";
import KatanaPreloader from "@/components/KatanaPreloader";
import Script from "next/script";

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

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${bangers.variable} antialiased bg-black text-white overflow-x-hidden`}
      >
        <StoreProvider>
          <KatanaPreloader />
          <AnimeToast />
          <CartDrawer />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
