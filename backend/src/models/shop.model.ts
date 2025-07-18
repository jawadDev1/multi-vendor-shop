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
  },
  { timestamps: true }
);

const ShopModel = model<IShop>("shops", shopSchema);

export { ShopModel };
