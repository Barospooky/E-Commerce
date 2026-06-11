import { apiRequest, type ApiResponse } from "./http";

export interface AuthUser {
  email: string;
  role: "ADMIN" | "CUSTOMER";
}

export async function login(email: string, password: string) {
  return apiRequest<ApiResponse<{ accessToken: string; user: AuthUser }>>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
}
