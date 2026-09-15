import { useQuery } from "@tanstack/react-query";
import { getLandlordProperties } from "@/services/landlord/property.api";

export const useLandlordProperties = () => {
  return useQuery({
    queryKey: ["landlord-properties"],
    queryFn: getLandlordProperties,
  });
};