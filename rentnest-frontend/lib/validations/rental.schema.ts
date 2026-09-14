import { z } from "zod";

export const rentalSchema = z.object({
  moveInDate: z.string().optional(),
  message: z
    .string()
    .max(500, "Message cannot exceed 500 characters")
    .optional(),
});

export type RentalFormValues = z.infer<typeof rentalSchema>;