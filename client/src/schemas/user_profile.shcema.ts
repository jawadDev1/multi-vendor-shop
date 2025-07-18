import { z } from "zod";

export const userProfileSchema = z.object({
  name: z.string().min(3, "name must be atleast 3 characters"),
  email: z.string().email(),
  contact: z.number().min(11, "enter a valid number"),
});

export type UserProfileData = z.infer<typeof userProfileSchema>;
