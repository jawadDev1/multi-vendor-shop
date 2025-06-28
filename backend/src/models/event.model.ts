import { IEvent } from "#types/models.js";
import mongoose, { model, Schema } from "mongoose";

const eventSchema = new Schema<IEvent>(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["RUNNING", "END"],
      default: "RUNNING",
    },
  },
  { timestamps: true }
);

const EventModel = model<IEvent>("Event", eventSchema);

export { EventModel };
