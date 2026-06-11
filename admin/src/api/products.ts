import type { Product } from "../types";
import { apiRequest, type ApiResponse } from "./http";

export interface ApiProduct extends Product {
  isActive: boolean;
}

export interface AdminProductInput {
  name: string;
  slug?: string;
  category: Product["category"];
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

export async function fetchAdminProducts(token: string) {
  return apiRequest<ApiResponse<ApiProduct[]>>("/admin/products", {}, token);
}

export async function createAdminProduct(token: string, input: AdminProductInput) {
  return apiRequest<ApiResponse<ApiProduct>>(
    "/admin/products",
    {
      method: "POST",
      body: JSON.stringify(input)
    },
    token
  );
}

export async function fetchAdminProduct(token: string, id: number) {
  return apiRequest<ApiResponse<ApiProduct>>(`/admin/products/${id}`, {}, token);
}

export async function updateAdminProduct(token: string, id: number, input: Partial<AdminProductInput>) {
  return apiRequest<ApiResponse<ApiProduct>>(
    `/admin/products/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(input)
    },
    token
  );
}

export async function deleteAdminProduct(token: string, id: number) {
  return apiRequest<ApiResponse<null>>(
    `/admin/products/${id}`,
    {
      method: "DELETE"
    },
    token
  );
}
