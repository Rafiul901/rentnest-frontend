import { useQuery } from "@tanstack/react-query";
import { getLandlordRentalRequests } from "@/services/landlord/rental.api";

export const useLandlordRentalRequests = () => {
  return useQuery({
    queryKey: ["landlord-rental-requests"],
    queryFn: getLandlordRentalRequests,
  });
};