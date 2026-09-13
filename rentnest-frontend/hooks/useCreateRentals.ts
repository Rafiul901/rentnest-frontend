import { useMutation } from "@tanstack/react-query";

import {
  createRentalRequest,
  CreateRentalRequest,
} from "@/services/rental/rental.api";

export const useCreateRental = () => {
  return useMutation({
    mutationFn: (rentalData: CreateRentalRequest) =>
      createRentalRequest(rentalData),
  });
};

