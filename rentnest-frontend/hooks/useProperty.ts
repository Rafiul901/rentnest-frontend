import { useQuery } from "@tanstack/react-query";

import { getPropertyById } from "@/services/property/property.api";

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => getPropertyById(id),
    enabled: !!id,
  });
};