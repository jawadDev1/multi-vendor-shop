import { IUser } from "#types/models.js";
import { model, Schema } from "mongoose";

const userSchema = new Schema<IUser>(
  {
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
      enum: ["USER", "SELLER"],
      default: "USER",
    },
    addresses: [
      {
        country: {
          type: String,
          default: null,
        },
        city: {
          type: String,
          default: null,
        },
        address1: {
          type: String,
          default: null,
        },
        address2: {
          type: String,
          default: null,
        },
        address_type: {
          type: String,
          default: null,
        },
        zip_code: {
          type: Number,
          default: null,
        },
      },
    ],
    contact: {
      type: Number,
      default: null,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    reset_password_token: {
      type: String,
      default: null,
    },
    reset_password_time: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const UserModel = model<IUser>("users", userSchema);

export { UserModel };
