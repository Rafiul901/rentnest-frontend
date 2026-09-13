import { z } from "zod";

export const rentalSchema = z.object({
  moveInDate: z.string().optional(),
  message: z.string().optional(),
});

export type RentalFormValues = z.infer<typeof rentalSchema>;