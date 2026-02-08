"use client";

import { useStore } from "@/context/StoreContext";
import ProductGrid from "@/components/ProductGrid";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import CursorTrail from "@/components/CursorTrail";
import CyberHUD from "@/components/CyberHUD";
import { products } from "@/lib/products";
import { useMemo } from "react";

export default function WishlistPage() {
    const { wishlist } = useStore();

    const wishlistedProducts = useMemo(() => {
        return products.filter(p => wishlist.includes(p.id));
    }, [wishlist]);

    return (
        <main className="min-h-screen">
            <CustomCursor />
            <CursorTrail />
            <CyberHUD />
            <div className="parallax-bg" />
            <Navbar />
            <div className="pt-24">
                <h1 className="text-4xl md:text-6xl font-bangers text-white mb-8 text-center uppercase drop-shadow-[0_0_25px_rgba(255,183,197,0.35)]">Wishlist</h1>
                <ProductGrid productsToShow={wishlistedProducts} />
            </div>
        </main>
    );
}
