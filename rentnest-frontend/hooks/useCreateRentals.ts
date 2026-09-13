import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createRentalRequest,
  CreateRentalRequest,
} from "@/services/rental/rental.api";

export const useCreateRental = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rentalData: CreateRentalRequest) =>
      createRentalRequest(rentalData),
    onSuccess: () => {
      // Refresh any rental-related queries so dashboards update
      queryClient.invalidateQueries({ queryKey: ["rentals"] });
    },
  });
};