"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQItem = {
    question: string;
    answer: string;
};

const faqSections: { title: string; items: FAQItem[] }[] = [
    {
        title: "Orders & Checkout",
        items: [
            {
                question: "How do I place an order?",
                answer:
                    "Browse our collection, add items to your cart, and click 'Proceed to Checkout'. Fill in your shipping details and hit 'Send via WhatsApp'. This opens a pre-filled WhatsApp message to our team — once you send it, your order is confirmed and we'll follow up with payment details.",
            },
            {
                question: "What payment methods do you accept?",
                answer:
                    "We accept UPI (GPay, PhonePe, Paytm), bank transfers (NEFT/IMPS), and Cash on Delivery (COD) for select pin codes. Payment details are shared via WhatsApp after you place your order.",
            },
            {
                question: "Can I modify or cancel my order after placing it?",
                answer:
                    "Yes — as long as the order hasn't been shipped yet. Simply message us on WhatsApp and we'll update or cancel it for you. Once shipped, cancellations are not possible but you can initiate a return.",
            },
            {
                question: "Is there a minimum order value?",
                answer:
                    "No minimum order value. You can order a single figure or stock up your entire shelf — we ship it all the same.",
            },
        ],
    },
    {
        title: "Shipping & Delivery",
        items: [
            {
                question: "Where do you ship to?",
                answer:
                    "We currently ship across India. International shipping is not available yet, but we're working on it. Stay tuned to our Instagram for updates.",
            },
            {
                question: "How long does delivery take?",
                answer:
                    "Orders are processed within 1-2 business days. Delivery typically takes 3-7 days for metro cities and 5-10 days for other locations, depending on your pin code and courier availability.",
            },
            {
                question: "How do I track my order?",
                answer:
                    "Once your order is shipped, we'll send you a tracking link via WhatsApp. You can use this to check real-time delivery status with the courier partner.",
            },
            {
                question: "What if my order is delayed?",
                answer:
                    "Occasional delays can happen due to courier issues or high demand during sales. If your order hasn't arrived within the estimated timeframe, message us on WhatsApp and we'll look into it immediately.",
            },
        ],
    },
    {
        title: "Products & Quality",
        items: [
            {
                question: "Are all figures original and authentic?",
                answer:
                    "We source from verified distributors and manufacturers. Every figure listed on Akiba Lane is either an officially licensed product or a clearly labeled high-quality collectible. We stand behind the authenticity of our stock.",
            },
            {
                question: "What does the rarity tag (SR, SSR, UR) mean?",
                answer:
                    "SR (Super Rare) are popular figures in regular production. SSR (Super Super Rare) are limited-run or hard-to-find figures. UR (Ultra Rare) are highly limited, exclusive, or discontinued pieces that are the crown jewels of any collection.",
            },
            {
                question: "What is the Mystery Box?",
                answer:
                    "The Mystery Box is a surprise figure pack where you receive a random figure from our curated selection. Each box is guaranteed to contain at minimum an SR-rated figure, with a chance for SSR or even UR pulls. It's the gacha experience, but for your shelf.",
            },
            {
                question: "Will the figure look exactly like the product image?",
                answer:
                    "Product images are accurate representations. Minor variations in paint application or packaging can occur between production batches, which is normal for collectible figures. If you receive a significantly different item, contact us for a resolution.",
            },
        ],
    },
    {
        title: "Returns & Exchanges",
        items: [
            {
                question: "What is your return policy?",
                answer:
                    "We accept returns within 7 days of delivery for damaged or incorrect items. The figure must be unused, in its original packaging, and in the same condition you received it. Contact us on WhatsApp with photos of the issue to initiate a return.",
            },
            {
                question: "What if I receive a damaged figure?",
                answer:
                    "Take clear photos of the damage (including the packaging) and send them to us via WhatsApp within 48 hours of delivery. We'll arrange a replacement or full refund — no questions asked.",
            },
            {
                question: "Can I exchange a figure for a different one?",
                answer:
                    "Exchanges are possible if the item is in original, unopened condition. Reach out on WhatsApp within 7 days of delivery. Exchange is subject to stock availability of the requested item.",
            },
            {
                question: "Are Mystery Box purchases refundable?",
                answer:
                    "Mystery Boxes are non-refundable since the contents are randomized. However, if the box arrives damaged or empty, we will absolutely replace it.",
            },
        ],
    },
    {
        title: "Account & Support",
        items: [
            {
                question: "Do I need an account to order?",
                answer:
                    "No — Akiba Lane runs on a WhatsApp-based ordering system, so there's no account creation needed. Just add items to your cart, fill in your details, and you're good to go.",
            },
            {
                question: "How can I contact support?",
                answer:
                    "The fastest way is via WhatsApp — tap the ghost icon in the navigation bar or click 'Contact' in the menu. You can also email us at admin@akibastore.com. We typically respond within a few hours during business hours.",
            },
            {
                question: "Do you restock sold-out figures?",
                answer:
                    "Popular figures are restocked when possible, but many collectibles are limited production runs. Follow us on Instagram @akibalane.official to get notified about restocks and new arrivals.",
            },
            {
                question: "Can I request a specific figure?",
                answer:
                    "Absolutely. Message us on WhatsApp with the figure you're looking for and we'll check our sourcing network. If we can find it, we'll add it to the store or arrange a direct order for you.",
            },
        ],
    },
];

function FAQAccordion({ item }: { item: FAQItem }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-white/10 bg-white/[0.02] overflow-hidden">
            <button
                onClick={() => setOpen((v) => !v)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/5 transition-colors"
            >
                <span className="font-bold text-sm md:text-base text-white">{item.question}</span>
                <ChevronDown
                    className={`w-5 h-5 text-anime-pink shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
            </button>
            <div
                className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
                <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-gray-400 text-sm font-mono leading-relaxed">
                        {item.answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-black text-white cursor-auto relative overflow-hidden">
            <div className="parallax-bg" />
            <Navbar />
            <div className="max-w-3xl mx-auto relative z-10 px-4 md:px-6 pt-24 md:pt-28 pb-16">
                <div className="mb-8 md:mb-12">
                    <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-anime-pink mb-2">KNOWLEDGE BASE</p>
                    <h1 className="text-4xl md:text-6xl font-bangers uppercase text-white">
                        Frequently Asked{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-anime-pink to-anime-purple">
                            Questions
                        </span>
                    </h1>
                    <div className="h-[2px] w-20 bg-gradient-to-r from-anime-pink to-transparent mt-4" />
                </div>

                <div className="space-y-10">
                    {faqSections.map((section) => (
                        <div key={section.title}>
                            <h2 className="text-lg md:text-xl font-bangers text-anime-cyan uppercase tracking-wider mb-4 flex items-center gap-3">
                                <span className="h-[2px] w-6 bg-anime-cyan" />
                                {section.title}
                            </h2>
                            <div className="space-y-2">
                                {section.items.map((item) => (
                                    <FAQAccordion key={item.question} item={item} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-6 border border-white/10 bg-white/[0.02] text-center">
                    <p className="text-gray-400 font-mono text-sm mb-3">Still have questions?</p>
                    <a
                        href="https://wa.me/919426340289"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 bg-anime-pink text-white font-bold text-sm hover:bg-white hover:text-black transition-colors"
                    >
                        Message us on WhatsApp
                    </a>
                </div>
            </div>
            <Footer />
        </main>
    );
}
