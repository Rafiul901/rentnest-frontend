import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRentalRequestStatus } from "@/services/landlord/rental.api";
import { UpdateRentalStatusRequest } from "@/types/landlord-rental";

export const useUpdateRentalStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      rentalRequestId,
      data,
    }: {
      rentalRequestId: string;
      data: UpdateRentalStatusRequest;
    }) => updateRentalRequestStatus(rentalRequestId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["landlord-rental-requests"],
      });
    },
  });
};