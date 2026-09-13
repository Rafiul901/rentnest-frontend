import axiosInstance from "@/lib/axios";

export interface CreateRentalRequest {
  propertyId: string;
  moveInDate?: string;
  message?: string;
}

export interface RentalResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    id: string;
    tenantId: string;
    propertyId: string;
    status: string;
    moveInDate: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const createRentalRequest = async (
  rentalData: CreateRentalRequest
): Promise<RentalResponse> => {
  const response = await axiosInstance.post<RentalResponse>(
    "/rentals",
    rentalData
  );

  return response.data;
};