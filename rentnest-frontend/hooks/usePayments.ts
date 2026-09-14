import { useQuery } from "@tanstack/react-query";

import { getMyPayments } from "@/services/payment/payment.api";

export const usePayments = () => {
  return useQuery({
    queryKey: ["my-payments"],
    queryFn: getMyPayments,
  });
};