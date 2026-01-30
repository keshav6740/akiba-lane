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
