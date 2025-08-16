import { ConversationModel } from "#models/conversation.model.js";
import { MessageModel } from "#models/message.model.js";
import { Socket, Server } from "socket.io";

// socket => single instance per client
// io => global socket instance -> manages all the clients/rooms

let users: string[] = [];
export const onChatConnection = (socket: Socket, io: Server) => {
  console.log("Socket connected ==============> ", socket.id);

  socket.on(
    "join",
    ({
      conversation_id,
      userId,
    }: {
      conversation_id: string;
      userId: string;
    }) => {
      socket.join(conversation_id);
      users.push(userId);
      io.to(conversation_id).emit("online_users", users);
      console.log("users ==========> ", users);
    }
  );

  socket.on(
    "remove_user",
    ({
      conversation_id,
      userId,
    }: {
      conversation_id: string;
      userId: string;
    }) => {
      console.log("remove user =========> ", userId);
      users = users.filter((id) => id !== userId);
      io.to(conversation_id).emit("online_users", users);
    }
  );

  // socket.onAny((event, ...args) => {
  //   console.log("📩 Incoming Event:", event, args);
  // });

  socket.on("send_message", async (data) => {
    try {
      const { conversation_id, sender_id, text, images, type } = data;
      console.log("send_message =============> ", data);

      const message = await MessageModel.create({
        conversation_id,
        images,
        sender: sender_id,
        text: text || "",
        type: type ?? "TEXT"
      });

      io.to(conversation_id).emit("receive_message", message);

      await ConversationModel.findOneAndUpdate(
        { group_title: conversation_id },
        {
          last_message: text || "",
          last_message_id: message.id,
        }
      );
    } catch (error) {
      console.error("[Socket Error] Failed to send message:", error);
      socket.emit("error_message", "Failed to send message.");
    }
  });

  socket.on("message_seen", (data) => {
    const { serderId, reciverId, messageId } = data;
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected: ", socket.id);
  });
};
