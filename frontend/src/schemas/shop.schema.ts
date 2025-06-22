import { z } from "zod";

export const shopSchema = z.object({
  shop_name: z.string().min(3, "shop name must be atleast 3 characters"),
  contact: z.number().min(11, "enter a valid number"),
  zip_code: z.number().min(11, "enter a valid number"),
  address: z.string().min(1, "address is required"),
  logo: z
    .instanceof(File)
    .refine(
      (file) =>
        [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/svg+xml",
          "image/gif",
        ].includes(file.type),
      { message: "Invalid image file type" }
    ),
});

export type ShopSchemaData = z.infer<typeof shopSchema>;
