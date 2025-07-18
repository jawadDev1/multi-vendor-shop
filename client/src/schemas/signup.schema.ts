import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(4, "name must be atleast 4 characters long")
    .max(255, "name cannot be longer the 255"),
  email: z.string().email(),
  password: z.string().min(8, "password must be at least 8 characters"),
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
    ),
});

export type SignupFormData = z.infer<typeof signupSchema>;
