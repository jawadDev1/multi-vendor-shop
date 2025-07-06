import { z } from "zod";

export const addressSchema = z.object({
  country: z.string().min(1, "country is required."),
  city: z.string().min(1, "city is required."),
  address1: z.string().min(1, "address1 is required."),
  address2: z.string().min(1, "address2 is required."),
  zip_code: z.number().min(1, "zip code is required"),
  address_type: z.string().min(1, "address type is required."),
});

export type AddressFormData = z.infer<typeof addressSchema>;
