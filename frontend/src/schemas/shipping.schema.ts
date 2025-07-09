import { z } from "zod";

export const shippingSchema = z.object({
  name: z.string().min(3, "name is required."),
  email: z.string().email(),
  country: z.string().min(1, "country is required."),
  city: z.string().min(1, "city is required."),
  address1: z.string().min(1, "address1 is required."),
  address2: z.string().min(1, "address2 is required."),
  zip_code: z.number().min(1, "zip code is required"),
  contact: z.number().min(11, "enter a valid contact"),
});

export type ShippingFormData = z.infer<typeof shippingSchema>;
