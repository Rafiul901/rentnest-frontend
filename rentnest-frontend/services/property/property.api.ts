import axiosInstance from "@/lib/axios";
import { PropertyDetailResponse, PropertyResponse } from "@/types/property";

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

export const getPropertyById = async (
  id: string
): Promise<PropertyDetailResponse> => {
  const response = await axiosInstance.get<PropertyDetailResponse>(
    `/properties/${id}`
  );

  return response.data;
};

export interface CreatePropertyRequest {
  title: string;
  description: string;
  price: number;
  location: string;
  amenities: string[];
  available?: boolean;
  categoryId: string;
}

export interface CreatePropertyResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: PropertyResponse["data"][number];
}

export const createProperty = async (
  propertyData: CreatePropertyRequest
): Promise<CreatePropertyResponse> => {
  const response = await axiosInstance.post<CreatePropertyResponse>(
    "/properties",
    propertyData
  );

  return response.data;
};

export interface UpdatePropertyRequest {
  title: string;
  description: string;
  price: number;
  location: string;
  amenities: string[];
  available?: boolean;
  categoryId: string;
}

export interface UpdatePropertyResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: PropertyResponse["data"][number];
}

export const updateProperty = async (
  propertyId: string,
  propertyData: UpdatePropertyRequest
): Promise<UpdatePropertyResponse> => {
  const response = await axiosInstance.patch<UpdatePropertyResponse>(
    `/properties/${propertyId}`,
    propertyData
  );

  return response.data;
};

export interface DeletePropertyResponse {
  statusCode: number;
  success: boolean;
  message: string;
}

export const deleteProperty = async (
  propertyId: string
): Promise<DeletePropertyResponse> => {
  const response = await axiosInstance.delete<DeletePropertyResponse>(
    `/properties/${propertyId}`
  );

  return response.data;
};


