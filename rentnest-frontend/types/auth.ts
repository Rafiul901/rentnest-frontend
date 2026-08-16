export type UserRole = "TENANT" | "LANDLORD" | "ADMIN";

export type UserStatus = "ACTIVE" | "BANNED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}