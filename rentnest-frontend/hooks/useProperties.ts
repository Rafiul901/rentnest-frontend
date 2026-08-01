import { useQuery } from "@tanstack/react-query";
import { getProperties } from "@/services/property/property.api";

export const useProperties = () => {
  return useQuery({
    queryKey: ["properties"],
    queryFn: getProperties,
  });
};