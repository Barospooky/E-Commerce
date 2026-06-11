import { apiRequest, type ApiResponse } from "./http";

export type AdminOrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface AdminOrderItem {
  productName: string;
  price: number;
  quantity: number;
}

export interface AdminOrder {
  id: string;
  customer: string;
  email: string;
  amount: number;
  payment: "Paid" | "COD";
  status: AdminOrderStatus;
  date: string;
  items: AdminOrderItem[];
  shippingAddress: string[];
}

export async function fetchAdminOrders(token: string) {
  return apiRequest<ApiResponse<AdminOrder[]>>("/admin/orders", {}, token);
}

export async function fetchAdminOrder(token: string, id: string) {
  return apiRequest<ApiResponse<AdminOrder>>(`/admin/orders/${id}`, {}, token);
}

export async function updateAdminOrderStatus(token: string, id: string, status: AdminOrderStatus) {
  return apiRequest<ApiResponse<AdminOrder>>(
    `/admin/orders/${id}/status`,
    {
      method: "PUT",
      body: JSON.stringify({ status })
    },
    token
  );
}
