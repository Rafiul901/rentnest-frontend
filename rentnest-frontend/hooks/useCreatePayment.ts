import { useMutation } from "@tanstack/react-query";
import {
  createPayment,
  CreatePaymentRequest,
} from "@/services/payment/payment.api";

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: (paymentData: CreatePaymentRequest) =>
      createPayment(paymentData),
  });
};