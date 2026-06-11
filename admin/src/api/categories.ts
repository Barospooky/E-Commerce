import { apiRequest, type ApiResponse } from "./http";

export interface AdminCategory {
  id: number;
  category: string;
  description: string;
  products: number;
  status: "Active" | "Inactive";
}

export async function fetchAdminCategories(token: string) {
  return apiRequest<ApiResponse<AdminCategory[]>>("/admin/categories", {}, token);
}

export async function createAdminCategory(
  token: string,
  input: Pick<AdminCategory, "category" | "description" | "status">
) {
  return apiRequest<ApiResponse<AdminCategory>>(
    "/admin/categories",
    {
      method: "POST",
      body: JSON.stringify(input)
    },
    token
  );
}

export async function updateAdminCategory(token: string, id: number, input: Partial<Omit<AdminCategory, "id">>) {
  return apiRequest<ApiResponse<AdminCategory>>(
    `/admin/categories/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(input)
    },
    token
  );
}

export async function deleteAdminCategory(token: string, id: number) {
  return apiRequest<ApiResponse<null>>(
    `/admin/categories/${id}`,
    {
      method: "DELETE"
    },
    token
  );
}
