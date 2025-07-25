import { z } from "zod";

export const categorySchema = z.object({
  title: z.string().min(4, "title must be atleast 4 characters"),
  description: z.string().min(20, " description must be atleast 20 characters"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
