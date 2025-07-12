import { IMessage } from "#types/models.js";
import { model, Schema } from "mongoose";

const messageSchema = new Schema<IMessage>(
  {
    conversation_id: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      default: null,
    },
    images: [
      {
        type: String,
        default: null,
      },
    ],
  },
  { timestamps: true }
);

const MessageModel = model<IMessage>("Message", messageSchema);

export { MessageModel };
