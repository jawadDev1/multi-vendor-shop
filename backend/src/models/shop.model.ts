import { IShop } from "#types/models.js";
import mongoose, { model, Schema } from "mongoose";

const shopSchema = new Schema<IShop>(
  {
    shop_name: {
      type: String,
      default: null,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    about: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    zip_code: {
      type: Number,
      required: [true, "zip code is required"],
    },
    contact: {
      type: Number,
      required: [true, "contact is required"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    totalProducts: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
    request_status: {
      type: String,
      enum: ["APPROVED", "REJECTED", "REQUESTED"],
      default: null,
    },
    stripe_payment: {
      status: {
        type: String,
        enum: ["PENDING", "REQUESTED", "ACTIVATED"],
        default: "PENDING",
      },
      account_id: {
        type: String,
        default: null,
      },
    },
  },
  { timestamps: true }
);

const ShopModel = model<IShop>("shops", shopSchema);

export { ShopModel };
