import { IUser } from "#types/models.js";
import { model, Schema } from "mongoose";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: [8, "password must be atleast 8 characters long"],
  },
  profile: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["USER"],
    default: "USER",
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const UserModel = model<IUser>("users", userSchema);

export { UserModel };
