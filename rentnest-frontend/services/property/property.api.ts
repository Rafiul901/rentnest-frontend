import axiosInstance from "@/lib/axios";
import { PropertyResponse } from "@/types/property";

export const getProperties = async (): Promise<PropertyResponse> => {
  const response = await axiosInstance.get<PropertyResponse>(
    "/properties"
  );

  return response.data;
};