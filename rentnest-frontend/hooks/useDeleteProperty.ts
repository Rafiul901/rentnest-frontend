import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProperty } from "@/services/property/property.api";

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (propertyId: string) => deleteProperty(propertyId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["landlord-properties"],
      });

      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });
    },
  });
};