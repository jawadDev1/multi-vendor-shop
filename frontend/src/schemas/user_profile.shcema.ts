import { z } from "zod";

export const userProfileSchema = z.object({
  name: z.string().min(3, "name must be atleast 3 characters"),
  email: z.string().email(),
  contact: z.number().min(11, "enter a valid number"),
  zip_code: z.number().min(11, "enter a valid number"),
  address1: z.string().min(1, "address is required"),
  address2: z.string().optional(),
  profile: z
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
    )
    .optional(),
});

export type UserProfileData = z.infer<typeof userProfileSchema>;
