import { apiRequest, type ApiResponse } from "./http";

export interface AdminInventoryRow {
  id: number;
  product: string;
  sku: string;
  category: string;
  stock: number;
  reserved: number;
  available: number;
  reorder: number;
  status: "In Stock" | "Low Stock";
}

export async function fetchAdminInventory(token: string) {
  return apiRequest<ApiResponse<AdminInventoryRow[]>>("/admin/inventory", {}, token);
}

export async function updateAdminInventoryStock(token: string, id: number, stock: number) {
  return apiRequest<ApiResponse<AdminInventoryRow>>(
    `/admin/inventory/${id}/stock`,
    {
      method: "PUT",
      body: JSON.stringify({ stock })
    },
    token
  );
}
