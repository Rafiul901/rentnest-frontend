export type UserRole = "TENANT" | "LANDLORD" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  success?: boolean;
  message?: string;
  data?: {
    user: User;
    token: string;
  };
  token?: string;
  user?: User;
}