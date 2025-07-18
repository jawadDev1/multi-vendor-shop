import { ICategory, IUser } from "#types/models.js";
import { model, Schema } from "mongoose";

const categorySchema = new Schema<ICategory>(
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
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CategoryModel = model<ICategory>("Category", categorySchema);

export { CategoryModel };
