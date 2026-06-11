import { apiRequest, type ApiResponse } from "./http";

export interface AdminCustomer {
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  status: "Active" | "Inactive";
}

export async function fetchAdminCustomers(token: string) {
  return apiRequest<ApiResponse<AdminCustomer[]>>("/admin/customers", {}, token);
}

export async function updateAdminCustomerStatus(token: string, email: string, status: AdminCustomer["status"]) {
  return apiRequest<ApiResponse<AdminCustomer>>(
    `/admin/customers/${encodeURIComponent(email)}/status`,
    {
      method: "PUT",
      body: JSON.stringify({ status })
    },
    token
  );
}
