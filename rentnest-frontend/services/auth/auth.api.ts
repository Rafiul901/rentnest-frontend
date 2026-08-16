import axiosInstance from "@/lib/axios";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "TENANT" | "LANDLORD";
}

export interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: LoginData) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};