import { z } from "zod";

export const reviewSchema = z.object({
  rating: z.number().min(1, "rating is required"),
  comment: z.string().min(10, "comment must be atleast 10 characters"),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
