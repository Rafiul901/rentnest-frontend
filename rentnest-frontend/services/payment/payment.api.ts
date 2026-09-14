import axiosInstance from "@/lib/axios";

import { PaymentListResponse } from "@/types/payment";

export const getMyPayments = async (): Promise<PaymentListResponse> => {
  const response = await axiosInstance.get<PaymentListResponse>(
    "/payments"
  );

  return response.data;
};