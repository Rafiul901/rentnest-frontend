import axiosInstance from "@/lib/axios";
import { PropertyResponse } from "@/types/property";

export interface PropertyFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
  amenities?: string[];
}

export const getProperties = async (
  filters?: PropertyFilters
): Promise<PropertyResponse> => {

  const params: Record<string, unknown> = {};

  if (filters?.location) params.location = filters.location;
  if (filters?.minPrice != null) params.minPrice = filters.minPrice;
  if (filters?.maxPrice != null) params.maxPrice = filters.maxPrice;
  if (filters?.categoryId) params.categoryId = filters.categoryId;
  if (filters?.amenities?.length) {
    params.amenities = filters.amenities.join(",");
  }

  const response = await axiosInstance.get<PropertyResponse>(
    "/properties",
    { params }
  );

  return response.data;
};