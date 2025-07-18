import { IMessage } from "#types/models.js";
import { model, Schema } from "mongoose";

const messageSchema = new Schema<IMessage>(
  {
    conversation_id: {
      type: String,
      required: true,
    },
    sender: { type: Schema.Types.ObjectId, ref: "users", required: true },
    text: { type: String, default: "" },
    images: [
      {
        type: String,
        default: null,
      },
    ],
    type: {
      type: String,
      default: "TEXT",
    },
    is_seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const MessageModel = model<IMessage>("Message", messageSchema);

export { MessageModel };
