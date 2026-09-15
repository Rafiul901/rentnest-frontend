import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createProperty,
  CreatePropertyRequest,
} from "@/services/property/property.api";

export const useCreateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (propertyData: CreatePropertyRequest) =>
      createProperty(propertyData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });

      queryClient.invalidateQueries({
        queryKey: ["landlord-properties"],
      });
    },
  });
};