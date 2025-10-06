import { setAuthToken } from "./api";

const BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:5174/api";

export type UserRole = "admin" | "customer";

export async function login(
  username: string,
  password: string
): Promise<{ token: string; role: UserRole }> {
  const res = await fetch(`${BASE_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  setAuthToken(data.token);
  localStorage.setItem("auth_token", data.token);
  localStorage.setItem("auth_role", data.role);
  return data;
}

export function logout() {
  setAuthToken(null);
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_role");
}

export function bootstrapAuth() {
  const token = localStorage.getItem("auth_token");
  if (token) setAuthToken(token);
  return {
    token,
    role: (localStorage.getItem("auth_role") as UserRole) || null,
  };
}
