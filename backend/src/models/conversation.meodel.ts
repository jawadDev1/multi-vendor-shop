import { IConversation } from "#types/models.js";
import mongoose, { model, Schema } from "mongoose";

const conversationSchema = new Schema<IConversation>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    group_title: {
      type: String,
      required: true,
    },
    last_message: {
      type: String,
      default: null,
    },
    last_message_id: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const ConversationModel = model<IConversation>(
  "Conversation",
  conversationSchema
);

export { ConversationModel };
