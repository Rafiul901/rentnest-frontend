import { useQuery } from "@tanstack/react-query";
import {
  getProperties,
  PropertyFilters,
} from "@/services/property/property.api";

export const useProperties = (filters?: PropertyFilters) => {
  return useQuery({
    queryKey: ["properties", filters],
    queryFn: () => getProperties(filters),
  });
};