import axiosInstance from "@/lib/axios";
import {
  LandlordRentalRequestResponse,
  UpdateRentalStatusRequest,
  UpdateRentalStatusResponse,
} from "@/types/landlord-rental";

export const getLandlordRentalRequests =
  async (): Promise<LandlordRentalRequestResponse> => {
    const response =
      await axiosInstance.get<LandlordRentalRequestResponse>(
        "/rentals/landlord/requests"
      );

    return response.data;
  };

export const updateRentalRequestStatus = async (
  rentalRequestId: string,
  data: UpdateRentalStatusRequest
): Promise<UpdateRentalStatusResponse> => {
  const response =
    await axiosInstance.patch<UpdateRentalStatusResponse>(
      `/rentals/landlord/requests/${rentalRequestId}`,
      data
    );

  return response.data;
};