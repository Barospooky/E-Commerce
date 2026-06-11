export type ProductCategory = "vegetables" | "fruits" | "grains" | "pantry";

export interface Product {
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
}

export interface CartLine {
  product: Product;
  quantity: number;
}
