import { useQuery } from "@tanstack/react-query";

import { getMyRentals } from "@/services/rental/rental.api";

export const useRentals = () => {
  return useQuery({
    queryKey: ["my-rentals"],
    queryFn: getMyRentals,
  });
};