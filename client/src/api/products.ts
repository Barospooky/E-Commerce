import type { Product } from "../types";
import { apiRequest, type ApiResponse } from "./http";

export interface ApiProduct extends Product {
  isActive: boolean;
}

export interface CategoryItem {
  id: "all" | Product["category"];
  label: string;
}

export async function fetchProducts(params?: { category?: string; q?: string }) {
  const search = new URLSearchParams();

  if (params?.category) {
    search.set("category", params.category);
  }

  if (params?.q) {
    search.set("q", params.q);
  }

  const query = search.toString();
  return apiRequest<ApiResponse<ApiProduct[]>>(`/products${query ? `?${query}` : ""}`);
}

export async function fetchProduct(slug: string) {
  return apiRequest<ApiResponse<ApiProduct>>(`/products/${slug}`);
}

export async function fetchCategories() {
  return apiRequest<ApiResponse<CategoryItem[]>>("/products/categories");
}
