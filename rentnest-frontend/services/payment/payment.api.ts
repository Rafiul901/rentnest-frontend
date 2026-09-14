import axiosInstance from "@/lib/axios";

import { PaymentListResponse } from "@/types/payment";

export const getMyPayments = async (): Promise<PaymentListResponse> => {
  const response = await axiosInstance.get<PaymentListResponse>(
    "/payments"
  );

  return response.data;
};

export interface CreatePaymentRequest {
  rentalRequestId: string;
  provider: "STRIPE";
}

export interface CreatePaymentResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    payment: {
      id: string;
      rentalRequestId: string;
      amount: number;
      provider: string;
      transactionId: string;
      status: string;
      paidAt: string | null;
      createdAt: string;
    };
    stripeSession: {
      id: string;
      url: string;
      paymentIntent: string | null;
    };
  };
}

export const createPayment = async (
  paymentData: CreatePaymentRequest
): Promise<CreatePaymentResponse> => {
  const response = await axiosInstance.post<CreatePaymentResponse>(
    "/payments/create",
    paymentData
  );

  return response.data;
};