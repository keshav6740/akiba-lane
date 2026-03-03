import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shipping Policy | Akiba Lane",
    description: "Shipping policy for Akiba Lane — learn about processing times, delivery timelines, and tracking for your anime collectible orders across India.",
};

export default function ShippingLayout({ children }: { children: React.ReactNode }) {
    return children;
}
