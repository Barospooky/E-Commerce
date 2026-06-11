import { apiRequest, type ApiResponse } from "./http";

export interface AdminCoupon {
  code: string;
  discount: string;
  minOrder: number;
  usageCurrent: number;
  usageLimit: number;
  validUntil: string;
  status: "Active" | "Inactive";
}

export async function fetchAdminCoupons(token: string) {
  return apiRequest<ApiResponse<AdminCoupon[]>>("/admin/coupons", {}, token);
}

export async function createAdminCoupon(token: string, input: Omit<AdminCoupon, "code"> & { code?: string }) {
  return apiRequest<ApiResponse<AdminCoupon>>(
    "/admin/coupons",
    {
      method: "POST",
      body: JSON.stringify(input)
    },
    token
  );
}

export async function updateAdminCoupon(token: string, code: string, input: Partial<Omit<AdminCoupon, "code">>) {
  return apiRequest<ApiResponse<AdminCoupon>>(
    `/admin/coupons/${encodeURIComponent(code)}`,
    {
      method: "PUT",
      body: JSON.stringify(input)
    },
    token
  );
}

export async function deleteAdminCoupon(token: string, code: string) {
  return apiRequest<ApiResponse<null>>(
    `/admin/coupons/${encodeURIComponent(code)}`,
    {
      method: "DELETE"
    },
    token
  );
}
