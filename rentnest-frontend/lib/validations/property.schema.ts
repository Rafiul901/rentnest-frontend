import { z } from "zod";

export const propertySchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  price: z
    .number()
    .positive("Price must be greater than 0"),

  location: z
    .string()
    .min(2, "Location must be at least 2 characters"),

  amenities: z
    .array(z.string())
    .min(1, "Select at least one amenity"),

  available: z.boolean().optional(),

  categoryId: z
    .string()
    .min(1, "Please select a category"),
});

export type PropertyFormValues = z.infer<typeof propertySchema>;