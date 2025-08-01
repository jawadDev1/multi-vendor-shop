import { IProduct } from "#types/models.js";
import mongoose, { model, Schema } from "mongoose";

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [String],
    tags: [String],
    originalPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    sold_out: {
      type: Number,
      default: 0,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shops",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    created_by: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false 
    },
    reviews: [
      {
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          default: null,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
      },
    ],
    rating: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

const ProductModel = model<IProduct>("Product", productSchema);

export { ProductModel };
