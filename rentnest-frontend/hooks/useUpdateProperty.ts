import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateProperty,
  UpdatePropertyRequest,
} from "@/services/property/property.api";

interface UpdatePropertyVariables {
  propertyId: string;
  data: UpdatePropertyRequest;
}

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ propertyId, data }: UpdatePropertyVariables) =>
      updateProperty(propertyId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["landlord-properties"] });
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      queryClient.invalidateQueries({ queryKey: ["property", variables.propertyId] });
    },
  });
};