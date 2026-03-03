import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQ | Akiba Lane",
    description: "Frequently asked questions about ordering, shipping, returns, product authenticity, and support at Akiba Lane — your anime collectibles destination.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
    return children;
}
