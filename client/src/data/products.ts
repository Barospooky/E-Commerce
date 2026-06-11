import type { Product } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "Heirloom Tomato Basket",
    slug: "heirloom-tomato-basket",
    category: "vegetables",
    price: 189,
    mrp: 240,
    unit: "500 g",
    rating: 4.9,
    stock: 42,
    badge: "Farm pick",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=900&q=80",
    color: "#e85d3f",
    description: "Juicy, naturally ripened tomatoes sourced from low-intervention farms.",
    tags: ["No wax", "Local farm", "Vitamin rich"]
  },
  {
    id: 2,
    name: "Cold-Pressed Groundnut Oil",
    slug: "cold-pressed-groundnut-oil",
    category: "pantry",
    price: 349,
    mrp: 420,
    unit: "1 L",
    rating: 4.8,
    stock: 18,
    badge: "Best seller",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80",
    color: "#d89d3d",
    description: "Stone-churned oil with a deep nutty profile and zero refined additives.",
    tags: ["Cold pressed", "Single origin", "Chemical free"]
  },
  {
    id: 3,
    name: "Organic Red Rice",
    slug: "organic-red-rice",
    category: "grains",
    price: 265,
    mrp: 315,
    unit: "1 kg",
    rating: 4.7,
    stock: 64,
    badge: "Ancient grain",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80",
    color: "#8f4b32",
    description: "Nutty, fiber-rich red rice grown without synthetic fertilisers.",
    tags: ["High fiber", "Unpolished", "Slow carb"]
  },
  {
    id: 4,
    name: "Banana Flower Crisps",
    slug: "banana-flower-crisps",
    category: "pantry",
    price: 149,
    mrp: 190,
    unit: "120 g",
    rating: 4.6,
    stock: 27,
    badge: "New snack",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=900&q=80",
    color: "#c99143",
    description: "Lightly salted crisps made from banana blossom and millet flour.",
    tags: ["Baked", "Gluten light", "Travel pack"]
  },
  {
    id: 5,
    name: "Mountain Avocados",
    slug: "mountain-avocados",
    category: "fruits",
    price: 299,
    mrp: 360,
    unit: "2 pcs",
    rating: 4.8,
    stock: 15,
    badge: "Limited",
    image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?auto=format&fit=crop&w=900&q=80",
    color: "#5c7f3b",
    description: "Creamy avocados harvested at eating-ready maturity windows.",
    tags: ["Good fats", "Hand sorted", "Peak ripe"]
  },
  {
    id: 6,
    name: "Forest Honey Jar",
    slug: "forest-honey-jar",
    category: "pantry",
    price: 399,
    mrp: 475,
    unit: "500 g",
    rating: 4.9,
    stock: 21,
    badge: "Raw",
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=900&q=80",
    color: "#df9d2e",
    description: "Unheated wild honey with floral notes from mixed forest blossoms.",
    tags: ["Raw", "Unfiltered", "Traceable"]
  }
];

export const categories = [
  { id: "all", label: "All harvest" },
  { id: "vegetables", label: "Vegetables" },
  { id: "fruits", label: "Fruits" },
  { id: "grains", label: "Grains" },
  { id: "pantry", label: "Pantry" }
] as const;
