import { Sparkles, Box, Wand2, Layers, ShoppingBag } from "lucide-react";

export type Category = {
  id: string;
  title: string;
  icon: any;
  color: string;
  bg: string;
  desc: string;
  href: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  category: string;
  image: string;
  rarity: "C" | "R" | "SR" | "SSR" | "UR";
  isNew?: boolean;
};

export const categories: Category[] = [
  {
    id: "individual",
    title: "Action Figures",
    icon: Sparkles,
    color: "border-anime-pink",
    bg: "hover:bg-anime-pink/10",
    desc: "Premium individual pieces",
    href: "#individual",
  },
  {
    id: "set",
    title: "Anime Sets",
    icon: Layers,
    color: "border-anime-cyan",
    bg: "hover:bg-anime-cyan/10",
    desc: "Complete collections",
    href: "#set",
  },
  {
    id: "myst_box",
    title: "Mystery Box",
    icon: Box,
    color: "border-anime-purple",
    bg: "hover:bg-anime-purple/10",
    desc: "Surprise Crates",
    href: "#myst_box",
  },
  {
    id: "hp",
    title: "Harry Potter",
    icon: Wand2,
    color: "border-anime-yellow",
    bg: "hover:bg-anime-yellow/10",
    desc: "Wizarding World gear",
    href: "#hp",
  },
];

// Helper to determine rarity based on price
const getRarity = (price: number): "C" | "R" | "SR" | "SSR" | "UR" => {
  if (price > 3000) return "UR";
  if (price > 1500) return "SSR";
  if (price > 800) return "SR";
  if (price > 400) return "R";
  return "C";
};

// Helper to clean filename into product name
const formatName = (filename: string) => {
  return filename
    .replace(/\.(jpg|jpeg|png)/i, "")
    .replace(/Rs\.\s*\d+.*$/i, "") // Remove price part
    .replace(/IMG-\d+-WA\d+/i, "Exclusive Item") // Handle WhatsApp image names
    .trim() || "Mystery Item";
};

// Helper to extract price
const extractPrice = (filename: string) => {
  const match = filename.match(/Rs\.?\s*(\d+)/i);
  return match ? parseInt(match[1]) : 0; // Default to 0 if no price found (Contact for price)
};

export const products: Product[] = [
  // INDIVIDUAL FIGURES
  { id: "ind-1", name: "Aanya", price: 480, currency: "Rs.", category: "individual", image: "/images/individual/Aanya Rs.480 .jpg", rarity: "R" },
  { id: "ind-2", name: "Anya Forger", price: 420, currency: "Rs.", category: "individual", image: "/images/individual/Anya Rs. 420 .jpg", rarity: "R" },
  { id: "ind-3", name: "Anya Deluxe", price: 700, currency: "Rs.", category: "individual", image: "/images/individual/Anya Rs.700 .jpg", rarity: "SR" },
  { id: "ind-4", name: "Boa Hancock", price: 750, currency: "Rs.", category: "individual", image: "/images/individual/BOA Rs. 750 .jpg", rarity: "SR" },
  { id: "ind-5", name: "Chainsaw Man", price: 700, currency: "Rs.", category: "individual", image: "/images/individual/ChainsawM Rs. 700  .jpg", rarity: "SR" },
  { id: "ind-6", name: "Chainsaw Man Premium", price: 3500, currency: "Rs.", category: "individual", image: "/images/individual/CS.M. Rs3500 .jpeg", rarity: "UR" },
  { id: "ind-7", name: "Daki", price: 1250, currency: "Rs.", category: "individual", image: "/images/individual/Daki Rs 1250 .jpg", rarity: "SR" },
  { id: "ind-8", name: "Daki Alt", price: 1300, currency: "Rs.", category: "individual", image: "/images/individual/Daki Rs. 1300 jpg.jpg", rarity: "SR" },
  { id: "ind-9", name: "Doma", price: 1350, currency: "Rs.", category: "individual", image: "/images/individual/Doma Rs. 1350 .jpg", rarity: "SR" },
  { id: "ind-10", name: "Gogeta", price: 1300, currency: "Rs.", category: "individual", image: "/images/individual/Gogeta Rs. 1300 .jpg", rarity: "SR" },
  { id: "ind-11", name: "Goku", price: 800, currency: "Rs.", category: "individual", image: "/images/individual/Goku  Rs.800 .jpg", rarity: "SR" },
  { id: "ind-12", name: "Gyomei", price: 1250, currency: "Rs.", category: "individual", image: "/images/individual/Gyomei Rs. 1250 .jpg", rarity: "SR" },
  { id: "ind-13", name: "Luffy X Sabo", price: 480, currency: "Rs.", category: "individual", image: "/images/individual/L X S Rs. 480 .jpg", rarity: "R" },
  { id: "ind-14", name: "Levi Ackerman", price: 4000, currency: "Rs.", category: "individual", image: "/images/individual/Levi Rs. 4000 .jpg", rarity: "UR" },
  { id: "ind-15", name: "Luffy Gear 4", price: 780, currency: "Rs.", category: "individual", image: "/images/individual/Luffy G4 Rs. 780 .jpg", rarity: "SR" },
  { id: "ind-16", name: "Luffy Gear 5", price: 450, currency: "Rs.", category: "individual", image: "/images/individual/Luffy G5 Rs. 450 .jpg", rarity: "R" },
  { id: "ind-17", name: "Luffy Gear 5 XL", price: 3500, currency: "Rs.", category: "individual", image: "/images/individual/Luffy G5(1) Rs. 3500 .jpg", rarity: "UR" },
  { id: "ind-18", name: "Luffy Gear 5 Mini", price: 500, currency: "Rs.", category: "individual", image: "/images/individual/Luffy G5(1) Rs.500 .jpg", rarity: "R" },
  { id: "ind-19", name: "Luffy Gear 5 Alt", price: 3500, currency: "Rs.", category: "individual", image: "/images/individual/Luffy G5(2) Rs. 3500 .jpg", rarity: "UR" },
  { id: "ind-20", name: "Luffy Gear 5 Chibi", price: 500, currency: "Rs.", category: "individual", image: "/images/individual/Luffy G5(2)Rs.500 .jpg", rarity: "R" },
  { id: "ind-21", name: "Luffy Standard", price: 1000, currency: "Rs.", category: "individual", image: "/images/individual/Luffy Rs. 1000 .jpg", rarity: "SR" },
  { id: "ind-22", name: "Luffy Action", price: 750, currency: "Rs.", category: "individual", image: "/images/individual/Luffy Rs. 750 .jpg", rarity: "SR" },
  { id: "ind-23", name: "Muzan", price: 1500, currency: "Rs.", category: "individual", image: "/images/individual/Muzan Rs. 1500 .jpg", rarity: "SSR" },
  { id: "ind-24", name: "Nami", price: 950, currency: "Rs.", category: "individual", image: "/images/individual/Nami Rs. 950 .jpg", rarity: "SR" },
  { id: "ind-25", name: "Naruto", price: 1000, currency: "Rs.", category: "individual", image: "/images/individual/Naruto Rs. 1000 .jpg", rarity: "SR" },
  { id: "ind-26", name: "Nezuko", price: 800, currency: "Rs.", category: "individual", image: "/images/individual/Nezuko Rs. 800 .jpg", rarity: "SR" },
  { id: "ind-27", name: "One Piece Set", price: 2000, currency: "Rs.", category: "individual", image: "/images/individual/OP Set Rs. 2000 .jpg", rarity: "SSR" },
  { id: "ind-28", name: "Pikachu Special", price: 5500, currency: "Rs.", category: "individual", image: "/images/individual/Pika Rs. 5500 .jpg", rarity: "UR" },
  { id: "ind-29", name: "Sanemi", price: 1250, currency: "Rs.", category: "individual", image: "/images/individual/Sanemi Rs. 1250 .jpg", rarity: "SR" },
  { id: "ind-30", name: "Sanji Premium", price: 2800, currency: "Rs.", category: "individual", image: "/images/individual/Sanji Rs. 2800 .jpg", rarity: "SSR" },
  { id: "ind-31", name: "Sanji", price: 700, currency: "Rs.", category: "individual", image: "/images/individual/Sanji Rs. 700 .jpg", rarity: "SR" },
  { id: "ind-32", name: "Sanji Alt", price: 800, currency: "Rs.", category: "individual", image: "/images/individual/Sanji Rs. 800 .jpg", rarity: "SR" },
  { id: "ind-33", name: "Shanks", price: 2500, currency: "Rs.", category: "individual", image: "/images/individual/Shanks Rs. 2500 .jpg", rarity: "SSR" },
  { id: "ind-34", name: "Spiderman", price: 3600, currency: "Rs.", category: "individual", image: "/images/individual/Spidey Rs. 3600 .jpg", rarity: "UR" },
  { id: "ind-35", name: "Tanjiro", price: 900, currency: "Rs.", category: "individual", image: "/images/individual/Tanjiro Rs..900 .jpg", rarity: "SR" },
  { id: "ind-36", name: "Tanjiro Alt", price: 750, currency: "Rs.", category: "individual", image: "/images/individual/Tanjiro Rs.750 .jpg", rarity: "R" },
  { id: "ind-37", name: "Tengen Uzui", price: 1450, currency: "Rs.", category: "individual", image: "/images/individual/Tengen Rs. 1450 .jpg", rarity: "SR" },
  { id: "ind-38", name: "Yoriichi Tsugikuni", price: 1350, currency: "Rs.", category: "individual", image: "/images/individual/Tsugikuni Rs.1350 .jpg", rarity: "SR" },
  { id: "ind-39", name: "Mitsuri & Obanai", price: 2050, currency: "Rs.", category: "individual", image: "/images/individual/VishMita Rs. 2050 .jpg", rarity: "SSR" },
  { id: "ind-40", name: "Zenitsu", price: 500, currency: "Rs.", category: "individual", image: "/images/individual/Zenitsu Rs. 500 .jpg", rarity: "R" },
  { id: "ind-41", name: "Zenitsu Alt", price: 700, currency: "Rs.", category: "individual", image: "/images/individual/Zenitsu Rs. 700 .jpg", rarity: "SR" },
  { id: "ind-42", name: "Zoro Premium", price: 4000, currency: "Rs.", category: "individual", image: "/images/individual/Zoro Rs. 4000 .jpg", rarity: "UR" },
  { id: "ind-43", name: "Zoro", price: 750, currency: "Rs.", category: "individual", image: "/images/individual/Zoro Rs. 750 .jpg", rarity: "SR" },
  { id: "ind-44", name: "Zoro Alt", price: 850, currency: "Rs.", category: "individual", image: "/images/individual/Zoro Rs. 850 .jpg", rarity: "SR" },
  { id: "ind-45", name: "Zoro Special", price: 950, currency: "Rs.", category: "individual", image: "/images/individual/Zoro Rs. 950 .jpg", rarity: "SR" },
  // Adding uncategorized images as 'New Arrivals' with placeholder pricing if needed
  { id: "ind-new-1", name: "New Figure Arrival", price: 0, currency: "Rs.", category: "individual", image: "/images/individual/IMG-20260123-WA0041.jpg", rarity: "C" },
  { id: "ind-new-2", name: "Limited Edition Drop", price: 0, currency: "Rs.", category: "individual", image: "/images/individual/IMG-20260123-WA0056.jpg", rarity: "C" },

  // SETS
  { id: "set-1", name: "Badge Set", price: 150, currency: "Rs.", category: "set", image: "/images/set/Rs. 150 each .jpg", rarity: "C" },
  { id: "set-2", name: "Sticker Pack", price: 165, currency: "Rs.", category: "set", image: "/images/set/Rs. 165 each .jpg", rarity: "C" },
  { id: "set-3", name: "Card Set", price: 175, currency: "Rs.", category: "set", image: "/images/set/Rs. 175 each .jpg", rarity: "C" },
  { id: "set-4", name: "Premium Set", price: 210, currency: "Rs.", category: "set", image: "/images/set/Rs. 210 each .jpg", rarity: "R" },
  { id: "set-5", name: "Collectors Set", price: 250, currency: "Rs.", category: "set", image: "/images/set/Rs. 250 each .jpg", rarity: "R" },
  { id: "set-new-1", name: "Exclusive Set 1", price: 0, currency: "Rs.", category: "set", image: "/images/set/IMG-20260119-WA0033.jpg", rarity: "C" },
  { id: "set-new-2", name: "Exclusive Set 2", price: 0, currency: "Rs.", category: "set", image: "/images/set/IMG-20260119-WA0037.jpg", rarity: "C" },
  
  // HARRY POTTER
  { id: "hp-1", name: "HP Artifact 1", price: 0, currency: "Rs.", category: "hp", image: "/images/hp/IMG-20260123-WA0133.jpg", rarity: "R" },
  { id: "hp-2", name: "HP Artifact 2", price: 0, currency: "Rs.", category: "hp", image: "/images/hp/IMG-20260123-WA0134.jpg", rarity: "R" },
  { id: "hp-3", name: "HP Artifact 3", price: 0, currency: "Rs.", category: "hp", image: "/images/hp/IMG-20260123-WA0136.jpg", rarity: "R" },
  { id: "hp-4", name: "HP Artifact 4", price: 0, currency: "Rs.", category: "hp", image: "/images/hp/IMG-20260123-WA0137.jpg", rarity: "R" },
  { id: "hp-5", name: "HP Artifact 5", price: 0, currency: "Rs.", category: "hp", image: "/images/hp/IMG-20260123-WA0138.jpg", rarity: "R" },
  { id: "hp-6", name: "HP Artifact 6", price: 0, currency: "Rs.", category: "hp", image: "/images/hp/IMG-20260123-WA0139.jpg", rarity: "R" },
  { id: "hp-7", name: "HP Artifact 7", price: 0, currency: "Rs.", category: "hp", image: "/images/hp/IMG-20260123-WA0140.jpg", rarity: "R" },

  // MYSTERY BOX (Using placeholders if directory is empty or use logic)
  { id: "myst-1", name: "Bronze Tier Box", price: 999, currency: "Rs.", category: "myst_box", image: "/images/individual/OP Set Rs. 2000 .jpg", rarity: "R" },
  { id: "myst-2", name: "Silver Tier Box", price: 1999, currency: "Rs.", category: "myst_box", image: "/images/individual/CS.M. Rs3500 .jpeg", rarity: "SR" },
  { id: "myst-3", name: "Gold Tier Box", price: 4999, currency: "Rs.", category: "myst_box", image: "/images/individual/Pika Rs. 5500 .jpg", rarity: "UR" },
];
