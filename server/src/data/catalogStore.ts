export type ProductCategory = "vegetables" | "fruits" | "grains" | "pantry";

export interface CatalogProduct {
  id: number;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  mrp: number;
  unit: string;
  rating: number;
  stock: number;
  badge: string;
  image: string;
  color: string;
  description: string;
  tags: string[];
  isActive: boolean;
}

export interface CatalogCategory {
  id: ProductCategory | "all";
  label: string;
}

const seedProducts: CatalogProduct[] = [
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
    tags: ["No wax", "Local farm", "Vitamin rich"],
    isActive: true
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
    tags: ["Cold pressed", "Single origin", "Chemical free"],
    isActive: true
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
    tags: ["High fiber", "Unpolished", "Slow carb"],
    isActive: true
  }
];

const seedCategories: CatalogCategory[] = [
  { id: "all", label: "All harvest" },
  { id: "vegetables", label: "Vegetables" },
  { id: "fruits", label: "Fruits" },
  { id: "grains", label: "Grains" },
  { id: "pantry", label: "Pantry" }
];

const products = [...seedProducts];
const categories = [...seedCategories];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function nextProductId() {
  return products.reduce((max, product) => Math.max(max, product.id), 0) + 1;
}

export function listProducts() {
  return [...products];
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: number) {
  return products.find((product) => product.id === id);
}

export function createProduct(input: Omit<CatalogProduct, "id" | "slug"> & { slug?: string }) {
  const product: CatalogProduct = {
    ...input,
    id: nextProductId(),
    slug: input.slug?.trim() || slugify(input.name)
  };

  products.unshift(product);
  return product;
}

export function updateProduct(id: number, input: Partial<Omit<CatalogProduct, "id">>) {
  const index = products.findIndex((product) => product.id === id);

  if (index < 0) {
    return null;
  }

  const current = products[index];
  const updated: CatalogProduct = {
    ...current,
    ...input,
    slug: input.slug?.trim() || (input.name ? slugify(input.name) : current.slug)
  };

  products[index] = updated;
  return updated;
}

export function removeProduct(id: number) {
  const index = products.findIndex((product) => product.id === id);

  if (index < 0) {
    return false;
  }

  products.splice(index, 1);
  return true;
}

export function listCategories() {
  return [...categories];
}

export function ensureCategory(label: string) {
  const slug = slugify(label) as ProductCategory;
  const existing = categories.find((category) => category.id === slug);

  if (existing) {
    return existing;
  }

  const category = { id: slug, label };
  categories.splice(categories.length, 0, category);
  return category;
}
