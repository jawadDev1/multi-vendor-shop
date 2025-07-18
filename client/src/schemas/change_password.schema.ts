import { z } from "zod";

export const changePasswordSchema = z
  .object({
    old_password: z.string().min(1, "old password is required"),
    new_password: z.string().min(1, "new password is required"),
    confirm_password: z.string().min(1, "confirm password is required"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "password does not match",
    path: ["confirm_password"],
  });

export type ChanngePasswordFormData = z.infer<typeof changePasswordSchema>;
