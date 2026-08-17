import Cookies from "js-cookie";
import { User } from "@/types/auth";

const TOKEN_KEY = "rentnest_token";
const USER_KEY = "rentnest_user";

export const saveAuth = (token: string, user: User) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  // Middleware can read cookies, but cannot read localStorage.
  Cookies.set(TOKEN_KEY, token, {
    expires: 5,
    sameSite: "lax",
  });
};

export const getToken = () => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(TOKEN_KEY);
};

export const getStoredUser = (): User | null => {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem(USER_KEY);

  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);

  Cookies.remove(TOKEN_KEY);
};