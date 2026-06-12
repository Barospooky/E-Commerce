import type { Product } from "../types";

export const recentOrders = [
  { id: "#ORD-1256", date: "May 18, 2024", items: 4, total: 1760, status: "Delivered" },
  { id: "#ORD-1255", date: "May 16, 2024", items: 3, total: 2340, status: "Shipped" },
  { id: "#ORD-1254", date: "May 12, 2024", items: 2, total: 1990, status: "Delivered" },
  { id: "#ORD-1253", date: "May 10, 2024", items: 1, total: 1530, status: "Cancelled" }
];

export const accountProfile = {
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+91 98765 43210",
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80"
};

export const accountHighlights = [
  { label: "Total Orders", value: "12" },
  { label: "Wishlist Items", value: "8" },
  { label: "Addresses", value: "3" },
  { label: "Account Status", value: "Active" }
];

export const wishlistSeed: Product[] = [
  {
    id: 201,
    name: "Organic Almonds",
    slug: "organic-almonds",
    category: "pantry",
    price: 730,
    mrp: 810,
    unit: "500 g",
    rating: 4.8,
    stock: 18,
    badge: "Nutritious",
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=900&q=80",
    color: "#a66a3f",
    description: "Crunchy natural almonds with no additives.",
    tags: ["Protein rich", "Snack", "Natural"]
  },
  {
    id: 202,
    name: "Organic Green Tea",
    slug: "organic-green-tea",
    category: "pantry",
    price: 320,
    mrp: 390,
    unit: "25 bags",
    rating: 4.7,
    stock: 30,
    badge: "Calming",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=900&q=80",
    color: "#4b8f52",
    description: "Smooth green tea with a fresh, clean finish.",
    tags: ["Detox", "Tea", "Antioxidants"]
  },
  {
    id: 203,
    name: "Organic Honey",
    slug: "organic-honey",
    category: "pantry",
    price: 675,
    mrp: 740,
    unit: "500 g",
    rating: 4.9,
    stock: 22,
    badge: "Raw",
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=900&q=80",
    color: "#d89d3d",
    description: "Golden raw honey sourced from small farms.",
    tags: ["Natural", "Sweetener", "Immunity"]
  },
  {
    id: 204,
    name: "Organic Milk",
    slug: "organic-milk",
    category: "pantry",
    price: 425,
    mrp: 455,
    unit: "1 L",
    rating: 4.6,
    stock: 15,
    badge: "Daily fresh",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=80",
    color: "#e2e4df",
    description: "Creamy organic milk from grass-fed cattle.",
    tags: ["Fresh", "Dairy", "Calcium"]
  }
];
