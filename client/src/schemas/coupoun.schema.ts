import { z } from "zod";

export const coupounSchema = z.object({
  name: z.string().min(3, "name must be atleat 3 characters."),
  shop: z.string().min(1, "shop is required"),
  value: z.number().min(1, "discount is required"),
  min_amount: z.number().nullable().optional(),
  max_amount: z.number().nullable().optional(),
  limit: z.number().min(1, "limit is required"),
  type: z.string().min(1, "Type is required"),
  products: z.array(z.string()).nullable().optional(),
});

export type CoupounFormData = z.infer<typeof coupounSchema>;
