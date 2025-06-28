import { z } from "zod";

export const eventSchema = z
  .object({
    product: z.string().min(1, "product is required"),
    start_date: z
      .date()
      .min(new Date(Date.now()), "Start date must be today or in the future"),
    end_date: z.date(),
  })
  .refine((data) => data.end_date > data.start_date, {
    message: "End date must be greater then start date",
    path: ["end_date"],
  });

export type EventFormData = z.infer<typeof eventSchema>;
