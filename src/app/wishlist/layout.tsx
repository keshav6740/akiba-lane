import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Wishlist | Akiba Lane",
    description: "Your saved anime figures and collectibles — browse and manage your wishlist on Akiba Lane.",
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
    return children;
}
