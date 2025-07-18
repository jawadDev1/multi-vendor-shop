import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(4, "product name must be atleast 4 characters"),
  description: z
    .string()
    .min(20, "product description must be atleast 20 characters"),
  category: z.string().min(1, "category is required"),
  tags: z.array(z.string()).min(1, "tag is required"),
  originalPrice: z.number().min(1, "price is required"),
  discount: z.number().min(0).max(100).optional(),
  stock: z.number().min(0, "stock is required"),
});

export type ProductFormData = z.infer<typeof productSchema>;
