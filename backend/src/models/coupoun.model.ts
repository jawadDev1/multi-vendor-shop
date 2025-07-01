import { ICoupoun } from "#types/models.js";
import mongoose, { model, Schema } from "mongoose";

const coupounModel = new Schema<ICoupoun>(
  {
    name: {
      type: String,
      required: [true, "name is rquired"],
      unique: true,
    },
    value: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["ALL", "LIMITED"],
      default: "LIMITED",
    },
    created_by: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      default: -1,
    },
    min_amount: {
      type: Number,
    },
    max_amount: {
      type: Number,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const CoupounModel = model<ICoupoun>("Coupoun", coupounModel);

export { CoupounModel };
